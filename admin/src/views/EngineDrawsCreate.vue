<template>
  <div class="background" >
    <div class="Creat">
      <p class="Title">
       <span style="width:150px;margin:0 auto">{{ id ? "编辑" : "新建" }}工程图纸信息</span>
      </p>
      <!-- 通过 label-position 属性来改变表单域或标签的位置，可选的值有 top/left/right ，默认的是 right ， -->
    <!-- lable-position 必须要和 label-width（表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值） 共同使用，才会生效。 -->
    <!-- native原生表单，阻止默认提交，避免页面跳转 -->
    
    <el-form class="draws"
      :label-position="labelPosition"
      label-width="100px"
      style="width: 575px; margin:10px auto;"
      @submit.native.prevent="save"
    >
      <el-form-item>
        <span style="line-height: 35px;display:inline-block;margin-left:-60px;">类型</span>
      <el-select
      style="margin-left:-260px"
        v-model="model.value"
        placeholder="请选择"
        
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="工程图纸名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      
      <el-form-item label="文字描述">
        <el-input
          type="textarea"
          v-model="model.text"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片描述">
        <el-upload class="Epicture-uploader" style="margin-left:100px;" :action="$http.defaults.baseURL + '/uploads'"
          :show-file-list="false" :on-success="afterUpload">
          <img v-if="model.pic" :src="model.pic" class="Epicture" />
          <i v-else class="el-icon-plus Epicture-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button
          type="success"
          native-type="submit"
          style="margin: -200px 150px"
          >保存</el-button
        >
        <!-- <el-button type="primary" native-type="submit">修改</el-button> -->
      </el-form-item>
    </el-form>
    </div>
    
    
  </div>
</template>

<script>
export default {
  // 表示这个页面是一个组件，接收一个id
  props: {
    id: {},
  },
  data() {
    return {
      labelPosition: "right",
      options: [
        {
          value: "原始建筑测量图",
          label: "原始建筑测量图",
        },
        {
          value: "建筑改建平面图",
          label: "建筑改建平面图",
        },
        {
          value: "装饰平面布置图",
          label: "装饰平面布置图",
        },
        {
          value: "天花吊顶布置图",
          label: "天花吊顶布置图",
        },
        {
          value: "地面材质图",
          label: "地面材质图",
        },
        {
          value: "给排水施工图",
          label: "给排水施工图",
        },
        {
          value: "电气施工图",
          label: "电气施工图",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      model: {
        name: "",
        value: "",
        text: "",
        pic: "",
      },
    };
  },
  methods: {
    afterUpload(res){
    this.model.pic = res.url;
  // 显示赋值
  // this.$set(this.model,'pic',res.url)
    },
    // 请求接口，提交数据，需要axios// eslint-disable-line no-unused-vars
    async save() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        // id存在，修改数据
        res = await this.$http.put(`rest/enginedraws/${this.id}`, this.model);
        this.$message({
        type: "success",
        message: "修改成功",
      });
      } else {
        res = await this.$http.post("rest/enginedraws", this.model);
        this.$message({
        type: "success",
        message: "创建成功",
      });
      }

      this.$router.push("/enginedraws/list");
      
    },
    async fetch() {
      const res = await this.$http.get(`rest/enginedraws/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>

/* .draws .el-input{
  width: 400px;
} */
.draws .el-textarea__inner{
  /* border: 0; */
  resize: none;
  /* width: 938px; */
  height: 100px;
}

.Title{
  height: 40px;  
  line-height: 40px;
  background-color: rgba(253, 126, 23, 0.575);
  padding: 0;
  margin: 0;
  font-size: 18px;
}
.Epicture-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: -100px;
  }
  .Epicture-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .Epicture-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 200px;
    line-height: 178px;
    text-align: center;
  }
  .Epicture {
    width: 400px;
    height: 200px;
    display: block;
  }
</style>
