# LCP mobile

Diagnóstico de 27 de outubro de 2026. O relatório fornecido do Search Console
indicava LCP de 3,1 s para grupos com 34 URLs; a lista recebida contém 33 URLs.

**Resultado local atual:** as 33 URLs mediram entre 0,724 e 1,004 s. Nos oito
ensaios adicionais com densidade 3×, o máximo foi 1,076 s em modo claro; os dois
ensaios adicionais em modo escuro mediram até 1,100 s. A publicação e a
confirmação com dados reais continuam pendentes.

Os resultados por URL, condições dos testes e comparação antes/depois estão na
[verificação completa](lcp-url-verification.md).

## Causa do atraso restante

Na medição anterior de 2,412 s em `/no-dojo/vocabulario`, a imagem decorativa do
fundo terminou de descarregar aos 0,841 s. O browser só registou a sua pintura
cerca de 1,571 s depois. O caminho usado combinava uma máscara raster com outra
máscara CSS de gradiente.

O fundo mobile é agora uma imagem transparente normal, com a cor preta e o
mesmo desvanecimento já incorporados no canal alfa. As três medições controladas
dessa página passaram para 0,880–0,900 s, com apenas 7–17 ms entre a conclusão do
carregamento da imagem e a pintura. Os vetores de desktop mantêm-se.

O novo ficheiro tem 46 990 bytes, contra 42 056 da máscara anterior: a pequena
subida de transferência elimina o atraso muito maior de renderização. As
capturas de desktop ficaram idênticas; no mobile, a diferença máxima foi de
2 níveis por canal de cor em 255.

## Alterações mantidas

- Pré-renderização das páginas com idioma obtido por `next/root-params`, sem
  `setRequestLocale` obsoleto. O layout raiz fica em `app/[locale]`; Notícias usa
  revalidação horária. As Server Actions recebem o idioma explicitamente, porque
  a API de root params ainda não está disponível nesse contexto.
- CSS em ficheiros estáticos com cache, evitando a repetição de CSS no HTML e no
  payload React. O Tailwind procura classes apenas em `src`.
- Fontes carregadas pelos pesos usados, sem sete preloads indiscriminados, e
  animação inicial desativada em mobile.
- Imagens principais com carregamento e tamanhos adequados. A fotografia da
  página inicial mantém as variantes completas para desktop e limita as de
  telemóvel a 640 px. Em densidade 3×, descarrega 23 354 bytes uma única vez.
- Olhos do tigre em SVG inline no mobile, com a geometria original.

Para regenerar a imagem mobile a partir do SVG original:

```sh
node scripts/optimize-mobile-background.cjs
```

## Confirmação em produção

Build de produção, TypeScript, Biome, cobertura das 33 rotas, medições locais e
comparação visual concluídos. As medições locais não comprovam o percentil 75
dos visitantes reais.

Após publicar, repetir os testes nos URLs públicos e iniciar a validação no
Search Console. O relatório usa uma janela móvel de 28 dias; não desaparece
imediatamente após a publicação. [Documentação do Google](https://support.google.com/webmasters/answer/9205520).
