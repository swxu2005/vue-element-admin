<template>
  <el-dialog :visible.sync="visible" :title="$t('oss.config')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmitHandle()">
      <el-form-item :label="$t('oss.type')" size="mini">
        <el-radio-group v-model="dataForm.type">
          <el-radio :label="1">{{ $t('oss.type1') }}</el-radio>
          <el-radio :label="2">{{ $t('oss.type2') }}</el-radio>
          <el-radio :label="3">{{ $t('oss.type3') }}</el-radio>
          <el-radio :label="4">{{ $t('oss.type4') }}</el-radio>
          <el-radio :label="5">{{ $t('oss.type5') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="dataForm.type === 1">
        <el-form-item :label="$t('oss.qiniuDomain')" prop="qiniuDomain">
          <el-input v-model="dataForm.qiniuDomain" :placeholder="$t('oss.qiniuDomainTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qiniuPrefix')" prop="qiniuPrefix">
          <el-input v-model="dataForm.qiniuPrefix" :placeholder="$t('oss.qiniuPrefixTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qiniuAccessKey')" prop="qiniuAccessKey">
          <el-input v-model="dataForm.qiniuAccessKey" :placeholder="$t('oss.qiniuAccessKeyTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qiniuSecretKey')" prop="qiniuSecretKey">
          <el-input v-model="dataForm.qiniuSecretKey" :placeholder="$t('oss.qiniuSecretKeyTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qiniuBucketName')" prop="qiniuBucketName">
          <el-input v-model="dataForm.qiniuBucketName" :placeholder="$t('oss.qiniuBucketNameTips')"/>
        </el-form-item>
      </template>
      <template v-else-if="dataForm.type === 2">
        <el-form-item :label="$t('oss.aliyunDomain')" prop="aliyunDomain">
          <el-input v-model="dataForm.aliyunDomain" :placeholder="$t('oss.aliyunDomainTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.aliyunPrefix')" prop="aliyunPrefix">
          <el-input v-model="dataForm.aliyunPrefix" :placeholder="$t('oss.aliyunPrefixTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.aliyunEndPoint')" prop="aliyunEndPoint">
          <el-input v-model="dataForm.aliyunEndPoint" :placeholder="$t('oss.aliyunEndPointTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.aliyunAccessKeyId')" prop="aliyunAccessKeyId">
          <el-input v-model="dataForm.aliyunAccessKeyId" :placeholder="$t('oss.aliyunAccessKeyIdTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.aliyunAccessKeySecret')" prop="aliyunAccessKeySecret">
          <el-input v-model="dataForm.aliyunAccessKeySecret" :placeholder="$t('oss.aliyunAccessKeySecretTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.aliyunBucketName')" prop="aliyunBucketName">
          <el-input v-model="dataForm.aliyunBucketName" :placeholder="$t('oss.aliyunBucketNameTips')"/>
        </el-form-item>
      </template>
      <template v-else-if="dataForm.type === 3">
        <el-form-item :label="$t('oss.qcloudDomain')" prop="qcloudDomain">
          <el-input v-model="dataForm.qcloudDomain" :placeholder="$t('oss.qcloudDomainTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qcloudPrefix')" prop="qcloudPrefix">
          <el-input v-model="dataForm.qcloudPrefix" :placeholder="$t('oss.qcloudPrefixTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qcloudAppId')" prop="qcloudAppId">
          <el-input v-model="dataForm.qcloudAppId" :placeholder="$t('oss.qcloudAppIdTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qcloudSecretId')" prop="qcloudSecretId">
          <el-input v-model="dataForm.qcloudSecretId" :placeholder="$t('oss.qcloudSecretIdTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qcloudSecretKey')" prop="qcloudSecretKey">
          <el-input v-model="dataForm.qcloudSecretKey" :placeholder="$t('oss.qcloudSecretKeyTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qcloudBucketName')" prop="qcloudBucketName">
          <el-input v-model="dataForm.qcloudBucketName" :placeholder="$t('oss.qcloudBucketNameTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.qcloudRegion')" prop="qcloudRegion">
          <el-select v-model="dataForm.qcloudRegion" :placeholder="$t('oss.qcloudRegionTips')" clearable class="w-percent-100">
            <el-option :label="$t('oss.qcloudRegionBeijing1')" value="ap-beijing-1"/>
            <el-option :label="$t('oss.qcloudRegionBeijing')" value="ap-beijing"/>
            <el-option :label="$t('oss.qcloudRegionShanghai')" value="ap-shanghai"/>
            <el-option :label="$t('oss.qcloudRegionGuangzhou')" value="ap-guangzhou"/>
            <el-option :label="$t('oss.qcloudRegionChengdu')" value="ap-chengdu"/>
            <el-option :label="$t('oss.qcloudRegionChongqing')" value="ap-chongqing"/>
            <el-option :label="$t('oss.qcloudRegionSingapore')" value="ap-singapore"/>
            <el-option :label="$t('oss.qcloudRegionHongkong')" value="ap-hongkong"/>
            <el-option :label="$t('oss.qcloudRegionToronto')" value="na-toronto"/>
            <el-option :label="$t('oss.qcloudRegionFrankfurt')" value="eu-frankfurt"/>
          </el-select>
        </el-form-item>
      </template>
      <template v-else-if="dataForm.type === 4">
        <el-form-item :label="$t('oss.localDomain')" prop="localDomain">
          <el-input v-model="dataForm.localDomain" :placeholder="$t('oss.localDomainTips')"/>
        </el-form-item>
      </template>
      <template v-else-if="dataForm.type === 5">
        <el-form-item :label="$t('oss.fastdfsDomain')" prop="fastdfsDomain">
          <el-input v-model="dataForm.fastdfsDomain" :placeholder="$t('oss.fastdfsDomainTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.localPrefix')" prop="localPrefix">
          <el-input v-model="dataForm.localPrefix" :placeholder="$t('oss.localPrefixTips')"/>
        </el-form-item>
        <el-form-item :label="$t('oss.localPath')" prop="localPath">
          <el-input v-model="dataForm.localPath" :placeholder="$t('oss.localPathTips')"/>
        </el-form-item>
      </template>
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
        type: 0,
        qiniuDomain: '',
        qiniuPrefix: '',
        qiniuAccessKey: '',
        qiniuSecretKey: '',
        qiniuBucketName: '',
        aliyunDomain: '',
        aliyunPrefix: '',
        aliyunEndPoint: '',
        aliyunAccessKeyId: '',
        aliyunAccessKeySecret: '',
        aliyunBucketName: '',
        qcloudDomain: '',
        qcloudPrefix: '',
        qcloudAppId: 0,
        qcloudSecretId: '',
        qcloudSecretKey: '',
        qcloudBucketName: '',
        qcloudRegion: '',
        localDomain: '',
        fastdfsDomain: '',
        localPrefix: '',
        localPath: ''
      }
    }
  },
  computed: {
    dataRule() {
      return {
        qiniuDomain: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qiniuAccessKey: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qiniuSecretKey: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qiniuBucketName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        aliyunDomain: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        aliyunEndPoint: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        aliyunAccessKeyId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        aliyunAccessKeySecret: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        aliyunBucketName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qcloudDomain: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qcloudAppId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qcloudSecretId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qcloudSecretKey: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qcloudBucketName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        qcloudRegion: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        localDomain: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        fastdfsDomain: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        localPath: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'dataForm.type'(val) {
      this.$refs['dataForm'].clearValidate()
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
      this.$http.get('/sys/oss/info').then(({ data: res }) => {
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
        this.$http.post('/sys/oss', this.dataForm).then(({ data: res }) => {
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
