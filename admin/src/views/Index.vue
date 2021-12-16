<template>
  <div class="index">
    <h1>This is an index page</h1>
    <div class="card">
      <el-row :gutter="12">
  <el-col :span="8">
    <el-card shadow="hover">
      总是显示
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover">
      鼠标悬浮时显示
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover">
      从不显示
    </el-card>
  </el-col>
</el-row>
    </div>
  </div>
</template>
