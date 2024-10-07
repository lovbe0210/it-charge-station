<template>
  <div class="layout-module_profile" ref="TooltipContainer">
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
              <b-avatar :src="userInfo.avatarUrl"
                        variant="light"
                        href="javascript:void(0)"
                        class="avatar-uploader-show">
                <span v-if="!userInfo.avatarUrl">{{userInfo.username}}</span>
              </b-avatar>
              <div class="avatar-uploader-btn-wrapper">
                <Upload action="/"
                        type="drag"
                        :format="['jpg','jpeg','png']"
                        :max-size="5120"
                        accept="image/*"
                        :show-upload-list="false"
                        :before-upload="fileHandle">
                  <div class="avatar-uploader-btn" ref="avatarBtn">
                    <span class="iconfont upload"></span>
                    <span>更新头像</span>
                  </div>
                </Upload>
                <p class="avatar-uploader-tip">可以拖动图片到按钮区域完成上传</p>
              </div>
              <Modal
                v-model="showAvatarCropper"
                title="编辑头像"
                :mask-closable="false"
                @on-ok="confirmAvatarCrop">
                <div class="avatar-cropper">
                  <vueCropper
                    class="crop-box"
                    ref="cropper"
                    :img="avatarOriginalFile"
                    :autoCrop="true"
                    :fixedBox="true"
                    :centerBox="true"
                    :fixed="true"
                    :canScale="false"
                    :canMove="false"
                    :maxImgSize="400"
                    :info="false"
                    @cropMoving="cropMoving"
                    @imgLoad="imgLoadOver">
                  </vueCropper>
                  <div class="avatar-preview">
                    <img loading="lazy" :src="avatarPreview" class="img" alt="预览">
                    <div class="alt">
                      <span>预览</span>
                    </div>
                  </div>
                </div>
                <div class="image-cropper_action">
                  <span>
                    <div class="avatar-upload-select-text">
                      <span tabindex="0" class="avatar-upload-button">
                        <button type="button" class="custom-btn" @click="reUploadAvatar">
                          <span class="iconfont upload"></span>
                          <span class="text">重新选择</span>
                        </button>
                      </span>
                    </div>
                  </span>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div class="setting-legacy-form-item legacy-form-item-nickname">
          <div class="setting-form-item-label">
            <label for="nickName">
              <span>昵称</span>
              <span class="form-item-required">&nbsp;*</span>
            </label>
          </div>
          <div class="setting-legacy-form-item-control-wrapper">
            <div class="nickname-editor-control">
              <span class="nickname-editor-control-content">
                <input autocomplete="off"
                       :class="['control-input', 'nickName-module_input','item-border',userInfo.username && userInfo.username.length >= 16 ? 'error-editor-control' : '']"
                       type="text" placeholder="必填" v-model="userInfo.username" id="nickName" maxlength="20">
              </span>
            </div>
            <div class="setting-legacy-form-explain">
              <span v-show="userInfo.username && userInfo.username.length >= 16">最多可输入 15 个字符</span>
            </div>
          </div>
        </div>
        <div class="setting-legacy-form-item legacy-form-item-tag">
          <div class="setting-form-item-label">
            <label>
              <span>标签</span>
            </label>
          </div>
          <div class="setting-legacy-form-item-control-wrapper">
            <div class="tag-add-control">
              <template v-for="(tag, index) in userInfo.tags">
                <a-tooltip :key="index" overlayClassName="tag-color-tooltip" :getPopupContainer="getTooltipContainer">
                  <template slot="title">
                    <div :style="{background: tag.color}" @click="changeTagColor(tag)" class="tag-color-btn">
                      <div class="hazy">
                        <span class="iconfont random"></span>
                      </div>
                    </div>
                  </template>
                  <a-tag :color=tag.color closable @close="() => handleClose(tag)">
                    {{ tag.content }}
                  </a-tag>
                </a-tooltip>
              </template>
              <span v-if="userInfo.tags && userInfo.tags.length < 4">
                <Input class="tag-input" v-if="inputVisible" ref="input" type="text" size="small" maxlength="10"
                       :style="{ width: '100px' }" v-model="inputValue"
                       @on-blur="handleInputConfirm"
                       @on-enter="handleInputConfirm"/>
                <a-tag v-else class="empty-to-add"  @click="showInput">
                  <span class="iconfont add" style="font-size: 12px"></span>
                  添加标签
                </a-tag>
              </span>
            </div>
          </div>
        </div>
        <div class="setting-legacy-form-item legacy-form-item-biography">
          <div class="setting-form-item-label">
            <label for="biography">
              <span>简介</span>
              <span class="textarea-words-count">{{(userInfo.introduction ? userInfo.introduction.length : 0) + '/200'}}</span>
            </label>
          </div>
          <div class="setting-legacy-form-item-control-wrapper">
            <div class="biography-editor-control">
              <span class="biography-editor-control-content">
                <textarea id="biography" placeholder="简单介绍一下你自己" autocomplete="off" maxlength="210"
                          :class="['control-input','biography-module_textarea','item-border',userInfo.introduction && userInfo.introduction.length > 200 ? 'error-editor-control' : '']"
                          v-model="userInfo.introduction">
                </textarea>
              </span>
            </div>
            <div class="setting-legacy-form-explain">
              <span v-show="userInfo.introduction && userInfo.introduction.length > 200">最多可输入 200 个字符</span>
            </div>
          </div>
        </div>
        <div class="setting-legacy-form-item setting-legacy-form-item-wrapper">
          <div class="setting-legacy-form-item legacy-form-item-location">
            <div class="setting-form-item-label">
              <label for="location">
                <span>地址</span>
              </label>
            </div>
            <div class="setting-legacy-form-item-control-wrapper">
              <div class="location-editor-control">
                  <span class="location-editor-control-content">
                    <input id="location" autocomplete="false" type="text" placeholder="你所在的地址" maxlength="100"
                           :class="['control-input','item-border',userInfo.location && userInfo.location.length > 50 ? 'error-editor-control' : '']"
                           v-model="userInfo.location">
                  </span>
              </div>
              <div class="setting-legacy-form-explain">
                <span v-show="userInfo.location && userInfo.location.length > 50">最多可输入 50 个字符</span>
              </div>
            </div>
          </div>
          <div class="setting-legacy-form-item legacy-form-item-profession">
            <div class="setting-form-item-label">
              <label for="profession">
                <span>
                  领域
                </span>
              </label>
            </div>
            <div class="setting-legacy-form-item-control-wrapper">
              <div class="profession-editor-control">
                <span class="profession-editor-control-content">
                  <input id="profession" autocomplete="false" type="text" placeholder="你所在的行业" maxlength="30"
                         :class="['control-input','item-border',userInfo.industry && userInfo.industry.length > 15 ? 'error-editor-control' : '']"
                         v-model="userInfo.industry">
                </span>
              </div>
              <div class="setting-legacy-form-explain">
                <span v-show="userInfo.industry && userInfo.industry.length > 15">最多可输入 15 个字符</span>
              </div>
            </div>
          </div>
        </div>
        <div class="setting-legacy-form-item legacy-form-item-btn">
          <div class="setting-legacy-form-item-control-wrapper">
            <div class="update-editor-control">
              <span class="update-editor-control-content">
                <Button type="success" @click="updateUserInfo">
                  <span>更新信息</span>
                </Button>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {VueCropper} from 'vue-cropper'
  import {getRandomColor} from '@/utils/utils'
  import userApi from "@/api/UserApi";
  import {dataURLtoFile} from "@/utils/utils"

  export default {
    name: 'Profile',
    data() {
      return {
       /* userInfo: {
          avatar: 'https://pic.netbian.com/uploads/allimg/240618/195433-1718711673bf15.jpg',
          nickname: 'HappyDragon1994',
          tags: [
            {content: '自我驱动', color: 'blue'},
            {content: '坚持不懈', color: 'red'},
            {content: '目标大厂', color: 'orange'},
            {content: '年薪百万', color: 'green'}
          ],
          profile: '我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑',
          location: '四川省成都市成华区',
          profession: '新时代『农民工』'
        },*/
        userInfo: {},
        showAvatarCropper: false,
        avatarOriginalFile: null,
        avatarPreview: null,
        inputVisible: false,
        inputValue: '',
        tagColor: 'red'
      }
    },
    components: {
      VueCropper
    },
    methods: {
      /**
       * 更新用户信息
       */
      updateUserInfo() {
        let userInfo = new FormData();
        userInfo.append('avatarFile', dataURLtoFile(this.avatarPreview, "preview.jpg"));
        userInfo.append('username', this.userInfo.username);
        userInfo.append('tagArray', JSON.stringify(this.userInfo.tags));
        userInfo.append('introduction', this.userInfo.introduction);
        userInfo.append('location', this.userInfo.location);
        userInfo.append('industry', this.userInfo.industry);
        userApi.updateUserInfo(this, userInfo).then(data => {
          if (data) {
            this.$Message.success("更新成功");
          }
        })
      },
      fileHandle(file) {
        if (file?.size > 10 * 1024 * 1024) {
          this.$Message.error('文件大小不得超过10M')
          return false;
        }
        let _this = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          _this.avatarOriginalFile = this.result;
          _this.showAvatarCropper = true;
        }
        return false;
      },
      /**
       * 处理截图框移动事件
       * @param data
       */
      cropMoving(data) {
        if (!data?.moving) {
          // 移动停止，获取截图框内图片
          this.getNewCropImage();
        }
      },
      getNewCropImage() {
        this.$refs.cropper.getCropData(data => {
          this.avatarPreview = data;
        })
      },
      imgLoadOver(data) {
        if (data) {
          this.$nextTick(() => {
            this.getNewCropImage();
          })
        }
      },
      reUploadAvatar() {
        this.showAvatarCropper = false;
        this.$nextTick(() => {
          this.$refs.avatarBtn.click();
        });
      },
      confirmAvatarCrop() {
        this.userInfo.avatarUrl = this.avatarPreview;
      },
      // 标签移除
      handleClose(removedTag) {
        this.userInfo.tags = this.userInfo.tags.filter(tag => tag !== removedTag);
        event.preventDefault();
      },
      // 展示添加新标签
      showInput() {
        this.inputVisible = true;
        this.$nextTick(function () {
          this.$refs.input.focus();
        });
      },
      // 标签添加完成
      handleInputConfirm() {
        const tag = {content: this.inputValue, color: getRandomColor()};
        let tags = this.userInfo.tags;
        if (tag.content && tags.indexOf(tag) === -1) {
          this.userInfo.tags = [...tags, tag];
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      getTooltipContainer() {
        return this.$refs.TooltipContainer
      },
      changeTagColor(tag) {
        tag.color = getRandomColor();
      }
    },
    created() {
      let tmp = this.$store.state.userInfo;
      userApi.getUserInfo(this, tmp.uid).then(data => {
        this.userInfo = data;
        let newUserInfo = {...tmp, ...data};
        this.$store.commit("login", newUserInfo);
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../css/usercenter/profile.less';
</style>
