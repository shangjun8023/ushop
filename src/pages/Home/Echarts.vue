<template>
  <v-chart :option='barOptions' class="box"></v-chart>
</template>

<script>
// 导入echarts: 新版必须使用按需导入, 否则图表不显示
import "echarts/lib/chart/line";   // 折线图需要的绘制工具
import "echarts/lib/chart/bar"     // 柱状图需要的绘制工具
import "echarts/lib/chart/pie"     // 饼状图需要的绘制工具

// 辅助绘制工具
// import "echarts/lib/component/title"      // 绘制标题
// import "echarts/lib/component/tooltip"    // 绘制鼠标悬浮提示框

// 导入vue-echarts
import Vchart from 'vue-echarts';
import Vue from 'vue';

// 注册组件
Vue.component('v-chart',Vchart);



export default {
  data() {
    return {
        // 柱状图配置对象
        barOptions:{
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, {
                    value: 200,
                    itemStyle: {
                        color: '#a90000'
                    }
                }, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        }
    };
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style scoped>
.box {
    width: 100%;
    height: 500px;
    border: 1px solid rgba(28, 170, 252, 0.411);
    border-radius: 10px;
    background-color: white;
}
</style>