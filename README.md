# Universities DApp

A decentralized application built for tutorial purposes.

## Requirements

- npm
- Ganache CLI: If you don't have Ganache CLI, do `npm install ganache-cli`

## Getting started

- `git clone git@github.com:computablelabs/dapp-universities.git`

- `npm install`

In a new terminal tab, do:

- `ganache-cli`

- Copy address displayed on "Listening on"

In your dapp-university dir

- Create a `.env` file. It should look like the `.env.example` file.

- Paste the ganache address into your `.env` file, replacing the example address.

- Do `npm run dev`

Copy the localhost address into browser

Enter your university name. You should now see it listed!!!
