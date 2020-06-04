<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="header"></div>
      </el-header>
      <el-container>
        <el-aside width="200px">
        <div class="aside"> 
          <div class="just">
            <el-row :gutter="20">
              <el-col :span="8">
                <span class="span-height">name</span>
              </el-col>
              <el-col :span="16">
                <el-input size="mini" v-model="message.name" placeholder="请输入内容" clearable ></el-input>
              </el-col>
            </el-row>
          </div>
          <div class="just">
            <el-row :gutter="20">
              <el-col :span="8">
                <span class="span-height">curse</span>
              </el-col>
              <el-col :span="16">
                <el-input size="mini" v-model="message.email" placeholder="请输入内容" clearable ></el-input>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" style="margin-top: 30px !important;display: flex; justify-content: flex-end">
            <el-col :span="12">
              <el-button size="small" type="primary" plain @click="query">检索</el-button>
            </el-col>
          </el-row>
        </div>
        </el-aside>
        <el-container>
          <el-main>
            <div class="content">
              <el-table :data="tableData" height="250" border style="width: 100%">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="id"    label="编号" width="100"> </el-table-column>
                <el-table-column prop="name"  label="姓名" width="200"> </el-table-column>
                <el-table-column prop="email" label="邮箱"> </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <template>
             <el-dialog title="数据编辑" :visible.sync="dialogFormVisible">
                <el-input v-model="modifyData.id" autocomplete="off"></el-input>
                <br>
                <el-input v-model="modifyData.name" autocomplete="off"></el-input>
                <br>
                <el-input v-model="modifyData.email" autocomplete="off"></el-input>

                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="saveData">确 定</el-button>
                </div>
              </el-dialog>
            </template>
           
          </el-main>
          <el-footer>
            <div class="footer">
              <HelloWorld msg="Welcome to Your Vue.js App"/>
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import http from './core/serve'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      // 检索 数据
      message: {
        'name': '',
        'email': ''
        },
      // 检索 结果集
      tableData: [],
      // open/close edit dialog
      dialogFormVisible: false,
      // dialog 编辑数据
      modifyData:{
        'id': '',
        'name': '',
        'email': ''
      }
    }
  },
  methods: {
    // 检索 请求数据
    query(){
      http.post(this.message).then(result =>{
        this.tableData = result['data']
        console.log(result['data'])
      })
    },
    // 新增 数据
    add(){
      console.log('add')
    },
    // 编辑 数据
    handleEdit(index, row){
      this.dialogFormVisible = true
      this.modifyData = row
    },
    // 保存 编辑后的数据, 更新到 数据库
    saveData(){
      // close edit dialog
      this.dialogFormVisible = false
      console.log(this.modifyData)
      http.save(this.modifyData).then(result =>{
        console.log(result.data)
      })
    }
  },
}
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.el-header{
  padding: 0px !important;
}
.header {
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
}
.footer {
  width:100%;
  height:100%;
  background-color: #aaa;
}
.content {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
.aside{
  width: 100%;
  height: 200px;
  margin-top: 10px;
  overflow: hidden !important;
}

</style>
