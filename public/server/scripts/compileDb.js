import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import { ejectDb } from "../lib/dbManager.js";
import chalk from "chalk";
import { error, log } from "console";

try {
  const db = JSON.parse(await readFile(new URL("../db.json", import.meta.url)));

  ejectDb(db, `${dirname(fileURLToPath(import.meta.url))}/../db`, {
    clearOutputBeforeInject: true,
  })
    .then((totalAbrevs) => {
      log(chalk.bgGreen("EJECTION JOB SUCCESSFUL!"), "\n====\n");
      log(
        chalk.green(
          `Db was ejected successfully!\nTotal Abbreviations: ${totalAbrevs}`
        )
      );
    })
    .catch((dbEjectError) => {
      log(chalk.bgRed("EJECTION JOB FAILED!"), "\n====\n");
      error(dbEjectError);
    });
} catch (dbImportError) {
  log(chalk.bgRed("DB IMPORT FAILED!"), "\n====\n");
  error(dbImportError);
}
