<template>
  <el-dialog :visible.sync="visible" :title="$t('sms.send')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmitHandle()">
      <el-form-item :label="$t('sms.mobile')" prop="mobile">
        <el-input v-model="dataForm.mobile" :placeholder="$t('sms.mobile')"/>
      </el-form-item>
      <el-form-item :label="$t('sms.params')" prop="params">
        <el-input v-model="dataForm.params" :placeholder="$t('sms.paramsTips')"/>
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
import { isMobile } from '@/utils/yisiUtil'
import httpUtil from '@/utils/httpUtil'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        mobile: '',
        params: ''
      }
    }
  },
  computed: {
    dataRule() {
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.mobile') })))
        }
        callback()
      }
      return {
        mobile: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
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
        httpUtil.postFormRequest('/sys/sms/send', this.dataForm).then(res => {
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
