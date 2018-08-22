<template>
    <div class="goods">
      <el-form :inline="true" :model="searchObj" label-width="5px" size="mini"  class="searchForm">
        <el-form-item class="float_left">
          <el-select v-model="searchObj.productType" placeholder="商品类型" @change="changeValue" clearable>
            <el-option v-for="channel in shopType" :key="channel.id" :label="channel.name" :value="channel.id">
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
        <el-table-column prop="img" label="商品logo" align="center">
          <!-- <template slot-scope="scope">
             <img :src="'/test' + scope.row.img" alt="法人身份证正面"  class="itemImage">
          </template> -->
        </el-table-column>
        <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
        <!-- <el-table-column prop="putawayState" label="是否上架" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.putawayState === '1'">已上架</span>
            <span v-else>未上架</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="upData" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="endData" label="最后编辑时间" align="center"></el-table-column> -->
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope)">编辑</el-button>
            <el-button @click="deleShop(scope.row)" type="text" size="mini">删除</el-button>
            <el-button v-if="scope.row.putawayState === '1' " type="text" size="mini" @click="status(scope.row)">上架</el-button>
            <el-button v-if="scope.row.putawayState === '0' " type="text" size="mini" @click="status(scope.row)">下架</el-button>
          </template>  
        </el-table-column>
      </el-table>
      <el-dialog :modal-append-to-body="false" :title="title" center @close="close(addform)" :visible.sync="dialogVisible" :show-close="false" width="900px">
        <el-form :inline="true" :model="addform" ref="addform" label-width="150px" class="searchFrom demo-form-inline" >
          <el-form-item label="商品类型" prop="upName" class="myitem" >
            <el-select v-model="addform.type" clearable placeholder="请选择商品类型" @change="getShop" :disabled='typeId'>
              <el-option v-for="item in this.shopType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="name" class="myitem">
            <el-select v-model="addform.id" clearable placeholder="请选择商品名称" :disabled="typeId">
              <el-option v-for="item in this.classShop" :key="item.id" :label="item.name" :value="item.id" :disabled="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="price" class="myitem">
            <el-input type="text" placeholder="请输入大于十五的金额" @blur="input1" v-model="addform.price" >
              <template slot="append">元</template>
            </el-input> 
          </el-form-item>
          <el-form-item label="编辑时间" class="myitem">
            <el-date-picker
          :disabled="true"
            v-model="addform.id"
            type="date"
            placeholder="创建时间">
          </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close(addform)">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </el-dialog>
      <!-- 这里是分页功能 -->
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
  // import GoodsObj from './goods1.js'
  export default {
    data () {
      return {
        typeId:false,
        disable:false,//是否禁用select框
        dialogVisible: false,
        dis:false,
        title: null,
        searchObj: {
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
        actionType:null,//操作类型
        higherup:null, //搜索框需要传递的参数(这是商品类型)
        shopId:null,
        addform: {
          id:null,
          merchantid:null,
          name:null,
          number:null,
          type:null,
          upName:null,
          price:null,
        },
        shopType:[],//商品类型
        classShop:[],//根据商品类型获得相应的商品
        addShop:[],
        productTypes: [],
        list1:[]
      }
    },
    created () {
      // this.allshop()
      // this.addshop();
      this.ces();
      this.status();
      // this.clasShop();
    },
    methods: {
      input1 () {//输入的金额判断
      var reg = /^1[6-9]$|^[2-9]\d$|^1\d{2}$/;
      if(reg.test(this.addform.price)){
         this.addform.pice = reg.test(this.addform.price);
      }else if (/[^\d]/.test(this.addform.price)) {
        this.addform.price=this.addform.price.replace(/[^\d]/g,'')
      }
      else{
        this.$message("请正确输入大于十五的金额");
        this.addform.price = null;
      }
      },
      stop() {
        this.dis = true;
      },
      getShop(){//这里是点击商品类型获取相应商品
        this.clasShop()
      },
      deleShop(scope) {//删除商品相当于下架订单
        console.log(scope);
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.$api("delshop",{id:scope.id}).then((res)=>{
              if(res.data.retCode==200){
                this.ces()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                this.$message({
                  type: 'success',
                  message: '删除失败!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        // this.$api("delshop",{params:{id:scope.id}}).then((res)=>{

        // })
      },
       save () {//保存
        this.dialogVisible = false
       console.log(this.addform)
        if(this.actionType==1){
          this.$api("addshop",{typeid:this.addform.id,price:this.addform.price}).then((res)=>{
            console.log(res)
            if(res.data.retCode!==200) {
              this.$message('添加失败')
            }else{
              this.$message('添加成功')
            }
          })
          this.ces()
        }
        if(this.actionType==2) {
          this.$api('upshop',{id:this.addform.id,price:this.addform.price}).then((res)=>{
            console.log(res)
            if(res.data.retCode!==200) {
              this.$message('修改失败')
            }else{
              this.$message('修改成功')
            }
          })
          this.ces()
        }
      },
      close (addform) {//取消的时候数据消失
        this.ces()
        this.dialogVisible = false;
        this.typeId =false;
        for(var i in addform) {
          addform[i] = null;
        }
      },
      changeValue (value) {//这里获取搜索框的id
        var obj={};
        obj = this.productTypes.find((item)=>{
          return item.id == value
        });
         this.higherup = value
         console.log(this.higherup)
         console.log(obj)
      },
      status () {//查询我们的所有商品的类型
        this.$api('typeStatus',{params:{status:"1"}}).then((res)=>{
          console.log(res.data.data);
          this.shopType = res.data.data
        })
      },
      clasShop () {//这里根据商品类型查询相应的商品集
      // debugger;
        this.$api('typeFind',{params:{id:this.addform.type}}).then((res)=>{
          console.log(res);
          this.classShop = res.data.data;
          for(var i=0;i<this.classShop.length;i++) {
            if(this.classShop[i].type) {
              // console.log(this.classShop[i].type)
              this.classShop[i].type = true;
              console.log(this.dis)
            }else{
              this.classShop[i].type = false;
            }
          }
        })
      },
     
      earchForm () {       //搜索框搜索内容的
         this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,higherup:this.searchObj.productType}}).then((res)=>{
           console.log(res)
           var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
         })
      },  
      ces (){ //查询所有商品(模版)
        // debugger;
        this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
          console.log(res.data)
          var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
        })
      },
      handleSizeChange (val) {   //点击每页多少条的时候触发的函数(end)
        // debugger;
        this.searchObj.pageSize = val
        this.ces()
      },
      handleCurrentChange (val) { //点击前往第几页的时候触发的函数(end)
        this.searchObj.pageNum = val;
        this.ces();
      },
      upshop () { //修改商品
        this.$api('upshop',{id:'2',price:'34'}).then((res)=>{
          console.log(res)
        })
      },
      add () {       //添加商品函数
      this.actionType =1;
      this.disable = false
        this.title = "添加商品"
        this.dialogVisible = true
      },
      edit (myCode) {
        // debugger;        //编辑商品
        this.typeId =true;
        console.log(myCode.row)
        this.dialogVisible = true;
        this.actionType=2;
        this.addform = myCode.row;
        console.log(myCode.row)
        this.title = '编辑商品';
        
      },
    },
    computed: {
    } 
  }
</script>
<style long="less">
  .myitem{
    padding: 30px 0;
  }
  .goods{
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

