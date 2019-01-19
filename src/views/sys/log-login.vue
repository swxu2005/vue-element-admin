<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__log-login">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.creatorName" :placeholder="$t('logLogin.creatorName')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="dataForm.status" :placeholder="$t('logLogin.status')" clearable>
            <el-option :label="$t('logLogin.status0')" :value="0"/>
            <el-option :label="$t('logLogin.status1')" :value="1"/>
            <el-option :label="$t('logLogin.status2')" :value="2"/>
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
        <el-table-column :label="$t('logLogin.creatorName')" prop="creatorName" header-align="center" align="center"/>
        <el-table-column :label="$t('logLogin.operation')" prop="operation" header-align="center" align="center">
          <template slot-scope="scope">
            {{ scope.row.operation === 0 ? $t('logLogin.operation0') : $t('logLogin.operation1') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('logLogin.status')" prop="status" sortable="custom" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" size="small" type="danger">{{ $t('logLogin.status0') }}</el-tag>
            <el-tag v-else-if="scope.row.status === 1" size="small" type="success">{{ $t('logLogin.status1') }}</el-tag>
            <el-tag v-else size="small" type="warning">{{ $t('logLogin.status2') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('logLogin.ip')" prop="ip" header-align="center" align="center"/>
        <el-table-column :label="$t('logLogin.userAgent')" :show-overflow-tooltip="true" prop="userAgent" header-align="center" align="center" width="150"/>
        <el-table-column :label="$t('logLogin.createDate')" prop="createDate" sortable="custom" header-align="center" align="center" width="180"/>
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
  name: 'LogLogin',
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/log/login/page',
        getDataListIsPage: true,
        exportURL: '/sys/log/login/export'
      },
      dataForm: {
        creatorName: '',
        status: ''
      }
    }
  }
}
</script>
