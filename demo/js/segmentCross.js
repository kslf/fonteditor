/**
 * @file quadraticBezier.js
 * @author mengke01
 * @date 
 * @description
 * 二次贝塞尔直线相交演示
 */

define(
    function(require) {

        var isSegmentCross = require('graphics/isSegmentCross');

        var entry = {

            /**
             * 初始化
             */
            init: function() {
                var canvas = $('#canvas').get(0);
                var ctx = canvas.getContext('2d');
                var width = canvas.offsetWidth;
                var height = canvas.offsetHeight;

                var points = [{"x":563.5776234567902,"y":637.5320987654322,"onCurve":true},{"x":563.5776234567902,"y":433.53209876543207,"onCurve":true},{"x":543,"y":478},{"x":10000,"y":478}] ;

                $('[data-index]').each(function(index, item) {
                    if(!points[index]) {
                        return false;
                    }
                    $(item).css({
                        left: points[index].x,
                        top: points[index].y
                    })
                });

                var point;

                $('.point').on('mousedown', function(e) {
                    point = $(this);
                });

                $(document.body).on('mousemove', onMove);
                $(document.body).on('mouseup', function(e) {
                    onMove.call(this, e);
                    point = null;
                });

                function onMove(e) {
                    var px = e.pageX;
                    var py = e.pageY;
                    if(point) {
                        point.css({
                            left: px,
                            top: py
                        });
                        var p = points[+point.attr('data-index')];
                        p.x = px;
                        p.y = py;
                        draw();
                    }
                }

                function draw() {
                    

                    ctx.clearRect(0, 0, width, height);
                    //绘制2次贝塞尔曲线  
                    ctx.beginPath();
                    ctx.strokeStyle='black';
                    ctx.moveTo(points[0].x, points[0].y);  
                    ctx.lineTo(points[1].x, points[1].y);
                    
                    ctx.moveTo(points[2].x, points[2].y);
                    if (points[3]) {
                        ctx.lineTo(points[3].x, points[3].y);
                    }
                    else {
                        ctx.lineTo(1000, points[2].y);
                    }

                    ctx.lineWidth = 1;
                    ctx.stroke();
                    //console.time('bezier');
                    var r = isSegmentCross(points[0], points[1], points[2], points[3]);
                    //console.timeEnd('bezier');
                    console.log(r);

                    if(r) {
                        ctx.beginPath();
                        r.forEach(function(item) {
                            ctx.moveTo(item.x, item.y);  
                            ctx.arc(item.x, item.y, 4, 0, Math.PI * 2, true);
                        });
                        ctx.fill();
                    }
                }

                draw();
            }
        };

        entry.init();
        
        return entry;
    }
);