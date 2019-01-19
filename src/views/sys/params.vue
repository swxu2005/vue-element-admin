<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__params">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.paramCode" :placeholder="$t('params.paramCode')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('sys:params:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('sys:params:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border style="width: 100%;" @selection-change="dataListSelectionChangeHandle">
        <el-table-column type="selection" header-align="center" align="center" width="50"/>
        <el-table-column :label="$t('params.paramCode')" prop="paramCode" header-align="center" align="center"/>
        <el-table-column :label="$t('params.paramValue')" prop="paramValue" header-align="center" align="center"/>
        <el-table-column :label="$t('params.remark')" prop="remark" header-align="center" align="center"/>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('sys:params:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
            <el-button v-if="$hasPermission('sys:params:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
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
import AddOrUpdate from './params-add-or-update'
export default {
  name: 'ParamsManage',
  components: {
    AddOrUpdate
  },
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/params/page',
        getDataListIsPage: true,
        deleteURL: '/sys/params',
        deleteIsBatch: true
      },
      dataForm: {
        paramCode: ''
      }
    }
  }
}
</script>
