<template>
  <b-container class="index">
    <Header/>
    <div class="box">
      <div class="layout-module_dashboardMenu">
        <div class="wrap">
          <div class="nav">
            <div class="btn">
              <div class="btn-item">
              </div>
              <div class="btn-item">
              </div>
              <div class="btn-item">
              </div>
            </div>
            <div class="icon">
              <div class="icon-img">
                <img :src="require('@/assets/avatar/01.jpg')" alt="" style="width: 60px">
              </div>
              <div class="icon-con">
                <p>Lovbe0210</p>
                <h2>rongyanjusou</h2>
              </div>
            </div>
            <div class="line"></div>
            <div class="title">
              <p>Menu 6</p>
            </div>
            <div class="menu">
              <div class="item">
                <div class="light"></div>
                <div class="licon">
                  <span class="iconfont icon-setting"></span>
                </div>
                <div class="con">menu1</div>
                <div class="ricon"></div>
              </div>
            </div>
            <div class="line"></div>
            <div class="title">
              <p>Server 6</p>
            </div>
            <div class="server">
              <div class="item">
                <div class="light"></div>
                <div class="licon">
                  <span class="iconfont icon-setting"></span>
                </div>
                <div class="con">menu1</div>
                <div class="ricon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layout-module_dashboardContent enable-background"></div>
    </div>
  </b-container>
</template>

<script>
  import Header from '@/components/Header'

  export default {
    name: 'Dashboard',
    beforeRouteEnter(from, to, next) {
      next(vc => {
        // 通过 `vc` 访问组件实例
        vc.activeMenu = vc.$route.name;
        next();
      });
    },
    data() {
      return {
        activeMenu: 'profile',
        tooltipContainer: null,
        userInfo: {
          nickname: '布衣草人',
          level: 6,
          follow: true
        }
      }
    },
    components: {
      Header
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/common-var.less';
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(~"100vh - 77px");

    .layout-module_dashboardMenu {
      width: 20%;
      height: 100%;
    }

    .layout-module_dashboardContent {
      width: 80%;
      height: 100%;
    }
  }

  .wrap {
    color: rgba(255, 255, 255, 0.6);
    width: 100%;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;

    .nav {
      width: 100px;
      /*height: 100%;*/
      border-radius: 20px;
      overflow: hidden;
      transition: width 0.5s;
    }

    .nav:hover {
      width: 240px;
    }

    .btn {
      width: 60px;
      height: 10px;
      display: flex;
      justify-content: space-around;
      margin-left: 25px;
      margin-top: 25px;
    }

    .btn-item {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .btn-item:nth-child(1) {
      background: #eb5a56;
    }

    .btn-item:nth-child(2) {
      background: #f8bc33;
    }

    .btn-item:nth-child(2) {
      background: #62cb44;
    }

    .icon {
      width: 250px;
      height: 60px;
      margin-left: 25px;
      margin-top: 20px;
      display: flex;
    }

    .icon-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 4px solid rgba(255, 255, 255, 0.3);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .icon-con {
      height: 60px;
      margin-left: 25px;

      p {
        padding-top: 5px;
      }

      h2 {
        font-weight: 400;
      }
    }

    .line {
      width: 60px;
      height: 1px;
      background: rgba(254, 253, 255, 0.5);
      margin: 20px 25px;
      transition: 0.5s;
    }

    .nav:hover .line {
      width: 230px;
    }

    .title {
      width: 60px;
      margin-left: 25px;
      margin-bottom: 20px;

      p {
        font-size: 14px;
      }
    }

    .menu {
      width: 230px;
      margin-left: 25px;
    }

    .item {
      display: flex;
      position: relative;
      transition: 0.5s;
      border-radius: 6px;
    }

    .item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .licon {
      width: 60px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .con {
      width: 0;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
      overflow: hidden;
      position: relative;
      left: -20px;
      opacity: 0;
    }

    .nav:hover .com {
      width: 160px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
    }

    .ricon {
      width: 0;
      height: 50px;
      transition: 0.5s;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      opacity: 0;
    }

    .nav:hover .ricon {
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
    }

    .iconfont {
      font-size: 26px;
    }

    .ricon .iconfont {
      font-size: 20px;
      color: #62cb44;
    }

    .light {
      width: 6px;
      height: 50px;
      background: #eb5a56;
      position: absolute;
      left: -25px;
      transition: 0.5s;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      opacity: 0;
    }

    .item:hover .light {
      opacity: 1;
    }

    .server {
      width: 60px;
      background: rgba(0, 0, 0, 0.7);
      margin-left: 25px;
      border-radius: 10px;
      overflow: hidden;
      transition: 0.5s;
    }

    .nav:hover .server {
      width: 230px;
    }
  }
</style>
