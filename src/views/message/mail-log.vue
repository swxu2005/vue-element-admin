<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-message__mail-log">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.templateId" :placeholder="$t('mail.templateId')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.mailTo" :placeholder="$t('mail.mailTo')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="dataForm.status" :placeholder="$t('mail.status')" clearable>
            <el-option :label="$t('mail.status1')" :value="1"/>
            <el-option :label="$t('mail.status0')" :value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
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
        <el-table-column :label="$t('mail.templateId')" prop="templateId" sortable="custom" header-align="center" align="center"/>
        <el-table-column :label="$t('mail.mailFrom')" prop="mailFrom" header-align="center" align="center"/>
        <el-table-column :label="$t('mail.mailTo')" prop="mailTo" header-align="center" align="center"/>
        <el-table-column :label="$t('mail.mailCc')" prop="mailCc" header-align="center" align="center"/>
        <el-table-column :label="$t('mail.subject')" prop="subject" header-align="center" align="center"/>
        <el-table-column :label="$t('mail.status')" prop="status" sortable="custom" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1" size="small">{{ $t('mail.status1') }}</el-tag>
            <el-tag v-else size="small" type="danger">{{ $t('mail.status0') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('mail.createDate')" prop="createDate" sortable="custom" header-align="center" align="center" width="180"/>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
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
  name: 'MailLog',
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/maillog/page',
        getDataListIsPage: true,
        deleteURL: '/sys/maillog',
        deleteIsBatch: true
      },
      dataForm: {
        templateId: '',
        mailTo: '',
        status: null
      }
    }
  }
}
</script>
