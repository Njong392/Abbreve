import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ejectDb } from '../../src/lib/dbManager.js';
import db from './db.json' assert { type: 'json' };

ejectDb(db, `${dirname(fileURLToPath(import.meta.url))}/db`, {
    clearOutputBeforeInject: true,
}).then((totalAbrevs) => {
    console.log(
        `Db was ejected successfully!\nTotal Abbreviations: ${totalAbrevs}`
    );
});
