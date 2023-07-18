<template>
  <div class="layout-module_account">
    <h1 class="setting-title">个人信息</h1>
    <div class="settings-form form">
      <form
        class="setting-legacy-form">
        <div class="ant-row ant-legacy-form-item larkui-form-item larkui-legacy-form-item ant-legacy-form-item-large"
             style="row-gap: 0px;">
          <div class="ant-col ant-legacy-form-item-label"><label class="ant-legacy-form-item-no-colon"
                                                                 title=""><span>头像</span></label></div>
          <div class="ant-col ant-legacy-form-item-control-wrapper">
            <div class="ant-legacy-form-item-control"><span class="ant-legacy-form-item-children"><div
              class="logo-uploader clearfix Profile-module_profileAvatar_rj9MZ"><div class="logo-uploader-area"
                                                                                     style="width: 80px; height: 80px;"><div
              class="avatar" style="width: 82px; height: 82px; border-radius: 50%;"><img loading="lazy"
                                                                                         data-testid="img-avatar"
                                                                                         src="https://cdn.nlark.com/yuque/0/2021/jpeg/anonymous/1618152719510-d6e597fe-b90b-4714-810d-23b857530fb0.jpeg?x-oss-process=image%2Fresize%2Cm_fill%2Cw_160%2Ch_160%2Fformat%2Cpng"
                                                                                         class="img" alt=""
                                                                                         style="width: 80px; min-width: 80px; height: 80px; border-radius: 50%;"><div
              class="avatarUploadMask avatar-upload-mask" style="width: 80px; height: 80px; border-radius: 50%;"></div><svg
              width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
              class="larkui-icon larkui-icon-avatar-upload icon-svg avatarUploadIcon index-module_size_wVASz"
              data-name="AvatarUpload" style="width: 16px; min-width: 16px; height: 16px;"><g fill="currentColor"
                                                                                              fill-rule="evenodd"><rect
              x="28" y="209" width="200" height="20" rx="10"></rect><path
              d="M177.268 80.262c4.525 3.166 10.76 2.064 13.926-2.461 3.11-4.445 2.102-10.538-2.222-13.754l-.24-.173-43.535-30.457a30 30 0 0 0-34.01-.264l-.384.264-43.535 30.457c-4.526 3.166-5.628 9.401-2.462 13.927 3.11 4.444 9.18 5.587 13.682 2.627l.244-.166 43.536-30.457a10 10 0 0 1 11.197-.18l.267.18 43.536 30.457Z"
              fill-rule="nonzero"></path><rect x="118" y="39" width="20" height="150" rx="10"></rect></g></svg><span><div
              class="ant-upload ant-upload-drag"><span tabindex="0" class="ant-upload ant-upload-btn"
                                                       role="button"><input type="file" accept="image/*"
                                                                            style="display: none;"><div
              class="ant-upload-drag-container"></div></span></div></span></div></div><div
              class="logo-uploader-btn"><span class=""><div class="ant-upload ant-upload-select ant-upload-select-text"><span
              tabindex="0" class="ant-upload" role="button"><input type="file" accept="image/*" style="display: none;"><button
              type="button" class="ant-btn ant-btn-sm"><svg width="1em" height="1em" viewBox="0 0 256 256"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="larkui-icon larkui-icon-avatar-upload"><g
              fill="currentColor" fill-rule="evenodd"><rect x="28" y="209" width="200" height="20" rx="10"></rect><path
              d="M177.268 80.262c4.525 3.166 10.76 2.064 13.926-2.461 3.11-4.445 2.102-10.538-2.222-13.754l-.24-.173-43.535-30.457a30 30 0 0 0-34.01-.264l-.384.264-43.535 30.457c-4.526 3.166-5.628 9.401-2.462 13.927 3.11 4.444 9.18 5.587 13.682 2.627l.244-.166 43.536-30.457a10 10 0 0 1 11.197-.18l.267.18 43.536 30.457Z"
              fill-rule="nonzero"></path><rect x="118" y="39" width="20" height="150" rx="10"></rect></g></svg><span
              class="text"><span>更新头像</span></span></button></span></div></span><p class="logo-uploader-tip"><span>可以拖动图片到左边头像区域完成上传</span></p></div></div></span>
            </div>
          </div>
        </div>
        <div class="ant-row ant-legacy-form-item larkui-form-item larkui-legacy-form-item" style="row-gap: 0px;">
          <div class="ant-col ant-col-24 ant-legacy-form-item-label"><label for="name"
                                                                            class="ant-legacy-form-item-required ant-legacy-form-item-no-colon"
                                                                            title=""><span>昵称</span><span
            class="form-item-required">&nbsp;*</span></label></div>
          <div class="ant-col ant-legacy-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12">
            <div class="ant-legacy-form-item-control has-success"><span class="ant-legacy-form-item-children"><input
              autocomplete="off" class="ant-input ant-input-lg larkui-input Profile-module_nameInput_MXi1H" type="text"
              placeholder="必填" id="name" data-__meta="[object Object]" data-__field="[object Object]"
              value="布衣草人"></span></div>
          </div>
        </div>
        <div class="ant-row ant-legacy-form-item larkui-form-item larkui-legacy-form-item ant-legacy-form-item-large"
             style="row-gap: 0px;">
          <div class="ant-col ant-col-24 ant-legacy-form-item-label"><label for="description"
                                                                            class="ant-legacy-form-item-no-colon"
                                                                            title=""><span>简介</span></label></div>
          <div class="ant-col ant-legacy-form-item-control-wrapper ant-col-xs-24 ant-col-sm-24">
            <div class="ant-legacy-form-item-control"><span class="ant-legacy-form-item-children"><div
              class="ant-input-textarea ant-input-textarea-show-count Profile-module_profileTextarea_BSOxN"
              data-count="26 / 56"><textarea placeholder="简单介绍一下你自己" autocomplete="off" rows="6" id="description"
                                             data-__meta="[object Object]" data-__field="[object Object]"
                                             class="ant-input">我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑</textarea></div></span></div>
          </div>
        </div>
        <div class="ant-row" style="margin-left: -12px; margin-right: -12px; row-gap: 0px;">
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
    name: 'Account',
    data() {
      return {
        leftHoverClass: false,
        rightHoverClass: false
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
  @import '../css/setting/account.less';
</style>
