# near-dojo

## Table of Content

- [near-dojo](#near-dojo)
  - [Table of Content](#table-of-content)
  - [Links](#links)
  - [Configurations](#configurations)
  - [Branches](#branches)
  - [Build Setup](#build-setup)
  - [Special Directories](#special-directories)
    - [`assets`](#assets)
    - [`components`](#components)
    - [`layouts`](#layouts)
    - [`pages`](#pages)
    - [`plugins`](#plugins)
    - [`static`](#static)
    - [`store`](#store)

---

## Links

 Frontend documentation [Google Docs](https://docs.google.com/document/d/1U4ImXTDYjx2OrLuqmUIrCYFbWKnOpXJ7RcvHjv5jIZ0/edit?usp=sharing)

 Test page [Heroku](https://near-dojo.herokuapp.com/)

---

## Configurations

Steps to mount the project locally

- Run the following line in your command line to install dependencies

```bash
# install dependencies
$ npm install
```

- Create a file called ".env" in your root directory for environment variables. If you need this file please contact the project owner.
NOTE: For security reasons, this file or file keys should never be shared or versioned

- Run the following line in your command line to run the local server and in the command line are going to show the url to open it

```bash
# serve with hot reload at localhost:3000
$ npm run dev
```

- To generate and test the build setup, just execute the next command lines

```bash
# build for production and launch server
$ npm run build
$ npm run start
```

---

## Branches

- main
  - this branch is the production one
- test
  - you can observe the changes and test before production, there is the link where the branch is deployed  [Heroku](https://near-dojo.herokuapp.com/)
- dev
  - here the changes will be made before sending to test

---

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

---

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
