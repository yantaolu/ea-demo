# 标签页系统

> 适用于以标签页方式打开单页，能够在同一时间内快速高效的切换标签

## 导航菜单

> 使用 iView 组件实现，请参考https://www.iviewui.com/components/menu

## 标签页

> 使用自定义组件实现，组件@src/views/index/tabs/components/tabs.vue
>
> > 主要使用 vue 动态组件、异步加载技术实现
> >
> > 动态组件：
> >
> > https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6
> >
> > 动态组件&异步组件
> >
> > https://cn.vuejs.org/v2/guide/components-dynamic-async.html

## 标签页内操作

> 获取标签页查询参数，用于查询等操作

```javascript
// 第一种方式，从vue路由中获取查询参数
export default {
  mounted() {
    console.log('查询参数：', this.$route.query)
  }
}


// 第二种方式，从props中获取
export default {
  props: ['query'],
  mounted() {
    console.log('查询参数：', this.query)
  }
}
```

> 标签页中打开其他标签页

```html
// 第一种方式，链接路由
// path 路由路径
// query 查询参数，转换为name=xx&age=100这种字符串形式

<router-link to="/[path]?[query]">打开标签页</router-link>
// 例如
<router-link to="/index/async-tab1?id=5">打开标签页1</router-link>

// 第二种方式，在组建中触发openTab事件，参数分别为 path 以及 query 对象
export default {
  methods: {
    openTab() {
      this.$emit('openTab', '/async-tab1', {id: 9999})
    }
  }
}

// 第三种方式，在组件中调用路由方法
export default {
  methods: {
    routerPush() {
      this.$router.push({
        path: '/async-tab1'
        query: {
          id : 1000
        }
      })
    }
  }
}
```
