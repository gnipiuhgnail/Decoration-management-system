<template>
  <div class="background">
    <!-- <link rel="stylesheet" href="../icon/iconfont.css"> -->
     <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        添加预算
      </h1>
    </div>
    <hr>
    <div class="budgetcreat">
      <el-form
        status-icon
        label-width="100px"
        @submit.native.prevent="save"
      >
        <div>
          <div style="height: 30px; margin: 5px auto;">
            <span style="float: left"> 类型：</span>
            <div id="box" style="width: 100px; float: left;color:blue;font-weight:500">{{this.model.value}}</div>
            <!-- {{this.model.value}} -->
          </div>
          <hr />
          <div style="width:1000px;height:180px;margin:20px 50px -40px">
            <div v-for="item in this.options" :key="item.classId" class="text item" 
          >
          <div style="width: 130px; height: 70px;float:left;margin: 0 auto;text-align:center" @click="get(item.value)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href=item.icon></use>
            </svg>
            <span>{{ item.value }}</span>
          </div>
          </div>
          </div>
          
          <hr />
         
          <div style="width:800px;height:200px;margin:60px auto;">
            <el-form-item label="名称" >
            <el-input
              v-model="model.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="预算价格">
            <el-input
              v-model="model.price"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
            type="textarea"
              v-model="model.text"
            ></el-input>
          </el-form-item>
        <el-button
          type="success"
          native-type="submit"
          style="margin:10px 350px"
          >{{this.model.name?"保存":"创建"}}</el-button
        >

          </div>
        </div>
      </el-form>
      <div>
      
        
      </div>
    </div>
   
  </div>
</template>

<script>

export default {
   props:{
    id: {}
  },
  data() {
    return {
      // items: [],
      options: [
        {
          value: "家庭建材",
          label: "家庭建材",
          icon:"#icon-anquan"
        },
        {
          value: "油漆",
          label: "油漆",
          icon:"#icon-jichugaizao"
        },
        {
          value: "五金水电",
          label: "五金水电",
          icon:"#icon-shuidiangaizao"
        },
        {
          value: "灯饰照明",
          label: "灯饰照明",
          icon:"#icon-shifanxiangmu"
        },
        {
          value: "厨房",
          label: "厨房",
          icon:"#icon-shangjia"
        },
        {
          value: "卫浴",
          label: "卫浴",
          icon:"#icon-shifanxiangmu"
        },
        {
          value: "家具",
          label: "家具",
          icon:"#icon-shangcheng"
        },
        {
          value: "家电",
          label: "家电",
          icon:"#icon-lvsejia"
        },
        {
          value: "软装",
          label: "软装",
          icon:"#icon-anzhuang"
        },
        {
          value: "设计费",
          label: "设计费",
          icon:"#icon-sheji"
        },
        {
          value: "监理费",
          label: "监理费",
          icon:"#icon-qiandinghetong"
        },
        {
          value: "人工费",
          label: "人工费",
          icon:"#icon-baoming"
        },
        {
          value: "辅助设施",
          label: "辅助设施",
          icon:"#icon-shouye-"
        },
        {
          value: "其他",
          label: "其他",
          icon:"#icon-kuozhan"
        },
        
      ],
      model: {
        name:"",
        value: "",
        price:"",
        text:""
      },
    };
  },
  methods: {
    get(name) {
      document.getElementById("box").innerHTML = name;
      this.model.value = name;
    },
    // 创建
    async save() {
      let res; // eslint-disable-line no-unused-vars
      if(this.id){
        // id存在，修改数据
      res = await this.$http.put(`rest/budget/${this.id}`,this.model);
      this.$message({
        type: "success",
        message: "修改成功",
      });
      }else{
      res = await this.$http.post("rest/budget", this.model);
      this.$message({
        type: "success",
        message: "创建成功",
      });
      }
      this.$router.push("/budgetselect");
      
    },
    async fetch(){
      const res = await this.$http.get(`rest/budget/${this.id}`)
      this.model = res.data;
      
    }
  },
   created(){
    this.id && this.fetch()
  }
};
</script>

<style>
.icon {
  width: 2em;
  height: 2em;
  display:block;
  fill: currentColor;
  overflow: hidden;
  margin: 0 auto;
}
.budgetcreat {
  width: 1000px;
  height: 580px;
  border: 1px solid rgb(154, 154, 154);
  border-radius: 5px;
  margin: 0 auto;
  padding: 20px;
}
.budgetcreat .el-input__inner{
  height:35px;
  margin-bottom: 10px;
}
.el-form-item__label{
  color: #000;
}

</style>