<template>
  <el-container>
    <el-main>
      <!-- 这里放了Main组件 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script src="../src/icon/iconfont.js"></script>
<style>
html,
body,div{
  margin: 0;
  padding: 0;
  color: #111;
  font-size: 14px;

}
.el-form{
  color: #111;
}

.el-main{
  margin: 0;
  padding: 0;
}
.el-form-item__label{
  color: #000;
}



</style>