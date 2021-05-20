<template>
  <div>
    <!-- 通过ID，判断是编辑还是新建 -->
    <h1>{{id?"编辑":"新建"}}分类</h1>
    <el-form
      :model="model"
      ref="model"
      label-width="120px"
      :inline="false"
      size="normal"
      @submit.native.prevent="save"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <!-- <el-button>取消</el-button> -->
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
      model: {},
    };
  },
  methods: {
    async save() {
      let res // eslint-disable-line no-unused-vars
      if(this.id){
        // id存在，修改数据
      res = await this.$http.put(`rest/categories/${this.id}`,this.model);
      }else{
      res = await this.$http.post("rest/categories",this.model);
        
      }
      this.$router.push("/categories/list");
      this.$message({
        type:'success',
        message:'信息提交成功'
      });
    },
    async fetch(){
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.id && this.fetch()
  }
};
</script>

<style>
</style>