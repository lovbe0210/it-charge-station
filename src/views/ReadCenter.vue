<template>
  <div class="read-center">
    <div class="sidebar" ref="sidebar" :style="{ width: sidebarWidth + 'px' }">
      <div class="drag-handle" @mousedown="startDrag"></div>
      <ul class="directory">
        <li>目录项 1</li>
        <li>目录项 2</li>
        <li>目录项 3</li>
        <!-- 其他目录项... -->
      </ul>
    </div>
    <div class="content">
      <!-- 内容显示部分 -->
      <div ref="view"></div>
      <div class="outline">
        <!-- 右侧大纲展示 -->
        <div class="reader-sidebar">
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
                      &lt;!&ndash; <a :href="'#'+ item.id">{{item.text}}</a>&ndash;&gt;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!--<div class="ReaderLayout-module_wrapper">
                          <div id="header"
                               class="header doc-head doc-head-doc doc-type-head ViewerHeader-module_wrapper undefined"
                               data-header-mode="title" data-aspm="c36321" style="left: 345px;">
                            <div class="doc-head-inner">
                              <div class="header-crumb title-visible only-doc-title">
                          <span class="index-module_nameTitle index-module_editable" title="决策指挥大屏系统V4.30数据同步">
                            决策指挥大屏系统V4.30数据同步
                          </span>
                                <div class="ViewerHeader-module_offlineIcon index-module_offlineButton larkui-tooltip">
                                  <div class="index-module_availableStyle">
                                    <button type="button"
                                            class="ant-btn ant-btn-text ant-btn-icon-only index-module_shareIcon larkui-popover-trigger">
                                      <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                           class="larkui-icon larkui-icon-permission-private icon-svg larkui-tooltip index-module_size_wVASz"
                                           data-name="PermissionPrivate"
                                           style="width: 14px; min-width: 14px; height: 14px;">
                                        <g transform="translate(32 15)" fill="currentColor" fill-rule="evenodd">
                                          <path
                                            d="M168 78c13.255 0 24 10.745 24 24v100c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V102c0-13.255 10.745-24 24-24h144Zm0 20H24a4 4 0 0 0-3.995 3.8L20 102v100a4 4 0 0 0 3.8 3.995l.2.005h144a4 4 0 0 0 3.995-3.8l.005-.2V102a4 4 0 0 0-3.8-3.995L168 98Z"
                                            fill-rule="nonzero"></path>
                                          <path
                                            d="M96 0c29.823 0 54 24.177 54 54v44H42V54C42 24.177 66.177 0 96 0Zm0 20c-18.59 0-33.695 14.92-33.995 33.438L62 54v24h68V54c0-18.59-14.92-33.695-33.438-33.995L96 20Z"
                                            fill-rule="nonzero"></path>
                                          <rect fill-rule="nonzero" x="78" y="123" width="36" height="36" rx="18"></rect>
                                          <rect x="86" y="141" width="20" height="40" rx="10"></rect>
                                        </g>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <div style="margin-left: 4px;">
                                  <div id="docSaveTipContainer"></div>
                                </div>
                                <div class="ViewerHeader-module_offlineButton index-module_offlineButton larkui-tooltip">
                                  <div class="index-module_availableStyle_7ncy9"></div>
                                </div>
                              </div>
                              <div class="header-action">
                                <div class="index-module_offlineButton_XZkWh larkui-tooltip">
                                  <div class="index-module_availableStyle_7ncy9"></div>
                                </div>
                                <div
                                  class="ViewerHeader-module_offlineButton_4QlQl index-module_offlineButton_XZkWh larkui-tooltip">
                                  <div class="index-module_availableStyle_7ncy9">
                                    <div class="ViewerHeader-module_mark_c28hV" data-aspm-click="d223108">
                                      <div class="index-module_isMiniTypeMark_Q9Bf6 larkui-popover-trigger">
                                        <div
                                          class="index-module_markedNormal_lQdFH select-group-mark-wrapper larkui-tooltip">
                                          <div class="index-module_markIconContent_GN4G+"
                                               data-testid="select-group-mark-entry">
                                            <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 class="larkui-icon larkui-icon-star-outlined icon-svg index-module_icon_hhi0u index-module_size_wVASz"
                                                 data-name="StarOutlined"
                                                 style="width: 20px; min-width: 20px; height: 20px;">
                                              <path
                                                d="m109.698 24.732-22.514 51.09-55.546 5.624a20 20 0 0 0-12.899 6.573c-7.36 8.236-6.649 20.88 1.587 28.24l41.632 37.2-11.815 54.565a20 20 0 0 0 2.265 14.298l.185.313c5.643 9.302 17.723 12.402 27.163 6.904L128 201.44l48.244 28.1a20 20 0 0 0 14.298 2.264c10.796-2.338 17.652-12.984 15.315-23.78l-11.815-54.566 41.632-37.2a20 20 0 0 0 6.572-12.898c1.113-10.99-6.894-20.8-17.884-21.914l-55.546-5.625-22.514-51.09a20 20 0 0 0-10.237-10.235c-10.107-4.455-21.912.128-26.367 10.236ZM128 32.798l22.515 51.089A20 20 0 0 0 166.8 95.719l55.546 5.626-41.631 37.2a20 20 0 0 0-6.22 19.146l11.814 54.566-48.244-28.099a20 20 0 0 0-20.132 0L69.69 212.257l11.815-54.566a20 20 0 0 0-6.221-19.146l-41.631-37.2 55.546-5.626a20 20 0 0 0 16.286-11.832L128 32.798Z"
                                                fill="currentColor" fill-rule="nonzero"></path>
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="ViewerHeader-module_offlineButton_4QlQl index-module_offlineButton_XZkWh larkui-tooltip">
                                  <div class="index-module_availableStyle_7ncy9">
                                    <div class="ViewerHeader-module_collaborate_VW8td"><span
                                      data-testid="doc-action-collaborate"
                                      data-aspm-click="d225876"
                                      class="ViewerHeader-module_iconWrapper_Wis4F larkui-tooltip larkui-popover-trigger"><svg
                                      width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                      class="larkui-icon larkui-icon-nav-invite"><path
                                      d="M128 129c5.523 0 10 4.477 10 10s-4.477 10-10 10c-24.125 0-45.174 6.043-60.525 16.179-12.362 8.162-19.354 18.06-19.54 25.146l-.007.911-.001.397.005.747c.034 2.031.212 3.378.664 4.658.4 1.136.947 1.914 1.804 2.514l.203.135.294.186.28.207c.604.443 1.371.869 2.296 1.275l.475.201.501.198.527.195.274.096.565.19.591.187.305.092.628.181.654.178.678.175.703.171.726.168.751.164.775.16 1.207.235 1.26.226.869.147.891.142.915.14.937.134 1.447.196.993.126 1.015.122 1.563.176 1.61.167 1.101.107 1.69.153 1.153.096 1.173.093 1.798.132 1.842.122 1.888.113 1.93.104 1.312.064 1.33.06 2.031.082 2.073.073 1.886.057 2.338.061 3.948.08 1.803.027 3.794.04 3.624.02 5.876.008 9.344-.013L128 207c5.523 0 10 4.477 10 10 0 5.43-4.327 9.848-9.72 9.996l-.453.004-11.598.014-6.434-.014-3.11-.02-3.85-.043-2.294-.037-1.806-.036-2.476-.06-2.515-.07-2.478-.082-1.62-.061-1.598-.065-1.574-.071-1.55-.076-1.526-.08-2.244-.133-1.467-.095-1.444-.1-2.122-.163-1.386-.115-1.362-.122-1.34-.129-1.316-.134-1.293-.142-1.271-.148-1.248-.155-1.226-.162-1.202-.169-1.18-.176-1.159-.184-1.135-.19-1.114-.2c-.367-.067-.731-.136-1.091-.206l-1.07-.214a89.329 89.329 0 0 1-2.072-.453l-1.004-.238c-.33-.081-.658-.164-.981-.247l-.96-.256c-.317-.086-.63-.175-.94-.264l-.916-.273a55.46 55.46 0 0 1-2.623-.872l-.832-.309c-2.875-1.098-5.363-2.368-7.478-3.835l-.338-.238-.13-.084c-4.586-3.038-7.72-7.229-9.547-12.126l-.172-.476c-1.443-4.088-1.807-7.435-1.809-11.98l.004-1.096c0-14.848 10.912-30.497 28.525-42.126C75.15 136.145 100.04 129 128 129Zm58-12c5.523 0 10 4.477 10 10v35h35c5.523 0 10 4.477 10 10s-4.477 10-10 10h-35v35c0 5.523-4.477 10-10 10s-10-4.477-10-10v-35h-35c-5.523 0-10-4.477-10-10s4.477-10 10-10h35v-35c0-5.523 4.477-10 10-10Zm-58-93c25.405 0 46 20.595 46 46s-20.595 46-46 46-46-20.595-46-46 20.595-46 46-46Zm0 20c-14.36 0-26 11.64-26 26s11.64 26 26 26 26-11.64 26-26-11.64-26-26-26Z"
                                      fill="currentColor" fill-rule="nonzero"></path></svg></span></div>
                                  </div>
                                </div>
                                <div class="index-module_present_RJR62">
                                  <button type="button" data-aspm-click="d129827" id="present-btn" data-testid="present-btn"
                                          class="index-module_btn_nQfFi larkui-tooltip">
                                    <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                         class="larkui-icon larkui-icon-present icon-svg index-module_size_wVASz"
                                         data-name="Present" style="width: 20px; min-width: 20px; height: 20px;">
                                      <path
                                        d="M230 28c5.523 0 10 4.477 10 10s-4.477 10-10 10h-6v107c0 22.091-17.909 40-40 40h-5.935l8.512 31.764c1.405 5.245-1.63 10.633-6.802 12.172l-.27.076c-5.334 1.43-10.817-1.737-12.247-7.071l-9.835-36.705a10.192 10.192 0 0 1-.06-.236H97.13a9.992 9.992 0 0 1-.329 3.133l-9.058 33.808c-1.43 5.334-6.913 8.5-12.248 7.07-5.334-1.429-8.5-6.912-7.07-12.247L76.932 195H73c-21.87 0-39.641-17.552-39.995-39.339L33 155V48h-7c-5.523 0-10-4.477-10-10s4.477-10 10-10h204Zm-26 20H53v107c0 10.93 8.769 19.813 19.656 19.997L73 175h111c11.046 0 20-8.954 20-20V48Zm-76.957 26.124 30.288 21.59a20 20 0 0 1 4.676 4.677c6.412 8.994 4.318 21.483-4.676 27.895l-30.288 21.59a20 20 0 0 1-11.61 3.715c-11.045 0-20-8.955-20-20V90.409a20 20 0 0 1 3.715-11.61l.216-.296c6.473-8.743 18.785-10.72 27.679-4.38Zm-11.61 16.286v43.18L145.723 112l-30.288-21.59Z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                    </svg>
                                  </button>
                                </div>
                                <div id="collabUsersContainer"></div>
                                <div
                                  class="ViewerHeader-module_offlineLargeSpaceButton_lkMLA index-module_offlineButton_XZkWh larkui-tooltip">
                                  <div class="index-module_availableStyle_7ncy9">
                                    <button data-aspm-click="c36321.d326998" type="button"
                                            class="ant-btn larkui-popover-trigger">
                                      <span>分享</span></button>
                                  </div>
                                </div>
                                <span class="header-action-item" style="margin-left: 8px;"><button type="button"
                                                                                                   class="ant-btn ant-btn-primary larkui-tooltip"><span>编辑</span></button></span><span
                                class="header-action-item" id="docHeadRightWrapper" style="margin-left: 8px;"><div
                                class="style-module_container_5pQ7D"><div class="style-module_switchActiveBg_3DMlv"></div><div
                                class="style-module_switchContent_FKoVH"><div
                                class="index-module_offlineButton_XZkWh larkui-tooltip"><div
                                class="index-module_availableStyle_7ncy9"><div class="style-module_iconWrapper_bAMkc"><svg
                                width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                                class="larkui-icon larkui-icon-comment-reply icon-svg style-module_icon_ucXPM index-module_size_wVASz"
                                data-name="CommentReply"><path
                                d="M8 1.063a6.937 6.937 0 1 1 0 13.874H1.937a.625.625 0 0 1-.526-.961l1.105-1.727-.017-.02a6.91 6.91 0 0 1-1.436-4.177V8A6.938 6.938 0 0 1 8 1.062Zm0 1.25a5.688 5.688 0 0 0-4.245 9.472c.187.21.211.517.06.753l-.735 1.15H8a5.688 5.688 0 0 0 5.687-5.594V8A5.688 5.688 0 0 0 8 2.312Zm.938 6.562a.625.625 0 1 1 0 1.25h-3.75a.625.625 0 1 1 0-1.25h3.75Zm1.874-3a.625.625 0 1 1 0 1.25H5.189a.625.625 0 1 1 0-1.25h5.625Z"
                                fill="currentColor" fill-rule="nonzero"></path></svg></div></div></div><div
                                class="style-module_iconWrapper_bAMkc"><svg width="1em" height="1em" viewBox="0 0 256 256"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            class="larkui-icon larkui-icon-rightboard icon-svg style-module_icon_ucXPM index-module_size_wVASz"
                                                                            data-name="Rightboard"><path
                                d="M209 28c16.569 0 30 13.431 30 30v140c0 16.569-13.431 30-30 30H47c-16.569 0-30-13.431-30-30V58c0-16.569 13.431-30 30-30Zm-80 20H47c-5.523 0-10 4.477-10 10v140c0 5.523 4.477 10 10 10h82V48Zm80 0h-60v160h60c5.43 0 9.848-4.327 9.996-9.72L219 198V58c0-5.523-4.477-10-10-10Zm-15 114c5.523 0 10 4.477 10 10s-4.477 10-10 10h-20c-5.523 0-10-4.477-10-10s4.477-10 10-10h20Zm0-44c5.523 0 10 4.477 10 10s-4.477 10-10 10h-20c-5.523 0-10-4.477-10-10s4.477-10 10-10h20Zm0-44c5.523 0 10 4.477 10 10s-4.477 10-10 10h-20c-5.523 0-10-4.477-10-10s4.477-10 10-10h20Z"
                                fill="currentColor" fill-rule="nonzero"></path></svg></div></div></div></span></div>
                            </div>
                          </div>
                          <div class="BookReader-module_wrapper BookReader-module_docTypographyClassic"
                               data-testid="content">
                            <div class="BookReader-module_content" id="main">
                              <div class="BookReader-module_docContainer">
                                <div class="DocReader-module_wrapper" data-doc-layout="adapt" data-doc-sidebar="false"
                                     data-doc-toc="true">
                                  <div class="">
                                    <div id="doc-reader-content" class="DocReader-module_content">
                                      <div class="DocReader-module_header">
                                        <h1 id="article-title" class="index-module_articleTitle doc-article-title">
                                          决策指挥大屏系统V4.30数据同步
                                        </h1>
                                      </div>
                                      <div>
                                        <article id="content" class="article-content" tabindex="0"
                                                 style="outline-style: none;">
                                          <div class="ne-doc-major-viewer">
                                            <div class="yuque-doc-content" data-df="lake" style="position: relative;">
                                              <div ref="view"></div>
                                            </div>
                                          </div>
                                        </article>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="ReaderLayout-module_asideWrapper ReaderLayout-module_onlyTocAside"
                             data-testid="aside" data-lark-popup-container="true">
                          <div class="ReaderLayout-module_aside">
                            <div class="ReaderLayout-module_asideHead" id="asideHead">
                              <div class="ReaderLayout-module_bookInfo">
                                <div class="ReaderLayout-module_crumb">
                                  <a href="/dashboard" class="ReaderLayout-module_yuqueLogo">
                                    <svg width="16" height="16" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"
                                         xmlns:xlink="http://www.w3.org/1999/xlink" class="larkui-icon larkui-icon-yuque">
                                      <defs>
                                        <radialGradient cx="60.212%" cy="64.196%" fx="60.212%" fy="64.196%" r="51.003%"
                                                        gradientTransform="scale(.85248 1) rotate(-68.415 .654 .565)"
                                                        id="165724840e">
                                          <stop stop-color="#57CB86" offset="0%"></stop>
                                          <stop stop-color="#FFF" stop-opacity="0.8" offset="100%"></stop>
                                        </radialGradient>
                                        <linearGradient x1="82.746%" y1="0%" x2="20.277%" y2="79.406%" id="165724840b">
                                          <stop stop-color="#7BD26A" offset="0%"></stop>
                                          <stop stop-color="#07B26A" offset="100%"></stop>
                                        </linearGradient>
                                        <rect id="165724840a" x="0" y="0" width="26" height="26" rx="6.24"></rect>
                                        <path
                                          d="M9.855 0h.269l.068.001h.07l.07.002h.071l.049.001h.049l.074.002.076.002.076.001.052.001.079.002.08.002.08.003.055.001.082.003.084.003.056.002.057.002.058.002.057.002.059.002.058.003.09.004.06.002.09.005.06.003.062.003.093.005.063.003.063.003.063.004.064.004.064.004.065.004.065.004.065.004.066.004.066.005c2.38.162 3.01 1.87 3.078 2.074l.003.011.003.01 1.033.055a.1.1 0 0 1 .044.19c-1.06.571-1.385 1.733-1.194 2.49.061.244.156.454.263.676l.067.14c.246.512.521 1.132.567 2.38.1 2.796-2.365 5.308-5.282 5.308H10.97l-.134.001h-.097l-.103.002h-.164l-.177.002-.19.002-.274.003-.22.002-.396.004-.43.005-.468.006-.297.003-.417.005-.553.007-.588.008-.497.007-.788.01-.553.008-1.025.014-1.094.016-.994.014-.516.008 6.238-7.07.057-.064.056-.064.056-.064.278-.314.055-.062.055-.062.054-.062.027-.03.054-.062.027-.03.054-.062.053-.061c.619-.715 1.17-1.412 1.561-2.212.435-1.224-.007-2.136-.459-2.69A3.31 3.31 0 0 0 9.057.53C8.903.333 9.007.005 9.3.005h.073L9.43.002h.093L9.58 0H9.793L9.855 0Z"
                                          id="165724840d"></path>
                                      </defs>
                                      <g fill="none" fill-rule="evenodd">
                                        <mask id="165724840c" fill="#fff">
                                          <use xlink:href="#165724840a"></use>
                                        </mask>
                                        <use fill="url(#165724840b)" xlink:href="#165724840a"></use>
                                        <g mask="url(#165724840c)">
                                          <g transform="translate(3.77 5.46)">
                                            <use fill="#E5FBEF" xlink:href="#165724840d"></use>
                                            <use fill-opacity="0.3" fill="url(#165724840e)" xlink:href="#165724840d"></use>
                                          </g>
                                          <path
                                            d="M11.003 11.95c-2.7 3.027-5.913 6.711-7.133 8.095-.235.267-.007.518.175.55 9.1 1.559 11.989-2.715 12.632-4.669.881-2.673-.363-3.977-1.067-4.402-2.388-1.443-4.16-.077-4.607.425Z"
                                            fill="#FAFFFC"></path>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <svg width="14" height="14" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                       class="larkui-icon larkui-icon-arrow-left3 ReaderLayout-module_miniDropdown_7uya+">
                                    <path
                                      d="M154.995 58.157c3.834 3.834 3.904 10.007.21 13.927l-.21.215-48.99 48.99c-3.834 3.834-3.904 10.007-.21 13.927l.21.215 48.99 48.99c3.905 3.905 3.905 10.237 0 14.142-3.834 3.834-10.008 3.904-13.927.21l-.215-.21-48.99-48.99c-11.599-11.599-11.715-30.331-.348-42.073l.348-.353 48.99-48.99c3.905-3.905 10.237-3.905 14.142 0Z"
                                      fill="currentColor" fill-rule="nonzero"></path>
                                  </svg>
                                  <a href="/dashboard/books" class="ReaderLayout-module_crumbText_l2jpO">个人知识库</a></div>
                              </div>
                              <div class="ReaderLayout-module_bookInfo">
                                <div class="ReaderLayout-module_bookName">
                                  <div tabindex="0" data-testid="popover-bookicon" class="ReaderLayout-module_icon">
                                    <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                         class="larkui-icon larkui-icon-book-type-default icon-svg index-module_size_wVASz"
                                         data-name="BookTypeDefault">
                                      <g fill="none" fill-rule="evenodd">
                                        <path
                                          d="M4.75 1.267h10.5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2Z"
                                          fill="#C4DCFF"></path>
                                        <path d="M4.75 1.267h2.215v18H5.75a3 3 0 0 1-3-3v-13a2 2 0 0 1 2-2Z"
                                              fill="#679FF4"></path>
                                        <path stroke="#397ABD" d="M7.25 1.1v17.667"></path>
                                        <path stroke="#397ABD" stroke-linecap="round" stroke-linejoin="round"
                                              d="M10.85 5.394h3.4"></path>
                                        <path
                                          d="M4.25 1.267h11.5a1.5 1.5 0 0 1 1.5 1.5v14.5a1.5 1.5 0 0 1-1.5 1.5H4.25a1.5 1.5 0 0 1-1.5-1.5v-14.5a1.5 1.5 0 0 1 1.5-1.5Z"
                                          stroke="#397ABD"></path>
                                      </g>
                                    </svg>
                                  </div>
                                  <div class="ReaderLayout-module_bookName">
                                    <span class="ReaderLayout-module_text" title="从头开始">从头开始</span>
                                    <div class="ReaderLayout-module_privateIcon">
                                <span class="name-lock larkui-tooltip">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     class="larkui-icon larkui-icon-permission-private icon-svg index-module_size_wVASz"
                                     data-name="PermissionPrivate" style="width: 14px; min-width: 14px; height: 14px;">
                                  <g transform="translate(32 15)" fill="currentColor" fill-rule="evenodd">
                                    <path
                                      d="M168 78c13.255 0 24 10.745 24 24v100c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V102c0-13.255 10.745-24 24-24h144Zm0 20H24a4 4 0 0 0-3.995 3.8L20 102v100a4 4 0 0 0 3.8 3.995l.2.005h144a4 4 0 0 0 3.995-3.8l.005-.2V102a4 4 0 0 0-3.8-3.995L168 98Z"
                                      fill-rule="nonzero">
                                    </path>
                                    <path
                                      d="M96 0c29.823 0 54 24.177 54 54v44H42V54C42 24.177 66.177 0 96 0Zm0 20c-18.59 0-33.695 14.92-33.995 33.438L62 54v24h68V54c0-18.59-14.92-33.695-33.438-33.995L96 20Z"
                                      fill-rule="nonzero">
                                    </path>
                                    <rect fill-rule="nonzero" x="78" y="123" width="36" height="36" rx="18"></rect>
                                    <rect x="86" y="141" width="20" height="40" rx="10"></rect>
                                  </g>
                                </svg>
                                </span>
                                    </div>
                                  </div>
                                </div>
                                <span
                                  class="index-module_more ReaderLayout-module_bookOverviewMoreActions larkui-popover-trigger"
                                  data-testid="more-actions" style="line-height: 16px; padding: 4px;">
                    <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                         class="larkui-icon larkui-icon-more-horizontal icon-svg index-module_size_wVASz"
                         data-name="MoreHorizontal" style="width: 16px; min-width: 16px; height: 16px;">
                      <path
                        d="M227.008 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20ZM148 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Zm-78.992 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Z"
                        fill="currentColor" fill-rule="nonzero">
                      </path>
                    </svg>
                  </span>
                              </div>
                            </div>
                            <nav class="ReaderLayout-module_asideNav" id="navBox">
                              <div class="ReaderLayout-module_searchNav">
                                <div class="ReaderLayout-module_searchBar">
                                  <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                       class="larkui-icon larkui-icon-help-search ReaderLayout-module_navIcon_eoaa4">
                                    <path
                                      d="M114 20c51.362 0 93 41.638 93 93 0 21.782-7.489 41.816-20.032 57.666l45.82 46.277c4.275 4.317 4.24 11.282-.077 15.556-4.317 4.275-11.281 4.24-15.556-.077l-45.774-46.23C155.576 198.602 135.652 206 114 206c-51.362 0-93-41.638-93-93s41.638-93 93-93Zm0 20c-40.317 0-73 32.683-73 73s32.683 73 73 73 73-32.683 73-73-32.683-73-73-73Z"
                                      fill="currentColor" fill-rule="nonzero"></path>
                                  </svg>
                                  <span>搜索</span><span class="ReaderLayout-module_searchHotKey_1i9So">Ctrl + J</span></div>
                                <div class="ReaderLayout-module_asideActions larkui-popover-trigger">
                                  <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                       class="larkui-icon larkui-icon-add icon-svg ReaderLayout-module_actionItem_CbOzz index-module_size_wVASz"
                                       data-name="Add" style="width: 16px; min-width: 16px; height: 16px;">
                                    <path
                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                      fill="currentColor" fill-rule="evenodd"></path>
                                  </svg>
                                </div>
                              </div>
                              <div class="ReaderLayout-module_nav">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     class="larkui-icon larkui-icon-knowledge-base-home ReaderLayout-module_navIcon_eoaa4">
                                  <path
                                    d="m139.26 31.243.36.232 76.656 50.543a21.11 21.11 0 0 1 9.486 17.222l.004.401v96.129c0 17.616-14.138 31.93-31.687 32.215l-.532.004h-34.698c-.1 0-.198-.001-.297-.004-.183.01-.367.015-.552.015-5.43 0-9.848-4.327-9.996-9.72L148 218v-47.755c0-11.2-8.973-20.245-20-20.245-10.913 0-19.813 8.858-19.997 19.896l-.003.349V218c0 5.523-4.477 10-10 10-.185 0-.37-.005-.552-.015h-.017l-.28.004H62.453c-17.616 0-31.93-14.138-32.215-31.686l-.004-.533V99.64a21.11 21.11 0 0 1 9.157-17.4l.333-.223 76.656-50.543a21.11 21.11 0 0 1 22.88-.232ZM127.516 48.1l-.127.072-76.656 50.543a1.11 1.11 0 0 0-.49.788l-.009.138v96.129c0 6.646 5.306 12.053 11.913 12.215l.306.004H88L88 170.245C88 148.036 105.89 130 128 130c21.889 0 39.642 17.677 39.995 39.58l.005.665v37.744h25.547c6.646 0 12.053-5.306 12.215-11.913l.004-.306V99.64a1.11 1.11 0 0 0-.388-.842l-.11-.084-76.657-50.543a1.11 1.11 0 0 0-1.095-.072Z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                                <span>首页</span></div>
                              <div class="ant-tabs ant-tabs-top BookCatalog-module_asiderTab">
                                <div class="BookCatalog-module_tabBar">
                    <span class="BookCatalog-module_tabTitle larkui-popover-trigger">
                      <svg width="16" height="16" viewBox="0 0 256 256"
                           xmlns="http://www.w3.org/2000/svg"
                           class="larkui-icon larkui-icon-directory">
                        <path
                          d="M88 40.8c5.523 0 10 4.477 10 10 0 5.43-4.327 9.848-9.72 9.996L88 60.8H65.997L66 61v47c0 5.43 4.327 9.848 9.72 9.996L76 118h11c5.523 0 10 4.477 10 10 0 5.43-4.327 9.848-9.72 9.996L87 138H76c-3.506 0-6.872-.602-10-1.707V186c0 5.43 4.327 9.848 9.72 9.996L76 196h11c5.523 0 10 4.477 10 10 0 5.43-4.327 9.848-9.72 9.996L87 216H76c-16.403 0-29.731-13.164-29.996-29.504L46 186V61l.002-.2H26c-5.523 0-10-4.477-10-10 0-5.43 4.327-9.848 9.72-9.996L26 40.8h62Zm49.983-.653 92 .353c5.523.021 9.983 4.516 9.962 10.038-.02 5.43-4.365 9.832-9.758 9.96l-.28.002-92-.354c-5.523-.02-9.983-4.515-9.962-10.038.021-5.43 4.365-9.831 9.759-9.959l.28-.002Zm0 78 92 .353c5.523.021 9.983 4.516 9.962 10.038-.02 5.43-4.365 9.832-9.758 9.96l-.28.002-92-.354c-5.523-.02-9.983-4.515-9.962-10.038.021-5.43 4.365-9.831 9.759-9.959l.28-.002Zm0 78 92 .353c5.523.021 9.983 4.516 9.962 10.038-.02 5.43-4.365 9.832-9.758 9.96l-.28.002-92-.354c-5.523-.02-9.983-4.515-9.962-10.038.021-5.43 4.365-9.831 9.759-9.959l.28-.002Z"
                          fill="currentColor" fill-rule="nonzero">
                        </path>
                      </svg>
                      <span>目录</span>
                    </span>
                                  <div class="BookCatalog-module_asideActionsCont">
                      <span class="CatalogTreeCollapseTrigger-module_actionItem larkui-tooltip">
                        <svg width="1em" height="1em"
                             viewBox="0 0 256 256"
                             xmlns="http://www.w3.org/2000/svg"
                             class="larkui-icon larkui-icon-catalog-expand icon-svg CatalogTreeCollapseTrigger-module_icon_k49Ct index-module_size_wVASz"
                             data-name="CatalogExpand"
                             style="width: 16px; min-width: 16px; height: 16px;">
                          <path
                            d="M74.382 40.5H24.618a8.333 8.333 0 0 0-5.892 14.226l24.881 24.881a8.333 8.333 0 0 0 11.786 0l24.881-24.881A8.333 8.333 0 0 0 74.382 40.5Zm0 134H24.618a8.333 8.333 0 0 0-5.892 14.226l24.881 24.881a8.333 8.333 0 0 0 11.786 0l24.881-24.881a8.333 8.333 0 0 0-5.892-14.226ZM125 41h105c5.523 0 10 4.477 10 10s-4.477 10-10 10H125c-5.523 0-10-4.477-10-10s4.477-10 10-10Zm0 77h105c5.523 0 10 4.477 10 10s-4.477 10-10 10H125c-5.523 0-10-4.477-10-10s4.477-10 10-10Zm0 78h105c5.523 0 10 4.477 10 10s-4.477 10-10 10H125c-5.523 0-10-4.477-10-10s4.477-10 10-10Z"
                            fill="currentColor" fill-rule="evenodd">
                          </path>
                        </svg>
                      </span>
                                  </div>
                                </div>
                                <div class="ant-tabs-content-holder">
                                  <div class="ant-tabs-content ant-tabs-content-top">
                                    <div role="tabpanel" tabindex="0" aria-hidden="false"
                                         class="ant-tabs-tabpane ant-tabs-tabpane-active" id="rc-tabs-0-panel-Catalog"
                                         aria-labelledby="rc-tabs-0-tab-Catalog">
                                      <div style="display: initial;">
                                        <div class="BookCatalog-module_sideCatalog">
                                          <div style="overflow: visible; height: 0px; width: 0px;">
                                            <div class="lark-virtual-tree"
                                                 style="position: relative; height: 705px; width: 345px; overflow: auto; will-change: transform; direction: ltr;">
                                              <div style="height: 648px; width: 100%;">
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="YX0dT_TwX5gFkq1S"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="YX0dT_TwX5gFkq1S"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 0px; height: 36px; width: 100%; cursor: pointer;">
                                                  <a
                                                    class="catalogTreeItem-module_content_fLFbS catalogTreeItem-module_selected_dK6Ji active"
                                                    href="/u21006206/pb2d66/zuzq9q" style="padding-left: 0px;"
                                                    aria-current="page">
                                                    <div class="catalogTreeItem-module_collapseContent_09v0m">
                                                      <div class="catalogTreeItem-module_collapseIconWrapper_XcS8B"></div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">决策指挥大屏系统V4.30数据同步</span>
                                                    </div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </a></div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="2XX6h3sxhoquuz_1"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="2XX6h3sxhoquuz_1"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 36px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 0px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div class="catalogTreeItem-module_collapseIconWrapper_XcS8B">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">计算机基础</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="fr-zQvoBX5GlPNB1"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="fr-zQvoBX5GlPNB1"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 72px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">Linux</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="V8SRv2M3fbKNrnQE"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="V8SRv2M3fbKNrnQE"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 108px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 0px;">
                                                    <div class="catalogTreeItem-module_collapseContent_09v0m">
                                                      <div class="catalogTreeItem-module_collapseIconWrapper_XcS8B"></div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">网络</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="BI2RxnnwrNIdUglQ"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="BI2RxnnwrNIdUglQ"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 144px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 0px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div class="catalogTreeItem-module_collapseIconWrapper_XcS8B">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">编程语言</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="ovyZPIYdE9HhlIcM"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="ovyZPIYdE9HhlIcM"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 180px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">后端</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="S8uTJZbIQHjkHdA0"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="S8uTJZbIQHjkHdA0"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 216px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">前端</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="kPg3wBJxLpt9MElp"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="kPg3wBJxLpt9MElp"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 252px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 0px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div class="catalogTreeItem-module_collapseIconWrapper_XcS8B">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">数据库</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="KmscmsaAQt4_qs8D"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="KmscmsaAQt4_qs8D"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 288px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">Oracle</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="VzdLftThvtAzgkeH"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="VzdLftThvtAzgkeH"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 324px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">MySQL</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="6LT4Z02tyJD8YgF2"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="6LT4Z02tyJD8YgF2"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 360px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 0px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div class="catalogTreeItem-module_collapseIconWrapper_XcS8B">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">开发中间件</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="lT98aFo0jrslgINi"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="lT98aFo0jrslgINi"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 396px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">canal</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="dwuC_QbHSJYAisa2"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="dwuC_QbHSJYAisa2"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 432px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">Redis</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="L6NbzCF8IS-uBAW4"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="L6NbzCF8IS-uBAW4"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 468px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div class="catalogTreeItem-module_collapseContent_09v0m">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq"></div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">Kafka</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="Lu3XL88zUpDQck5Z"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="Lu3XL88zUpDQck5Z"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 504px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">Elasticsearch</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="SwFRugEQvsBBZA0-"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="SwFRugEQvsBBZA0-"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 540px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 0px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div class="catalogTreeItem-module_collapseIconWrapper_XcS8B">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">算法</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="rfAmtXw79hexKz5n"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="rfAmtXw79hexKz5n"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 576px; height: 36px; width: 100%; cursor: pointer;">
                                                  <a class="catalogTreeItem-module_content_fLFbS"
                                                     href="/u21006206/pb2d66/fhou0g"
                                                     style="padding-left: 24px;">
                                                    <div class="catalogTreeItem-module_collapseContent_09v0m">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq"></div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">BitMap算法</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </a></div>
                                                <div class="catalogTreeItem-module_CatalogItem_xkX7p"
                                                     data-rbd-draggable-context-id="0"
                                                     data-rbd-draggable-id="vjTerQCQnniRIwM5"
                                                     tabindex="0" role="button"
                                                     aria-describedby="rbd-hidden-text-0-hidden-text-0"
                                                     data-rbd-drag-handle-draggable-id="vjTerQCQnniRIwM5"
                                                     data-rbd-drag-handle-context-id="0" draggable="false"
                                                     style="position: absolute; left: 0px; top: 612px; height: 36px; width: 100%; cursor: pointer;">
                                                  <div class="catalogTreeItem-module_content_fLFbS"
                                                       style="padding-left: 24px;">
                                                    <div
                                                      class="catalogTreeItem-module_collapseContent_09v0m catalogTreeItem-module_hasChildren_TrI8X">
                                                      <div
                                                        class="catalogTreeItem-module_collapseIconWrapper_XcS8B catalogTreeItem-module_collapsed_u8yPq">
                                                        <svg width="1em" height="1em" viewBox="0 0 256 256"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             class="larkui-icon larkui-icon-mini-dropdown icon-svg catalogTreeItem-module_collapseIcon_1ZFIu index-module_size_wVASz"
                                                             data-name="MiniDropdown"
                                                             style="width: 16px; min-width: 16px; height: 16px;">
                                                          <path
                                                            d="M180.58 108.184c3.84 3.839 3.905 10.023.196 13.941l-.195.2-38.184 38.185c-7.73 7.729-20.21 7.81-28.039.241l-.245-.241-38.184-38.184c-3.905-3.905-3.905-10.237 0-14.142 3.839-3.84 10.023-3.904 13.941-.195l.201.195 38.184 38.184 38.184-38.184c3.905-3.905 10.236-3.905 14.142 0Z"
                                                            fill="currentColor" fill-rule="nonzero"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div class="catalogTreeItem-module_titleWrapper_sFyDt"><span
                                                      class="catalogTreeItem-module_title_snpKw">树形集合</span></div>
                                                    <div
                                                      class="catalogTreeItem-module_catalogItemActionsWrapper_rlWUC"><span
                                                      class="catalogTreeItem-module_catalogItemActions_hcHGq"><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm catalogTreeItem-module_btnGap_uDkKN larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-more icon-svg index-module_size_wVASz"
                                                      data-name="More" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 227.008c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20ZM128 148c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Zm0-78.992c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"
                                                      fill="currentColor" fill-rule="nonzero"></path></svg></span><span
                                                      class="catalogTreeItem-module_btnItem_HrYZm larkui-popover-trigger"><svg
                                                      width="1em" height="1em" viewBox="0 0 256 256"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      class="larkui-icon larkui-icon-add icon-svg index-module_size_wVASz"
                                                      data-name="Add" style="width: 16px; min-width: 16px; height: 16px;"><path
                                                      d="M128 28c5.523 0 10 4.477 10 10v80h80c5.523 0 10 4.477 10 10s-4.477 10-10 10h-80v80c0 5.523-4.477 10-10 10s-10-4.477-10-10v-80H38c-5.523 0-10-4.477-10-10s4.477-10 10-10h80V38c0-5.523 4.477-10 10-10Z"
                                                      fill="currentColor" fill-rule="evenodd"></path></svg></span></span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane"
                                         id="rc-tabs-0-panel-All_Docs" aria-labelledby="rc-tabs-0-tab-All_Docs"
                                         style="display: none;"></div>
                                  </div>
                                </div>
                              </div>
                            </nav>
                          </div>
                          <div class="ReaderLayout-module_dragbar"></div>
                          <div class="ReaderLayout-module_pinWrapper_8A7Ri"><span
                            class="ReaderLayout-module_pinIconWrapper_WglAw larkui-tooltip"><span
                            class="ReaderLayout-module_arrowRight_xXebO"></span></span></div>
                        </div>
                        <div class="reader-sidebar">
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
                                      &lt;!&ndash; <a :href="'#'+ item.id">{{item.text}}</a>&ndash;&gt;
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>-->
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
        sidebarWidth: 200, // 初始宽度




        docInfo: {
          title: 'lovbe0210',
          content: "<card type=\"block\" value=\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E8%A7%84%E5%88%92%E5%B1%80%E5%9B%BD%E9%99%85%E5%8C%96%22%2C%22autoWrap%22%3Afalse%2C%22id%22%3A%22W3QHK%22%2C%22type%22%3A%22block%22%7D\" name=\"codeblock\" editable=\"false\" data-id=\"d1buzc9eg-4oyilu8m9vk000\" ></card><card type=\"block\" value=\"data:%7B%22mode%22%3A%22plain%22%2C%22code%22%3A%22%E5%A4%A7%E5%93%A5%E5%A4%A7%E5%93%A5%E6%A2%B5%E8%92%82%E5%86%88%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E5%86%BB%E5%B9%B2%E7%B2%89%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E9%AB%98%E5%BA%A6%E8%A6%86%E7%9B%96%E7%9A%84%E6%B3%95%E5%9B%BD%E7%9A%84%E8%A6%86%E7%9B%96%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%9C%B0%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%E9%94%85%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E5%A4%A7%E8%8C%83%E7%94%98%E8%BF%AA%E8%A6%86%E7%9B%96%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E9%83%BD%E5%8F%91%E7%BB%99%E5%AF%B9%E6%96%B9%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E8%B1%86%E8%85%90%E5%B9%B2%E8%B1%86%E8%85%90%E5%B9%B2%E7%94%B5%E9%A5%AD%E9%94%85%E7%94%B5%E9%A5%AD%5Cn%E9%94%85%5Cn%22%2C%22autoWrap%22%3Atrue%2C%22id%22%3A%22XN6w3%22%2C%22type%22%3A%22block%22%7D\" name=\"codeblock\" editable=\"false\" data-id=\"da9ajx1ko-4003x371z14000\" ></card><p data-id=\"p1dr9j7ls-4oni0r861to000\">的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度的法国的高度</p><h1 data-id=\"h7mo8zo94-5nv8388lhwo000\" id=\"h4kgw8yp6-1u01rj732jcw0\">第一章 大标题</h1><h2 data-id=\"h6nir3p2w-2jnufm6br3c000\" id=\"h4kgw8yp6-i740lb38rso0\">一、小标题</h2><h3 data-id=\"h231x8tls-14rup6isoly800\" id=\"h4kgw8yp6-igh2t92msg000\">1.大幅度发啊实打实多啊实打实多阿萨达阿闪大大</h3><h4 data-id=\"h1uqpx7og-17qdbtabqyu800\" id=\"h4kgw8yp6-fipuovm5ug000\">1.1 发达了</h4><p data-id=\"p1dr9j7ls-373juoeq7s2000\">1.1.1 真的吗</p><h6 data-id=\"h7mo8zst8-20n2vxu85pls00\" id=\"h4kgw8yp6-f9y8qdkbpz400\">1.1.1.1 真的水电费水电费水电费水电费水电费</h6><p data-id=\"p1dr9j7ls-3a0upzg9xse000\">sdfsdfsdf</p><p data-id=\"p1dr9j7ls-41gdp7jyfdi000\">d</p><ul class=\"data-list data-list-task\" data-id=\"u3zhx2ezt-21tgfic9lksg0\"><li data-id=\"l19a1dmf4-qftzd76ktkw0\" class=\"data-list-item\" checked=\"true\"><card type=\"inline\" value=\"data:%7B%22id%22%3A%22hS6cH%22%2C%22type%22%3A%22inline%22%2C%22checked%22%3Atrue%7D\" name=\"checkbox\" editable=\"false\" ></card>啊实打实大大</li><li data-id=\"l2wwhsngu-ogak31zvw9s0\" class=\"data-list-item\" checked=\"true\"><card type=\"inline\" value=\"data:%7B%22id%22%3A%22V3QL4%22%2C%22type%22%3A%22inline%22%2C%22checked%22%3Atrue%7D\" name=\"checkbox\" editable=\"false\" ></card>啊实打实多</li></ul><ul data-id=\"u1dr9j7ls-j27kyxip1eg00\"><li data-id=\"l19a1dmf4-fj670hhi6a800\">阿闪大大</li><li data-id=\"l19a1dmf4-dhjlxvdleo800\">阿萨达</li></ul><ul data-id=\"u1dr9j7ls-8iqt1r831l800\" data-indent=\"1\"><li data-id=\"l19a1dmf4-192sz3l3y82o0\">啊实打实多</li><li data-id=\"l19a1dmf4-3j3n0c2nvyo00\">阿闪大大</li></ul><ul data-id=\"u2ynadd4g-u5de02rhli80\" data-indent=\"2\"><li data-id=\"l19a1dmf4-bezduxvoqqw00\">啊实打实多</li><li data-id=\"l19a1dmf4-dwur845yavc00\">阿萨达</li></ul><ul data-id=\"u2ynadd4g-4lngc18weve00\" data-indent=\"3\"><li data-id=\"l19a1dmf4-e8p5v1cphi800\">啊实打实</li></ul><ol start=\"1\" data-id=\"o3i5gzqam-2f2u1jd4jmkg0\"><li data-id=\"l19a1dmf4-38upsgl0cqk00\">阿萨达但是</li><li data-id=\"l19a1dmf4-ih00a5dzad400\">啊实打实多</li><li data-id=\"l19a1dmf4-jc24gr1t80w00\">阿萨达</li><li data-id=\"l19a1dmf4-ft5o4ya7lwg00\">阿萨达</li></ol><ol start=\"1\" data-id=\"o3i5gzqam-albemb7ax6800\" data-indent=\"1\"><li data-id=\"l19a1dmf4-fbovya413j400\">啊实打实</li><li data-id=\"l19a1dmf4-hv3s4y6vazc00\">阿萨达</li></ol><ol start=\"1\" data-id=\"oqz2fhwi8-fbw0js2raa000\" data-indent=\"2\"><li data-id=\"l19a1dmf4-gtrr0vheky000\">啊实打实</li><li data-id=\"l19a1dmf4-h8srhzmqfsg00\">啊实打实</li></ol><p data-id=\"p1dr9j7ls-4q9rvj7obmg000\">地方</p><p data-id=\"p1dr9j7ls-3lk2429tbs0000\">s</p><p data-id=\"p1dr9j7ls-13rjc6amy34000\">f</p><p data-id=\"p1dr9j7ls-2qka9w73n92000\">sd</p><p data-id=\"p1dr9j7ls-gxv45zmcy7c00\">f</p><p data-id=\"p1dr9j7ls-1o3v308r5v4w00\">sd</p><p data-id=\"p1dr9j7ls-143ufqjondts00\">f</p><p data-id=\"p1dr9j7ls-1oboszuyruu800\">sd</p><p data-id=\"p1dr9j7ls-c8fttwsr73k00\">f</p><p data-id=\"p1dr9j7ls-3vp72us46yg000\">s</p><p data-id=\"p1dr9j7ls-3is2qbifi78000\">df</p><p data-id=\"p1dr9j7ls-3qt0d0xz3is000\">sdf</p><p data-id=\"p1dr9j7ls-4sqiio74z4w000\">sdf</p><p data-id=\"p1dr9j7ls-3fgc7cej9q8000\">sd</p><p data-id=\"p1dr9j7ls-2dnru20ayp1c00\">f</p><p data-id=\"p1dr9j7ls-4u2rblyv2ky000\">sdf</p><p data-id=\"p1dr9j7ls-3va5jo66ww6000\">sdf</p><p data-id=\"p1dr9j7ls-5cp5y6hko38000\">s</p><p data-id=\"p1dr9j7ls-1ju0iof1vssg00\">df</p><p data-id=\"p1dr9j7ls-4o2oodjhczy000\">s</p><p data-id=\"p1dr9j7ls-1ses0l6esb6o00\">df</p><p data-id=\"p1dr9j7ls-1i8ygi8g4o4g00\">s</p><p data-id=\"p1dr9j7ls-cj5imtln78g00\">sd</p><p data-id=\"p1dr9j7ls-5a5rmknukps000\">f</p><p data-id=\"p1dr9j7ls-4k67gxaenxq000\">sd</p><p data-id=\"p1dr9j7ls-1y3don6icl4w00\">f</p><p data-id=\"p1dr9j7ls-2a0pstvtqo7w00\">s</p><p data-id=\"p1dr9j7ls-5om4exkml8g000\">d</p><p data-id=\"p1dr9j7ls-3pcl6jc7u24000\">f</p><p data-id=\"p1dr9j7ls-5m3ep3wlywg000\">s</p><p data-id=\"p1dr9j7ls-4vt25kjjpa0000\">f</p><p data-id=\"p1dr9j7ls-2ozu5w9iy2q000\">s</p><p data-id=\"p1dr9j7ls-48bzincwhck000\">dfs</p><p data-id=\"p1dr9j7ls-euf89kaloww00\">df</p><p data-id=\"p1dr9j7ls-1tnoi6ygnye800\"><br /><br /></p><p data-id=\"p1dr9j7ls-23uew1fu5kww00\">sd</p><p data-id=\"p1dr9j7ls-17bpkapv7o8w00\">f</p><p data-id=\"p1dr9j7ls-27orj6se61hc00\"><br /><br /></p><p data-id=\"p1dr9j7ls-c9fgteme4so00\">sd</p><p data-id=\"p1dr9j7ls-1oolv0zvc9eo00\">f</p><p data-id=\"p1dr9j7ls-1ly7w8ny7etc00\">s</p><p data-id=\"p1dr9j7ls-u2ta8hgdi9c00\">d</p><p data-id=\"p1dr9j7ls-30i20qaeadc000\">f</p><p data-id=\"p1dr9j7ls-99gvyj3xddk00\">sd</p><p data-id=\"p1dr9j7ls-ksdbzg14es000\">f</p><p data-id=\"p1dr9j7ls-1xxlvck503s000\">sd</p><p data-id=\"p1dr9j7ls-2jtunho87jk000\">f</p><p data-id=\"p1dr9j7ls-57rx0m1lof4000\"><br /><br /></p><p data-id=\"p1dr9j7ls-12deagm18sf400\">sd</p><p data-id=\"p1dr9j7ls-2ivysu97cki000\">f</p><p data-id=\"p1dr9j7ls-37fv35w8qx8000\">sd</p><p data-id=\"p1dr9j7ls-35b7d2y9hiw000\">f</p><p data-id=\"p1dr9j7ls-mwvm0vsni2o00\">s</p><p data-id=\"p1dr9j7ls-3sezd736ygo000\">d</p><p data-id=\"p1dr9j7ls-14n2juucc8dc00\">fsd</p><p data-id=\"p1dr9j7ls-3wm68rfszic000\">f</p><p data-id=\"p1dr9j7ls-1sqhbl85tilc00\">sdf</p><p data-id=\"p1dr9j7ls-128zofo918wg00\"><br /><br /></p><p data-id=\"p1dr9j7ls-20yxqbwwrlgg00\">sd</p><p data-id=\"p1dr9j7ls-vvgwvissm1c00\">f</p><p data-id=\"p1dr9j7ls-3ju2f8tmbn8000\">sd</p><p data-id=\"p1dr9j7ls-57vn2q697jc000\"><br /><br /></p><p data-id=\"p1dr9j7ls-3c333m9oinc000\">f</p><p data-id=\"p1dr9j7ls-40hfq2i7ktk000\">sd</p><p data-id=\"p1dr9j7ls-48y3itp384w000\">f</p><p data-id=\"p1dr9j7ls-53lka4c0rds000\">s</p><p data-id=\"p1dr9j7ls-33fqmiu3ijo000\">d</p><p data-id=\"p1dr9j7ls-1lg2a02vvmyo00\">f</p><p data-id=\"p1dr9j7ls-yam3z33gibk00\">sd</p><p data-id=\"p1dr9j7ls-2105iu67cjr400\">f</p><p data-id=\"p1dr9j7ls-1j0x431wgcdc00\"><br /><br /></p><p data-id=\"p1dr9j7ls-51bnuiiz5wk000\">sd</p><p data-id=\"p1dr9j7ls-19g2g5zzt2v400\">f</p><p data-id=\"p1dr9j7ls-mg0h300kdgg00\">s</p><p data-id=\"p1dr9j7ls-4ks3bhbiizs000\">d</p><p data-id=\"p1dr9j7ls-47oihi74ji0000\">f</p><p data-id=\"p1dr9j7ls-2jmsdaj0da8000\">sd</p><p data-id=\"p1dr9j7ls-405l32a87p8000\">fsdf</p><p data-id=\"p1dr9j7ls-1ir4b0kp4nsw00\">sdf</p><p data-id=\"p1dr9j7ls-2z7c10e196o000\">sdf</p><p data-id=\"p1dr9j7ls-42bb419jc9w000\">sdf</p><p data-id=\"p1dr9j7ls-4vmra2vmbva000\">sdf</p><p data-id=\"p1dr9j7ls-4iee4ve7szk000\">sdf</p><p data-id=\"p1dr9j7ls-47bwh9nzrag000\">sdf</p><p data-id=\"p1dr9j7ls-3akx0y6xljs000\">sdf</p><p data-id=\"p1dr9j7ls-zbjf5ka8zk000\">sdf</p><p data-id=\"p1dr9j7ls-2fraqd5iw8kk00\">sdf</p><p data-id=\"p1dr9j7ls-3ncezjj7444000\">sf</p><p data-id=\"p1dr9j7ls-23zvyo0ajvmo00\">sdf</p><p data-id=\"p1dr9j7ls-2jqtd5xga78000\">sdf</p><p data-id=\"p1dr9j7ls-4pua5ql8asc000\">sdf</p><p data-id=\"p1dr9j7ls-4ylkvgd1570000\"><br /><br /></p><h3 data-id=\"h9ql9cmio-fzavpj8vzy800\" id=\"h4kgw8yp6-beg9hwws2bc00\">2.小幅度发</h3><h2 data-id=\"hgdryewbo-1crcmpyf1hb400\" id=\"h4kgw8yp6-cnbb438571k00\">二、中表题</h2><h3 id=\"h231x8tls-8n9mwmm81f000\" data-id=\"hgaw9birk-2bm09duqqcbo00\">1.大幅度发</h3><h4 id=\"h1uqpx7og-ghgnusv66cg00\" data-id=\"h6fy3951c-3gm7h321myc000\">1.1 发达了</h4><h5 id=\"hqmwfki9s-bwo7j1j4wjk00\" data-id=\"h2lr2xwbi-782wy6ub21s00\">1.1.1 真的吗</h5><h6 id=\"h7mo8zst8-idey9a86d9k00\" data-id=\"h17e3kxeo-5s58g3qwgbo000\">1.1.1.1 真的想</h6><h2 data-id=\"h1mfgsrq8-2677g2l7exls00\" id=\"h4kgw8yp6-1l16dubmmqf40\">三、小标题</h2><h3 id=\"h231x8tls-4o01xa0z89k00\" data-id=\"h1mooaxr4-57xbcod3k4c000\">1.大幅度发说的</h3><h4 id=\"h1uqpx7og-c02r7iflodc00\" data-id=\"h5sgze6a8-4z0gzaa08yw000\">1.1 发达了是</h4><h5 id=\"hqmwfki9s-a6cc90wjiao00\" data-id=\"h9di87lr8-4fzpfbb2ufs000\">1.1.1 真的吗</h5><h6 id=\"h7mo8zst8-dpo4698v2vc00\" data-id=\"h9edidg2k-9lpeh1bk7vo00\">1.1.1.1 真的</h6><h3 data-id=\"h7mo8x65o-23n78nl2qsyo00\" id=\"h4kgw8yp6-1443qb4fyarg0\">三级大标题</h3><h4 data-id=\"ho54pzw1c-1jtc4yxb7jeo00\" id=\"h5sgze6a8-l3lubgrdngw00\">1.1 发达了</h4><h5 data-id=\"h1fiz3x9c-11cs4f9c2vj400\" id=\"h9di87lr8-9z8mnjlt1c400\">1.1.1 真的吗说的</h5><p data-id=\"p1dr9j7ls-2bk3wysbgyo000\"><br /><br /></p>"
        },
        tocData: [],
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
          this.sidebarWidth = this.startWidth + deltaX;
        }
      },
      stopDrag() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.stopDrag);
      }
    },
    mounted() {
      // 获取相关元素
      const sidebarElement = this.$refs.sidebar;

      // 鼠标放开事件
      document.addEventListener('mouseup', () => {
        this.isResizing = false;
      });

      // 鼠标移动事件
      document.addEventListener('mousemove', (e) => {
        if (this.isResizing) {
          this.sidebarWidth = e.clientX - sidebarElement.getBoundingClientRect().left;
        }
      });

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
