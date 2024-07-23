<template>
  <div :class="['editor-center', docStyle.customerTheme ? 'enable-background' : 'normal-background']"
       ref="TooltipContainer">
    <b-row class="editor-header">
      <div class="left-dropdown-wrapp">
        <Dropdown trigger="click"
                  :transfer-class-name="docStyle.customerTheme ? 'dropdown-background dropdown-item-all-hover' : ''"
                  placement="bottom-start">
          <div class="menu-icon">
            <span class="iconfont menu-dots"/>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem>
              <div @click="routerPush">
                <span class="iconfont icon-home"/>
                首页
              </div>
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont collect" style="font-weight: 600;"/>
              收藏
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont icon-new-doc"/>
              新建
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont collapse"/>
              专栏
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <b-list-group class="title-info" flush>
        <b-list-group-item class="title">
          {{ docInfo.title === null || docInfo.title.length === 0 ? '无标题文档' : docInfo.title }}
        </b-list-group-item>
        <b-list-group-item class="author-info">
          <a href="/">@福</a>
          <span style="color: #d9d9d9;margin: 0 8px 0 8px;">/</span>
          <a href="">从头开始</a>
          <span style="color: #d9d9d9;margin: 0 8px 0 8px;">|</span>
          <a href="" class="update-time">最后更新于今天 12:23<span class="iconfont icon-cloud"/></a>
        </b-list-group-item>
      </b-list-group>
      <div class="editor-setting">
        <Button :class="['update-btn',  docStyle.customerTheme ? 'ghost-btn' : '']" ghost @click="updateDocConten"
                id="update-btn">
          更新
        </Button>
        <Dropdown placement="bottom-end"
                  :transfer-class-name="docStyle.customerTheme ? 'dropdown-background dropdown-item-all-hover' : 'normal-dropdown'"
                  trigger="click">
          <div class="setting-icon" id="settingIcon" @click="showDocSetting = false">
            <span class="iconfont editor-more"/>
          </div>
          <DropdownMenu slot="list">
            <Dropdown placement="left-start"
                      :transfer-class-name="docStyle.customerTheme ? 'dropdown-background dropdown-item-all-hover' : 'normal-dropdown'"
                      class="doc-set-style-wrapp"
                      trigger="click">
              <DropdownItem>
                <div class="editor-set doc-set-style">
                  <span class="editor-icon iconfont editor-style"/>
                  <div>
                    <span>文档样式</span>
                    <span class="iconfont i-more"></span>
                    <br>
                    <span style="color: #8a8f8d; font-size: 12px;">设置正文大小、段间距、超宽…</span>
                  </div>
                </div>
              </DropdownItem>
              <DropdownMenu slot="list">
                <div class="style-item font-size">
                  <div class="slider-module_slideTitle">
                    <span>正文大小</span>
                  </div>
                  <div class="slider-module_slideContainer un-select" @mouseenter="docStyle.showSelect = true"
                       @mouseleave="docStyle.showSelect = false">
                    <div class="ant-slider ant-slider-with-marks classic">
                      <div class="ant-slider-rail"></div>
                      <div class="ant-slider-step">
                        <div v-for="(item,index) in fontSizeRange" :key="index" @click="changeFontSise(item)"
                             class="slider-dot-wrapp"
                             :style="'left: '+ index * 100/(fontSizeRange.length-1) + '%;'">
                          <span class="slider-dot"/>
                        </div>
                      </div>
                      <div :class="['ant-slider-handle', docStyle.showSelect ? 'show-select-font' : '']"
                           :style="'left: ' + currentFontIndex * 100/(fontSizeRange.length-1) + '%;'">
                      </div>
                    </div>
                  </div>
                  <div>{{ docStyle.docFontSize }}px</div>
                </div>
                <div class="style-item segment-space">
                  <div class="slider-module_slideTitle">正文段间距</div>
                  <RadioGroup v-model="docStyle.segmentSpace">
                    <Radio label="standard">
                      <span>常规</span>
                    </Radio>
                    <Radio label="loose">
                      <span>宽松</span>
                    </Radio>
                  </RadioGroup>
                </div>
                <Divider/>
                <div class="style-item">页面主题</div>
                <div class="style-item page-size">
                  <div :class="['standard-wide', docStyle.pageSize === 1 ? 'Select-module_optionActive' : '']"
                       @click="changePageSize(1)">
                    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"
                         class="larkui-icon Select-module_iconSvg"
                         data-name="DocFixed" style="width: 38px; min-width: 38px; height: 28px;">
                      <g fill="currentColor" fill-rule="evenodd">
                        <rect width="38" height="28" rx="3" opacity="0.3"></rect>
                        <rect x="9" y="5" width="20" height="3" rx="1.5"></rect>
                        <rect x="9" y="10" width="20" height="3" rx="1.5"></rect>
                        <rect x="9" y="15" width="20" height="3" rx="1.5"></rect>
                        <rect x="9" y="20" width="20" height="3" rx="1.5" opacity="0.3"></rect>
                        <rect x="9" y="20" width="10" height="3" rx="1.5"></rect>
                      </g>
                    </svg>
                    <div class="Select-module_optionTitle">标宽模式</div>
                  </div>
                  <div :class="['ultra-wide', docStyle.pageSize === 2 ? 'Select-module_optionActive' : '']"
                       @click="changePageSize(2)">
                    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"
                         class="larkui-icon Select-module_iconSvg"
                         data-name="DocAdapt" style="width: 38px; min-width: 38px; height: 28px;">
                      <g fill="currentColor" fill-rule="evenodd">
                        <rect width="38" height="28" rx="3" opacity="0.3"></rect>
                        <rect x="4" y="5" width="30" height="3" rx="1.5"></rect>
                        <rect x="4" y="10" width="30" height="3" rx="1.5"></rect>
                        <rect x="4" y="15" width="26" height="3" rx="1.5"></rect>
                        <rect x="4" y="20" width="26" height="3" rx="1.5" opacity="0.3"></rect>
                        <rect x="4" y="20" width="13" height="3" rx="1.5"></rect>
                      </g>
                    </svg>
                    <div class="Select-module_optionTitle">超宽模式</div>
                  </div>
                </div>
                <div class="style-item segment-space">
                  <div class="slider-module_slideTitle">主题偏好</div>
                  <i-switch v-model="docStyle.customerTheme" class="switch-btn" size="small" true-color="#00B96B">
                    <span slot="true"/>
                    <span slot="false"/>
                  </i-switch>
                </div>
              </DropdownMenu>
            </Dropdown>
            <Divider/>
            <DropdownItem>
              <div class="editor-set" @click="showDrawer(1)">
                <span class="editor-icon iconfont setting"></span>
                <span>文档设置</span>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="editor-set" @click="showDrawer(2)">
                <span class="editor-icon iconfont history"></span>
                <span>查看历史版本</span>
              </div>
            </DropdownItem>
            <DropdownItem>
              <span class="editor-set for-version" @click="newVersionTag">
                保存为版本
              </span>
            </DropdownItem>
            <Divider/>
            <DropdownItem>
              <div class="editor-set" @click="deleteModal">
                <span class="editor-icon iconfont delete"></span>
                <span>删除</span>
              </div>
            </DropdownItem>
            <Divider/>
            <div class="doc-info un-select">
              <div>字数统计：0</div>
              <div>创建于：03-15</div>
              <div>最后编辑于：昨天 11:20</div>
            </div>
          </DropdownMenu>
        </Dropdown>
        <Drawer title="文档设置"
                :mask="false"
                :closable="true"
                :transfer="false"
                :width="17"
                v-model="showDocSetting">
          <div slot="header" @click="returnDocSetting">
            <span class="iconfont return"/>
            <span>{{ drawerType === 1 ? '文档设置' : '历史版本' }}</span>
          </div>
          <div v-show="drawerType === 1">
            <div class="cover">
              <div class="label">
                <span class="label-text">封面</span>
              </div>
              <div class="cover-input">
                <vueCropper
                  :class="['crop-box', coverOriginalFile ? '' : 'cover-placeholder']"
                  ref="cropper"
                  :img="coverOriginalFile"
                  :autoCrop="true"
                  :fixedBox="false"
                  :centerBox="true"
                  :fixed="true"
                  :fixedNumber="[1.61, 1]"
                  :canMove="false"
                  :canScale="false"
                  :maxImgSize="400"
                  :info="true"
                  @cropMoving="cropMoving"
                  @imgLoad="imgLoadOver">
                </vueCropper>
                <div class="cover-upload-select">
                  <Upload action="/"
                          :format="['jpg','jpeg','png']"
                          :max-size="5120"
                          accept="image/*"
                          :show-upload-list="false"
                          :before-upload="fileHandle">
                    <Button class="cover-upload-btn">
                      <span v-if="!coverOriginalFile"><span class="iconfont upload"/>上传图片</span>
                      <span v-else>重新上传</span>
                    </Button>
                  </Upload>
                  <div class="clear-cover-btn">
                      <span v-show="docInfo.coverPreview" class="un-select" @click="clearCoverPreview">
                        <span class="iconfont delete"></span>
                        清除
                      </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="summary">
              <div class="label">
                <div class="label-text">摘要</div>
                <div>{{ docInfo.summary?.length ? docInfo.summary?.length : 0 }}/150</div>
              </div>
              <Input type="textarea"
                     class="desc-input form-input"
                     :rows="4"
                     maxlength="150"
                     placeholder="文档摘要"
                     v-model="docInfo.summary"/>
            </div>
            <div class="category">
              <div class="label">
                <div class="label-text">分类</div>
                <div class="label-tip">合理分类，搜索更快捷</div>
              </div>
              <div class="category-group">
                <Select v-model="docInfo.firstLevel"
                        placeholder="选择一级分类"
                        class="first-level">
                  <Option v-for="item in firstLevelList" :value="item.code" :key="item.uid">{{ item.menuName }}</Option>
                </Select>
                <Select v-model="docInfo.secondLevel"
                        :disabled="!docInfo.firstLevel"
                        placeholder="选择二级分类"
                        class="second-level">
                  <Option v-for="item in secondLevelList" :value="item.code" :key="item.uid">{{
                      item.menuName
                    }}
                  </Option>
                </Select>
              </div>
            </div>
            <div class="tags">
              <div class="label">
                <div class="label-text">标签</div>
                <div class="label-tip">添加标签，搜索更精确</div>
              </div>
              <div class="tag-add-control">
                <div v-for="(tag, index) in docInfo.tags" :key="index" class="tag-wrap">
                  <a-tooltip overlayClassName="tag-color-tooltip"
                             :getPopupContainer="getTooltipContainer">
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
                </div>
                <span v-if="docInfo.tags && docInfo.tags.length < 4">
                <Input class="tag-input" v-if="inputVisible" ref="input" type="text" size="small" maxlength="10"
                       :style="{ width: '180px' }" v-model="inputValue"
                       @on-blur="handleInputConfirm"
                       @on-enter="handleInputConfirm"/>
                <a-tag v-else class="empty-to-add" @click="showInput">
                  <span class="iconfont add" style="font-size: 12px"></span>
                  添加标签
                </a-tag>
              </span>
              </div>
            </div>
            <Button type="success"
                    :disabled="!(docInfo.coverPreview || docInfo.summary || (docInfo.firstLevel && docInfo.secondLevel) || docInfo.tags?.length > 0)"
                    @click="submitDocSetting">
              <span>&nbsp;确定&nbsp;</span>
            </Button>
          </div>
          <div v-if="drawerType === 2">
            <div class="history-version">
              <div v-if="tmpVersionTag != null" class="new-version-tag">
                <Input autofocus
                       ref="versionInput"
                       type="textarea"
                       placeholder="请输入版本名称"
                       v-model="tmpVersionTag"
                       maxlength="30"
                       @on-blur="versionInputId = null"
                       @on-enter="versionInputId = null"/>
                <div>
                  <Button type="success"
                          size="small"
                          :disabled="tmpVersionTag == null || tmpVersionTag.trim().length === 0"
                          @click="createNewVersion">
                    确定
                  </Button>
                  <Button type="text" @click="tmpVersionTag = null">
                    取消
                  </Button>
                </div>
              </div>
              <div class="doc-version" v-for="item in historyVersion" :key="item.id">
                <div class="doc-version-basic">
                  <span class="doc-version-name" v-show="versionInputId == null || versionInputId !== item.id">
                    {{ item.versionTag }}
                  </span>
                  <Input autofocus
                         ref="versionInput"
                         type="textarea"
                         v-if="versionInputId === item.id"
                         v-model="item.versionTag"
                         maxlength="30"
                         @on-blur="versionInputId = null"
                         @on-enter="versionInputId = null"/>
                </div>
                <div class="doc-version-action">
                  <span class="doc-version-time">{{ formatTime(item.createTime) }}</span>
                  <div class="action-group">
                    <Button size="small" type="text" @click="editVersionTag(item.id)">
                      <span class="iconfont bianji"></span>
                    </Button>
                    <Button size="small" type="text">
                      <span class="iconfont delete"></span>
                    </Button>
                    <Button size="small" type="success">恢复此版本</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
        <Modal v-model="showDeleteModal"
               class-name="delete-modal"
               :width="416"
               :transfer="false"
               :footer-hide="true">
          <div class="delete-tips">
            <span class="iconfont i-warn"></span>
            确认删除 {{docInfo.title}}？
          </div>
          <div class="confirm-btn">
            <Button>取消</Button>
            <Button type="success">确定</Button>
          </div>
        </Modal>
      </div>
    </b-row>
    <b-row class="editor-root">
      <editor @updateTitle="updateTitle" :docInfo="docInfo" :docStyle="docStyle" ref="editorContainer"></editor>
    </b-row>
    <b-tooltip target="update-btn" placement="bottom" delay="250" triggers="hover" variant="dark"
               container="update-btn">
      <div style="width: 120px; color: #FFFFFF; font-size: 12px;">
        已开启自动发布，内容将自动更新至阅读页面，亦可手动点击更新
      </div>
    </b-tooltip>
  </div>
</template>

<script>
import Editor from '@/components/common/editor/Editor'
import {VueCropper} from 'vue-cropper'
import {getRandomColor} from '@/utils/utils'
import {formatTime} from '@/utils/emoji'

export default {
  name: 'WriteCenter',
  data() {
    return {
      docInfo: {
        title: 'lovbe0210',
        content: "{\"type\":\"div\",\"children\":[{\"type\":\"div\",\"data-card-value\":\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E8%A7%84%E5%88%92%E5%B1%80%E5%9B%BD%E9%99%85%E5%8C%96%22%2C%22autoWrap%22%3Afalse%2C%22id%22%3A%22W3QHK%22%2C%22type%22%3A%22block%22%7D\",\"data-card-type\":\"block\",\"data-card-key\":\"codeblock\",\"data-id\":\"d1buzc9eg-4oyilu8m9vk000\",\"data-card-editable\":\"false\",\"children\":[]},{\"type\":\"div\",\"data-card-value\":\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E5%A4%A7%E5%93%A5%E5%A4%A7%E5%93%A5%E6%A2%B5%E8%92%82%E5%86%88%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E5%86%BB%E5%B9%B2%E7%B2%89%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E9%AB%98%E5%BA%A6%E8%A6%86%E7%9B%96%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E8%A6%86%E7%9B%96%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%9C%B0%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%A4%A7%E8%8C%83%E7%94%98%E8%BF%AA%E8%A6%86%E7%9B%96%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E9%83%BD%E5%8F%91%E7%BB%99%E5%AF%B9%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%5Cn%E9%94%85%5Cn%22%2C%22autoWrap%22%3Atrue%2C%22id%22%3A%22XN6w3%22%2C%22type%22%3A%22block%22%7D\",\"data-card-type\":\"block\",\"data-card-key\":\"codeblock\",\"data-id\":\"da9ajx1ko-4003x371z14000\",\"data-card-editable\":\"false\",\"children\":[]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4oni0r861to000\",\"children\":[{\"text\":\"的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度\"}]},{\"type\":\"h1\",\"id\":\"h4kgw8yp6-1u01rj732jcw0\",\"data-id\":\"h7mo8zo94-5nv8388lhwo000\",\"children\":[{\"text\":\"第一章 大标题\"}]},{\"type\":\"h2\",\"id\":\"h4kgw8yp6-i740lb38rso0\",\"data-id\":\"h6nir3p2w-2jnufm6br3c000\",\"children\":[{\"text\":\"一、小标题\"}]},{\"type\":\"h3\",\"id\":\"h4kgw8yp6-igh2t92msg000\",\"data-id\":\"h231x8tls-14rup6isoly800\",\"children\":[{\"text\":\"1.大幅度发啊实打实多啊实打实多阿萨达阿闪大大\"}]},{\"type\":\"h4\",\"id\":\"h4kgw8yp6-fipuovm5ug000\",\"data-id\":\"h1uqpx7og-17qdbtabqyu800\",\"children\":[{\"text\":\"1.1 发达了\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-373juoeq7s2000\",\"children\":[{\"text\":\"1.1.1 真的吗\"}]},{\"type\":\"h6\",\"id\":\"h4kgw8yp6-f9y8qdkbpz400\",\"data-id\":\"h7mo8zst8-20n2vxu85pls00\",\"children\":[{\"text\":\"1.1.1.1 真的水电费水电费水电费水电费水电费\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3a0upzg9xse000\",\"children\":[{\"text\":\"sdfsdfsdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-41gdp7jyfdi000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4q9rvj7obmg000\",\"children\":[{\"text\":\"地方\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3lk2429tbs0000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-13rjc6amy34000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2qka9w73n92000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-gxv45zmcy7c00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1o3v308r5v4w00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-143ufqjondts00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1oboszuyruu800\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-c8fttwsr73k00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3vp72us46yg000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3is2qbifi78000\",\"children\":[{\"text\":\"df\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3qt0d0xz3is000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4sqiio74z4w000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3fgc7cej9q8000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2dnru20ayp1c00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4u2rblyv2ky000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3va5jo66ww6000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-5cp5y6hko38000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1ju0iof1vssg00\",\"children\":[{\"text\":\"df\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4o2oodjhczy000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1ses0l6esb6o00\",\"children\":[{\"text\":\"df\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1i8ygi8g4o4g00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-cj5imtln78g00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-5a5rmknukps000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4k67gxaenxq000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1y3don6icl4w00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2a0pstvtqo7w00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-5om4exkml8g000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3pcl6jc7u24000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-5m3ep3wlywg000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4vt25kjjpa0000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2ozu5w9iy2q000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-48bzincwhck000\",\"children\":[{\"text\":\"dfs\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-euf89kaloww00\",\"children\":[{\"text\":\"df\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1tnoi6ygnye800\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-23uew1fu5kww00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-17bpkapv7o8w00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-27orj6se61hc00\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-c9fgteme4so00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1oolv0zvc9eo00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1ly7w8ny7etc00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-u2ta8hgdi9c00\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-30i20qaeadc000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-99gvyj3xddk00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-ksdbzg14es000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1xxlvck503s000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2jtunho87jk000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-57rx0m1lof4000\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-12deagm18sf400\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2ivysu97cki000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-37fv35w8qx8000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-35b7d2y9hiw000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-mwvm0vsni2o00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3sezd736ygo000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-14n2juucc8dc00\",\"children\":[{\"text\":\"fsd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3wm68rfszic000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1sqhbl85tilc00\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-128zofo918wg00\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-20yxqbwwrlgg00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-vvgwvissm1c00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3ju2f8tmbn8000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-57vn2q697jc000\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3c333m9oinc000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-40hfq2i7ktk000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-48y3itp384w000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-53lka4c0rds000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-33fqmiu3ijo000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1lg2a02vvmyo00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-yam3z33gibk00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2105iu67cjr400\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1j0x431wgcdc00\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-51bnuiiz5wk000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-19g2g5zzt2v400\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-mg0h300kdgg00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4ks3bhbiizs000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-47oihi74ji0000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2jmsdaj0da8000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-405l32a87p8000\",\"children\":[{\"text\":\"fsdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1ir4b0kp4nsw00\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2z7c10e196o000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-42bb419jc9w000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4vmra2vmbva000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4iee4ve7szk000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-47bwh9nzrag000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3akx0y6xljs000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-zbjf5ka8zk000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2fraqd5iw8kk00\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3ncezjj7444000\",\"children\":[{\"text\":\"sf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-23zvyo0ajvmo00\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2jqtd5xga78000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4pua5ql8asc000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4ylkvgd1570000\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"h3\",\"id\":\"h4kgw8yp6-beg9hwws2bc00\",\"data-id\":\"h9ql9cmio-fzavpj8vzy800\",\"children\":[{\"text\":\"2.小幅度发\"}]},{\"type\":\"h2\",\"id\":\"h4kgw8yp6-cnbb438571k00\",\"data-id\":\"hgdryewbo-1crcmpyf1hb400\",\"children\":[{\"text\":\"二、中表题\"}]},{\"type\":\"h3\",\"data-id\":\"hgaw9birk-2bm09duqqcbo00\",\"id\":\"h231x8tls-8n9mwmm81f000\",\"children\":[{\"text\":\"1.大幅度发\"}]},{\"type\":\"h4\",\"data-id\":\"h6fy3951c-3gm7h321myc000\",\"id\":\"h1uqpx7og-ghgnusv66cg00\",\"children\":[{\"text\":\"1.1 发达了\"}]},{\"type\":\"h5\",\"data-id\":\"h2lr2xwbi-782wy6ub21s00\",\"id\":\"hqmwfki9s-bwo7j1j4wjk00\",\"children\":[{\"text\":\"1.1.1 真的吗\"}]},{\"type\":\"h6\",\"data-id\":\"h17e3kxeo-5s58g3qwgbo000\",\"id\":\"h7mo8zst8-idey9a86d9k00\",\"children\":[{\"text\":\"1.1.1.1 真的想\"}]},{\"type\":\"h2\",\"id\":\"h4kgw8yp6-1l16dubmmqf40\",\"data-id\":\"h1mfgsrq8-2677g2l7exls00\",\"children\":[{\"text\":\"三、小标题\"}]},{\"type\":\"h3\",\"data-id\":\"h1mooaxr4-57xbcod3k4c000\",\"id\":\"h231x8tls-4o01xa0z89k00\",\"children\":[{\"text\":\"1.大幅度发说的\"}]},{\"type\":\"h4\",\"data-id\":\"h5sgze6a8-4z0gzaa08yw000\",\"id\":\"h1uqpx7og-c02r7iflodc00\",\"children\":[{\"text\":\"1.1 发达了是\"}]},{\"type\":\"h5\",\"data-id\":\"h9di87lr8-4fzpfbb2ufs000\",\"id\":\"hqmwfki9s-a6cc90wjiao00\",\"children\":[{\"text\":\"1.1.1 真的吗\"}]},{\"type\":\"h6\",\"data-id\":\"h9edidg2k-9lpeh1bk7vo00\",\"id\":\"h7mo8zst8-dpo4698v2vc00\",\"children\":[{\"text\":\"1.1.1.1 真的\"}]},{\"type\":\"h3\",\"id\":\"h4kgw8yp6-1443qb4fyarg0\",\"data-id\":\"h7mo8x65o-23n78nl2qsyo00\",\"children\":[{\"text\":\"三级大标题\"}]},{\"type\":\"h4\",\"id\":\"h5sgze6a8-l3lubgrdngw00\",\"data-id\":\"ho54pzw1c-1jtc4yxb7jeo00\",\"children\":[{\"text\":\"1.1 发达了\"}]},{\"type\":\"h5\",\"id\":\"h9di87lr8-9z8mnjlt1c400\",\"data-id\":\"h1fiz3x9c-11cs4f9c2vj400\",\"children\":[{\"text\":\"1.1.1 真的吗说的\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2bk3wysbgyo000\",\"children\":[{\"type\":\"br\",\"children\":[]}]}]}",
        coverPreview: null,
        summary: '',
        firstLevel: null,
        secondLevel: null,
        tags: [
          {content: 'SpringBoot', color: 'blue'},
          {content: 'JAVA', color: 'red'},
          {content: '微服务', color: 'orange'},
          {content: '调优', color: 'green'}
        ]
      },
      historyVersion: [
        {
          id: '12sdsdsaaaasad',
          versionTag: '啊实打实大大阿三大苏打阿萨大苏打阿三大苏打速度阿松大阿松大阿松大阿松大阿',
          createTime: 1690036023000
        },
        {
          id: '12sdsdasad',
          versionTag: '啊实打实大大阿三大苏打阿萨大苏打阿三大苏打速度阿松大阿松大阿松大阿松大阿',
          createTime: 1721658423000
        },
        {
          id: '12sdasaadad',
          versionTag: '啊实打实大大阿三大苏打阿萨大苏打阿三大苏打速度阿松大阿松大阿松大阿松大阿',
          createTime: 1708698423000
        },
        {
          id: '12sdddsdad',
          versionTag: '啊实打实大大阿三大苏打阿萨大苏打阿三大苏打速度阿松大阿松大阿松大阿松大阿',
          createTime: 1721744831090
        }
      ],
      tmpVersionTag: null,
      versionInputId: null,
      coverOriginalFile: null,
      quickStart: [
        {
          uid: '234sdf',
          title: '小红书',
          type: '1'
        },
        {
          uid: 'sd12',
          title: '如何牢记Linux指令',
          type: '2'
        },
        {
          uid: 'asfdsf44',
          title: 'JVM调优指南',
          type: '2'
        }
      ],
      fontSizeRange: [12, 13, 14, 15, 16, 17, 18, 19],
      showDocSetting: false,
      showDeleteModal: false,
      // 更多设置内容 1文档设置，2历史版本
      drawerType: 1,
      inputVisible: false,
      inputValue: '',
      // 全局设置
      docStyle: {
        docFontSize: 15,
        showSelect: false,
        // 文章段间距  常规、宽松 standard/loose
        segmentSpace: 'standard',
        // 是否设置当前格式为默认格式（主要就包含正文字体大小和标准段落间距）
        customerTheme: false,
        // 页面大小1=标宽模式，2=超宽模式
        pageSize: 1
      },
      // 一级分类
      firstLevelList: [
        {
          uid: 'sdfsf55',
          code: 'computenetwork',
          menuName: '计算机与网络'
        },
        {
          uid: 'asdas34213',
          menuName: '编程语言',
          code: 'language'
        },
        {
          uid: 'sdfs453',
          code: 'database',
          menuName: '数据库'
        },
        {
          uid: 'dfg345g',
          code: 'middleware',
          menuName: '中间件'
        },
        {
          uid: 'sgfg566',
          code: 'arithmetic',
          menuName: '算法'
        }
      ],
      secondLevelList: [
        {
          uid: 122,
          menuName: '计算机基础',
          code: 2
        },
        {
          uid: 123,
          menuName: '操作系统',
          code: 3
        },
        {
          uid: 126,
          menuName: '网络安全',
          code: 4
        }
      ]
    }
  },
  computed: {
    currentFontIndex() {
      return this.fontSizeRange.findIndex(
        (item) => item === this.docStyle.docFontSize
      );
    }
  },
  methods: {
    /**
     * 手动更新文档内容
     */
    updateDocConten() {
      let engine = this.$refs.editorContainer?.engine;
      if (engine) {
        let value = engine.model.toValue();
        console.dir(value)
      }
    },
    /**
     * 为子组件定义的事件方法
     */
    updateTitle(titleValue) {
      this.docInfo.title = titleValue;
    },
    changeFontSise(value) {
      this.docStyle.docFontSize = value;
    },
    changePageSize(value) {
      this.docStyle.pageSize = value;
    },
    routerPush() {
      this.$router.push({path: '/'})
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
        this.docInfo.coverPreview = data;
      })
    },
    imgLoadOver(data) {
      if (data) {
        this.$nextTick(() => {
          this.getNewCropImage();
          this.cropInfo.height = this.$refs.cropper.cropH;
          this.cropInfo.width = this.$refs.cropper.cropW;
          this.cropInfo.flushPreview = setInterval(() => {
            if (!this.baseInfo.coverOriginalFile) {
              clearInterval(this.cropInfo.flushPreview);
              this.cropInfo.flushPreview = null;
              return;
            }
            let cropH = this.$refs.cropper.cropH;
            let cropW = this.$refs.cropper.cropW;
            if (this.cropInfo.height !== cropH || this.cropInfo.width !== cropW) {
              this.cropInfo.height = cropH;
              this.cropInfo.width = cropW;
              this.getNewCropImage();
            }
          }, 1000)
        })
      }
    },
    clearCoverPreview() {
      this.docInfo.coverPreview = null;
      this.coverOriginalFile = null;
    },
    fileHandle(file) {
      if (file?.size > 5120 * 1024) {
        this.$Message.error('文件大小不得超过5M')
        return false;
      }
      let _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        _this.coverOriginalFile = this.result;
      }
      return false;
    },
    getTooltipContainer() {
      return this.$refs.TooltipContainer
    },
    changeTagColor(tag) {
      tag.color = getRandomColor();
    },
    // 标签移除
    handleClose(removedTag) {
      this.docInfo.tags = this.docInfo.tags.filter(tag => tag !== removedTag);
      // ant的这个关闭方法其实会将tag设置为display=none，而不是删除，所以需要阻止他的这个操作
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
      let tags = this.docInfo.tags;
      if (tag.content && tags.indexOf(tag) === -1) {
        this.docInfo.tags = [...tags, tag];
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    returnDocSetting() {
      this.showDocSetting = false;
      setTimeout(() => {
        document.getElementById("settingIcon").click()
      }, 300)
      event.preventDefault();
    },
    // 提交文档设置
    submitDocSetting() {
      this.$Message.success("保存成功！")
    },
    showDrawer(drawerType) {
      this.drawerType = drawerType;
      this.showDocSetting = true;
    },
    editVersionTag(versionId) {
      this.versionInputId = versionId;
      this.$nextTick(() => {
        this.$refs.versionInput[0].focus({
          cursor: 'end'
        });
      })
    },
    newVersionTag() {
      this.showDrawer(2);
      this.tmpVersionTag = '';
    },
    createNewVersion() {
      this.historyVersion.unshift({
        id: '1123sasdasdas',
        versionTag: this.tmpVersionTag,
        createTime: Date.now()
      });
      this.tmpVersionTag = null;
    },
    deleteModal(tagId) {
      // 默认删除当前文档，tagId为空
      this.showDeleteModal = true;
    },
    formatTime
  },
  components: {
    Editor,
    VueCropper
  }
}
</script>

<style scoped lang="less">
@import '../components/css/write-center.less';
</style>
