<template>
  <div class="layout-message-notification">
    <div class="msg-notify-menu">
      <div class="fixed-anchor-point">
        <div class="item">
          <span class="iconfont icon-paper-plane"></span>
          消息中心
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('commentReply')">
        <div :class="['item', activeMenu === 'commentReply' ? 'active-menu' : '']">
          <span>回复我的</span>
          <span class="count">5</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('likesReceived')">
        <div :class="['item', activeMenu === 'likesReceived' ? 'active-menu' : '']">
          <span>收到的赞</span>
          <span class="count">1</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('newFans')">
        <div :class="['item', activeMenu === 'newFans' ? 'active-menu' : '']">
          <span>新增粉丝</span>
          <span class="count">10</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('systemMessage')">
        <div :class="['item', activeMenu === 'systemMessage' ? 'active-menu' : '']">
          <span>系统消息</span>
          <span class="count">23</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('chatMessage')">
        <div :class="['item', activeMenu === 'chatMessage' ? 'active-menu' : '']">
          <span>我的消息</span>
          <span class="count">99+</span>
        </div>
      </div>
      <div class="menu-item item-line">
        <div class="line"></div>
      </div>
      <div class="menu-item msg-setting" @click="routeNavigate('messageSetting')">
        <div :class="['item', activeMenu === 'messageSetting' ? 'active-menu' : '']">
          <span class="iconfont icon-preferences"></span>
          消息设置
        </div>
      </div>
    </div>
    <div class="msg-notify-body">
      <div class="module-tabs-wrapper">
        <div class="module-tabs-tabpane-active">
          <div class="tabs-tabpane-head">
            <span class="active-tab">
              <span v-if="activeMenu === 'commentReply'">
                回复我的
              </span>
              <span v-if="activeMenu === 'likesReceived'">
                收到的赞
              </span>
              <span v-if="activeMenu === 'newFans'">
                新增粉丝
              </span>
              <span v-if="activeMenu === 'systemMessage'">
                系统消息
              </span>
              <span v-if="activeMenu === 'chatMessage'">
                我的消息
              </span>
              <span v-if="activeMenu === 'messageSetting'">
                消息设置
              </span>
            </span>
            <span class="all-read-action">
              <span class="iconfont clean"></span>
              <span>
                全部已读
              </span>
            </span>
          </div>
          <div class="tabs-notify-holder beauty-scroll"
               v-if="activeMenu !== 'chatMessage' && activeMenu !== 'messageSetting'">
            <ul class="tab-list-items" v-if="activeMenu === 'commentReply'">
              <li class="tab-list-item"
                  v-for="item in commentReplyList"
                  :key="item.id">
                <div class="notification-item">
                  <b-avatar class="avatar"
                            :src="item.avatar"
                            variant="light" to="/asdasd" size="2rem">
                    <span v-if="!item.avatar">{{ row.username }}</span>
                  </b-avatar>
                  <div class="item-content">
                    <p>
                      <a href="/u25607691" target="_blank" class="context-actor">{{item.username}}</a>
                      {{ (item.action === 1 ? '对' : item.action === 2 ? '在' : '') +
                      (item.type === 1 ? '文档' : item.type === 2 ? '随笔' : '') }}
                      <a href="/go/notification/134715579" target="_blank">
                        <span class="context-subject">{{item.targetVectorName}}</span>
                      </a>
                      <span v-if="item.action === 1">
                        发表了评论
                      </span>
                      <span v-if="item.action === 2">
                        的评论中提到了你
                      </span>
                      <Badge dot v-if="item.read === 0" :offset="[-9, -3]"/>
                    </p>
                    <time>
                      <span>2023-03-16 14:58</span>
                    </time>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'likesReceived'">
              <li class="tab-list-item"
                  v-for="item in likesList"
                  :key="item.id">
                <div class="notification-item">
                  <b-avatar class="avatar"
                            :src="item.avatar"
                            variant="light" to="/asdasd" size="2rem">
                    <span v-if="!item.avatar">{{ row.username }}</span>
                  </b-avatar>
                  <div class="item-content">
                    <p>
                      <a href="/u25607691" target="_blank" class="context-actor">{{item.username}}</a>
                      赞了我的{{ item.type == 1 ? '文档' : item.type == 2 ? '随笔' : '评论' }}
                      <a href="/go/notification/134715579" target="_blank">
                        <span class="context-subject">{{item.targetVectorName}}</span>
                      </a>
                      <Badge dot v-if="item.read === 0" :offset="[-9, -3]"/>
                    </p>
                    <time>
                      <span>2023-03-16 14:58</span>
                    </time>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'newFans'">
              <li class="tab-list-item"
                  v-for="item in newFansList"
                  :key="item.id">
                <div class="notification-item">
                  <b-avatar class="avatar"
                            :src="item.avatar"
                            variant="light" to="/asdasd" size="2rem">
                    <span v-if="!item.avatar">{{ row.username }}</span>
                  </b-avatar>
                  <div class="item-content">
                    <p>
                      <a href="/u25607691" target="_blank" class="context-actor">{{item.username}}</a>
                      关注了我
                      <Badge dot v-if="item.read === 0" :offset="[-9, -3]"/>
                    </p>
                    <time>
                      <span>2023-03-16 14:58</span>
                    </time>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'systemMessage'">
              <li class="tab-list-item"
                  v-for="item in systemMsgList"
                  :key="item.id">
                <div class="notification-item">
                  <div class="item-content">
                    <p>
                      <span class="context-subject">
                        {{item.content}}
                      </span>
                      <a :href="item.url" target="_blank">
                        <span class="sys-msg-label">&nbsp;{{item.label}}</span>
                      </a>
                      <Badge dot v-if="item.read === 0" :offset="[-9, -5]"/>
                    </p>
                    <time>
                      <span>2023-03-16 14:58</span>
                    </time>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tabs-message-holder ps" v-if="activeMenu === 'chatMessage'">
            <div class="lovbe-im">
              <div class="session-list beauty-scroll">
                <div class="list-container">
                  <div class="list-item" v-for="session in sessionList" :key="session.session_id">
                    <b-avatar class="avatar"
                              :src="session.session_user_avatar"
                              variant="light" to="/asdasd" size="2rem">
                      <span v-if="!session.session_user_avatar">{{ session.session_user_name }}</span>
                    </b-avatar>
                    <div class="name-box">
                      <div class="name" :title="session.session_user_name">
                        <div class="name-value">{{session.session_user_name}}</div>
                      </div>
                      <div :title="session.last_msg?.content?.content" class="last-word">
                        {{ session.last_msg?.content?.content }}
                      </div>
                    </div>
                    <div class="close">
                      <span class="iconfont remove"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>锤哥就是玩</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">锤哥就是玩</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>股市-目标1000万股桃哥</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">置顶聊天</a><a data-v-2cd75a90="" class="btn">开启免打扰</a>
                        <a data-v-2cd75a90="" class="btn">加入黑名单</a><a
                          data-v-2cd75a90="" class="btn">举报该用户</a><a data-v-2cd75a90=""
                                                                     class="btn"><span
                          data-v-2cd75a90="" class="name">不接收推送</span><span data-v-2cd75a90=""
                                                                            class="tips">通知正常接收</span></a>
                      </div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div data-v-ea8be482="" class="message-list">
                    <div data-v-ea8be482="" class="message-list-content min_h_100">
                      <div data-v-2fe28aba="" data-v-ea8be482="" class="msg-more"><span data-v-2fe28aba=""
                                                                                        class="load-more"
                                                                                        style="display: none;"><span
                        data-v-2fe28aba="" class="icon"></span>查看和他的历史私信消息</span><span data-v-2fe28aba=""
                                                                                       class="no-more"
                                                                                       style="display: none;">没有更多消息了～</span><span
                        data-v-2fe28aba="" class="loading" style="display: none;"><div data-v-2fe28aba=""
                                                                                       class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></span><span
                        data-v-2fe28aba="" class="error" style="display: none;">消息加载失败，<span data-v-2fe28aba=""
                                                                                             class="btn">点击重新加载</span></span>
                      </div>
                      <div data-v-5645b0bf="" data-v-ea8be482="" class="msg-time"><span data-v-5645b0bf=""
                                                                                        class="time">2022年2月11日 06:56</span>
                      </div>
                      <div data-v-0629ad6c="" data-v-ea8be482="" class="msg-item is-me"><a
                        data-v-0629ad6c="" href="//space.bilibili.com/271221082" target="_blank" class="avatar"
                        title="lambda_布衣草人"
                        style="background-image: url(https://i1.hdslb.com/bfs/face/e378bb312a3673c714e2d55372dd8a2c7f913cc0.jpg@30w_30h_1c.webp);"></a>

                        <div data-v-0629ad6c="" class="message">
                          <div data-v-0629ad6c="" data-key="7063218888198084870" class="message-content is-me">
                            桃哥，怎么开0.5的
                          </div>
                        </div>
                      </div>
                      <div data-v-5645b0bf="" data-v-ea8be482="" class="msg-time"><span data-v-5645b0bf=""
                                                                                        class="time">2022年2月11日 08:36</span>
                      </div>
                      <div data-v-0629ad6c="" data-v-ea8be482="" class="msg-item not-me"><a
                        data-v-0629ad6c="" href="//space.bilibili.com/625315686" target="_blank" class="avatar"
                        title="股市-目标1000万股桃哥"
                        style="background-image: url(https://i0.hdslb.com/bfs/face/456cb478ac58cfbf56efd8d92a19cd4bda94cf8e.jpg@30w_30h_1c.webp);"></a>

                        <div data-v-0629ad6c="" class="message">
                          <div data-v-0629ad6c="" data-key="7063244598550748153" class="message-content">
                            加下我qq<br>2156058387
                          </div>
                        </div>
                      </div>
                      <div data-v-5645b0bf="" data-v-ea8be482="" class="msg-time"><span data-v-5645b0bf=""
                                                                                        class="time">2023年4月29日 09:37</span>
                      </div>
                      <div data-v-0629ad6c="" data-v-ea8be482="" class="msg-item is-me"><a
                        data-v-0629ad6c="" href="//space.bilibili.com/271221082" target="_blank" class="avatar"
                        title="lambda_布衣草人"
                        style="background-image: url(https://i1.hdslb.com/bfs/face/e378bb312a3673c714e2d55372dd8a2c7f913cc0.jpg@30w_30h_1c.webp);"></a>

                        <div data-v-0629ad6c="" class="message">
                          <div data-v-0629ad6c="" data-key="7227279930856776579" class="message-content is-me">
                            桃哥，最近咋没动静了
                          </div>
                        </div>
                      </div>
                      <div data-v-5645b0bf="" data-v-ea8be482="" class="msg-time"><span data-v-5645b0bf=""
                                                                                        class="time">2024年3月19日 13:35</span>
                      </div>
                      <div data-v-0629ad6c="" data-v-ea8be482="" class="msg-item is-me"><a
                        data-v-0629ad6c="" href="//space.bilibili.com/271221082" target="_blank" class="avatar"
                        title="lambda_布衣草人"
                        style="background-image: url(https://i1.hdslb.com/bfs/face/e378bb312a3673c714e2d55372dd8a2c7f913cc0.jpg@30w_30h_1c.webp);"></a>

                        <div data-v-0629ad6c="" class="message">
                          <div data-v-0629ad6c="" data-key="7347943906312585459" class="message-content is-me">
                            桃哥，开户还是这个QQ吗
                          </div>
                        </div>
                      </div>
                      <div data-v-0629ad6c="" data-v-ea8be482="" class="msg-item is-me"><a
                        data-v-0629ad6c="" href="//space.bilibili.com/271221082" target="_blank" class="avatar"
                        title="lambda_布衣草人"
                        style="background-image: url(https://i1.hdslb.com/bfs/face/e378bb312a3673c714e2d55372dd8a2c7f913cc0.jpg@30w_30h_1c.webp);"></a>

                        <div data-v-0629ad6c="" class="message">
                          <div data-v-0629ad6c="" data-key="7347944017136583671" class="message-content is-me">
                            没人好像
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-v-ea8be482="" class="ai-typing-box">
                      <div data-v-ea8be482="" class="message-ai-typing" style="display: none;"> 正在输入...</div>
                    </div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">股市-目标1000万股桃哥</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>散户成长基地</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">散户成长基地</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>哔哩哔哩创作中心</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">哔哩哔哩创作中心</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span></span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name"></span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>哔哩哔哩智能机</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">哔哩哔哩智能机</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>哔哩哔哩晚会</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">哔哩哔哩晚会</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>哔哩哔哩英雄联盟赛事</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">哔哩哔哩英雄联盟赛事</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>每天两只股</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">每天两只股</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>今日话题酱</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">今日话题酱</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>研究员雷牛牛</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">研究员雷牛牛</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>爱思考的小呆呆</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">爱思考的小呆呆</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>凌乱的心-</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">凌乱的心-</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>吾爱财经</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">吾爱财经</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>复利的奇迹ETF基金理财</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">复利的奇迹ETF基金理财</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>网络科技张</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">网络科技张</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>Jim做交易</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">Jim做交易</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>江东刀郎</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">江东刀郎</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>搞机所</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">搞机所</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>哔哩哔哩课堂</span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a><a data-v-2cd75a90="" class="btn">加入黑名单</a>
                        <a data-v-2cd75a90="" class="btn">举报该用户</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name">哔哩哔哩课堂</span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dialog hide">
                  <div class="title">
                    <div class="is-limit" style="display: none;">该用户已被封禁～</div>
                    <div class="is-black" style="display: none;">(&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span></span>
                    <div data-v-2cd75a90="" class="action-menu"
                         style="top: 3px; right: 0px;">
                      <div data-v-2cd75a90="" class="menu-list" style="display: none;"><a
                        data-v-2cd75a90="" class="btn">开启免打扰</a></div>
                      <a data-v-2cd75a90="" class="btn bp-icon-font icon-more-1"></a></div>
                  </div>
                  <div class="new-message-tip" style="display: none;">
                    <div class="text">您有 0 条新消息</div>
                  </div>
                  <div data-v-6f69db04="" class="send-box">
                    <div data-v-6f69db04="" class="row">
                      <div data-v-6f69db04="" class="space-margin"><label data-v-6f69db04=""
                                                                          class="image-upload-btn"></label>
                      </div>
                      <div data-v-6f69db04="" class="space-margin emoji-container">
                        <button data-v-6f69db04="" title="表情" class="emotion-btn-box"></button>
                      </div>
                    </div>
                    <div data-v-f371454e="" data-v-6f69db04="" placeholder="回复一下吧～" class="input-box">
                      <div data-v-f371454e="" id="editor" class="core-style" contenteditable="true"
                           style="height: 60px;">‍
                      </div>
                      <div data-v-f371454e="" class="indicator" style="bottom: -30px; right: 100px;"><span
                        data-v-f371454e="" class="">0</span>/<span data-v-f371454e="">500</span></div>
                    </div>
                    <div data-v-6f69db04="" class="row right">
                      <button data-v-70b6d4bb="" data-v-6f69db04="" class="btn-box send-btn" title="enter 发送
shift + enter 换行">发送
                      </button>
                    </div>
                  </div>
                  <div data-v-25e750bd="" data-v-32d9e240="" class="im-popup report-popup"
                       style="display: none;">
                    <div data-v-385379dd="" data-v-25e750bd=""
                         class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                         style="width: 500px; display: none;">
                      <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                class="popup-title">举报该用户</h2>
                      </div>
                      <div data-v-385379dd="" class="popup-content-ctnr">
                        <div data-v-25e750bd="" class="content">
                          <div data-v-32d9e240="" class="content-text">请选择您举报<span data-v-32d9e240=""
                                                                                   class="name"></span>的理由，该对话近期内的消息将作为证据一并提交。
                          </div>
                          <div data-v-32d9e240="" class="selector-box"><label data-v-71da817c=""
                                                                              data-v-32d9e240=""
                                                                              class="type-selector"><input
                            data-v-71da817c="" name="report-type" type="radio" class="radio" value="1">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-o1815x">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            色情低俗</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="2">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            政治敏感</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="3">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            违法有害</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="4">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            广告骚扰</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="5">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            人身攻击</label><label data-v-71da817c="" data-v-32d9e240=""
                                               class="type-selector"><input data-v-71da817c=""
                                                                            name="report-type" type="radio"
                                                                            class="radio" value="6">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            诈骗</label><label data-v-71da817c="" data-v-32d9e240=""
                                             class="type-selector other-reason"><input data-v-71da817c=""
                                                                                       name="report-type"
                                                                                       type="radio"
                                                                                       class="radio" value="0">
                            <svg data-v-71da817c="" viewBox="0 0 40 40" class="radio-icon css-1xneiug">
                              <path class="content"
                                    d="M20,0h0A20,20,0,0,1,40,20h0A20,20,0,0,1,20,40h0A20,20,0,0,1,0,20H0A20,20,0,0,1,20,0Z"></path>
                              <path class="border"
                                    d="M2.5,20A17.5,17.5,0,1,0,20,2.5,17.51,17.51,0,0,0,2.5,20ZM0,20A20,20,0,1,1,20,40,20,20,0,0,1,0,20Z"></path>
                              <path class="dot"
                                    d="M20,10h0A10,10,0,0,1,30,20h0A10,10,0,0,1,20,30h0A10,10,0,0,1,10,20h0A10,10,0,0,1,20,10Z"></path>
                            </svg>
                            其他问题</label></div>
                          <div data-v-32d9e240="" class="report-tip">为帮助审核人员更快处理，请补充问题类型和出现位置等详细信息。</div>
                          <div data-v-8d17619c="" data-v-32d9e240="" class="input-box report-input"><textarea
                            data-v-8d17619c="" placeholder="举报内容" maxlength="50" autofocus="autofocus"
                            class="textarea" style="height: 86px;"></textarea>
                            <div data-v-8d17619c="" class="indicator"><span data-v-8d17619c=""
                                                                            class="">0</span>/<span
                              data-v-8d17619c="">50</span></div>
                          </div>
                        </div>
                        <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--primary bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">确定</span></button>
                          <button data-v-83e6a2ae="" data-v-385379dd=""
                                  class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                            data-v-83e6a2ae="" class="txt">取消</span></button>
                        </div>
                      </div>
                      <div data-v-385379dd="" role="button" title="关闭面板"
                           class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                        data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">黑名单</h2>
                        </div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">
                              加入黑名单后，将自动解除关注关系和对该用户的合集订阅关系，禁止该用户与我互动或查看我的空间
                            </div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          退出该应援团</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">确认退出该应援团吗？</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
                      </div>
                    </div>
                  </div>
                  <div data-v-4431f2bf="">
                    <div data-v-25e750bd="" data-v-4431f2bf="" class="im-popup confirm-popup"
                         style="display: none;">
                      <div data-v-385379dd="" data-v-25e750bd=""
                           class="bp-popup-panel p-relative a-move-in-top a-forwards im-popup-shell"
                           style="width: 500px; display: none;">
                        <div data-v-385379dd="" class="title-ctnr p-relative"><h2 data-v-385379dd=""
                                                                                  class="popup-title">
                          确认关闭内容推送吗？</h2></div>
                        <div data-v-385379dd="" class="popup-content-ctnr">
                          <div data-v-25e750bd="" class="content">
                            <div data-v-4431f2bf="" class="content-text">关闭后，你将不再收到该账号的内容推送，但通知类消息不受影响</div>
                          </div>
                          <div data-v-385379dd="" class="popup-btn-ctnr t-center">
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--primary bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">确定</span></button>
                            <button data-v-83e6a2ae="" data-v-385379dd=""
                                    class="bl-button panel-btn bl-button--ghost bl-button--size"><span
                              data-v-83e6a2ae="" class="txt">取消</span></button>
                          </div>
                        </div>
                        <div data-v-385379dd="" role="button" title="关闭面板"
                             class="close-btn p-absolute bg-center bg-no-repeat pointer t-center"><i
                          data-v-385379dd="" class="bp-icon-font icon-close"></i></div>
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
  </div>
</template>

<script>
  export default {
    name: "MessageNotification",
    data() {
      return {
        // 评论回复
        commentReplyList: [],
        // 点赞
        likesList: [],
        newFansList: [],
        systemMsgList: [],
        sessionList: [
          {
            "session_id": 625315686,
            "session_user_id": 123123123,
            "session_user_name": "股市-目标1000万股桃哥",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hmv3du2z1zj30k00qowme.jpg",
            "is_follow": 1,
            "session_ts": 1710826535376070,
            "unread_count": 0,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 271221082,
              "receiver_type": 1,
              "receiver_id": 625315686,
              "msg_type": 1,
              "content": "{\"content\":\"没人好像\"}",
              "timestamp": 1710826535,
              "at_uids": null,
              "msg_key": 7347944017136584000,
              "msg_status": 0
            }
          },
          {
            "session_id": 233200988,
            "session_user_id": 123123123,
            "session_user_name": "Music郑在看",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1m6vedbj30is0qaabq.jpg",
            "is_follow": 0,
            "session_ts": 1700109866222339,
            "unread_count": 1,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 233200988,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": "{\"content\":\"谢谢关注。祝投资顺利！买的都是大牛股！\"}",
              "timestamp": 1700109865,
              "at_uids": null,
              "msg_key": 7301916270749065000,
              "msg_status": 0
            }
          },
          {
            "session_id": 3493297165175445,
            "session_user_id": 123123123,
            "session_user_name": "鹏城杰森",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1maldlsj30m71fnn29.jpg",
            "is_follow": 0,
            "session_ts": 1698548656929697,
            "unread_count": 1,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 3493297165175445,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": "{\"content\":\"周末一过明天又是开战的一天哦\\/\"}",
              "timestamp": 1698548656,
              "at_uids": null,
              "msg_key": 7295210928955405000,
              "msg_status": 0
            }
          },
          {
            "session_id": 1764905834,
            "session_user_id": 123123123,
            "session_user_name": "保彪",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1mjb0hdj30vp1bj45k.jpg",
            "is_follow": 0,
            "session_ts": 1694423942225948,
            "unread_count": 1,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 1764905834,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": "{\"content\":\"现在要破3000了[妙啊]\"}",
              "timestamp": 1694423941,
              "at_uids": null,
              "msg_key": 7277495413156296000,
              "msg_status": 0
            }
          },
          {
            "session_id": 96081167,
            "session_user_id": 123123123,
            "session_user_name": "江东刀郎",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1n13ni4j316o1kwgt1.jpg",
            "is_follow": 1,
            "session_ts": 1693372352970827,
            "unread_count": 1,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 96081167,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 2,
              "content": "{\"height\":1280,\"imageType\":\"png\",\"original\":0,\"size\":\"173\",\"url\":\"https://i0.hdslb.com/bfs/im_new/aa7c4f07f8552bce791565469ab48e7a96081167.jpg\",\"width\":795}",
              "timestamp": 1693372352,
              "at_uids": null,
              "msg_key": 7272978872691186000,
              "msg_status": 0
            }
          },
          {
            "session_id": 1803963357,
            "session_user_id": 123123123,
            "session_user_name": "福利吧搬运工",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1n1w2m7j335s2dcx14.jpg",
            "is_follow": 1,
            "session_ts": 1672072267119796,
            "unread_count": 1,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 1803963357,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": "{\"content\":\"影视   歌  只要想的基本全本地化。网盘不知哪天变动，就被动vip了。阿里云就是，还好大多在天翼和迅雷。\"}",
              "timestamp": 1672072266,
              "at_uids": null,
              "msg_key": 7181495700031737000,
              "msg_status": 0
            }
          },
          {
            "session_id": 18922263357,
            "session_user_id": 123123123,
            "session_user_name": "私募小日常",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hm7wguih2rj316o1kwk8h.jpg",
            "is_follow": 1,
            "session_ts": 1672072267119796,
            "unread_count": 1,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 1803963357,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": "{\"content\":\"宝贝，请坐我的小板凳～来了就别走啦！我给你看我收藏的好东西(ू•ᴗ•ू❁)有啥想问的随时私信我！聊个5毛钱的哈哈哈哈哈\"}",
              "timestamp": 1672072266,
              "at_uids": null,
              "msg_key": 7181495700031737000,
              "msg_status": 0
            }
          },
          {
            "session_id": 18922262886557,
            "session_user_id": 123123123,
            "session_user_name": "依旧smile",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hmcl0nlc5sj335s23v7j6.jpg",
            "is_follow": 1,
            "session_ts": 1672072267119796,
            "unread_count": 1,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 1803963357,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": "{\"content\":\"音乐嘛。我觉得最重要的就是全。很少有比较全的音乐app，我都是混着用\"}",
              "timestamp": 1672072266,
              "at_uids": null,
              "msg_key": 7181495700031737000,
              "msg_status": 0
            }
          },
          {
            "session_id": 18222628453453,
            "session_user_id": 123123123,
            "session_user_name": "深夜港湾",
            "session_user_avatar": "https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1hmet8wel4mj327x2yo4qp.jpg",
            "is_follow": 1,
            "session_ts": 1672072267119796,
            "unread_count": 1,
            "live_status": 0,
            "last_msg": {
              "sender_uid": 1803963357,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": "{\"content\":\"内容还蛮有趣，画风是Q版的，没那么辣眼睛，如果你的对象比较含蓄也可以毫不违和的一起看。\"}",
              "timestamp": 1672072266,
              "at_uids": null,
              "msg_key": 7181495700031737000,
              "msg_status": 0
            }
          }
        ],
        activeMenu: null
      }
    },
    props: ['msgNotifyTypeActive'],
    methods: {
      routeNavigate(activeMenu) {
        if (this.activeMenu === activeMenu) {
          // 滚动条滚动套第一个未读的消息列表，如果全部已读则无需滚动
          return;
        }
        this.activeMenu = activeMenu;
        this.loadMsgNotify(activeMenu);
      },
      loadMsgNotify(activeMenu) {
        setTimeout(() => {
          console.log('更新数据')
        }, 1000)
        switch (activeMenu) {
          case 'commentReply':
            this.commentReplyList = [
              // type: 1 文档 2 随笔
              // action: 1 评论 2 提及
              {
                id: 121112,
                username: '安沐夕',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
                domain: 'asd34dsff',
                type: 1,
                action: 1,
                read: 0,
                targetVectorId: 121212,
                targetVectorName: "浅谈Redis分布式锁(上)"
              },
              {
                id: 2235663,
                username: 'HappyDragon1994',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho5g0vpdj3j30nq0tn0v3.jpg',
                domain: 'asd34dsasdff',
                type: 1,
                action: 2,
                read: 1,
                targetVectorId: 12129432,
                targetVectorName: "浅谈Redis分布式锁(下)"
              },
              {
                id: 11553436,
                username: 'bravo1988',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1ho5g0tzacqj30nq0tojub.jpg',
                domain: '23dfsssgg55',
                type: 2,
                action: 2,
                read: 0,
                targetVectorId: 12129432,
                targetVectorName: "浅谈Redis分布式锁(下)"
              },
              {
                id: 33442222,
                username: '咔咔',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
                domain: 'sasdasdas',
                type: 2,
                action: 1,
                read: 0,
                targetVectorId: 12129432,
                targetVectorName: "浅谈Redis分布式锁(下)"
              },
              {
                id: 1214424,
                username: '白白bai',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjp45pmj30jz0qndkw.jpg',
                domain: 'sasdasdas',
                type: 2,
                action: 2,
                read: 1,
                targetVectorId: 12121129432,
                targetVectorName: "衣公子《迪拜：风浪越大，鱼越贵》"
              },
              {
                id: 75434234445353,
                username: 'IT\'S ME!',
                avatar: 'https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hln4xfe6glj30u011in2q.jpg',
                domain: 'ssds2323',
                type: 1,
                action: 2,
                read: 1,
                targetVectorId: 12121129432,
                targetVectorName: "冯大辉：为什么我不赞同都去读研究生》"
              },
              {
                id: 12345511666,
                username: '在下查尔斯',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho2yc13on8j31401aojxy.jpg',
                domain: 'ssds2323',
                type: 1,
                action: 1,
                read: 1,
                targetVectorId: 1212112922432,
                targetVectorName: "阿尔都塞：意识形态和意识形态国家机器"
              },
              {
                id: 754345353,
                username: '小小哥的 Blog',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho5g0wvoxoj30nq0to3zr.jpg',
                domain: 'ssds2323',
                type: 2,
                action: 2,
                read: 0,
                targetVectorId: 1212112129432,
                targetVectorName: "为什么现在的年轻人都不生孩子了？"
              }
            ]
            break;
          case 'likesReceived':
            this.likesList = [
              // type: 1 文档 2 随笔 3评论
              {
                id: 121112,
                username: '安沐夕',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
                domain: 'asd34dsff',
                type: 1,
                read: 0,
                targetVectorId: 121212,
                targetVectorName: "浅谈Redis分布式锁(上)"
              },
              {
                id: 2235663,
                username: 'HappyDragon1994',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho5g0vpdj3j30nq0tn0v3.jpg',
                domain: 'asd34dsasdff',
                type: 2,
                read: 1,
                targetVectorId: 12129432,
                targetVectorName: "浅谈Redis分布式锁(下)"
              },
              {
                id: 11553436,
                username: 'bravo1988',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1ho5g0tzacqj30nq0tojub.jpg',
                domain: '23dfsssgg55',
                type: 3,
                read: 0,
                targetVectorId: 12129432,
                targetVectorName: "支持一下up[给心心]"
              },
              {
                id: 33442222,
                username: '咔咔',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
                domain: 'sasdasdas',
                type: 3,
                read: 1,
                targetVectorId: 12129432,
                targetVectorName: "可能和大家的固有思维有关吧，卡农就是舒缓版，然后就。。"
              },
              {
                id: 1214424,
                username: '白白bai',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjp45pmj30jz0qndkw.jpg',
                domain: 'sasdasdas',
                type: 2,
                read: 1,
                targetVectorId: 12121129432,
                targetVectorName: "只有经历过社会毒打才会明白"
              },
              {
                id: 75434234445353,
                username: 'IT\'S ME!',
                avatar: 'https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hln4xfe6glj30u011in2q.jpg',
                domain: 'ssds2323',
                type: 1,
                read: 1,
                targetVectorId: 12121129432,
                targetVectorName: "Nginx — 深入浅出"
              },
              {
                id: 12345511666,
                username: '在下查尔斯',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho2yc13on8j31401aojxy.jpg',
                domain: 'ssds2323',
                type: 3,
                read: 1,
                targetVectorId: 1212112922432,
                targetVectorName: "回复 @吾爱财经 :听了王妈的话，进了中盖，大不了我亏一个点走人也不去追"
              },
              {
                id: 754345353,
                username: '小小哥的 Blog',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho5g0wvoxoj30nq0to3zr.jpg',
                domain: 'ssds2323',
                type: 2,
                read: 0,
                targetVectorId: 1212112129432,
                targetVectorName: "当卡农Canon和EDM交响后&remix!你绝对想不到的震撼"
              }
            ]
            break;
          case 'newFans':
            this.newFansList = [
              {
                id: 121112,
                username: '安沐夕',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
                domain: 'asd34dsff',
                read: 0
              },
              {
                id: 2235663,
                username: 'HappyDragon1994',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho5g0vpdj3j30nq0tn0v3.jpg',
                domain: 'asd34dsasdff',
                read: 1
              },
              {
                id: 11553436,
                username: 'bravo1988',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1ho5g0tzacqj30nq0tojub.jpg',
                domain: '23dfsssgg55',
                read: 1
              },
              {
                id: 33442222,
                username: '咔咔',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
                domain: 'sasdasdas',
                read: 0
              }
            ]
            break;
          case 'systemMessage':
            this.systemMsgList = [
              {
                id: 1231211113123,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 0
              },
              {
                id: 12312313123,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 1
              },
              {
                id: 12312313123,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 1
              },
              {
                id: 12312313123,
                content: '叮！你获得了新的限时任务啦！ ',
                label: '查看任务',
                url: 'https://message.bilibili.com/?spm_id_from=333.1228.0.0#/system',
                read: 0
              },
              {
                id: 12312313123,
                content: '2022年的愿望，都来这里实现！ ',
                label: '点我马上参与>>> ',
                url: 'https://www.bilibili.com/blackboard/activity-DWi81m1Xbv.html',
                read: 0
              }
            ]
            break;
          case 'chatMessage':
            break;
          case 'ramblyJot':
            break;
        }
      }
    },
    watch: {
      'msgNotifyTypeActive'(newVal) {
        if (newVal === this.activeMenu) {
          return;
        }
        this.activeMenu = newVal;
        this.loadMsgNotify(newVal);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./css/message-notification.less";
</style>
