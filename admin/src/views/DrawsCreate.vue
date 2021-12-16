<template>
  <div class="background">
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        图纸信息管理
      </h1>
    </div>
    <hr>
    <div style="width:80%;height:100%;margin:0 auto;" >
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)" style="height:60px">
        <el-tab-pane label="图纸列表" name="first"></el-tab-pane>
     
    <el-tab-pane label="新建图纸" name="second"></el-tab-pane>
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
          this.$router.push('/enginedraws/list')
        }else if(activeName=='second'){
          this.$router.push('/enginedraws/create')
        }
      }
    }
  };
</script>

<style>
.el-tabs__item{
  font-size:19px;
}
</style>