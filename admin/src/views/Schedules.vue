<template>
  <div class="background">
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        日程列表
      </h1>
    </div>
    <hr>
    <!-- //该div是循环卡片列表     -->
    <div class="schedulescreate">
      <div >
      <!-- 创建任务 -->
      <template>
        <!-- 创建弹窗 -->
        <el-dialog
          title="日程详情"
          :visible.sync="dialogTableVisible"
          :modal-append-to-body="false"
          
        >
          <div>
            <el-form
              :model="model"
              ref="model"
              label-width="70px"
              @submit.native.prevent="save"
              
            >
             
              <el-row :gutter="18">
                <el-col :span="9">
                  <el-form-item prop="value" label="类型">
                    <el-select v-model="model.value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item prop="name" label="标题">
                    <el-input
                      v-model="model.name"
                      style="float: left"
                    ></el-input>
                  </el-form-item>
                </el-col>

               
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-form-item
                    prop="deadline"
                    label="时间"
                    style="float: left"
                  >
                    <div>
                      <el-date-picker
                        v-model="model.deadline"
                        type="datetime"
                        placeholder="选择日期时间"
                        @change="handleDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="expireTimeOption"
                      ></el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item prop="text" label="内容" style="margin: -32px,0,0,0;">
                <el-input
                  type="textarea"
                  v-model="model.content"
                  style="width: 467px"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="success"
                  native-type="submit"
                  style="margin: -150px 80px"
                  >{{this.model.id?"修改":"创建"}}</el-button
                >
                <template>
          <!-- <el-button type="text" size="small"  style="margin-block:0;"
           @click="savefix(item);$router.push(`/schedules/edit/${item._id}`)"
            >修改</el-button
          > -->
          
          <el-button v-if="this.model.id" type="success" @click="remove()"  style="margin-block:0"
            >删除</el-button
          >
        </template>
                <!-- <el-button type="primary" native-type="submit">修改</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </template>
    </div>

<!-- 日程展示 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="height:20px">
       <div style="float:right;margin-bottom:5px">
         <el-input
        v-model="search"
        placeholder="输入任意关键字"
        size="small" 
        style="width:200px;height: 30px; border-radius:0"
      />
      <el-button type="primary" size="mini" icon="el-icon-search"
       style="height: 31px;margin: 0;border-radius:0;border:1px solid rgba(253, 126, 23, 0.575); background-color: rgba(253, 126, 23, 0.575);color:black"
       @click="find()"
       >搜索</el-button>
       <el-button type="primary" size="mini" 
       style="height: 31px;border-radius:0;border:1px solid rgba(253, 126, 23, 0.575); background-color: rgba(253, 126, 23, 0.575);color:black"
       @click="_initData()">查看全部</el-button>
       
       </div>
       <el-button type="primary" size="mini" 
       style="float:left;height: 31px;border-radius:0;border:1px solid rgba(253, 126, 23, 0.575); background-color: rgba(253, 126, 23, 0.575);color:black"
       @click="open();$router.push('/schedules');">创建日程</el-button>
      </div>
      <div v-for="item in items" :key="item.classId" class="text item"  @click="savefix(item);$router.push(`/schedules/edit/${item._id}`)">
          <h3 style="margin-block:0">{{ item.name }}</h3>
          <p style="display:inline-block;margin:2px 0">{{ item.deadline }}</p>
          <div style="display:inline-block;width: 1.2px;height: 15px; background: #000;margin:0 10px"></div> 
          <!-- <span style="display:inline-block;width:0px;height:15px;border:1px #000 solid"></span> -->
        <p style="width:600px;margin-block:0;display:inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.content }}</p>
        <hr>
      </div>
    </el-card>

    </div>
    <div style="width: 200px;;margin: 20px auto;text-align: left;">
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
</template>

<script>
export default {
  props: {
        id: {},
      },
  data() {
    return {
      items: [],
      dialogTableVisible: false,
      message: {},
      search: "",
      options: [
        {
          value: "工程",
          label: "工程",
        },
        {
          value: "订购",
          label: "订购",
        },
        {
          value: "取货",
          label: "取货",
        },
        {
          value: "采购",
          label: "采购",
        },
        {
          value: "提醒",
          label: "提醒"
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      model: {
        id:"",
        name: "",
        value: "",
        content: "",
        deadline: "", // 截止时间
      },
      count: 0,
        currentPage: 1,
        pageSize:6,
      expireTimeOption: {
        disabledDate(date) {
          //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
    };
  },
  methods: {
   
    // 截止日期
    handleDate(value) {
      // this.eosFormatTime(value);
      
      this.model.deadline = value;
      console.log(this.model.deadline)

      // this.model.outCompanyDate = value;
    },
    // 点击打开创建页面
    open() {
      this.dialogTableVisible = true;
       for (let key in this.model) {
        this.model[key] = "";
        // this.$router.push("/schedules")
      }
      
    },
   
    // 修改
    async savefix(item) {
      this.dialogTableVisible = true;
      this.model.id= item._id;
      console.log(item)
      // this.$nextTick(()=>{
      this.model.name = item.name;
      this.model.value = item.value;
      this.model.content = item.content;
      // this.model.deadline = item.deadline;
      // 设置日期格式
      if(item.deadline){
      const data1 = item.deadline.slice(0,10) 
      const data2 = item.deadline.slice(11,19) 
      const data = data1.concat(" ",data2);
      this.model.deadline = data;
      }
      
      
      // })   
      
    },

    // 创建
    async save() {
      let res; // eslint-disable-line no-unused-vars

      // this.id用户的ID
      if(this.id){
        // id存在，修改数据
        res = await this.$http.put(`rest/schedules/createschedule/${this.id}`,this.model);
         this.dialogTableVisible = false;
      this.$message({
        type: "success",
        message: "修改成功",
      });
      }else{
        if(!this.model.name){
          this.$message({
        type: "error",
        message: "请填写标题",
      });
      return
        }else if(!this.model.deadline){
          this.$message({
        type: "error",
        message: "请选择时间",
      });
          return
        }
        
        res = await this.$http.post("rest/schedules/createschedule", this.model);
         this.dialogTableVisible = false;
      this.$message({
        type: "success",
        message: "创建成功",
      });
      } 
        for (let key in this.model) {
        this.model[key] = "";
      }
     
      
      this._initData();
    },
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
        this.$http.get('rest/schedules/getschedule').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.count = res.result.list.length
          }
        })
        this.$http.get('rest/schedules/getschedule', {
          params: param
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            for (var i=0;i<res.result.list.length;i++) {
              const data1 = res.result.list[i].deadline.slice(0,10) 
              const data2 = res.result.list[i].deadline.slice(11,19) 
              const data = data1.concat(" ",data2);
              res.result.list[i].deadline = data;
           }
            this.items = res.result.list;
          } else {
            this.items = []
          }
        })
      },
    async remove() {
      this.$confirm(`是否确认要删除日程 "${this.model.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/schedules/${this.$route.params.id}`); // eslint-disable-line no-unused-vars
        this.dialogTableVisible = false;
        this.$message({
          type: "success",
          message: "删除成功!",
        });

        this._initData();
      });
    },
    // 查找数据
    async find(){
        const search = this.search
        console.log(search)
        const message = await this.$http.get("rest/schedules/find/"+this.search); // eslint-disable-line no-unused-vars
        for (var i=0;i<message.data.length;i++) {
              const data1 = message.data[i].deadline.slice(0,10) 
              const data2 = message.data[i].deadline.slice(11,19) 
              const data = data1.concat(" ",data2);
              message.data[i].deadline = data;
           }
        this.items = message.data;
    },
  },
  created() {
    this._initData()
    // this._initData();
    // this.schedulesfetch()
  },
};
</script>
<style>
.schedulescreate{
  width: 1000px;
  margin-left: 100px;
  margin-top:10px;
  overflow: hidden;
}
.box-card{
  margin-top:10px;
  width: 1020px;
  background-color: rgb(240, 218, 159);
  height: 500px;
  overflow-y: scroll;
}
</style>
