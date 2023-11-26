#!/usr/bin/env node

import { external } from './commands.js';
import { createDirs } from './utils/funcs.js';

try {
    createDirs();
    external.parse(process.argv)
} catch (e) { }