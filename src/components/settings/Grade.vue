<template>
  <div class="layout-module_grade" ref="tooltipContainer">
    <div id="main-right-content" class="layout-module_MainContent">
      <div class="layout-module_MainContentChildren">
        <div class="main-container grade-incentive">
          <div class="layout-module_level">
            <h1 class="setting-title">经验等级</h1>
            <div class="level-module_nickName">
              <span class="nick-name">布衣草人</span>
            </div>
            <div class="level-module_experienceBar">
              <span class="experience-bar-body">
                  <div class="progressBar">
                    <span class="experience-bar-level">LV5</span>
                    <span data-v-852cd7a8="" class="experience-bar-progress">
                      进度条
                      <span data-v-852cd7a8="" class="experience-bar-upgo" style="width: 55.41%;"></span>
                    </span>
                  </div>
                  <span class="experience-bar-level-number">
                    <i class="now-num">15947</i>
                    <i class="num-icon">/</i>
                    <i class="max-num">28800</i>
                  </span>
              </span>
            </div>
          </div>
          <div class="layout-module_dailyReward">
            <h1 class="setting-title">每日奖励</h1>
            <div class="dailyReward-module_exp">
                <div class="daily-exp-item">
                  <div class="daily-exp-icon position-ok"></div>
                  <p class="daily-exp-info">每日登录</p>
                  <p class="daily-exp-getexp">5经验值到手</p>
                  <div class="h-line"></div>
                </div>
                <div class="daily-exp-item">
                  <div class="daily-exp-icon position-ok"></div>
                  <p class="daily-exp-info">每日浏览文章</p>
                  <p class="daily-exp-getexp">5经验值到手</p>
                  <div class="h-line"></div>
                </div>
                <div class="daily-exp-item">
                  <div class="daily-exp-icon position-rest">
                    <i class="daily-exp-i">10</i>
                    <i class="daily-exp-i-2">EXP</i>
                  </div>
                  <p class="daily-exp-info">每日写作</p>
                  <p class="daily-exp-none">已获得0/10</p>
                </div>
              </div>
          </div>
          <div class="layout-module_chargeIncentive">
            <h1 class="setting-title">充电激励</h1>
            <div class="chargeIncentive-module_wrapper" >
              <img :src="require('@/assets/img/charge.jpg')" class="charge-incentive-left-img">
              <div class="charge-incentive-content">
                <p class="charge-incentive-title">
                  已获得
                  <span class="charge-incentive-count">142</span>
                  节电池
                </p>
                <p class="charge-incentive-tip">
                  电池可通过收获文档点赞等方式获得，积累电池可兑换相应权益
                  <a href="https://www.yuque.com/yuque/cdgcvd/gqcepg" target="_blank">了解详情</a>
                </p>
              </div>
            </div>
          </div>
          <div class="layout-module_acquireRule">
            <h1 class="setting-subtitle">获取规则</h1>
            <ul class="Rules-module_wrapper_tdpLv" data-testid="grains-rules">
              <li class="Rules-module_itemWrapper_6+BH6">
                <div class="Rules-module_item_Y+nBS">
                  <span class="Rules-module_text_8fnjy">创建 1 篇文档</span>
                  <span class="Rules-module_count_Va8WH">
                      稻谷 +3 <span class="iconfont icon-battery"/>
                    </span>
                </div>
              </li>
              <li class="Rules-module_itemWrapper_6+BH6">
                <div class="Rules-module_item_Y+nBS">
                  <span class="Rules-module_text_8fnjy">创建 1 篇小记</span>
                  <span class="Rules-module_count_Va8WH">
                    稻谷 +3 <span class="iconfont icon-battery"/>
                  </span>
                </div>
              </li>
              <li class="Rules-module_itemWrapper_6+BH6">
                <div class="Rules-module_item_Y+nBS">
                  <span class="Rules-module_text_8fnjy">文档获得 1 个赞</span>
                  <span class="Rules-module_count_Va8WH">
                    稻谷 +3 <span class="iconfont icon-battery"/>
                  </span>
                </div>
              </li>
              <li class="Rules-module_itemWrapper_6+BH6">
                <div class="Rules-module_item_Y+nBS">
                  <span class="Rules-module_text_8fnjy">评论 1 篇文档</span>
                  <span class="Rules-module_count_Va8WH">
                    稻谷 +3 <span class="iconfont icon-battery"/>
                  </span>
                </div>
              </li>
              <li class="Rules-module_itemWrapper_6+BH6">
                <div class="Rules-module_item_Y+nBS">
                  <span class="Rules-module_text_8fnjy">关注 1 个用户</span>
                  <span class="Rules-module_count_Va8WH">
                    稻谷 +3 <span class="iconfont icon-battery"/>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="ayout-module_pointsHistory">
            <h1 class="setting-subtitle">电池积分记录</h1>
            <div class="ant-list-header">
              <div class="ant-row" style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;">操作</div>
                <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">时间</div>
                <div class="ant-col ant-col-3 List-module_tr_v6rRi"
                     style="padding-left: 15px; padding-right: 15px;">
                  稻谷数
                </div>
              </div>
            </div>
            <div class="ant-spin-nested-loading">
              <div class="ant-spin-container">
                <ul class="ant-list-items">
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_operate_V4d-t">
                          创建了文档&nbsp;
                          <span class="List-module_content_BwX8A">
                                <span>
                                  《
                                  <a href="/go/doc/135716630" target="_blank" class="doc-link"
                                     data-desktoptarget="_blank">
                                    <span class="doc-title" title="我的标题呢">我的标题呢</span>
                                  </a>
                                  》
                                </span>
                              </span>
                        </p>
                      </div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">
                        2023-08-09 09:29
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">关注了&nbsp;<span class="List-module_content_BwX8A"><a
                        href="/lzy8684" target="_blank">小黑bu惑</a></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2023-07-11
                        11:57
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+2
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">关注了&nbsp;<span class="List-module_content_BwX8A"><a
                        href="/kanding" target="_blank">安木夕</a></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2023-07-11
                        11:53
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+2
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/124799387" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="canal数据同步">canal数据同步</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2023-05-15
                        15:53
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/124533088" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="es安装启动问题">es安装启动问题</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2023-05-12
                        12:54
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/116544471" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="常用SQL语法">常用SQL语法</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2023-03-03
                        10:24
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/78797444" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="3. linux系统软件安装">3. linux系统软件安装</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-05-27
                        18:34
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/74954344" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="Redission">Redission</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-04-25
                        13:11
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <div></div>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">评论了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/15278227" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="浅谈Redis分布式锁(上)">浅谈Redis分布式锁(上)</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-03-25
                        17:41
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+2
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/69556795" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="决策指挥大屏系统V4.30数据同步">决策指挥大屏系统V4.30数据同步</span></a>》</span></span></p>
                      </div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-03-15
                        18:19
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/69377465" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="2. Spring中bean的初始化过程以及在Springboot中定制化的执行顺序">2. Spring中bean的初始化过程以及在Springboot中定制化的执行顺序</span></a>》</span></span>
                      </p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-03-14
                        15:49
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/66590583" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="常用注解">常用注解</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-02-14
                        10:05
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/66590329" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="1. 常用注解">1. 常用注解</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-02-14
                        10:04
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/66582814" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="常用SQL语法">常用SQL语法</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-02-14
                        08:57
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">关注了&nbsp;<span class="List-module_content_BwX8A"><a
                        href="/u30882" target="_blank">咔咔</a></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-01-05
                        21:55
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+2
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">关注了&nbsp;<span class="List-module_content_BwX8A"><a
                        href="/elevenyang" target="_blank">Eleven幺幺</a></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2022-01-05
                        21:50
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+2
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/61374673" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="Vue3">Vue3</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-11-28
                        01:30
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/61105398" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="疑难杂症">疑难杂症</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-11-24
                        09:21
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <div></div>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/60921308" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="DOM元素操作">DOM元素操作</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-11-21
                        23:38
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/60760285" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="Vue脚手架">Vue脚手架</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-11-18
                        23:40
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/60675174" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="Vue组件">Vue组件</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-11-18
                        00:43
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/60378324" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="Vue进阶">Vue进阶</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-11-14
                        18:07
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/57332796" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="初识Vue">初识Vue</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-11-12
                        22:22
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/53621195" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="SpringTask定时任务">SpringTask定时任务</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-09-17
                        11:39
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <div></div>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/53374057" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="杂碎知识">杂碎知识</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-09-14
                        15:47
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/53333811" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="elasticsearch的基本使用">elasticsearch的基本使用</span></a>》</span></span>
                      </p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-09-14
                        09:41
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/52886194" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="BitMap算法">BitMap算法</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-09-08
                        11:07
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/52787027" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="常见异常栈信息">常见异常栈信息</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-09-07
                        09:11
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <div></div>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/49941335" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="1. 获取父子结构树">1. 获取父子结构树</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-07-28
                        15:39
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/49854368" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="2. 开发环境安装配置">2. 开发环境安装配置</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-07-27
                        14:15
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="ant-list-item">
                    <div class="ant-row"
                         style="margin-left: -15px; margin-right: -15px; width: 100%; row-gap: 0px;">
                      <div class="ant-col ant-col-14" style="padding-left: 15px; padding-right: 15px;"><p
                        class="List-module_operate_V4d-t">创建了文档&nbsp;<span class="List-module_content_BwX8A"><span>《<a
                        href="/go/doc/49790005" target="_blank" class="doc-link" data-desktoptarget="_blank"><span
                        class="doc-title" title="1. Linux系统">1. Linux系统</span></a>》</span></span></p></div>
                      <div class="ant-col ant-col-6" style="padding-left: 15px; padding-right: 15px;">2021-07-26
                        15:43
                      </div>
                      <div class="ant-col ant-col-3" style="padding-left: 15px; padding-right: 15px;">
                        <p class="List-module_tr_v6rRi">+3
                          <svg width="1em" height="1em" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"
                               class="larkui-icon larkui-icon-grain icon-svg List-module_grainIcon_oGXYS index-module_size_wVASz"
                               data-name="Grain" style="width: 16px; min-width: 16px; height: 16px;">
                            <path
                              d="M4.73 7.198s-.912 2.169-2.367 4.931c-.637 1.212-1.396 3.38-1.267 3.772.128.392.457-.476.592-.991.137-.512.989-2.783 1.33-3.41.534-.991 1.23-2.788 1.711-4.302ZM.591 6.335S-.486 8.952.267 10.5c.754 1.547 1.384 1.945 1.598 1.654.213-.292.993-1.64.491-2.383-.5-.748-1.838-2.65-1.764-3.435ZM1.77 3.297s-1.147 1.89-.109 3.99c1.039 2.1 1.763 1.838 1.763 1.838s.798-1.412.31-2.31c-.489-.898-1.918-2.667-1.964-3.518Zm1.05-2.06s-.594 1.803.052 3.438c.645 1.634 1.824 1.857 2.013 1.869.19.012.785-1.038.14-2.286S3.255 2.304 2.818 1.236Zm6.63.75s.2 2.382-1.704 3.858c-1.263.977-1.956.863-2.067.836l-.016-.004s-.494-1.353.836-2.507c1.33-1.155 1.838-.572 2.95-2.184ZM6.41 0c.103.723.181 1.517.236 2.382.055.866-.313 1.57-1.104 2.112-.507-.67-.675-1.408-.503-2.212C5.209 1.48 5.667.718 6.41 0ZM8.63 5.72s-1.04 1.118-2.14 1.54c-1.098.425-1.949 1.147-2.05 2.605 0 0 .467.7 1.8-.262 1.332-.962 2.25-2.52 2.39-3.883Zm-5.804 6.6s.756.485 2.334-.019c1.582-.495 2.827-3.078 2.827-3.078-1.336.832-2.102.695-3.534 1.118-1.432.422-1.627 1.98-1.627 1.98Z"
                              fill="#FFC53D" fill-rule="nonzero"></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
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
    name: 'Grade',
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  @import '../css/setting/grade.less';
</style>
