<template>
  <el-dialog :visible.sync="visible" :title="$t('mail.config')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmitHandle()">
      <el-form-item :label="$t('mail.config')" prop="smtp">
        <el-input v-model="dataForm.smtp" :placeholder="$t('mail.config')"/>
      </el-form-item>
      <el-form-item :label="$t('mail.port')" prop="port">
        <el-input v-model="dataForm.port" :placeholder="$t('mail.port')"/>
      </el-form-item>
      <el-form-item :label="$t('mail.username')" prop="username">
        <el-input v-model="dataForm.username" :placeholder="$t('mail.username')"/>
      </el-form-item>
      <el-form-item :label="$t('mail.password')" prop="password">
        <el-input v-model="dataForm.password" :placeholder="$t('mail.password')"/>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        smtp: '',
        port: '',
        username: '',
        password: ''
      }
    }
  },
  computed: {
    dataRule() {
      return {
        smtp: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        port: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        username: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getInfo()
      })
    },
    // 获取信息
    getInfo() {
      this.$http.get('/sys/mailtemplate/config').then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = res.data
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http.post('/sys/mailtemplate/saveConfig', this.dataForm).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {})
      })
    }, 1000, { 'leading': true, 'trailing': false })
  }
}
</script>
