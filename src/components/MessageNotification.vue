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
        <div :class="['item', activeMenuForEq === 'CommentReply' ? 'active-menu' : '']">
          <span>回复我的</span>
          <span class="count">5</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('likesReceived')">
        <div :class="['item', activeMenuForEq === 'LikesReceived' ? 'active-menu' : '']">
          <span>收到的赞</span>
          <span class="count">1</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('newFans')">
        <div :class="['item', activeMenuForEq === 'NewFans' ? 'active-menu' : '']">
          <span>新增粉丝</span>
          <span class="count">10</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('systemMessage')">
        <div :class="['item', activeMenuForEq === 'SystemMessage' ? 'active-menu' : '']">
          <span>系统消息</span>
          <span class="count">23</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('chatMessage')">
        <div :class="['item', activeMenuForEq === 'ChatMessage' ? 'active-menu' : '']">
          <span>我的消息</span>
          <span class="count">99+</span>
        </div>
      </div>
      <div class="menu-item item-line">
        <div class="line"></div>
      </div>
      <div class="menu-item msg-setting" @click="routeNavigate('messageSetting')">
        <div :class="['item', activeMenuForEq === 'MessageSetting' ? 'active-menu' : '']">
          <span class="iconfont icon-preferences"></span>
          消息设置
        </div>
      </div>
    </div>
    <div class="msg-notify-body">
      <div class="module-tabs-wrapper">
        <div role="tablist" class="ant-tabs-nav">
          <div class="ant-tabs-nav-operations ant-tabs-nav-operations-hidden">
            <button type="button" class="ant-tabs-nav-more" tabindex="-1" aria-hidden="true" aria-haspopup="listbox"
                    aria-controls="rc-tabs-10-more-popup" id="rc-tabs-10-more" aria-expanded="false"
                    style="visibility: hidden; order: 1;"><span role="img" aria-label="ellipsis"
                                                                class="larkui-icon larkui-icon-ellipsis"><svg
              viewBox="64 64 896 896" focusable="false" data-icon="ellipsis" width="1em" height="1em"
              fill="currentColor" aria-hidden="true"><path
              d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg></span>
            </button>
          </div>
        </div>
        <div class="ant-tabs-content-holder">
          <div class="ant-tabs-content ant-tabs-content-left">
            <div role="tabpanel" tabindex="0" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active"
                 id="rc-tabs-10-panel-all" aria-labelledby="rc-tabs-10-tab-all">
              <div class="Nav-module_notificationsWrapper_Uflnw">
                <div class="ant-card larkui-card card-notifications larkui-card-with-list">
                  <div class="ant-card-head">
                    <div class="ant-card-head-wrapper">
                      <div class="ant-card-head-title"><span
                        class="Notifications-module_selectType_sfCA8 Notifications-module_leftSelect_j4iaj Notifications-module_active_Azaid">未读</span><span
                        class="Notifications-module_selectType_sfCA8">已读</span></div>
                      <div class="ant-card-extra">
                        <div>
                          <div class="Notifications-module_extraLinkWrapper_CV4OS"><a class="">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink"
                                 class="larkui-icon larkui-icon-swip-outlined Notifications-module_iconActionRead_55WNa">
                              <defs>
                                <path id="1124380380a" d="M0 0h16v16H0z"></path>
                              </defs>
                              <g fill="none" fill-rule="evenodd">
                                <mask id="1124380380b" fill="#fff">
                                  <use xlink:href="#1124380380a"></use>
                                </mask>
                                <path
                                  d="M8 1c1.07 0 1.938.867 1.938 1.938v2.874h1.413c.844 0 1.54.645 1.618 1.47l.007.147v.18l.003.29.004.391.004.32.006.407.005.289.007.275.008.304.008.245.008.232.01.253.01.202.007.127.008.12.01.143.007.107.008.101.007.072c.064.69.429 1.424 1.119 2.203a.75.75 0 0 1-.561 1.248h-9.03a2.125 2.125 0 0 1-2.119-2.293l.422-5.336a1.625 1.625 0 0 1 1.62-1.497h1.515V2.937c0-1.019.787-1.854 1.787-1.931Zm3.35 6.063H4.548a.375.375 0 0 0-.374.345l-.422 5.335a.875.875 0 0 0 .872.944H6.45c-.456-.69-.72-1.386-.785-2.085l-.01-.111-.006-.077-.01-.122-.008-.127-.006-.089-.008-.138-.007-.145-.008-.151-.006-.157a.625.625 0 1 1 1.249-.052l.006.145.009.183.007.13.007.126.005.08.008.114.005.073.009.104.008.099c.064.689.429 1.422 1.117 2.2h1.55c-.457-.69-.722-1.386-.786-2.085l-.01-.111-.006-.077-.01-.122-.008-.127-.006-.089-.008-.138-.007-.145-.008-.151-.006-.157a.625.625 0 1 1 1.249-.052l.006.145.009.183.007.13.007.126.005.08.008.114.005.073.009.104.008.099c.064.689.429 1.422 1.117 2.2h1.486l-.025-.038c-.431-.664-.686-1.333-.756-2.005l-.004-.042-.002-.026-.007-.077-.01-.138-.01-.117-.007-.122-.01-.163-.01-.207-.01-.22-.01-.236-.008-.248-.008-.263-.008-.324-.006-.292-.004-.254-.005-.319-.004-.388-.004-.408-.002-.364a.375.375 0 0 0-.375-.373ZM8.019 2.25H8a.687.687 0 0 0-.688.688v2.874h1.375V2.938a.688.688 0 0 0-.669-.687Z"
                                  fill="currentColor" fill-rule="nonzero" mask="url(#1124380380b)"></path>
                              </g>
                            </svg>
                            全部已读
                          </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ant-card-body">
                    <div
                      class="ant-list ant-list-split notification-list scrollbar-custom larkui-list larkui-list-justify-block"
                      loadmoretext="[object Object]">
                      <div class="ant-spin-nested-loading">
                        <div class="ant-spin-container">
                          <ul class="ant-list-items">
                            <li class="ant-list-item">
                              <div data-testid="notification-item"
                                   class="NotificationItem-module_item_T8nNI notification-item"><a href="/help"
                                                                                                   target="_blank"><img
                                data-testid="img-avatar"
                                src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                class="img" alt="语雀"
                                style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;"></a>
                                <div class="NotificationItem-module_content_XeuM0"><p>你的语雀会员即将到期，为了不影响功能使用，请及时续费。 <a
                                  class="context-module_upgrade_odBAm" href="/go/notification/144305902">立即续费</a>
                                </p>
                                  <time><span>2023-11-11 11:25</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div data-testid="notification-item"
                                   class="NotificationItem-module_item_T8nNI notification-item"><a href="/help"
                                                                                                   target="_blank"><img
                                data-testid="img-avatar"
                                src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                class="img" alt="语雀"
                                style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;"></a>
                                <div class="NotificationItem-module_content_XeuM0"><p>你的语雀会员将在 6
                                  天后到期，为了不影响功能使用，请及时续费。 <a class="context-module_upgrade_odBAm"
                                                           href="/go/notification/144043030">立即续费</a></p>
                                  <time><span>2023-11-05 12:13</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div
                                class="NotificationItem-module_item_T8nNI NotificationItem-module_itemSystem_5zHlV notification-item">
                                <div>
                                  <img data-testid="img-avatar"
                                       src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                       class="img" alt="语雀"
                                       style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;">
                                </div>
                                <div class="NotificationItem-module_content_XeuM0">
                                  <p>🎉恭喜你，被选为语雀幸运用户，获得 1 个月会员奖励，快去写更多文档解锁更多奖励吧！</p>
                                  <time data-testid="time">
                                    <span>2023-10-12 19:27</span>
                                  </time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div data-testid="notification-item"
                                   class="NotificationItem-module_item_T8nNI notification-item"><a href="/help"
                                                                                                   target="_blank"><img
                                data-testid="img-avatar"
                                src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                class="img" alt="语雀"
                                style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;"></a>
                                <div class="NotificationItem-module_content_XeuM0"><p>你的语雀会员即将到期，为了不影响功能使用，请及时续费。 <a
                                  class="context-module_upgrade_odBAm" href="/go/notification/141867889">立即续费</a>
                                </p>
                                  <time><span>2023-09-21 11:23</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div data-testid="notification-item"
                                   class="NotificationItem-module_item_T8nNI notification-item"><a href="/help"
                                                                                                   target="_blank"><img
                                data-testid="img-avatar"
                                src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                class="img" alt="语雀"
                                style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;"></a>
                                <div class="NotificationItem-module_content_XeuM0"><p>你的语雀会员将在 6
                                  天后到期，为了不影响功能使用，请及时续费。 <a class="context-module_upgrade_odBAm"
                                                           href="/go/notification/141739439">立即续费</a></p>
                                  <time><span>2023-09-15 11:06</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div
                                class="NotificationItem-module_item_T8nNI NotificationItem-module_itemSystem_5zHlV notification-item">
                                <div><img data-testid="img-avatar"
                                          src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                          class="img" alt="语雀"
                                          style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;">
                                </div>
                                <div class="NotificationItem-module_content_XeuM0">
                                  <h2>🎉恭喜你获得 7 天会员奖励</h2>
                                  <ul>
                                    <li>50 篇文稿数成就达成，奖励你 7 天的语雀会员。会员享有以下权益，快去体验吧！(有效期至2023-09-21)</li>
                                    <li><br></li>
                                    <li>1、无限文稿和知识库数</li>
                                    <li>2、更多格式、更大附件上传</li>
                                    <li>3、安全等知识库高级功能</li>
                                    <li>4、智能翻译等基础特色功能</li>
                                    <li>5、互联网公开</li>
                                    <li>6、公开我的花园</li>
                                    <li><a class="credible-url"
                                           href="https://www.yuque.com/yuque/ng1qth/member-privilege">点此查看会员福利介绍</a>
                                    </li>
                                    <li><br></li>
                                    <li>感谢你886天来在语雀上的辛勤耕耘，期待你在语雀上创造出更多的知识财富！</li>
                                    <li><br></li>
                                    <li>语雀团队</li>
                                    <li>2023-09-14</li>
                                  </ul>
                                  <time data-testid="time"><span>2023-09-14 10:33</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div data-testid="notification-item"
                                   class="NotificationItem-module_item_T8nNI notification-item"><a href="/help"
                                                                                                   target="_blank"><img
                                data-testid="img-avatar"
                                src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                class="img" alt="语雀"
                                style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;"></a>
                                <div class="NotificationItem-module_content_XeuM0"><p>你的语雀会员即将到期，为了不影响功能使用，请及时续费。 <a
                                  class="context-module_upgrade_odBAm" href="/go/notification/136486442">立即续费</a>
                                </p>
                                  <time><span>2023-05-19 11:11</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div data-testid="notification-item"
                                   class="NotificationItem-module_item_T8nNI notification-item"><a href="/help"
                                                                                                   target="_blank"><img
                                data-testid="img-avatar"
                                src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                class="img" alt="语雀"
                                style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;"></a>
                                <div class="NotificationItem-module_content_XeuM0"><p>你的语雀会员将在 6
                                  天后到期，为了不影响功能使用，请及时续费。 <a class="context-module_upgrade_odBAm"
                                                           href="/go/notification/136331922">立即续费</a></p>
                                  <time><span>2023-05-13 11:26</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div
                                class="NotificationItem-module_item_T8nNI NotificationItem-module_itemSystem_5zHlV notification-item">
                                <div><img data-testid="img-avatar"
                                          src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                          class="img" alt="语雀"
                                          style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;">
                                </div>
                                <div class="NotificationItem-module_content_XeuM0">
                                  <h2>🎉恭喜你获得 7 天会员奖励</h2>
                                  <ul>
                                    <li>15 篇文稿数成就达成，奖励你 7 天的语雀会员。会员享有以下权益，快去体验吧！(有效期至2023-05-19)</li>
                                    <li><br></li>
                                    <li>1、无限文稿和知识库数</li>
                                    <li>2、更多格式、更大附件上传</li>
                                    <li>3、安全等知识库高级功能</li>
                                    <li>4、智能翻译等基础特色功能</li>
                                    <li>5、互联网公开</li>
                                    <li>6、公开我的花园</li>
                                    <li><a class="credible-url"
                                           href="https://www.yuque.com/yuque/ng1qth/member-privilege">点此查看会员福利介绍</a>
                                    </li>
                                    <li><br></li>
                                    <li>感谢你761天来在语雀上的辛勤耕耘，期待你在语雀上创造出更多的知识财富！</li>
                                    <li><br></li>
                                    <li>语雀团队</li>
                                    <li>2023-05-12</li>
                                  </ul>
                                  <time data-testid="time"><span>2023-05-12 12:54</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div
                                class="NotificationItem-module_item_T8nNI NotificationItem-module_itemSystem_5zHlV notification-item">
                                <div><img data-testid="img-avatar"
                                          src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                          class="img" alt="语雀"
                                          style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;">
                                </div>
                                <div class="NotificationItem-module_content_XeuM0">
                                  <h3>工作台「快捷入口」迁移告知</h3>
                                  <br>
                                  亲爱的语雀用户，为提供更清爽的使用体验，原工作台「快捷入口」模块已迁移至「收藏」
                                  <br>
                                  详见：收藏 - 快捷入口
                                  <div style="margin:10px 0 10px 0;"><img
                                    style="border: 1px solid #d9d9d9;border-radius: 4px;margin: 10px 0;"
                                    src="https://app.nlark.com/yuque-desktop/source/quick_link_tips.jpg"
                                    width="60%"></div>
                                  <time data-testid="time"><span>2022-09-10 00:18</span></time>
                                </div>
                              </div>
                            </li>
                            <li class="ant-list-item">
                              <div
                                class="NotificationItem-module_item_T8nNI NotificationItem-module_itemSystem_5zHlV notification-item">
                                <div><img data-testid="img-avatar"
                                          src="https://cdn.nlark.com/yuque/0/2022/png/303152/1665994257081-avatar/dcb74862-1409-4691-b9ce-8173b4f6e037.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng"
                                          class="img" alt="语雀"
                                          style="width: 32px; min-width: 32px; height: 32px; border-radius: 16px;">
                                </div>
                                <div class="NotificationItem-module_content_XeuM0">
                                  <div class="lake-content" typography="classic">
                                    <h3 id="9tZq8"
                                        style="text-align: left">
                                      <span class="ne-text">知识清单停止运营公告</span>
                                    </h3>
                                    <p id="a53fd32646c62e180be7e754ef5ae51b" class="ne-p"><br></p>
                                    <p id="c76762027b394cf492c466c349bb98c5" class="ne-p"><span class="ne-text">尊敬的知识清单用户：</span>
                                    </p>
                                    <p id="329266194949704ceec5c123772ef864" class="ne-p"><span class="ne-text">很抱歉地向您告知，因业务发展方向调整，知识清单将于近期停止运营并下线，请及时保存清单中的重要内容。</span>
                                    </p>
                                    <p id="e40a1746fe034690bff21aa0416fd18a" class="ne-p"><br></p>
                                    <p id="8832474f5d01389b6f3826928b6f9775" class="ne-p"><span class="ne-text">具体安排如下：</span>
                                    </p>
                                    <ol class="ne-ol">
                                      <li id="a5f5566655d9f7aa3d175ce72b8f12b7"><span class="ne-text">关闭创建清单功能：2022年2月10日</span>
                                      </li>
                                      <li id="d5d09f788147832e602afceda94c5f11"><span class="ne-text">关闭清单入口：2022年2月17日</span>
                                      </li>
                                    </ol>
                                    <ol start="3" class="ne-ol">
                                      <li id="d00453bba3abb75c4c8ef05b505f03e5"><span class="ne-text">清单停止运营：2022年2月17日</span>
                                      </li>
                                    </ol>
                                    <p id="34b732b2e15206eac91112ca7e3048b7" class="ne-p"><br></p>
                                    <p id="21342fae02b4c4ff7c06420e7a57718d" class="ne-p"><span class="ne-text">对此给您造成的不便，我们深表歉意，并再次衷心感谢您一直以来的陪伴。同时再次提醒，请尽快将您在知识清单中的重要内容进行备份保存，过期将无法追回。</span>
                                    </p>
                                    <p id="02926455070dd1330568b9f4e88edd85" class="ne-p"><span class="ne-text">知识清单下线后，将不再保存用户相关资料及数据。</span>
                                    </p>
                                    <p id="u14f62361" class="ne-p"><span
                                      class="ne-text">如有任何问题，请联系 support@yuque.com</span></p>
                                    <p id="d5d65ef6bc430bbd22132b8630148728" class="ne-p"><span
                                      class="ne-text"></span></p>
                                    <p id="3f260c16752938f9ccaa5148639c797e" class="ne-p" style="text-align: right">
                                      <span class="ne-text">语雀团队</span></p>
                                    <p id="a24bfcf210d5e0772773b396e74782db" class="ne-p" style="text-align: right">
                                      <span class="ne-text">2022年2月10日</span>
                                    </p>
                                  </div>
                                  <time data-testid="time"><span>2022-02-10 20:34</span></time>
                                </div>
                              </div>
                            </li></ul></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane"
                 id="rc-tabs-10-panel-follow" aria-labelledby="rc-tabs-10-tab-follow" style="display: none;"></div>
            <div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane" id="rc-tabs-10-panel-like"
                 aria-labelledby="rc-tabs-10-tab-like" style="display: none;"></div>
            <div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane"
                 id="rc-tabs-10-panel-mention" aria-labelledby="rc-tabs-10-tab-mention" style="display: none;"></div>
            <div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane"
                 id="rc-tabs-10-panel-action" aria-labelledby="rc-tabs-10-tab-action" style="display: none;"></div>
            <div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane"
                 id="rc-tabs-10-panel-system" aria-labelledby="rc-tabs-10-tab-system" style="display: none;"></div>
            <div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane"
                 id="rc-tabs-10-panel-normal" aria-labelledby="rc-tabs-10-tab-normal" style="display: none;"></div>
          </div>
        </div>
      </div>
      <a class="Nav-module_setting_M8Bx8 larkui-tooltip" target="_blank" href="/settings/notifications">
        <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
             class="larkui-icon larkui-icon-setting">
          <path
            d="m107.862 18.747-.657.12-.338.066c-6.873 1.403-12.248 6.823-13.523 13.754L90.76 46.595l-.095.043a89.598 89.598 0 0 0-14.256 8.116l-.992.701-13.428-4.751c-6.647-2.33-14.024-.428-18.668 4.823l-.601.696c-8.465 9.957-15.019 21.135-19.518 33.263l-.39 1.068-.286.825a17.223 17.223 0 0 0 5.122 18.57l10.903 9.27-.084.904a90.683 90.683 0 0 0-.34 7.871l.006 1.135a90.53 90.53 0 0 0 .334 6.757l.083.884-10.868 9.24c-5.366 4.551-7.392 11.911-5.164 18.574l.333.959a110.206 110.206 0 0 0 19.838 34.185l.438.51.245.28c4.623 5.177 11.948 7.086 18.566 4.784l13.477-4.77.117.085a89.173 89.173 0 0 0 14.174 8.3l1.056.485 2.585 13.916c1.294 7.033 6.834 12.52 13.877 13.806l.592.109a111.934 111.934 0 0 0 39.578.008l.654-.12.355-.07c6.856-1.399 12.231-6.82 13.506-13.75l2.559-13.801.124-.055a89.147 89.147 0 0 0 15.264-8.782l.116-.086 13.29 4.707c6.649 2.33 14.026.427 18.67-4.823l.6-.696c8.466-9.957 15.02-21.135 19.519-33.263l.39-1.068.268-.77c2.272-6.626.238-13.996-5.104-18.58l-10.721-9.129.098-1.03c.231-2.632.348-5.273.348-7.908l-.007-1.13a90.43 90.43 0 0 0-.341-6.78l-.098-1.03 10.692-9.104c5.36-4.546 7.386-11.906 5.159-18.569l-.331-.953a109.95 109.95 0 0 0-19.84-34.191l-.439-.51-.245-.28c-4.622-5.177-11.948-7.086-18.565-4.784l-13.351 4.726-.137-.098a89.752 89.752 0 0 0-14.254-8.32l-1.105-.505-2.562-13.816c-1.294-7.036-6.834-12.524-13.877-13.809l-.593-.109c-13.008-2.338-26.61-2.338-39.574-.008Zm34.054 19.358.677.11 4.234 22.829 5.296 1.982a69.844 69.844 0 0 1 19.748 11.366l4.359 3.56 21.917-7.761.493.597a89.82 89.82 0 0 1 14.255 24.58l.239.634-17.649 15.029.913 5.57a70.76 70.76 0 0 1 .932 11.416c0 3.807-.314 7.64-.932 11.414l-.913 5.571 17.635 15.017-.223.593a90.385 90.385 0 0 1-14.29 24.623l-.462.561-21.928-7.764-4.361 3.577a69.308 69.308 0 0 1-19.733 11.353l-5.296 1.982-4.235 22.83-.9.145a92.146 92.146 0 0 1-14.066 1.08l-1.087-.006a92.191 92.191 0 0 1-13.001-1.08l-.88-.141-4.256-22.917-5.292-1.982c-7.057-2.643-13.646-6.453-19.583-11.314l-4.36-3.57-22.062 7.808-.453-.55a90.097 90.097 0 0 1-14.315-24.686l-.218-.574 17.843-15.172-.93-5.59a68.609 68.609 0 0 1-.905-11.231c0-3.815.303-7.595.907-11.24l.924-5.585L42.119 96l.238-.624a90.385 90.385 0 0 1 14.29-24.623l.461-.562 22.06 7.808 4.36-3.57a69.726 69.726 0 0 1 19.605-11.323l5.273-1.989 4.254-22.903.715-.115a92.841 92.841 0 0 1 28.542.006h-.001ZM128 90c-20.987 0-38 17.013-38 38s17.013 38 38 38 38-17.013 38-38-17.013-38-38-38Zm0 20c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18Z"
            fill="currentColor" fill-rule="nonzero"></path>
        </svg>
      </a></div>
  </div>
</template>

<script>
    export default {
        name: "MessageNotification",
        data() {
            return {}
        }
    }
</script>

<style scoped type="less">
  @import "./css/message-notification.less";
</style>
