# pointer

My open-source pointing poker application.

## Work In Progress

This project is still under development. Check out the issues and projects to see if there's anything you're interested in helping out with!

## Getting Started

### Prerequisites

Pointer uses [Pusher](https://pusher.com/), specifically their [presence channels](https://pusher.com/docs/client_api_guide/client_presence_channels#presence-channels), to handle communication between clients. This means you'll need to go to Pusher and create an application that you can use for this project.

### Installing

To get started, you'll need to clone the repo and install its dependencies. These examples will use [Yarn](https://yarnpkg.com/) since that is the maintained lock file, although npm should work just as well.

```bash
yarn install
```

Now that you have the code installed, you should copy the `.env.example` to create a `.env.local` file. Add your public PUsher key and change the default cluster if your app uses a different location.

### Development

To start the dev server on `localhost:8080`, simply run the `serve` command.

```bash
yarn run serve
```

You will also need to run the lambda function which will handle connecting the users to the Pusher channel. Start it by using the `netlify-lambda' command.

```bash
./node_modules/.bin/netlify-lambda serve src/functions
```

### Building

To build the static files and lambda function, simply run the `build` command.

```bash
yarn run build
```

### Testing

All new code for the project should be accompanied by reasonable tests. The only exception for this right now is code that directly interacts with Pusher, in which case steps for manually testing the feature should be included in your PR.

```bash
yarn run test:unit
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
