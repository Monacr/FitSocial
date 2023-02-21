## High-Level Description
Fit Social is a primarily mobile social media platform that allows users to track, share, and compare their fitness progress. 
The ultimate goal of Fit Social is to bring people who have the same passion for fitness together and help them to gain 
motivation and information toward accomplishing their fitness goals.
In this app, users will be able to upload their progressions and share them, interact with other users, 

[docs](./docs): The organizational documents relevant to the project; schedules, goals, and roles.

[frontend](./frontend): Files relevant to the frontend of the project; static frontend files.

[backend](./backend): Files relevant to the backend of the project; static backend files.

## Instructions for Installing the Software
Install [Rust](https://www.rust-lang.org/tools/install) by running the following command line in the [frontend directory](./frontend):

```shell
npm i
```
Making another tab, go to [backend](./backend) and switch to the nightly version of rust by running:

```shell
rustup default nightly
```

## Instructions for Running the Program
Before running the program, make sure to install `Expo Go` for the application.

To run the backend server, go to the [backend](./backend) and run the following command:

```shell
cargo run
```

To serve the frontend, go to [frontend](./frontend) and run

```shell
npm start
```

## How to use the software
In the frontend directory:
- If you are running the application on a website, you can then press `w` to view the UI locally on the web, 
- If you have a MacBook, you can press `i` to view the UI in your IOS simulator.
- If you want to run the app on your mobile device, scan the QR code or click on the entry in Expo Go to run on mobile.

## How to report a bug

You can test the backend by going to the [backend](./backend) and running

```shell
cargo test
```

You can test if the frontend builds by going to the [frontend](./frontend) and running

```shell
npm run build --if-present