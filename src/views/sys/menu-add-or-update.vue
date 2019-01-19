<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmitHandle()">
      <el-form-item :label="$t('menu.type')" prop="type" size="mini">
        <el-radio-group v-model="dataForm.type" :disabled="!!dataForm.id">
          <el-radio :label="0">{{ $t('menu.type0') }}</el-radio>
          <el-radio :label="1">{{ $t('menu.type1') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('menu.name')" prop="name">
        <el-input v-model="dataForm.name" :placeholder="$t('menu.name')"/>
      </el-form-item>
      <el-form-item :label="$t('menu.parentName')" prop="parentName" class="menu-list">
        <el-popover ref="menuListPopover" v-model="menuListVisible" placement="bottom-start" trigger="click">
          <el-tree
            ref="menuListTree"
            :data="menuList"
            :props="{ label: 'name', children: 'children' }"
            :highlight-current="true"
            :expand-on-click-node="false"
            node-key="id"
            accordion
            @current-change="menuListTreeCurrentChangeHandle"/>
        </el-popover>
        <el-input v-popover:menuListPopover v-model="dataForm.parentName" :readonly="true" :placeholder="$t('menu.parentName')">
          <i v-if="dataForm.pid !== '0'" slot="suffix" class="el-icon-circle-close el-input__icon" @click.stop="deptListTreeSetDefaultHandle()"/>
        </el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type === 0" :label="$t('menu.url')" prop="url">
        <el-input v-model="dataForm.url" :placeholder="$t('menu.url')"/>
      </el-form-item>
      <el-form-item :label="$t('menu.sort')" prop="sort">
        <el-input-number v-model="dataForm.sort" :min="0" :label="$t('menu.sort')" controls-position="right"/>
      </el-form-item>
      <el-form-item :label="$t('menu.permissions')" prop="permissions">
        <el-input v-model="dataForm.permissions" :placeholder="$t('menu.permissionsTips')"/>
      </el-form-item>
      <el-form-item v-if="dataForm.type === 0" :label="$t('menu.icon')" prop="icon" class="icon-list">
        <el-popover ref="iconListPopover" v-model="iconListVisible" placement="bottom-start" trigger="click" popper-class="mod-sys__menu-icon-popover">
          <div class="mod-sys__menu-icon-inner">
            <div class="mod-sys__menu-icon-list">
              <el-button
                v-for="(item, index) in iconList"
                :key="index"
                :class="{ 'is-active': dataForm.icon === item }"
                @click="iconListCurrentChangeHandle(item)">
                <svg class="icon-svg" aria-hidden="true"><use :xlink:href="`#${item}`"/></svg>
              </el-button>
            </div>
          </div>
        </el-popover>
        <el-input v-popover:iconListPopover v-model="dataForm.icon" :readonly="true" :placeholder="$t('menu.icon')"/>
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
import { getIconList } from '@/utils/yisiUtil'
export default {
  data() {
    return {
      visible: false,
      menuList: [],
      menuListVisible: false,
      iconList: [],
      iconListVisible: false,
      dataForm: {
        id: '',
        type: 0,
        name: '',
        pid: '0',
        parentName: '',
        url: '',
        permissions: '',
        sort: 0,
        icon: ''
      }
    }
  },
  computed: {
    dataRule() {
      return {
        name: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        parentName: [
          { required: true, message: this.$t('validate.required'), trigger: 'change' }
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
        this.iconList = getIconList()
        this.dataForm.parentName = this.$t('menu.parentNameDefault')
        this.getMenuList().then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      })
    },
    // 获取菜单列表
    getMenuList() {
      return this.$http.get('/sys/menu/list?type=0').then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.menuList = res.data
      }).catch(() => {})
    },
    // 获取信息
    getInfo() {
      this.$http.get(`/sys/menu/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
        if (this.dataForm.pid === '0') {
          return this.deptListTreeSetDefaultHandle()
        }
        this.$refs.menuListTree.setCurrentKey(this.dataForm.pid)
      }).catch(() => {})
    },
    // 上级菜单树, 设置默认值
    deptListTreeSetDefaultHandle() {
      this.dataForm.pid = '0'
      this.dataForm.parentName = this.$t('menu.parentNameDefault')
    },
    // 上级菜单树, 选中
    menuListTreeCurrentChangeHandle(data) {
      this.dataForm.pid = data.id
      this.dataForm.parentName = data.name
      this.menuListVisible = false
    },
    // 图标, 选中
    iconListCurrentChangeHandle(icon) {
      this.dataForm.icon = icon
      this.iconListVisible = false
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http[!this.dataForm.id ? 'post' : 'put']('/sys/menu', this.dataForm).then(({ data: res }) => {
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

<style lang="scss">
.icon-svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  overflow: hidden;
}
.mod-sys__menu {
  .menu-list,
  .icon-list {
    .el-input__inner,
    .el-input__suffix {
      cursor: pointer;
    }
  }
  &-icon-popover {
    width: 458px;
    overflow: hidden;
  }
  &-icon-inner {
    width: 478px;
    max-height: 258px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &-icon-list {
    width: 458px;
    padding: 0;
    margin: -8px 0 0 -8px;
    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;
      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
}
</style>
