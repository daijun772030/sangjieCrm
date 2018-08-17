<template>
  <div class="deliver">
    <el-form :inline="true" :model="seachObject" label-width="5px" size="mini"  class="searchForm">
      <el-form-item class="float_left">
          <el-input v-model="seachObject.input" placeholder="搜索" clearable prefix-icon="el-icon-search" style="width:217px"></el-input>
      </el-form-item>
      <el-form-item class="float_left">
          <el-date-picker v-model="seachObject.starDate" type="date" clearable placeholder="起始日期"  class="wd"></el-date-picker>
      </el-form-item>
      <el-form-item class="float_left">
          <el-date-picker v-model="seachObject.endDate" type="date" clearable placeholder="结束日期"  class="wd"></el-date-picker>
      </el-form-item>
      <el-form-item class="float_left">
          <el-select v-model="seachObject.money" placeholder="金额区间" clearable>
              <!-- <el-option >
              </el-option> -->
          </el-select>
      </el-form-item >
      <el-form-item class="float_left">
          <el-select v-model="seachObject.state" placeholder="状态" clearable>
              <!-- <el-option >
              </el-option> -->
          </el-select>
      </el-form-item>
      <el-form-item class="float_left">
          <el-button @click="earchForm" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      empty-text="没有新东西"
      v-loading="loading" 
      :default-sort = "{prop: 'condition', order: 'descending'}"
      element-loading-text="加载中..."
      style="
      height: calc(100% -60px)"
      class="home-table">
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
            @click="handleEdit(scope)">发货</el-button>
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
    handleEdit (scope) {//发货操作
      console.log(scope)
    },
    earchForm () {//搜索按钮事件
      console.log("这是搜索按钮")
    }
  }
}
</script>
<style lang="less" scoped>
    .deliver{
      width: 100%;
      height:100%;
      text-align: center;
      color: black;
      color: rgba(0, 0, 0, 0.349)
    }
    .searchForm{
        padding: 10px;

    }
    .searchForm1{
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        align-items: center;
    }
</style>
<style lang="less">
  
</style>


