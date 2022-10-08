import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

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
 * @param {string} directory
 * @param {{
 *     clearOutputBeforeInject: boolean
 * }} options
 * @returns { Promise<int>}
 */
export function ejectDb(db, directory, options = {}) {
    const _options = {
        clearOutputBeforeInject: false,
        ...options,
    };

    /** @type {Db} */
    let parsedDb;

    return new Promise((resolve, reject) => {
        parsedDb = db;
        if (typeof db === 'string') {
            try {
                parsedDb = JSON.parse(db);
            } catch {
                reject('The provided string is not a valid JSON');
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
 * @param {string} abbrev
 * @param {Abbrev} details
 * @param {string} ejectDirectory
 */
export function createAbbrev(abbrev, details, ejectDirectory) {
    if (!isAbbrevValid(details)) {
        return false;
    }

    let encodedAbbrMappingsFile = resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../../public/server'
    );
    encodedAbbrMappingsFile += '/encodedAbbrMappings.json';
    let fileMappings;

    try {
        fileMappings = JSON.parse(
            fs.readFileSync(encodedAbbrMappingsFile, {
                encoding: 'utf-8',
            })
        );
    } catch (e) {
        if (e.code !== 'ENOENT') {
            return false;
        }

        fileMappings = {};
    }

    const encodedFileName = encodeURIComponent(abbrev);

    if (encodedFileName !== abbrev) {
        fileMappings[encodedFileName] = abbrev;
    }

    fs.writeFileSync(
        encodedAbbrMappingsFile,
        JSON.stringify(fileMappings, null, 2),
        {
            flag: 'w',
        }
    );

    fs.writeFileSync(
        `${ejectDirectory}/${encodedFileName}.json`,
        JSON.stringify(details, null, 2),
        {
            flag: 'w',
        }
    );

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
        (typeof abbrev?.alternatives == 'string' ||
            typeof abbrev?.alternatives == 'undefined') &&
        typeof abbrev?.definition == 'string'
    );
}
