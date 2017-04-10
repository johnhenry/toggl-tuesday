const fetch = require("node-fetch");
const URL = require('./URL.js');
module.exports = async(apiToken, username=apiToken, password="api_token") =>{
  const successes = [], errors = [];
  const headers = {
    "Authorization": "Basic " + new Buffer(username + ":" +password, "utf8")
    .toString("base64"),
    "Content-Type": "application/json"
  }
  try{
    const response = await fetch(
      URL.API_GET
      ,{
         method: "get"
         , headers});
    if(!response.ok){
      const text = await response.text();
      throw {status:response.status,
              statusText:response.statusText,
              text};
    }
    return await response.json();
  }catch(error){
    return error;
  }
};
