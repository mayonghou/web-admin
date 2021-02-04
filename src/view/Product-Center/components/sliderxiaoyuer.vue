<template>
    <div>
        <Card style="height:200px">
            <div class="swiperSiaoyuer" ref="xiaoyuer1" id="optionsfa">
                <div class="swipera" ref="xiaoyuer2" id="options">
                    <div
                        class="options"
                        ref="options"
                        v-for="(item,index) in this.xiaoyuerDataer"
                        :key="index"
                    >
                        <div class="YuyuanGuard_1">
                            <div class="YuyuanGuard_1_div">
                                <div class="YuyuanGuard_1_div_son_1">
                                    <Icon type="ios-alarm" style="font-size:56px" />
                                </div>
                                <div class="YuyuanGuard_1_div_son_2">{{ item.function }}</div>
                            </div>
                        </div>
                        <div class="YuyuanGuard_2">{{ item.resume}}</div>
                    </div>
                </div>
            </div>
            <div ref="speed" id="box1" class="speedprogress">
                <div class="sliderXio"></div>
                <!-- 滑块 -->
                <div class="circular" ref="circular" id="box">
                    <div class="xiaoyuer-xiaoyuer">
                        <span class="span_xiaoyuer_"></span>
                        <span class="span_xiaoyuer_"></span>
                        <span class="span_xiaoyuer_"></span>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    props: ['functionList'],
    data() {
        return {
            xiaoyuerDataer: this.functionList
        };
    },
    watch: {
        functionList: {
            handler(newName) {
                this.xiaoyuerDataer = newName;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.xiaoyuerSwiper();
        this.yuercircular();
    },
    methods: {
        // 布局函数
        xiaoyuerSwiper() {
            if (this.$refs.options != undefined && this.$refs.options.length > 2) {
                this.$refs.xiaoyuer2.style.width = this.$refs.options[0].clientWidth * this.$refs.options.length + 'px';
            }
        },
        // 滑动回调
        yuercircular() {
            (function () {
                var dragging = false;
                var boxX, boxY, mouseX, mouseY, offsetX, offsetY;
                var box = document.getElementById('box');
                var box1 = document.getElementById('box1');
                box.onmousedown = down;
                document.onmousemove = move;
                document.onmouseup = up;

                // 鼠标按下后的函数,e为事件对象
                function down(e) {
                    dragging = true;

                    // 获取元素所在的坐标
                    boxX = box.offsetLeft;
                    boxY = box.offsetTop;

                    // 获取鼠标所在的坐标
                    mouseX = parseInt(getMouseXY(e).x);
                    mouseY = parseInt(getMouseXY(e).y);

                    // 鼠标相对元素左和上边缘的坐标
                    offsetX = mouseX - boxX;
                    offsetY = mouseY - boxY;
                }

                // 鼠标移动调用的函数
                function move(e) {
                    if (dragging) {
                        // 获取移动后的元素的坐标
                        var x = getMouseXY(e).x - offsetX;
                        var y = getMouseXY(e).y - offsetY;

                        // 计算可移动位置的大小， 保证元素不会超过可移动范围
                        // 此处就是父元素的宽度减去子元素宽度
                        var width = box1.clientWidth - box.offsetWidth;
                        var height = box1.clientHeight - box.offsetHeight;

                        // min方法保证不会超过右边界，max保证不会超过左边界
                        x = Math.min(Math.max(0, x), width);
                        y = Math.min(Math.max(0, y), height);

                        // 元素及时定位
                        box.style.left = x + 'px';
                        box.style.top = y + 'px';
                        // 小虞儿
                        const optionsYD = document.getElementById('options'); //移动盒子
                        var str = box.style.left;
                        var s1 = str.substring(0, str.length - 2);
                        var numberxiaoyuer = parseInt(s1); //滑块移动变量
                        // 计算位置
                        var box1W = document.getElementById('box1').offsetWidth; //可滑动距离
                        var percentage = -(numberxiaoyuer * optionsYD.offsetWidth) / box1W + 'px'; //盒子位移量
                        optionsYD.style.left = percentage;
                    }
                }

                // 释放鼠标的函数
                function up(e) {
                    dragging = false;
                }

                // 函数用于获取鼠标的位置
                function getMouseXY(e) {
                    var x = 0,
                        y = 0;
                    e = e || window.event;

                    if (e.pageX) {
                        x = e.pageX;
                        y = e.pageY;
                    } else {
                        x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
                        y = e.clientY + document.body.scrollTop - document.body.clientTop;
                    }
                    return {
                        x: x,
                        y: y
                    };
                }
            })();
        }
    }
};
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
/* right */
.childrender {
    width: 50%;
    height: 180px;
}
/* 显示窗口 */
.swiperSiaoyuer {
    height: 150px;
    position: relative;
    overflow: hidden;
}
/* 移动窗口 */
.swiperSiaoyuer .swipera {
    height: 150px;
    position: absolute;
    display: flex;
    background-color: #2db7f50f;
    padding: 10px;
    box-sizing: border-box;
}
/**定宽 */
.swiperSiaoyuer .swipera .options {
    width: 250px;
    height: 150px;
}
/* 进度 */
.speedprogress {
    height: 15px;
    position: relative;
}
/* 滑块 */
.circular {
    width: 60px;
    height: 15px;
    border-radius: 15px;
    position: absolute;
    top: 0px;
    z-index: 99;
}
.circular .xiaoyuer-xiaoyuer {
    height: 15px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    position: relative;
}
.circular .xiaoyuer-xiaoyuer .span_xiaoyuer_ {
    display: inline-block;
}
.circular .xiaoyuer-xiaoyuer .span_xiaoyuer_:nth-child(1),
.circular .xiaoyuer-xiaoyuer .span_xiaoyuer_:nth-child(3) {
    width: 0px;
    height: 0px;
    background-color: #2db7f5; /*两端颜色 */
    border-radius: 15px;
}
.circular .xiaoyuer-xiaoyuer .span_xiaoyuer_:nth-child(2) {
    width: 100%;
    height: 8px;
    border-radius: 15px;
    background-color: #2db7f5; /**中间颜色 */
}
.circular .xiaoyuer-xiaoyuer .span_xiaoyuer_:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
}
.circular .xiaoyuer-xiaoyuer .span_xiaoyuer_:nth-child(3) {
    position: absolute;
    top: 0;
    right: 0;
}
.sliderXio {
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background-color: #a9d3ff;
}
.YuyuanGuard_1 {
    display: flex;
    align-items: center;
    justify-content: center;
}
.YuyuanGuard_1_div {
    text-align: center;
}
.YuyuanGuard_1_div_son_1 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
}
.YuyuanGuard_1_div_son_2 {
    color: #3a9df4;
    padding: 5px 15px;
}
.YuyuanGuard_2 {
    height: 42px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    padding: 2px 20px;
}
</style>