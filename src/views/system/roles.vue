<template>
  <div class="role-management">
    <tf-integrated-page ref="page" class="role-list" :columns="columns" :buttons="buttons" :conditions="conditions" :fields="fields" :condition-size="3"
                        @fetch-data="fetchData"></tf-integrated-page>
    <tf-routes-tree ref="menu-tree" class="menu-tree" :menu-tree="menuTree" :default-checked-keys="defaultCheckedKeys">
      <h4>权限菜单</h4>
    </tf-routes-tree>
  </div>
</template>

<script>
import {menuTree} from '../../routes/index'
import {ValidateRules} from 'tf-components'

let menus = {}

const parseMenu = (menu) => {
  if (!menu.children) {
    menus[menu.path] = menu
  } else {
    menu.children.forEach(child => {
      parseMenu(child)
    })
  }
}
parseMenu(menuTree)

export default {
  name: 'role-management',
  data () {
    return {
      columns: [{
        type: 'index',
        label: '序号'
      }, {
        prop: 'roleId',
        label: '角色编号'
      }, {
        prop: 'roleName',
        label: '角色名称'
      }, {
        prop: 'memo',
        label: '备注'
      }],
      roles: [{
        roleId: 'admin',
        roleName: '系统管理员'
      }, {
        roleId: 'visitor',
        roleName: '访客'
      }],
      conditions: [{
        name: 'roleId',
        text: '管理员编号'
      }, {
        name: 'roleName',
        text: '管理员名称'
      }],
      buttons: {
        add: {
          text: '新增角色',
          submit: (role) => {
            return new Promise((resolve, reject) => {
              this.roles.push(role)
              this.$refs.page.refresh()
              resolve()
            })
          }
        },
        edit: {
          text: '编辑角色',
          submit: (role) => {
            return new Promise((resolve, reject) => {
              let index = this.roles.findIndex(r => r.roleId === role.roleId)
              if (index >= 0) {
                this.roles.splice(index, 1, role)
                this.$refs.page.refresh()
                resolve()
              } else {
                reject(new Error('该角色不存在，不能更新'))
              }
            })
          }
        },
        delete: {
          text: '删除角色',
          submit: (ids) => {
            ids.forEach(id => {
              let index = this.roles.findIndex(role => role.roleId === id)
              index >= 0 && this.roles.splice(index, 1)
              this.$refs.page.refresh()
            })
          },
          key: 'roleId'
        },
        view: {
          text: '查看详情'
        }
      },
      fields: [
        {type: 'input', text: '角色编号', name: 'roleId', rules: [ValidateRules.required('请输入角色编号'), ValidateRules.length(4, 8)], edit: false},
        {type: 'input', text: '角色名称', name: 'roleName', required: true},
        {type: 'textarea', text: '备注', name: 'memo'}
      ],
      menuTree: menuTree,
      defaultCheckedKeys: []
    }
  },
  computed: {
    rootRoutes () {
      return this.$store.getters.rootRoutes
    }
  },
  watch: {
    rootRoutes (arr) {
      arr.forEach(item => {
        if (item.buttons) {
          item.buttons.forEach(button => {
            menus[item.path].buttons[button].checked = true
          })
        }
        this.defaultCheckedKeys.push(item.path)
      })
    }
  },
  mounted () {
    this.$on('tabShow', function () {
    })
    this.rootRoutes.forEach(item => {
      if (item.buttons) {
        item.buttons.forEach(button => {
          menus[item.path].buttons[button].checked = true
        })
      }
      this.defaultCheckedKeys.push(item.path)
    })
  },
  methods: {
    fetchData ({setData, setTotal, params}) {
      let data = [...this.roles]
      if (params.roleId) {
        data = data.filter(role => role.roleId === params.roleId)
      }
      if (params.roleName) {
        data = data.filter(role => role.roleName === params.roleName)
      }
      setData(data)
      setTotal(data.length)
    }
  }
}
</script>

<style lang="scss">
.role-management {
  height: 100%;
  display: flex;
  .role-list {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding-right: 20px;

    .tool-bar {
      padding: 0 0 10px 0;
    }
  }
  .menu-tree {
    flex: auto;
  }
}
</style>
