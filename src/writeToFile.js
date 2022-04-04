'use strict';

const fs = require('fs');

/**
 * 从文本文件中读取字符串
 * @param {String} filePath 要读取的文件路径
 * @param {String} string 要写入的字符串
 * @returns {Promise<void>} 读取到的文件内容
 */
module.exports = function writeToFile(filePath, string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, string, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};