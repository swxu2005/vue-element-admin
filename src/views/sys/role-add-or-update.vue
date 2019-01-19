<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmitHandle()">
      <el-form-item :label="$t('role.name')" prop="name">
        <el-input v-model="dataForm.name" :placeholder="$t('role.name')"/>
      </el-form-item>
      <el-form-item :label="$t('role.remark')" prop="remark">
        <el-input v-model="dataForm.remark" :placeholder="$t('role.remark')"/>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('role.menuList')" size="mini">
            <el-tree
              ref="menuListTree"
              :data="menuList"
              :props="{ label: 'name', children: 'children' }"
              node-key="id"
              accordion
              show-checkbox/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('role.deptList')" size="mini">
            <el-tree
              ref="deptListTree"
              :data="deptList"
              :props="{ label: 'name', children: 'children' }"
              node-key="id"
              accordion
              show-checkbox/>
          </el-form-item>
        </el-col>
      </el-row>
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
      menuList: [],
      deptList: [],
      dataForm: {
        id: '',
        name: '',
        menuIdList: [],
        deptIdList: [],
        remark: ''
      }
    }
  },
  computed: {
    dataRule() {
      return {
        name: [
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
        this.$refs.menuListTree.setCheckedKeys([])
        this.$refs.deptListTree.setCheckedKeys([])
        Promise.all([
          this.getMenuList(),
          this.getDeptList()
        ]).then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      })
    },
    // 获取菜单列表
    getMenuList() {
      return this.$http.get('/sys/menu/select').then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.menuList = res.data
      }).catch(() => {})
    },
    // 获取部门列表
    getDeptList() {
      return this.$http.get('/sys/dept/list').then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.deptList = res.data
      }).catch(() => {})
    },
    // 获取信息
    getInfo() {
      this.$http.get(`/sys/role/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
        this.dataForm.menuIdList.forEach(item => this.$refs.menuListTree.setChecked(item, true))
        this.$refs.deptListTree.setCheckedKeys(this.dataForm.deptIdList)
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.dataForm.menuIdList = [
          ...this.$refs.menuListTree.getCheckedKeys(),
          ...this.$refs.menuListTree.getHalfCheckedKeys()
        ]
        this.dataForm.deptIdList = this.$refs.deptListTree.getCheckedKeys()
        this.$http[!this.dataForm.id ? 'post' : 'put']('/sys/role', this.dataForm).then(({ data: res }) => {
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
