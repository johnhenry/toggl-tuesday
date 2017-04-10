# toggl-tuesday

Easily update your [Toggl](https://www.goggle.com) timesheet from the commandline. Unlike other tools, such as [toggl-clii](https://github.com/drobertadams/toggl-cli), this provides a wizard that allows one to bulk update over several dates. Toggl-tuesday will create two 4-hours shifts for a specified date range. Weekends are skipped by default.

## Pre-Requesites

Before getting this to run, you'll first need to download and install node and npm. Checkout [nodejs.org](https://nodejs.org/en/) for more details.

## Installation

To uninstall using npm, simply run the following command.

```bash
npm install --global toggl-tuesday
```

## Usage

To use toggl-tuesday, simply type `toggl-tuesday` along with an api key that you can get from [https://toggl.com/app/profile](https://toggl.com/app/profile)

```bash
toggl-tuesday --apiKey <api key>
```
OR

```bash
toggl-tuesday -a <api key>
```


Although it's not recommended, you can also use your username and password.

```bash
toggl-tuesday --username <user name> --password <password
```

### Getting help

View the help by typing


```bash
toggl-tuesday --help
```
OR

```bash
toggl-tuesday --h
```

### Questions

Once started, the wizard will ask you a number of questions. Press `Enter` without typing to accept the default value. You can force the wizard to skip a question by specifying the answer using a command line flag.

#### Work Id

Frankly, I'm not sure what this represents, the API needs this value to function properly. I've found the best way to get this value is to use the records flag to give you a list of previously entered records.

```bash
toggl-tuesday -a <api key> --records
```

OR

```bash
toggl-tuesday -a <api key> -r
```

Note: Skip by setting the --wid or -w flag.

#### Process Id

This identifies the project upon which you're working. As with the Work Id, this is most easily obtained by looking at previous records usint the `--records` flag.

Note: Skip by setting the --pid or -p flag.

#### Timezone

This is the timezone offset. The application should deduce this automatically.

Note: Skip by setting the --timezone or -z flag.
Be sure that the date is in the proper format: an integer from -12 to +12


#### What date will you begin?

This is the beginning date for your records it currently defaults to the current day.
Be sure that the date is in the proper format: YYYY-MM-DD

Note: Skip by setting the --begin or -b flag.


#### What date will you end?

This is the end date for your records it currently defaults to two days from the current day (not from the specified begin date, but today's date).
Be sure that the date is in the proper format: YYYY-MM-DD

Note: Skip by setting the --end or -e flag.

Additional Note: I had initially wanted this to default to two weeks, but toggl currently "has issues" displaying times in the future. I'm fairly confident that this works properly, but I'll wait until a future release to bump the timeframe. Until then, you may specify the date directly if you want this to go a full two weeks.

#### First shift start?

This is the beginning of your first 4 hour shift. It defaults to 6 (6am).
Be sure that the date is in the proper format: an integer from 0 to 24

Note: Skip by setting the --first or -f flag.


#### Last shift start?

This is the beginning of your last 4 hour shift. It defaults to 12 (12pm).
Be sure that the date is in the proper format: an integer from 0 to 24

Note: Skip by setting the --last or -l flag.


### Example Pre-Answer

Ideally, you would run `toggle-tuesday` with a few pre-defined flags. Here's an example of how to do this.

Lets say that:
  - I have a work id of 10000
  - I have a process id of 99999
  - I live on the east coast of the US (GMT -4)
  - I plan to enter time starting on April 1st of 2017 (2017-04-01)
  - I plan on ending on April 30th (2017-04-30)
  - I plan on working my first four-hour shift starting at 7am (7 hours)
  - I plan on working my second four-hour shift starting at 1pm (13 hours)

I can use the following command to skip all of the questions in the wizard (note: the -y flag)

```bash
toggl-tuesday -a <api token> -w 10000 -p 99999 -z -4 -b 2017-04-01 -e 2017-04-30 -s 6 -e 13 -y
```

Of course, I don't have to -- and probably shouldn't -- specify everything. If anything is skipped, the wizard will ask you for it. This will be useful for running the same command, but on multiple days.

```bash
toggl-tuesday -a <api token> -w 10000 -p 99999 -z -4 -b
What date will you begin? (2017-04-10)
```

### Other flags

#### Test (--test, -t)

You can use the test flag to preview changes without making them. If you provide the test flag, you won't need to provide credentials.

#### Weekends (--weekend, -k)

You can use the weekend flag to ensure that weekends are NOT SKIPPED.

#### Verbose (--verbose, -v)

You can use the verbose flag to get a bit more information out of the console.

#### Silent (--silent, -s)

You can use the silent flag to supress all output from the console.
WARNING: ALL OUTPUT WILL BE SUPRESSED

#### Yes (--yes, -y)

Automatically answer "yes" to "Make these updates? (Y/n)" question.
