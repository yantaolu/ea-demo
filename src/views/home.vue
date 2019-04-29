<template>
  <div style="height: 100%; display: flex; flex-direction: column;">
    <router-link to="/examples/records?orderNumber=50000000">router-link 打开订单查询页面</router-link>
    <div>
      <a href="#" @click.prevent="openTab">触发openTab打开标签页1</a>
    </div>
    <div>
      <a href="#" @click.prevent="routerPush">路由push打开标签页1</a>
    </div>
    <div>全局data：{{random}}</div>
    <ea-button @click="randomData" type="primary">改变data</ea-button>
    <ea-row>
      <ea-button authorityCode>默认按钮</ea-button>
      <ea-button size="medium">中等button</ea-button>
      <ea-button size="small">小型按钮</ea-button>
      <ea-button size="mini">超小按钮</ea-button>
    </ea-row>
    <ea-button-group>
      <ea-button>111</ea-button>
      <ea-button>222</ea-button>
      <ea-button>333</ea-button>
    </ea-button-group>
    <ea-table ref="eaTable" :height="'300px'" :max-height="400" :columns="columns" :pagination="false" :data="fetchData" border></ea-table>
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
      this.$parent.openTab('/examples/records', {orderNumber: 9999})
    },
    routerPush () {
      this.$router.push({
        path: '/examples/records',
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
    this.$refs.eaTable.clearSelection()
  }
}
</script>

<style lang="scss">

</style>
