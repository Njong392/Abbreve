let fs = require("fs");
let prompt = require("prompt-sync");

let input = prompt();

// directly from stackoverflow 😅
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const checkIfExists = (key, json) => {
  return key in json;
};

const register = (abbr, meaning) => {
  if (!abbr || !meaning) {
    console.log("Can't add blank!");
    return;
  }
  fs.readFile("./public/server/db.json", function (err, data) {
    var json = JSON.parse(data);

    abbr = abbr.toLowerCase();
    let exist = checkIfExists(abbr, json);
    if (exist) {
      console.log(`${abbr} already exist`);
      return;
    }
    json[abbr] = { defination: toTitleCase(meaning) };

    fs.writeFile("./public/server/db.json", JSON.stringify(json), (err) => {
      if (err) throw err;
      console.log(`${abbr} added to list`);
    });
  });
};

let Abbreviation = input("Enter abbreviation: ");
let meaning = input(`(${Abbreviation.toLowerCase().trim()}) Definition: `);

register(Abbreviation.trim(), meaning.trim());
