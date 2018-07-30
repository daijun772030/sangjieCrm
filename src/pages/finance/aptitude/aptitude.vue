<template>
  <div class="aptitude">
    <el-table class="activity-table" height="calc(100% - 105px)" border :data="list">
      <el-table-column prop="dis" label="营业执照图片" align="center"></el-table-column>
      <el-table-column prop="full" label="法人身份证正面" align="center"></el-table-column>
      <el-table-column prop="reduce" label="法人身份证背面" align="center"></el-table-column>
      <el-table-column prop="name" label="法人姓名" align="center"></el-table-column>
      <el-table-column prop="createTime" label="法人身份证号" align="center"></el-table-column>
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

    }
  }
}
</script>
<style long="less">

</style>


