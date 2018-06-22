<template>
  <section class="order-records">
    <section class="query-area">
      <el-form inline label-width="90px" label-position="right" label-suffix="：" :model="condition">
        <el-form-item label="订单号">
          <el-input name="orderNumber" placeholder="订单号" :value="query.orderNumber"></el-input>
        </el-form-item>
        <el-form-item label="客户ID">
          <el-input v-model="condition.customerId" placeholder="客户ID"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="condition.customerName" placeholder="客户名称"></el-input>
        </el-form-item>
        <el-form-item label="客户单号">
          <el-input v-model="condition.customerOrder" placeholder="客户单号"></el-input>
        </el-form-item>

      </el-form>
      <el-form inline label-width="90px" label-position="right" label-suffix="：">
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="condition.orderTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['00:00:00', '23:59:59']"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" style="margin: 0 15px;" @click="queryData">查询</el-button>
        </el-form-item>
      </el-form>
    </section>

    <section class="list-area">
      <tf-table ref="order-list" :columns="columns" :data="fetchData" :loading="loading" flex border></tf-table>
    </section>

    <el-dialog title="订单明细" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="活动名称">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select placeholder="请选择活动区域" value="">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import DateUtil from '../../utils/date-util.js'

export default {
  name: 'order-records',
  props: {
    query: Object
  },
  data () {
    return {
      condition: {
        orderNumber: '',
        customerId: '',
        customerName: '',
        customerOrder: '',
        orderTime: DateUtil.getOneWeek()
      },
      pickerOptions: DateUtil.getPickerOptions(),
      columns: [{
        type: 'index',
        label: 'No.',
        // hidden: true,
        renderCell (h, {row, column, $index}) {
          return `<span>${$index + 1}</span>`
        }
      }, {
        label: '合并',
        // hidden: true,
        columns: [{
          prop: 'title',
          label: '标题',
          renderCell: (h, {row, column, $index}) => {
            return (<span class="table-link" on-click={(event) => {
              this.dialogFormVisible = true
              event.preventDefault()
            }}>{row[column.property].substring(0, 8) + '...'}</span>)
          }
        }, {
          prop: 'desc',
          label: '描述'
        }]
      }],
      loading: false,
      dialogFormVisible: false
    }
  },
  computed: {
    timeDiff () {
      let orderTime = this.condition.orderTime
      if (orderTime && orderTime[0] && orderTime[1]) {
        return orderTime[1] - orderTime[0]
      }
      return 0
    }
  },
  watch: {
    timeDiff (val) {
      if (val > DateUtil.threeMonth) {
        let start = new Date(this.condition.orderTime[0])
        this.condition.orderTime.splice(1, 1, new Date(start.getTime() + DateUtil.threeMonth))
      }
    }
  },
  methods: {
    fetchData ({page, size, setData, setTotal}) {
      this.loading = true
      this.$ajax.get('api/news', {
        _start: (page - 1) * size,
        _limit: size
      }).then(d => {
        setTimeout(() => {
          this.loading = false
        }, 200)
        setData(d.data)
        setTotal(100)
      })
    },
    queryData () {
      console.log(this.condition)
      this.$refs['order-list'].reload()
    }
  },
  mounted () {
    // this.$ajax.post('api/1', {
    //   sss: 'ssss'
    // }).then(d => {
    //   console.log(d)
    // })
    this.condition.orderNumber = this.query.orderNumber || ''
  }
}
</script>

<style lang="scss">
.order-records {
  height: 100%;
  display: flex;
  flex-direction: column;
  .query-area {
    margin-top: 10px;
    border-bottom: 1px solid #dfdfdf;

    .el-form--inline {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .el-input {
      /*width: 130px;*/
    }
  }

  .list-area {
    padding-top: 15px;
    flex: auto;
    display: flex;
    flex-direction: column;
    .tf-table {
      height: 100%;
    }
    .table-link {
      color: #3a8ee6;
      cursor: pointer;
    }
  }
}
</style>
