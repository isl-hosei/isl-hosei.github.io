# Build website using Docusaurus

[Docusaurus](https://docusaurus.io/) is a static site generator.

## Install Node.js

Run the following command to install Node.js and npm on macOS:

```bash
brew install node
```

After installing Node.js, you can check the version of Node.js and npm by running the following commands:

```bash
node -v
npm -v
```
## Create a Docusaurus project

Then, create a new Docusaurus project using the following command:

```bash
npx create-docusaurus@latest my-website classic --typescript
```

The `--typescript` flag is used to create a TypeScript project. If you want to create a JavaScript project, you can run the following command instead:

```bash
npx create-docusaurus@latest my-website classic
```

A new directory called `my-website` will be created, and the project structure will look like this:

```
my-website
├── blog
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── README.md
├── sidebars.js
└── yarn.lock
```

## Preview

Run a local development server to preview the website:

```bash
cd my-website
npm run start
```

The website will be available at `http://localhost:3000/`. 

## Build

To build the website for production, run the following command:

```bash
npm run build
```

This will create a `build` directory containing the static files for the website.

## Deploy to GitHub Pages

First, we need to modify the `docusaurus.config.js` file to set the following parameters:

- url
- organizationName
- projectName
- trailingSlash
- deploymentBranch

Then, we can deploy the website to GitHub Pages using the following command:

```bash
export GIT_USER=<your-github-username> 
npm run deploy
```

`npm run deploy` will require the **personal access token** (PAT) of your GitHub account. You can create a PAT by going to your GitHub account settings, then to Developer settings > Personal access tokens > Tokens (classic) > Generate new token.

After inputing the PAT, the website will be deployed to the `gh-pages` branch of your GitHub repository.

Finally, don't forget to go to the `Settings` tab of your GitHub repository and enable GitHub Pages for the `gh-pages` branch. 