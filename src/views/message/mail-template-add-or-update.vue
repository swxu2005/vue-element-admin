<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmitHandle()">
      <el-form-item :label="$t('mail.name')" prop="name">
        <el-input v-model="dataForm.name" :placeholder="$t('mail.name')"/>
      </el-form-item>
      <el-form-item :label="$t('mail.subject')" prop="subject">
        <el-input v-model="dataForm.subject" :placeholder="$t('mail.subject')"/>
      </el-form-item>
      <el-form-item :label="$t('mail.content')" prop="content">
        <Tinymce ref="editor" :height="200" v-model="dataForm.content" />
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
import Tinymce from '@/components/Tinymce'
import httpUtil from '@/utils/httpUtil'

const defaultForm = {
  id: '',
  name: '',
  subject: '',
  content: ''
}

export default {
  components: { Tinymce },
  data() {
    return {
      visible: false,
      uploadUrl: '',
      dataForm: Object.assign({}, defaultForm)
    }
  },
  computed: {
    dataRule() {
      var validateContent = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error(this.$t('validate.required')))
        }
        callback()
      }
      return {
        name: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        subject: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        content: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
          { validator: validateContent, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // ！！！重要！！！
    // 一定要在dataForm数据发生变更后，将Tinymce子组件中的hasChange置为false，新的数据才能传进去
    dataForm() {
      this.$refs.editor.hasChange = false
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.getInfo()
        } else {
          this.dataForm = Object.assign({}, defaultForm)
        }
      })
    },
    // 获取信息
    getInfo() {
      this.$http.get(`/sys/mailtemplate/${this.dataForm.id}`).then(({ data: res }) => {
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
        httpUtil.postFormRequest('/sys/mailtemplate', this.dataForm, !this.dataForm.id ? 'post' : 'put').then(res => {
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
