# Blocs me

## Tech stack

- stripe payments
- supabase authentication
- fauna db
- vercel hosting
- next.js
  - styled system library
  - emotion.js for css

# Project Setup

## Environment Variables

You can take a look at the `.env.example` file

```
  FAUNA_DB_SECRET=**** # use diff database when working locally to prevent writing to prod

  # For lambdas
  VERCEL_ENV=local # auto set in vercel
  NEXT_PUBLIC_VERCEL_ENV=local # auto set in vercel
  JWT_SALT=****
  NEXT_PUBLIC_SUPABASE_URL=****
  NEXT_PUBLIC_SUPABASE_ANON_KEY=****
  STRIPE_SECRET_KEY=****
  STRIPE_WEBHOOK_SIGNING_SECRET=****

```

Make an account with stripe, and get the `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SIGNING_SECRET` from your account.
Make sure to use keys from 'testing' mode in stripe.

## Local Development

- For Fauna db I suggest creating a test database on the website dashboard, you can then run the `migrations.ts` file to migrate all of the

## Production

- Be careful when pushing to 'main', branch, every deployment it automatically published
- Currently, no CI/CD exists except for the husky git-hook that runs the jest before publishing, it would make sense to include more unit tests
  Tip : Vercel CLI is a great way to manage Secrets and deployments to proudction

# To Update

## Emails and MX Records

Previously setup with Zoho, I can recommend them as
a platform for custom emails. It's easy to setup.

Currently, the MX records will are pointed from namecheap to zoho.in.
If you want a custom email, then you will need to update these records
with your own email provided like Gmail.
