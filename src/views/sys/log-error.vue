<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__log-error">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border style="width: 100%;" @sort-change="dataListSortChangeHandle">
        <el-table-column :label="$t('logError.requestUri')" prop="requestUri" header-align="center" align="center"/>
        <el-table-column :label="$t('logError.requestMethod')" prop="requestMethod" header-align="center" align="center"/>
        <el-table-column :label="$t('logError.requestParams')" :show-overflow-tooltip="true" prop="requestParams" header-align="center" align="center" width="150"/>
        <el-table-column :label="$t('logError.ip')" prop="ip" header-align="center" align="center"/>
        <el-table-column :label="$t('logError.userAgent')" :show-overflow-tooltip="true" prop="userAgent" header-align="center" align="center" width="150"/>
        <el-table-column :label="$t('logError.createDate')" prop="createDate" sortable="custom" header-align="center" align="center" width="180"/>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="infoHandle(scope.row.errorInfo)">{{ $t('logError.errorInfo') }}</el-button>
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
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
export default {
  name: 'LogError',
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/log/error/page',
        getDataListIsPage: true,
        exportURL: '/sys/log/error/export'
      }
    }
  },
  methods: {
    // 异常信息
    infoHandle(info) {
      this.$alert(info, this.$t('logError.errorInfo'), {
        customClass: 'mod-sys__log-error-view-info'
      })
    }
  }
}
</script>

<style lang="scss">
.mod-sys__log-error {
  &-view-info {
    width: 80%;
  }
}
</style>
