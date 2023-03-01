## High-Level Description
Fit Social is a primarily mobile social media platform that allows users to track, share, and compare their fitness progress. 
The ultimate goal of Fit Social is to bring people who have the same passion for fitness together and help them to gain 
motivation and information toward accomplishing their fitness goals.
In this app, users will be able to upload their progressions and share them, interact with other users, 

The components of this app includes:
[frontend](./frontend): Files relevant to the frontend of the project; static frontend files.

[backend](./backend): Files relevant to the backend of the project; static backend files.

## Instructions for installing the software
Install [Rust](https://www.rust-lang.org/tools/install) by running the following command line in the [frontend directory](./frontend):

```shell
npm i
```
Make another tab in terminal, go to the [backend directory](./backend) and switch to the nightly version of rust by running:

```shell
rustup default nightly
```
Download 'Expo Go' on your mobile device

## Instructions for running the program
To run the backend server, go to the [backend](./backend) and run the following command:

```shell
cargo run
```

To serve the frontend, go to [frontend](./frontend) and run

```shell
npm start
```

## How to use the software
1. In the frontend directory, open the application on your mobile device
- If you have a Mac, you can press `i` to view the UI in your IOS simulator. You will need installed Xcode for this.
- If you want to run the app on your mobile device, scan the QR code or click on the entry in Expo Go to run on mobile.
2. The user enters their username and password to access their account/the app 
- If the user is a first time user, they can click the ign up button. From the prompted sign up screen can enter 
necessary information (username, password, email) to create user account.
3. The user has access to 5 different pages in the app:
- Profile, users can view their profile (work in progress)
- Home, users can scroll to view their feed
- Settings, users can log out
- Stats, users can analyze their fitness data (work in progress)
- Post, users can upload pictures as well as type text to post for their friends to see (work in progress)

## How to report a bug
Users can report bugs using the issues function in github and creating an issue. The user can report the bug by first
providing a summary of the bug in question, specifically the problem the user is facing. The user can then indicate if 
they can reproduce the bug at will, occasionally, or not at all. The user should then give steps which lead to the bug 
in question. The user should then indicate the expected and actual results of the functionality with facts. The user can
then finally give any additional information if need be. 

## Known Bugs
- Sometimes running `npm i` in the frontend for the first time does not install all the dependancies. You may need to run `npm i [required module]` if there is an error regarding an unkown npm module.
- If you do not have libclang you may need to install that for the backend to run properly.

