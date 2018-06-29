<template>
  <section class="order-records">
    <section class="query-area">
      <tf-form inline labtf-width="90px" labtf-position="right" labtf-suffix="：" :model="condition">
        <tf-form-item label="订单号">
          <tf-input name="orderNumber" placeholder="订单号" :value="query.orderNumber"></tf-input>
        </tf-form-item>
        <tf-form-item label="客户ID">
          <tf-input v-model="condition.customerId" placeholder="客户ID"></tf-input>
        </tf-form-item>
        <tf-form-item label="客户名称">
          <tf-input v-model="condition.customerName" placeholder="客户名称"></tf-input>
        </tf-form-item>
        <tf-form-item label="客户单号">
          <tf-input v-model="condition.customerOrder" placeholder="客户单号"></tf-input>
        </tf-form-item>

      </tf-form>
      <tf-form inline labtf-width="90px" labtf-position="right" labtf-suffix="：">
        <tf-form-item label="下单时间">
          <tf-date-picker
            v-model="condition.orderTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['00:00:00', '23:59:59']"
            align="right">
          </tf-date-picker>
        </tf-form-item>
        <tf-form-item>
          <tf-button size="medium" type="primary" style="margin: 0 15px;" @click="queryData">查询</tf-button>
        </tf-form-item>
      </tf-form>
    </section>

    <section class="list-area">
      <tf-table ref="order-list" :columns="columns" :data="fetchData" :loading="loading" flex border></tf-table>
    </section>

    <tf-dialog title="订单明细" :visible.sync="dialogFormVisible">
      <tf-form>
        <tf-form-item label="活动名称">
          <tf-input auto-complete="off"></tf-input>
        </tf-form-item>
        <tf-form-item label="活动区域">
          <tf-select placeholder="请选择活动区域" value="">
            <tf-option label="区域一" value="shanghai"></tf-option>
            <tf-option label="区域二" value="beijing"></tf-option>
          </tf-select>
        </tf-form-item>
      </tf-form>
      <div slot="footer" class="dialog-footer">
        <tf-button size="small" @click="dialogFormVisible = false">取 消</tf-button>
        <tf-button size="small" type="primary" @click="dialogFormVisible = false">确 定</tf-button>
      </div>
    </tf-dialog>
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

    .tf-form--inline {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tf-input {
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
