<template>
<div class="logbody">
  <div class="mask">
    <div class="regist-container">
      <h1 style="width:400px;text-align:center;margin:30px auto;font-size:50px;color: black;font-weight:bold;
      letter-spacing:15px">装修管理系统</h1>
      <el-card header="注册" class="regist-card">
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
          @submit.native.prevent="regist"
        >
          <el-form-item label="名字" style="width: 300px">
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
              to="/"
              style="color: #409eff; text-decoration: none; margin-left: 50px"
            >
              已有账户，请登录</router-link
            >
          </el-form-item>
          <el-form-item style="margin-left: 60px; margin-top: -20px">
            <el-button size="small" type="primary" native-type="submit" style="width:80px;font-size:15px;padding-left:25px"
              >提交</el-button
            >
            <!-- <el-button size="small" @click="resetForm()"
              >清空</el-button -->
            <!-- > -->
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
        // value: "",
      },

    };
  },
  methods: {
    // resetForm() {
    //   this.ruleForm.value= "";
    //   this.ruleForm.pass = "";
    //   this.ruleForm.name = "";
    // },
     
     
    // 接口请求
    async regist() {
        const res = await this.$http.post("regist/pusers", this.ruleForm); // eslint-disable-line no-unused-vars
        this.$router.push("/");
    },
  },
};
</script>

<style>
.regist-container {
  width: 375px;
  height: 400px;
  margin: 100px auto;
  /* position: absolute; */
  /* float: left; */
}

.el-card .el-card__header {
  font-size: 18px;
}
</style>