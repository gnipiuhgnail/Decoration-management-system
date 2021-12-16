<template>
  <div class="background">
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        未来三日的日程提醒列表
      </h1>
    </div>
    <hr>
    <div class="schedulescreate">
      <!-- 日程展示 -->
    <el-card class="rebox-card">
      <div  class="clearfix">
        
        <div v-for="item in items"  :key="item.classId" class="text item">
          <h3 style="margin-block:0">{{ item.name}}</h3>
          <p style="display:inline-block;">{{ item.deadline}}</p>
          <div style="display:inline-block;width: 1.2px;height: 15px; background: #000;margin:0 10px"></div> 
          <!-- <span style="display:inline-block;width:0px;height:15px;border:1px #000 solid"></span> -->
        <p style="width:600px;margin-block:0;display:inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.content}}</p>
        <hr>
      </div>
      </div>

    </el-card>

    </div>
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      items:[],
      model:[],
      dangerouslyUseHTMLString:''
    };
  },
  methods: {
   
    // 根新数据
    async fetch() {
      // console.log(this.items)
      const res = await this.$http.get("rest/schedules/receive");
      // console.log("22222222222",res)
      for (var i=0;i<res.data.length;i++) {
        const data1 = res.data[i].deadline.slice(0,10) 
        const data2 = res.data[i].deadline.slice(11,19) 
        const data = data1.concat(" ",data2);
        res.data[i].deadline = data;  
      }
      
      this.items = res.data;
      // console.log(this.items);
      
    },
   async notification(){
    //  1.判断用户上线
    const res = await this.$http.get("rest/schedules/receive/arrive")
    this.model = res.data;
    //  2.创建任务提醒
     var schedule = require('node-schedule')
    var newDate = new Date()
      schedule.scheduleJob(newDate, function(){
      this.open(true)
      this.scheduleCancel()
      });
      this.open(false)

   },
   open(istrue){
    //  const h = this.$createElement;
    if(this.model.length>0){
      for(var i=0;i<this.model.length;i++){
      this.$notify({
          title: `今日任务${[i+1]}：${this.model[i].name}`,
          duration:0,
          position:'top-right',
          offset: 100,
          type: 'warning',
          dangerouslyUseHTMLString:istrue,
           message: `${this.model[i].content}`,
        });
     }
    }
     
        
      },
      scheduleCancel(){
        var schedule = require('node-schedule')
        var counter = 1;
        const j = schedule.scheduleJob('* * * * * *', function(){
        console.log('定时器触发次数：' + counter);
        counter++;
    });
    setTimeout(function() {
        console.log('定时器取消')
      // 定时器取消
        j.cancel();   
    }, 5000);
}
  },
  created() {
    this.fetch();
    this.notification();
  },
};
</script>
<style>
.rebox-card{
  margin-top:10px;
  width: 1020px;
  background-color: rgb(240, 218, 159);
  overflow-y: scroll;
}
.el-table {
  margin-top: 10px;
  border-radius: 5px;
}
/* 设置table header的背景颜色 */
.el-table__header th,
.el-table__header tr {
  text-align: center;
  color: black;

}

.el-table__body td,
.el-table__body th {
  padding: 1px;
  text-align: center;

  /* height: 10px; */
}
.el-button {
  /* margin: 0 auto; */
  margin: 10px;
}
.v-modal {
  z-index: 2;
}
.el-notification{
  border:2px orange solid;
}
</style>

