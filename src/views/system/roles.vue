<template>
  <div class="role-management">
    <div class="role-list">
      <tf-table :columns="columns" :data="roles" :pagination="false" flex border>
        <div class="tool-bar" slot-scope="selection">
          <tf-button type="primary" authority-code="add-role" @click="createRole(selection)">新增角色</tf-button>
          <tf-button type="primary" authority-code="edit-role" @click="editRole(selection)">编辑角色</tf-button>
          <tf-button type="primary" authority-code="delete-role" @click="deleteRole(selection)">删除角色</tf-button>
        </div>
      </tf-table>
    </div>
    <tf-routes-tree ref="menu-tree" class="menu-tree" :menu-tree="menuTree" :default-checked-keys="defaultCheckedKeys">
      <h4>权限菜单</h4>
    </tf-routes-tree>
  </div>
</template>

<script>
import {menuTree} from '../../routes/index'

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
        label: '编号'
      }, {
        prop: 'roleName',
        label: '名称'
      }, {
        prop: 'memo',
        label: '备注'
      }],
      roles: [{
        roleId: 'admin',
        roleName: '系统管理员'
      }],
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
    createRole () {

    },
    editRole ({selection, currentRow, oldCurrentRow}) {
      console.log(selection, currentRow, oldCurrentRow)
    },
    deleteRole ({selection, currentRow, oldCurrentRow}) {
      console.log(selection, currentRow, oldCurrentRow)
    },
    onTabShow () {
    },
    openTab () {
      this.$parent.openTab('/logs', {}, false)
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
