<template>
  <div class="background">
    <!-- 标题 -->
    
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        施工人员列表
      </h1>
    </div>
    <hr>
    <!-- 列表 -->
    <div  style="width:1000px;height:390px;margin:10px auto">
    <template>
       <div style="float:right;margin-bottom:5px;">
         <el-button type="primary" size="mini" style="color:black;height: 31px;border-radius:0;
         border:1px solid rgba(253, 126, 23, 0.575); background-color: rgba(253, 126, 23, 0.575);" @click="createContact()">添加施工人员信息</el-button>
         <el-input
        v-model="search"
        placeholder="输入类型/名字"
        size="small" 
        style="width:200px;height: 30px; border-radius:0"
      />
      <el-button type="primary" size="mini" icon="el-icon-search"
       style="color:black;height: 31px;margin: 0;border-radius:0;border:1px solid rgba(253, 126, 23, 0.575); background-color: rgba(253, 126, 23, 0.575);"
       @click="find()"
       >搜索</el-button>
       <el-button type="primary" size="mini" 
       style="color:black;height: 31px;border-radius:0;border:1px solid rgba(253, 126, 23, 0.575); background-color: rgba(253, 126, 23, 0.575);"
       @click="_initData ();">查看全部</el-button>
       </div>
    </template>
    <!-- 二维码 -->
    <template>
      <el-dialog title="手机扫码拨号" :visible.sync="dialogVisibleQR" width="350px" class="dialog" style="text-align:center;margin-top:100px">
        <div id="qrcode" ref="qrCodeDiv" style="margin:10px 30px"></div>
        </el-dialog>
      </template>
      <!-- 表格 -->
    <el-table :data="items" class="contableRow"  style="height:398px;">
      <el-table-column prop="value" label="类型"  width="100px"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="100px"> </el-table-column>
      <el-table-column el-table-column prop="contact" label="联系电话" width="160px">
        <template slot-scope="scope">
          <div style="width:160px;height:40px;line-height:40px">
            <a :href="'tel:' + scope.row.contact" style="display:inline-block;float:left;"
               >{{scope.row.contact}}
            </a>
            <!-- <svg class="icon" aria-hidden="true" style="width:31px;display:inline-block;float:right;color:grey">
              <use href='#icon-qrcode' @click="getHref(scope.row)"></use>
            </svg> -->
          </div>
            
          <!-- <a :href="'tel:' +scope.row.contact" @click="getHref(scope.row)"
               >扫码通话
            </a> -->
        </template>
      </el-table-column>
         <el-table-column label="手机扫码拨号" width="160px">
           <template slot-scope="scope">
             <el-button @click="getHref(scope.row)" size="small" style="margin-top:-15px;margin-left:-10px"
               >手机扫码通话
            </el-button>
           </template>
           <!-- <p v-html="this.a"  style="height:100px"></p> -->
      </el-table-column>
    
      <el-table-column prop="address" label="地址" width="200px">
      </el-table-column>
      <el-table-column prop="salary" label="薪资" width="80px"> </el-table-column>

      <el-table-column fixed="right" label="操作" style="line-height:40px" width="150px">
        <template slot-scope="scope" >
          <!-- scope.row当前这一行数据 -->
          <!-- $router.push()跳转到某个地址 -->

          <el-button
            type="text" 
            style="margin:0 20px -40px 0"   
            @click="$router.push(`/contacts/edit/${scope.row._id}`);createFetch(scope.row)"
            >修改</el-button
          >
          <el-button type="text"
            style="margin:0"   
           @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>

        
      
    </el-table>
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
    <!-- 弹窗：创建 -->
    <template>
        <el-dialog :visible.sync="dialogVisible" width="550px" class="dialog" style="text-align:center">
           <h1 style="font-size:18px">{{id?"编辑":"新建"}}施工人员</h1>
    <!-- 通过 label-position 属性来改变表单域或标签的位置，可选的值有 top/left/right ，默认的是 right ， -->
    <!-- lable-position 必须要和 label-width（表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值） 共同使用，才会生效。 -->
    <!-- native原生表单，阻止默认提交，避免页面跳转 -->
    <el-form class="contact"
      :label-position="labelPosition"
      label-width="80px"
       style="width:400px;margin:auto;"
      @submit.native.prevent="save"
    >
     <el-form-item>
       <span style="margin-left:-80px;">工作类型</span
      ><el-select v-model="model.value" placeholder="请选择" style="width:320px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
     </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="model.contact"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="model.address"></el-input>
      </el-form-item>
      <el-form-item label="工资">
        <el-input v-model="model.salary"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="success" native-type="submit" style="margin: 30px 120px;">保存</el-button>
      </el-form-item>
    </el-form>
        </el-dialog>
      </template>
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
      dialogVisible:false,
      labelPosition: "right",
      options: [
        {
          value: "拆旧工",
          label: "拆旧工",
        },
        {
          value: "泥水工",
          label: "泥水工",
        },
        {
          value: "水电工",
          label: "水电工",
        },
        {
          value: "木工",
          label: "木工",
        },
        {
          value: "油漆工",
          label: "油漆工",
        },
        {
          value: "保洁",
          label: "保洁",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      model: {
        name: "",
        contact: "",
        address: "",
        salary: "",
        value: "",
        qrcode:""
      },
      dialogVisibleQR:false,
      count: 0,
        currentPage: 1,
        pageSize: 7
    };
  },
  methods: {
     // 查找数据
    async find(){
        const search = this.search
        const message = await this.$http.get("rest/contacts/find/"+search); // eslint-disable-line no-unused-vars
        this.items = message.data;
    },

    createContact(){
      this.dialogVisible = true;
    },
    async remove(row) {
      this.$confirm(`是否确认要删除施工人员 "${row.name}"的信息`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 删除的接口
        const res = await this.$http.delete(`rest/contacts/${row._id}`); // eslint-disable-line no-unused-vars
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 重新获取数据
        this._initData ();
      });
    },
   
     // 请求接口，提交数据，需要axios// eslint-disable-line no-unused-vars
    async save() {
      
      let res // eslint-disable-line no-unused-vars
       if(this.id){
        // id存在，修改数据
      res = await this.$http.put(`rest/contacts/${this.id}`,this.model);
      this.$message({
        type: "success",
        message: "修改成功",
      });
      }else{
      res = await this.$http.post("rest/contacts",this.model);
      this.$message({
        type: "success",
        message: "创建成功",
      });
        
      }
       this.$router.push("/contacts/list");
      
      this.model.name="",
        this.model.contact= "",
        this.model.address="",
        this.model.salary="",
        this.model.value="",
        this.model.qrcode=""
        
      this.dialogVisible = false;
      this._initData ();
    },
    async createFetch(row){
      
      this.dialogVisible = true;
      const res = await this.$http.get(`rest/contacts/${row._id}`)
      this.model = res.data
      
    },
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
        this.$http.get('rest/contacts/get').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.count = res.result.list.length
          }
        })
        this.$http.get('rest/contacts/get', {
          params: param
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.items = res.result.list;
            // console.log(this.items)
            for(var i=0;i<this.items.length;i++){
              if(this.items[i].qrcode){
                
                console.log((this.items[i].qrcode))
              }
            }
          } else {
            this.items = []
          }
        })
        
      },
      // 扫码拨号
      handleClose(done) {
       console.log(done)
      },
     getHref(row){
      this.dialogVisibleQR = true
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      newPromise.then(()=>{
        this.$http.get(`rest/contacts/gethref/${row._id}`) 
      }).then(() => {
       const QRCode = require('qrcodejs2')
       document.getElementById("qrcode").innerHTML = "";
       new QRCode(this.$refs.qrCodeDiv, "http://192.168.43.232:3000/htmls/contact.html");
       })
      },
  },
  created() {
    this._initData ();
    this.id && this.createFetch()
  },
};
</script>
<style>

.el-table{
  margin-top: 10px;
  border-radius: 5px;
}

.el-table__header th, .el-table__header tr {
  text-align: center;

color: black;

}
.el-table__body td,.el-table__body th{
padding:1px;
text-align: center;

/* height: 10px; */
}
.el-button{
  /* margin: 0 auto; */
  margin: 10px;
}
.contableRow.el-table .cell {
  height: 40px;
  line-height: 40px;
  text-align:left;
  margin:2px auto;
  
}

</style>

