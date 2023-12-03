<div align="center">
  <img src="https://github.com/angcoder-c/camelkey/blob/main/branding/main.png">

[![JavaScript](https://img.shields.io/badge/logo-javascript-yellow?logo=nodedotjs)]()
[![npm](https://img.shields.io/npm/v/npm.svg?logo=npm)]()
[![Node.js Version](https://img.shields.io/badge/node.js-v18.17.1-brightgreen.svg)](https://nodejs.org/en/download/)
[![Documentation](https://img.shields.io/badge/api-reference-blue.svg)](https://github.com/angcoder-c/camelkey/blob/main/manual.md) 
[![Version](https://img.shields.io/badge/version-0.0.4-blue.svg)](https://github.com/angcoder-c/camelkey/tree/main)
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)

</div>

CamelKey is a password manager with a Command Line Interface (CLI) that allows you to create and manipulate credentials. It uses independent SQLite databases to manage information and provides the ability to organize credentials into different subgroups for more convenient administration. CamelKey features a variety of commands for viewing and managing stored credentials.

In the current phase of the project, there is no encryption implemented for either passwords or the databases themselves. However, it is planned to include this feature in future updates to ensure enhanced security in handling the information.

### Features

- Creation of Categories to store credentials.
- Creation of Groups within the categories.
- Independent shell sessions.
- Use of independent SQLite databases.
- Local storage included.

### Requirements

Make sure you have the following tools installed before using this project:

- [Node.js](https://nodejs.org/): The current version of Node.js is required.
- [npm](https://www.npmjs.com/): The current version of npm is required.

You can download and install Node.js from the [official Node.js website](https://nodejs.org/), which includes npm in the installation.

To check if you have Node.js and npm installed, you can use the following commands in your terminal:

```bash
node --version
npm --version
```

### Installation

1. Clone the repository
   ```
   git clone https://github.com/angcoder-c/camelkey.git
   ```

2. Go to the directory
   ```
   $ cd ~/camelkey/
   ```

3. Install it globally using npm
   ```
   $ npm install --global .
   ```

Or you can install it using the following command

   ```
   npm install -g camelkey
   ```

## Contributions

Contributions, whether in the form of issues or pull requests, are welcome and appreciated!

If you come across an issue, have an idea for a new feature, or just want to improve something in the project, feel free to open a new issue. Similarly, pull requests are welcomed to suggest changes or corrections.

Please follow these guidelines when contributing:

- Before opening a new issue, make sure to check if a similar issue already exists.
- If you're proposing changes through a pull request, be sure to clearly explain the purpose of the changes and provide details on any design or implementation decisions.

Thank you for your interest in contributing!

### License
- MIT
