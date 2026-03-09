# SPFLY Armazenagem e Logística (One-Page)

Projeto institucional one-page em React + TypeScript, com foco em conversão e identidade visual laranja/preto.

## Tecnologias

- React + TypeScript
- Vite
- CSS Modules

## Como rodar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Estrutura de pastas

```text
src/
  components/
    Header/
    Footer/
  sections/
    Hero/
    Services/
    About/
    Differentials/
    Contact/
  styles/
    theme.css
```

## Onde editar conteúdos e dados da empresa

- Textos do topo e menu: `src/components/Header/Header.tsx`
- Hero (headline, subtítulo e botões): `src/sections/Hero/Hero.tsx`
- Serviços e descrições: `src/sections/Services/Services.tsx`
- Dados de estrutura (m², docas, WMS etc.): `src/sections/About/About.tsx`
- Lista de diferenciais: `src/sections/Differentials/Differentials.tsx`
- Campos do formulário e contatos (WhatsApp/telefone/e-mail): `src/sections/Contact/Contact.tsx`
- Rodapé (CNPJ, cidade, termos): `src/components/Footer/Footer.tsx`
- Cores e tokens visuais: `src/styles/theme.css`

## Observações

- O formulário de contato possui validação simples de campos obrigatórios no front-end.
- O site usa navegação por âncoras com scroll suave.
# spflyland
