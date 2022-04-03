import config from './config.js';

/**
 * 将混淆后的代码替换为 unicode 乱码字符
 * @param {String} code 混淆后要替换为 unicode 乱码字符的代码
 */
export default function unicodeReplace(code) {
    let replaceMap = new Map();
    let unicodeCodePoint = config.useEmoji ? 0x1F600 : 0x30000;
    let arrayFromCode = Array.from(code);
    arrayFromCode.forEach((char, index) => {
        if (!replaceMap.has(char)) {
            replaceMap.set(char, String.fromCodePoint(unicodeCodePoint));
            unicodeCodePoint++;
        }
        arrayFromCode[index] = replaceMap.get(char);
    });
    let replaceArray = [];
    for (let [orig, repl] of replaceMap) {
        replaceArray.push(`.replace(/${repl}/g, '${orig === "\\" ? "\\\\" : orig === "'" ? "\\'" : orig}')`);
    }
    return `eval(\`${arrayFromCode.join("")}\`${replaceArray.join("")})`
}