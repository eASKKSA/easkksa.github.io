const assert = require("node:assert/strict");
const { registerHooks } = require("node:module");
const { resolve } = require("node:path");
const { test } = require("node:test");
const { pathToFileURL } = require("node:url");
const nodemailer = require("nodemailer");

// Exercise the real Server Action with mocked request/SMTP boundaries. No
// connection is opened and no email is sent. The stream transport also checks
// the real Nodemailer package. Requires Node.js 22.18+ or 24+.
const dependencyKey = "__trialFormTestDependencies";
const mocks = {
  "server-only": "export {};",
  "next/headers": `export async function headers() {
    return new Headers({ "x-forwarded-for": globalThis.${dependencyKey}.ip });
  }`,
  "next-intl/server": `export async function getTranslations(options) {
    if (!options?.locale || options.namespace !== "TrialForm") {
      throw new Error("Server Actions must provide an explicit locale");
    }
    globalThis.${dependencyKey}.translationCalls.push(options);
    return (key) => key;
  }`,
  nodemailer: `export default { createTransport(options) {
    return globalThis.${dependencyKey}.createTransport(options);
  } };`,
};

const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/i18n/routing") {
      return {
        url: pathToFileURL(resolve(__dirname, "../src/i18n/routing.ts")).href,
        shortCircuit: true,
      };
    }
    if (Object.hasOwn(mocks, specifier)) {
      return { url: `trial-test:${specifier}`, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith("trial-test:")) {
      return {
        format: "module",
        source: mocks[url.slice("trial-test:".length)],
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});

const environment = {
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "465",
  SMTP_USER: "smtp-test-user",
  SMTP_PASSWORD: "private-test-password",
  SMTP_FROM: "website@example.com",
  DOJO_HBG_EMAIL: "hbg@example.com",
  DOJO_JFSA_EMAIL: "jfsa@example.com",
  DOJO_CSDCL_EMAIL: "csdcl@example.com",
};
const envKeys = [...Object.keys(environment), "SMTP_SECURE", "SMTP_FROM_NAME"];
let subjectId = 0;

async function setup(t) {
  const previousEnv = Object.fromEntries(
    envKeys.map((key) => [key, process.env[key]]),
  );
  for (const key of envKeys) delete process.env[key];
  Object.assign(process.env, environment);
  const logs = [];
  for (const level of ["info", "warn", "error"]) {
    const original = console[level].bind(console);
    t.mock.method(console, level, (line) => {
      // Node may emit module warnings asynchronously through console.error.
      if (typeof line === "string" && line.startsWith("{")) {
        logs.push({ level, ...JSON.parse(line) });
      } else {
        original(line);
      }
    });
  }
  const calls = [];
  const options = [];
  const deps = {
    translationCalls: [],
    ip: "192.0.2.1, 198.51.100.1",
    sendError: undefined,
    rejected: [],
    mailer: undefined,
    mailResult: undefined,
    createTransport(config) {
      options.push(config);
      return {
        async verify() {
          assert.fail("Submissions must not open a separate verify connection");
        },
        async sendMail(mail) {
          calls.push(mail);
          if (deps.sendError) throw deps.sendError;
          if (deps.mailer) {
            deps.mailResult = await deps.mailer.sendMail(mail);
            return deps.mailResult;
          }
          return { accepted: [mail.to], rejected: deps.rejected };
        },
      };
    },
  };
  globalThis[dependencyKey] = deps;
  t.after(() => {
    for (const key of envKeys) {
      if (previousEnv[key] === undefined) delete process.env[key];
      else process.env[key] = previousEnv[key];
    }
    delete globalThis[dependencyKey];
  });
  const url = pathToFileURL(resolve(__dirname, "../src/app/actions.ts"));
  url.searchParams.set("test", String(subjectId++));
  const { submitTrialForm } = await import(url.href);
  const submit = (values = {}, locale = "pt-PT") => {
    const form = new FormData();
    const data = {
      name: "Private Candidate",
      age: "25",
      email: "candidate@example.com",
      phone: "+351 900000000",
      dojo: "HBG",
      experience: "no",
      ...values,
    };
    for (const [key, value] of Object.entries(data)) form.set(key, value);
    return submitTrialForm(locale, { message: "", success: false }, form);
  };
  return { submit, logs, calls, options, deps };
}

test("trial form server action", async (t) => {
  t.after(() => hooks.deregister());

  await t.test(
    "uses explicit locales without reading route root params",
    async (t) => {
      const { submit, deps, calls } = await setup(t);
      for (const locale of ["pt-PT", "en", "es", "fr", "ja"]) {
        const result = await submit({ email: "invalid" }, locale);
        assert.equal(result.success, false);
        assert.equal(deps.translationCalls.at(-1).locale, locale);
      }
      assert.equal(calls.length, 0);
    },
  );

  await t.test(
    "validates the bound locale before loading translations",
    async (t) => {
      const { submit, deps, calls } = await setup(t);
      await submit({ email: "invalid" }, "unsupported-locale");
      assert.equal(deps.translationCalls[0].locale, "pt-PT");
      assert.equal(calls.length, 0);
    },
  );

  await t.test(
    "sends once and correlates logs without candidate data",
    async (t) => {
      const { submit, logs, calls, options } = await setup(t);
      const result = await submit();
      assert.equal(result.success, true);
      assert.equal(calls.length, 1);
      assert.equal(calls[0].to, environment.DOJO_HBG_EMAIL);
      assert.deepEqual(
        logs.map((log) => log.event),
        ["trial_form_received", "trial_form_sending", "trial_form_sent"],
      );
      assert.ok(logs.every((log) => log.requestId === result.requestId));
      assert.equal(options[0].secure, true);
      for (const key of [
        "connectionTimeout",
        "greetingTimeout",
        "socketTimeout",
        "dnsTimeout",
      ])
        assert.equal(options[0][key], 10_000);
      assert.equal(options[0].pool, undefined);
      assert.equal(options[0].tls?.rejectUnauthorized, undefined);
      assert.doesNotMatch(
        JSON.stringify(logs),
        /Private Candidate|candidate@example.com|900000000|private-test-password/,
      );
    },
  );

  await t.test(
    "real Nodemailer composes the trial email for every dojo without SMTP",
    async (t) => {
      const { submit, deps, calls } = await setup(t);
      deps.mailer = nodemailer.createTransport({
        streamTransport: true,
        buffer: true,
        newline: "unix",
      });
      for (const dojo of ["HBG", "JFSA", "CSDCL"]) {
        const result = await submit({ dojo });
        assert.equal(result.success, true);
        assert.equal(deps.mailResult.envelope.from, environment.SMTP_FROM);
        assert.deepEqual(deps.mailResult.envelope.to, [
          environment[`DOJO_${dojo}_EMAIL`],
          "direcao@askksa.pt",
        ]);
        assert.ok(Buffer.isBuffer(deps.mailResult.message));
        const message = deps.mailResult.message.toString("utf8");
        assert.match(message, /MIME-Version: 1\.0/);
        assert.match(message, /Content-Type: multipart\/alternative/);
        assert.match(message, /Content-Type: text\/plain; charset=utf-8/);
        assert.match(message, /Content-Type: text\/html; charset=utf-8/);
        assert.equal(calls.at(-1).from.name, "ASKKSA");
      }
      assert.equal(calls.length, 3);
    },
  );

  await t.test("only the chosen dojo requires a recipient", async (t) => {
    const { submit } = await setup(t);
    delete process.env.DOJO_JFSA_EMAIL;
    delete process.env.DOJO_CSDCL_EMAIL;
    assert.equal((await submit()).success, true);
  });

  await t.test(
    "missing selected recipient is logged as configuration error",
    async (t) => {
      const { submit, logs, calls } = await setup(t);
      delete process.env.DOJO_HBG_EMAIL;
      const result = await submit();
      assert.equal(result.message, "submit.serverConfiguration");
      assert.equal(calls.length, 0);
      const failure = logs.find((log) => log.event === "trial_form_failed");
      assert.equal(failure.code, "ECONFIG");
      assert.deepEqual(failure.configurationVariables, ["DOJO_HBG_EMAIL"]);
      assert.equal(failure.requestId, result.requestId);
    },
  );

  await t.test("invalid SMTP port fails before connecting", async (t) => {
    const { submit, logs, options } = await setup(t);
    process.env.SMTP_PORT = "invalid";
    assert.equal((await submit()).success, false);
    assert.equal(options.length, 0);
    assert.deepEqual(logs.at(-1).configurationVariables, ["SMTP_PORT"]);
  });

  await t.test("port 587 uses STARTTLS instead of implicit TLS", async (t) => {
    const { submit, options } = await setup(t);
    process.env.SMTP_PORT = "587";
    assert.equal((await submit()).success, true);
    assert.equal(options[0].secure, false);
  });

  for (const [code, message] of [
    ["ETIMEDOUT", "submit.timeout"],
    ["EAUTH", "submit.serverConfiguration"],
    ["EDNS", "submit.error"],
  ]) {
    await t.test(
      `handles ${code} without leaking SMTP responses`,
      async (t) => {
        const { submit, logs, deps } = await setup(t);
        deps.sendError = Object.assign(new Error("private-test-password"), {
          code,
          originalCode: "ECONNREFUSED",
          timeoutType: "connection",
          command: "AUTH PLAIN private-test-password",
          responseCode: 535,
          response: "candidate@example.com rejected",
        });
        const result = await submit();
        assert.equal(result.success, false);
        assert.equal(result.message, message);
        assert.ok(result.requestId);
        assert.equal(logs.at(-1).code, code);
        assert.equal(logs.at(-1).originalCode, "ECONNREFUSED");
        assert.equal(logs.at(-1).timeoutType, "connection");
        assert.equal(logs.at(-1).command, "AUTH");
        assert.equal(logs.at(-1).responseCode, 535);
        assert.doesNotMatch(
          JSON.stringify(logs),
          /private-test-password|candidate@example.com/,
        );
      },
    );
  }

  await t.test("invalid fields do not use the submission quota", async (t) => {
    const { submit, calls, logs } = await setup(t);
    for (let i = 0; i < 4; i++) {
      const result = await submit({ email: "invalid" });
      assert.equal(result.message, "submit.correctErrors");
      assert.ok(result.errors.email);
    }
    assert.equal((await submit()).success, true);
    assert.equal(calls.length, 1);
    assert.deepEqual(logs[1].fields, ["email"]);
  });

  await t.test(
    "rate limit uses the client IP across proxy changes",
    async (t) => {
      const { submit, deps, calls, logs } = await setup(t);
      for (let i = 0; i < 3; i++) {
        deps.ip = `192.0.2.1, 198.51.100.${i}`;
        assert.equal((await submit()).success, true);
      }
      assert.equal((await submit()).message, "submit.rateLimited");
      assert.equal(calls.length, 3);
      assert.equal(logs.at(-1).event, "trial_form_rate_limited");
    },
  );

  await t.test("partial recipient rejection produces a warning", async (t) => {
    const { submit, deps, logs } = await setup(t);
    deps.rejected = ["direcao@askksa.pt"];
    assert.equal((await submit()).success, true);
    assert.equal(logs.at(-1).event, "trial_form_recipient_rejected");
    assert.equal(logs.at(-1).rejectedCount, 1);
    assert.doesNotMatch(JSON.stringify(logs), /direcao@askksa.pt/);
  });
});
