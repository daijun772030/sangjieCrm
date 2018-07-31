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
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)" size="mini" >通过</el-button>
          <el-button type="text" @click="del(scope.row)" size="mini">不通过</el-button>
        </template> 
      </el-table-column>
    </el-table>
    <el-dialog :modal-append-to-body="false" :title="title" :visible.sync="pass.passVisible"  width="300px" @close="close(pass)">
      <el-form :inline="false" :model='pass' ref="pass"  class="searchForm">
        <el-form-item label="不通过原因：" prop="passText">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入不通过的原因内容"
            v-model="pass.passText">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updata">确认</el-button>
      </span>
    </el-dialog>
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
      pass:{
        id:null,
        passText:null,
        passVisible:false
      },
      DelogImage:null,//大图展示图片
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
    this.$api("archives",{params:{pageNum:"1",pageSize:"10"}}).then((res)=>{//查询所有资质
      // console.log(res.data.data.list)
      this.list = res.data.data.list
    })
  },
  methods: {
    close(pass){//弹窗消失
    pass.passText=null;
    pass.passVisible=false
    },
    //通过认证
    remove(scope) {
      this.pass.id= scope.id
      this.$api('upArchives',{status:'1',remark:"已通过",id:this.pass.id}).then((res)=>{
        if(res.data.retCode==200) {
          this.$message({
            message:"审核通过了",
            type: "success"
          })
        }
        // console.log('已经通过')
      })
    },
    //未通过认证
    del(scope) {
      this.pass.id = scope.id
      this.pass.passVisible = true;
        this.title="审核不通过原因"
    },
    updata(){
      this.$api("upArchives",{status:'2', remark:this.pass.passText, id:this.pass.id}).then((res)=>{
        if(res.data.retCode==200){
          this.$message.error("审核未通过")
        }
        // console.log("未通过")
      })
    },
    //弹窗图片展示：
    image(scope) {
      // console.log(scope.row)
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



