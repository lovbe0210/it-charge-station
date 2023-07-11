<template>
  <div class="read-center" ref="tooltipContainer">
    <div class="layout-module_wrapper">
      <div class="layout-module_directoryWrapper" :style="{ width: sidebarWidth + 'px' }">
        <div class="layout-module_dragbar" @mousedown="startDrag"></div>
        <div class="layout-module_directory">
          <div class="directory-header">
            <div class="book-info">
              <div class="crumb">
                <a href="/dashboard" class="website-logo">
                  <span class="iconfont icon-logo"></span>
                </a>
                <span class="iconfont icon-more"></span>
                <a href="/dashboard/authorHome" class="crumb-text">布衣草人</a>
              </div>
            </div>
          </div>
          <div class="directory-nav"
               :style="{ width: sidebarWidth + 'px',
               'will-change': isDragging ? 'width' : null,
               transition: isDragging ? 'width 200ms cubic-bezier(0.1, 0, 0, 1) 0s' : null }">
            <div class="search-nav">
              <div class="search-bar">
                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                     class="larkui-icon larkui-icon-help-search ReaderLayout-module_navIcon_eoaa4">
                  <path
                    d="M114 20c51.362 0 93 41.638 93 93 0 21.782-7.489 41.816-20.032 57.666l45.82 46.277c4.275 4.317 4.24 11.282-.077 15.556-4.317 4.275-11.281 4.24-15.556-.077l-45.774-46.23C155.576 198.602 135.652 206 114 206c-51.362 0-93-41.638-93-93s41.638-93 93-93Zm0 20c-40.317 0-73 32.683-73 73s32.683 73 73 73 73-32.683 73-73-32.683-73-73-73Z"
                    fill="currentColor" fill-rule="nonzero">
                  </path>
                </svg>
                <span>搜索</span>
                <span class="search-hot-key">Ctrl + J</span>
              </div>
            </div>
            <div class="home-nav">
              <span class="iconfont icon-nav-home"></span>
              <span>专题首页</span>
            </div>
            <div class="nav-tabs">
              <div class="tabs-bar">
                <span class="tab-title popover-trigger" @click="navShowType = navShowType === 'tree' ? 'list' : 'tree'">
                  <span :class="['iconfont', navShowType === 'tree' ? 'icon-nav-tree' : 'icon-nav-list']"></span>
                  <span>目录</span>
                </span>
                <div class="actions-cont" v-show="navShowType === 'tree'">
                  <a-tooltip overlayClassName="read-nav-tooltip" :getPopupContainer="()=>this.$refs.tooltipContainer">
                    <template slot="title">
                      {{openAllTree ? '全部展开' : '全部折叠'}}
                    </template>
                    <span class="action-item" @click="expandTreeNode()">
                    <span :class="['iconfont', openAllTree ? 'icon-nav-open' : 'icon-nav-close']"></span>
                  </span>
                  </a-tooltip>
                </div>
              </div>
              <div class="tabs-content-holder">
                <div class="tabs-content">
                  <div class="tabs-tabpane list" v-show="navShowType === 'list'">
                    <div class="tabpane-list" :style="{ width: sidebarWidth + 'px' }">
                      <List>
                        <ListItem v-for="item in getListDirData()" :key="item.id">
                          <ListItemMeta description="hahsd沙拉领导啦啦啦速度快垃圾啊猎杀对决垃圾离开见识到了吉拉到家了案件受得了爱讲道理就asdads asd asd按">
                            <template slot="title">
                              <div class="title-content">
                                {{item.data}}
                              </div>
                              <span class="iconfont icon-nav-menu"></span>
                            </template>
                          </ListItemMeta>
                        </ListItem>
                      </List>
                    </div>
                  </div>
                  <div class="tabs-tabpane tree" v-show="navShowType === 'tree'">
                    <div class="tabpane-tree">
                      <div v-for="item in dirData" :key="item.id"
                           :class="['tree-content',item.type===1?'single-node-tree':item.type===2?'composite-nodes-tree':'']">
                        <div v-if="item.type === 1" class="single-tree-node">
                          {{item.data}}
                        </div>
                        <div v-if="item.type === 2" class="composite-tree-node">
                          <Tree :data="item.data" expand-node></Tree>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <!-- 内容显示部分 -->
        <div ref="view"></div>
      </div>
      <div class="layout-module_asideWrapper">
        <!-- 右侧大纲展示 -->
        <div class="editor-view">
          <div class="editor-toc-pin">
            <span class="editor-toc-pin-text">大纲</span>
            <div class="editor-toc-pin-wrap">
              <div class="ne-icon ne-iconfont" data-name="pin" style="font-size: 16px;">
                <span class="lake-icon lake-icon-pin" style="font-size: 16px;"></span>
              </div>
            </div>
          </div>
          <div class="editor-toc-inner">
            <div class="toc-content">
              <div class="toc-item" v-for="item in tocData"
                   :class="['toc-depth-'+ item.depth, item.id === currentTocId ? 'toc-selected' : '']"
                   :key="item.id"
                   @click="jump(item.id)">
                <div class="toc-item-inner">
                  <div class="toc-item-text" :title="item.text">
                    <span>{{item.text}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {View} from '@aomao/engine'
  import {plugins, cards, pluginConfig} from "@/components/common/editor/config"
  import {getTocData} from "../components/common/editor/utils";

  export default {
    name: 'ReadCenter',
    data() {
      return {
        isDragging: false,
        startX: 0,
        startWidth: 0,
        sidebarWidth: 345, // 初始宽度

        docInfo: {
          title: 'lovbe0210',
          content: "<card type=\"block\" value=\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E8%A7%84%E5%88%92%E5%B1%80%E5%9B%BD%E9%99%85%E5%8C%96%22%2C%22autoWrap%22%3Afalse%2C%22id%22%3A%22W3QHK%22%2C%22type%22%3A%22block%22%7D\" name=\"codeblock\" editable=\"false\" data-id=\"d1buzc9eg-4oyilu8m9vk000\" ></card><card type=\"block\" value=\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E5%A4%A7%E5%93%A5%E5%A4%A7%E5%93%A5%E6%A2%B5%E8%92%82%E5%86%88%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E5%86%BB%E5%B9%B2%E7%B2%89%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E9%AB%98%E5%BA%A6%E8%A6%86%E7%9B%96%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E8%A6%86%E7%9B%96%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%9C%B0%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%A4%A7%E8%8C%83%E7%94%98%E8%BF%AA%E8%A6%86%E7%9B%96%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E9%83%BD%E5%8F%91%E7%BB%99%E5%AF%B9%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%5Cn%E9%94%85%5Cn%22%2C%22autoWrap%22%3Atrue%2C%22id%22%3A%22XN6w3%22%2C%22type%22%3A%22block%22%7D\" name=\"codeblock\" editable=\"false\" data-id=\"da9ajx1ko-4003x371z14000\" ></card><p data-id=\"p1dr9j7ls-4oni0r861to000\">的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度</p><h1 data-id=\"h7mo8zo94-5nv8388lhwo000\" id=\"h4kgw8yp6-1u01rj732jcw0\">第一章 大标题</h1><h2 data-id=\"h6nir3p2w-2jnufm6br3c000\" id=\"h4kgw8yp6-i740lb38rso0\">一、小标题</h2><h3 data-id=\"h231x8tls-14rup6isoly800\" id=\"h4kgw8yp6-igh2t92msg000\">1.大幅度发啊实打实多啊实打实多阿萨达阿闪大大</h3><h4 data-id=\"h1uqpx7og-17qdbtabqyu800\" id=\"h4kgw8yp6-fipuovm5ug000\">1.1 发达了</h4><p data-id=\"p1dr9j7ls-373juoeq7s2000\">1.1.1 真的吗</p><h6 data-id=\"h7mo8zst8-20n2vxu85pls00\" id=\"h4kgw8yp6-f9y8qdkbpz400\">1.1.1.1 真的水电费水电费水电费水电费水电费</h6><p data-id=\"p1dr9j7ls-3a0upzg9xse000\">sdfsdfsdf</p><p data-id=\"p1dr9j7ls-41gdp7jyfdi000\">d</p><ul class=\"data-list data-list-task\" data-id=\"u3zhx2ezt-21tgfic9lksg0\"><li data-id=\"l19a1dmf4-qftzd76ktkw0\" class=\"data-list-item\" checked=\"true\"><card type=\"inline\" value=\"data:%7B%22id%22%3A%22hS6cH%22%2C%22type%22%3A%22inline%22%2C%22checked%22%3Atrue%7D\" name=\"checkbox\" editable=\"false\" ></card>啊实打实大大</li><li data-id=\"l2wwhsngu-ogak31zvw9s0\" class=\"data-list-item\" checked=\"true\"><card type=\"inline\" value=\"data:%7B%22id%22%3A%22V3QL4%22%2C%22type%22%3A%22inline%22%2C%22checked%22%3Atrue%7D\" name=\"checkbox\" editable=\"false\" ></card>啊实打实多</li></ul><ul data-id=\"u1dr9j7ls-j27kyxip1eg00\"><li data-id=\"l19a1dmf4-fj670hhi6a800\">阿闪大大</li><li data-id=\"l19a1dmf4-dhjlxvdleo800\">阿萨达</li></ul><ul data-id=\"u1dr9j7ls-8iqt1r831l800\" data-indent=\"1\"><li data-id=\"l19a1dmf4-192sz3l3y82o0\">啊实打实多</li><li data-id=\"l19a1dmf4-3j3n0c2nvyo00\">阿闪大大</li></ul><ul data-id=\"u2ynadd4g-u5de02rhli80\" data-indent=\"2\"><li data-id=\"l19a1dmf4-bezduxvoqqw00\">啊实打实多</li><li data-id=\"l19a1dmf4-dwur845yavc00\">阿萨达</li></ul><ul data-id=\"u2ynadd4g-4lngc18weve00\" data-indent=\"3\"><li data-id=\"l19a1dmf4-e8p5v1cphi800\">啊实打实</li></ul><ol start=\"1\" data-id=\"o3i5gzqam-2f2u1jd4jmkg0\"><li data-id=\"l19a1dmf4-38upsgl0cqk00\">阿萨达但是</li><li data-id=\"l19a1dmf4-ih00a5dzad400\">啊实打实多</li><li data-id=\"l19a1dmf4-jc24gr1t80w00\">阿萨达</li><li data-id=\"l19a1dmf4-ft5o4ya7lwg00\">阿萨达</li></ol><ol start=\"1\" data-id=\"o3i5gzqam-albemb7ax6800\" data-indent=\"1\"><li data-id=\"l19a1dmf4-fbovya413j400\">啊实打实</li><li data-id=\"l19a1dmf4-hv3s4y6vazc00\">阿萨达</li></ol><ol start=\"1\" data-id=\"oqz2fhwi8-fbw0js2raa000\" data-indent=\"2\"><li data-id=\"l19a1dmf4-gtrr0vheky000\">啊实打实</li><li data-id=\"l19a1dmf4-h8srhzmqfsg00\">啊实打实</li></ol><p data-id=\"p1dr9j7ls-4q9rvj7obmg000\">地方</p><p data-id=\"p1dr9j7ls-3lk2429tbs0000\">s</p><p data-id=\"p1dr9j7ls-13rjc6amy34000\">f</p><p data-id=\"p1dr9j7ls-2qka9w73n92000\">sd</p><p data-id=\"p1dr9j7ls-gxv45zmcy7c00\">f</p><p data-id=\"p1dr9j7ls-1o3v308r5v4w00\">sd</p><p data-id=\"p1dr9j7ls-143ufqjondts00\">f</p><p data-id=\"p1dr9j7ls-1oboszuyruu800\">sd</p><p data-id=\"p1dr9j7ls-c8fttwsr73k00\">f</p><p data-id=\"p1dr9j7ls-3vp72us46yg000\">s</p><p data-id=\"p1dr9j7ls-3is2qbifi78000\">df</p><p data-id=\"p1dr9j7ls-3qt0d0xz3is000\">sdf</p><p data-id=\"p1dr9j7ls-4sqiio74z4w000\">sdf</p><p data-id=\"p1dr9j7ls-3fgc7cej9q8000\">sd</p><p data-id=\"p1dr9j7ls-2dnru20ayp1c00\">f</p><p data-id=\"p1dr9j7ls-4u2rblyv2ky000\">sdf</p><p data-id=\"p1dr9j7ls-3va5jo66ww6000\">sdf</p><p data-id=\"p1dr9j7ls-5cp5y6hko38000\">s</p><p data-id=\"p1dr9j7ls-1ju0iof1vssg00\">df</p><p data-id=\"p1dr9j7ls-4o2oodjhczy000\">s</p><p data-id=\"p1dr9j7ls-1ses0l6esb6o00\">df</p><p data-id=\"p1dr9j7ls-1i8ygi8g4o4g00\">s</p><p data-id=\"p1dr9j7ls-cj5imtln78g00\">sd</p><p data-id=\"p1dr9j7ls-5a5rmknukps000\">f</p><p data-id=\"p1dr9j7ls-4k67gxaenxq000\">sd</p><p data-id=\"p1dr9j7ls-1y3don6icl4w00\">f</p><p data-id=\"p1dr9j7ls-2a0pstvtqo7w00\">s</p><p data-id=\"p1dr9j7ls-5om4exkml8g000\">d</p><p data-id=\"p1dr9j7ls-3pcl6jc7u24000\">f</p><p data-id=\"p1dr9j7ls-5m3ep3wlywg000\">s</p><p data-id=\"p1dr9j7ls-4vt25kjjpa0000\">f</p><p data-id=\"p1dr9j7ls-2ozu5w9iy2q000\">s</p><p data-id=\"p1dr9j7ls-48bzincwhck000\">dfs</p><p data-id=\"p1dr9j7ls-euf89kaloww00\">df</p><p data-id=\"p1dr9j7ls-1tnoi6ygnye800\"><br /><br /></p><p data-id=\"p1dr9j7ls-23uew1fu5kww00\">sd</p><p data-id=\"p1dr9j7ls-17bpkapv7o8w00\">f</p><p data-id=\"p1dr9j7ls-27orj6se61hc00\"><br /><br /></p><p data-id=\"p1dr9j7ls-c9fgteme4so00\">sd</p><p data-id=\"p1dr9j7ls-1oolv0zvc9eo00\">f</p><p data-id=\"p1dr9j7ls-1ly7w8ny7etc00\">s</p><p data-id=\"p1dr9j7ls-u2ta8hgdi9c00\">d</p><p data-id=\"p1dr9j7ls-30i20qaeadc000\">f</p><p data-id=\"p1dr9j7ls-99gvyj3xddk00\">sd</p><p data-id=\"p1dr9j7ls-ksdbzg14es000\">f</p><p data-id=\"p1dr9j7ls-1xxlvck503s000\">sd</p><p data-id=\"p1dr9j7ls-2jtunho87jk000\">f</p><p data-id=\"p1dr9j7ls-57rx0m1lof4000\"><br /><br /></p><p data-id=\"p1dr9j7ls-12deagm18sf400\">sd</p><p data-id=\"p1dr9j7ls-2ivysu97cki000\">f</p><p data-id=\"p1dr9j7ls-37fv35w8qx8000\">sd</p><p data-id=\"p1dr9j7ls-35b7d2y9hiw000\">f</p><p data-id=\"p1dr9j7ls-mwvm0vsni2o00\">s</p><p data-id=\"p1dr9j7ls-3sezd736ygo000\">d</p><p data-id=\"p1dr9j7ls-14n2juucc8dc00\">fsd</p><p data-id=\"p1dr9j7ls-3wm68rfszic000\">f</p><p data-id=\"p1dr9j7ls-1sqhbl85tilc00\">sdf</p><p data-id=\"p1dr9j7ls-128zofo918wg00\"><br /><br /></p><p data-id=\"p1dr9j7ls-20yxqbwwrlgg00\">sd</p><p data-id=\"p1dr9j7ls-vvgwvissm1c00\">f</p><p data-id=\"p1dr9j7ls-3ju2f8tmbn8000\">sd</p><p data-id=\"p1dr9j7ls-57vn2q697jc000\"><br /><br /></p><p data-id=\"p1dr9j7ls-3c333m9oinc000\">f</p><p data-id=\"p1dr9j7ls-40hfq2i7ktk000\">sd</p><p data-id=\"p1dr9j7ls-48y3itp384w000\">f</p><p data-id=\"p1dr9j7ls-53lka4c0rds000\">s</p><p data-id=\"p1dr9j7ls-33fqmiu3ijo000\">d</p><p data-id=\"p1dr9j7ls-1lg2a02vvmyo00\">f</p><p data-id=\"p1dr9j7ls-yam3z33gibk00\">sd</p><p data-id=\"p1dr9j7ls-2105iu67cjr400\">f</p><p data-id=\"p1dr9j7ls-1j0x431wgcdc00\"><br /><br /></p><p data-id=\"p1dr9j7ls-51bnuiiz5wk000\">sd</p><p data-id=\"p1dr9j7ls-19g2g5zzt2v400\">f</p><p data-id=\"p1dr9j7ls-mg0h300kdgg00\">s</p><p data-id=\"p1dr9j7ls-4ks3bhbiizs000\">d</p><p data-id=\"p1dr9j7ls-47oihi74ji0000\">f</p><p data-id=\"p1dr9j7ls-2jmsdaj0da8000\">sd</p><p data-id=\"p1dr9j7ls-405l32a87p8000\">fsdf</p><p data-id=\"p1dr9j7ls-1ir4b0kp4nsw00\">sdf</p><p data-id=\"p1dr9j7ls-2z7c10e196o000\">sdf</p><p data-id=\"p1dr9j7ls-42bb419jc9w000\">sdf</p><p data-id=\"p1dr9j7ls-4vmra2vmbva000\">sdf</p><p data-id=\"p1dr9j7ls-4iee4ve7szk000\">sdf</p><p data-id=\"p1dr9j7ls-47bwh9nzrag000\">sdf</p><p data-id=\"p1dr9j7ls-3akx0y6xljs000\">sdf</p><p data-id=\"p1dr9j7ls-zbjf5ka8zk000\">sdf</p><p data-id=\"p1dr9j7ls-2fraqd5iw8kk00\">sdf</p><p data-id=\"p1dr9j7ls-3ncezjj7444000\">sf</p><p data-id=\"p1dr9j7ls-23zvyo0ajvmo00\">sdf</p><p data-id=\"p1dr9j7ls-2jqtd5xga78000\">sdf</p><p data-id=\"p1dr9j7ls-4pua5ql8asc000\">sdf</p><p data-id=\"p1dr9j7ls-4ylkvgd1570000\"><br /><br /></p><h3 data-id=\"h9ql9cmio-fzavpj8vzy800\" id=\"h4kgw8yp6-beg9hwws2bc00\">2.小幅度发</h3><h2 data-id=\"hgdryewbo-1crcmpyf1hb400\" id=\"h4kgw8yp6-cnbb438571k00\">二、中表题</h2><h3 id=\"h231x8tls-8n9mwmm81f000\" data-id=\"hgaw9birk-2bm09duqqcbo00\">1.大幅度发</h3><h4 id=\"h1uqpx7og-ghgnusv66cg00\" data-id=\"h6fy3951c-3gm7h321myc000\">1.1 发达了</h4><h5 id=\"hqmwfki9s-bwo7j1j4wjk00\" data-id=\"h2lr2xwbi-782wy6ub21s00\">1.1.1 真的吗</h5><h6 id=\"h7mo8zst8-idey9a86d9k00\" data-id=\"h17e3kxeo-5s58g3qwgbo000\">1.1.1.1 真的想</h6><h2 data-id=\"h1mfgsrq8-2677g2l7exls00\" id=\"h4kgw8yp6-1l16dubmmqf40\">三、小标题</h2><h3 id=\"h231x8tls-4o01xa0z89k00\" data-id=\"h1mooaxr4-57xbcod3k4c000\">1.大幅度发说的</h3><h4 id=\"h1uqpx7og-c02r7iflodc00\" data-id=\"h5sgze6a8-4z0gzaa08yw000\">1.1 发达了是</h4><h5 id=\"hqmwfki9s-a6cc90wjiao00\" data-id=\"h9di87lr8-4fzpfbb2ufs000\">1.1.1 真的吗</h5><h6 id=\"h7mo8zst8-dpo4698v2vc00\" data-id=\"h9edidg2k-9lpeh1bk7vo00\">1.1.1.1 真的</h6><h3 data-id=\"h7mo8x65o-23n78nl2qsyo00\" id=\"h4kgw8yp6-1443qb4fyarg0\">三级大标题</h3><h4 data-id=\"ho54pzw1c-1jtc4yxb7jeo00\" id=\"h5sgze6a8-l3lubgrdngw00\">1.1 发达了</h4><h5 data-id=\"h1fiz3x9c-11cs4f9c2vj400\" id=\"h9di87lr8-9z8mnjlt1c400\">1.1.1 真的吗说的</h5><p data-id=\"p1dr9j7ls-2bk3wysbgyo000\"><br /><br /></p>"
        },
        tocData: [],
        currentTocId: '',
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
        dirData: [
          {
            id: 1,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 2,
            type: 1,
            data: '单文章节点2'
          },
          {
            id: 3,
            type: 1,
            data: '单文章节点3'
          },
          {
            id: 4,
            type: 1,
            data: '单文章节点4'
          },
          {
            id: 6,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 7,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 8,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 9,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 10,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 11,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 12,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 5,
            type: 2,
            data: [
              {
                title: '达啊实打实多爱文章文章文章文章文章文章文章文章文章文章',
                expand: false,
                children: [
                  {
                    title: '单独文章'
                  },
                  {
                    title: '目录文章',
                    expand: false,
                    children: [
                      {
                        title: 'leaf 1-1-1'
                      },
                      {
                        title: 'leaf 1-1-2'
                      }
                    ]
                  },
                  {
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        title: 'leaf 1-2-1'
                      },
                      {
                        title: 'leaf 1-2-1'
                      }
                    ]
                  }
                ]
              },
              {
                title: '多层目录',
                expand: false,
                children: [
                  {
                    title: '单独文章'
                  },
                  {
                    title: '目录文章',
                    expand: false,
                    children: [
                      {
                        title: 'leaf 1-1-1'
                      },
                      {
                        title: 'leaf 1-1-2'
                      }
                    ]
                  },
                  {
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        title: 'leaf 1-2-1'
                      },
                      {
                        title: 'leaf 1-2-1'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 13,
            type: 2,
            data: [
              {
                title: 'parent 11文章文章文章文章文章文章文章文章文章文章',
                expand: true,
                children: [
                  {
                    title: '单独文章'
                  },
                  {
                    title: '目录文章',
                    expand: true,
                    children: [
                      {
                        title: 'leaf 1-1-1录文录文录文录文录文录文录文录文录文录文录文录文录文录文录文'
                      },
                      {
                        title: 'leaf 1-1-2'
                      }
                    ]
                  },
                  {
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        title: 'leaf 1-2-1'
                      },
                      {
                        title: 'leaf 1-2-1'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        // list or tree
        navShowType: 'tree',
        openAllTree: false,
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
       * 渲染标题大纲
       * @param engine
       */
      renderTocData(view) {
        let tocData = getTocData(view);
        this.tocData = (tocData && tocData instanceof Array) ? tocData : [];
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

      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info);
      },

      getListDirData() {
        if (this.dirData.length === 0) {
          return [];
        }
        let array = [];
        this.dirData.forEach(dir => {
          if (dir.type === 1) {
            array.push(dir)
          } else if (dir.type === 2) {

          }
        })
        return array;
      },


      /**
       * 左侧目录拖动相关方法
       * @param event
       */
      startDrag(event) {
        event.preventDefault();
        this.isDragging = true;
        this.startX = event.clientX;
        this.startWidth = this.sidebarWidth;
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.stopDrag);
      },
      handleDrag(event) {
        if (this.isDragging) {
          const deltaX = event.clientX - this.startX;
          let adaptiveWidth = this.startWidth + deltaX;
          this.sidebarWidth = adaptiveWidth < 260 ? 260 : adaptiveWidth > 480 ? 480 : adaptiveWidth;
        }
      },
      stopDrag() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.stopDrag);
      },

      /**
       * tree节点展开/收起
       */
      expandTreeNode() {
        this.openAllTree = !this.openAllTree;
        if (this.dirData.length > 0) {
          this.dirData.forEach(dir => {
            if (dir.type === 2) {
              let children = dir.data;
              this.recursiveExpansion(children, this.openAllTree);
            }
          });
        }
      },
      recursiveExpansion(children, ifOpen) {
        if (children && children.length > 0) {
          children.forEach(treeNode => {
            if (treeNode.expand !== undefined) {
              treeNode.expand = ifOpen;
            }
            this.recursiveExpansion(children.children, ifOpen)
          })
        }
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
          const pattern = /h[1-6]/;
          let match = this.docInfo.content.match(pattern);
          if (match) {
            this.renderTocData(view);
          }
        }

        this.view = view;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/read-center.less';
</style>
