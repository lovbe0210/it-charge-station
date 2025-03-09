<template>
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
        <span class="doc-version-time">{{ formatTime2H(item.createTime) }}</span>
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
</template>
<script>
import {formatTime2H} from '@/utils'

export default {
  name: 'ArticleVersion',
  data() {
    return {
      tmpVersionTag: null,
      versionInputId: null,
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
      ]
    }
  },
  props: ['articleId', 'addNewVersion'],
  computed: {
    docStyle() {
      return this.$store.state.docStyle;
    }
  },
  methods: {
    editVersionTag(versionId) {
      this.versionInputId = versionId;
      this.$nextTick(() => {
        this.$refs.versionInput[0].focus({
          cursor: 'end'
        });
      })
    },
    createNewVersion() {
      this.historyVersion.unshift({
        id: '1123sasdasdas',
        versionTag: this.tmpVersionTag,
        createTime: Date.now()
      });
      this.tmpVersionTag = null;
    },
    formatTime2H
  },
  mounted() {
    if (this.addNewVersion) {
      this.tmpVersionTag = '';
    }
  }
}
</script>
<style scoped lang="less">
  @import "../css/common-var";
  .history-version{
    .new-version-tag {
      margin-bottom: 10px;

      .ivu-input-wrapper {
        margin-bottom: 5px;
        color: @dark-font-color;
      }

      .ivu-btn-text {
        color: @dark-font-color;

        &:hover {
          color: @primary-color !important;
          background: unset;
        }
      }
    }

    .doc-version {
      background: @dropdown-item-hover ;
      padding: 8px 10px;
      border-radius: 4px;
      margin-bottom: 10px;

      .doc-version-basic {
        color: @dark-font-color;
        font-size: 14px;
        margin-bottom: 5px;

        .doc-version-name {
          line-height: 1.86;
        }

        .ivu-input {
          color: @dark-font-color;
        }
      }

      .doc-version-action {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .doc-version-time {
          font-size: 12px;
          color: @grey-white-font-color;
        }

        .bianji, .delete {
          color: @dark-font-color;
        }

        .action-group {
          .ivu-btn-text {
            padding: 0 5px;

            &:hover {
              .bianji, .delete {
                color: @primary-color !important;
              }
              background: unset;
            }
          }

          .ivu-btn-success {
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
