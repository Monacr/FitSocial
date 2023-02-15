Fit Social is a primarily mobile social media platform that allows users to track, share, and compare their fitness progress. The ultimate goal of Fit Social is to bring people who have the same passion for fitness together and help them to gain motivation and information toward accomplishing their fitness goals.

## This repo is split into three main parts: 

[docs](./docs): The organizational documents relevant to the project; schedules, goals, and roles.

[frontend](./frontend): Files relevant to the frontend of the project; static frontend files.

[backend](./backend): Files relevant to the backend of the project; static backend files.

## Running for development

Before running, make sure you have [Rust installed](https://www.rust-lang.org/tools/install) and on the [frontend directory](./frontend) run

```shell
npm i
```

To run the backend server, go to [backend](./backend) and switch to the nightly version of rust

```shell
rustup default nightly
```

Then, run

```shell
cargo run
```

To serve the frontend, go to [frontend](./frontend) and run

```shell
npm start
```

You can then press `w` to view the UI locally on the web, or scan the QR code or click on the entry in Expo Go to run on mobile.

## Testing

You can test the backend by going to the [backend](./backend) and running 

```shell
cargo test
```

You can test if the frontend builds by going to the [frontend](./frontend) and running 

```shell
npm run build --if-present
```
