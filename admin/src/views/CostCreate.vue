<template>
  <!-- 消费记录 -->
  <div class="background">
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        消费记录
      </h1>
    </div>
    <hr>
    <!-- 添加消费记录 -->
    <div class="costcreate">
      <h4 style="text-align:center;margin: 1px;">添一笔消费</h4>
      <el-form
       class="demo-form-inline"
        :inline="true" 
        status-icon
        label-width="40px"
        @submit.native.prevent="save"
      >
       <!-- 类型选择 -->
        <div>
          <div style="height: 30px;">
            <span style="float: left"> 类型：</span>
            <div id="box" style="width: 100px; float: left;color:blue;font-weight:500">{{this.model.value}}</div>
            <!-- {{this.model.value}} -->
            <span style="float: right;font-size:8px"> <em>备注：点击选择</em></span>

          </div>
          <hr />
          <div style="height:120px">
            <div v-for="item in this.options" :key="item.classId" class="text item"
          >
          <div style="width: 70px; height: 60px;float:left;margin: 0 auto;text-align:center" @click="get(item.value)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href=item.icon></use>
            </svg>
            <span>{{ item.value }}</span>
          </div>
          </div>
        </div>
          <hr />
          
          <div class="costform">
            <div>
              <el-form-item label="名称">
            <el-input
              v-model="model.name"
              placeholder="请输入消费名称"
              style="width:150px;float: left;"
            ></el-input>
          </el-form-item>
           <div style="width:250px;float:right">
          <span class="demonstration" style="display:inline-block;float:left;line-height:40px">时间</span>
           <el-date-picker v-model="model.datetime" type="date" placeholder="选择日期" size="medium" style="width:150px;margin-top:5px;padding: 0 0 0 30px;" class="bottomborder"
            format="yyyy-MM-dd"  value-format="yyyy-MM-dd"></el-date-picker>
          </div>
            </div>
            <div>
               <el-form-item label="单价" >
            <el-input
              v-model="model.price"
              style="width:60px;float:left"
              v-on:input="getSum()"
              placeholder="输入单价"
            ></el-input>
          </el-form-item>
         
          <el-form-item prop="value" class="costunitselect">
             /<el-select v-model="model.unit" placeholder="单位">
              <el-option
                v-for="item in unitoptions"
                :key="item.unitvalue"
                :label="item.unitlabel"
                :value="item.unitvalue"
              >
              </el-option>
            </el-select>      
          </el-form-item>  
          <el-form-item label="数量" style="margin:0 20px">
           <div class="inputcount">
              <button style="margin-bottom:-10px;float: left;" @click.prevent="subCount()">-</button>
            <el-input
              v-model="model.count"
              v-on:input="getSum()"
            ></el-input>
              <button style="margin-bottom:-10px;float: left;" @click.prevent="addCount()">+</button>
           </div>
          </el-form-item>
         
          <div style="display:inline-block;width:150px;height:30px;float:right;margin-right:5px;">
            <span style="line-height:40px;">合计：</span>
            <span style="line-height:40px;">{{this.model.thissum}}</span>
          </div>
            </div>
         

          <el-form-item label="备注">
            <el-input
              v-model="model.text"
              style="width:450px"
              placeholder="添加备注~"
            ></el-input>
          </el-form-item>

          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :show-file-list="false"
              :on-success="productAfterUpload"
            >
              <img v-if="model.picproduct" :src="model.picproduct" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="票据">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :show-file-list="false"
              :on-success="billAfterUpload"
            >
              <img v-if="model.picbill" :src="model.picbill" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

        <el-button
          type="success"
          native-type="submit"
          style="margin: -150px 180px"
          >添一笔</el-button
        >

          </div>
        </div>
      </el-form>
      <div>
      
        
      </div>
    </div>
    <!-- 消费记录列表 -->
    <div class="costnote">
      <template>
        <!-- 创建弹窗 -->
        <el-dialog :visible.sync="dialogVisible" width="550px" class="dialog" style="text-align:center">
          <span style="display:inline-block;color:black;font-size:8px;margin-left:0;float: left;"><em>备注：单击修改</em></span>
          <div class="costform">
          <!-- 表单 -->
            <el-form
            class="demo-form-inline"
              :inline="true" 
              status-icon
              label-width="40px"
              @submit.native.prevent="save"
            >
            <div class="costlisttitle">
              <el-form-item label="消费记录" label-width="70px">
                  <el-input
                    v-model="costmodel.name"
                    placeholder="请输入消费名称"
                    style="width:120px"
                  ></el-input>
              </el-form-item>
            </div>
            <hr style="margin:0" />
            <div>
              <div style="height:45px">
                <!-- 选择 -->
                <div style="float:left">
                <!-- 类型选择 -->
                <el-form-item prop="value" label="类型" class="costselect">
                  <el-select v-model="costmodel.value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>  
                </div>
                <!-- 时间 -->
                <div style="width:250px;float:right">
                <span class="demonstration" style="display:inline-block;float:left;line-height:40px">时间</span>
                <el-date-picker v-model="costmodel.datetime" type="date" placeholder="选择日期" size="medium" style="width:150px;margin-top:5px;padding: 0 0 0 30px;" class="bottomborder"
                  format="yyyy-MM-dd"  value-format="yyyy-MM-dd"></el-date-picker>
                </div>  
              </div>
                          
              <!-- 单价数量 -->
               <div>
                 <div  style="height:45px;float:left;display:inline-block;">
                   <el-form-item label="单价">
                    <el-input
                      v-model="costmodel.price"
                      v-on:input="getListSum()"
                      placeholder="输入单价"
                      style="margin:0;width: 65px;"
                    ></el-input>
                   </el-form-item>
                   <el-form-item>
                     /
                    <el-input  v-model="costmodel.unit" style="margin:0;width: 43px;"></el-input>
                   </el-form-item>
                 </div>
                 <div  style="height:45px;float: left;display:inline-block;margin-left: 16px;">
                   <el-form-item label="数量">
                    <div class="inputcount">
                      <button style="margin-bottom:-10px;float: left;" @click.prevent="subListCount()">-</button>
                      <el-input
                        v-model="costmodel.count"
                        v-on:input="getListSum()"
                      ></el-input>
                      <button style="margin-bottom:-10px;float: left;" @click.prevent="addListCount()">+</button>
                    </div>
                   </el-form-item>
                 </div>
                
                <div style="display:inline-block;width:150px;height:30px;float:left;">
                  <span style="line-height:40px;">合计：</span>
                  <span style="line-height:40px;">{{this.costmodel.thissum}}元</span>
                </div>
               </div>
              <!-- 备注 -->
              <el-form-item label="备注">
                <el-input
                  v-model="costmodel.text"
                  style="width:450px"
                  placeholder="添加备注~"
                ></el-input>
              </el-form-item>
            <div>
              <!-- 图片 -->
              <el-form-item label="图片">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/uploads'"
                  :show-file-list="false"
                  :on-success="costmodelAfterUpload"
                >
                  <img v-if="costmodel.picproduct" :src="costmodel.picproduct" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="票据">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/uploads'"
                  :show-file-list="false"
                  :on-success="costmodelbillAfterUpload"
                >
                  <img v-if="costmodel.picbill" :src="costmodel.picbill" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
            </div>
            </el-form>
          <div>
      </div>
    </div>
        <p style="display:inline-block;float:right;color:black;font-size:16px;width:130px;margin:8px 0 5px 10px"></p>
          <span slot="footer" class="dialog-footer" style="padding:0 auto">
            <el-button type="danger" size="small" @click="removecost()" style="margin:0 10px">删 除</el-button>
          <el-button type="primary" size="small" @click="fixcost()" style="margin:0 20px">修 改</el-button>
          </span>
        </el-dialog>
      </template>
      <h4 style="text-align:center;padding-top:0;margin-top:0;margin-bottom:33px;">费用记录</h4>
      <div class="costlist">
        <div v-for="item in items" :key="item.classId" class="text item">
          <div style="height:50px">
            <div style="height:15px;line-height:15px;margin:5px 10px">
            <p style="display: inline-block;float: left;margin: 0;">{{item.name}}</p>
            <p  style="display: inline-block;float: right;margin: 0;">{{ item.datetime }}</p>
          </div>
          <div style="height:15px;line-height:15px;margin:5px 10px">
            <p style="margin: 4px 0; float: left;">费用：{{ item.thissum}}元</p>
            <el-button type="text" style="float:right;margin:5px;padding:0" @click="savefix(item);
            $router.push(`/costcreate/edit/${item._id}`);">详情</el-button>
          </div> 
          </div>
        <hr style="margin:3px 0;border:0.25px rgb(217, 223, 232) solid">
      </div>
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
      unitoptions:[
        {
          unitvalue: "米",
          unitlabel: "米",
        },
        {
         unitvalue: "平方米",
          unitlabel: "平方米",
        },
        {
          unitvalue: "个",
          unitlabel: "个",
        },
        {
          unitvalue: "条",
          unitlabel: "条",
        },
        {
          unitvalue: "套",
          unitlabel: "套",
        },
        {
          unitvalue: "人",
          unitlabel: "人",
        },
        
      ],
      //  创建
      model: {
        value: "",
        name:"",
        datetime:"",
        price:"",
        unit:"",
        count:0,
        thissum:"",
        picproduct:"",
        picbill:"",
        text:""
      },
      costmodel:{
        value: "",
        name:"",
        datetime:"",
        price:"",
        unit:"",
        count:0,
        thissum:"",
        picproduct:"",
        picbill:"",
        text:""
      },
      // 列表展示
      items: [],
      dialogVisible:false
    };
  },
  methods: {
    // 添加消费
    // 点击获取类型名
    get(name) {
      document.getElementById("box").innerHTML = name;
      this.model.value = name;
    },
    // 数量加减
    addCount(){
      this.model.count++;
      this.getSum();
    },
    subCount(){
      if(this.model.count<=0){
        return
      }
      this.model.count--;
      this.getSum();
    },
    getSum(){
      this.$nextTick(() =>{
        var sum = 0;
        sum= this.model.price*this.model.count;
        this.model.thissum = sum;
      }) 
    },
    // 创建
    async save() {
      let res; // eslint-disable-line no-unused-vars
      // if(this.id){
      //   // id存在，修改数据
      // res = await this.$http.put(`rest/cost/${this.id}`,this.model);
      // }else{
      res = await this.$http.post("rest/cost", this.model);
      // }
      // this.$router.push("/budgetselect");
      this.$message({
        type: "success",
        message: "创建成功",
      });
      this.fetch()
    },
    // 图片上传
    productAfterUpload(res){
      this.model.picproduct = res.url;
    },
    costmodelAfterUpload(res){
      this.costmodel.picproduct = res.url;
    },
    billAfterUpload(res){
      this.model.picbill = res.url;
    },
    costmodelbillAfterUpload(res){
      this.costmodel.picbill = res.url;
    },
    // 消费记录
    async fetch(){
      const res = await this.$http.get("rest/cost")
      let data = res.data;
      for(var i = 0 ;i<data.length;i++){
        if(data[i].datetime){
          res.data[i].datetime = data[i].datetime.substr(0,10)
        }
      }
      this.items = res.data;
      this.model.name = "";
      this.model.value = "";
      this.model.datetime = "";
      this.model.price = "";
      this.model.unit="";
      this.model.count = "";
      this.model.thissum = "";
      this.model.picproduct = "";
      this.model.picbill = "";
      this.model.text = "";
    }, 
    async savefix(item) {
      this.dialogVisible = true;
      this.costmodel.name = item.name;
      this.costmodel.value = item.value;
      this.costmodel.datetime = item.datetime;
      this.costmodel.price = item.price;
      this.costmodel.unit = item.unit;
      this.costmodel.count = item.count;
      this.costmodel.thissum = item.thissum;
      this.costmodel.picproduct = item.picproduct;
      this.costmodel.picbill = item.picbill;
      this.costmodel.text = item.text;
      this.costmodel._id = item._id;
    },
    // 数量加减
    addListCount(){
      this.costmodel.count++;
      this.getListSum();
    },
    subListCount(){
      if(this.costmodel.count<=0){
        return
      }
      this.costmodel.count--;
      this.getListSum();
    },
    getListSum(){
      this.$nextTick(() =>{
        var sum = 0;
        sum= this.costmodel.price*this.costmodel.count;
        this.costmodel.thissum = sum;
      }) 
    },
    // 修改
    async fixcost(){
    this.getListSum();
    await this.$http.put(`rest/cost/${this.id}`,this.costmodel);
    this.dialogVisible = false;
    this.fetch();
    },
     // 删除
    async removecost() {
      this.$confirm(`是否确认要删除消费："${this.costmodel.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/cost/${this.$route.params.id}`); // eslint-disable-line no-unused-vars
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.dialogVisible = false;
        this.fetch();
      });
    },
  },
   created(){
    this.fetch();
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

/* 创建消费 */
.costcreate {
  /* background-color: rgb(235, 22, 22); */
  width: 500px;
  float: left;
  height: 650px;
  border: 1px solid rgb(154, 154, 154);
  border-radius: 5px;
  margin: 0 100px;
  padding: 20px;
}
.costform{
  width: 500px;
  height: 100%;
  /* margin-left: -50px; */
}
.costform .el-form-item__label{
  color: rgb(63, 60, 60);
}
.costform .el-input .el-input__inner{
  padding: 0;
  border:0;
  border-bottom: 1px rgb(228, 217, 217) solid;
  border-radius: 0;
}
/* 数量 */
.costform .inputcount{
  width:100px;
  height:40px;
  line-height:40px;
  margin-top: 5px;
}
.costform .inputcount button{
  margin-top: 5px;
}
.costform .inputcount .el-input .el-input__inner{
  width:50px;
  float: left;
  /* margin: 0 5px;
  padding: 0;*/
  height:28px; 
  line-height: 28px;
  text-align: center;
  /* background-color:red */
}
.costform .inputcount .el-input {
  width:50px;
  height:20px; 
  border-bottom:0;
  float: left;
}
/* 图片上传 */
.costform .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.costform .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.costform  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
.costform  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* 消费列表 */
.costnote{
  width: 350px;
  float: left;
  height: 650px;
  border: 1px solid rgb(154, 154, 154);
  border-radius: 5px;
  margin: 0 15px;
  padding: 20px;
}
.costnote .dialog{
  margin-top:-55px;
}
.costlist{
  background-color: #fff;
  border: 1px rgb(217, 223, 232) solid;
  border-radius: 5px;
  height:550px;
  overflow-y:auto;
  padding: 5px;
}

.costlisttitle{
  width: 200px;
  height: 40px;
  font-weight: 700;
  font-size: 22px;
  margin: 0 auto;
}
.costlisttitle .el-input{
  width: 80px;
  height: 20px;
}
.costlisttitle .el-input .el-input__inner{
  height: 20px;
  line-height: 20px;
  color: black;
}
.costselect{
  height: 20px;
  line-height: 20px;
}
.costunitselect .el-input{
  height: 20px;
  width: 45px;
  line-height: 20px;
}
.costunitselect .el-input .el-input__inner{
  text-align: center;

}
.el-icon-arrow-up:before{
  content: ""
}

</style>