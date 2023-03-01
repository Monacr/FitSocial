## Obtaining Source Code: 

Our system uses only one repository and is able to be properly set up by looking at the README at the root directory of the repository. You can obtain all the souce code through this command: (in SSH) git@github.com:Monacr/FitSocial.git.


## Layout Structure of Directory: 

- [docs](./docs): The organizational documents relevant to the project; schedules, goals, and roles.
- [frontend](./frontend): Files relevant to the frontend of the project; static frontend files.
  - [assets](./frontend/assets): Frontend assets like images
  - [src](./frontend/src): Frontend source code
    - [bindings](./frontend/src/bindings): Backend generated Typescript inerface types
    - [components](./frontend/src/components): React UI components that don't represent screens.
    - [screens](./frontend/src/screens): React UI components represent entire screens.
    - [styles](./frontend/src/styles): General purpose UI css styles.
- [backend](./backend): Files relevant to the backend of the project; static backend files.
  - [src](./backend/src): backend source files.
    - [model](./backend/src): Source for the backend model files.
    - [server](./backend/src): Source for the backend server files.
    - [store](./backend/src): Source for the backend database files.
  - [dev.db](./backend/dev.db): SurrealDB generated and maintained database files for development. Delete this folder to reset the database.
  - [.github](./frontend): Github specfic files; Github action workflows and templates.

## Building the Software: 

Building the software can be found in the README of the root directory. Pretty much, you first must have Rust and Typescript installed. Then you need to cd to the frontend directory and install the necessary files by running “npm i”. Then you need to cd into the backend and switch the version of rust to nightly by running “restup default nightly.” Then we can run “cargo run” to completely start up the backend. Then we go back to the frontend directory and run “npm start” to start the frontend completely. Then, we can press “i” to run the IOS simulator that can correctly display the current status of the app.

No other steps are necessary to build and run the project, but for a more optimized backend you can run `cargo build --release` to generate a binary that is optimized for release since it does not contain debug info.

## Testing the Software: 

We test our software through launching the IOS emulator and trial and erroring thorugh running the app in live time. Then, we also have some tests located in the backend. You first need to direct to the backend and run `cargo test`. This checks the backend of the software. You can check for lint errors by running `cargo clippy`.

You can also test the frontend build by going to the frontend and running “npm run build —if-present.”


## Adding Tests: 

You can add tests by going to the backend folder and add tests in Rust in error.rs. You can use the Rust built in tests to check if the backend is working properly. 


## Building the Release of Software: 

Once we release the Software, we can build through the IOS app store. This will allow for more stability and have it running properly.
