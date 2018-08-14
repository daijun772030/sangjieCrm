<template>
  <div class="examine">
    <el-table class="inner"  height="calc(100% - 100px)" border :data="list">
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
          <img v-bind:src="'/test' + scope.row.img" alt="帖子图片详情" class="itemImage">
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
export default {
  data () {
    return {
      list:null,//这是boss圈数据内容
      img:null,
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
  },
  methods: {
    remove () {//删除帖子
      this.$api("deleteStatus",{params:{messageid:this.messageid}}).then((res)=>{
        if(res.data.retCode==200) {
          this.$message("删除成功")
        }else{
          this.$message("删除失败")
        }
        this.query();
      })
    },
    query () {
      this.$api("queryAll",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
        console.log(res)
        this.list = res.data.data.list
        this.searchObj.pageSize = res.data.data.pageSize;
        this.searchObj.pageNum = res.data.data.pageNum;
        this.searchObj.totalCount = res.data.data.total;
        // var obj = this.list;
        for(var i=0;i<this.list.length;i++) {
          this.messageid = this.list[i].id
          var strs = new Array();
          var str = this.list[i].img;
          strs = str.split(",");
          this.list[i].img = strs
          console.log(this.list[i].img)
        }

      })
    },
    handleSizeChange (val) {
      this.searchObj.pageSize = val
      this.query()
      console.log(val)
    },
    handleCurrentChange (val) {
      this.searchObj.pageNum = val;
      this.query();
      console.log(val)
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



