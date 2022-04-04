'use strict';
/**
 * 生成一堆随机字符串
 * @param {Int} count 返回多少个随机字符串
 * @returns {[String]} 一堆定长六个字符的随机字符串
 */
module.exports = function identifierDictGenerator(count) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = [];
    for (let j = 0; j < count; j++) {
        let stringArray = [];
        for (let i = 0; i < 6; i++) {
            stringArray.push(alphabet[parseInt(Math.random() * alphabet.length)]);
        }
        result.push(stringArray.join(""));
    }
    return result;
};
