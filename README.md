# Cypress in the GitLab 

Sample project for the intermediate course of the Talking About Testing online school.

## Pre-requirements 📋

For this project you will need [Node](https://nodejs.org/en) and [Docker](https://docs.docker.com/get-docker/) installed in your computer.

> I used versions `v18.17.1` and `9.6.7` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation 🔧

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Docker 🐋
With docker running in your computer, run the command and wait till it finishes.
```
docker run --publish 80:80 --publish 22:22 --hostname localhost wlsf82/gitlab-ce
```
> [!Note]
> 🕐 This will take a while when running for the first time.
<br>
You can acess the app at http://localhost/ from your host system.

## Setup ⚙️
- When you run the container for the first time, you will need to setup a new password for the `root` user.<br>
Just go to http://localhost/ and change your password. You will need to remember it later.
- Login with your `root` user. Click on the user avatar on the top right corner. Click on _Settings_ and on the left menu in the settings page, click on _Acess Token_.<br>
On the _name_ field write `cypress-intermediario-v2`. In the section _Scopes_ select the option `api` and then click on the _Create Personal acess token_ button.
Store the token somewhere safe, we will need it in the next step.
- You will also need to setup and SSH key. You can see how to generate them in the [Generating a new ssh key pair](http://localhost/help/ssh/README#generating-a-new-ssh-key-pair).

## Environment 🌲
Before running the tests, you will need to set the gitlab credentions  we created before in the `cypress.example.env.json` file. <br>
```json
{
    "user_name": "root",
    "user_password": "",
    "gitlab_access_token": ""
}
```
Don't forget to rename the file to `cypress.env.json`

## Tests ✔️

You can run the tests simulating a desktop viewport.

### Desktop 💻

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

## Support this project 🙌

If you want to support this project, leave a ⭐.

___

This project was developed during the [Talking About Testing course](https://github.com/wlsf82/cypress-intermediario-v2).<br>
