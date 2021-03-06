/**
 * @file options.js
 * @author mengke01
 * @date 
 * @description
 * 编辑器选项
 */

define(
    function(require) {
        var options = {

            // 编辑器相关
            editor: {

                unitsPerEm: 512, // 框大小

                // 吸附选项
                sorption: {
                    enableGrid: false, // 吸附到网格
                    enableShape: true, // 吸附到对象
                    gridDelta: 5, // 网格delta
                    delta: 5, // 对象delta
                    sorptionColor: '#4AFF4A'
                },

                // 辅助线
                referenceline: {
                    style: {
                        strokeColor: 'darkblue'
                    }
                },

                // 覆盖层
                coverLayer: {
                    strokeColor: 'green',
                    fillColor: 'white'
                },

                // 字体层
                fontLayer: {
                    lineWidth: 1,
                    strokeColor: '#999',
                    fillColor: '#555',
                },

                // 轴线
                axis: {
                    showGrid: true, // 显示网格
                    gapColor: '#A6A6FF',
                    gridColor: 'red',
                    emColor: 'red',

                    // 字体测量规格
                    metrics: {
                        ascent: 480, // 上升
                        descent: -33, // 下降
                        xHeight: 256, // x高度
                        capHeight: 358 // 大写字母高度
                    },

                    // 刻度
                    graduation: {
                        gap: 100,
                        thickness: 20, // 厚度
                        markHeight: 3, // 标记高度
                        markBackgroundColor: '#EEE', // 背景色
                        markColor: '#000', // 前景色
                        color: '#000' // 文字颜色
                    }
                },
                // 命令栏
                contextMenu: {}
            },


            // 渲染器相关
            render: {
                defaultRatio: 1.2, // 默认的缩放比例
                minScale: 0.2, // 最小缩放
                maxScale: 200, //最大缩放
                enableScale: true, // 是否允许缩放
                enableResize: true // 是否允许大小改变
            }
        };
        return options;
    }
);
