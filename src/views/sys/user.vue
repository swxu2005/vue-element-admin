<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__user">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.username" :placeholder="$t('user.username')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('sys:user:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('sys:user:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('sys:user:export')" type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
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
        <el-table-column :label="$t('user.username')" prop="username" sortable="custom" header-align="center" align="center"/>
        <el-table-column :label="$t('user.deptName')" prop="deptName" header-align="center" align="center"/>
        <el-table-column :label="$t('user.email')" prop="email" header-align="center" align="center"/>
        <el-table-column :label="$t('user.mobile')" prop="mobile" sortable="custom" header-align="center" align="center"/>
        <el-table-column :label="$t('user.status')" prop="status" sortable="custom" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" size="small" type="danger">{{ $t('user.status0') }}</el-tag>
            <el-tag v-else size="small" type="success">{{ $t('user.status1') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.createDate')" prop="createDate" sortable="custom" header-align="center" align="center" width="180"/>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('sys:user:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
            <el-button v-if="$hasPermission('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
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
import AddOrUpdate from './user-add-or-update'
export default {
  name: 'UserManage',
  components: {
    AddOrUpdate
  },
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/user/page',
        getDataListIsPage: true,
        deleteURL: '/sys/user',
        deleteIsBatch: true,
        exportURL: '/sys/user/export'
      },
      dataForm: {
        username: ''
      }
    }
  }
}
</script>
