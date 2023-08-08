<template>
    <span class="lightblock-icon-theme" @mouseenter="toggleTheme(true)" @mouseleave="toggleTheme(false)">
      <span class="iconfont icon-theme-btn"></span>
      <div class="lightblock-theme-contain" v-show="showTheme" @mouseenter="toggleSelect(true)"
           @mouseleave="toggleSelect(false)">
        <div class="lightblock-theme-random" @click="randomColor">
          <span class="data-icon icon-reload">&#xe77f;</span>
          {{ language['random'] }}
        </div>
        <div class="lightblock-theme-title">{{ language['backgroundColor'] }}</div>
        <div class="lightblock-theme-box">
          <!-- 背景颜色选择框 -->
          <span v-for="(color, index) in background"
                :key="color"
                class="lightblock-theme-box-item"
                :class="{ active: bgColor === color }"
                @click="changeColor('background', color, index)">
            <span :style="{ background: color }"></span>
          </span>
        </div>
        <div style="height: 8px;"></div>
        <div class="lightblock-theme-title">{{ language['borderColor'] }}</div>
        <div class="lightblock-theme-box">
          <!-- 边框颜色选择框 -->
          <span v-for="(color, index) in border" :key="color" class="lightblock-theme-box-item"
                :class="{ active: bdColor === color }"
                @click="changeColor('border', color, index)">
            <span :style="{ background: color }"></span>
          </span>
        </div>
      </div>
  </span>
</template>

<script>
  export default {
    name: "ThemeSelector",
    props: {
      value: Object,
      language: Object,
      onChange: Function
    },
    data() {
      return {
        border: [
          '#E7E9E8',
          '#81BBF8',
          '#81DFE4',
          '#82EDC0',
          '#C1E77E',
          '#F5D480',
          '#F8B881',
          '#F1A2AB',
          '#F297CC',
          '#BA9BF2'
        ],
        background: [
          '#EFF0F0',
          '#DFEEFD',
          '#DAF7F8',
          '#E3F7EF',
          '#EDF8DB',
          '#FAF0D5',
          '#FBEADC',
          '#FBE6E9',
          '#FBE1F0',
          '#ECE4FB'
        ],
        bdColor: this.value.borderColor,
        bgColor: this.value.backgroundColor,
        hoverThemeSelect: false,
        showTheme: false
      };
    },
    methods: {
      toggleTheme(flag) {
        if (flag && this.showTheme) {
          return;
        }
        if (!flag) {
          setTimeout(() => {
            if (this.hoverThemeSelect) {
              return;
            }
            this.showTheme = flag;
          }, 500)
        } else {
          setTimeout(() => {
            this.showTheme = flag;
          }, 200)
        }

      },
      toggleSelect(flag) {
        if (!flag) {
          setTimeout(() => {
            this.showTheme = false;
          }, 200)
        }
        this.hoverThemeSelect = flag;
      },
      randomColor() {
        const index = Math.floor(Math.random() * this.border.length);
        const randomBdColor = this.border[index];
        const randomBgColor = this.background[index];
        this.bdColor = randomBdColor;
        this.bgColor = randomBgColor;
        this.updateColor({ background: randomBgColor, border: randomBdColor });
      },
      changeColor(type, color, key) {
        const data = { border: this.bdColor, background: this.bgColor };

        if (type === 'border' && key !== undefined) {
          this.bdColor = color;
          data.border = color;
          data.background = this.bgColor;
        }
        if (type === 'background') {
          this.bgColor = color;
          this.bdColor = this.border[key];
          data.background = color;
          data.border = this.border[key];
        }

        this.updateColor(data);
      },
      updateColor(data) {
        if (this.onChange) {
          this.onChange(data);
        }
      }
    }
  };
</script>

<style scoped>

</style>
