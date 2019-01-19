<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__log-operation">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-select v-model="dataForm.status" :placeholder="$t('logOperation.status')" clearable>
            <el-option :label="$t('logOperation.status0')" :value="0"/>
            <el-option :label="$t('logOperation.status1')" :value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border style="width: 100%;" @sort-change="dataListSortChangeHandle">
        <el-table-column :label="$t('logOperation.creatorName')" prop="creatorName" header-align="center" align="center"/>
        <el-table-column :label="$t('logOperation.operation')" prop="operation" header-align="center" align="center"/>
        <el-table-column :label="$t('logOperation.requestUri')" prop="requestUri" header-align="center" align="center"/>
        <el-table-column :label="$t('logOperation.requestMethod')" prop="requestMethod" header-align="center" align="center"/>
        <el-table-column :label="$t('logOperation.requestParams')" :show-overflow-tooltip="true" prop="requestParams" header-align="center" align="center" width="150"/>
        <el-table-column :label="$t('logOperation.requestTime')" prop="requestTime" sortable="custom" header-align="center" align="center">
          <template slot-scope="scope">
            {{ `${scope.row.requestTime}ms` }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('logOperation.status')" prop="status" sortable="custom" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" size="small" type="danger">{{ $t('logOperation.status0') }}</el-tag>
            <el-tag v-else size="small" type="success">{{ $t('logOperation.status1') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('logOperation.ip')" prop="ip" header-align="center" align="center"/>
        <el-table-column :label="$t('logOperation.userAgent')" :show-overflow-tooltip="true" prop="userAgent" header-align="center" align="center" width="150"/>
        <el-table-column :label="$t('logOperation.createDate')" prop="createDate" sortable="custom" header-align="center" align="center" width="180"/>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle"/>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
export default {
  name: 'LogOperation',
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/log/operation/page',
        getDataListIsPage: true,
        exportURL: '/sys/log/operation/export'
      },
      dataForm: {
        status: ''
      }
    }
  }
}
</script>
