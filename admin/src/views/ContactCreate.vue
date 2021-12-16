<template>

  <div class="background">
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        添加施工人员
      </h1>
    </div>
    <hr>
    <h1>{{id?"编辑":"新建"}}施工人员</h1>
    <!-- 通过 label-position 属性来改变表单域或标签的位置，可选的值有 top/left/right ，默认的是 right ， -->
    <!-- lable-position 必须要和 label-width（表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值） 共同使用，才会生效。 -->
    <!-- native原生表单，阻止默认提交，避免页面跳转 -->
    <el-form class="contact"
      :label-position="labelPosition"
      label-width="80px"
       style="width:400px;margin:auto;"
      @submit.native.prevent="save"
    >
      <el-form-item label="姓名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="model.contact"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="model.address"></el-input>
      </el-form-item>
      <el-form-item label="工资">
        <el-input v-model="model.salary"></el-input>
      </el-form-item>
      <span style="margin-right:16px;">工作类型</span
      ><el-select v-model="model.value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-form-item>
        <el-button type="success" native-type="submit" style="margin: 30px 120px;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 表示这个页面是一个组件，接收一个id
  props:{
    id: {}
  },
  data() {
    return {
      labelPosition: "right",
      options: [
        {
          value: "拆旧工",
          label: "拆旧工",
        },
        {
          value: "泥水工",
          label: "泥水工",
        },
        {
          value: "水电工",
          label: "水电工",
        },
        {
          value: "木工",
          label: "木工",
        },
        {
          value: "油漆工",
          label: "油漆工",
        },
        {
          value: "保洁",
          label: "保洁",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      model: {
        name: "",
        contact: "",
        address: "",
        salary: "",
        value: ""
      },
      
      
    };
  },
  methods: {
    // 请求接口，提交数据，需要axios// eslint-disable-line no-unused-vars
    async save() {
      let res // eslint-disable-line no-unused-vars
       if(this.id){
        // id存在，修改数据
      res = await this.$http.put(`rest/contacts/${this.id}`,this.model);
      this.$message({
        type: "success",
        message: "修改成功",
      });
      }else{
      res = await this.$http.post("rest/contacts",this.model);
      this.$message({
        type: "success",
        message: "创建成功",
      });
      }
      
      this.$router.push("/contacts/list");
      
      
    },
    async fetch(){
      const res = await this.$http.get(`rest/contacts/${this.id}`)
      this.$router.push("/contacts/list");
      this.model = res.data
    }
  },
  created(){
    this.id && this.fetch()
  }
};
</script>

<style>
h1{
  text-align: center;
  padding: 15px;
}
.contact .el-input {
  width: 300px;

}

</style>
