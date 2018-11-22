# pointer-frontend

The Vue client for my pointing poker application. Check out the server for this site over at [NathanHeffley/pointer-server](https://github.com/NathanHeffley/pointer-server).

## Work In Progress

This project is still under development. The main things to be accomplished for a confident release are...

- [ ] Display votes from other clients when joining a session (see [Issue #1](https://github.com/NathanHeffley/pointer-frontend/issues/1))

- [ ] Set up better `.env` files (see [Issue #2](https://github.com/NathanHeffley/pointer-frontend/issues/2))

- [x] Add tests

## Getting Started

### Prerequisites

Pointer uses [Pusher](https://pusher.com/), specifically their [presence channels], to handle communication between clients. This means you'll need to go to Pusher and create an application that you can use for this project.

### Installing

To get started, you'll need to clone the repo and install its dependencies. These examples will use [Yarn](https://yarnpkg.com/) since that is the maintained lock file, although npm should work just as well.

``` bash
git clone https://github.com/NathanHeffley/pointer-frontend.git
```

``` bash
# install dependencies
yarn
```

Now that you have the code downloaded, you should edit the `dev.env.js` and `prod.env.js` files in `/config` to use your Pusher account's client key. Please be careful about not including the changes to these files in any PRs. A better solution for these values is in the works over on our [second issue](https://github.com/NathanHeffley/pointer-frontend/issues/2).

### Running

There are several ways to run the server, either by running the hot reloading `dev` server or building the project and serving the `index.html` file it creates in `/dist`.

``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Testing

All new code for the project should be accompanied by reasonable tests. The only exception for this right now is code that directly interacts with Pusher, in which case steps for manually testing the feature should be included in your PR.

``` bash
# run tests
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](license) file for more details.
