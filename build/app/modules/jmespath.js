// ALLOW US TO USE REQUIRE IN OUR MODULE
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const jmespath = require('jmespath');

export { jmespath }
