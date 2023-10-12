import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Thomas";
const yourPassword = "Trebacz";
const yourAPIKey = "f1d4b804-a58a-4572-a293-03797d11ad15";
const yourBearerToken = "036b7af0-0943-4755-b79e-b9ca890c25c4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
 
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = JSON.stringify(response.data);
  
    //console.log("Initial API Response Object: "+JSON.stringify(result))
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth",async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth: {
          username: yourUsername,
          password: yourPassword
      },
      params: { yourUsername }
    });
    const result = JSON.stringify(response.data);
  
    console.log("Basic Auth API Response Object: "+result)
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const url = "https://secrets-api.appbrewery.com/filter?score=5&apiKey="+yourAPIKey;
    console.log("my url is: "+url);
    const response = await axios.get(url);
    const result = JSON.stringify(response.data);
  
    console.log("API key Response Object: "+result)
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };

  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", config);
    const result = JSON.stringify(response.data);
  
    console.log("Token Response Object: "+result)
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
