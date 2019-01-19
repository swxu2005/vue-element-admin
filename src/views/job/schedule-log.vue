<template>
  <el-dialog :visible.sync="visible" :title="$t('schedule.log')" :close-on-click-modal="false" :close-on-press-escape="false" width="75%">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.jobId" :placeholder="$t('schedule.jobId')" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{ $t('query') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      height="460"
      style="width: 100%;"
      @sort-change="dataListSortChangeHandle">
      <el-table-column :label="$t('schedule.jobId')" prop="jobId" header-align="center" align="center" width="80"/>
      <el-table-column :label="$t('schedule.beanName')" prop="beanName" header-align="center" align="center"/>
      <el-table-column :label="$t('schedule.params')" prop="params" header-align="center" align="center"/>
      <el-table-column :label="$t('schedule.status')" prop="status" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small">{{ $t('schedule.statusLog1') }}</el-tag>
          <el-tag v-else type="danger" size="small" style="cursor: pointer;" @click.native="showErrorInfo(scope.row.id)">{{ $t('schedule.statusLog0') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('schedule.times')" prop="times" header-align="center" align="center"/>
      <el-table-column :label="$t('schedule.createDate')" prop="createDate" header-align="center" align="center" width="180"/>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"/>
  </el-dialog>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      visible: false,
      mixinViewModuleOptions: {
        getDataListURL: '/sys/scheduleLog/page',
        getDataListIsPage: true
      },
      dataForm: {
        jobId: ''
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.getDataList()
    },
    // 失败信息
    showErrorInfo(id) {
      this.$http.get(`/sys/scheduleLog/${id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$alert(res.data.error)
      }).catch(() => {})
    }
  }
}
</script>
