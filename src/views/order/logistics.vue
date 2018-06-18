<template>
  <div class="logistics-tracking">
    <div class="query-area">
      <!--<div class="search-panel">
        <el-input placeholder="车牌号" size="small"></el-input>
        <el-select placeholder="状态" size="small" v-model="condition.status">
          <el-option value="离线">离线</el-option>
          <el-option value="报警">报警</el-option>
          <el-option value="行驶">行驶</el-option>
          <el-option value="停车">停车</el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" size="small"></el-button>
      </div>-->
      <div class="list-panel">
        <ul>
          <li><i class="fa fa-car status-icon running"></i>浙A11111</li>
          <li><i class="fa fa-car status-icon running"></i>浙A22222</li>
          <li><i class="fa fa-car status-icon running"></i>浙A33333</li>
          <li><i class="fa fa-car status-icon running"></i>浙A44444</li>
          <li><i class="fa fa-car status-icon running"></i>浙A55555</li>
          <li><i class="fa fa-car status-icon running"></i>浙A66666</li>
          <li><i class="fa fa-car status-icon running"></i>浙A77777</li>
          <li class="active"><i class="fa fa-car status-icon running"></i>浙A88888</li>
          <li><i class="fa fa-car status-icon running"></i>浙A99999</li>
          <li><i class="fa fa-car status-icon running"></i>浙A00000</li>
        </ul>
      </div>
      <div class="status-panel">
        <span><i class="fa fa-times-circle status-icon offline"></i>离线</span>
        <span><i class="fa fa-exclamation-circle status-icon warning"></i>报警</span>
        <span><i class="fa fa-car status-icon running"></i>行驶</span>
        <span><i class="fa fa-product-hunt status-icon stop"></i>停车</span>
      </div>
    </div>
    <div class="display-area">
      <div class="vehicle-state">
        <span class="license-plate-number">浙A88888</span>
        <span>运输时间：2018.06.17 22:00:00 - 2018.06.18 22:00:00</span>
      </div>
      <div id="allmap" class="allmap" ref="allmap"></div>
      <!--<div class="locus-records">
        <tf-table size="mini" :columns="columns" :data="[]" border height="200" max-height="200" :show-pagination="false"
                  empty-text="暂无车辆数据"></tf-table>
      </div>-->
    </div>
  </div>
</template>

<script>
import BMap from 'bmap'
import BMapLib from 'bmapLib'

export default {
  name: 'logistics-tracking',
  data () {
    return {
      columns: [{
        type: 'index',
        label: '序号'
      }, {
        prop: 'dateTime',
        label: '上报时间'
      }, {
        prop: 'speed',
        label: 'GPS速度（公里/时）'
      }, {
        prop: 'location',
        label: '当前位置'
      }, {
        prop: 'memo',
        label: '备注'
      }],
      condition: {
        status: ''

      }
    }
  },
  mounted () {
    this.drawLocus()
  },
  methods: {
    getMapElement () {
      return this.$el.querySelector('#allmap')
    },
    initMap () {
      // 百度地图API功能
      let map = new BMap.Map(this.getMapElement())
      map.enableScrollWheelZoom()

      let polyline = new BMap.Polyline([
        new BMap.Point(116.399, 39.910),
        new BMap.Point(116.405, 39.920),
        new BMap.Point(116.423493, 39.907445)
      ], {strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5}) // 创建折线
      map.addOverlay(polyline) // 增加折线

      let polygon = new BMap.Polygon([
        new BMap.Point(116.387112, 39.920977),
        new BMap.Point(116.385243, 39.913063),
        new BMap.Point(116.394226, 39.917988),
        new BMap.Point(116.401772, 39.921364),
        new BMap.Point(116.41248, 39.927893)
      ], {strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5}) // 创建多边形
      map.addOverlay(polygon) // 增加多边形
    },
    drawLocus () {
      let map = new BMap.Map(this.getMapElement())
      map.enableScrollWheelZoom()
      // eslint-disable-next-line
      let lushu = null
      // 实例化一个驾车导航用来生成路线
      let drv = new BMap.DrivingRoute('北京', {
        onSearchComplete: function (res) {
          if (drv.getStatus() === 'BMAP_STATUS_SUCCESS') {
            let plan = res.getPlan(0)
            let arrPois = []
            for (var j = 0; j < plan.getNumRoutes(); j++) {
              let route = plan.getRoute(j)
              arrPois = arrPois.concat(route.getPath())
            }
            map.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#3a5aff'}))
            map.setViewport(arrPois)

            lushu = new BMapLib.LuShu(map, arrPois, {
              defaultContent: '', // "从天安门到百度大厦"
              autoView: true, // 是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
              icon: new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52, 26), {anchor: new BMap.Size(27, 13)}),
              speed: 4500,
              enableRotation: true, // 是否设置marker随着道路的走向进行旋转
              landmarkPois: [
                {lng: 116.314782, lat: 39.913508, html: '加油站', pauseTime: 2},
                {lng: 116.315391, lat: 39.964429, html: '高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>', pauseTime: 3},
                {
                  lng: 116.381476,
                  lat: 39.974073,
                  html: '肯德基早餐<div><img src="http://ishouji.baidu.com/resource/images/map/show_pic04.gif"/></div>',
                  pauseTime: 2
                }
              ]
            })
            // lushu.start()
          }
        }
      })
      drv.search('北京', '天津')
    }
  }
}
</script>

<style lang="scss">
.logistics-tracking {
  height: 100%;
  display: flex;

  .query-area {
    width: 240px;
    min-width: 240px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;

    .search-panel {
      display: flex;
      padding-bottom: 10px;
      border-bottom: 1px solid #dfdfdf;
      .el-input, .el-select {
        margin-right: 10px;
      }
    }

    .list-panel {
      flex: auto;
      overflow: auto;
      margin-top: 10px;

      li {
        line-height: 30px;
        font-size: 14px;
        padding-left: 10px;
        cursor: pointer;
        &:hover, &.active {
          background-color: #f3f3f3;
        }
        &.active {
          color: #2d8cf0;
        }
      }
    }

    .fa.status-icon {
      margin-right: 5px;
      font-size: 17px;
      display: inline-block;
      vertical-align: middle;
      margin-top: -2px;
      &.running, &.stop {
        font-size: 15px;
      }
      &.offline {
        color: #999999;
      }
      &.warning {
        color: #f5c20b;
      }
      &.running {
        color: #5daf34;
      }
      &.stop {
        color: #7bbcff;
      }
    }

    .status-panel {
      height: 30px;
      line-height: 30px;
      /*padding: 0 10px;*/
      display: flex;
      justify-content: space-between;
      color: #666666;
      user-select: none;
    }
  }

  .display-area {
    flex: auto;
    display: flex;
    flex-direction: column;
    position: relative;

    .vehicle-state {
      position: absolute;
      height: 50px;
      line-height: 50px;
      border-radius: 4px;
      background-color: #ffffff;
      z-index: 100;
      padding: 0 20px;
      left: 5px;
      top: 5px;
      box-shadow: 1px 1px 5px #dfdfdf;
      user-select: none;

      .license-plate-number {
        font-size: 14px;
        color: #3a8ee6;
        margin-right: 20px;
      }
    }

    .allmap {
      flex: auto;
    }

    .locus-records {
      /*margin-top: 10px;*/
      /*height: 200px;*/
      height: 0;
    }
  }

}
</style>
<style>
.anchorBL {
  display: none !important;
}
</style>
