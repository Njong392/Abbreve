import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { ejectDb } from '../../src/lib/dbManager.js';

try {
    const db = JSON.parse(
        await readFile(new URL('./db.json', import.meta.url))
    );

    ejectDb(db, `${dirname(fileURLToPath(import.meta.url))}/db`, {
        clearOutputBeforeInject: true,
    })
        .then((totalAbrevs) => {
            console.log(
                `Db was ejected successfully!\nTotal Abbreviations: ${totalAbrevs}`
            );
        })
        .catch((dbEjectError) => {
            console.log('An error occured whiles ejecting db\n====\n');
            console.error(dbEjectError);
        });
} catch (dbImportError) {
    console.log('An error occured whiles importing db\n====\n');
    console.error(dbImportError);
}
