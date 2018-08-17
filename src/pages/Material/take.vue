<template>
  <div class="take">
    <el-table
            :data="list"
            empty-text="没有新东西"
            v-loading="loading" 
            :default-sort = "{prop: 'condition', order: 'descending'}"
            element-loading-text="加载中..."
            style="
            height: calc(100% -105px)"
            class="take-table">
            <el-table-column prop="orderNum" align="center" label="订单号"></el-table-column>
            <el-table-column prop="commodityName"  align="center" label="商品名称"></el-table-column>
            <el-table-column prop="address" align="center" label="客户地址"></el-table-column>
            <el-table-column prop="phone" align="center" label="客户电话"></el-table-column>
            <el-table-column prop="startTime" align="center" label="取件时间"></el-table-column>
            <el-table-column prop="endTime" align="center" label="送件时间"></el-table-column>
            <el-table-column prop="status" align="center" label="支付状况">
                <template slot-scope="scope"> 
                <span v-if="scope.row.status==0">未支付</span>
                <span v-if="scope.row.status==1">支付失败</span>
                <span v-if="scope.row.status==2">支付成功</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
            <el-table-column prop="remark" align="center" label="客户备注"></el-table-column>
            <el-table-column
             align="center"
             width="200px"
             label="操作">
            <template slot-scope="scope" width="80%">
                <el-button
                size="mini"
                @click="handleEdit(scope)">接单</el-button>
            </template>
            </el-table-column>
        </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading:false,
      list:null,
      seachObject:{
        input:'',
        starDate: '',
        endDate: '',
        money: '',
        state: '',
        region: ''
      },
    }
  },
  created () {

  },
  methods: {
    earchForm() {//搜索框提交
      console.log("这是搜索框")
    }
  },

}
</script>
<style lang="less" scoped>
  .take {
    width: 100%;
    height: 100%;
    text-align: center;
  }
</style>
<style class="less">
  .take-table {
    width: 100%;
    height: calc(100% - 60px)
  }
</style>


