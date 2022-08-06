const schedule = require("node-schedule");

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, 2, 3, 4, 5];
rule.hour = 0;
rule.minute = 0;
rule.second = 0;
rule.tz = "Asia/Shanghai";

function startScheduler() {
  schedule.scheduleJob(rule, function() {
    console.log("The answer to life, the universe, and everything!");
  });
}

startScheduler();
