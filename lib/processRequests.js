const fetch = require("node-fetch");
const URL = require('./URL.js');
module.exports = async(requests, apiToken, username=apiToken, password="api_token") =>{
  const successes = [], errors = [];
  const headers = {
    "Authorization": "Basic " + new Buffer(username + ":" +password, "utf8")
    .toString("base64"),
    "Content-Type": "application/json"
  }
  for(const request of requests){
    try{
      const response = await fetch(
        URL.API
        ,{
           method: "post"
           , headers
           , body:JSON.stringify(request)});
      if(!response.ok){
        const text = await response.text();
        throw {status:response.status,
                statusText:response.statusText,
                text};
      }
      successes.push(await response.json());
    }catch(error){
      errors.push(error);
    }
  }
  return {successes, errors};
};
