<template>
<div class="logbody">
  <div class="mask">
    
    <div class="login-container ">
      <h1 style="width:400px;text-align:center;margin:30px auto;font-size:50px;color: black;font-weight:bold;
      letter-spacing:15px">装修管理系统</h1>
    <el-card header="请先登录" class="login-card">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        @submit.native.prevent="login"
      >
        <el-form-item id="username" label="名字" style="width: 300px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" style="width: 300px">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- <span style="margin-left: 40px; margin-right: 10px">身份</span>
        <el-select
          v-model="ruleForm.value"
          placeholder="请选择您的身份"
          style="width: 222px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        <el-form-item>
          <router-link
            to="/regist"
            style="color: #409eff; text-decoration: none; margin-left: 50px"
            >未有账户，请先注册</router-link
          >
        </el-form-item>
        <el-form-item style="margin-left: 60px; margin-top: -20px">
          <el-button size="small" type="primary" native-type="submit" style="width:80px;font-size:15px;padding-left:25px"
            >提交</el-button
          >
          <!-- <el-button size="small" @click="resetForm()"
            >清空</el-button
          > -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  </div>
  
  </div>
  
</template>
<script>
export default {
  
  data() {
    return {
      // options: [
      //   {
      //     value: "业主",
      //     label: "业主",
      //   },
      //   {
      //     value: "施工人员",
      //     label: "施工人员",
      //   },
      // ],
      ruleForm: {
        name: "",
        pass: "",
        value: "",
      },
      
    };
  },
  methods: {
    //   resetForm() {
       
    //   this.ruleForm.value= "";
    //   this.ruleForm.pass = "";
    //   this.ruleForm.name = "";
    // },
      
      // 接口请求
      async login(){
        const res = await this.$http.post('login/pusers',this.ruleForm)  // eslint-disable-line no-unused-vars
        localStorage.token = res.data
        this.$router.push({ path:`/receive/?name=${this.ruleForm.name}`  })
        this.$message({
          type:'success',
          message:"登录成功"
        })
        }
    },
    
  }
</script>

<style>
.el-main{
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.logbody{
  /* width: 1800px; */
  height: 100vh;
	margin: 0 ;
	padding: 0;
	font-family: sans-serif;
	background: url('../pic/backgroundtwo.jpg')  no-repeat center 0px;
	background-size: cover;
  background-position: center 0; 
     background-repeat: no-repeat;  
     background-attachment: fixed; 
      -webkit-background-size: cover;  
      -o-background-size: cover;  
      -moz-background-size: cover;  
      -ms-background-size: cover;
	
	
 
    
}

.mask {
 background-color: rgba(0,0,0,0.1);
 
 width: 1850px;
  height: 100vh;
 /* 解决- 垂直外边距塌陷 */
 padding: 1px;
 z-index: -1
}
.login-container {
  width: 375px;
  height: 400px;
  margin: 110px auto;
  border-radius: 30px;

  /* position: absolute; */
  /* float: left; */
}

.logbody .el-card .el-card__header {
  font-size: 18px;
  border:0;

 
}
.logbody .el-card{
  background-color: rgb(225, 226, 228);
  border:0;
  border-radius: 30px;

}
.logbody .el-card .el-input__inner{
  border:0;
}

</style>