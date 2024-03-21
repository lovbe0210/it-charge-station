<template>
  <div class="layout-module_collection">
    <div class="collect-home-header">
      <h2 class="title">收藏</h2>
      <hr class="separator-line">
      <div class="operation">
        <Input class="search" search placeholder="搜索标题关键词"/>
        <div class="action">
          <Dropdown placement="bottom-end" @on-click="updateNoteOrderType">
            <a href="javascript:void(0)">
              <div class="icon-box">
                <span class="iconfont filter"></span>
              </div>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="updateTime">
                <div style="min-width: 20px">
                  <span class="iconfont true" v-if="orderType === 'updateTime'"></span>
                </div>
                全部
              </DropdownItem>
              <DropdownItem name="updateTime">
                <div style="min-width: 20px">
                  <span class="iconfont true" v-if="orderType === 'updateTime'"></span>
                </div>
                文档
              </DropdownItem>
              <DropdownItem name="createTime">
                <div style="min-width: 20px">
                  <span class="iconfont true" v-if="orderType === 'createTime'"></span>
                </div>
                专题
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>

    <div class="mark-module_container">
      <div class="marks-group">
        <div class="mark-item">
          <div class="mark-name">全部收藏
            <div class="Marks-module_asideAdd_fUEYI" id="group-add" data-testid="group-add">
              +号
            </div>
          </div>
          <div class="Marks-module_actionCount_TuLrw"><span class="Marks-module_countNumber_EzeSk">7</span> 条内容</div>
        </div>
        <div class="Marks-module_collectionWrap_qZnDO">
          <div class="Marks-module_name_ZaPov"><span class="ellipsis-wrapper larkui-tooltip"><span
            class="ellipsis-text">快捷入口</span></span>
            <div class="ant-dropdown-trigger more-collection-operation larkui-dropdown-trigger"
                 data-testid="more-collection-operation">
              <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                   class="larkui-icon larkui-icon-new-ellipsis" style="font-size: 18px;">
                <path
                  d="M227.008 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20ZM148 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Zm-78.992 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Z"
                  fill="currentColor" fill-rule="nonzero"></path>
              </svg>
            </div>
          </div>
          <div class="Marks-module_actionCount_TuLrw"><span class="Marks-module_countNumber_EzeSk">1</span> 条内容</div>
        </div>
      </div>
      <div class="marks-list">
        <div class="ant-card ant-card-bordered larkui-card Marks-module_card_0iKIU">
          <div class="ant-card-body">
            <div class="ant-table-wrapper larkui-table">
              <div class="ant-spin-nested-loading">
                <div class="ant-spin-container">
                  <div class="ant-table">
                    <div class="ant-table-container">
                      <div class="ant-table-content">
                        <table style="table-layout: auto;">
                          <colgroup></colgroup>
                          <thead class="ant-table-thead">
                          <tr>
                            <th class="ant-table-cell Marks-module_columnsTitle_fsKl9 ant-table-column-has-sorters">
                              <div class="ant-table-column-sorters"><span>名称</span><span
                                class="ant-table-column-sorter ant-table-column-sorter-full"><span
                                class="ant-table-column-sorter-inner"><span role="img" aria-label="caret-up"
                                                                            class="larkui-icon larkui-icon-caret-up ant-table-column-sorter-up"><svg
                                viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em"
                                fill="currentColor" aria-hidden="true"><path
                                d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg></span><span
                                role="img" aria-label="caret-down"
                                class="larkui-icon larkui-icon-caret-down ant-table-column-sorter-down"><svg
                                viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em"
                                height="1em" fill="currentColor" aria-hidden="true"><path
                                d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg></span></span></span>
                              </div>
                            </th>
                            <th class="ant-table-cell Marks-module_columnsBelong_yTv94">归属</th>
                            <th class="ant-table-cell Marks-module_columnsTime_MI-z- ant-table-column-has-sorters">
                              <div class="ant-table-column-sorters"><span>收藏时间</span><span
                                class="ant-table-column-sorter ant-table-column-sorter-full"><span
                                class="ant-table-column-sorter-inner"><span role="img" aria-label="caret-up"
                                                                            class="larkui-icon larkui-icon-caret-up ant-table-column-sorter-up"><svg
                                viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em"
                                fill="currentColor" aria-hidden="true"><path
                                d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg></span><span
                                role="img" aria-label="caret-down"
                                class="larkui-icon larkui-icon-caret-down ant-table-column-sorter-down"><svg
                                viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em"
                                height="1em" fill="currentColor" aria-hidden="true"><path
                                d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg></span></span></span>
                              </div>
                            </th>
                            <th class="ant-table-cell Marks-module_columnsAction_Kz7zL"></th>
                          </tr>
                          </thead>
                          <tbody class="ant-table-tbody">
                          <tr data-row-key="114138689136" class="ant-table-row ant-table-row-level-0">
                            <td class="ant-table-cell Marks-module_columnsTitle_fsKl9"><a href="/go/doc/134645688"
                                                                                          target="_blank"
                                                                                          data-aspm-param="index=0^type=Doc">
                              <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                   class="larkui-icon larkui-icon-doc-type-board icon-svg Marks-module_titleIcon_hRflE index-module_size_wVASz"
                                   data-name="DocTypeBoard" style="width: 24px; min-width: 24px; height: 24px;">
                                <g fill="none" fill-rule="evenodd">
                                  <path
                                    d="M4.75 1.267h10.5a2 2 0 0 1 2 2v13.5a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2v-13.5a2 2 0 0 1 2-2Z"
                                    stroke="#7D6CAB" stroke-width="0.976" fill="#FFF" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                  <path
                                    d="M11.6 4.5H7.1a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4.5a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-4.5 1h4.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H7.1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"
                                    fill="#AD9DDA" fill-rule="nonzero"></path>
                                  <path d="M12 8.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" fill="#9177D9"
                                        fill-rule="nonzero"></path>
                                </g>
                              </svg>
                              系统架构图</a></td>
                            <td class="ant-table-cell Marks-module_columnsBelong_yTv94"><span><a
                              href="/u8030816">Andy</a><span class="Marks-module_split_FTFNn">/</span><a
                              href="/u8030816/tr436o">捷停车基础业务培训</a></span></td>
                            <td class="ant-table-cell Marks-module_columnsTime_MI-z-"><span>2023-08-16 17:30</span></td>
                            <td class="ant-table-cell Marks-module_columnsAction_Kz7zL">
                              <div class="Marks-module_collectionOperation_IIbvc">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     data-testid="dashboard-collection-mark"
                                     class="larkui-icon larkui-icon-nav-star2 larkui-popover-trigger"
                                     style="color: rgb(250, 173, 20); font-size: 18px;">
                                  <path
                                    d="M134.643 17.23a16.011 16.011 0 0 1 8.649 8.643l23.705 56.981c.29.687.938 1.156 1.681 1.217L225.362 89a16.015 16.015 0 0 1 13.733 10.643 15.999 15.999 0 0 1-4.06 16.887l-42.652 40.72a2 2 0 0 0-.56 1.92l14.335 60.087a16 16 0 0 1-6.16 16.671 16.026 16.026 0 0 1-17.77.711l-52.695-32.172a2.003 2.003 0 0 0-2.082 0L74.756 236.64a16.026 16.026 0 0 1-17.784-.696 16 16 0 0 1-6.161-16.686l14.335-60.087a2 2 0 0 0-.56-1.92l-42.637-40.736a15.999 15.999 0 0 1-4.043-16.875A16.015 16.015 0 0 1 31.623 89l56.7-4.93a2.002 2.002 0 0 0 1.665-1.216l23.705-56.981a16.011 16.011 0 0 1 8.682-8.662 16.027 16.027 0 0 1 12.268.018Z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>
                          <tr data-row-key="113862666594" class="ant-table-row ant-table-row-level-0">
                            <td class="ant-table-cell Marks-module_columnsTitle_fsKl9"><a href="/go/book/25764013"
                                                                                          target="_blank"
                                                                                          data-aspm-param="index=1^type=Book">
                              <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                   class="larkui-icon larkui-icon-book-type-notes icon-svg Marks-module_titleIcon_hRflE index-module_size_wVASz"
                                   data-name="BookTypeNotes"
                                   style="width: 24px; height: 24px; margin-right: 6px; min-width: 24px;">
                                <g stroke="#388D68" stroke-width="0.976" fill="none" fill-rule="evenodd"
                                   stroke-linejoin="round">
                                  <path
                                    d="M2.031 2.4H8a2 2 0 0 1 2 2v13.504H8.358a.2.2 0 0 1-.125-.044l-1.147-.913a.2.2 0 0 0-.125-.043h-4.93a1.5 1.5 0 0 1-1.5-1.5V3.9a1.5 1.5 0 0 1 1.5-1.5Z"
                                    fill="#75CA97"></path>
                                  <path
                                    d="M17.969 2.4H12a2 2 0 0 0-2 2v13.504h1.642a.2.2 0 0 0 .125-.044l1.147-.913a.2.2 0 0 1 .125-.043h4.93a1.5 1.5 0 0 0 1.5-1.5V3.9a1.5 1.5 0 0 0-1.5-1.5Z"
                                    fill="#BBEBC4" stroke-linecap="round"></path>
                                </g>
                              </svg>
                              Java开发技术手册</a></td>
                            <td class="ant-table-cell Marks-module_columnsBelong_yTv94"><span><a
                              href="/lzy8684">小黑bu惑</a></span></td>
                            <td class="ant-table-cell Marks-module_columnsTime_MI-z-"><span>2023-08-14 15:36</span></td>
                            <td class="ant-table-cell Marks-module_columnsAction_Kz7zL">
                              <div class="Marks-module_collectionOperation_IIbvc">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     data-testid="dashboard-collection-mark"
                                     class="larkui-icon larkui-icon-nav-star2 larkui-popover-trigger"
                                     style="color: rgb(250, 173, 20); font-size: 18px;">
                                  <path
                                    d="M134.643 17.23a16.011 16.011 0 0 1 8.649 8.643l23.705 56.981c.29.687.938 1.156 1.681 1.217L225.362 89a16.015 16.015 0 0 1 13.733 10.643 15.999 15.999 0 0 1-4.06 16.887l-42.652 40.72a2 2 0 0 0-.56 1.92l14.335 60.087a16 16 0 0 1-6.16 16.671 16.026 16.026 0 0 1-17.77.711l-52.695-32.172a2.003 2.003 0 0 0-2.082 0L74.756 236.64a16.026 16.026 0 0 1-17.784-.696 16 16 0 0 1-6.161-16.686l14.335-60.087a2 2 0 0 0-.56-1.92l-42.637-40.736a15.999 15.999 0 0 1-4.043-16.875A16.015 16.015 0 0 1 31.623 89l56.7-4.93a2.002 2.002 0 0 0 1.665-1.216l23.705-56.981a16.011 16.011 0 0 1 8.682-8.662 16.027 16.027 0 0 1 12.268.018Z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>
                          <tr data-row-key="111015377907" class="ant-table-row ant-table-row-level-0">
                            <td class="ant-table-cell Marks-module_columnsTitle_fsKl9"><a href="/go/doc/96203811"
                                                                                          target="_blank"
                                                                                          data-aspm-param="index=2^type=Doc">
                              <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                   class="larkui-icon larkui-icon-doc-type-default icon-svg Marks-module_titleIcon_hRflE index-module_size_wVASz"
                                   data-name="DocTypeDefault" style="width: 24px; min-width: 24px; height: 24px;">
                                <g fill="none" fill-rule="evenodd">
                                  <path
                                    d="M4.75 1.267h10.5a2 2 0 0 1 2 2v13.5a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2v-13.5a2 2 0 0 1 2-2Z"
                                    stroke="#3471AF" fill="#FFF"></path>
                                  <path
                                    d="M6.3 4.5h7.4a.8.8 0 0 1 .8.8v1.9a.8.8 0 0 1-.8.8H6.3a.8.8 0 0 1-.8-.8V5.3a.8.8 0 0 1 .8-.8Z"
                                    fill="#3B8EE3"></path>
                                  <path
                                    d="M14 10.75a.5.5 0 0 1 .09.992l-.09.008H6a.5.5 0 0 1-.09-.992L6 10.75h8Zm-3 3a.5.5 0 0 1 .09.992l-.09.008H6a.5.5 0 0 1-.09-.992L6 13.75h5Z"
                                    fill="#9DC6F1" fill-rule="nonzero"></path>
                                </g>
                              </svg>
                              Seata—分布式事务解决方案</a></td>
                            <td class="ant-table-cell Marks-module_columnsBelong_yTv94"><span><a
                              href="/lzy8684">小黑bu惑</a><span class="Marks-module_split_FTFNn">/</span><a
                              href="/lzy8684/r2java">Java开发技术手册</a></span></td>
                            <td class="ant-table-cell Marks-module_columnsTime_MI-z-"><span>2023-07-11 14:03</span></td>
                            <td class="ant-table-cell Marks-module_columnsAction_Kz7zL">
                              <div class="Marks-module_collectionOperation_IIbvc">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     data-testid="dashboard-collection-mark"
                                     class="larkui-icon larkui-icon-nav-star2 larkui-popover-trigger"
                                     style="color: rgb(250, 173, 20); font-size: 18px;">
                                  <path
                                    d="M134.643 17.23a16.011 16.011 0 0 1 8.649 8.643l23.705 56.981c.29.687.938 1.156 1.681 1.217L225.362 89a16.015 16.015 0 0 1 13.733 10.643 15.999 15.999 0 0 1-4.06 16.887l-42.652 40.72a2 2 0 0 0-.56 1.92l14.335 60.087a16 16 0 0 1-6.16 16.671 16.026 16.026 0 0 1-17.77.711l-52.695-32.172a2.003 2.003 0 0 0-2.082 0L74.756 236.64a16.026 16.026 0 0 1-17.784-.696 16 16 0 0 1-6.161-16.686l14.335-60.087a2 2 0 0 0-.56-1.92l-42.637-40.736a15.999 15.999 0 0 1-4.043-16.875A16.015 16.015 0 0 1 31.623 89l56.7-4.93a2.002 2.002 0 0 0 1.665-1.216l23.705-56.981a16.011 16.011 0 0 1 8.682-8.662 16.027 16.027 0 0 1 12.268.018Z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>
                          <tr data-row-key="51840510475" class="ant-table-row ant-table-row-level-0">
                            <td class="ant-table-cell Marks-module_columnsTitle_fsKl9"><a href="/go/book/1291300"
                                                                                          target="_blank"
                                                                                          data-aspm-param="index=3^type=Book">
                              <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                   class="larkui-icon larkui-icon-group-type-project icon-svg Marks-module_titleIcon_hRflE index-module_size_wVASz"
                                   data-name="GroupTypeProject"
                                   style="width: 24px; height: 24px; margin-right: 6px; min-width: 24px;">
                                <g fill="none" fill-rule="evenodd">
                                  <path d="M9.5 2.517a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" stroke="#9D553E" fill="#F6D4C6"
                                        stroke-linejoin="round"></path>
                                  <path
                                    d="M7.73 6.123a.5.5 0 0 1 .43.903c-1.381.657-2.247 2.066-2.17 3.592.107 2.073 1.904 3.665 4.018 3.552a3.844 3.844 0 0 0 3.433-2.552.5.5 0 1 1 .944.33 4.844 4.844 0 0 1-4.324 3.22c-2.663.143-4.934-1.87-5.069-4.498-.1-1.936.997-3.718 2.738-4.547Z"
                                    fill="#DFA087" fill-rule="nonzero"></path>
                                  <path
                                    d="M9.858 9.12 13.58.972a.556.556 0 0 1 1.056.153l.518 3.66c.031.217.187.396.397.456l3.552 1.023a.556.556 0 0 1 .005 1.068l-8.587 2.552a.556.556 0 0 1-.664-.764Z"
                                    stroke="#9D553E" fill="#DE815A" stroke-linejoin="round"></path>
                                </g>
                              </svg>
                              Java？Java！</a></td>
                            <td class="ant-table-cell Marks-module_columnsBelong_yTv94"><span><a
                              href="/happydragon1994">HappyDragon1994</a></span></td>
                            <td class="ant-table-cell Marks-module_columnsTime_MI-z-"><span>2022-01-05 22:01</span></td>
                            <td class="ant-table-cell Marks-module_columnsAction_Kz7zL">
                              <div class="Marks-module_collectionOperation_IIbvc">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     data-testid="dashboard-collection-mark"
                                     class="larkui-icon larkui-icon-nav-star2 larkui-popover-trigger"
                                     style="color: rgb(250, 173, 20); font-size: 18px;">
                                  <path
                                    d="M134.643 17.23a16.011 16.011 0 0 1 8.649 8.643l23.705 56.981c.29.687.938 1.156 1.681 1.217L225.362 89a16.015 16.015 0 0 1 13.733 10.643 15.999 15.999 0 0 1-4.06 16.887l-42.652 40.72a2 2 0 0 0-.56 1.92l14.335 60.087a16 16 0 0 1-6.16 16.671 16.026 16.026 0 0 1-17.77.711l-52.695-32.172a2.003 2.003 0 0 0-2.082 0L74.756 236.64a16.026 16.026 0 0 1-17.784-.696 16 16 0 0 1-6.161-16.686l14.335-60.087a2 2 0 0 0-.56-1.92l-42.637-40.736a15.999 15.999 0 0 1-4.043-16.875A16.015 16.015 0 0 1 31.623 89l56.7-4.93a2.002 2.002 0 0 0 1.665-1.216l23.705-56.981a16.011 16.011 0 0 1 8.682-8.662 16.027 16.027 0 0 1 12.268.018Z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>
                          <tr data-row-key="51840509881" class="ant-table-row ant-table-row-level-0">
                            <td class="ant-table-cell Marks-module_columnsTitle_fsKl9"><a href="/go/book/4855506"
                                                                                          target="_blank"
                                                                                          data-aspm-param="index=4^type=Book">
                              <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                   class="larkui-icon larkui-icon-book-type-default icon-svg Marks-module_titleIcon_hRflE index-module_size_wVASz"
                                   data-name="BookTypeDefault" style="width: 24px; height: 24px; min-width: 24px;">
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
                              Vue-Mastery学习笔记</a></td>
                            <td class="ant-table-cell Marks-module_columnsBelong_yTv94"><span><a href="/nxtt7g">全栈然叔</a></span>
                            </td>
                            <td class="ant-table-cell Marks-module_columnsTime_MI-z-"><span>2022-01-05 21:51</span></td>
                            <td class="ant-table-cell Marks-module_columnsAction_Kz7zL">
                              <div class="Marks-module_collectionOperation_IIbvc">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     data-testid="dashboard-collection-mark"
                                     class="larkui-icon larkui-icon-nav-star2 larkui-popover-trigger"
                                     style="color: rgb(250, 173, 20); font-size: 18px;">
                                  <path
                                    d="M134.643 17.23a16.011 16.011 0 0 1 8.649 8.643l23.705 56.981c.29.687.938 1.156 1.681 1.217L225.362 89a16.015 16.015 0 0 1 13.733 10.643 15.999 15.999 0 0 1-4.06 16.887l-42.652 40.72a2 2 0 0 0-.56 1.92l14.335 60.087a16 16 0 0 1-6.16 16.671 16.026 16.026 0 0 1-17.77.711l-52.695-32.172a2.003 2.003 0 0 0-2.082 0L74.756 236.64a16.026 16.026 0 0 1-17.784-.696 16 16 0 0 1-6.161-16.686l14.335-60.087a2 2 0 0 0-.56-1.92l-42.637-40.736a15.999 15.999 0 0 1-4.043-16.875A16.015 16.015 0 0 1 31.623 89l56.7-4.93a2.002 2.002 0 0 0 1.665-1.216l23.705-56.981a16.011 16.011 0 0 1 8.682-8.662 16.027 16.027 0 0 1 12.268.018Z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>
                          <tr data-row-key="51840509487" class="ant-table-row ant-table-row-level-0">
                            <td class="ant-table-cell Marks-module_columnsTitle_fsKl9"><a href="/go/doc/33224762"
                                                                                          target="_blank"
                                                                                          data-aspm-param="index=5^type=Doc">
                              <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                   class="larkui-icon larkui-icon-doc-type-default icon-svg Marks-module_titleIcon_hRflE index-module_size_wVASz"
                                   data-name="DocTypeDefault" style="width: 24px; min-width: 24px; height: 24px;">
                                <g fill="none" fill-rule="evenodd">
                                  <path
                                    d="M4.75 1.267h10.5a2 2 0 0 1 2 2v13.5a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2v-13.5a2 2 0 0 1 2-2Z"
                                    stroke="#3471AF" fill="#FFF"></path>
                                  <path
                                    d="M6.3 4.5h7.4a.8.8 0 0 1 .8.8v1.9a.8.8 0 0 1-.8.8H6.3a.8.8 0 0 1-.8-.8V5.3a.8.8 0 0 1 .8-.8Z"
                                    fill="#3B8EE3"></path>
                                  <path
                                    d="M14 10.75a.5.5 0 0 1 .09.992l-.09.008H6a.5.5 0 0 1-.09-.992L6 10.75h8Zm-3 3a.5.5 0 0 1 .09.992l-.09.008H6a.5.5 0 0 1-.09-.992L6 13.75h5Z"
                                    fill="#9DC6F1" fill-rule="nonzero"></path>
                                </g>
                              </svg>
                              阿里六年，思辨成长！</a></td>
                            <td class="ant-table-cell Marks-module_columnsBelong_yTv94"><span><a
                              href="/erudite">邦帮的小小哥</a><span class="Marks-module_split_FTFNn">/</span><a
                              href="/erudite/gn1k8g">小小哥的 Blog🌼🌵📚</a></span></td>
                            <td class="ant-table-cell Marks-module_columnsTime_MI-z-"><span>2022-01-05 21:43</span></td>
                            <td class="ant-table-cell Marks-module_columnsAction_Kz7zL">
                              <div class="Marks-module_collectionOperation_IIbvc">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     data-testid="dashboard-collection-mark"
                                     class="larkui-icon larkui-icon-nav-star2 larkui-popover-trigger"
                                     style="color: rgb(250, 173, 20); font-size: 18px;">
                                  <path
                                    d="M134.643 17.23a16.011 16.011 0 0 1 8.649 8.643l23.705 56.981c.29.687.938 1.156 1.681 1.217L225.362 89a16.015 16.015 0 0 1 13.733 10.643 15.999 15.999 0 0 1-4.06 16.887l-42.652 40.72a2 2 0 0 0-.56 1.92l14.335 60.087a16 16 0 0 1-6.16 16.671 16.026 16.026 0 0 1-17.77.711l-52.695-32.172a2.003 2.003 0 0 0-2.082 0L74.756 236.64a16.026 16.026 0 0 1-17.784-.696 16 16 0 0 1-6.161-16.686l14.335-60.087a2 2 0 0 0-.56-1.92l-42.637-40.736a15.999 15.999 0 0 1-4.043-16.875A16.015 16.015 0 0 1 31.623 89l56.7-4.93a2.002 2.002 0 0 0 1.665-1.216l23.705-56.981a16.011 16.011 0 0 1 8.682-8.662 16.027 16.027 0 0 1 12.268.018Z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>
                          <tr data-row-key="22642764491" class="ant-table-row ant-table-row-level-0">
                            <td class="ant-table-cell Marks-module_columnsTitle_fsKl9"><a
                              href="/books/share/2b434c74-ed3a-470e-b148-b4c94ba14535" target="_blank"
                              data-aspm-param="index=6^type=Book">
                              <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                   class="larkui-icon larkui-icon-book-type-default icon-svg Marks-module_titleIcon_hRflE index-module_size_wVASz"
                                   data-name="BookTypeDefault" style="width: 24px; height: 24px; min-width: 24px;">
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
                              能解答一切的答案</a></td>
                            <td class="ant-table-cell Marks-module_columnsBelong_yTv94"><span>分享</span></td>
                            <td class="ant-table-cell Marks-module_columnsTime_MI-z-"><span>2021-05-14 08:46</span></td>
                            <td class="ant-table-cell Marks-module_columnsAction_Kz7zL">
                              <div class="Marks-module_collectionOperation_IIbvc">
                                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                     data-testid="dashboard-collection-mark"
                                     class="larkui-icon larkui-icon-nav-star2 larkui-popover-trigger"
                                     style="color: rgb(250, 173, 20); font-size: 18px;">
                                  <path
                                    d="M134.643 17.23a16.011 16.011 0 0 1 8.649 8.643l23.705 56.981c.29.687.938 1.156 1.681 1.217L225.362 89a16.015 16.015 0 0 1 13.733 10.643 15.999 15.999 0 0 1-4.06 16.887l-42.652 40.72a2 2 0 0 0-.56 1.92l14.335 60.087a16 16 0 0 1-6.16 16.671 16.026 16.026 0 0 1-17.77.711l-52.695-32.172a2.003 2.003 0 0 0-2.082 0L74.756 236.64a16.026 16.026 0 0 1-17.784-.696 16 16 0 0 1-6.161-16.686l14.335-60.087a2 2 0 0 0-.56-1.92l-42.637-40.736a15.999 15.999 0 0 1-4.043-16.875A16.015 16.015 0 0 1 31.623 89l56.7-4.93a2.002 2.002 0 0 0 1.665-1.216l23.705-56.981a16.011 16.011 0 0 1 8.682-8.662 16.027 16.027 0 0 1 12.268.018Z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="ant-table-footer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Marks-module_placeholder_jkAyu"></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Collection',
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/collection.less';
</style>
