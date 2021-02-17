> This project is under development with no release date. Both of us don't have a lot of free time so we'll work on it whenever we can. We're both fed up with how bad all other ShareX upload servers are so we decided to make out own. If you're interested in this, please come back at a later date. Thank you

# Yet another ShareX upload server

Full-featured upload server for applications such as ShareX, supporting images, text, files & short urls.

<p float="left">
<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>

<img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/>

<img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
</p>

## Roadmap

- Complete: ✅
- In development: 👷‍♀️
- Planned: 📋

| Feature            | Status | Assigned to |
| ------------------ | ------ | ----------- |
| API key generation | 👷‍♀️     | Andrei      |
| Image Hosting      | 👷‍♀️     | Andrei      |
| Text upload        | 📋     | Tom         |
| Misc. file upload  | 📋     | -           |
| URL shortening     | 👷‍♀️     | Tom         |
| Client web app     | 📋     | Tom         |
| Dockerfile         | 📋     | -           |
| ShareX configs     | 📋     | -           |
| systemd config     | 📋     | -           |

## Installation

Installing the app is extremely simple:

### With NPM

```bash
mkdir upload-server && cd "$_"
git clone https://github.com/Andyterrify/another-upload-server.git .
cp .env.example .env #This will need to be edited
npm install
npm run build
```

### With Yarn (Recommended over npm)

```bash
mkdir upload-server && cd "$_"
git clone https://github.com/Andyterrify/another-upload-server.git .
cp .env.example .env #This will need to be edited
yarn install
yarn build
```

### With Docker

Container setup to run the app in VSCode with a MongoDB instance alongside.
To run you require the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention. Then `Ctrl-Shift-P` or press the key `F1` to open the run menu and run `Rebuild and Reopen in Container`. This does not work through remote SSH sessions.

Down the line I will provide a production ready compose file

## Running

To run the app, simply use `npm run start` or `yarn start` - in the future we'll provide a systemd config to run it as a service. For temporary installations we recommend using `tmux` or `screen`.
