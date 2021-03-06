/**
 * @file ShapesGroup.js
 * @author mengke01
 * @date
 * @description
 * 多个形状编辑组
 */


define(
    function(require) {
        var pathAdjust = require('graphics/pathAdjust');
        var lang = require('common/lang');
        var computeBoundingBox = require('graphics/computeBoundingBox');

        var moveTransform = require('./moveTransform');
        var scaleTransform = require('./scaleTransform');
        var rotateTransform = require('./rotateTransform');

        var BoundControl = require('./BoundControl');


        /**
         * 获取多个shape的边界
         */
        function getBound(shapes) {
            return computeBoundingBox.computePath.apply(null, shapes.map(function(shape) {
                return shape.points;
            }));
        }

        /**
         * 选择组控制器
         */
        function ShapesGroup(shapes, editor) {
            this.editor = editor;
            this.boundControl = new BoundControl(editor.coverLayer);
            this.setShapes(shapes);
        }

        /**
         * 根据控制点做图形变换
         */
        ShapesGroup.prototype.beginTransform = function(point, camera, key) {
            this.bound = getBound(this.shapes);
            this.editor.coverLayer.addShape({
                id: 'bound',
                type: 'polygon',
                dashed: true,
                selectable: false,
                points: []
            });
            this.boundControl.hide();

            // 设置吸附选项
            if (this.mode === 'move' && this.editor.sorption.isEnable()) {
                var sorptionShapes = [];
                var shapes = this.shapes;
                var bound = this.bound;

                // 加入bound
                sorptionShapes.push({
                    points: [
                        {
                            x: bound.x,
                            y: bound.y,
                            onCurve: true
                        },
                        {
                            x: bound.x + bound.width,
                            y: bound.y + bound.height,
                            onCurve: true
                        }
                    ]
                });

                // 过滤需要吸附的对象
                this.editor.fontLayer.shapes.forEach(function(shape) {
                    if (shapes.indexOf(shape) < 0) {
                        sorptionShapes.push(shape);
                    }
                });
                this.editor.sorption.setShapes(sorptionShapes);
            }

        };

        /**
         * 根据控制点做图形变换
         */
        ShapesGroup.prototype.transform = function(point, camera, key) {
            if (this.mode === 'move') {
                moveTransform.call(
                    this, camera,
                    key.ctrlKey ? false :  key.altKey,
                    key.ctrlKey ? false : key.shiftKey,
                    this.editor.sorption.isEnable()
                );
            }
            else if (this.mode === 'scale') {
                scaleTransform.call(this, point, camera);
            }
            else if (this.mode === 'rotate') {
                rotateTransform.call(this, point, camera);
            }
        };

        /**
         * 刷新Shapesgroup信息
         */
        ShapesGroup.prototype.finishTransform = function(point, camera, key) {

            // 保存最后一次修改
            var coverShapes = this.coverShapes;
            this.coverShapes = this.shapes;
            this.transform(point, camera, key);
            this.coverShapes = coverShapes;
            delete this.bound;

            this.editor.coverLayer.removeShape('bound');
            this.editor.coverLayer.removeShape('boundcenter');
            this.editor.fontLayer.refresh();
            if (this.mode === 'move' && this.editor.sorption.isEnable()) {
                this.editor.coverLayer.removeShape('sorptionX');
                this.editor.coverLayer.removeShape('sorptionY');
                this.editor.sorption.clear();
            }

            this.refresh();
        };

        /**
         * 设置操作的shapes
         */
        ShapesGroup.prototype.setShapes = function(shapes) {

            var coverLayer = this.editor.coverLayer;

            if(this.shapes) {
                this.shapes = null;
            }

            if (this.coverShapes) {
                this.coverShapes.forEach(function(shape) {
                    coverLayer.removeShape(shape);
                });
                this.coverShapes = null;
            }

            this.shapes = shapes;

            this.coverShapes = lang.clone(this.shapes);
            this.coverShapes.forEach(function(shape) {
                shape.id = 'cover-' + shape.id;
                shape.selectable = false;
                shape.style = {
                    strokeColor: 'red'
                };
                coverLayer.addShape(shape);
            });
        };

        /**
         * 获取边界
         */
        ShapesGroup.prototype.getBound = function() {
            if(this.shapes.length) {
               return getBound(this.shapes);
            }
            return false;
        };

        /**
         * 设置操作的shapes
         */
        ShapesGroup.prototype.setMode = function(mode) {
            this.mode = mode; // 三种变化模式，scale/rotate/move
        };


        /**
         * 移动到指定位置
         */
        ShapesGroup.prototype.move = function(mx, my) {

            this.shapes.forEach(function(shape) {
                pathAdjust(shape.points, 1, 1, mx, my);
            });

            this.editor.fontLayer.refresh();
            this.editor.coverLayer.move(mx, my);
            this.editor.coverLayer.refresh();
        };

        /**
         * refresh
         */
        ShapesGroup.prototype.refresh = function() {
            this.boundControl.refresh(getBound(this.shapes), this.mode);
        };

        /**
         * 注销
         */
        ShapesGroup.prototype.dispose = function() {
            this.editor.coverLayer.clearShapes();
            this.boundControl.dispose();
            this.shapes = this.coverShapes = this.boundControl = this.editor = null;
        };

        return ShapesGroup;
    }
);