<template>
 <div>
     <h1>富文本编辑器</h1>
     <vueWangeditor id="editor" ref="editor" style="width:100%" ></vueWangeditor>
     <button @click="get" class="btn">点击获取内容</button>
     <button @click="set" class="btn">点击设置内容</button>
 </div>
</template>

<script>
// 1、下载并导入 vue-wangeditor
import vueWangeditor from 'vue-wangeditor'


export default {
    // 2、注册组件
    components:{vueWangeditor},
 data(){
 return{
     content:`
        <div>
        <h1>商品介绍</h1>
        </div>
     `
 }
 },
 created(){},
 methods:{
     get(){
         let editor = this.$refs.editor
         console.log(editor.getHtml());
     },
     set(){
         this.$refs.editor.setHtml(this.content)
     }
 },
 components:{
     vueWangeditor
 }
}

</script>
<style scoped>
.btn{
    margin-top: 20px;
    width: 100px;
    height: 40px;
    background-color: gold;
    border-radius: 10px;
    border: none;
    font-size: 14px;
    cursor: pointer;

}
</style>