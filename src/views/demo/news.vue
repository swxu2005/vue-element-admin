<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-demo__news">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.title" :placeholder="$t('news.title')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="daterange"
            :range-separator="$t('datePicker.range')"
            :start-placeholder="$t('datePicker.start')"
            :end-placeholder="$t('datePicker.end')"
            type="daterange"
            value-format="yyyy-MM-dd"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
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
        <el-table-column :label="$t('news.title')" prop="title" header-align="center" align="center"/>
        <el-table-column :label="$t('news.pubDate')" prop="pubDate" sortable="custom" header-align="center" align="center" width="180"/>
        <el-table-column :label="$t('news.createDate')" prop="createDate" sortable="custom" header-align="center" align="center" width="180"/>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
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
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './news-add-or-update'
export default {
  name: 'NewsManage',
  components: {
    AddOrUpdate
  },
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/demo/news/page',
        getDataListIsPage: true,
        deleteURL: '/demo/news',
        deleteIsBatch: true
      },
      daterange: null,
      dataForm: {
        title: '',
        startDate: '',
        endDate: ''
      }
    }
  },
  watch: {
    daterange(val) {
      this.dataForm.startDate = val[0]
      this.dataForm.endDate = val[1]
    }
  }
}
</script>
