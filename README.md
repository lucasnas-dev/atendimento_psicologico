# Sistema de Atendimento Psicológico

Este é um projeto [Next.js](https://nextjs.org) criado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) para gerenciamento de consultas e prontuários psicológicos.

## Começando

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando `app/page.tsx`. A página atualiza automaticamente conforme você edita o arquivo.

Este projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar automaticamente [Geist](https://vercel.com/font), uma nova família de fontes da Vercel.

## Configuração do Banco de Dados

Este projeto utiliza PostgreSQL com Prisma ORM:

### Pré-requisitos

- PostgreSQL instalado e rodando
- Node.js 18+

### Configuração Inicial

1. **Instale as dependências:**

```bash
npm install
```

2. **Configure as variáveis de ambiente:**
   Copie o arquivo `.env.example` para `.env` e configure sua string de conexão do PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/psiaten?schema=public"
```

3. **Execute as migrações do banco:**

```bash
npx prisma db push
```

4. **Popule o banco com dados de exemplo:**

```bash
npx tsx scripts/seed.ts
```

5. **Visualize os dados no Prisma Studio (opcional):**

```bash
npx prisma studio
```

## Funcionalidades

- ✅ **Multi-tenancy** - Suporte a múltiplas clínicas
- ✅ **Gestão de Pacientes** - Cadastro e prontuários completos
- ✅ **Agendamento de Consultas** - Sistema de agendamento flexível
- ✅ **Prontuários Eletrônicos** - Anotações e documentos seguros
- ✅ **Dashboard** - Visão geral das atividades
- ✅ **Relatórios** - Acompanhamento e estatísticas

## Estrutura do Projeto

```
├── app/                    # Páginas e componentes Next.js
├── components/             # Componentes reutilizáveis
├── lib/                    # Utilitários e configurações
├── prisma/                 # Schema e migrações do banco
├── scripts/                # Scripts de seed e utilitários
└── public/                 # Arquivos estáticos
```

## Tecnologias Utilizadas

- **Framework:** Next.js 15 (App Router)
- **Banco de Dados:** PostgreSQL + Prisma ORM
- **UI:** Tailwind CSS + Radix UI
- **Autenticação:** NextAuth.js
- **Tipagem:** TypeScript

## Saiba Mais

Para aprender mais sobre Next.js, consulte os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre recursos e API do Next.js
- [Tutorial Interativo do Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js
- [Documentação do Prisma](https://www.prisma.io/docs) - guia completo do Prisma ORM

Você pode conferir [o repositório do Next.js no GitHub](https://github.com/vercel/next.js) - seu feedback e contribuições são bem-vindos!

## Deploy na Vercel

A maneira mais fácil de fazer deploy da sua aplicação Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## Contribuição

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
