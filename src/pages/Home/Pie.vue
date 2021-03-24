<template>
  <div id="pie"></div>
</template>

<script>
// 1、导入echarts
import * as echarts from 'echarts'

export default {
  data() {
    return {
        options: {
            title: {
                text: '南丁格尔玫瑰图',
                subtext: '哈哈哈',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '半径模式',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['25%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: []
                },
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['75%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: [
                        {value: 30, name: 'rose 1'},
                        {value: 28, name: 'rose 2'},
                        {value: 26, name: 'rose 3'},
                        {value: 24, name: 'rose 4'},
                        {value: 22, name: 'rose 5'},
                        {value: 20, name: 'rose 6'},
                        {value: 18, name: 'rose 7'},
                        {value: 16, name: 'rose 8'}
                    ]
                }
            ]
        }
    };
  },
  created(){
    //   将来后台请求的数据
      let res = [
                {value: 40, title: 'rose 1'},
                {value: 33, title: 'rose 2'},
                {value: 28, title: 'rose 3'},
                {value: 22, title: 'rose 4'},
                {value: 20, title: 'rose 5'},
                {value: 15, title: 'rose 6'},
                {value: 12, title: 'rose 7'},
                {value: 10, title: 'rose 8'}
            ]
        // 自己遍历出想要的数据
        let data = []
        for(let k in res){
            let item = {
                value:'',
                name:''
            }
            item.value = res[k].value
            item.name = res[k].title
            data.push(item)
        }
        this.options.series[0].data = data
  },
  mounted() {
    //   2、获取dom对象
    let dom = document.querySelector('#pie')
    // 3、初始化
    let instance = echarts.init(dom)
    // 4、设置配置对象
    instance.setOption(this.options)
  },
  methods: {},
  components: {},
};
</script>
<style scoped>
#pie{
    height: 400px;
    border: 1px solid rgba(28, 170, 252, 0.411);
    border-radius: 10px;
    background-color: white;
    margin-bottom: 10px;
}
</style>