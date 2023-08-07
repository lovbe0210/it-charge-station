<template>
  <Dropdown style="margin-left: 20px">
    <span class="lightblock-icon-theme" @click="toggleTheme">
    <span class="iconfont icon-theme-btn"></span>
    <!--<div class="lightblock-theme-contain" v-show="showTheme">
      <div class="lightblock-theme-random" @click="randomColor">
        <span class="data-icon icon-reload">&#xe77f;</span>
        {{ language['random'] }}
      </div>
      <div class="lightblock-theme-title">{{ language['borderColor'] }}</div>
      <div class="lightblock-theme-box">
        &lt;!&ndash; 边框颜色选择框 &ndash;&gt;
        <span
          v-for="(color, index) in border"
          :key="color"
          class="lightblock-theme-box-item"
          :class="{ active: bdColor === color }"
          @click="changeColor('border', color, index)"
        >
          <span :style="{ background: color }"></span>
        </span>
      </div>
      <div style="height: 8px;"></div>
      <div class="lightblock-theme-title">{{ language['backgroundColor'] }}</div>
      <div class="lightblock-theme-box">
        &lt;!&ndash; 背景颜色选择框 &ndash;&gt;
        <span v-for="color in background"
              :key="color"
              class="lightblock-theme-box-item"
              :class="{ active: bgColor === color }"
              @click="changeColor('background', color)">
          <span :style="{ background: color }"></span>
        </span>
      </div>
    </div>-->
  </span>
    <DropdownMenu slot="list">
      <DropdownItem>驴打滚</DropdownItem>
      <DropdownItem>炸酱面</DropdownItem>
      <DropdownItem>豆汁儿</DropdownItem>
      <DropdownItem>冰糖葫芦</DropdownItem>
      <DropdownItem>北京烤鸭</DropdownItem>
    </DropdownMenu>
  </Dropdown>







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
          '#eff0f1',
          '#fbbfbc',
          '#fed4a4',
          '#fff67a',
          '#b7edb1',
          '#bacefd',
          '#cdb2fa'
        ],
        background: [
          '#f2f3f5',
          '#fef1f1',
          '#fff5eb',
          '#fefff0',
          '#f0fbef',
          '#f0f4ff',
          '#f6f1fe'
        ],
        bdColor: this.value.borderColor,
        bgColor: this.value.backgroundColor,
        showTheme: false
      };
    },
    methods: {
      toggleTheme() {
        debugger
        this.showTheme = !this.showTheme;
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
          this.bgColor = this.background[key];
          data.border = color;
          data.background = this.background[key];
        }
        if (type === 'background') {
          this.bgColor = color;
          data.background = color;
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
