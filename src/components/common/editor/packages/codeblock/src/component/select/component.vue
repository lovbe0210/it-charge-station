<template>
  <a-select
    :show-search="true"
    size="small"
    :bordered="false"
    style="min-width: 128px"
    :default-value="defaultValue"
    :get-popup-container="getContainer"
    @select="onSelect"
    :filter-option="filterOption">
    <a-select-option
      v-for="item in modeDatas"
      :name="item.name"
      :value="item.value"
      :key="item.value">
      {{item.name}}
    </a-select-option>

  </a-select>
</template>
<script>
  // import {Select} from 'ant-design-vue'
  // const ASelectOption = Select.Option
  export default {
    name: "CodeblockSelect",
    props: ['modeDatas', 'defaultValue', 'getContainer', 'onSelect'],
    components: {
      // 'a-select': Select,
      // ASelectOption
    },
    methods: {
      filterOption(input, option) {
        input = input.toLowerCase();
        const key = option.key || '';
        let name = option.name || '';
        name = name.toLowerCase();
        return key.includes(input) || name.includes(input);
      }
    }
  }
</script>
