/**
 * @file getBezierQ2Point.js
 * @author mengke01
 * @date 
 * @description
 * 获取贝塞尔曲线上的点
 */


define(
    function(require) {
        
        /**
         * 获取贝塞尔曲线上的点
         * 
         * @param {Object} p0 p0
         * @param {Object} p1 p1
         * @param {Object} p2 p2
         * @param {number} t 
         * @return {Object} 点
         */
        function getPoint(p0, p1, p2, t) {
            return {
                x: p0.x * Math.pow(1 - t, 2) + 2 * p1.x * t * (1-t) + p2.x * Math.pow(t, 2),
                y: p0.y * Math.pow(1 - t, 2) + 2 * p1.y * t * (1-t) + p2.y * Math.pow(t, 2)
            }
        }

        return getPoint;
    }
);
