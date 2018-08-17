<template>
  <div class="activity">
    <el-form :inline="true" :model="countForm" label-width="5px" size="mini" class="searchForm">
      <el-form-item class="float_left">
        <el-select v-model="countForm.id" placeholder="优惠活动类型" clearable>
          <!-- <el-option v-for="item in list" :label="item.type" :key="item.type"  :value="item.merchantid">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">满减优惠</span>
              <span v-if="scope.row.type == 0">打折优惠</span>
            </template>
          </el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item class="float_left">
          <el-button @click="reachForm" type="primary">确定</el-button>
      </el-form-item>
      <el-form-item class="float_right">
        <el-button type="primary" @click="addCountDZ">新增打折优惠</el-button>
      </el-form-item>
      <el-form-item class="float_right">
        <el-button type="primary" @click="addCountMJ">新增满减优惠</el-button>
      </el-form-item>
    </el-form>
    <el-table class="activity-table" height="calc(100% - 105px)" border :data="list">
      <el-table-column prop="type" label="活动种类" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type=== 1 ">满减优惠</span>
          <span v-if="scope.row.type=== 0 ">打折优惠</span>
        </template>
      </el-table-column>
      <el-table-column prop="dis" label="折扣(单个商品)" align="center"></el-table-column>
      <el-table-column prop="full" label="满 (满减优惠所有商品)" align="center"></el-table-column>
      <el-table-column prop="reduce" label="减 (满减优惠所有商品)" align="center"></el-table-column>
      <el-table-column prop="name" label="折扣商品" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)" size="mini" >编辑</el-button>
          <el-button type="text" @click="del(scope.row)" size="mini">删除</el-button>
        </template> 
      </el-table-column> 
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list:null,//数据列表展示
      countForm:{
        id:null,
        name:null
      }
    }
  },
  created () {

  },
  methods: {
    reachForm() {//搜索框函数
      console.log('搜索框按钮')
    },
    addCountDZ () {//打折优惠活动活动
      console.log('打折优惠活动')
    },
    addCountMJ() {//满减优惠活动
      console.log('满减优惠活动')
    },
    remove(scope) {//编辑活动函数
      console.log(scope)
    },
    del (scope) {//删除活动函数
      console.log(scope)
    }
  }
}
</script>
<style lang="less" scoped>
  .activity {
    width: 100%;
    height:100%;
    text-align: center;
    color: black;
    color: rgba(0, 0, 0, 0.349)
  }
  .searchForm{
    padding: 10px;
  }
</style>
<style>

</style>


