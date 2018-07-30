<template>
  <div class="store">
    <el-table class="activity-table" border :data="list">
      <el-table-column prop="shopName" label="商铺名称" align="center" class="colum"></el-table-column>
      <el-table-column prop="address" label="商铺地址" align="center" class="colum"></el-table-column>
      <el-table-column prop="contact" label="联系人" align="center" class="colum"></el-table-column>
      <el-table-column prop="contactPhone" label="联系电话" align="center" class="colum"></el-table-column>
      <el-table-column prop="logo" label="店铺图片" align="center" class="colum">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.logo" alt="店铺图片" @click="image(scope)" class="itemImage">
          <!-- <button type="text" class="button" >大图</button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :modal-append-to-body="false" :title="title" :visible.sync="dialogTableVisible"  width="900px">
      <div class="imge">
        <img :src="'/test' + DelogImage" alt="">
      </div>
    </el-dialog>
    <!-- <div class="pageination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchObj.pageNum"
        :page-sizes="[10, 15, 20, 35]"
        :page-size="searchObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchObj.totalCount">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import List from './list.js'
export default {
  data () {
    return {
      DelogImage:null,
      title:"店铺图片详情",
      list:List.list,
      searchObj:{
        pageSzie:10,
        pageNum:1,
        total:20
      },
      dialogTableVisible:false//对话框
    }
  },
  created () {
    this.$api("archives",{params:{pageNum:"1",pageSize:"10"}}).then((res)=>{
      console.log(res.data.data.list)
      this.list = res.data.data.list
    })
  },
  methods: {
    //弹窗图片展示：
    image(scope) {
      console.log(scope.row)
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.logo
      console.log(this.DelogImage)
    },
    handleSizeChange (val) {
      console.log(val)
    }
  },
  handleCurrentChange (val) {
    console.log(val)
  }

}
</script>
<style long="less">
  .store {
     width: 100%;
    height:100%;
    text-align: center;
    color: black;
    color: rgba(0, 0, 0, 0.349)
  }
  .imge{
    width: 80%;
    /* height: 400px; */
    margin: 0 auto;
    /* border: 1px solid red; */
  }
  .itemImage{
    height: 50px;
    vertical-align: middle;
  }
  .imge img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%; 
  }
  .button{
    margin: 0 auto;
  }
</style>
<style>
</style>



