# pointer

My open-source pointing poker application.

## Work In Progress

This project is still under development. Check out the issues and projects to see if there's anything you're interested in helping out with!

## Getting Started

### Prerequisites

Pointer uses [Pusher](https://pusher.com/), specifically their [presence channels](https://pusher.com/docs/client_api_guide/client_presence_channels#presence-channels), to handle communication between clients. This means you'll need to go to Pusher and create an application that you can use for this project.

### Installing

To get started, you'll need to clone the repo and install its dependencies. These examples will use [Yarn](https://yarnpkg.com/) since that is the maintained lock file, although npm should work just as well.

``` bash
git clone https://github.com/NathanHeffley/pointer.git
```

``` bash
# install dependencies
yarn
```

Now that you have the code downloaded, you should copy the `.env.example` to create a `.env` file. Add your public Pusher key (not your secret) and change the default cluster if your app uses a different location.

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

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
