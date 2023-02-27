import Constants from "expo-constants";
const { manifest } = Constants;

// URI of the backend (will change for production build)
export const URI = `http://${manifest.debuggerHost.split(":").shift()}:8000`;

export const PrimaryBlue = "#000080";
export const PrimaryGold = "#F5C528";
