const ask = require("./ask.js");
const moment = require("moment");
module.exports = (input, rl)=>{
  const questions = [];
  questions.push(ask({
    rl,
    question:"Work Id?",
    key:"wid",
    defaultOPT:"590797",
    value:input.wid}));
  questions.push(ask({
    rl,
    question:"Process Id?",
    key:"pid",
    defaultOPT:"26221208",
    value:input.pid}));
  questions.push(ask({
    rl,
    question:"Timezone?",
    key:"zone",
    defaultOPT:`${moment().utcOffset()/60}`,
    value:input.zone}));
  questions.push(ask({
    rl,
    question:"What date will you begin?",
    key:"begin",
    defaultOPT:moment().format("YYYY-MM-DD"),
    value:input.begin}));
  questions.push(ask({
    rl,
    question:"What date will you end?",
    key:"end",
    defaultOPT:moment().add(2, "days").format("YYYY-MM-DD"),
    value:input.end
    }));
  questions.push(ask({
    rl,
    question:"First shift start (military time)",
    key:"first",
    defaultOPT:"6",
    value:input.first
    }));
  questions.push(ask({
    rl,
    question:"Last shift start (military time)",
    key:"second",
    defaultOPT:"12",
    value:input.last
    }));
  return questions;
};
