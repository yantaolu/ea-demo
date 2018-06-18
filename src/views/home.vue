<template>
  <div style="height: 100%; display: flex; flex-direction: column;">
    <router-link to="/order/records?orderNumber=50000000">router-link 打开订单查询页面</router-link>
    <div>
      <a href="#" @click.prevent="openTab">触发openTab打开标签页1</a>
    </div>
    <div>
      <a href="#" @click.prevent="routerPush">路由push打开标签页1</a>
    </div>
    <div>全局data：{{random}}</div>
    <el-button @click="randomData" type="primary">改变data</el-button>
    <el-row>
      <tf-button authorityCode>默认按钮</tf-button>
      <tf-button size="medium">中等button</tf-button>
      <tf-button size="small">小型按钮</tf-button>
      <tf-button size="mini">超小按钮</tf-button>
    </el-row>
    <tf-button-group>
      <tf-button>111</tf-button>
      <tf-button>222</tf-button>
      <tf-button>333</tf-button>
    </tf-button-group>
    <tf-table ref="tfTable" :height="'300px'" :max-height="400" :columns="columns" :pagination="false" :data="fetchData" border></tf-table>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      columns: [{
        type: 'index',
        label: 'No.',
        // hidden: true,
        renderCell ({row, column, $index}) {
          return `<span>${$index + 1}</span>`
        }
      }, {
        label: '合并',
        // hidden: true,
        columns: [{
          prop: 'title',
          label: '标题',
          renderCell (h, {row, column, $index}) {
            return row[column.property].substring(0, 8) + '...'
          }
        }, {
          prop: 'desc',
          label: '描述'
        }]
      }]
    }
  },
  computed: {
    random () {
      return this.$store.state.random
    },
    mockData () {
      let data = []
      for (let i = 0; i < 100; i++) {
        data.push({
          index: i
        })
      }
      return data
    }
  },
  methods: {
    openTab () {
      this.$emit('openTab', '/order/records', {orderNumber: 9999})
    },
    routerPush () {
      this.$router.push({
        path: '/order/records',
        query: {
          orderNumber: 1000
        }
      })
    },
    randomData () {
      let random = Math.random()
      this.$store.dispatch('setData', {random})
    },
    fetchData ({page, size, setData, setTotal}) {
      // this.$ajax.get('api/news', {
      //   _start: (page - 1) * size,
      //   _limit: size
      // }).then(d => {
      setData([])
      setTotal(100)
      // })
    }
  },
  mounted () {
    this.$refs.tfTable.clearSelection()
  }
}
</script>

<style lang="scss">

</style>
