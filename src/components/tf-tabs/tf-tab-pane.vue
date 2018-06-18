<template>
  <transition name="tf-slide-fade">
    <div class="tf-tab-pane" v-show="show">
      <slot @openTab="openTab"></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "tf-tab-pane",
  props: {
    label: String,
    name: String,
    icon: String,
    closable: Boolean
  },
  data() {
    return {}
  },
  computed: {
    show() {
      return this.$parent.currentName === this.name
    }
  },
  watch: {
    label() {
      this.updateNav()
    },
    name() {
      this.updateNav()
    },
    icon() {
      this.updateNav()
    },
    closable() {
      this.updateNav()
    }
  },
  methods: {
    updateNav() {
      this.$parent.updateNav()
    }
  },
  mounted() {
    this.updateNav()
    this.$parent.updateActive(this.name)
  },
  destroyed() {
    this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    this.updateNav()
  }
}
</script>

<style lang="scss">
.tf-tab-pane {
  position: absolute;
  padding: 10px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
}

.tf-slide-fade-enter-active {
  transition: all .4s ease;
}

.tf-slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.tf-slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.tf-slide-fade-leave-to {
  opacity: 0;
}
</style>
