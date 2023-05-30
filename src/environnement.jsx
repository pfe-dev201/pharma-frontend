const ENVIRONNEMENTS = {
  production: {
    API_URL: "",
    BACKEND_URL: ""
  },
  developpement: {
    API_URL: "http://127.0.0.1:8000/api",
    BACKEND_URL: "http://127.0.0.1:8000"
  }
};

const APP_ENV = "developpement";

export default function getEnvironnement(){
  return ENVIRONNEMENTS[APP_ENV];
}