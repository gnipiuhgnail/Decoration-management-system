<template> 
  <div class="background">
    <div class="Creat">
      <p class="Title">
       <span style="width:150px;margin:0 auto">{{ id ? "编辑" : "新建" }}候选产品信息</span>
      </p>
    <!-- 通过 label-position 属性来改变表单域或标签的位置，:label-position="labelPosition"可选的值有 top/left/right ，默认的是 right ， -->
    <!-- lable-position 必须要和 label-width（表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值） 共同使用，才会生效。 -->
    <!-- native原生表单，阻止默认提交，避免页面跳转 -->

    <el-form 
      class="productdraws"
      style="margin-top:30px"
      label-width="100px"
      @submit.native.prevent="save"
    >
 
<el-row :gutter="18">
  <el-col :span="9">
     <el-form-item label="产品名称">
        <el-input v-model="model.name" style="float:left"></el-input>
      </el-form-item>
  </el-col>
  <el-col :span="9">
    <span style="line-height: 35px;display:inline-block;margin-left:-20px;margin-right:15px">类型</span>
      <el-select v-model="model.value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
  </el-col>


</el-row>
<el-row>
    <el-col :span="9">
     <el-form-item label="产品单价" style="float:left">
        <el-input v-model="model.price" style="float:left"></el-input>
      </el-form-item>
  </el-col>
  <el-col :span="9">
     <el-form-item label="厂商" style="float:left;margin-left:-20px">
        <el-input v-model="model.store" style="float:left"></el-input>
      </el-form-item>
  </el-col>
</el-row>

<br>
<br>
      <el-form-item label="文字描述" class="protext" style="margin-top:-32px;margin-right:230px;">
        <el-input
          type="textarea"
          v-model="model.text"
          style="width: 520px;margin-left:-50px;"
        ></el-input>
      </el-form-item>

      <el-form-item label="图片描述" style="margin-right:230px;">
        <!-- <el-input v-model="model.pic"></el-input> -->
        <el-upload
          class="picture-uploader"
          :action="$http.defaults.baseURL + '/uploads'"
          :show-file-list="false"
          :on-success="afterUpload"
           style="float: left;"
        >
          <img v-if="model.pic" :src="model.pic" class="picture" />
          <i v-else class="el-icon-plus picture-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item style="text-align:left">
        <el-button
          type="success"
          native-type="submit"
          style="margin: -20px 200px"

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
      // labelPosition: "left",
      options: [
        {
          value: "建材",
          label: "建材",
        },
        {
          value: "灯具",
          label: "灯具",
        },
        {
          value: "家电",
          label: "家电",
        },
        {
          value: "五金",
          label: "五金",
        },
        {
          value: "布艺",
          label: "布艺",
        },
        {
          value: "装潢装饰",
          label: "装潢装饰",
        },
        {
          value: "地面装修",
          label: "地面装修",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      model: {
        name: "",
        value: "",
        price: "",
        text: "",
        pic: "",
        store:""
      },
    };
  },
  methods: {
    afterUpload(res) {
      this.model.pic = res.url;
    },
    // 请求接口，提交数据，需要axios// eslint-disable-line no-unused-vars
    async save() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        // id存在，修改数据
        res = await this.$http.put(`rest/productdraws/${this.id}`, this.model);
        this.$message({
        type: "success",
        message: "修改成功",
      });
      } else {
        res = await this.$http.post("rest/productdraws", this.model);
        this.$message({
        type: "success",
        message: "创建成功",
      });
      }

      this.$router.push("/productdraws/list");
      
    },


    async fetch() {
      const res = await this.$http.get(`rest/productdraws/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>

.productdraws{
  width: 900px;
  margin: 0 auto;
  padding-left: 200px;
  /* background-color: #000; */
}
.productdraws .el-input {
  width: 200px;
  display: inline-block;
  /* background-color: #000; */
}
.protext .el-textarea__inner{
  /* border: 0; */
  resize: none;
  /* width: 938px; */
  height: 100px;
}
.picture-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.picture-uploader .el-upload:hover {
  border-color: #409eff;
}
.picture-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 178px;
  text-align: center;
}
.picture {
  width: 200px;
  height: 200px;
  display: block;
}

</style>
