<template>
  <el-button-group>
    <slot></slot>
  </el-button-group>
</template>

<script>
import {ButtonGroup} from 'element-ui'

export default {
  name: 'tf-button-group',
  components: {[ButtonGroup.name]: ButtonGroup}
}
</script>
