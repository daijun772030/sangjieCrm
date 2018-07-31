<template>
  <div class="aptitude">
    <el-table class="activity-table"  border :data="list">
      <el-table-column prop="license" label="营业执照图片" align="center">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.license" alt="营业执照图片" @click="License(scope)" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column prop="idPositive" label="法人身份证正面" align="center">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.idPositive" alt="法人身份证正面" @click="IdPositive(scope)" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column prop="idSide" label="法人身份证背面" align="center">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.idSide" alt="身份证背面" @click="IdSide(scope)" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column prop="legalName" label="法人姓名" align="center"></el-table-column>
      <el-table-column prop="legalId" label="法人身份证号" align="center"></el-table-column>
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
      // idPositive:null,//法人正面照
      // idSide:null,//法人反面照
      // license:null,//营业执照
      DelogImage:null,//图片地址
       title:"图片详情",
      list:List.list,
       dialogTableVisible:false//对话框
    }
  },
  created () {
    this.$api("archives",{params:{pageNum:"1",pageSize:"10"}}).then((res)=>{
      // console.log(res.data.data.list)
      this.list = res.data.data.list

    })
  },
  methods:{
    close(pass){//弹窗消失
    pass.passText=null;
    pass.passVisible=false
    },
    IdPositive (scope) {
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.idPositive;
    },
    IdSide (scope) {
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.idSide;
    },  
    License (scope) {
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.license;
    },
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
  }
}
</script>
<style long="less">
  .aptitude {
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
</style>


