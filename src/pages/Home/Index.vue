<template>
  <div class="continer">
      <Editor/>
      <Eline/>
      <Pie/>
      <Echarts/>
  </div>
</template>

<script>
import Eline from './Eline'
import Pie from './Pie'
import Echarts from './Echarts'
import Editor from './Editor'

export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
      Eline,Pie,Echarts,Editor
  },
};
</script>
<style scoped>
</style>