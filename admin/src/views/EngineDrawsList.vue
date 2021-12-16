<template>
  <div class="background">
     <p class="ListTitle">
       <span style="width:150px;margin:0 auto">工程图纸列表</span>
      </p>
    <br>
    <div class="tablerow" style="width:98%;margin:0 auto">
      <template>
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
      
    </template>
    <el-table :data="items" style="height:420px">
      <el-table-column prop="value" label="类型"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="text" label="文字描述"> </el-table-column>
      <el-table-column prop="pic" label="图片描述">
        <template slot-scope="scope">
          <img :src="scope.row.pic" style="height: 4rem" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
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
            title="工程图纸具体信息"
            :visible.sync="dialogTableVisible"
            :modal-append-to-body="false"
            style="margin:-80px"
          >
            <div style="text-align: center;border-top:1px solid black">
              <!-- <div>{{message.value}}</div> -->
              <div>类型：{{ message.value }}</div>
              <div>名称：{{ message.name }}</div>
              <div>文字描述：{{ message.text }}</div>
              <img :src="message.pic" style="height: 300px" />
            </div>
          </el-dialog>
          <el-button
            type="text"
            @click="$router.push(`/enginedraws/edit/${scope.row._id}`)"
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
      const message = await this.$http.get(`rest/enginedraws/${row._id}`); // eslint-disable-line no-unused-vars
      this.message = message.data;
    },
    // 查找数据
    async find(){
        const message = await this.$http.get("rest/enginedraws/find/"+this.search); // eslint-disable-line no-unused-vars
        this.items = message.data;
    },

    // // 根新数据
    // async fetch() {
    //   // 这里如果没有await，获取到的res是一个promise对象
    //   // async加上await，会等待函数get执行完毕，再继续执行下面的
    //   const res = await this.$http.get("rest/enginedraws");
    //   this.items = res.data;
    //   // console.log(this.items);
    // },
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
        this.$http.get('rest/enginedraws/get').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.count = res.result.list.length
          }
        })
        this.$http.get('rest/enginedraws/get', {
          params: param
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.items = res.result.list;
          } else {
            this.items = []
          }
        })
        
      },
    async remove(row) {
      this.$confirm(`是否确认要删除图纸 "${row.name}"的信息`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 删除的接口
        const res = await this.$http.delete(`rest/enginedraws/${row._id}`); // eslint-disable-line no-unused-vars
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 重新获取数据
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
.ListTitle{
  height: 40px;  
  line-height: 40px;
  padding: 0;
  margin: 0;
  font-size: 18px;
  border-bottom: 1px rgba(253, 126, 23, 0.575)  solid;
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

  /* height: 30px; */
}
div.cell{
  font-size: 16px;
}
.el-button {
  /* margin: 0 auto; */
  margin: 10px;
  /* font-size: 16px; */
}
.v-modal {
  z-index: 2;
}
.tablerow .el-table .cell {
  height: 50px;
  line-height: 50px;
  text-align:left;
  margin:2px auto;
}
</style>

