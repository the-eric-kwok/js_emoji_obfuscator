'use strict';
const fs = require('fs');

/**
 * 从文本文件中读取字符串
 * @param {String} filePath 要读取的文件路径
 * @returns {Promise<String>} 读取到的文件内容
 */
module.exports = function readFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data.toString());
        });
    });
};