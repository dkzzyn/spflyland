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

Configuração da API de rastreamento (opcional, para dados reais):

```bash
cp .env.example .env.local
```

Depois, preencha no `.env.local`:

- `VITE_TRACKING_API_URL`
- `VITE_TRACKING_API_USER`
- `VITE_TRACKING_API_PASSWORD`
- `VITE_TRACKING_API_TOKEN`
- `VITE_TRACKING_API_COMPROVANTE` (0 ou 1)

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
- A seção de rastreamento usa API real via `GET /tracking/ocorrencias?codigo=...&comprovante=...` quando as variáveis de ambiente estão configuradas; caso contrário, mostra fallback de demonstração.
# spflyland
