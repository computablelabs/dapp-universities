# Universities DApp

A decentralized application built for tutorial purposes.

## Requirements

- npm
- Ganache CLI: If you don't have Ganache CLI, do `npm install ganache-cli`
- IPFS

## Getting started

### Install Application Dependencies

- `git clone git@github.com:computablelabs/dapp-universities.git`

- `npm install`

### Install IPFS

For alternative installation instructions, visit
[IPFS](https://docs.ipfs.io/introduction/install/)

This installation assumes you have [Homebrew](https://brew.sh) installed and
available.

In a new terminal tab, run:

- `brew install ipfs`

You can then manage IPFS via homebrew services

- `brew services start ipfs`

After installation is successful, run

- `ipfs init`

### Install Ganache

In a new terminal tab, run:

- `ganache-cli`

- Copy address displayed on "Listening on"

In your dapp-university dir

- Run `cp ./.env.example ./.env`

- In your `.env` file, paste the ganache address as the value of `GANACHE_URL`

### Run the application

- Run `npm run dev`

Copy the localhost address into browser

Enter your university name. You should now see it listed!!!

