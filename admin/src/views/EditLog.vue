<template>
  <div class="background">
    <div style="width: 100%;text-align:center;">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        装修日志
      </h1>
    </div>
    <hr style="margin:0">
    <div class="log">

      <div class="logList">
        <p class="logListTitle"></p>
        <template>

       
       <div style="width:310px;height:35px;margin-bottom:10px">
         <el-input
        v-model="search"
        placeholder="输入关键字"
        size="small" 
        style="width:100px;height: 30px; float:left"
      />
      <el-button type="primary" size="mini" icon="el-icon-search"
       @click="find()"
       >搜索</el-button>
       <el-button type="primary" size="mini"
       @click="create();$router.push('/decorationlog/edit');"
       >发布日志</el-button>
      </div>
        
    </template>
        <div>
        <div class="logListTitle">
          <span style="float:left;display: inline-block;margin-left:10px;line-height:30px">最近日志</span>
         <el-button @click="fetch()" style="float:right;width:35px;height:22px;
          display: inline-block;border:0;padding:0;margin:4px">返回</el-button></div>
        <div v-for="item in items" :key="item.classId" class="text item">
           <div style="height:50px;line-height:20px;border-bottom:1px grey solid;padding: 0 8px"
          @click="fetchfix(item);$router.push(`/decorationlog/edit/${item._id}`);">
            <p style="margin: 5px; font-weight:600">{{ item.title}}</p>
            <p style="margin: 5px;width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
            margin: 0;  ">{{ item.content}}</p>
          </div>
          <template>
      </template>
      </div>
    </div>
      </div>
      <div class="logCreat">
        <p class="logTitle">
          <el-button @click="$router.push('/decorationlog/')" style="float:left;width:35px;height:22px;
          display: inline-block;border:0;padding:0;margin:4px">返回</el-button>
        </p>
        <div class="logBody">
          <h1 class="logBodyTittle">{{id?"编辑":"发布"}}日志</h1>
          <div class="logBodyBody">
             <el-form @submit.native.prevent="save">
               <p>标题</p>
               <el-form-item>
                 <el-input v-model="model.title"></el-input>
               </el-form-item>
               <p>内容</p>
               <div class="logBodyContent">
                 <el-form-item>
                   <el-input type="textarea" v-model="model.content"></el-input>
                 </el-form-item>
                 <el-form-item>
                   <el-upload class="pict-uploader" :action="$http.defaults.baseURL + '/uploads'" :show-file-list="false"
                     :on-success="afterUpload" >
                     <img v-if="model.pic" :src="model.pic" class="pict" />
                    <i v-else class="el-icon-plus pict-uploader-icon">添加图片</i>
                   </el-upload>
                 </el-form-item>
               </div>
               <el-form-item>
                 <div>
                   <el-button native-type="submit" size="mini" class="btn"
                  style="float:left;display: inline-block;margin-left:320px;line-height:20px;background-color:#FD7F17;border:0;margin-top:5px">{{id?"修改":"发布"}}</el-button>
                 <el-button v-if="id" size="mini" @click="remove()"
                 style="float:left;display: inline-block;line-height:20px;background-color:#FD7F17;border:0;margin-top:5px">
                 删除</el-button>
                 </div>
                </el-form-item>
             </el-form>
          </div>
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
      items: [],
      search:"",
      model: {
        title: "",
        content: "",
        datetime: "",
        pic: "",
      },
    };
  },
  methods: {
   afterUpload(res){
    this.model.pic = res.url;
    },
   
     // 请求接口，提交数据，需要axios// eslint-disable-line no-unused-vars
    async save() {
      this.model.datetime = new Date();
      let res // eslint-disable-line no-unused-vars
       if(this.id){
      res = await this.$http.put(`rest/decoratelog/${this.id}`,this.model);
      this.$message({
        type: "success",
        message: "修改成功",
      });
      }else{
      
      res = await this.$http.post("rest/decoratelog",this.model);
      this.$message({
        type: "success",
        message: "创建成功",
      });
      }
      
      this.$router.push('/decorationlog/')
      // this.create()
      this.fetch();
      
    },
      // 查找数据
    async find(){
        const search = this.search
        // console.log(search)
        const message = await this.$http.get("rest/decoratelog/logfind/"+search); // eslint-disable-line no-unused-vars
        // console.log(message)
        this.items = message.data;
    },
    async remove() {
      this.$confirm(`是否确认要删除日志 "${this.model.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 删除的接口
        const res = await this.$http.delete(`rest/decoratelog/${this.model._id}`); // eslint-disable-line no-unused-vars
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 重新获取数据
        this.$router.push('/decorationlog')
        this.create()
        this.fetch()
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/decoratelog");
        for (var i=0;i<res.data.length;i++) {
          if(res.data[i].datetime){
        const data = res.data[i].datetime.slice(0,10) 
        // const data2 = res.data[i].datetime.slice(11,19) 
        // const data = data1.concat(" ",data2);
        res.data[i].datetime = data;
      }
      }
      this.items = res.data;
    },
    create(){
      this.model.title="",
      this.model.content="",
      this.model.datetime="",
      this.model.pic=""
    },
    fetchfix(item){
      this.model.title = item.title;
      this.model.content = item.content;
      this.model.datetime = item.datetime;
      this.model.pic = item.pic;
      this.model._id = item._id;
    },
     async fetchItem(){
     const res = await this.$http.get(`rest/decoratelog/${this.$route.params.id}`)
     
          if(res.data.datetime){
        const data1 = res.data.datetime.slice(0,10) 
        const data2 = res.data.datetime.slice(11,19) 
        const data = data1.concat(" ",data2);
        res.data.datetime = data;
      }
      
     this.model = res.data
   }
  },
  created() {
    this.fetch();
    this.id&&this.fetchItem()
  },
};
</script>
<style>


.logList .el-input__inner{
  border-radius: 0;
  margin-top: 5px;

}

.logListTitle{
  height: 30px;
  background-color: rgb(253, 127, 23);
  padding: 0;
  margin: 0;
  
}
.logCreat{
  float: left;
  width:797px;
}
.logTitle{
  height: 30px;
  background-color: rgba(253, 126, 23, 0.575);
  padding: 0;
  margin: 0;
}
.logBody{
  width: 740px;
  height: 600px;
  margin: 30px auto;
}
.logBodyTittle{
  margin: 0;
  padding-top: 5px;
  border-top: 1px rgba(145, 136, 136, 0.856) solid;
  border-bottom: 1px rgba(145, 136, 136, 0.856) dotted;
  background-color: rgb(255, 199, 153);
}
.logBodyBody{
  margin-top: 0;
  background-color: rgba(255, 199, 153, 0.363);

}
.logBodyBody p{
  margin: 0;
  padding-top: 5px;
}

.logBodyBody .el-input{
  height: 30px;
  
}
.logBodyBody .el-input .el-input__inner{
  height: 30px;
  line-height: 30px;
  color: black;
  border: 1px black solid;
  border-radius: 0;
  padding:2px;
}
.logBodyBody .el-textarea__inner{
  border: 0;
  resize: none;
  width: 738px;
  height: 450px;
}

.logBodyContent{
  border: 1px gainsboro solid;
  /* background-color: #000; */
  position: relative;
  width: 738px;
  height: 450px;
}
.pict-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
    border-radius: 6px;
    cursor: pointer;
    position: absolute;
    top: -405px;
    left: 30px;
    /* position: relative; */
    /* overflow: hidden; */
    margin-right: 100px;
    margin-top: -100px;

  }
  /* .pic-uploader .el-upload:hover {
    border-color: #409EFF;
  } */
  .pict-uploader-icon {
    font-size: 12px;
    color: #000;
    width: 70px;
    height: 20px;
    line-height: 10px;
    text-align: center;
    margin-left: 5px
  }
  .pict {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 250px;
    top: 280px;
    display: block;
    margin-left:5px;
/* background-color: #009; */
  }
/* .btn{
  padding: 0;
  font-size: 13px;
  float: left;
  background-color: rgb(253, 127, 23) ;
} */
</style>
