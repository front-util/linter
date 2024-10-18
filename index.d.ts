import type { Linter } from "eslint";

import * as utils from './src/utils.js';
export namespace configs {
    let standart: Linter.Config[];
    let test: Linter.Config[];
    let ts: Linter.Config[];
    let react: Linter.Config[];
    let monorepo: Linter.Config[];
}
export { utils, };