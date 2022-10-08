# HOW TO

## Generate Abbrevs from db.json

In your terminal run the script `db:eject`: `npm run db:eject`
> *WARNING*: `db:eject` script should **ONLY** be run if it's content is newer than the definitions in the `db` directory, since by default, all generated definitions in the `db` directory would be cleared before generating new ones.

## Adding New Abbreviations

To add a new abbreviation, first follow the steps to clone the repository to your dev environment [here](https://github.com/Njong392/Abbreve#steps)

Currently, there are two ways to add new abbreviations.

### 1. Manually adding in the `db` directory

This option requires you to manually create definition files in the `public/server/db` directory.
Follow the steps below to manually add an abbreviation

1. Create a new file in the `public/server/db` directory with the abbreviation you want to add as the file name.  
E.g. To add `lol`, create a new file called `lol.json` inside the `public/server/db` directory.
2. In your newly created file, enter the definitions for your abbreviation. The abbreviation should have the following properties:

```MD
*definition*: [REQUIRED!] A string showing the full form of the abbreviation,
*alternatives*: [OPTIONAL] A list of alternative `definition`s for the abbreviation, separated by a comma (,)
```

Examples:

An abbreviation with only a single definition (no alternatives)

```JSON
{
    "definition": "Laugh Out Loud"
}
```

An abbbreviation that has multiple definitions (has alternatives)

```JSON
{
    "definition": "Looks Good To Me",
    "alternatives": "Looks Great To Me, Looks Great To Merge"
}
```

> :information_source: If you encounter any issues with the file naming, kindly use the [CLI option](#2-using-the-cli) instead

### 2. Using the CLI

Using our CLI to add definitions is very easy, as it handles all file naming issues and also validates the definitions to ensure that they follow our [naming conventions](#warning-important-naming-conventions).  
Follow the steps below to add a new definition using our CLI

1. From your terminal, run the `db:entry` script. E.g. `npm run db:entry`
2. Choose the first option (Add a new abbreviation)  
   > :bulb: You can choose an option using your up/down arrow keys

3. Enter the abbreviation you want and press `Enter`
4. Enter the `definition` of your abbreviation and press `Enter`
5. If you have other alternatives press `y` on your keyboard and Press `Enter`. If you do not have any alternatives, press `n` and press `Enter`
   > If you chose `y` (have other alternatives), the alternative and press `Enter`. When you are done adding your alternative, press `Enter` without entering anything else  
   >
   > :information_source: Do not separate multiple alternatives at once with a comma. Instead, press `Enter` after each alternative and follow the instructions on your screen

6. If you have other abbreviations to add again, press `y` on your keyboard and press `Enter`. Otherwise, press `n` and press `Enter` again.
7. Review your changes in the `public/server/db` directory and proceed with creating a PR.

> If you encounter any error whiles using the CLI, kindly report it [here](https://github.com/Njong392/Abbreve/issues/new)

### :warning: **IMPORTANT** Naming Conventions

Before pushing your changes, please check and ensure that all your additions follow the naming conventions listed below:

* The slang is in lowercase. For example, `lol` and **not** `Lol` or `LOL`
* The first letter of each word in the definition and alternatives **must** be *capitalized*. For example, `Looks Good To Me` and **not** `Looks good to me` or `looks good to me`

> *Any addition that do not follow the above naming conventions would be rejected.*
