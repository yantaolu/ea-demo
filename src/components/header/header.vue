<template>
  <div class="tf-header">
    <div class="page-logo">
      <slot name="logo"></slot>
    </div>
    <div class="header-container">
      <span class="slider-toggle" @click="toggleSlider">
        <i class="fa fa-sliders" aria-hidden="true"></i>
      </span>
      <div class="user-info">
        <div class="info-item messages">
          <tf-badge :value="200" :max="99" class="item">
            <i class="fa fa-envelope-o"></i>
          </tf-badge>
        </div>
        <div class="info-item notifications">
          <tf-badge :value="10" :max="99" class="item">
            <i class="fa fa-bell-o"></i>
          </tf-badge>
        </div>
        <div class="info-item tasks">
          <!--<tf-badge :value="0" :max="99" class="item">-->
          <i class="fa fa-flag-o"></i>
          <!--</tf-badge>-->
        </div>
        <div class="info-item login-user" @mouseenter="showItems = true" @mouseleave="showItems = false">
          <span class="head-portrait">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
          </span>
          <span class="user-name">鲁延涛</span>
          <transition name="tf-zoom-in-top">
            <div class="drop-down-items" v-show="showItems">
              <ul>
                <li><i class="fa fa-user" aria-hidden="true"></i>个人中心</li>
                <li><i class="fa fa-cog" aria-hidden="true"></i>设置</li>
                <li class="item-divider"></li>
                <li @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>退出登录</li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-header',
  props: {},
  data () {
    return {
      collapse: false,
      showItems: false
    }
  },
  methods: {
    toggleSlider () {
      this.collapse = !this.collapse
      this.$emit('toggleSlider', this.collapse)
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style lang="scss">
.tf-header {
  display: flex;
  justify-content: space-between;
  background: #3c8dbc;
  user-select: none;

  .page-logo {
    min-width: 6px;
    height: 100%;
    overflow: hidden;
    background-color: #367fa9;
    color: #ffffff;
    cursor: pointer;
  }

  .header-container {
    flex: auto;
    display: flex;
    justify-content: space-between;

    .slider-toggle {
      width: 50px;
      line-height: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s;
      color: #dddddd;

      &:not(:empty):hover {
        background: rgba(0, 0, 0, .2);
        color: #ffffff;
      }

      i.fa {
        font-size: 20px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .user-info {
    height: 50px;
    line-height: 50px;
    width: auto;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    padding-right: 20px;
    color: #dfdfdf;

    .info-item {
      padding: 0 20px;
      cursor: pointer;
      transition: all .5s;

      &:hover {
        background: rgba(0, 0, 0, .2);
        color: #ffffff;
      }

      .el-badge__content {
        top: 0;
        right: 0;
        font-size: 12px;
        transform: translate(60%, 60%);
        height: 16px;
        line-height: 16px;
        border: none;
        border-radius: 4px;
        background-color: #f39c12 !important;
        padding: 0 3px;
      }
    }

    .login-user {
      position: relative;
      /*transition: all .5s ease-in-out;*/

      span {
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
      }
      .head-portrait img {
        max-width: 40px;
        max-height: 40px;
        margin-right: 10px;
      }

      .drop-down-items {
        position: absolute;
        right: 0;
        top: 50px;
        z-index: 100;
        padding: 2px 0;

        ul {
          list-style: none;
          width: 120px;
          line-height: 28px;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, .15);
          background-color: #4898c5;
          border-radius: 2px;

          li {
            padding: 0 10px;
            color: #dddddd;

            &:hover {
              background-color: #3c8dbc;
              color: #ffffff;
            }

            &.item-divider {
              position: relative;
              &:after {
                content: '';
                display: block;
                background-color: #cccccc;
                height: 1px;
                margin: 0 -8px;
              }
              height: 1px;
              overflow: hidden;
              margin: 4px 0;
              line-height: 0;
            }
          }

          .fa {
            display: inline-block;
            vertical-align: middle;
            font-size: 18px;
            margin-right: 5px;
          }
        }
      }
    }

    .fa {
      font-size: 20px;
    }

  }
}

</style>
