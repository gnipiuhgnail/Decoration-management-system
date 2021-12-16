
<template>
  <!-- 标题：预算计划 -->
  <div class="background">
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        预算计划
      </h1>
    </div>
    <hr>
    <!-- 选择列表 -->
    <template>
      <div class="budgetall">
      <h4 style="text-align:center;padding:0;margin-top:0;">选择列表</h4>
      <span style="display:inline-block;float:right;color:black;font-size:8px;"><em>备注：单击修改可价格</em></span>
      <div class="budgetallTable">
        <div style="width: 570px;height: 405px;overflow-y: scroll;">
          <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          :row-class-name="tableRowClassName"
          @cell-click="tabClick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <!-- <el-form label-position="left" inline class="demo-table-expand"> inline不独占一行-->
              <el-form style="height:15px">
                <el-form-item>
                  <span>备注：</span><span>{{ props.row.text }}</span>
                </el-form-item>
                
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="50" @change="select(this)"></el-table-column>
          <el-table-column
            label="类型"
            prop="value"
            width="80"
          ></el-table-column>
          <el-table-column
            label="预算名称"
            prop="name"
            width="120"
          ></el-table-column>
          
          <el-table-column label="价格" prop="price" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.index === tabClickIndex && tabClickLabel === '价格'">
                <el-input v-model="scope.row.price" maxlength="80" placeholder="请输入价格" size="mini" @blur="inputBlur;"/>
              </span>
              <span v-else>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                style="padding: -6px; margin: -5px 3px"
                size="small"
                @click="remove(scope.row)"
                >删除</el-button
              >
              <el-button
                   type="text"
                style="padding: -6px; margin: -5px 3px"
                size="small"
                  @click="$router.push(`/budgetplan/edit/${scope.row._id}`)"
                  >修改</el-button
                >
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div>
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="$router.push('/budgetplan')"
          style="float:left;">添加预算</el-button>
        


        
      </div>
    </template>

    <!-- 预算列表 -->
    <div class="budgetlist">
      <h4 style="text-align:center;padding-top:0;margin-top:0;margin-bottom:33px">预算列表</h4>
      <div>
        <template>
           <el-form status-icon label-width="100px">
            
              <el-table :data="multipleSelection" border style="width: 100%">
                 <template  slot="empty" >
            <span style="font-size:16px;height:30px;width: 200px;text-align:center;color:rgb(200, 200, 200) ">选择预算</span>
            </template>
                <el-table-column prop="value" label="类型" width="80">
                </el-table-column>
                <el-table-column prop="name" label="预算名称" width="80">
                </el-table-column>
                <el-table-column prop="price" label="价格" width="80">
                </el-table-column>
              </el-table>
           </el-form>
     
    </template>
    <div style="float: left">
      <span style="margin-top:10px;display: inline-block;font-size:16px">合计：{{ this.model.sum }}</span>{{ this.model.sum ? "元" : "" }}
    </div>
    <div style="float: right">
      <template>
        <el-button type="success" native-type="submit" style="" size="mini" @click="open()">生成</el-button>
      </template>        
    </div>
    </div>
    </div>

    <!-- 预算记录 -->
    <div class="bugetnote">
      <template>
        <!-- scope.row当前这一行数据 -->
        <!-- $router.push()跳转到某个地址 -->
        <!-- 创建弹窗 -->
        <el-dialog :title="'预算记录：'+this.notemodel.notename" :visible.sync="dialogVisible" width="60%" class="dialog" style="text-align:center">
          <hr>
          <span style="color:black;float:left;margin-bottom:5px">创建日期：{{this.notemodel.datetime}}</span>
          <span  style="color:black;float:left;margin-bottom:5px;margin-left:230px;">详细预算表</span>
          <span style="display:inline-block;float:right;color:black;font-size:8px;margin-bottom:-5px"><em>备注：单击修改可价格</em></span>
           <div>
             
          <el-table
          :data="notemodel.items"
          border
          :row-class-name="tableRowClassName"
          @cell-click="tabClick"
        >
          <el-table-column
            label="类型"
            prop="value"
          ></el-table-column>
          <el-table-column
            label="预算名称"
            prop="name"
          ></el-table-column>
          <!-- <el-table-column label="联系人" prop="contactname"></el-table-column>
          <el-table-column
            label="联系方式"
            prop="contact"
          ></el-table-column> -->
          <el-table-column label="备注" prop="text">

          </el-table-column>
          <el-table-column label="价格" prop="price" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.index === tabClickIndex && tabClickLabel === '价格'">
                <el-input v-model="scope.row.price" maxlength="80" placeholder="请输入价格" size="mini" @blur="inputBlurSecond"/>
              </span>
              <span v-else>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                style="padding: -6px; margin: -5px 10px"
                size="small"
                @click="removenoteitem(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <p style="display:inline-block;float:right;color:black;font-size:16px;width:130px;margin:8px 0 5px 10px">总预算：{{this.notemodel.sum}}元</p>
          <span slot="footer" class="dialog-footer" style="padding:0 auto;">
          <el-button type="primary" size="small" @click="fixnote()" style="margin:10px 20px">保存</el-button>
          <el-button type="danger" size="small" @click="removenote()" style="margin:10px 10px">删 除</el-button>
          </span>
          </div>
          <hr>
          <div>
        <div id="myChart" :style="{width: '800px', height: '400px'}" style="margin:0 auto"></div>
        </div>
        </el-dialog>
      </template>

      <h4 style="text-align:center;padding-top:0;margin-top:0;margin-bottom:33px;">预算计划记录</h4>
      <div class="bugetnotebox">
        <div v-for="noteitem in noteitems" :key="noteitem.classId" class="text item">
         <div style="height:50px">
            <div style="height:15px;line-height:15px;margin:5px 10px">
            <p style="display: inline-block;float: left;margin: 0;">{{ noteitem.notename}}</p>
            <p  style="display: inline-block;float: right;margin: 0;">{{ noteitem.datetime }}</p>
          </div>
          <div style="height:15px;line-height:15px;margin:5px 10px">
            <p style="margin: 4px 0; float: left;">总预算：{{ noteitem.sum}}元</p>
            <el-button type="text" style="float:right;margin:5px;padding:0" @click="savefix(noteitem);
            $router.push(`/budgetselect/edit/${noteitem._id}`);getnodeclass(noteitem.items);getnodeclassvandp();">详情</el-button>
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
   props: {
        id: {},
      
      },
   
  data() {
    return {
      tableData: [],  //表格1：选择列表的数据，后台返回的
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "", // 当前点击的列名
      
      multipleSelection: [], //多选
      model:{       //表格2：预算列表展示的数据
        sum: "",
        notename:"",
        items: [],
        datetime:""
      },
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
        {
          value: "设置",
          label: "设置",
          icon:"#icon-fenlei"
        },
      ],
      noteitems:[], //表格3：预算列表的数据，记录多条预算记录，后台返回的
      dialogVisible: false,
      notemodel:{
        sum: "",
        notename:"",
        items: [],
        datetime:"",
        _id:""
      },
      budgetnote: [
        {
          value: "家庭建材",
          price:0
        },
        {
          value: "油漆",
          price:0
        },
        {
          value: "五金水电",
          price:0
        },
        {
          value: "灯饰照明",
          price:0
        },
        {
          value: "厨房",
          price:0
        },
        {
          value: "卫浴",
          price:0
        },
        {
          value: "家具",
          price:0
        },
        {
          value: "家电",
          price:0
        },
        {
          value: "软装",
          price:0
        },
        {
          value: "设计费",
          price:0
        },
        {
          value: "监理费",
          price:0
        },
        {
          value: "人工费",
          price:0
        },
        {
          value: "辅助设施",
          price:0
        },
        {
          value: "其他",
          price:0
        },
        
      ],
      valueData:[],
      priceData:[],
      myChart:"",
      count: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  
  methods: {
    // changetable(){
    //   var html=document.getElementsByClassName("el-table__empty-text")[0];
    //   html.innerHTML = "123"
    // },
//表一： 选择列表
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    // 添加明细原因 row 当前行 column 当前列
    tabClick(row, column) {
      switch (column.label) {
        case "价格":
          this.tabClickIndex = row.index; //点击的单元格
          this.tabClickLabel = column.label; //当前点击的列名
          break;
        
        default:
          return;
      }
    },
    // 失去焦点初始化
    inputBlur() {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    inputBlurSecond() {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
      this.priceData=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      this.getnodeclass(this.notemodel.items);
      this.getnodeclassvandp();
      this.fixnote();
      this.$nextTick(() => {
        this.drawLine()
      })
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.model.items = val;
      this.selectSum()
    },
    // 取消选择
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    //   this.sum = "";
    // },
    
    // 根新数据
    async fetch() {
      const res = await this.$http.get("rest/budgets");
      this.tableData = res.data;
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确认要删除预算 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/budgets/${row._id}`); // eslint-disable-line no-unused-vars
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch()
      });
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
        this.$http.get('rest/budgets/get').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.count = res.result.list.length
          }
        })
        this.$http.get('rest/budgets/get', {
          params: param
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.tableData = res.result.list;
            // console.log(this.items)
            // for(var i=0;i<this.model.items;i++){
            //   if(this.model.items[i].qrcode){
            //     console.log()
            //   }
            // }
          } else {
            this.tableData = []
          }
        })
        
      },

// 表二：预算列表
    // 生成：预算记录
    async save() {
        await this.open
      let res; // eslint-disable-line no-unused-vars
      res = await this.$http.post("rest/budgetnote", this.model);
      // this.$router.push("/budgeselect");
      this.$message({
        type: "success",
        message: "创建成功",
      });
      this.fetchnote()
    },
    // 合计
    selectSum() {
      var sum = 0;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        sum +=
          this.multipleSelection[i].price;
      }
      this.model.sum = sum;
    },
     // 填写名字
     open() {
       if(this.multipleSelection==""){
         return
       }
        this.$prompt('请输入名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.model.notename = value
          this.save()
        })
        
      },
      // 获取当前日期
      getTime(){
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()+1;
        let dd = new Date().getDate();
        this.model.datetime = yy+'年'+mm+'月'+dd+'日 ';
      },

// 表三：预算记录
     // 预算记录:详情，数据展示
    async savefix(item) {
      this.dialogVisible = true;
      this.notemodel.notename = item.notename;
      this.notemodel.sum = item.sum;
      this.notemodel.datetime = item.datetime;
      this.notemodel.items = item.items;
      this.notemodel._id = item._id;
      this.$nextTick(() => {
        this.drawLine()
      })
      
    },
    // 删除一条记录
    async removenote() {
      this.$confirm(`是否确认要删除记录 "${this.notemodel.notename}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/budgetnote/${this.$route.params.id}`); // eslint-disable-line no-unused-vars
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.dialogVisible = false;
        this.fetchnote();
      });
    },
    // 更新记录
    async fetchnote() {
      const res = await this.$http.get("rest/budgetnote");
      this.noteitems = res.data;
    },
    // 删除记录里的某一项
    removenoteitem(row){
      this.$confirm(`是否确认要删除产品 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 删除的接口
        const res = await this.$http.put(`rest/budgetnote/${this.notemodel._id}/${row._id}`); // eslint-disable-line no-unused-vars
        // 重新获取数据
        this.notemodel = res.data;
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetchnoteitem()
        // this.fetchnote()
        if(this.notemodel.items==""){
          await this.$http.delete(`rest/budgetnote/${this.$route.params.id}`);
          this.dialogVisible = false;
          this.fetchnote();
        }
      });
    },
    //  更新某条记录里的items
    async fetchnoteitem() {
     
      await this.$http.get(`rest/budgetnote/${this.notemodel._id}`);
      // console.log(res.data)
      // this.notemodel.items = res.data.items;
    },
    // 修改
    async fixnote(){
      //  console.log(this.notemodel)
       var sum = 0
       var items = this.notemodel.items 
       for(var j =0;j<items.length;j++){
      sum +=parseInt(items[j].price)
    } 
    this.notemodel.sum = sum
    this.notemodel.datetime = this.getTime()
      await this.$http.put(`rest/budgetnotes/${this.id}`,this.notemodel);
      this.fetchnote();
    },
    budgetswidth(budgetnote,noteitem) {
      var j
       for (j=0; j<this.budgetnote.length; j++) {
        if (budgetnote[j].value === noteitem.value) {
            budgetnote[j].price += parseFloat(noteitem.price);
        }
       }
     },
     
    getnodeclass(noteitem){
      this.budgetnote.forEach(function (item) {
        item.price = 0
      })
    for(var i=0;i<noteitem.length;i++){
      switch(noteitem[i].value){
        case "家庭建材":
          this.budgetswidth(this.budgetnote,noteitem[i]);   
          break;
        case "油漆":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "五金水电":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "灯饰照明":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "厨房":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "卫浴":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "家具":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "家电":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "软装":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "设计费":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "监理费":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;
        case "人工费":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break; 
        case "辅助设施":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break; 
        case "其他":
        this.budgetswidth(this.budgetnote,noteitem[i]);
        break;   
        }

        }
      },
    getnodeclassvandp(){
    for(var i =0;i<this.budgetnote.length;i++){
      var value= this.budgetnote[i].value;
      var price = this.budgetnote[i].price;
      this.valueData[i] = value;
      this.priceData[i] = price;
    }
     },
  
  drawLine(){
    // setTimeout(function () {
      // // 新建一个promise对象
      // let myChart;
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      newPromise.then(() => {
        //	此dom为echarts图标展示dom
      let echarts = require("../../node_modules/echarts/lib/echarts")
      if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
              this.myChart.dispose();//销毁
            }
              this.myChart = echarts.init(document.getElementById('myChart'));
              // 绘制图表
          var option = {
             title: [{
        text: '预算各部分数据展示',
        subtext: '总预算 ' + this.notemodel.sum,
        left: '50%',
        textAlign: 'center'
    }], 
          xAxis: {
              type: 'category',
              data: this.valueData,
              axisLabel:{
                interval:0,
                rotate:90,
                margin:10

              }
          },
          yAxis: {
              type: 'value'
              
          },
          // 悬浮显示
           tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
          },
          series: [{
              data: this.priceData,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
              }
          }]
      };
      option && this.myChart.setOption(option);
      })
      //  console.log(this.$echarts)
        // 基于准备好的dom，初始化echarts实例
       
    // },)
       
    }
  },
  created() {
    this.fetch()
    this.fetchnote();
    this.getTime();
    this.fetchnoteitem();
  },
  mounted(){
    // this._initData ();
    this.$nextTick(function() {
    this.drawLine();
    })
  }
};
</script>

<style>

.budgetall {
  float: left;
  margin-left: 50px;
  width: 510px;
  
  /* margin-top: 15px; */
}
.budgetallTable{
  width: 500px;
  /* height:387px; */
  overflow: hidden;
  border: 1px rgb(145, 140, 140) solid;

}
.budgetall .el-table{
  margin: 0;
  
}
.el-table .cell{
  height: 30px;
  line-height: 30px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  float: left;
  width: 70px;
  height: 30px;
  line-height: 30px;
  color: #000;
}
.budgetselect .el-form-item {
  margin-bottom: 0px;
  width: 200px;
  float: left;
}
.el-form-item__content span {
  float: left;
  
  height: 30px;
  line-height: 30px;
}
.demo-table-expand .el-form- tableData {
  margin-right: 0;
  margin-bottom: 0;
}
.budgetselect .cell {
  height: 30px;
  text-align: center;
  line-height: 30px;
}

/*  */
.budgetlist {
  /* background-color: red; */
  float: left;
  width: 242px;
  border-radius: 5px;
  margin: 0px 40px;
}
.budgetlist .el-table{
  border: 1px rgb(145, 140, 140) solid;

}

/*  */
.bugetnote{
  width: 280px;
  float: left;
  
}
.bugetnotebox{
  background-color: #fff;
  border: 1px rgb(145, 140, 140) solid;
  border-radius: 5px;
  height:390px;
  overflow-y:auto;
  padding: 5px;

}
.dialog {
  margin-top: -80px;
}
.dialog .el-dialog__body{
  padding-top: 0;
}
</style>