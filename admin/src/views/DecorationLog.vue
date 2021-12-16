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
       @click="$router.push('/decorationlog/edit');"
       >编辑日志</el-button>
      </div>
        
    </template>
        <div>
        <div class="logListTitle">
          <span style="float:left;display: inline-block;margin-left:10px;line-height:30px">最近日志</span>
          <el-button @click="fetch()" style="float:right;width:35px;height:22px;
          display: inline-block;border:0;padding:0;margin:4px">返回</el-button></div>
        <div v-for="item in recentitem" :key="item.classId" class="text item">
          <div style="height:65px;line-height:20px;border-bottom:1px grey solid;padding: 0 8px">
            <p style="margin: 5px; font-weight:700">标题：{{ item.title}}</p>
            <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
            margin: 5px 5px 0  ">{{ item.content}}</p>
            <el-button type="text" size="default" @click="$router.push(`/decorationlog/edit/${item._id}`)" style="width:30px;height:18px;margin:0;padding:0;float:right">修改</el-button>
            <el-button type="text" size="default" @click="$router.push(`/decorationlog/list/${item._id}`)" style="width:30px;height:18px;margin:0;padding:0;float:right;margin-right:5px;">查看</el-button>
          </div>
          <template>
      </template>
      </div>
    </div>
      </div>
      <div class="logItem">
       <p class="logTitle"></p>

       <div class="logAllItem">
        <div class="logEachItem">
          <div v-for="item in items" :key="item.classId" class="text item">
          <div style="line-height:20px;border-bottom:1px grey solid;padding: 0 8px" 
          
@click="fetchfix(item);$router.push(`/decorationlog/edit/${item._id}`);">
            <h2 >{{ item.title}}</h2>
            <p>{{item.datetime}}</p>
            <p>{{ item.content}}</p>
            <div>
              <img :src="item.pic" style="height:200px;width: 200;" />
            </div>
          </div>
          </div>
        </div>
        
       </div>
       <div style="width: 200px;;margin: 10px 100px;text-align: left;">
          <el-pagination
          background
    @current-change="handleCurrentChange"
    :current-page="this.currentPage"
    :page-size="this.pageSize"
    layout="total, prev, pager, next"
    :total="this.count">
 </el-pagination>
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
      recentitem:"",
      items: [],
      search:"",
      model: {
        title: "",
        content: "",
        datetime: "",
        pic: "",
      },
       count: 0,
        currentPage: 1,
        pageSize: 2
    };
  },
  methods: {
   afterUpload(res){
    this.model.pic = res.url;
    },
   
      // 查找数据
    async find(){
        // const search = this.search
        // console.log(search)
        const message = await this.$http.get("rest/decoratelog/logfind/"+this.search); // eslint-disable-line no-unused-vars
        // console.log(message)
        this.items = message.data;
    },
   
    async fetch() {
      const res = await this.$http.get("rest/decoratelog/");
        for (var i=0;i<res.data.length;i++) {
          if(res.data[i].datetime){
        const data1 = res.data[i].datetime.slice(0,10) 
        const data2 = res.data[i].datetime.slice(11,19) 
        const data = data1.concat(" ",data2);
        res.data[i].datetime = data;
      }
      }
      this.recentitem = res.data;
    },
  //  async fetchItem(){
  //    const res = await this.$http.get(`rest/decoratelog/${this.model._id}`)
     
  //     if(res.data.datetime){
  //       const data1 = res.data.datetime.slice(0,10) 
  //       const data2 = res.data.datetime.slice(11,19) 
  //       const data = data1.concat(" ",data2);
  //       res.data.datetime = data;
  //     }
      
  //    this.thisItem = res.data
  //  }
    // 分页更新数据
      // 获取当前页码并重新获取数据
      handleCurrentChange (val) {
        this.currentPage = val
        this._initData()
      },
      // 初始化数据，获得数据数量以及每页数据
      _initData () {
        let param = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        // 
        this.$http.get(`rest/decoratelogs/get/${this.model._id}`).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.count = res.result.list.length;

          }
        })
        this.$http.get(`rest/decoratelogs/get/${this.model._id}`, {
          params: param
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.items = res.result.list;
            console.log(this.items)
            for(var i=0;i<res.result.list.length;i++){
              if(res.result.list[i].datetime){
                const data1 = res.result.list[i].datetime.slice(0,10) 
                const data2 = res.result.list[i].datetime.slice(11,19) 
                const data = data1.concat(" ",data2);
                this.items[i].datetime = data;
                }
            }

            
          } else {
            this.items = []
          }
        })
        
      },
    
  },
  created() {
    this._initData();
    this.fetch()
    // this.id&&this._initData()

    
  },
};
</script>
<style>
.log{
  width: 1050px;
  height: 750px;
  margin: 0 auto;
  border:1px rgb(253, 127, 23) solid;
  border-top: 0;
}
.logList{
  float: left;
  width: 250px;
  border-right: 1px rgb(253, 127, 23) solid;
}
.logList .el-input__inner{
  border-radius: 0;
  margin-top: 5px;

}
.logList .el-button{
  padding: 10px;
  margin: 0;
  margin-right: 5px;
  margin-top: 5px;
  border:0;
  border-radius: 0;
  background-color: rgb(253, 161, 85);
  color: #000;
}
.logListTitle{
  height: 30px;
  background-color: rgb(253, 127, 23);
  padding: 0;
  margin: 0;
  
}
.logItem{
  float: left;
  width:697px;
}
.logAllItem{
  width:700px;
  margin: 0 auto;
  height:670px;
  overflow: hidden;
}
.logEachItem{
  width: 720px;
  height:670px;
  overflow-y:auto;
}

</style>
