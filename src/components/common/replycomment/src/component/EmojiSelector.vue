<template>
  <div class="emoji-selector">
    <Menu mode="horizontal" :active-name="activeIndex" class="emoji-head" @on-select="changeEmoji">
      <MenuItem v-for="(item, index) in c_emoji.headerList"
                :key="index"
                :name="index">
        <img :src="item" alt=""/>
      </MenuItem>
    </Menu>
    <div ref="scrollbarRef" style="padding: 10px" class="emoji-list-scroll beauty-scroll">
      <div class="emoji-body">
        <div class="emoji-container">
          <div v-for="(item, index) in emojis" :key="index" class="emoji-wrapper">
                <div class="emoji-item" @click="addEmoji(index)">
                      <b-img class="emoji"
                             :src="item"
                             :title="index"
                             fluid
                             rounded
                             style="width: 24px; height: 24px; margin: 5px"/>
                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emoji from '@/assets/emoji/emoji.js';

export default {
  name: 'EmojiSelector',
  data() {
    return {
      activeIndex: 0,
      emojis: [],
      offsetX: 0
    }
  },
  computed: {
    c_emoji() {
      return emoji;
    }
  },
  methods: {
    changeEmoji(val) {
      this.activeIndex = val;
      switch (val) {
        case 0:
          this.offsetX = 0
          break
        case 1:
          this.offsetX = -50
          break
      }
      this.emojis = this.c_emoji.emojiList[val]
    },
    addEmoji(value) {
      this.$emit('addText', value);
    }
  },
  mounted() {
    this.emojis = emoji.emojiList[this.activeIndex];
  }
}
</script>

<style scoped lang="less">
@import "../../../../css/common-var";
.emoji-selector {
  position: fixed;
  z-index: 99;
  border: 1px solid @border-color_normal;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow-y: auto;
  overflow-anchor: none;
  background: #ffffff;
  width: 18%;

  .ivu-menu-light {
    background: unset;
  }

  .emoji-head {
    margin: 0 10px;
    height: 55px;
    line-height: 55px;
    display: flex;
    justify-content: center;

    .ivu-menu-item {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 18px;
        height: 18px;
      }
    }

    .ivu-menu-item:hover {
      border-bottom: 2px solid rgba(255, 255, 255, 0) !important;
    }

    .ivu-menu-item-active {
      border-bottom: 2px solid #909399 !important;;
    }

    .ivu-menu-item-active:hover {
      border-bottom: 2px solid #909399 !important;;
    }
  }

  .emoji-list-scroll {
    height: 200px;
    overflow-y: auto;
    overflow-anchor: none;
    margin: 0 0 10px 5px;

    .emoji-container {
      display: flex;
      flex-wrap: wrap;

      .emoji-wrapper {
        margin: 3px 4px 0 4px;
        cursor: pointer;
      }
    }
  }
}

</style>
