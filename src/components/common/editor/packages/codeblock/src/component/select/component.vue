<template>
    <a-select
    :show-search="true"
    size="small"
    :bordered="false"
    style="min-width: 128px"
    :default-value="defaultValue"
    :get-popup-container="getContainer"
    @select="onSelect"
    :filter-option="filter"
    >
        <a-select-option
        v-for="item in modeDatas"
        :name="item.name"
        :value="item.value"
        :key="item.value"
        >
            {{item.name}}
        </a-select-option>
    </a-select>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Select } from 'ant-design-vue'
const ASelectOption = Select.Option
Vue.use(Select)
Vue.use(ASelectOption)
@Component({
    components: {
        'a-select': Select,
        ASelectOption
    },
})
export default class CodeblockSelect extends Vue {
    @Prop({type: Array, default: []}) modeDatas?: {value: string, syntax: string, name: string,}[]
    @Prop(String) defaultValue?: string
    @Prop(Function) getContainer?: () => HTMLElement
    @Prop(Function) onSelect?: (value: string) => void
 
    filter(input: string, option: any){
        input = input.toLowerCase();
        const key = option.key || '';
        let name = option.name || '';
        name = name.toLowerCase();
        return key.includes(input) || name.includes(input);
    }
}
</script>