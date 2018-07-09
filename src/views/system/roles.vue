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
    <tf-routes-tree class="menu-tree" :menu-tree="menuTree" :default-checked-keys="['/guide/md-preview']">
      <h4>权限菜单</h4>
    </tf-routes-tree>
  </div>
</template>

<script>
import {menuTree} from '../../routes/index'

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
      menuTree: menuTree,
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
    },
    onTabShow () {
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
