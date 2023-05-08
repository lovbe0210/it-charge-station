<template>
  <am-loading :loading="loading">
    <div class="container">
      <div class="header">
        <search v-model="value" @search="handleSearch" size="large" placeholder="请输入您的位置查询"
          enter-button/>
      </div>
      <div class="body">
        <div class="list">
          <div v-bind:class="['item', { active: active === index }]" v-for="(item, index) in data"
            :key="index" @click="handleItemClick(item, index)">
            <div class="title">{{ index + 1 }}. {{ item.title }}</div>
            <div class="address">{{ item.address }}</div>
          </div>
        </div>
        <div id="map"></div>
      </div>
    </div>
  </am-loading>
</template>

<script>
  import {Input} from "ant-design-vue";

  const {Search} = Input;
  const BMAP_AK = "Yba48wtEeNXMmB3Vsr3FfFOeTtKvpaOp";

  export default {
    name: "MapModal",
    data() {
      return {
        data: [],
        value: "",
        active: -1,
        loading: true,
        // 百度地图使用script引入，不支持ts，api比较多，先不未百度api定义类型。也可以尝试使用其它对它封装好的开源库，但是好像支持百度地图2.0的api
        BMap: null,
        map: null,
        local: null
      }
    },
    components: {
      // Space,
      // Input,
      Search
      // Button,
    },

    mounted() {
      const recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute(
        "src",
        `//api.map.baidu.com/getscript?v=3.0&ak=${BMAP_AK}&services=&t=20200109192240`
      );
      document.head.appendChild(recaptchaScript);
      recaptchaScript.onload = () => {
        this.BMap = window.BMap;
        this.loading = false;
        this.initBMap();
      };
    },
    methods: {
      initBMap() {
        const BMap = this.BMap;
        this.map = new BMap.Map("map");
        const point = new BMap.Point(116.404, 39.915);
        this.map.centerAndZoom(point, 15);
        this.map.enableScrollWheelZoom(true);

        const myCity = new BMap.LocalCity();
        myCity.get((result) => {
          const cityName = result.name;
          this.map.setCenter(cityName);
        });
        this.local = new BMap.LocalSearch(this.map, {
          renderOptions: {map: this.map, selectFirstResult: false},
          onSearchComplete: (results) => {
            // 判断状态是否正确
            if (this.local.getStatus() === window.BMAP_STATUS_SUCCESS) {
              this.active = -1;
              if (this.onCahnge) this.onCahnge(null);
              const data = [];
              for (var i = 0; i < results.getCurrentNumPois(); i++) {
                const result = results.getPoi(i);
                data.push({
                  title: result.title,
                  address: result.address,
                  url: result.url,
                  province: result.province,
                  city: result.city,
                  point: {
                    lat: result.point.lat,
                    lng: result.point.lng
                  },
                  staticUrl: `https://api.map.baidu.com/staticimage/v2?ak=${BMAP_AK}&mcode=666666&center=${result.point.lng},${result.point.lat}&markers=${result.point.lng},${result.point.lat}&width=440&height=160&zoom=11`
                });
              }
              this.data = data;
              setTimeout(() => {
                this.map.closeInfoWindow();
              }, 50);
            }
          }
        });
      },

      handleSearch() {
        if (!this.value) {
          this.data = [];
        }
        if (this.local) this.local.search(this.value);
      },

      handleItemClick(item, index) {
        this.map.openInfoWindow(
          new this.BMap.InfoWindow(item.address, {
            title: item.title,
            offset: {
              width: 0,
              height: -24
            }
          }),
          new this.BMap.Point(item.point.lng, item.point.lat)
        );
        this.active = index;
        if (this.onCahnge) this.onCahnge(item);
      }
    }

  }
</script>
<style lang="less">
  .container {
    width: 100%;

    .header {
      margin-bottom: 24px;
    }

    .body {
      display: flex;
      justify-content: space-between;
      border: 1px solid #e3e4e5;
      border-radius: 2px;
    }

    .list {
      max-height: 400px;
      overflow: auto;
      border-right: 1px solid #e3e4e5;
    }

    .item {
      padding: 10px 10px 12px;
      cursor: pointer;
      border-bottom: 1px solid #e3e4e5;

      &.active {
        background-color: #f6f7f8;
      }

      .title {
        font-size: 18px;
        color: #353535;
      }
    }
  }

  #map {
    height: 400px;
    width: 100%;
  }
</style>
