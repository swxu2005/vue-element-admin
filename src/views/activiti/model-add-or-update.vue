<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmitHandle()">
      <el-form-item :label="$t('model.name')" prop="name">
        <el-input v-model="dataForm.name" :placeholder="$t('model.name')"/>
      </el-form-item>
      <el-form-item :label="$t('model.key')" prop="key">
        <el-input v-model="dataForm.key" :placeholder="$t('model.key')"/>
      </el-form-item>
      <el-form-item :label="$t('model.description')" prop="description">
        <el-input v-model="dataForm.description" :placeholder="$t('model.description')"/>
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
        id: '',
        name: '',
        key: '',
        description: ''
      }
    }
  },
  computed: {
    dataRule() {
      return {
        name: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        key: [
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
      })
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http[!this.dataForm.id ? 'post' : 'put']('/act/model', this.dataForm).then(({ data: res }) => {
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
