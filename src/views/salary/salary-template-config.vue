<template>
  <div>
    <el-row type="flex" class="row-bg" justify="left">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-collapse :value="'1'" accordion>
            <el-collapse-item title="" name="1">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="薪资模板名称">
                  <el-input v-model="formInline.user" placeholder="薪资模板名称" />
                </el-form-item>

                <el-form-item label="证件类型">
                  <el-select v-model="formInline.region" placeholder="证件类型">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>

                <el-form-item label="证件号码">
                  <el-input v-model="formInline.user" placeholder="证件号码" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                  <el-button type="danger" @click="onDelete">删除</el-button>
                </el-form-item>

                <el-form-item style="float: right;">
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                  <el-button type="danger" @click="onDelete">删除</el-button>

                  <el-dropdown style="margin-left: 12px;">
                    <el-button type="primary">
                      更多菜单<i class="el-icon-arrow-down el-icon--right" />
                    </el-button>

                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><el-button type="primary" size="small" @click="handleSeeClick(scope.row)">下载全部</el-button></el-dropdown-item>
                      <el-dropdown-item style="margin-top: 5px;"><el-button type="primary" size="small" @click="handleSeeClick(scope.row)">下载选中</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData" stripe border max-height="600" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />

            <el-table-column prop="date" label="日期" header-align="center" align="center" width="180" />
            <el-table-column prop="name" label="姓名" header-align="center" align="center" width="180" />
            <el-table-column prop="address" label="地址" header-align="center" align="center" />

            <el-table-column fixed="right" header-align="center" align="center" label="操作" width="350">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleSeeClick(scope.row)">查看</el-button>
                <el-button type="primary" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDeleteClick(scope.row)">删除</el-button>

                <el-dropdown style="margin-left: 12px;">
                  <el-button type="primary">
                    更多菜单<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><el-button type="primary" size="small" @click="handleSeeClick(scope.row)">下载全部</el-button></el-dropdown-item>
                    <el-dropdown-item style="margin-top: 5px;"><el-button type="primary" size="small" @click="handleSeeClick(scope.row)">下载选中</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-pagination
            :current-page="current"
            :page-size="size"
            :total="total"
            :page-sizes="[30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SalaryConfig',

  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },

      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],

      multipleSelection: [],

      current: 1,
      size: 30,
      total: 100
    }
  },

  methods: {
    onSubmit() {
      console.log('submit!')
    },

    onDelete() {
      console.log('delete!')
    },

    handleSeeClick(row) {
      console.log(row)
    },

    handleEditClick(row) {
      console.log(row)
    },

    handleDeleteClick(row) {
      console.log(row)
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('选中: ' + JSON.stringify(this.multipleSelection))
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>

</style>
