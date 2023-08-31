# Saas-template

This is a template application for a Saas application.  Features app routing, authentication through next auth

## Technologies

- Next.js
- Prisma
- MongoDB
- tRPC

### Styling
- Tailwind CSS
- Shadcn/ui

### Authentication
- NextAuth.js
- Google Cloud Credentials

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)



### Run dev

```Shell
npm run dev
```

### Migrating Database (MongoDB)

```Shell
npx prisma db push
```

### Generate Nextauth secret

```Shell
openssl rand -base64 32
```