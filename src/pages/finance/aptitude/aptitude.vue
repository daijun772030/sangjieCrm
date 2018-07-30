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
      <!-- <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)" size="mini" >编辑</el-button>
          <el-button type="text" @click="del(scope.row)" size="mini">删除</el-button>
        </template> 
      </el-table-column>  -->
    </el-table>
    <el-dialog :modal-append-to-body="false" :title="title" :visible.sync="dialogTableVisible"  width="900px">
      <div class="imge">
        <img :src="'/test' + idPositive" alt="">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import List from './list.js'
export default {
  data () {
    return {
      idPositive:null,//法人正面照
      idSide:null,//法人反面照
      license:null,//营业执照
      DelogImage:null,//图片地址
       title:"图片详情",
      list:List.list,
       dialogTableVisible:false//对话框
    }
  },
  created () {
    this.$api("archives",{params:{pageNum:"1",pageSize:"10"}}).then((res)=>{
      console.log(res.data.data.list)
      this.list = res.data.data.list

    })
  },
  methods:{
    IdPositive (scope) {
      this.dialogTableVisible = true;
      this.idPositive = scope.row.idPositive;
    },
    IdSide (scope) {
      this.dialogTableVisible = true;
      this.idSide = scope.row.idSide;
    },
    
    License (scope) {
      this.dialogTableVisible = true;
      this.license = scope.row.license;
    }
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


