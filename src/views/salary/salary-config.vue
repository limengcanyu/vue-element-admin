<template>
  <div style="margin-top: 5px;">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <el-button type="plain" size="medium" style="width: 100%;" @click="handleSalaryItemConfigClick">步骤 1：薪资项配置</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <el-button type="plain" size="medium" style="width: 100%;" @click="handleSalaryTemplateConfigClick">步骤 2：薪资模板配置</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <el-button type="plain" size="medium" style="width: 100%;" @click="handlePayrollTemplateConfigClick">步骤 3：工资单模板配置</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10" type="flex" class="row-bg" justify="center" style="margin-top: 5px;">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-steps :active="active" finish-status="success" simple>
            <el-step title="步骤 1：薪资项配置" icon="el-icon-edit" @click.native="handleStep1Click" />
            <el-step title="步骤 2：薪资模板配置" icon="el-icon-edit" @click.native="handleStep2Click" />
            <el-step title="步骤 3：工资单模板配置" icon="el-icon-edit" @click.native="handleStep3Click" />
          </el-steps>
        </div>
      </el-col>
    </el-row>

    <el-row v-if="active === 0" type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <salary-item-config />
        </div>
      </el-col>
    </el-row>

    <el-row v-if="active === 1" type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <salary-template-config />
        </div>
      </el-col>
    </el-row>

    <el-row v-if="active === 2" type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <payroll-template-config />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import salaryItemConfig from '@/views/salary/salary-item-config'
import salaryTemplateConfig from '@/views/salary/salary-template-config'
import payrollTemplateConfig from '@/views/salary/payroll-template-config'

export default {
  name: 'SalaryConfig',

  components: {
    salaryItemConfig,
    salaryTemplateConfig,
    payrollTemplateConfig
  },

  data() {
    return {
      active: 0
    }
  },

  methods: {
    handleSalaryItemConfigClick() {
      this.active = 0
    },

    handleSalaryTemplateConfigClick() {
      this.active = 1
    },

    handlePayrollTemplateConfigClick() {
      this.active = 2
    },

    handleStep1Click() {
      console.log('step1 click')
      this.active = 0
    },

    handleStep2Click() {
      console.log('step2 click')
      this.active = 1
    },

    handleStep3Click() {
      console.log('step3 click')
      this.active = 2
    }
  }
}
</script>

<style scoped>

</style>
