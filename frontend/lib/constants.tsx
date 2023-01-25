import Constants from "expo-constants";
const { manifest } = Constants;

// URI of the backend (will change for production build)
export const URI = `http://${manifest.debuggerHost.split(":").shift()}:8000`;
