import fs, { rmSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const CURR_DIR = dirname(fileURLToPath(import.meta.url));

const ENCODED_ABBR_MAPPING_FILE = resolve(
  CURR_DIR,
  "../encodedAbbrMappings.json"
);

const DB_FILES_LOCATION = resolve(CURR_DIR, "../db");

/**
 *
 * I'm using the current structure for now, this would be updated once
 * a decision is made on structure
 * @typedef {{
 *     definition: string,
 *     alternatives?: string
 * }} Abbrev
 *
 * @typedef {{
 *     [key: string]: Abbrev
 * }} Db
 *
 * @typedef {{
 *     [key: string]: string
 * }} FilesMap
 */

/**
 * Helper function to export abbrevs into their own JSON files. Lifes too short
 * to be doing that manually man.
 *
 * It returns a promise which resolves to the number of successful
 * abbreviations ejected
 *
 *
 * @param { string | Db } db
 * @param {string} directory Directory to eject to. If null,
 *                           `DB_FILES_LOCATION` would be used
 * @param {{
 *     clearOutputBeforeInject: boolean
 * }} options
 * @returns { Promise<int>}
 */
export function ejectDb(db, directory = null, options = {}) {
  const _options = {
    clearOutputBeforeInject: false,
    ...options,
  };

  if (!directory) {
    directory = DB_FILES_LOCATION;
  }

  /** @type {Db} */
  let parsedDb;

  return new Promise((resolve, reject) => {
    parsedDb = db;
    if (typeof db === "string") {
      try {
        parsedDb = JSON.parse(db);
      } catch {
        reject("The provided string is not a valid JSON");
      }
    }

    if (_options.clearOutputBeforeInject) {
      fs.rmSync(directory, {
        recursive: true,
        force: true,
      });

      fs.mkdirSync(directory, {
        recursive: true,
      });
    }

    let ejectedCount = 0;
    const abbrevs = Object.keys(parsedDb);

    try {
      for (let i = 0; i < abbrevs.length; i++) {
        const abbrev = abbrevs[i];
        if (createAbbrev(abbrev, parsedDb[abbrev], directory)) {
          ejectedCount++;
        }
      }

      resolve(ejectedCount);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 *
 * @returns {null | FilesMap}
 */
export function getAbbrMapping() {
  try {
    return JSON.parse(
      fs.readFileSync(ENCODED_ABBR_MAPPING_FILE, {
        encoding: "utf-8",
      })
    );
  } catch (e) {
    if (e.code !== "ENOENT") {
      return null;
    }

    return {};
  }
}

/**
 *
 * @param {FilesMap} filesMap
 */
export function setAbbrFilesMap(filesMap) {
  fs.writeFileSync(
    ENCODED_ABBR_MAPPING_FILE,
    JSON.stringify(filesMap, null, 2),
    {
      flag: "w",
    }
  );
}

/**
 *
 * @param {string} abbrev
 * @param {Abbrev} details
 * @param {null | string} ejectDirectory Directory to export db file to
 *                                       If null, `DB_FILES_LOCATION` would
 *                                       be used
 * @param {boolean} returnData
 */
export function createAbbrev(
  abbrev,
  details,
  ejectDirectory = null,
  returnData = false
) {
  if (!ejectDirectory) {
    ejectDirectory = DB_FILES_LOCATION;
  }

  if (!isAbbrevValid(details)) {
    return false;
  }

  let filesMap = getAbbrMapping();

  if (null === filesMap) {
    return false;
  }

  const encodedFileName = encodeURIComponent(abbrev);

  if (encodedFileName !== abbrev) {
    filesMap[encodedFileName] = abbrev;
  }

  setAbbrFilesMap(filesMap);

  fs.writeFileSync(
    `${ejectDirectory}/${encodedFileName}.json`,
    JSON.stringify(details, null, 2),
    {
      flag: "w",
    }
  );

  if (!returnData) {
    return true;
  }

  return {
    abbrev,
    encodedFileName,
  };
}

/**
 *
 * @param {string} abbr
 */
export function abbrExists(abbr) {
  return fs.existsSync(
    resolve(CURR_DIR, `../db/${encodeURIComponent(abbr)}.json`)
  );
}

/**
 *
 * @param {string[]} existingDefinitions
 * @param {string} currDefinition
 */
export function definitionExists(existingDefinitions, currDefinition) {
  return existingDefinitions.some((definition) => {
    return definition.toLowerCase() == currDefinition.toLowerCase();
  });
}

/**
 *
 * @param {string} abbr Abbreviation to remove
 * @param {null|string} directory Directory to remove abbreviation from
 *                           If null, `DB_FILES_LOCATION` would be used
 */
export function removeAbbr(abbr, directory = null) {
  if (!directory) {
    directory = DB_FILES_LOCATION;
  }

  const encodedFileName = encodeURIComponent(abbr);
  const filesMap = getAbbrMapping();

  if (null === filesMap) {
    return false;
  }

  delete filesMap[encodedFileName];
  setAbbrFilesMap(filesMap);
  rmSync(resolve(directory, `${encodedFileName}.json`), {
    force: true,
  });

  return true;
}

/**
 * Checks if the abbrev has a valid structure
 *
 *
 * @param {Abbrev} abbrev
 */
export function isAbbrevValid(abbrev) {
  return (
    (typeof abbrev?.alternatives == "string" ||
      typeof abbrev?.alternatives == "undefined") &&
    typeof abbrev?.definition == "string"
  );
}
