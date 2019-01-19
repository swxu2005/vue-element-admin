<template>
  <el-dialog :visible.sync="visible" :title="$t('mail.send')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmitHandle()">
      <el-form-item :label="$t('mail.mailTo')" prop="mailTo">
        <el-input v-model="dataForm.mailTo" :placeholder="$t('mail.mailTo')"/>
      </el-form-item>
      <el-form-item :label="$t('mail.mailCc')" prop="mailCc">
        <el-input v-model="dataForm.mailCc" :placeholder="$t('mail.mailCc')"/>
      </el-form-item>
      <el-form-item :label="$t('mail.params')" prop="params">
        <el-input v-model="dataForm.params" :placeholder="$t('mail.paramsTips')"/>
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
import { isEmail } from '@/utils/yisiUtil'
import httpUtil from '@/utils/httpUtil'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: '',
        mailTo: '',
        mailCc: '',
        params: ''
      }
    }
  },
  computed: {
    dataRule() {
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.email') })))
        }
        callback()
      }
      return {
        mailTo: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        httpUtil.postFormRequest('/sys/mailtemplate/send', this.dataForm).then(res => {
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
