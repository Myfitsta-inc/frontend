let ApiUrl = null;
const apiUrlProduction = {
  One: "https://myfitsta-backend-app-server.herokuapp.com/",
  content: "https://myfitsta.s3.us-east-2.amazonaws.com/",
  network: "https://realtimeserver.herokuapp.com/",
};

const apiUrlDevelopment = {
  One: "http://localhost:8000",
  content: "https://myfitsta.s3.us-east-2.amazonaws.com/",
  network: "http://localhost:4000",
};

if (process.env.NODE_ENV == "production") {
  ApiUrl = apiUrlProduction;
} else {
  ApiUrl = apiUrlDevelopment;
}

export default ApiUrl;
