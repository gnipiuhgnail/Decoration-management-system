<template>
  <div class="background">
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        候选产品信息管理
      </h1>
    </div>
    <hr>
    <div style="width:80%;height:100%;margin:0 auto;">
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
    <el-tab-pane label="产品列表" name="first">
    </el-tab-pane>
    <el-tab-pane label="添加产品" name="second"></el-tab-pane>
    <!-- <el-tab-pane label="产品" name="third"></el-tab-pane> -->
    </el-tabs>
    <router-view style="width:997px;height:600px;margin: 0 auto;text-align:center;border:1px rgba(253, 126, 23, 0.575) solid"></router-view>
    </div>
    
  </div>
  
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(activeName) {
        if(activeName=='first'){
          this.$router.push('/productdraws/list')
        }else if(activeName=='second'){
          this.$router.push('/productdraws/create')
        }
        console.log(activeName);
      }
    }
  };
</script>

<style>

</style>