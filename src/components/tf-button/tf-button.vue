<template>
  <el-button
    :size="size"
    :type="type"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
import {Button} from 'element-ui'

const boolean = (value = false) => {
  return {
    type: Boolean,
    default: value
  }
}
export default {
  name: 'tf-button',
  comments: {[Button.name]: Button},
  props: {
    size: {
      type: String,
      default: 'small'
    },
    type: String,
    plain: boolean(),
    round: boolean(),
    circle: boolean(),
    loading: boolean(),
    disabled: boolean(),
    icon: String,
    autofocus: boolean(),
    nativeType: {
      type: String,
      default: 'button'
    },
    authorityCode: String
  },
  mounted() {
    this.$route.path
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
