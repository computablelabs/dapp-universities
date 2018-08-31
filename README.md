# Universities DApp

A decentralized application built for tutorial purposes.

## Requirements

- node + npm
- Ganache CLI
- IPFS

## Getting started

### Install Application Dependencies

- `git clone git@github.com:computablelabs/dapp-universities.git`

- `cd dapp-universities`

- `npm install`

### Install IPFS


##### MacOS Installation

This installation assumes you use MacOS and have [Homebrew](https://brew.sh)
installed and available.

In a new terminal tab, run:

- `brew install ipfs`

You can then manage IPFS via homebrew services

- `brew services start ipfs`

After installation is successful, run

- `ipfs init`

##### Non-MacOS Installation

For alternative installation instructions, visit
[IPFS](https://docs.ipfs.io/introduction/install/)

Make sure to start the IPFS Daemon in a new terminal window by running:

- `ipfs daemon`

##### Configuration

We also need to update the IPFS configuration to allow CORS requests by running:

- `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'`
- `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'`

Make sure to restart the IPFS daemon after updating the configuration, either
via the IPFS CLI or homebrew services.

### Install Ganache

To install the Ganache CLI, run

- `npm install -g ganache-cli`

To start the Ganache server, in a new terminal window, run:

- `ganache-cli`

- Copy address displayed on "Listening on"

In your dapp-university dir

- Run `cp ./.env.example ./.env`

- In your `.env` file, paste the ganache address as the value of `GANACHE_URL`

### Node

We use NVM to track an application's recommended node version.
You can find installation instructuctions [here](https://github.com/creationix/nvm#install-script)

The project contains a `.nvmrc` file in the root directory, which specifies our current version.
To use it, run:

- `nvm use`

If you do not currently have our recommended version of node installed, run:

- `npm install`
- `npm use`

### Run the application

- Run `npm run dev`

Copy the localhost address into browser

Enter your university name. You should now see it listed!!!

