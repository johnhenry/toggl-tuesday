const padStart = require("string.prototype.padstart");
const moment = require("moment");
//Create request bodies from answers
module.exports = (answers, weekend)=>{
  const requests = [];
  const begin = moment(answers.begin);
  const end = moment(answers.end);
  const wid = answers.wid;
  const pid = answers.pid;
  const timezoneConnector = Number(answers.zone) < 0 ? "-" : "+";
  const timezone = Math.abs(Number(answers.zone)).toString();
  for (let m = moment(begin); m.diff(end, "days") <= 0; m.add(1, "days")) {
    if (!weekend, m.isoWeekday() > 5) {
      continue;
    }
    for(const shift of [answers.first, answers.second]){
      requests.push({
        "time_entry":
        {
          wid:Number(wid),
          pid:Number(pid),
          start:`${m.format("YYYY-MM-DD")}T${padStart(shift,2,"0")}:00:00${timezoneConnector}${padStart(timezone, 2,"0")}:00`,
          "duration":4*60*60,
          "created_with":"toggl-tuesday"
        }
      });
    }
  }
  return requests;
};
