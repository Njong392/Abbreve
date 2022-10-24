import { mkdir, rm, writeFile } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import inquirer from "inquirer";
import { log } from "console";
import { setAbbrFilesMap } from "../lib/dbManager.js";

const directory = resolve(dirname(fileURLToPath(import.meta.url)), "../db");

export default function cleanupDb() {
  return new Promise((resolve, reject) => {
    rm(
      directory,
      {
        recursive: true,
        force: true,
      },
      (err) => {
        if (err) {
          reject(err);
          return;
        }

        // resolve("dskkjfsfkj");
        // return;

        mkdir(
          directory,
          {
            recursive: true,
          },
          (err) => {
            if (err) {
              reject(err);
              return;
            }

            writeFile(
              `${directory}/.gitignore`,
              "",
              {
                flag: "w",
              },
              (err) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve("DB chunks were cleared successfully");
              }
            );

            setAbbrFilesMap({});
          }
        );
      }
    );
  });
}

inquirer
  .prompt({
    name: "confirmed",
    message: "**WARNING**: Are you sure you want to clean up DB",
    type: "confirm",
    default: false,
  })
  .then(({ confirmed }) => {
    if (!confirmed) {
      return;
    }

    cleanupDb()
      .then((message) => {
        log(chalk.bgGreen("CLEAN UP JOB SUCCESSFUL!"), "\n====\n");
        log(chalk.green(message));
      })
      .catch((err) => {
        log(chalk.bgRed("CLEAN UP JOB FAILED!"), "\n====\n");
        log(chalk.red(err));
      });
  });
