<template>
  <el-container>
    <el-header
      ><h1>装修管理系统</h1>
      <span style="color:orange;font-size:17px">{{ model }} 在线</span></el-header
    >
    <el-container>
      <el-aside
        width="250px"
        height="100%"
      >
        <!-- :default-openeds=["1"]是需要展开的子sub目录的index值。 -->
        <!-- unique-opened 是否只保持一个子菜单的展开 -->
        <el-menu
          router
          :default-openeds="['2']"
          unique-opened
          :default-active="$route.path"
        >
        
         
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>进度管理</template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/schedules">日程管理</el-menu-item>
          <el-menu-item index="/receive">日程提醒</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>费用管理</template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/budgetselect">预算计划</el-menu-item>
          <el-menu-item index="/costcreate">消费记录</el-menu-item>
          <el-menu-item index="/consumectatistics">消费统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       
      <el-menu-item index="/draws/create"><i class="el-icon-menu"></i>图纸管理</el-menu-item>
     
          <!-- <template slot="title">分组一</template> -->
          <!-- <el-menu-item index="/contacts/create">添加施工人员</el-menu-item> -->
          <el-menu-item index="/contacts/list"><i class="el-icon-menu"></i>施工人员</el-menu-item>
   

          <el-menu-item index="/drawssecond/create"><i class="el-icon-menu"></i>候选产品</el-menu-item>
          <el-menu-item index="/decorationlog"><i class="el-icon-menu"></i>装修日志</el-menu-item>
    </el-menu>
  </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      model: "",
    }
  },
  methods:{
    
    },
   created(){
     this.model =  this.$route.query.name
    // console.log(this.$route.query)
  }
};
</script>

<style>
.el-aside {
  background-color: rgb(57, 61, 73);

}
.background {
  width: 1250px;
  height: 120vh;
 
  background-color: rgba(255, 255, 255);
  margin: 10px auto;
  /* border: 1px rgb(145, 140, 140) solid; */
}

.el-aside .el-submenu__title,.el-aside .el-menu-item{
  color: orange;
}
.el-aside .el-menu-item{
  background-color: rgb(35, 38, 46);
}
/* .el-aside .el-submenu{
  
} */
.background main.el-main {
  width: 1876px;
  overflow: hidden;
  padding: 0;
  background-color: #cfc7c7fa;

}
.el-header {
  /* position: relative; */
  background-color: rgb(35, 38, 46);

  color: #333;
  text-align: center;
  line-height: 60px;

}
.el-header h1 {
  display: inline-block;
  width: 200px;
  font-size: 20px;
  padding: 0;
  margin: 0 auto;
  color: orange;
}
.el-header span {
  width: 100px;
  /* position: absolute; */
  float: right;
}
.index .el-icon-arrow-down:before {
    content: "";
}
.el-aside .el-menu{
  background-color: rgb(35, 38, 46);


  }
.el-aside .el-submenu__title:hover {
  background-color: #ecf5ff;
}
.el-aside .el-menu-item:hover {
  background-color: #ecf5ff;
}
.el-table__header th{
  background-color: rgba(253, 126, 23, 0.575);
}
.el-tabs__nav-scroll{
  height: 40px;
}
.el-input__inner{
  border-radius: 0;
  border:1px black solid;
}
.el-input{
  border-radius: 0;

}
.el-textarea__inner{
  /* border: 0; */
  resize: none;
  /* width: 938px; */
  border:1px black solid;

}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: orange;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: orange;
  cursor: default;
}
</style>

// 页面需要在router/index.js中引用