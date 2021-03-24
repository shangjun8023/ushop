<template>
  <div id="line"></div>
</template>

<script>
// 1、导入echarts
import * as echarts from 'echarts'

export default {
  data() {
    return {
        options:{
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        }
    };
  },
  mounted() {
    //   2、获取dom对象
    let dom1 = document.querySelector('#line')
    // 3、初始化
     let instance = echarts.init(dom1)
    //  4、设置配置对象
    instance.setOption(this.options)
  },
  methods: {},
  components: {},
};
</script>
<style scoped>
#line{
    height: 400px;
    margin: 20px 0;
    border: 1px solid rgba(28, 170, 252, 0.411);
    border-radius: 10px;
    background-color: white;
}
</style>