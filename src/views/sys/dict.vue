<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__dict">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.dictName" :placeholder="$t('dict.dictName')" clearable/>
        </el-form-item>
        <el-form-item v-if="dataForm.pid === '0'">
          <el-input v-model="dataForm.dictType" :placeholder="$t('dict.dictType')" clearable/>
        </el-form-item>
        <el-form-item v-if="dataForm.pid !== '0'">
          <el-input v-model="dataForm.dictValue" :placeholder="$t('dict.dictValue')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('sys:dict:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('sys:dict:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="dataListLoading"
        :data="dataList"
        border
        style="width: 100%;"
        @selection-change="dataListSelectionChangeHandle"
        @sort-change="dataListSortChangeHandle">
        <el-table-column type="selection" header-align="center" align="center" width="50"/>
        <el-table-column :label="$t('dict.dictName')" prop="dictName" header-align="center" align="center"/>
        <el-table-column :label="$t('dict.dictType')" prop="dictType" header-align="center" align="center">
          <template slot-scope="scope">
            <span v-if="dataForm.pid !== '0'">{{ scope.row.dictType }}</span>
            <el-button v-else type="text" @click="childHandle(scope.row)">{{ scope.row.dictType }}</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="dataForm.pid !== '0'" prop="dictValue" label="字典值" header-align="center" align="center"/>
        <el-table-column :label="$t('dict.sort')" prop="sort" sortable="custom" header-align="center" align="center"/>
        <el-table-column :label="$t('dict.remark')" prop="remark" header-align="center" align="center"/>
        <el-table-column :label="$t('dict.createDate')" prop="createDate" sortable="custom" header-align="center" align="center" width="180"/>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('sys:dict:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row)">{{ $t('update') }}</el-button>
            <el-button v-if="$hasPermission('sys:dict:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="dataForm.pid === '0'"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle"/>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './dict-add-or-update'

export default {
  name: 'DictManage',
  components: {
    AddOrUpdate
  },
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        activatedIsNeed: false,
        getDataListURL: '/sys/dict/page',
        getDataListIsPage: true,
        deleteURL: '/sys/dict',
        deleteIsBatch: true
      },
      dataForm: {
        pid: '0',
        dictName: '',
        dictType: '',
        dictValue: ''
      }
    }
  },
  activated() {
    // 通过路由参数pid, 控制列表请求操作
    this.dataForm.pid = this.$route.params.pid || '0'
    if (this.dataForm.pid !== '0') {
      this.mixinViewModuleOptions.getDataListURL = '/sys/dict/list'
      this.mixinViewModuleOptions.getDataListIsPage = false
      this.dataForm.dictType = this.$route.query.type || ''
    }
    this.getDataList()
  },
  methods: {
    // 子级
    childHandle(row) {
      this.$router.push({ path: `/sys/dict/${row.id}` })
    },
    // 新增 / 修改
    addOrUpdateHandle(row = {}) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = row.id
        this.$refs.addOrUpdate.dataForm.pid = this.dataForm.pid
        this.$refs.addOrUpdate.dataForm.dictType = row.dictType || this.dataForm.dictType || ''
        this.$refs.addOrUpdate.init()
      })
    }
  }
}
</script>
