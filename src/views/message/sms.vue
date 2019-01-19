<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-message__sms">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.mobile" :placeholder="$t('sms.mobile')" clearable/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="dataForm.status" :placeholder="$t('sms.status')" clearable>
            <el-option :label="$t('sms.status1')" :value="1"/>
            <el-option :label="$t('sms.status0')" :value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="configHandle()">{{ $t('sms.config') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendHandle()">{{ $t('sms.send') }}</el-button>
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
        <el-table-column :label="$t('sms.platform')" prop="platform" sortable="custom" header-align="center" align="center">
          <template slot-scope="scope">
            {{ scope.row.platform === 1 ? $t('sms.platform1') : scope.row.platform === 2 ? $t('sms.platform2') : '' }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('sms.mobile')" prop="mobile" header-align="center" align="center" width="120"/>
        <el-table-column :label="$t('sms.params1')" prop="params1" header-align="center" align="center"/>
        <el-table-column :label="$t('sms.params2')" prop="params2" header-align="center" align="center"/>
        <el-table-column :label="$t('sms.params3')" prop="params3" header-align="center" align="center"/>
        <el-table-column :label="$t('sms.params4')" prop="params4" header-align="center" align="center"/>
        <el-table-column :label="$t('sms.status')" prop="status" sortable="custom" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1" size="small">{{ $t('sms.status1') }}</el-tag>
            <el-tag v-else size="small" type="danger">{{ $t('sms.status0') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('sms.createDate')" prop="createDate" sortable="custom" header-align="center" align="center" width="180"/>
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
      <!-- 弹窗, 短信配置 -->
      <config v-if="configVisible" ref="config"/>
      <!-- 弹窗, 发送短信 -->
      <send v-if="sendVisible" ref="send" @refreshDataList="getDataList"/>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import Config from './sms-config'
import Send from './sms-send'
export default {
  name: 'SmsManage',
  components: {
    Config,
    Send
  },
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/sms/page',
        getDataListIsPage: true,
        deleteURL: '/sys/sms',
        deleteIsBatch: true
      },
      dataForm: {
        mobile: '',
        status: null
      },
      configVisible: false,
      sendVisible: false
    }
  },
  methods: {
    // 短信配置
    configHandle() {
      this.configVisible = true
      this.$nextTick(() => {
        this.$refs.config.init()
      })
    },
    // 发送短信
    sendHandle() {
      this.sendVisible = true
      this.$nextTick(() => {
        this.$refs.send.init()
      })
    }
  }
}
</script>
