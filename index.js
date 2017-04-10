#!/usr/bin/env node
const moment = require("moment");
const yargs = require("yargs");
const prettyjson = require("prettyjson");
const readline = require("readline");

const URL = require("./lib/URL.js");
const processRequests = require("./lib/processRequests.js");
const getQuestions = require("./lib/getQuestions.js")
const getRequests = require("./lib/getRequests.js")
const getRecords = require("./lib/getRecords.js")

const main = async(input)=>{
  try{
    const {test, apiToken, username, password, weekend, verbose, silent, record, yes} = input;

    //Nullify console output console if "silent" flag is passed
    if(silent){
      console.log = console.error = ()=>{};
    }

    //Check for authentication credentials
    //(Ignore if "test" flag is passed)
    if((!apiToken && !(username && password)) && !test){
      throw new Error(
`Authentication expected. Provide authentication:
  - via the --apiToken flag. (${URL.GET_API_TOKEN}).
  - OR with BOTH the --username and --password flags
Otherwise, use the --test flag to preview without authentication
OR use the --help flag for more options`);
    }

    if(record){
      return console.log(prettyjson.render(await getRecords(apiToken, username, password)));
    }

    //Determine questions to ask from input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const questions = getQuestions(input, rl);

    //Ask questions
    const answers = {};
    for (const question of questions){
      const {key, value} = await question();
      answers[key] = value;
    }


    //Display request
    const requests = getRequests(answers, weekend)
    for(const request of requests){
      console.log(prettyjson.render(request));
    }
    //Quit if test flag was passed
    if(test){
      console.log("\n...this was only a test.");
      return;
    }

    //Ensure user wants to attemt to make changes
    if(!yes){
      await new Promise((resolve, reject)=>{
        rl.question("Make these updates? (Y/n)", (answer)=>{
          if(answer && answer[0].toLowerCase() !== "y"){
            return reject(new Error("aborted"));
          }
          return resolve();
        })
      });
    }
    rl.close();
    console.log("updating entries...")
    //Send requests
    const {successes, errors} = await processRequests(requests, apiToken, username, password);
    //Log the results
    console.log(`${successes.length} entries successful request(s)`);
    if(verbose){
      for(const request of successes){
        console.log(prettyjson.render(request));
        console.log("successful!");
      }
    }
    console.log(`${errors.length} error(s):`)
    if(verbose){
      for(const error of errors){
        console.log(prettyjson.render(error));
        console.log("failed!");
      }
    }
    console.log(`This is ALPHA software. Visit ${URL.TIMER} to check that everything worked as advertised.`);
  }catch(error){
    //Log error
    console.error(error.message);
  }
}

main(yargs
    .usage("$0 <options>")
    .option("t", {
      alias: "test",
      describe: `Preview changes.`,
      type: "boolean"
    })
    .option("a", {
      alias: "apiToken",
      describe:  `API Token from ${URL.API}`,
      type: "string"
    })
    .option("username", {
      describe:  `Your Toggl Username`,
      type: "string"
    })
    .option("password", {
      describe:  `Your Toggl Password`,
      type: "string"
    })
    .option("k", {
      alias: "weekend",
      describe: `Include Weekends`,
      type: "boolean"
    })
    .option("v", {
      alias: "verbose",
      describe: `Verbose Logging`,
      type: "boolean"
    })
    .option("s", {
      alias: "silent",
      describe: `No Logging`,
      type: "boolean"
    })
    .option("w", {
      alias: "wid",
      describe:  `Set Answer: Work Id`,
      type: "string"
    })
    .option("p", {
      alias: "pid",
      describe:  `Set Answer: Process Id`,
      type: "string"
    })
    .option("z", {
      alias: "zone",
      describe:  `Set Answer: Timezone`,
      type: "string"
    })
    .option("b", {
      alias: "begin",
      describe:  `Set Answer: beginning date`,
      type: "string"
    })
    .option("e", {
      alias: "end",
      describe:  `Set Answer: ending date`,
      type: "string"
    })
    .option("f", {
      alias: "first",
      describe:  `Set Answer: first shift start (military time)`,
      type: "string"
    })
    .option("l", {
      alias: "last",
      describe:  `Set Answer: last shift start (military time)`,
      type: "string"
    })
    .option("r", {
      alias: "record",
      describe: `Get a list of records`,
      type: "boolean"
    })
    .option("y", {
      alias: "yes",
      describe: `Skip confirmation`,
      type: "boolean"
    })
    .help("h")
    .alias("h", "help")
    .argv)
  .then(()=>process.exit(0))
  .catch(()=>process.exit(1));
