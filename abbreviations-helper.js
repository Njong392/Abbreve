/*
  This script can:
    1. Filter the abbreviations.json file to remove duplicate words and sort them alphabetically
    2. Check if a abbreviation is present
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

const filterAbbreviations = () => {
	const words = Object.keys(db);
	const uniqueWords = [...new Set(words)];

	const newDb = uniqueWords.reduce((acc, word) => {
		acc[word] = db[word];
		return acc;
	}, {});

	fs.writeFileSync(dbPath, JSON.stringify(newDb, null, 2));
	console.log("Filtering done");
};

const checkIfWordIsPresent = () => {
	readline.question("Enter the word you want to check: ", (word) => {
		const words = Object.keys(db);
		const isPresent = words.find((w) => w.toLowerCase() === word.toLowerCase());

		if (isPresent) {
			console.log(`\x1b[31m${word} is already present\x1b[0m`);
		} else {
			console.log(`\x1b[32m${word} is not present\x1b[0m`);
		}

		readline.close();
	});
};

readline.question(
	"What would you like to do? \n 1. Filter abbreviations \n 2. Check if an abbreviation is present in the database \n",
	(res) => {
		if (res !== "1" && res !== "2") throw new Error("Invalid choice");
		if (res === "1") {
			console.log("Filtering abbreviations...");
			filterAbbreviations();
			readline.close();
		} else if (res === "2") {
			checkIfWordIsPresent();
		}

		return;
	}
);
