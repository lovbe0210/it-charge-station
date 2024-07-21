<template>
  <Select v-model="selectValue"
          @on-select="selectMode"
          @on-query-change="filterOption"
          @on-open-change="openChange"
          filterable
          style="width:128px"
          size="small">
    <Option v-for="item in cModeDatas" :value="item.value" :key="item.value">
      {{item.name}}
    </Option>
  </Select>
</template>
<script>
  import modeMap from "../mode";
  export default {
    name: "CodeblockSelect",
    data() {
      return {
        selectValue: '',
        cModeDatas: []
      }
    },
    props: ['defaultValue', 'onSelect'],
    methods: {
      filterOption(input) {
        input = input?.trim().toLowerCase();
        this.cModeDatas = modeMap.filter(mode => {
          const value = (mode.value || '').toLowerCase();
          let name = (mode.name || '').toLowerCase();
          return value.includes(input) || name.includes(input);
        })
      },
      openChange (flag) {
        if (flag) {
          this.cModeDatas = modeMap;
        }
      },
      selectMode(option) {
        let selectMode = 'plain';
        for (let mode of modeMap) {
          if (option.value === mode.value) {
            selectMode = mode.value;
            break;
          }
        }
        this.onSelect(selectMode)
      }
    },
    mounted() {
      for (let mode of modeMap) {
        if (mode.value === this.defaultValue || mode.name === this.defaultValue) {
          this.selectValue = mode.value;
          this.cModeDatas = modeMap;
          return;
        }
      }
      this.selectValue = this.defaultValue;
      this.cModeDatas = modeMap;
    }
  }
</script>

<style lang="less" scoped>
  /deep/.ivu-select-input {
    font-size: 12px;
  }

  /deep/.ivu-select-item {
    font-size: 12px !important;
  }
</style>
