<template>
  <div class="upshop">
    <el-form :inline="true" :model="searchObj" label-width="5px" size="mini"  class="searchForm">
      <el-form-item class="float_left">
        <el-select v-model="searchObj.productType" placeholder="商品类型" @change="changeValue" clearable>
          <el-option v-for="channel in productTypes" :key="channel.id" :label="channel.name" :value="channel.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="float_left">
          <el-button @click="earchForm" type="primary">确定</el-button>
      </el-form-item>
      <el-form-item class="float_right">
        <el-button type="primary" @click="add">添加商品</el-button>
      </el-form-item>
    </el-form>
    <el-table class="goods-table" height="calc(100% - 105px)" border :data="list1">
      <el-table-column prop="name" label="商品名称" align="center" ></el-table-column>
      <el-table-column prop="upName" label="商品类型" align="center"></el-table-column>
      <el-table-column prop="img" label="商品logo" align="center"></el-table-column>
      <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="edit(scope)">编辑</el-button>
          <el-button @click="deleShop(scope.row)" type="text" size="mini">删除</el-button>
        </template>  
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      productTypes:[],
      list1:null,
      searchObj: {//搜索框和页脚的内容
        createDay: null,
        searchContent: null,
        sortField: null,
        sortOrder: null,
        updateDay: null,
        topicalName: null,
        channelId: null,
        productType: null,
        pageNum: 1,
        pageSize: 10,
        totalCount:0
      },
    }
  },
  created () {

  },
  methods: {
    add(){//添加商品函数啊
      console.log('添加商品')
    },
    earchForm() {
      console.log('搜索商品')
    },
    edit(scope) {//编辑商品
      console.log(scope)
    },
    deleShop(scope) {//删除商品
      console.log(scope)
    },
    changeValue(value) {//这里获取搜索框id
    }
  }
}
</script>
<style lang="less" scoped>
  .upshop {
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


