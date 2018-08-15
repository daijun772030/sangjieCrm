<template>
  <div class="examine">
    <el-form :inline="true" :model="formObj" label-width="5px" size="small" class="searchForm">
      <el-form-item class="float_left">
        <el-select v-model="formObj.id" placeholder="发帖类型" clearable>
          <el-option v-for="item in ExamineObj" :label="item.name" :key="item.id"  :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="float_left">
        <el-input
          placeholder="请输入内容"
          v-model="formObj.textName"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item class="float_left">
          <el-button @click="formChange" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
    <el-table class="inner"  height="calc(100% - 140px)" border :data="list">
      <el-table-column prop="type" label="帖子类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type==0">求助帖</span>
          <span v-if="scope.row.type==1">经验帖</span>
          <span v-if="scope.row.type==2">出售帖</span>
          <span v-if="scope.row.type==3">求购帖</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="帖子标题" align="center"></el-table-column>
      <el-table-column prop="messageText" label="帖子文字内容" align="center"></el-table-column>
      <el-table-column prop="img" label="帖子图片内容" align="center">
        <template slot-scope="scope">
          <img v-bind:src="'/test' + item" alt="帖子图片详情" class="itemImage" v-for="(item,index) in scope.row.img" :key="index" @click="image(scope)">
        </template>
      </el-table-column>
      <el-table-column prop="volume" label="浏览量" align="center"></el-table-column>
      <el-table-column prop="comNumber" label="帖子评论数量" align="center"></el-table-column>
      <el-table-column prop="thingNumber" label="获赞数量" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)" size="mini" >删除</el-button>
        </template> 
      </el-table-column>
    </el-table>
    <el-dialog :modal-append-to-body="false" :title="title" :visible.sync="dialogTableVisible"  width="900px">
      <div class="imge">
        <img :src="'/test' + item" alt="" v-for="(item,index) in img" :key="index">
      </div>
    </el-dialog>
    <div class="pageination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchObj.pageNum"
        :page-sizes="[10, 15, 20, 35]"
        :page-size="searchObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchObj.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import ExamineObj from './examine1.js'
export default {
  data () {
    return {
      arrObj:[],
      formObj:{
        id:null,
        name:null,
        textName:null
      },
      ExamineObj:ExamineObj.list,
      title:"查看图片",
      dialogTableVisible:false,
      list:null,//这是boss圈数据内容
      img:[],
      messageid:null,
      searchObj:{
        pageSize:10,
        pageNum:1,
        totalCount:0
      },
    }
  },
  created () {
    this.query();
    setInterval(() => {
      this.query()
      this.arrObj.push(this.searchObj.totalCount)
      var length = this.arrObj.length;
      if(length>=3) {
          this.arrObj.splice(0, 1)
          console.log(length)
        }
        if(this.arrObj.length>=2) {
          // debugger;
        if(length>1) {
        if(this.arrObj[length-1] - this.arrObj[length-2] ==0) {
        console.log("不做改变")
      }else if(this.arrObj[length-1] - this.arrObj[length-2] !==0){
        console.log("这是改变了")
      }
      }
      }
      console.log(this.arrObj)
      console.log(this.searchObj.totalCount)
    }, 1000000)
    
  },
  methods: {
    modf() {//分解图片得函数
       for(var i=0;i<this.list.length;i++) {
          var a  = this.list[i].img.split(',')
          this.list[i].img = a;
        }
    },
    formChange() {//搜索函数
      console.log(this.formObj)
      this.$api('messageAll',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,type:this.formObj.id}}).then((res)=>{
         this.list = res.data.data.list
        this.modf()
      })
    },
    image(scope) {//图片查看详情
      this.img = scope.row.img;
      this.dialogTableVisible = true;
    },
    remove (scope) {//删除帖子
      console.log(scope)
      this.$api("deleteStatus",{params:{messageid:scope.id}}).then((res)=>{
        // debugger;
        if(res.data.retCode==200) {
          this.$message("删除成功")
        }else{
          this.$message("删除失败")
        }
        this.query();
      })
    },
    query () {
      this.$api("queryAll",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{//查询当前页帖子函数
        this.list = res.data.data.list
        this.searchObj.pageSize = res.data.data.pageSize;
        this.searchObj.pageNum = res.data.data.pageNum;
        this.searchObj.totalCount = res.data.data.total;
        this.modf()
      })
    },

    handleSizeChange (val) {
      this.searchObj.pageSize = val
      this.query()
      // console.log(val)
    },
    handleCurrentChange (val) {
      // debugger;
      this.searchObj.pageNum = val;
      this.query();
      // console.log(val)
    }
  }
}
</script>
<style lang="less">
  .examine{
    width: 100%;
    height: 100%;
    text-align: center;
    color: rgba(0, 0, 0, 0.349);
    // background-color: red;
  }
  .inner{
    width: 100%;
   
    // overflow-x:auto;
    overflow-y: auto;
  }
  .pageination{
    width: 100%;
    height: 50px;
    padding-top: 30px;
  }
</style>
<style>
</style>



