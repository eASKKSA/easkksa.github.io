# Diagnóstico dos pedidos de aulas experimentais

O formulário chama `submitTrialForm` no servidor Next.js, que envia o email por
SMTP para o dojo escolhido, com cópia para a direção.

## Onde consultar os logs

Em desenvolvimento, os logs aparecem no terminal de `pnpm dev`. Em produção,
aparecem nos logs de execução do servidor. Na Vercel, abrir o projeto → **Logs**,
selecionar o ambiente/deployment e o período do pedido. Os logs de build e a
consola do browser não mostram a comunicação SMTP do servidor.

Procurar por `trial_form_` ou pela **Referência do pedido** apresentada junto do
erro no formulário. Cada linha é JSON e contém o mesmo `requestId` para o pedido.
Os logs incluem códigos de diagnóstico, sem nomes, emails, telefones, conteúdo
da mensagem ou credenciais.

| Evento | Significado |
| --- | --- |
| `trial_form_received` | A ação recebeu o pedido. |
| `trial_form_validation_failed` | Campos inválidos; `fields` indica quais. |
| `trial_form_rate_limited` | O IP atingiu 3 tentativas válidas numa hora. |
| `trial_form_sending` | Configuração validada; início do envio SMTP. |
| `trial_form_sent` | O servidor SMTP aceitou a mensagem; inclui contagens de destinatários aceites/rejeitados. Não confirma entrega na caixa de entrada. |
| `trial_form_recipient_rejected` | Pelo menos um destinatário foi rejeitado; outro foi aceite. |
| `trial_form_failed` | Falha de configuração ou SMTP; consultar `code`, `command` e `responseCode`. |

| Código | O que verificar |
| --- | --- |
| `ECONFIG` | Variáveis em falta/inválidas, listadas em `configurationVariables`. |
| `EAUTH` | Utilizador, palavra-passe e permissões SMTP. |
| `ETIMEDOUT` | Conectividade, porta, firewall e TLS no ambiente de execução. |
| `EDNS` | Resolução do hostname SMTP. |
| `ECONNECTION` / `ESOCKET` | Ligação ao servidor e certificado TLS. |
| `EENVELOPE` | Rejeição do remetente/destinatários pelo servidor SMTP. |

O Nodemailer 10 acrescenta `originalCode` (código de erro do sistema, quando
existir) e `timeoutType` (fase do timeout); os logs preservam também estes campos.

Se não houver `trial_form_received`, o pedido não chegou à ação: verificar o
pedido POST na aba Network do browser e os erros da plataforma no mesmo período.

As alterações aos logs exigem um novo deployment. A configuração do compilador
preserva `console.info`, `console.warn` e `console.error` em produção.

## Configuração do ambiente

O projeto usa Nodemailer 10, que requer Node.js 20 ou superior e já inclui os
tipos TypeScript; não instalar `@types/nodemailer` em paralelo.

Definir no ambiente que executa o servidor (na Vercel, confirmar também o âmbito
Production/Preview e fazer redeploy depois de alterar):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`.
- `DOJO_HBG_EMAIL`, `DOJO_JFSA_EMAIL`, `DOJO_CSDCL_EMAIL`: só o destinatário do
  dojo escolhido é obrigatório para esse pedido.
- `SMTP_FROM_NAME`: opcional, usa `ASKKSA` por omissão.
- `SMTP_SECURE`: opcional, `true` ou `false`. Por omissão usa TLS imediato na
  porta 465 e STARTTLS na porta 587.

O envio usa uma única ligação. No Nodemailer 10.1, `connectionTimeout` limita a
10 segundos o estabelecimento da sessão, incluindo DNS, TCP, TLS, saudação e
STARTTLS. `greetingTimeout` limita também a saudação dentro desse prazo e
`socketTimeout` limita a inatividade a 10 segundos. Não existe um prazo total de
10 segundos para o envio completo. O certificado TLS é validado. Não se ativa
debug SMTP, que pode expor o conteúdo dos emails.

O limite por IP é em memória: reinicia com o processo e não é partilhado entre
instâncias.

## Verificação local

```sh
node --test scripts/test-trial-form.cjs
pnpm exec tsc --noEmit
pnpm lint:check
pnpm build
```

Os testes do formulário requerem Node.js 22.18+ ou 24+ e simulam SMTP, sem enviar
emails. Cobrem sucesso, validação, configuração, autenticação, timeouts, rejeição
parcial e correlação dos logs sem dados pessoais. O transporte em memória da
biblioteca real verifica também a composição MIME e os destinatários dos três
dojos, sem abrir uma ligação SMTP.

Referências: [SMTP no Nodemailer](https://nodemailer.com/smtp) e
[configuração de remoção de console no Next.js](https://nextjs.org/docs/architecture/nextjs-compiler#remove-console).
