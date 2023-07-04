<template>
  <div class="read-center">
    <b-row class="editor-header">
      <div class="left-dropdown-wrapp">
        <Dropdown trigger="click" placement="bottom-start">
          <div class="menu-icon">
            <span class="iconfont icon-menu-dots"/>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem>
              <div>
                <span class="iconfont icon-home"/>
                首页
              </div>
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont icon-like"/>
              收藏
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont icon-new-doc"/>
              新建
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont icon-collapse"/>
              专题
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <b-list-group class="title-info" flush>
        <b-list-group-item class="title">
          {{docInfo.title === null || docInfo.title.length === 0 ? '无标题文档' : docInfo.title}}
        </b-list-group-item>
        <b-list-group-item class="author-info">
          <a href="">@福</a>
          <span style="color: #d9d9d9;margin: 0 8px 0 8px;">/</span>
          <a href="">从头开始</a>
          <span style="color: #d9d9d9;margin: 0 8px 0 8px;">|</span>
          <a href="" class="update-time">最后更新于今天 12:23<span class="iconfont icon-cloud"/></a>
        </b-list-group-item>
      </b-list-group>
      <div class="editor-setting">
        <b-button class="update-btn" variant="outline-*" size="sm" @click="updateDocConten" id="update-btn">
          更新
        </b-button>
        <Dropdown placement="bottom-end" trigger="click">
          <div class="setting-icon">
            <span class="iconfont icon-edit-more"/>
          </div>
          <DropdownMenu slot="list">
            <Dropdown placement="left-start" class="doc-set-style-wrapp" trigger="hover">
              <DropdownItem>
                <div class="editor-set doc-set-style">
                  <span class="editor-icon iconfont icon-editor-style"/>
                  <div>
                    <span>文档样式</span>
                    <span class="iconfont icon-more"></span>
                    <br>
                    <span style="color: #8c8c8c; font-size: 12px;">设置正文大小、段间距、超宽…</span>
                  </div>
                </div>
              </DropdownItem>
              <DropdownMenu slot="list">
                <div class="style-item font-size">
                  <div class="Slider-module_slideTitle">
                    <span>正文大小</span>
                  </div>
                  <div class="Slider-module_slideContainer" @mouseenter="docStyle.showSelect = true"
                       @mouseleave="docStyle.showSelect = false">
                    <div class="ant-slider ant-slider-with-marks classic">
                      <div class="ant-slider-rail"></div>
                      <div class="ant-slider-step">
                        <div v-for="(item,index) in docStyle.fontSizeRange" :key="index" @click="changeFontSise(item)"
                             class="slider-dot-wrapp"
                             :style="'left: '+ index * 100/(docStyle.fontSizeRange.length-1) + '%;'">
                          <span class="ant-slider-dot"/>
                        </div>
                      </div>
                      <div :class="['ant-slider-handle', docStyle.showSelect ? 'show-select-font' : '']"
                           :style="'left: ' + currentFontIndex * 100/(docStyle.fontSizeRange.length-1) + '%;'">
                      </div>
                    </div>
                  </div>
                  <div>{{docStyle.docFontSize}}px</div>
                </div>
                <div class="style-item segment-space">
                  <div class="Slider-module_slideTitle">段间距</div>
                  <i-switch v-model="docStyle.segmentSpaceStatus" class="switch-btn" size="small" true-color="#00B96B">
                    <span slot="true"/>
                    <span slot="false"/>
                  </i-switch>
                </div>
                <div class="style-item set-default">
                  <Checkbox v-model="docStyle.SetDefault">&nbsp;保存为默认设置</Checkbox>
                </div>
                <Divider/>
                <div class="style-item">页面尺寸</div>
                <div class="style-item page-size">
                  <div :class="['standard-wide', docStyle.pageSize === 1 ? 'Select-module_optionActive' : '']" @click="changePageSize(1)">
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
                  <div :class="['ultra-wide', docStyle.pageSize === 2 ? 'Select-module_optionActive' : '']" @click="changePageSize(2)">
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
              </DropdownMenu>
            </Dropdown>
            <Divider/>
            <DropdownItem>
              <div class="editor-set">
                <span class="editor-icon iconfont icon-editor-setting"></span>
                <span>文档设置</span>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="editor-set">
                <span class="editor-icon iconfont icon-history"></span>
                <span>查看历史版本</span>
              </div>
            </DropdownItem>
            <DropdownItem>
              <span class="editor-set for-version">保存为版本</span>
            </DropdownItem>
            <Divider/>
            <DropdownItem>
              <div class="editor-set">
                <span class="editor-icon iconfont icon-editor-del"></span>
                <span>删除</span>
              </div>
            </DropdownItem>
            <Divider/>
            <div class="doc-info">
              <div>字数统计：0</div>
              <div>创建于：03-15</div>
              <div>最后编辑于：昨天 11:20</div>
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    </b-row>
    <b-row class="editor-root">
      <div ref="view"></div>
    </b-row>

    <b-tooltip target="update-btn" placement="bottomright" delay="250" triggers="hover" variant="dark"
               container="update-btn">
      <div style="width: 120px; color: #FFFFFF; font-size: 12px;">
        已开启自动发布，内容将自动更新至阅读页面，亦可手动点击更新
      </div>
    </b-tooltip>
  </div>
</template>

<script>
  import {View} from '@aomao/engine'
  import {plugins, cards, pluginConfig} from "@/components/common/editor/config"

  export default {
    name: 'ReadCenter',
    data() {
      return {
        docInfo: {
          title: 'lovbe0210',
          content: "<card type=\"block\" value=\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E8%A7%84%E5%88%92%E5%B1%80%E5%9B%BD%E9%99%85%E5%8C%96%22%2C%22autoWrap%22%3Afalse%2C%22id%22%3A%22W3QHK%22%2C%22type%22%3A%22block%22%7D\" name=\"codeblock\" editable=\"false\" data-id=\"d1buzc9eg-4oyilu8m9vk000\" ></card><card type=\"block\" value=\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E5%A4%A7%E5%93%A5%E5%A4%A7%E5%93%A5%E6%A2%B5%E8%92%82%E5%86%88%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E5%86%BB%E5%B9%B2%E7%B2%89%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E9%AB%98%E5%BA%A6%E8%A6%86%E7%9B%96%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E8%A6%86%E7%9B%96%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%9C%B0%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%A4%A7%E8%8C%83%E7%94%98%E8%BF%AA%E8%A6%86%E7%9B%96%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E9%83%BD%E5%8F%91%E7%BB%99%E5%AF%B9%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%5Cn%E9%94%85%5Cn%22%2C%22autoWrap%22%3Atrue%2C%22id%22%3A%22XN6w3%22%2C%22type%22%3A%22block%22%7D\" name=\"codeblock\" editable=\"false\" data-id=\"da9ajx1ko-4003x371z14000\" ></card><p data-id=\"p1dr9j7ls-4oni0r861to000\">的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度</p><h1 data-id=\"h7mo8zo94-5nv8388lhwo000\" id=\"h4kgw8yp6-1u01rj732jcw0\">第一章 大标题</h1><h2 data-id=\"h6nir3p2w-2jnufm6br3c000\" id=\"h4kgw8yp6-i740lb38rso0\">一、小标题</h2><h3 data-id=\"h231x8tls-14rup6isoly800\" id=\"h4kgw8yp6-igh2t92msg000\">1.大幅度发啊实打实多啊实打实多阿萨达阿闪大大</h3><h4 data-id=\"h1uqpx7og-17qdbtabqyu800\" id=\"h4kgw8yp6-fipuovm5ug000\">1.1 发达了</h4><p data-id=\"p1dr9j7ls-373juoeq7s2000\">1.1.1 真的吗</p><h6 data-id=\"h7mo8zst8-20n2vxu85pls00\" id=\"h4kgw8yp6-f9y8qdkbpz400\">1.1.1.1 真的水电费水电费水电费水电费水电费</h6><p data-id=\"p1dr9j7ls-3a0upzg9xse000\">sdfsdfsdf</p><p data-id=\"p1dr9j7ls-41gdp7jyfdi000\">d</p><ul class=\"data-list data-list-task\" data-id=\"u3zhx2ezt-21tgfic9lksg0\"><li data-id=\"l19a1dmf4-qftzd76ktkw0\" class=\"data-list-item\" checked=\"true\"><card type=\"inline\" value=\"data:%7B%22id%22%3A%22hS6cH%22%2C%22type%22%3A%22inline%22%2C%22checked%22%3Atrue%7D\" name=\"checkbox\" editable=\"false\" ></card>啊实打实大大</li><li data-id=\"l2wwhsngu-ogak31zvw9s0\" class=\"data-list-item\" checked=\"true\"><card type=\"inline\" value=\"data:%7B%22id%22%3A%22V3QL4%22%2C%22type%22%3A%22inline%22%2C%22checked%22%3Atrue%7D\" name=\"checkbox\" editable=\"false\" ></card>啊实打实多</li></ul><ul data-id=\"u1dr9j7ls-j27kyxip1eg00\"><li data-id=\"l19a1dmf4-fj670hhi6a800\">阿闪大大</li><li data-id=\"l19a1dmf4-dhjlxvdleo800\">阿萨达</li></ul><ul data-id=\"u1dr9j7ls-8iqt1r831l800\" data-indent=\"1\"><li data-id=\"l19a1dmf4-192sz3l3y82o0\">啊实打实多</li><li data-id=\"l19a1dmf4-3j3n0c2nvyo00\">阿闪大大</li></ul><ul data-id=\"u2ynadd4g-u5de02rhli80\" data-indent=\"2\"><li data-id=\"l19a1dmf4-bezduxvoqqw00\">啊实打实多</li><li data-id=\"l19a1dmf4-dwur845yavc00\">阿萨达</li></ul><ul data-id=\"u2ynadd4g-4lngc18weve00\" data-indent=\"3\"><li data-id=\"l19a1dmf4-e8p5v1cphi800\">啊实打实</li></ul><ol start=\"1\" data-id=\"o3i5gzqam-2f2u1jd4jmkg0\"><li data-id=\"l19a1dmf4-38upsgl0cqk00\">阿萨达但是</li><li data-id=\"l19a1dmf4-ih00a5dzad400\">啊实打实多</li><li data-id=\"l19a1dmf4-jc24gr1t80w00\">阿萨达</li><li data-id=\"l19a1dmf4-ft5o4ya7lwg00\">阿萨达</li></ol><ol start=\"1\" data-id=\"o3i5gzqam-albemb7ax6800\" data-indent=\"1\"><li data-id=\"l19a1dmf4-fbovya413j400\">啊实打实</li><li data-id=\"l19a1dmf4-hv3s4y6vazc00\">阿萨达</li></ol><ol start=\"1\" data-id=\"oqz2fhwi8-fbw0js2raa000\" data-indent=\"2\"><li data-id=\"l19a1dmf4-gtrr0vheky000\">啊实打实</li><li data-id=\"l19a1dmf4-h8srhzmqfsg00\">啊实打实</li></ol><p data-id=\"p1dr9j7ls-4q9rvj7obmg000\">地方</p><p data-id=\"p1dr9j7ls-3lk2429tbs0000\">s</p><p data-id=\"p1dr9j7ls-13rjc6amy34000\">f</p><p data-id=\"p1dr9j7ls-2qka9w73n92000\">sd</p><p data-id=\"p1dr9j7ls-gxv45zmcy7c00\">f</p><p data-id=\"p1dr9j7ls-1o3v308r5v4w00\">sd</p><p data-id=\"p1dr9j7ls-143ufqjondts00\">f</p><p data-id=\"p1dr9j7ls-1oboszuyruu800\">sd</p><p data-id=\"p1dr9j7ls-c8fttwsr73k00\">f</p><p data-id=\"p1dr9j7ls-3vp72us46yg000\">s</p><p data-id=\"p1dr9j7ls-3is2qbifi78000\">df</p><p data-id=\"p1dr9j7ls-3qt0d0xz3is000\">sdf</p><p data-id=\"p1dr9j7ls-4sqiio74z4w000\">sdf</p><p data-id=\"p1dr9j7ls-3fgc7cej9q8000\">sd</p><p data-id=\"p1dr9j7ls-2dnru20ayp1c00\">f</p><p data-id=\"p1dr9j7ls-4u2rblyv2ky000\">sdf</p><p data-id=\"p1dr9j7ls-3va5jo66ww6000\">sdf</p><p data-id=\"p1dr9j7ls-5cp5y6hko38000\">s</p><p data-id=\"p1dr9j7ls-1ju0iof1vssg00\">df</p><p data-id=\"p1dr9j7ls-4o2oodjhczy000\">s</p><p data-id=\"p1dr9j7ls-1ses0l6esb6o00\">df</p><p data-id=\"p1dr9j7ls-1i8ygi8g4o4g00\">s</p><p data-id=\"p1dr9j7ls-cj5imtln78g00\">sd</p><p data-id=\"p1dr9j7ls-5a5rmknukps000\">f</p><p data-id=\"p1dr9j7ls-4k67gxaenxq000\">sd</p><p data-id=\"p1dr9j7ls-1y3don6icl4w00\">f</p><p data-id=\"p1dr9j7ls-2a0pstvtqo7w00\">s</p><p data-id=\"p1dr9j7ls-5om4exkml8g000\">d</p><p data-id=\"p1dr9j7ls-3pcl6jc7u24000\">f</p><p data-id=\"p1dr9j7ls-5m3ep3wlywg000\">s</p><p data-id=\"p1dr9j7ls-4vt25kjjpa0000\">f</p><p data-id=\"p1dr9j7ls-2ozu5w9iy2q000\">s</p><p data-id=\"p1dr9j7ls-48bzincwhck000\">dfs</p><p data-id=\"p1dr9j7ls-euf89kaloww00\">df</p><p data-id=\"p1dr9j7ls-1tnoi6ygnye800\"><br /><br /></p><p data-id=\"p1dr9j7ls-23uew1fu5kww00\">sd</p><p data-id=\"p1dr9j7ls-17bpkapv7o8w00\">f</p><p data-id=\"p1dr9j7ls-27orj6se61hc00\"><br /><br /></p><p data-id=\"p1dr9j7ls-c9fgteme4so00\">sd</p><p data-id=\"p1dr9j7ls-1oolv0zvc9eo00\">f</p><p data-id=\"p1dr9j7ls-1ly7w8ny7etc00\">s</p><p data-id=\"p1dr9j7ls-u2ta8hgdi9c00\">d</p><p data-id=\"p1dr9j7ls-30i20qaeadc000\">f</p><p data-id=\"p1dr9j7ls-99gvyj3xddk00\">sd</p><p data-id=\"p1dr9j7ls-ksdbzg14es000\">f</p><p data-id=\"p1dr9j7ls-1xxlvck503s000\">sd</p><p data-id=\"p1dr9j7ls-2jtunho87jk000\">f</p><p data-id=\"p1dr9j7ls-57rx0m1lof4000\"><br /><br /></p><p data-id=\"p1dr9j7ls-12deagm18sf400\">sd</p><p data-id=\"p1dr9j7ls-2ivysu97cki000\">f</p><p data-id=\"p1dr9j7ls-37fv35w8qx8000\">sd</p><p data-id=\"p1dr9j7ls-35b7d2y9hiw000\">f</p><p data-id=\"p1dr9j7ls-mwvm0vsni2o00\">s</p><p data-id=\"p1dr9j7ls-3sezd736ygo000\">d</p><p data-id=\"p1dr9j7ls-14n2juucc8dc00\">fsd</p><p data-id=\"p1dr9j7ls-3wm68rfszic000\">f</p><p data-id=\"p1dr9j7ls-1sqhbl85tilc00\">sdf</p><p data-id=\"p1dr9j7ls-128zofo918wg00\"><br /><br /></p><p data-id=\"p1dr9j7ls-20yxqbwwrlgg00\">sd</p><p data-id=\"p1dr9j7ls-vvgwvissm1c00\">f</p><p data-id=\"p1dr9j7ls-3ju2f8tmbn8000\">sd</p><p data-id=\"p1dr9j7ls-57vn2q697jc000\"><br /><br /></p><p data-id=\"p1dr9j7ls-3c333m9oinc000\">f</p><p data-id=\"p1dr9j7ls-40hfq2i7ktk000\">sd</p><p data-id=\"p1dr9j7ls-48y3itp384w000\">f</p><p data-id=\"p1dr9j7ls-53lka4c0rds000\">s</p><p data-id=\"p1dr9j7ls-33fqmiu3ijo000\">d</p><p data-id=\"p1dr9j7ls-1lg2a02vvmyo00\">f</p><p data-id=\"p1dr9j7ls-yam3z33gibk00\">sd</p><p data-id=\"p1dr9j7ls-2105iu67cjr400\">f</p><p data-id=\"p1dr9j7ls-1j0x431wgcdc00\"><br /><br /></p><p data-id=\"p1dr9j7ls-51bnuiiz5wk000\">sd</p><p data-id=\"p1dr9j7ls-19g2g5zzt2v400\">f</p><p data-id=\"p1dr9j7ls-mg0h300kdgg00\">s</p><p data-id=\"p1dr9j7ls-4ks3bhbiizs000\">d</p><p data-id=\"p1dr9j7ls-47oihi74ji0000\">f</p><p data-id=\"p1dr9j7ls-2jmsdaj0da8000\">sd</p><p data-id=\"p1dr9j7ls-405l32a87p8000\">fsdf</p><p data-id=\"p1dr9j7ls-1ir4b0kp4nsw00\">sdf</p><p data-id=\"p1dr9j7ls-2z7c10e196o000\">sdf</p><p data-id=\"p1dr9j7ls-42bb419jc9w000\">sdf</p><p data-id=\"p1dr9j7ls-4vmra2vmbva000\">sdf</p><p data-id=\"p1dr9j7ls-4iee4ve7szk000\">sdf</p><p data-id=\"p1dr9j7ls-47bwh9nzrag000\">sdf</p><p data-id=\"p1dr9j7ls-3akx0y6xljs000\">sdf</p><p data-id=\"p1dr9j7ls-zbjf5ka8zk000\">sdf</p><p data-id=\"p1dr9j7ls-2fraqd5iw8kk00\">sdf</p><p data-id=\"p1dr9j7ls-3ncezjj7444000\">sf</p><p data-id=\"p1dr9j7ls-23zvyo0ajvmo00\">sdf</p><p data-id=\"p1dr9j7ls-2jqtd5xga78000\">sdf</p><p data-id=\"p1dr9j7ls-4pua5ql8asc000\">sdf</p><p data-id=\"p1dr9j7ls-4ylkvgd1570000\"><br /><br /></p><h3 data-id=\"h9ql9cmio-fzavpj8vzy800\" id=\"h4kgw8yp6-beg9hwws2bc00\">2.小幅度发</h3><h2 data-id=\"hgdryewbo-1crcmpyf1hb400\" id=\"h4kgw8yp6-cnbb438571k00\">二、中表题</h2><h3 id=\"h231x8tls-8n9mwmm81f000\" data-id=\"hgaw9birk-2bm09duqqcbo00\">1.大幅度发</h3><h4 id=\"h1uqpx7og-ghgnusv66cg00\" data-id=\"h6fy3951c-3gm7h321myc000\">1.1 发达了</h4><h5 id=\"hqmwfki9s-bwo7j1j4wjk00\" data-id=\"h2lr2xwbi-782wy6ub21s00\">1.1.1 真的吗</h5><h6 id=\"h7mo8zst8-idey9a86d9k00\" data-id=\"h17e3kxeo-5s58g3qwgbo000\">1.1.1.1 真的想</h6><h2 data-id=\"h1mfgsrq8-2677g2l7exls00\" id=\"h4kgw8yp6-1l16dubmmqf40\">三、小标题</h2><h3 id=\"h231x8tls-4o01xa0z89k00\" data-id=\"h1mooaxr4-57xbcod3k4c000\">1.大幅度发说的</h3><h4 id=\"h1uqpx7og-c02r7iflodc00\" data-id=\"h5sgze6a8-4z0gzaa08yw000\">1.1 发达了是</h4><h5 id=\"hqmwfki9s-a6cc90wjiao00\" data-id=\"h9di87lr8-4fzpfbb2ufs000\">1.1.1 真的吗</h5><h6 id=\"h7mo8zst8-dpo4698v2vc00\" data-id=\"h9edidg2k-9lpeh1bk7vo00\">1.1.1.1 真的</h6><h3 data-id=\"h7mo8x65o-23n78nl2qsyo00\" id=\"h4kgw8yp6-1443qb4fyarg0\">三级大标题</h3><h4 data-id=\"ho54pzw1c-1jtc4yxb7jeo00\" id=\"h5sgze6a8-l3lubgrdngw00\">1.1 发达了</h4><h5 data-id=\"h1fiz3x9c-11cs4f9c2vj400\" id=\"h9di87lr8-9z8mnjlt1c400\">1.1.1 真的吗说的</h5><p data-id=\"p1dr9j7ls-2bk3wysbgyo000\"><br /><br /></p>"
        },
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
        // 全局字体大小
        docStyle: {
          fontSizeRange: [12, 13, 14, 15, 16, 17, 18, 19],
          docFontSize: 15,
          showSelect: false,
          // 统一文章段间距
          segmentSpaceStatus: false,
          // 是否设置当前格式为默认格式（主要就包含正文字体大小和标准段落间距）
          SetDefault: true,
          // 页面大小1=标宽模式，2=超宽模式
          pageSize: 1
        },
        view: null
      }
    },
    computed: {
      currentFontIndex() {
        return this.docStyle.fontSizeRange.findIndex(
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
          let jsonValue = engine.getJsonValue();
          console.log(JSON.stringify(jsonValue))
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
      }
    },
    mounted() {
      const container = this.$refs.view;
      if (container) {
        //实例化引擎
        const view = new View(container, {
          // 启用插件
          plugins,
          // 启用卡片
          cards,
          // 所有的插件配置
          config: pluginConfig,
          readonly: true
        });

        if (this.docInfo.content?.length !== 0) {
          view.render(this.docInfo.content, true)
        }
          const pattern = /h[1-6]/;
          let match = this.docInfo.content.match(pattern);
          if (match) {
            // this.renderTocData(engine);
          }
        this.view = view;
        }
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/read-center.less';
</style>
