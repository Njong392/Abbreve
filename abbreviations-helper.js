/*
  This script can:
    1. Review duplicate definitions
    2. Check if a definition is used in another word

	!TODO:
		1. Check if a slang-word is already present in the database (check the casing too)
*/

import fs from "fs";
import path from "path";
import readLine from "readline";

const dbPath = path.join(process.cwd(), "public/server/db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

const readline = readLine.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const reviewDuplicates = () => {
	const duplicates = [];
	const words = Object.keys(db);

	words.forEach((word) => {
		const definition = db[word].definition;
		const duplicate = words.find(
			(w) => db[w].definition === definition && w !== word
		);

		if (duplicate) {
			duplicates.push({ word, duplicate });
		}
	});

	if (duplicates.length) {
		console.log("Duplicate definitions found:");
		console.log(duplicates);
	} else {
		console.log("No duplicate definitions found");
	}
};

const checkIfWordIsPresent = () => {
	readline.question("Enter the word you want to check: ", (word) => {
		const words = Object.keys(db);
		const isPresent = words.find((w) => w === word);

		if (isPresent) {
			console.log(`\x1b[31m${word} is already present\x1b[0m`);
		} else {
			console.log(`\x1b[32m${word} is not present\x1b[0m`);
		}

		readline.close();
	});
};

readline.question(
	"What would you like to do? \n 1. Review duplicate definitions \n 2. Check if a word is present in the database \n",
	(res) => {
		if (res !== "1" && res !== "2") throw new Error("Invalid choice");
		if (res === "1") {
			console.log("Reviewing duplicate definitions...");
			reviewDuplicates();
			readline.close();
		} else if (res === "2") {
			checkIfWordIsPresent();
		}

		return;
	}
);
