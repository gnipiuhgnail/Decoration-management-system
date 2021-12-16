<template>
  <div class="background" style="height:180vh">
    <div style="width: 100%;text-align:center">
      <h1 style="display: inline-block; font-size: 20px; margin: 10px 0 5px;padding: 5px;">
        消费统计
      </h1>
    </div>
    <hr>
    <div style="width:100%;height:500px;">
      
      <div class="eachcost">
      <div style="height:70px;">
        <h6 style=" font-size: 16px; margin: 10px;padding: 5px;text-align:center">总消费</h6>
        <div>
          <span style="float:left;">数据展示形式：</span>
        <button @click="costOnClick($event),drawPic()" class="costdiv" style="background-color:rgb(84, 112, 198)">饼图</button>
        <button @click="costOnClick($event),drawPicT()" class="costdiv" style="background-color:rgb(115, 192, 222)">柱状图</button>
        </div>
      </div>
      <div v-if="this.isshow==true" style="border:1px black solid;width:510px;height:410px">
        <div id="eachCostChart" :style="{width: '500px', height: '400px'}" style="margin:30px 0"></div>
      </div>
      <div v-else  style="border:1px black solid;width:410px;height:410px">
        <div id="eachCostChartSecond" :style="{width: '400px', height: '400px'}" style="margin:10px 20px"></div>
        </div>
      </div>
    <div class="eachclasscost">
        <h6 style=" font-size: 16px; margin: 10px;padding: 5px;text-align:center">每个类别的消费</h6>
    <span>请选择查看的类型：</span>
    <el-select v-model="status" style="width:105px;height:40px;text-align:center;" placeholder="请选择" @change="currentSel">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
      <div style="border:1px black solid;width:410px;height:410px;">
        <div id="eachClassChart" :style="{width: '400px', height: '400px'}" style="margin:30px 0"></div>
      </div>
    </div>
    </div>
    <div style="width:100%;height:600px;margin-top:20px">
      <div class="costandbudget">
       <template>
       <div style="width:240px;padding:0;height:80px">
        <h6 style=" font-size: 16px; margin: 10px;padding: 5px;text-align:center">预算方案列表</h6>

         <el-input
        v-model="search"
        placeholder="输入方案名"
        size="small" 
        class="listinput"
        style="width:90px;height: 25px; border-radius:0;float: left;"
      />
      <el-button type="primary" icon="el-icon-search"
       style="width:60px;height: 30px;line-height:30px;text-align:center;
       margin: 0;padding:0;float:left;border-radius:0;border:1px solid #fac858; 
       background-color: #fac858;font-size:12px"
       @click="find()"
       >搜索</el-button>
       
       <el-button type="primary"
       style="width:60px;height: 30px;line-height:30px;text-align:center;
       margin: 0;padding:0;float:left;border-radius:0;font-size:12px;border:1px solid #ee6666; background-color: #ee6666"
       @click="getBudgetData()">查看全部</el-button>
      </div>
    </template>
      <div class="list">
        <!-- <h6 style="margin:0;padding:0;text-align:center">预算方案</h6> -->
        <div style=" height:380px;overflow-y:auto;width:215px">
          <el-radio-group v-model="radio"  style="font-size:12px" @change="radioChose()">
          <div v-for="(budget,index) in this.budgetmodel" :key="budget.classId" class="text item">
          <div style="width:60%;float: left;">
            <p style="display: inline-block;margin: 0;  font-size: 10px;width: 100%;">{{ budget.notename}}</p>
            <p style="margin: 4px 0; font-size: 10px;">总预算：{{ budget.sum}}元</p>
          </div>
          <div style="width:40%;float:left;height: 28px;line-height:28px">
            <el-radio :label=index>选择</el-radio>
          </div>
          <hr style="border:0.25px rgb(217, 223, 232) solid;width: 180px;margin-right:30px">
            
        
      </div>
        </el-radio-group>
        </div>
      </div>
    </div>
    <div class="candbshow">
      <div style="height:80px;margin: 9px 20px;">
        <h6 style=" font-size: 16px; margin: 15px;padding: 5px;text-align:center">预算与消费对比</h6>
        <span style="float:left;">数据展示形式：</span>
        <button @click="candbOnClick($event),drawPie()" class="costdiv" style="background-color:rgb(59, 162, 114);float: left;">柱状图</button>
        <button @click="candbOnClick($event),getClassData()" class="costdiv" style="background-color:rgb(145, 204, 117);float: left;">表格</button>
      </div >
      <div v-if="this.candbisshow==true" style="border:1px black solid;width:700px;height:560px;float: right;">
        <div id="eachCAndBChart" :style="{width: '700px', height: '550px'}"></div>
      </div>
      <div v-else  style="border:1px black solid;width:700px;float: right;">
        <div style="text-align:center;margin-top:10px"><span>总消费: {{this.costsum}}</span>  <span style="margin:0 20px">总预算：{{this.budgetSum}}</span>  <span >剩余：{{(this.budgetSum-this.costsum)}}</span> </div>
        <div>
          <template>
            <el-table
              :data="getTableData"
              border
              style="width: 100%">
              <el-table-column
                prop="type"
                label="类型"
                width="180">
              </el-table-column>
              <el-table-column
                prop="budget"
                label="预算"
                width="180">
              </el-table-column>
              <el-table-column
                prop="cost"
                label="消费"
                width="180">
              </el-table-column>
              <el-table-column
                prop="surplus"
                label="预算剩余">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
    </div>

    
  </div>
</template>

<script>
export default {
  data(){
    return{
      isshow:true,
      candbisshow:true,
      status:"家庭建材",
      options: [
        {
          value: "家庭建材",
          label: "家庭建材"
        },
        {
          value: "油漆",
          label: "油漆"
        },
        {
          value: "五金水电",
          label: "五金水电"
        },
        {
          value: "灯饰照明",
          label: "灯饰照明",
        },
        {
          value: "厨房",
          label: "厨房",
        },
        {
          value: "卫浴",
          label: "卫浴",
        },
        {
          value: "家具",
          label: "家具",
        },
        {
          value: "家电",
          label: "家电",
        },
        {
          value: "软装",
          label: "软装",
        },
        {
          value: "设计费",
          label: "设计费",
        },
        {
          value: "监理费",
          label: "监理费",
        },
        {
          value: "人工费",
          label: "人工费",
        },
        {
          value: "辅助设施",
          label: "辅助设施",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      // cost:所有的花费
      costmodel:[],
      costsum:0,
      //  获取每个分类
      costitems: [
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
      costitemsjson: [
        {
          name: "家庭建材",
          value:0
        },
        {
          name: "油漆",
          value:0
        },
        {
          name: "五金水电",
          value:0
        },
        {
          name: "灯饰照明",
          value:0
        },
        {
          name: "厨房",
          value:0
        },
        {
          name: "卫浴",
          value:0
        },
        {
          name: "家具",
          value:0
        },
        {
          name: "家电",
          value:0
        },
        {
          name: "软装",
          value:0
        },
        {
          name: "设计费",
          value:0
        },
        {
          name: "监理费",
          value:0
        },
        {
          name: "人工费",
          value:0
        },
        {
          name: "辅助设施",
          value:0
        },
        {
          name: "其他",
          value:0
        },
        
      ],
      //  获取每个分类的总值
      costPriceData:[],
      costvalueData:[],
      classCostData:[],
      myChart:"",
      mySecondChart:"",
      myThirdChart:"",
       // budget:所有的预算方案
      budgetmodel:[],
      classSum:"",
      budgetPriceData:[],
      surplus:[],
      priceData:[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      valueData:["家庭建材","油漆","五金水电","灯饰照明","厨房",
           "卫浴","家具","家电","软装","设计费","监理费","人工费",
          "辅助设施","其他"],
      // options:[],
      searchitems:[],
      search:"",
      radio: 0,
      getTableData:[],
      budgetSum:""
    }
  },
  methods:{
    async getCostData(){
      const costres = await this.$http.get("rest/cost");
      this.costmodel = costres.data;
      for(var i=0;i<this.costmodel.length;i++){
        this.costitemsjson[i].value = this.costitems[i].price
        console.log(this.costitemsjson[i].value)
      }
      this.getcostclass();
      this.drawPic();
      this.currentSel();
      
      this.drawClass(this.status)
      
      // this.getClassCostData(status);
      // this.drawPicT()
    },
    async getBudgetData(){
      const budgetres = await this.$http.get("rest/budgetnote");
      this.budgetmodel = budgetres.data;  
      this.fetch()
    },
    itemswidth(model,item) {
      var j
       for (j=0; j<item.length; j++) {
        if (model.value == item[j].value) {
             item[j].price += parseFloat(model.thissum);
        }
       }
     },
    //  获取每个分类的总值
    getcostclass(){
      let model = this.costmodel;
      let items = this.costitems;
      items.forEach(function (item) {
        item.price = 0
      })
      for(var i=0;i<model.length;i++){
        switch(model[i].value){
          case "家庭建材":
            this.itemswidth(model[i],items);   
            break;
          case "油漆":
            this.itemswidth(model[i],items); 
          break;
          case "五金水电":
            this.itemswidth(model[i],items);
          break;
          case "灯饰照明":
            this.itemswidth(model[i],items);
          break;
          case "厨房":
            this.itemswidth(model[i],items);
          break;
          case "卫浴":
            this.itemswidth(model[i],items);
          break;
          case "家具":
            this.itemswidth(model[i],items);
          break;
          case "家电":
            this.itemswidth(model[i],items);
          break;
          case "软装":
            this.itemswidth(model[i],items);
          break;
          case "设计费":
            this.itemswidth(model[i],items);
          break;
          case "监理费":
            this.itemswidth(model[i],items);
          break;
          case "人工费":
            this.itemswidth(model[i],items);
          break; 
          case "辅助设施":
            this.itemswidth(model[i],items);
          break; 
          case "其他":
            this.itemswidth(model[i],items);
          break;   
          }
        }
        this.getcostclassvandp()
      },
    getcostclassvandp(){
    for(var i =0;i<this.costitems.length;i++){
      var itemvalue= this.costitems[i].value;
      var itemprice = this.costitems[i].price;
      this.costvalueData[i] = itemvalue;
      this.costPriceData[i] = itemprice;
    }
     },
     drawPic(){
       
       let newPromise = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      newPromise.then(() => {
      let echarts = require("../../node_modules/echarts/lib/echarts")
       if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
        this.myChart.dispose();//销毁
      }
      
      this.myChart = echarts.init(document.getElementById('eachCostChart'));
      for(var i=0;i<this.costmodel.length;i++){
        this.costitemsjson[i].value = this.costitems[i].price;
        this.costsum += this.costitemsjson[i].value
        console.log()
      }
      var option;
      option = {
          title: {
              text: '各个类别的消费',
              subtext: '总消费：'+this.costsum,
              left: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              orient: 'vertical',
              left: 'right',
          },
          series: [
              {
                  name: '各类别消费',
                  type: 'pie',
                  radius: '40%',
                  
                  data:this.costitemsjson,
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
      option && this.myChart.setOption(option);
      })
     },
     drawPicT(){
       let newPromise = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      newPromise.then(() => {
        let echarts = require("../../node_modules/echarts/lib/echarts")
        if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
              this.myChart.dispose();//销毁
            }
        this.myChart = echarts.init(document.getElementById('eachCostChartSecond'));
        var option;
        option = {
           title: {
              text: '各个类别的消费',
              subtext: '总消费：'+this.costsum,
              left: 'center'
          },
           xAxis: {
               type: 'category',
               data: this.costvalueData,
               axisLabel:{
                interval:0,
                rotate:270,
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
               data: this.costPriceData,
               type: 'bar',
               backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
              },
               itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = ['#5470c6', '#91cc75','#fac858','#ee6666','#73c0de',
                                '#3ba272','#fc8452','#9a60b4','#ea7ccc','#f55066','#c17e61'];
                                var index=params.dataIndex%colorList.length;
                                return colorList[index]
                            }
                        }
                    },
           }]
          };
        option && this.myChart.setOption(option);
      })
     },
     costOnClick(event){
           //获取点击对象      
           var el = event.currentTarget;
           var btn = el.innerHTML;
        if(btn == "饼图"){
          this.isshow = true
        }else{
          this.isshow = false
        }
     },
    currentSel(){
    switch(this.status){
          case "家庭建材":
            // 获取数据
            // 赋值
            // 调用echart
            this.getClassCostData(this.status);
            break;
          case "油漆":
            this.getClassCostData(this.status);
          break;
          case "五金水电":
            this.getClassCostData(this.status);
          break;
          case "灯饰照明":
            this.getClassCostData(this.status);
          break;
          case "厨房":
            this.getClassCostData(this.status);
          break;
          case "卫浴":
            this.getClassCostData(this.status);
          break;
          case "家具":
            this.getClassCostData(this.status);
          break;
          case "家电":
            this.getClassCostData(this.status);
          break;
          case "软装":
            this.getClassCostData(this.status);
          break;
          case "设计费":
            this.getClassCostData(this.status);
          break;
          case "监理费":
            this.getClassCostData(this.status);
          break;
          case "人工费":
            this.getClassCostData(this.status);
          break; 
          case "辅助设施":
            this.getClassCostData(this.status);
          break; 
          case "其他":
            this.getClassCostData(this.status);
          break;   
          }
      this.drawClass(this.status)
    
    },
    getClassCostData(cost){
      this.classCostData = []
       for(var i = 0;i<this.costmodel.length;i++){
         if(this.costmodel[i].value == cost){
         var obj = {name:this.costmodel[i].name,value:this.costmodel[i].thissum}
           this.classCostData.push(obj);
         }
       }
       this.classSum = 0;
       for(var j = 0;j<this.classCostData.length;j++){
         this.classSum +=parseFloat(this.classCostData[j].value) 
       }
      
    },
    drawClass(name){
       let newPromise = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      newPromise.then(() => {
        let echarts = require("../../node_modules/echarts/lib/echarts")
        if (this.myThirdChart != null && this.myThirdChart != "" && this.myThirdChart != undefined) {
              this.myThirdChart.dispose();//销毁
            }
        this.myThirdChart = echarts.init(document.getElementById('eachClassChart'));
        var option;
        option = {
          title: {
              text: name+'类消费详情',
              subtext: name+'的消费：'+this.classSum,
              left: 'center'
          },
          
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                 x: 'right', // 'center' | 'left' | {number},
                  y: 'top', // 'center' | 'bottom' | {number}
                
            },
            series: [
                {
                    name: name+'类消费详情:',
                    type: 'pie',
                    radius: ['30%', '60%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: this.classCostData
                }
            ]
        };
        option && this.myThirdChart.setOption(option);
      })
     },
      radioChose(){
          this.fetch();
      },
      fetch(){
        for(var j = 0 ; j <this.priceData[j];j++){
          this.priceData[j]=0
        }
        var items = this.budgetmodel[this.radio].items
        for(var i=0;i<items.length;i++){
          switch(items[i].value){
            case "家庭建材":
              this.budgetswidth(items[i]);  
              break;
            case "油漆":
            this.budgetswidth(items[i]);
            break;
            case "五金水电":
            this.budgetswidth(items[i]);
            break;
            case "灯饰照明":
            this.budgetswidth(items[i]);
            break;
            case "厨房":
            this.budgetswidth(items[i]);
            break;
            case "卫浴":
            this.budgetswidth(items[i]);
            break;
            case "家具":
            this.budgetswidth(items[i]);
            break;
            case "家电":
            this.budgetswidth(items[i]);
            break;
            case "软装":
            this.budgetswidth(items[i]);
            break;
            case "设计费":
            this.budgetswidth(items[i]);
            break;
            case "监理费":
            this.budgetswidth(items[i]);
            break;
            case "人工费":
            this.budgetswidth(items[i]);
            break; 
            case "辅助设施":
            this.budgetswidth(items[i]);
            break; 
            case "其他":
            this.budgetswidth(items[i]);
            break;   
          }
        }
        this.budgetPriceData = this.priceData
        
        
        this.drawPie();
        this.getClassData();
      },
      budgetswidth(items) {
       for (var j=0; j<this.valueData.length; j++) {
        if (this.valueData[j] == items.value) {
          this.priceData[j] = this.priceData[j]+parseFloat(items.price);
        }
       }
     },
    //  第二个
     // 查找数据
    async find(){
        const message = await this.$http.get("rest/budgetnote/notefind/"+this.search); // eslint-disable-line no-unused-vars
        this.budgetmodel = message.data;
    },
    candbOnClick(event){
          //获取点击对象      
        var el = event.currentTarget;
        var btn = el.innerHTML;
        if(btn == "柱状图"){
          this.candbisshow = true
        }else{
          this.candbisshow = false
        }
    },
    getSurplus(){
      for(var i=0;i<14;i++){
        this.surplus[i]=this.budgetPriceData[i]-this.costPriceData[i]
      }
    },
    drawPie(){
      this.getSurplus()
       let newPromise = new Promise((resolve) => {
        resolve()
      })
      newPromise.then(() => {
        let echarts = require("../../node_modules/echarts/lib/echarts")
        if (this.mySecondChart != null && this.mySecondChart != "" && this.mySecondChart != undefined) {
              this.mySecondChart.dispose();
            }
        this.mySecondChart = echarts.init(document.getElementById('eachCAndBChart'));
        var option;
        // 图表的相关参数
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title: {
              text: '消费使用情况',
              subtext: '消费：'+this.costsum+"   "+'预算：'+this.budgetSum + '预算剩余：'+(this.budgetSum-this.costsum),
              left: 'center',
              top:'1'
              
          },
            legend: {
                data: ['预算剩余', '消费', '预算'],
                top:'10',
                left:'right'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    data: this.valueData,
                    axisLabel:{
                interval:0,
                rotate:270,
                margin:10
              }
                }
            ],
            yAxis: [
              {
                    type: 'value'
                }
                
            ],
            series: [
        {
            name: '预算剩余',
            type: 'bar',
            barWidth:"20%",
            emphasis: {
                focus: 'series'
            },
            data: this.surplus
        },
        {
            name: '预算',
            type: 'bar',
            barWidth:"20%",
            emphasis: {
                focus: 'series'
            },
            data: this.budgetPriceData
        },
        {
            name: '消费',
            type: 'bar',
            barWidth:"20%",
            emphasis: {
                focus: 'series'
            },
            data: this.costPriceData
        }
            ]
        };
        option && this.mySecondChart.setOption(option);
      })
    },
    // 获取数据单选按钮
    getClassData(){
      if (this.mySecondChart != null && this.mySecondChart != "" && this.mySecondChart != undefined) {
              this.mySecondChart.dispose();//销毁
            }
      this.budgetmodel[this.radio].items
      this.getTableData=[]
      for(var i = 0;i<this.budgetPriceData.length;i++){
        var obj = {type:this.valueData[i],budget:this.budgetPriceData[i],cost:this.costPriceData[i],surplus:this.surplus[i]}
           this.getTableData.push(obj);
      }
      this.budgetSum = this.budgetmodel[this.radio].sum
    }
    
  },
  created() {
    // 需要加括号才算执行
    this.getCostData();
    this.getBudgetData();
  }
}
</script>

<style>
.costdiv{
  width: 60px;
  height: 25px;
  line-height: 20px;
  text-align: center;
  float: left;
  border:0;
  border-radius: 5px;
}
.eachcost{
  float: left;
  width: 420px;
  height: 500px;
  margin: 10px 150px;
}
.eachclasscost{
  width: 400px;
  height: 400px;
  float: left;
}
.eachclasscost .el-input{
  height: 30px;
  
}
.eachclasscost .el-input__inner{
  padding:0;
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: black;
  background-color: #c472eb;
  
}

.costandbudget{
  width: 200px;
  height: 600px;
  float: left;
  margin: 10px 60px 10px 150px;
  float: left;
}
.list{
  width: 190px;
  border:1px black solid;
  height: 370px;
  padding: 10px;
  margin-top:2px;
  overflow: hidden;
}
.listinput .el-input{
  width: 100px;
  height: 30px;
  border-radius: 4px 0 0 4px;
}
.listinput .el-input__inner{
  font-size: 12px;
  width: 100px;
  height: 30px;
}
.listinput .el-input__inner{
  border-radius: 0;
}
.list .el-radio__label{
  font-size: 12px;
}
.list .el-radio__inner{
  width: 12px;
  height: 12px;
  font-size: 12px;
}
.list .el-radio__input .is-checked{
  width: 12px;
  height: 12px;
}
.candbshow{
  float: left;
  width: 720px;
  height: 500px;
}
</style>