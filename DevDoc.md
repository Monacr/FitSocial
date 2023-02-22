## Obtaining Source Code: 

Our system uses only one repository and is able to be properly set up by looking at the README at the root directory of the repository. You can obtain all the souce code through this command: (in SSH) git@github.com:Monacr/FitSocial.git.


## Layout Structure of Directory: 

The layout of the directory starting from the root directory mainly consists of the backend and frontend. The docs folder is where we keep our living documents. The reports are a folder containing our weekly reports. The other documents other than the ones listed above are just data files and configurations needed to run the program. Directing to the frontend folder, the files other than the src folder are just more things needed to cause the program to function correctly. Directing to the src files, most of the code are in screens and styles. The style folder consists of typescript styles that we are implementing in to the separate screens. This clears up and allows us to reuse specific formats and styles. The screens folder contains the different screens we’ve implemented to display in our app. As for the backend, this is where all our tests and data files go. This sets up our server and feeds information to the frontend.


## Building the Software: 

Building the software can be found in the README of the root directory. Pretty much, you first must have Rust and Typescript installed. Then you need to cd to the frontend directory and install the necessary files by running “npm i”. Then you need to cd into the backend and switch the version of rust to nightly by running “restup default nightly.” Then we can run “cargo run” to completely start up the backend. Then we go back to the frontend directory and run “npm start” to start the frontend completely. Then, we can press “i” to run the IOS simulator that can correctly display the current status of the app.


## Testing the Software: 

We test our software through launching the IOS emulator and trial and erroring thorugh running the app in live time. Then, we also have some tests located in the backend. You first need to direct to the backend and run cargo test. This checks the backend of the software. You can also test the frontend build by going to the frontend and running “npm run build —if-present.”


## Adding Tests: 

You can add tests by going to the backend folder and add tests in Rust in error.rs. You can use the Rust built in tests to check if the backend is working properly. 


## Building the Release of Software: 

Once we release the Software, we can build through the IOS app store. This will allow for more stability and have it running properly.
