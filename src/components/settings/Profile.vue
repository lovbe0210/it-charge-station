<template>
  <div class="layout-module_account">
    <h1 class="setting-title">个人信息</h1>
    <div class="settings-form form">
      <form class="setting-legacy-form">
        <div class="setting-legacy-form-item legacy-form-item-avatar">
          <div class="setting-form-item-label">
            <label title="">
              <span>头像</span>
            </label>
          </div>
          <div class="setting-legacy-form-item-control-wrapper">
            <div class="avatar-uploader-control">
              <img loading="lazy" data-testid="img-avatar"
                   :src="userInfo.avatar"
                   class="avatar-uploader-show" alt=""
                   style="">
              <div>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                  <div class="avatar-uploader-btn">
                    <span class="iconfont icon-avatar-upload"></span>
                    <span>更新头像</span>
                  </div>
                </Upload>
                <p class="avatar-uploader-tip">可以拖动图片到按钮区域完成上传</p>
              </div>
            </div>
          </div>
        </div>
        <div class="setting-legacy-form-item legacy-form-item-nickname">
          <div class="setting-form-item-label">
            <label for="name" class="ant-legacy-form-item-required ant-legacy-form-item-no-colon" title="">
              <span>昵称</span>
              <span class="form-item-required">&nbsp;*</span>
            </label>
          </div>
          <div class="setting-legacy-form-item-control-wrapper">
            <div class="nickname-editor-control">
              <span class="nickname-editor-control-content">
                <input autocomplete="off" class="profile-module_nameInput"
                       type="text" placeholder="必填" id="name" data-__meta="[object Object]"
                       data-__field="[object Object]"
                       value="布衣草人">
            </span>
            </div>
          </div>
        </div>
        <div class="setting-legacy-form-item legacy-form-item-biography">
          <div class="setting-form-item-label">
            <label for="description" class="ant-legacy-form-item-no-colon" title="">
              <span>简介</span>
            </label>
          </div>
          <div class="setting-legacy-form-item-control-wrapper">
            <div class="ant-legacy-form-item-control"><span class="ant-legacy-form-item-children">
              <div class="ant-input-textarea ant-input-textarea-show-count Profile-module_profileTextarea_BSOxN"
                   data-count="26 / 56">
                <textarea placeholder="简单介绍一下你自己" autocomplete="off" rows="6" id="description"
                          data-__meta="[object Object]" data-__field="[object Object]"
                          class="ant-input">我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑
                </textarea>
              </div>
            </span>
            </div>
          </div>
        </div>
        <div class="legacy-form-item-avatar" style="margin-left: -12px; margin-right: -12px;">
          <div class="ant-col ant-col-12" style="padding-left: 12px; padding-right: 12px;">
            <div class="ant-row ant-legacy-form-item larkui-form-item larkui-legacy-form-item" style="row-gap: 0px;">
              <div class="ant-col ant-legacy-form-item-label"><label for="location"
                                                                     class="ant-legacy-form-item-no-colon"
                                                                     title="地址">地址</label></div>
              <div class="ant-col ant-legacy-form-item-control-wrapper">
                <div class="ant-legacy-form-item-control has-success"><span class="ant-legacy-form-item-children"><input
                  autocomplete="false" class="ant-input ant-input-lg larkui-input" type="text" placeholder="你所在的地址"
                  id="location" data-__meta="[object Object]" data-__field="[object Object]" value="四川省成都市成华区"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="ant-col ant-col-12" style="padding-left: 12px; padding-right: 12px;">
            <div class="ant-row ant-legacy-form-item larkui-form-item larkui-legacy-form-item" style="row-gap: 0px;">
              <div class="ant-col ant-legacy-form-item-label"><label for="job_title"
                                                                     class="ant-legacy-form-item-no-colon"
                                                                     title="领域">领域</label></div>
              <div class="ant-col ant-legacy-form-item-control-wrapper">
                <div class="ant-legacy-form-item-control has-success"><span class="ant-legacy-form-item-children"><input
                  autocomplete="false" class="ant-input ant-input-lg larkui-input" type="text" placeholder="你所在的行业"
                  id="job_title" data-__meta="[object Object]" data-__field="[object Object]" value="新时代『农民工』"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="ant-row ant-legacy-form-item larkui-form-item larkui-legacy-form-item Profile-module_submitBtn_VWPj5"
          style="row-gap: 0px;">
          <div class="ant-col ant-legacy-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12">
            <div class="ant-legacy-form-item-control"><span class="ant-legacy-form-item-children"><button type="button"
                                                                                                          class="ant-btn ant-btn-primary"><span>更新信息</span></button></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    data() {
      return {
        userInfo: {
          avatar: require('@/assets/avatar/01.jpg'),
          avatarFile: null,
          nickname: 'HappyDragon1994',
          Profile: '我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑',
          address: '四川省成都市成华区',
          profession: '新时代『农民工』'
        }
      }
    },
    methods: {
      isHover(position, flag) {
        if (position === 'left') {
          this.leftHoverClass = flag;
        } else {
          this.rightHoverClass = flag;
        }
      },
      previous() {
        console.log('previous page')
      },
      next() {
        console.log('next page')
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/setting/profile.less';
</style>
