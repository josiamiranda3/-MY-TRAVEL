# MY TRAVEL 2.0 — Correções de compilação

Esta versão corrige os erros reportados no primeiro `ng serve`:

1. Os bindings `background-image` da Home e Destination Details agora usam propriedades/métodos TypeScript, evitando expressões com aspas inválidas no parser Angular.
2. `sass` foi adicionado às devDependencies para que o Angular CLI compile `src/styles.scss`.
3. `RouterLink` foi removido dos imports não utilizados do PlannerComponent.

## Como atualizar

Extraia esta versão em uma pasta nova (ou substitua a pasta antiga após fazer backup).

```bash
npm install
npm start
```

Para validar a compilação de produção:

```bash
npm run build
```

Não use `npm audit fix --force` como tentativa de corrigir vulnerabilidades sem revisar as mudanças, pois isso pode introduzir atualizações incompatíveis.
