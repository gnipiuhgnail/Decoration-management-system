<template>
  <div class="background">
    <div style="width: 100%;text-align:center;">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        装修日志
      </h1>
    </div>
    <hr style="margin:0">
    <div class="log" style="height:600px">

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
       @click="$router.push('/decorationlog/edit');"
       >编辑日志</el-button>
      </div>
        
    </template>
        <div>
        <div class="logListTitle" style="background-color:rgba(253, 126, 23, 0.575)">
          <span style="float:left;display: inline-block;margin-left:10px;line-height:30px">最近日志</span>
          <el-button @click="fetch()" style="float:right;width:35px;height:22px;
          display: inline-block;border:0;padding:0;margin:4px">返回</el-button></div>
        <div v-for="item in items" :key="item.classId" class="text item">
          <div style="height:40px;line-height:20px;border-bottom:1px grey solid;padding: 0 8px">
            <p style="margin: 0;  font-size: 10px;float:left">标题：{{ item.title}}</p><span style="float:right;font-size: 10px;">{{item.datetime}}</span>
            <p style="width: 170px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;float: left;
            margin: 0;  font-size: 10px;">{{ item.content}}</p>
            <el-button type="text" size="default" @click="$router.push(`/decorationlog/edit/${item._id}`)" style="width:30px;height:18px;font-size:12px;margin:0;padding:0;float:right">修改</el-button>
          </div>
          <template>
      </template>
      </div>
    </div>
      </div>
      <div class="logItem">
        <p class="logListTitle">
          <el-button @click="$router.push('/decorationlog/')" style="float:left;width:35px;height:22px;
          display: inline-block;border:0;padding:0;margin:4px">返回</el-button>
        </p>
        <div class="thisLogItem">
          <div style="height:60px;border-bottom:1px rgb(253, 127, 23) solid;background-color:rgba(253, 126, 23, 0.575);padding:0;">
            
            <p style="text-align:center;font-size:20px;margin:0 5px;height:30px;line-height:60px;font-weight:700px">{{this.thisItem.title}}</p>
            <p style="text-align:right;margin:6px 15px;padding:0">{{this.thisItem.datetime}}</p>
          </div>
         
          <div style="margin:33px 30px">{{this.thisItem.content}}</div>
          <div>
              <img v-if=(this.thisItem.pic) :src="this.thisItem.pic" style="height:200px;width:300px;margin:10px 200px;" />
              <i v-else></i>
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
      thisItem:[],
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
   
      // 查找数据
    async find(){
        const search = this.search
        const message = await this.$http.get("rest/decoratelog/logfind/"+search); // eslint-disable-line no-unused-vars
        this.items = message.data;
    },
    
    async fetch() {
      const res = await this.$http.get("rest/decoratelog");
        for (var i=0;i<res.data.length;i++) {
          if(res.data[i].datetime){
        const data1 = res.data[i].datetime.slice(0,10) 
        const data2 = res.data[i].datetime.slice(11,19) 
        const data = data1.concat(" ",data2);
        res.data[i].datetime = data;
      }
      }
      this.items = res.data;
    },
     async fetchItem(){
     const res = await this.$http.get(`rest/decoratelog/${this.$route.params.id}`)
     
          if(res.data.datetime){
        const data1 = res.data.datetime.slice(0,10) 
        const data2 = res.data.datetime.slice(11,19) 
        const data = data1.concat(" ",data2);
        res.data.datetime = data;
      }
      
     this.thisItem = res.data
   }
    // ${this.$route.params.id}
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
    background-color: rgb(255, 199, 153);


  padding: 0;
  margin: 0;
  
}
.logItem{
  float: left;
  width:797px;
}
.thisLogItem{
  width: 700px;
  height: 500px;
  margin: 30px 50px;
  border:1px rgb(230, 162, 107) solid;
  /* background-color: #009; */
}

</style>
