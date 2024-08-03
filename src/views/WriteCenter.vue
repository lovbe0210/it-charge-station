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
              <div @click="routerPush('/')" class="quick-menu">
                <span class="iconfont home"/>
                首页
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="quick-menu" @click="routerPush('/user')">
                <span class="iconfont person-info"/>
                个人中心
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="quick-menu" @click="routerPush('/dashboard')">
                <span class="iconfont creation-center"/>
                创作空间
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="quick-menu" @click="saveAndNewDoc">
                <span class="iconfont i-add"/>
                新建文章
              </div>
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
          <span class="update-time un-select">
            最后更新于今天 12:23
            <span class="iconfont icon-cloud"/>
          </span>
        </b-list-group-item>
      </b-list-group>
      <div class="editor-setting">
        <a-tooltip overlayClassName="read-header-tooltip" :getPopupContainer="()=>this.$refs.TooltipContainer">
          <template slot="title">
            <span>已开启自动发布，内容将自动更新至阅读页面，亦可手动点击更新</span>
          </template>
          <Button class="update-btn" type="success" @click="updateDocConten">
            发布
          </Button>
        </a-tooltip>

        <div class="setting-icon action-icon" @click="showDocSetting = true">
          <span class="iconfont layout"/>
        </div>
        <Drawer :mask="drawerType === 0"
                :closable="true"
                :transfer="false"
                :width="17"
                class="un-select article-drawer"
                v-model="showDocSetting">
          <div slot="header" @click="returnDocSetting">
            <span class="iconfont return"/>
            <span>{{ drawerType === 1 ? '文档设置' : drawerType === 2 ? '历史版本' : '返回' }}</span>
          </div>
          <div class="operate-and-info" v-show="drawerType === 0">
            <div class="drawer-setting-item font-size">
              <div class="label-wrapper">
                <div class="icon-wrapper">
                  <span class="iconfont font"></span>
                </div>
              </div>
              <div class="font-select">
                <div class="slider-module_slideTitle">
                  <span>正文大小</span>
                  <div class="selected-font-size">{{ docStyle.docFontSize }}px</div>
                </div>
                <div class="select-point">
                  <div class="slider-module_slideContainer un-select" @mouseenter="fontSizeShowSelect = true"
                       @mouseleave="fontSizeShowSelect = false">
                    <div class="ant-slider ant-slider-with-marks classic">
                      <div class="ant-slider-rail"></div>
                      <div class="ant-slider-step">
                        <div v-for="(item,index) in fontSizeRange"
                             :key="index"
                             @click="changeFontSise(item)"
                             :sdsd="index"
                             class="slider-dot-wrapp"
                             :style="'left: '+ index * 100/(fontSizeRange.length-1) + '%;'">
                          <span class="slider-dot"/>
                        </div>
                      </div>
                      <div :class="['ant-slider-handle', fontSizeShowSelect ? 'show-select-font' : '']"
                           :style="'left: ' +
                            (currentFontIndex === 0 ? '3.5' : currentFontIndex === (fontSizeRange.length -1) ? '97' : (currentFontIndex * 100/(fontSizeRange.length-1))) +
                           '%;'">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="drawer-setting-item page-size">
              <div class="label-wrapper">
                <div class="icon-wrapper">
                  <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"
                       class="larkui-icon Select-module_iconSvg"
                       data-name="DocAdapt" style="width: 28px; min-width: 28px; height: 28px;">
                    <g fill="#00B96B" fill-rule="evenodd">
                      <rect width="25" height="28" rx="3" opacity="0.3"></rect>
                      <rect x="4" y="5" width="18" height="3" rx="1.5"></rect>
                      <rect x="4" y="10" width="18" height="3" rx="1.5"></rect>
                      <rect x="4" y="15" width="16" height="3" rx="1.5"></rect>
                      <rect x="4" y="20" width="14" height="3" rx="1.5" opacity="0.3"></rect>
                      <rect x="4" y="20" width="6" height="3" rx="1.5"></rect>
                    </g>
                  </svg>
                </div>
                <div>
                  <div class="label">超宽模式</div>
                  <div class="label_desc">文档宽度适应屏幕大小</div>
                </div>
              </div>
              <i-switch v-model="docStyle.pageSize" class="switch-btn" size="small">
                <span slot="1"/>
                <span slot="0"/>
              </i-switch>
            </div>
            <div class="drawer-setting-item theme-sync">
              <div class="label-wrapper">
                <div class="icon-wrapper">
                  <span class="iconfont custome-theme"></span>
                </div>
                <div>
                  <div class="label">主题同步</div>
                  <div class="label_desc">阅读页面同步显示自定义主题</div>
                </div>
              </div>
              <i-switch v-model="docStyle.customerTheme" class="switch-btn" size="small">
                <span slot="1"/>
                <span slot="0"/>
              </i-switch>
            </div>
            <div class="drawer-setting-item more-setting">
              <div class="doc-setting-btn" @click="drawerType = 1">
                <span class="iconfont setting"></span>
                <div class="tab-content-text">文档设置</div>
              </div>
              <Divider/>
              <div class="doc-setting-btn" @click="drawerType = 2">
                <span class="iconfont history"></span>
                <div class="tab-content-text">查看历史版本</div>
              </div>
              <div class="doc-setting-btn save-version" @click="addNewVersion">
                <div class="tab-content-text">保存为版本</div>
              </div>
              <Divider/>
              <div class="doc-setting-btn delete-btn" @click="showDeleteModal = true">
                <span class="iconfont delete"></span>
                <div class="tab-content-text">删除</div>
              </div>

            </div>
            <div class="drawer-setting-item time-info">
              <div class="label">文档信息</div>
              <div class="article-time">
                <span>字数统计：0</span>
                <span>创建于：2023-08-08 14:09</span>
                <span>更新于：2023-08-08 14:09</span>
              </div>
            </div>
          </div>
          <div v-if="drawerType === 1">
            <article-setting :articleId="docInfo.uid" :changePermission="true"/>
          </div>
          <div v-if="drawerType === 2">
            <article-version :articleId="docInfo.uid" :addNewVersion="newVersion"/>
          </div>
        </Drawer>
        <Modal v-model="showDeleteModal"
               :class-name="docStyle.customerTheme ? 'delete-modal delete-modal-ct' : 'delete-modal'"
               :width="416"
               :transfer="false"
               :footer-hide="true">
          <div class="delete-tips">
            <span class="iconfont i-warn"></span>
            确认删除 {{ docInfo.title }} ？
          </div>
          <div class="confirm-btn">
            <Button :class="docStyle.customerTheme ? 'ghost-btn' : ''">取消</Button>
            <Button type="success">确定</Button>
          </div>
        </Modal>
      </div>
    </b-row>
    <b-row class="editor-root">
      <editor @updateTitle="updateTitle" :docInfo="docInfo" :docStyle="docStyle" ref="editorContainer"></editor>
    </b-row>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import {formatTime} from '@/utils/emoji'
import ArticleSetting from "@/components/common/ArticleSetting"
import ArticleVersion from "@/components/common/ArticleVersion"

export default {
  name: 'WriteCenter',
  data() {
    return {
      docInfo: {
        uid: 1212121,
        title: 'lovbe0210',
        content: "{\"type\":\"div\",\"children\":[{\"type\":\"div\",\"data-card-value\":\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E8%A7%84%E5%88%92%E5%B1%80%E5%9B%BD%E9%99%85%E5%8C%96%22%2C%22autoWrap%22%3Afalse%2C%22id%22%3A%22W3QHK%22%2C%22type%22%3A%22block%22%7D\",\"data-card-type\":\"block\",\"data-card-key\":\"codeblock\",\"data-id\":\"d1buzc9eg-4oyilu8m9vk000\",\"data-card-editable\":\"false\",\"children\":[]},{\"type\":\"div\",\"data-card-value\":\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E5%A4%A7%E5%93%A5%E5%A4%A7%E5%93%A5%E6%A2%B5%E8%92%82%E5%86%88%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E5%86%BB%E5%B9%B2%E7%B2%89%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E9%AB%98%E5%BA%A6%E8%A6%86%E7%9B%96%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E8%A6%86%E7%9B%96%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%9C%B0%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%A4%A7%E8%8C%83%E7%94%98%E8%BF%AA%E8%A6%86%E7%9B%96%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E9%83%BD%E5%8F%91%E7%BB%99%E5%AF%B9%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%5Cn%E9%94%85%5Cn%22%2C%22autoWrap%22%3Atrue%2C%22id%22%3A%22XN6w3%22%2C%22type%22%3A%22block%22%7D\",\"data-card-type\":\"block\",\"data-card-key\":\"codeblock\",\"data-id\":\"da9ajx1ko-4003x371z14000\",\"data-card-editable\":\"false\",\"children\":[]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4oni0r861to000\",\"children\":[{\"text\":\"的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度\"}]},{\"type\":\"h1\",\"id\":\"h4kgw8yp6-1u01rj732jcw0\",\"data-id\":\"h7mo8zo94-5nv8388lhwo000\",\"children\":[{\"text\":\"第一章 大标题\"}]},{\"type\":\"h2\",\"id\":\"h4kgw8yp6-i740lb38rso0\",\"data-id\":\"h6nir3p2w-2jnufm6br3c000\",\"children\":[{\"text\":\"一、小标题\"}]},{\"type\":\"h3\",\"id\":\"h4kgw8yp6-igh2t92msg000\",\"data-id\":\"h231x8tls-14rup6isoly800\",\"children\":[{\"text\":\"1.大幅度发啊实打实多啊实打实多阿萨达阿闪大大\"}]},{\"type\":\"h4\",\"id\":\"h4kgw8yp6-fipuovm5ug000\",\"data-id\":\"h1uqpx7og-17qdbtabqyu800\",\"children\":[{\"text\":\"1.1 发达了\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-373juoeq7s2000\",\"children\":[{\"text\":\"1.1.1 真的吗\"}]},{\"type\":\"h6\",\"id\":\"h4kgw8yp6-f9y8qdkbpz400\",\"data-id\":\"h7mo8zst8-20n2vxu85pls00\",\"children\":[{\"text\":\"1.1.1.1 真的水电费水电费水电费水电费水电费\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3a0upzg9xse000\",\"children\":[{\"text\":\"sdfsdfsdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-41gdp7jyfdi000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4q9rvj7obmg000\",\"children\":[{\"text\":\"地方\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3lk2429tbs0000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-13rjc6amy34000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2qka9w73n92000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-gxv45zmcy7c00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1o3v308r5v4w00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-143ufqjondts00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1oboszuyruu800\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-c8fttwsr73k00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3vp72us46yg000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3is2qbifi78000\",\"children\":[{\"text\":\"df\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3qt0d0xz3is000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4sqiio74z4w000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3fgc7cej9q8000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2dnru20ayp1c00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4u2rblyv2ky000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3va5jo66ww6000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-5cp5y6hko38000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1ju0iof1vssg00\",\"children\":[{\"text\":\"df\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4o2oodjhczy000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1ses0l6esb6o00\",\"children\":[{\"text\":\"df\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1i8ygi8g4o4g00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-cj5imtln78g00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-5a5rmknukps000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4k67gxaenxq000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1y3don6icl4w00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2a0pstvtqo7w00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-5om4exkml8g000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3pcl6jc7u24000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-5m3ep3wlywg000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4vt25kjjpa0000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2ozu5w9iy2q000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-48bzincwhck000\",\"children\":[{\"text\":\"dfs\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-euf89kaloww00\",\"children\":[{\"text\":\"df\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1tnoi6ygnye800\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-23uew1fu5kww00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-17bpkapv7o8w00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-27orj6se61hc00\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-c9fgteme4so00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1oolv0zvc9eo00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1ly7w8ny7etc00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-u2ta8hgdi9c00\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-30i20qaeadc000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-99gvyj3xddk00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-ksdbzg14es000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1xxlvck503s000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2jtunho87jk000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-57rx0m1lof4000\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-12deagm18sf400\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2ivysu97cki000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-37fv35w8qx8000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-35b7d2y9hiw000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-mwvm0vsni2o00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3sezd736ygo000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-14n2juucc8dc00\",\"children\":[{\"text\":\"fsd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3wm68rfszic000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1sqhbl85tilc00\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-128zofo918wg00\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-20yxqbwwrlgg00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-vvgwvissm1c00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3ju2f8tmbn8000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-57vn2q697jc000\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3c333m9oinc000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-40hfq2i7ktk000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-48y3itp384w000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-53lka4c0rds000\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-33fqmiu3ijo000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1lg2a02vvmyo00\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-yam3z33gibk00\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2105iu67cjr400\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1j0x431wgcdc00\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-51bnuiiz5wk000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-19g2g5zzt2v400\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-mg0h300kdgg00\",\"children\":[{\"text\":\"s\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4ks3bhbiizs000\",\"children\":[{\"text\":\"d\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-47oihi74ji0000\",\"children\":[{\"text\":\"f\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2jmsdaj0da8000\",\"children\":[{\"text\":\"sd\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-405l32a87p8000\",\"children\":[{\"text\":\"fsdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-1ir4b0kp4nsw00\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2z7c10e196o000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-42bb419jc9w000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4vmra2vmbva000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4iee4ve7szk000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-47bwh9nzrag000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3akx0y6xljs000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-zbjf5ka8zk000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2fraqd5iw8kk00\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-3ncezjj7444000\",\"children\":[{\"text\":\"sf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-23zvyo0ajvmo00\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2jqtd5xga78000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4pua5ql8asc000\",\"children\":[{\"text\":\"sdf\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-4ylkvgd1570000\",\"children\":[{\"type\":\"br\",\"children\":[]}]},{\"type\":\"h3\",\"id\":\"h4kgw8yp6-beg9hwws2bc00\",\"data-id\":\"h9ql9cmio-fzavpj8vzy800\",\"children\":[{\"text\":\"2.小幅度发\"}]},{\"type\":\"h2\",\"id\":\"h4kgw8yp6-cnbb438571k00\",\"data-id\":\"hgdryewbo-1crcmpyf1hb400\",\"children\":[{\"text\":\"二、中表题\"}]},{\"type\":\"h3\",\"data-id\":\"hgaw9birk-2bm09duqqcbo00\",\"id\":\"h231x8tls-8n9mwmm81f000\",\"children\":[{\"text\":\"1.大幅度发\"}]},{\"type\":\"h4\",\"data-id\":\"h6fy3951c-3gm7h321myc000\",\"id\":\"h1uqpx7og-ghgnusv66cg00\",\"children\":[{\"text\":\"1.1 发达了\"}]},{\"type\":\"h5\",\"data-id\":\"h2lr2xwbi-782wy6ub21s00\",\"id\":\"hqmwfki9s-bwo7j1j4wjk00\",\"children\":[{\"text\":\"1.1.1 真的吗\"}]},{\"type\":\"h6\",\"data-id\":\"h17e3kxeo-5s58g3qwgbo000\",\"id\":\"h7mo8zst8-idey9a86d9k00\",\"children\":[{\"text\":\"1.1.1.1 真的想\"}]},{\"type\":\"h2\",\"id\":\"h4kgw8yp6-1l16dubmmqf40\",\"data-id\":\"h1mfgsrq8-2677g2l7exls00\",\"children\":[{\"text\":\"三、小标题\"}]},{\"type\":\"h3\",\"data-id\":\"h1mooaxr4-57xbcod3k4c000\",\"id\":\"h231x8tls-4o01xa0z89k00\",\"children\":[{\"text\":\"1.大幅度发说的\"}]},{\"type\":\"h4\",\"data-id\":\"h5sgze6a8-4z0gzaa08yw000\",\"id\":\"h1uqpx7og-c02r7iflodc00\",\"children\":[{\"text\":\"1.1 发达了是\"}]},{\"type\":\"h5\",\"data-id\":\"h9di87lr8-4fzpfbb2ufs000\",\"id\":\"hqmwfki9s-a6cc90wjiao00\",\"children\":[{\"text\":\"1.1.1 真的吗\"}]},{\"type\":\"h6\",\"data-id\":\"h9edidg2k-9lpeh1bk7vo00\",\"id\":\"h7mo8zst8-dpo4698v2vc00\",\"children\":[{\"text\":\"1.1.1.1 真的\"}]},{\"type\":\"h3\",\"id\":\"h4kgw8yp6-1443qb4fyarg0\",\"data-id\":\"h7mo8x65o-23n78nl2qsyo00\",\"children\":[{\"text\":\"三级大标题\"}]},{\"type\":\"h4\",\"id\":\"h5sgze6a8-l3lubgrdngw00\",\"data-id\":\"ho54pzw1c-1jtc4yxb7jeo00\",\"children\":[{\"text\":\"1.1 发达了\"}]},{\"type\":\"h5\",\"id\":\"h9di87lr8-9z8mnjlt1c400\",\"data-id\":\"h1fiz3x9c-11cs4f9c2vj400\",\"children\":[{\"text\":\"1.1.1 真的吗说的\"}]},{\"type\":\"p\",\"data-id\":\"p1dr9j7ls-2bk3wysbgyo000\",\"children\":[{\"type\":\"br\",\"children\":[]}]}]}"
      },
      newVersion: false,
      fontSizeRange: [12, 13, 14, 15, 16, 17, 18, 19],
      showDocSetting: false,
      showDeleteModal: false,
      // 更多设置内容 1文档设置，2历史版本
      drawerType: 0,
      fontSizeShowSelect: false,
      // 全局设置
      docStyle: {
        docFontSize: 15,
        // 是否同步显示主题
        customerTheme: false,
        // 页面大小1=标宽模式，2=超宽模式
        pageSize: 1
      }
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
    routerPush(path) {
      this.$router.push({path: path})
    },
    addNewVersion () {
      this.newVersion = true;
      this.drawerType = 2;
    },
    returnDocSetting() {
      if (this.drawerType) {
        this.drawerType = 0;
        this.newVersion = false;
      } else {
        this.showDocSetting = false;
      }
    },
    saveAndNewDoc() {
    },
    formatTime
  },
  components: {
    Editor,
    ArticleSetting,
    ArticleVersion
  }
}
</script>

<style scoped lang="less">
@import '../components/css/write-center.less';
</style>
