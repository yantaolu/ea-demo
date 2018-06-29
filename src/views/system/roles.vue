<template>
  <div class="role-management">
    <div class="role-list">
      <tf-table :columns="columns" :data="roles" :pagination="false" flex border>
        <div class="tool-bar" slot-scope="selection">
          <tf-button type="primary" @click="createRole(selection)">新增角色</tf-button>
          <tf-button type="primary" @click="editRole(selection)">编辑角色</tf-button>
          <tf-button type="primary" @click="deleteRole(selection)">删除角色</tf-button>
        </div>
        createRole
      </tf-table>
    </div>
    <div class="menu-tree">
      <h4>角色菜单</h4>
      <tf-tree
        :data="data2"
        show-checkbox
        node-key="path"
        default-expand-all
        :props="defaultProps">
      </tf-tree>

    </div>
  </div>
</template>

<script>
import {menuTree} from '../../routes/index'

console.log(menuTree)

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
      }, {
        roleId: 'guest',
        roleName: '访客'
      }],
      data2: [menuTree],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    createRole () {

    },
    editRole ({selection, currentRow, oldCurrentRow}) {
      console.log(selection, currentRow, oldCurrentRow)
    },
    deleteRole ({selection, currentRow, oldCurrentRow}) {
      console.log(selection, currentRow, oldCurrentRow)
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
