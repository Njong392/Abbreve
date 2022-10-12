import chalk from "chalk";
import inquirer from "inquirer";
import { abbrExists, createAbbrev, removeAbbr } from "../lib/dbManager.js";

const prompt = inquirer.createPromptModule();

function isValidAbbr(abbr) {
  return /^([a-z]|[^A-Z])+$/g.test(abbr);
}

/**
 * TODO: Validate based on `_abbr` content
 *
 * @param {string} _abbr
 * @param {string} definition
 */
function isValidDefinition(_abbr, definition) {
  const initials = definition
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return /^[^a-z]+$/g.test(initials);
}

function getAlternatives(abbr, alternatives) {
  return new Promise((resolve, reject) => {
    prompt({
      name: "alt",
      message: `Add alternative definition for: "${abbr}". When you're done adding alternatives press Enter`,
      validate(alt) {
        if (alt.trim().length && !isValidDefinition(abbr, alt)) {
          return `"${alt}" does not follow our naming conventions`;
        }

        return true;
      },
    })
      .then(async ({ alt }) => {
        if (alt === "") {
          resolve(alternatives);
          return;
        }
        resolve(await getAlternatives(abbr, [...alternatives, alt]));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @type {{
 *   abbr: string,
 *   isModification: boolean,
 *   result: {
 *     encodedFileName: string,
 *     abbrev: string
 *   }
 * }[]}
 */
const abbrs = [];

async function shouldAddNewAbbr() {
  const { add_new_abbrev } = await prompt({
    name: "add_new_abbrev",
    message: "Would you like to add another abbreviation?",
    type: "confirm",
    default: false,
  });

  return add_new_abbrev;
}

function showEntryResults() {
  if (!abbrs.length) {
    console.log(chalk.gray("No file changes were made!"));
    return;
  }

  let hasMappings = false;

  console.log(chalk.bgGreen("\nSUCCESS!"));

  console.log(
    `Appropriate files for your entries were generated successfully!`
  );
  console.log("==========================\n");
  console.log("File Changes:", "\n====");
  abbrs.forEach(({ isModification, result }) => {
    console.log(
      chalk.bgBlueBright(isModification ? "updated" : "created"),
      `public/server/db/${result.encodedFileName}.json`
    );

    if (result.abbrev !== result.encodedFileName && !hasMappings) {
      hasMappings = true;
    }
  });

  if (hasMappings) {
    console.log();
    console.log(
      chalk.bgBlueBright("updated"),
      "public/server/encodedAbbrMappings.json"
    );
    console.log("\n==========================\n");
    console.log("Abbr Mappings:", "\n====");

    abbrs.forEach(({ result }) => {
      if (result.abbrev !== result.encodedFileName) {
        console.log(`${result.abbrev} => ${result.encodedFileName}`);
      }
    });
  }
}

function addAbbr() {
  prompt({
    name: "abbr",
    message: "Enter the abbreviation you want to add",
    type: "input",
    validate(abbr) {
      if (!abbr.trim().length) {
        return "Please provide an abbreviation!";
      }

      return true;
    },
  }).then(async ({ abbr: _abbr }) => {
    let isModification = false;
    const abbr = _abbr.toLowerCase();

    if (!isValidAbbr(_abbr)) {
      console.log(chalk.bgBlueBright(`Using ${abbr} instead of ${_abbr}`));
    }

    if (abbrExists(abbr)) {
      isModification = true;

      const { proceed_override } = await prompt({
        name: "proceed_override",
        message: `"${abbr}" already exists! Do you want to update it?`,
        type: "confirm",
        default: false,
      });

      if (!proceed_override) {
        console.log(chalk.bgGray("\nUPDATE CANCELLED\n"));
        if (await shouldAddNewAbbr()) {
          addAbbr();
        } else {
          console.log();
          showEntryResults();
        }
        return;
      }
    }

    prompt({
      name: "definition",
      message: `Enter the definition for: "${abbr}"`,
      validate(definition) {
        if (!definition.trim().length) {
          return "Please provide a definition";
        }

        if (!isValidDefinition(abbr, definition)) {
          return `"${definition}" does not follow our naming conventions`;
        }

        return true;
      },
    }).then(({ definition }) => {
      prompt({
        name: "has_alt",
        message: `Does "${abbr}" have other alternative definitions`,
        type: "confirm",
        default: false,
      }).then(async ({ has_alt }) => {
        let result;
        if (has_alt) {
          const alternatives = await getAlternatives(abbr, []);

          result = createAbbrev(
            abbr,
            {
              definition,
              alternatives: alternatives.join(", "),
            },
            null,
            true
          );
        } else {
          result = createAbbrev(abbr, { definition }, null, true);
        }

        abbrs.push({
          abbr,
          isModification,
          result,
        });

        console.log(chalk.blueBright("Entry saved!"));

        if (await shouldAddNewAbbr()) {
          addAbbr();
          return;
        }

        showEntryResults();
      });
    });
  });
}

prompt([
  {
    name: "action",
    message: "What would you like to do?",
    type: "list",
    choices: ["Add a new abbreviation", "Remove an existing abbreviation"],
  },
])
  .then((answer) => {
    if (answer.action == "Add a new abbreviation") {
      addAbbr();
    } else {
      prompt({
        name: "abbr",
        message: "What abbreviation do you want to remove?",
        type: "input",
        validate(abbr) {
          if (!isValidAbbr(abbr) && abbr.trim().length) {
            return `"${abbr}" is not a valid abbreviation`;
          }

          if (!abbrExists(abbr) && abbr.trim().length) {
            return `"${abbr}" does not exist`;
          }

          return true;
        },
      }).then(({ abbr }) => {
        if (!abbr.trim().length) {
          console.log(
            chalk.blueBright("No abbreviation provided, Delete Cancelled!")
          );
          return;
        }

        if (removeAbbr(abbr)) {
          console.log("Abbreviation was removed successfully!");
        } else {
          console.log(
            "An error occured whiles removing abbreviation.\nIf you think this is a bug, kindly report to https://github.com/Njong392/Abbreve/issues/new"
          );
        }
      });
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(
        "Sorry, this app cannot be run in your current environment"
      );
    } else {
      console.log(error);
    }
  });
