/**
 * @file ttf2base64.js
 * @author mengke01
 * @date 
 * @description
 * ttf 二进制转base64编码
 */


define(
    function(require) {
        
        var bytes2base64 = require('./util/bytes2base64');

        /**
         * ttf 二进制转base64编码
         * 
         * @param {Array} arrayBuffer ArrayBuffer对象
         * @return {string} base64编码
         */
        function ttf2base64(arrayBuffer) {
            return 'data:font/ttf;charset=utf-8;base64,' + bytes2base64(arrayBuffer);
        }

        return ttf2base64;
    }
);
