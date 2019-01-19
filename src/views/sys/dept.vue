<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__dept">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-button v-if="$hasPermission('sys:dept:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border style="width: 100%;">
        <table-tree-column :label="$t('dept.name')" prop="name" header-align="center"/>
        <el-table-column :label="$t('dept.parentName')" prop="parentName" header-align="center" align="center"/>
        <el-table-column :label="$t('dept.sort')" prop="sort" header-align="center" align="center" width="80"/>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('sys:dept:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
            <el-button v-if="$hasPermission('sys:dept:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import TableTreeColumn from '@/components/table-tree-column'
import AddOrUpdate from './dept-add-or-update'
export default {
  name: 'DeptManage',
  components: {
    TableTreeColumn,
    AddOrUpdate
  },
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/dept/list',
        deleteURL: '/sys/dept'
      }
    }
  }
}
</script>
