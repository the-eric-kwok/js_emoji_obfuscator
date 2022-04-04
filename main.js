#!/usr/bin/env node
'use strict';
const JavascriptObfuscator = require('javascript-obfuscator');
const path = require('path');
const printHelp = require('./src/printHelp');
const identifierDictGenerator = require('./src/identifierDictGenerator');
const readFromFile = require('./src/readFromFile');
const writeToFile = require('./src/writeToFile');
const unicodeReplace = require('./src/unicodeReplace');

(async function () {
    let filePath;
    if (process.argv.length <= 2) {
        console.error("未传入要混淆的文件");
        printHelp();
        process.exit(1);
    }
    for (let index = 2; index < process.argv.length; index++) {
        if (process.argv[index] === "-h" || process.argv[index] === "--help" || process.argv[index] === "help") {
            printHelp();
            process.exit(1);
        }
        if (process.argv[index].includes(".js")) {
            filePath = process.argv[index];
        }
    }
    if (!filePath) {
        console.error("未传入要混淆的 js 文件");
        printHelp();
        process.exit(1);
    }

    let orig_code = await readFromFile(filePath);
    if (orig_code.replace(/(^s*)|(s*$)/g, "").length === 0) {
        console.error("输入的文件为空或读取失败");
        process.exit(1);
    }
    var obfuscationResult = JavascriptObfuscator.obfuscate(orig_code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        unicodeEscapeSequence: true,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        debugProtectionInterval: 1000,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersType: "function",
        stringArrayThreshold: 1,
        simplify: true,
        transformObjectKeys: true,
        renameGlobals: true,
        disableConsoleOutput: false,
        stringArrayEncoding: ["rc4"],
        identifierNamesGenerator: "dictionary",
        identifiersDictionary: identifierDictGenerator(1000),
    });
    let obfuscatedFilePath = path.dirname(filePath) + path.sep + path.basename(filePath).split(".").map((item, index) => {
        if (index === 0) {
            return item + "-obfuscated";
        }
        return item;
    }).join(".");
    writeToFile(obfuscatedFilePath, unicodeReplace(obfuscationResult.getObfuscatedCode()) + "\n");
})()