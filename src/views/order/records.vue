<template>
  <section class="order-records">
    <ea-query-conditions :conditions="conditions" @query="queryData"></ea-query-conditions>

    <ea-table ref="order-list" :columns="columns" :data="fetchData" :loading="loading" flex border></ea-table>

    <ea-dialog title="订单明细" :visible.sync="dialogFormVisible">
      <ea-form>
        <ea-form-item label="活动名称">
          <ea-input auto-complete="off"></ea-input>
        </ea-form-item>
        <ea-form-item label="活动区域">
          <ea-select placeholder="请选择活动区域" value="">
            <ea-option label="区域一" value="shanghai"></ea-option>
            <ea-option label="区域二" value="beijing"></ea-option>
          </ea-select>
        </ea-form-item>
      </ea-form>
      <div slot="footer" class="dialog-footer">
        <ea-button size="small" @click="dialogFormVisible = false">取 消</ea-button>
        <ea-button size="small" type="primary" @click="dialogFormVisible = false">确 定</ea-button>
      </div>
    </ea-dialog>
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
      conditions: [
        {text: '订单号', name: 'orderNumber', default: this.query.orderNumber},
        {text: '客户ID', name: 'customerId'},
        {text: '客户名称', name: 'customerName'},
        {text: '客户单号', name: 'customerOrder'},
        {type: 'date', dateType: 'datetime', text: '下单时间', name: 'orderTime', range: true}
      ],
      condition: {},
      pickerOptions: DateUtil.getPickerOptions(),
      columns: [{
        type: 'index',
        label: 'No.',
        // hidden: true,
        renderCell (h, {row, column, $index}) {
          return (<span>{$index + 1}</span>)
        }
      }, {
        label: '合并',
        // hidden: true,
        columns: [{
          prop: 'title',
          label: '标题',
          renderHeader () {
            return (<ea-input></ea-input>)
          },
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
    queryData (params) {
      this.condition = {...params}
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
}
</style>
