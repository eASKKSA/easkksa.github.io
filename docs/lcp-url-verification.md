# LCP URL verification — 27 October 2026

**Latest local result: all 33 supplied URLs measured 0.724–1.004 seconds, with a median of 0.848 seconds. High-density mobile checks reached at most 1.076 seconds in light mode and 1.100 seconds in the additional dark-mode checks.** Deployment and Google field-data validation are still pending.

The supplied list contains 33 distinct URLs. The Search Console report listed 34 affected URLs, so one was not provided.

## What caused the remaining 2.41 seconds?

The previous worst run on `/no-dojo/vocabulario` had downloaded the decorative tiger mask by 0.841 seconds, but LCP was recorded at 2.412 seconds: another 1.571 seconds elapsed before its paint was reported. The main text and content image had already painted.

A controlled retest reproduced the same issue: the mask finished its image load at 0.956 seconds and painted at 2.444 seconds, a 1.488-second rendering delay. The expensive path was the large fixed background using a raster mask inside another radial-gradient CSS mask.

## Change

The mobile artwork is now a pre-rendered black transparent WebP with the same elliptical fade baked into alpha. A normal native image draws it; the tiger image no longer needs stacked CSS masks. The red eyes retain the original inline SVG geometry and fade, and desktop keeps the original vectors. The responsive picture only requests the mobile artwork on mobile.

The old mask file was 42,056 bytes; the pre-rendered image is 46,990 bytes. The small transfer increase removes the much larger rendering delay. Regenerate it from the unchanged source SVG with:

```sh
node scripts/optimize-mobile-background.cjs
```

| Controlled retest | LCP | Time from image load to paint |
| --- | ---: | ---: |
| Previous masked background | 2.444 s | 1.488 s |
| Pre-rendered image | 0.900 s | 0.007 s |
| Pre-rendered image | 0.892 s | 0.013 s |
| Pre-rendered image | 0.880 s | 0.017 s |

The prior CSS-delivery, font, prerendering and responsive homepage-photo improvements remain in place. In particular, the photo is limited to 640 source pixels on phones, while larger screens retain the full source set.

## All supplied URLs

One navigation per URL in a fresh Chrome browser, 390 × 844 CSS pixels, DPR 1, light appearance, CPU slowdown 4×, download 1.6 Mbps, upload 750 Kbps, latency 150 ms and HTTP cache disabled. The LCP observer ran for 5.5 seconds after DOMContentLoaded. These are lab readings, not real-user percentiles.

| URL | Previous local LCP | Latest local LCP |
| --- | ---: | ---: |
| [https://www.askksa.pt/estilo-ski](https://www.askksa.pt/estilo-ski) | 0.904 s | 1.004 s |
| [https://www.askksa.pt/filosofia](https://www.askksa.pt/filosofia) | 2.344 s | 0.848 s |
| [https://www.askksa.pt/historia](https://www.askksa.pt/historia) | 2.232 s | 0.840 s |
| [https://www.askksa.pt/perguntas-frequentes](https://www.askksa.pt/perguntas-frequentes) | 2.220 s | 0.784 s |
| [https://www.askksa.pt/sobre](https://www.askksa.pt/sobre) | 2.348 s | 0.820 s |
| [https://www.askksa.pt/en](https://www.askksa.pt/en) | 2.372 s | 0.844 s |
| [https://www.askksa.pt/no-dojo](https://www.askksa.pt/no-dojo) | 0.684 s | 0.820 s |
| [https://www.askksa.pt/noticias](https://www.askksa.pt/noticias) | 2.292 s | 0.808 s |
| [https://www.askksa.pt/fr](https://www.askksa.pt/fr) | 2.372 s | 0.840 s |
| [https://www.askksa.pt/ja](https://www.askksa.pt/ja) | 0.804 s | 0.848 s |
| [https://www.askksa.pt/es](https://www.askksa.pt/es) | 0.704 s | 0.860 s |
| [https://www.askksa.pt/politica-de-privacidade](https://www.askksa.pt/politica-de-privacidade) | 2.256 s | 0.800 s |
| [https://www.askksa.pt/no-dojo/graduacoes](https://www.askksa.pt/no-dojo/graduacoes) | 2.356 s | 0.844 s |
| [https://www.askksa.pt/no-dojo/saudacao](https://www.askksa.pt/no-dojo/saudacao) | 0.712 s | 0.864 s |
| [https://www.askksa.pt/filosofia/dojo-kun](https://www.askksa.pt/filosofia/dojo-kun) | 0.744 s | 0.744 s |
| [https://www.askksa.pt/no-dojo/vocabulario](https://www.askksa.pt/no-dojo/vocabulario) | 2.412 s | 0.892 s |
| [https://www.askksa.pt/es/en-el-dojo/grados](https://www.askksa.pt/es/en-el-dojo/grados) | 2.380 s | 0.872 s |
| [https://www.askksa.pt/en/in-dojo/salutation](https://www.askksa.pt/en/in-dojo/salutation) | 0.700 s | 0.832 s |
| [https://www.askksa.pt/](https://www.askksa.pt/) | 0.760 s | 0.864 s |
| [https://www.askksa.pt/en/philosophy/bushido](https://www.askksa.pt/en/philosophy/bushido) | 0.740 s | 0.724 s |
| [https://www.askksa.pt/no-dojo/regras](https://www.askksa.pt/no-dojo/regras) | 2.324 s | 0.920 s |
| [https://www.askksa.pt/filosofia/bushido](https://www.askksa.pt/filosofia/bushido) | 0.736 s | 0.724 s |
| [https://www.askksa.pt/es/en-el-dojo/saludo](https://www.askksa.pt/es/en-el-dojo/saludo) | 0.692 s | 0.856 s |
| [https://www.askksa.pt/en/in-dojo/grades](https://www.askksa.pt/en/in-dojo/grades) | 2.352 s | 0.888 s |
| [https://www.askksa.pt/en/philosophy/dojo-kun](https://www.askksa.pt/en/philosophy/dojo-kun) | 0.736 s | 0.744 s |
| [https://www.askksa.pt/es/estilo-ski](https://www.askksa.pt/es/estilo-ski) | 0.732 s | 0.868 s |
| [https://www.askksa.pt/filosofia/niju-kun](https://www.askksa.pt/filosofia/niju-kun) | 2.328 s | 0.900 s |
| [https://www.askksa.pt/en/about](https://www.askksa.pt/en/about) | 2.328 s | 0.820 s |
| [https://www.askksa.pt/en/faq](https://www.askksa.pt/en/faq) | 2.232 s | 0.792 s |
| [https://www.askksa.pt/es/en-el-dojo/reglas](https://www.askksa.pt/es/en-el-dojo/reglas) | 0.756 s | 0.900 s |
| [https://www.askksa.pt/es/filosofia](https://www.askksa.pt/es/filosofia) | 2.372 s | 0.856 s |
| [https://www.askksa.pt/fr/style-ski](https://www.askksa.pt/fr/style-ski) | 2.276 s | 0.876 s |
| [https://www.askksa.pt/es/filosofia/niju-kun](https://www.askksa.pt/es/filosofia/niju-kun) | 0.768 s | 0.920 s |

All 33 routes pass prerendered-HTML, language, canonical, artwork preload and no-font-preload checks. News retains hourly page revalidation. Each page downloaded the mobile artwork once and had no horizontal overflow.

## High-density mobile

Android-style Chrome emulation, 390 × 844 CSS pixels, DPR 3, touch enabled and the same network/CPU limits:

| URL | LCP at DPR 3 |
| --- | ---: |
| `/no-dojo/vocabulario` | 0.888 s |
| `/filosofia` | 0.892 s |
| `/es/filosofia` | 0.912 s |
| `/` | 1.076 s |
| `/es` | 1.056 s |
| `/en` | 1.068 s |
| `/fr` | 1.064 s |
| `/ja` | 1.012 s |

## Appearance and deployment

### Native locale API migration

Locale resolution now uses `next/root-params` in `src/i18n/request.ts`, following
the [current next-intl migration](https://next-intl.dev/blog/nextjs-root-params).
`app/[locale]/layout.tsx` is the root layout; deprecated `setRequestLocale` calls
and redundant nested locale generators have been removed. The form action binds
and validates an explicit locale because root params are unavailable in Server
Actions. The standalone global 404 uses Portuguese explicitly.

After the migration, all 80 localized pages (16 per language) remain prerendered,
and all 33 supplied URLs pass the generated-HTML checks. Production HTTP checks
cover all five languages, missing routes and metadata endpoints. The 15 form
tests pass with mocked SMTP; an empty French form also returns translated server
validation in the browser without sending email.

Three additional mobile checks using the same DPR 1 conditions measured 0.868 s
on `/no-dojo/vocabulario`, 0.832 s on `/es` and 0.832 s on
`/en/in-dojo/grades`. Each downloaded the mobile artwork once and had no
horizontal overflow. The 33-URL table above records the earlier complete run.

### Visual checks and publication

Additional dark-mode DPR 3 checks measured 0.908 seconds on `/no-dojo/vocabulario`
and 1.100 seconds on `/es`, with one artwork request per navigation.

Full viewport screenshots were compared in light/dark mode at 390 px and 1440 px. Desktop screenshots were pixel-identical. On mobile, the maximum difference was 2 out of 255 per colour channel, and no pixel differed by more than 5. The artwork and its fade are preserved. Desktop does not download the new mobile image.

The changes have not been deployed. Local improvements do not confirm the live Search Console issue is resolved. After deployment, check PageSpeed Insights and the mobile URL groups; Google’s field report uses a 28-day rolling window. [Google Core Web Vitals report](https://support.google.com/webmasters/answer/9205520#page_groups).

Validation: Next.js production build and TypeScript, Biome, controlled before/after rendering profiles, all 33 local URL measurements, eight DPR 3 measurements, route coverage checks and screenshot comparison.

References: [LCP subpart breakdown](https://developer.chrome.com/docs/performance/insights/lcp-breakdown), [LCP optimization](https://web.dev/articles/optimize-lcp).
