<template>
  <div class="store">
    <el-table class="activity-table" height="calc(100% - 105px)" border :data="list">
      <el-table-column prop="name" label="商铺名称" align="center"></el-table-column>
      <el-table-column prop="dizhi" label="商铺地址" align="center"></el-table-column>
      <el-table-column prop="phoneName" label="联系人" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="image" label="店铺图片" align="center">
        <template slot-scope="scope" >
          <img v-bind:src="image" alt="店铺图片" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)" size="mini" >详情</el-button>
          <el-button type="text" @click="del(scope.row)" size="mini">删除</el-button>
        </template> 
      </el-table-column> 
    </el-table>
  </div>
</template>
<script>
import image from '../../../../static/images/logo.png'
import List from './list.js'
export default {
  data () {
    return {
      list:List.list,
      image:image,
      search:{
        
      }
    }
  }
}
</script>
<style long="less">
  .store {
    width: 100%;
    /* height: 200px; */
    /* background-color: red; */
  }
  .itemImage{
    height: 30px;
    vertical-align: middle;
  }
</style>


