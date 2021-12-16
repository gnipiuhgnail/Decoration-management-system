<template>
  <div class="background">
    <p class="ListTitle">
       <span style="width:150px;margin:0 auto">候选产品信息列表</span>
      </p>
    <br>

     <div style="width:1000px;margin:0 auto">
       <template>
       <div style="float:right;margin-bottom:5px">
         <el-input
        v-model="search"
        placeholder="输入任意关键字"
        size="small" 
        style="width:200px;height: 30px; border-radius:0"
      />
      <el-button type="primary" size="mini" icon="el-icon-search"
       style="color:black;height: 31px;margin: 0;border-radius:0;border:1px solid  rgba(253, 126, 23, 0.575);; background-color: rgba(253, 126, 23, 0.575);"
       @click="find()"
       >搜索</el-button>
       <el-button type="primary" size="mini" 
       style="color:black;height: 31px;border-radius:0;border:1px solid rgba(253, 126, 23, 0.575); background-color: rgba(253, 126, 23, 0.575);"
       @click="_initData()">查看全部</el-button>
       </div>
      
    </template>
    <el-table :data="items" class="protableRow"  style="width:98%;height:420px;margin:0 auto">
      <el-table-column min-width="8%" prop="value" label="类型"> </el-table-column>
      <el-table-column min-width="13%" prop="name" label="姓名"> </el-table-column>
      <el-table-column min-width="8%" prop="price" label="产品单价"> </el-table-column>
      <el-table-column min-width="20%" prop="store" label="商家"> </el-table-column>
      <el-table-column min-width="20%" prop="text" label="文字描述"> </el-table-column>
      <el-table-column min-width="13%" prop="pic" label="图片描述">
        <template slot-scope="scope">
          <img :src="scope.row.pic" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column min-width="18%" label="操作" >
        <template slot-scope="scope">
          <!-- scope.row当前这一行数据 -->
          <!-- $router.push()跳转到某个地址 -->
          <!-- <el-button type="text" size="small" @click="check()"
            >查看</el-button
          > -->
          <el-button
            type="text"
            @click="this.data = check(scope.row)"
            >查看</el-button
          >

          <el-dialog
            title="产品具体信息"
            :visible.sync="dialogTableVisible"
            :modal-append-to-body="false"
            style="text-align:center;margin-top:-60px"

          >
            <div style="border-top:1px solid black;padding:0">
            <div style="width:200px;text-align: left;margin:0 auto;">
              <!-- <div>{{message.value}}</div> -->
              <div>类型：{{ message.value }}</div>
              <div>名称：{{ message.name }}</div>
              <div>单价：{{ message.price }}</div>
              <div>商家：{{ message.store }}</div>
              <div>文字描述：{{ message.text }}</div>
              <img :src="message.pic" style="height: 300px" />
              </div>
            </div>
          </el-dialog>
          <el-button
            type="text"
            @click="$router.push(`/productdraws/edit/${scope.row._id}`)"
            >修改</el-button
          >
          <el-button type="text" @click="remove(scope.row)"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      dialogTableVisible: false,
      message: {},
      search:"",    
 count: 0,
        currentPage: 1,
        pageSize: 6
    };
  },
  methods: {
    // 查看数据
    async check(row) {
      this.dialogTableVisible = true;
      const message = await this.$http.get(`rest/productdraws/${row._id}`); // eslint-disable-line no-unused-vars
      this.message = message.data;
    },
    // 查找数据
    async find(){
        const search = this.search
        console.log(search)
        const message = await this.$http.get("rest/productdraws/find/"+this.search); // eslint-disable-line no-unused-vars
        console.log(message)
        this.items = message.data;
    },
    // 根新数据
    // async _initData() {
    //   // 这里如果没有await，获取到的res是一个promise对象
    //   // async加上await，会等待函数get执行完毕，再继续执行下面的
    //   const res = await this.$http.get("rest/productdraws");

    //   this.items = res.data;
    //   // console.log(this.items);
    // },
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
        this.$http.get('rest/productdraws/get').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.count = res.result.list.length
          }
        })
        this.$http.get('rest/productdraws/get', {
          params: param
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.items = res.result.list;
            console.log(this.items)
            // for(var i=0;i<this.model.items;i++){
            //   if(this.model.items[i].qrcode){
            //     console.log()
            //   }
            // }
          } else {
            this.items = []
          }
        })
        
      },

    async remove(row) {
      this.$confirm(`是否确认要删除产品 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 删除的接口
        const res = await this.$http.delete(`rest/productdraws/${row._id}`); // eslint-disable-line no-unused-vars
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 重新获取数据
        // this.fetch();
        this._initData()
      });
    },
  },
  created() {
    // this.fetch();
        this._initData()

  },
};
</script>
<style>

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
.protableRow.el-table .cell {
  height: 50px;
  line-height: 50px;
  text-align:left;
  margin:2px auto;
}
</style>

