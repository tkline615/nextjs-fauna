#Config note
ESLint was going haywire - you need to add "extends": ["next/core-web-vitals"] in the local file for .estlintrc.json

##Creating serverless functions
All of the functions go inside of the /pages/api folder

##Env
For the .env file the secret can be accessed via FaunaDB's security tab
For using vercel for deployments, do vercel secrets add FAUNADB_SECRET_KEY {key} which adds the key to their store

##Deploy on local server
Run vercel dev
