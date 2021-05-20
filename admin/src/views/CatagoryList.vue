<template>
  <div>
    列表
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        items:[]
      }
    },
    methods:{
      // 根新数据
      async fetch(){
        const res = await this.$http.get('rest/categories')
        console.log(res)
        this.items = res.data
      },
      async remove(row){
        this.$confirm(`是否确认要删除分类 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async() => {
          // 删除的接口
          const res = await this.$http.delete(`rest/categories/${row._id}`)// eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 重新获取数据
          this.fetch()
        })
    },
    
    },
    created(){
        this.fetch();
        
      }
  }
</script>

