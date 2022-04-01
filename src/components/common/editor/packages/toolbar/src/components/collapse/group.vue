<template>
    <div class="toolbar-collapse-group">
        <div v-if="title" class="toolbar-collapse-group-title">{{title}}</div>
        <am-collapse-item 
        v-for="item in items"
        :key="item.name"
        :engine="engine"
        v-bind="{...handleOmit(item, 'onClick')}"
        :on-click="onClick"
        />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { omit } from 'lodash';
import { CollapseItemProps } from '../../types'
import AmCollapseItem from './item.vue'
import { EngineInterface } from "@aomao/engine";
@Component({
    components: {
        AmCollapseItem
    },
})
export default class AmCollapseGroup extends Vue {
    @Prop(Object) engine?: EngineInterface
    @Prop(String) title?: string
    @Prop({ type: Array, required: true, default: [] }) items!: Omit<CollapseItemProps, 'engine'>[]
    @Prop(Function) onSelect?: (event: MouseEvent, name: string) => boolean | void
  
    handleOmit = omit

    onClick(event:MouseEvent, name:string){
        let result;
        const item = this.items.find(item => item.name === name)
        if (item?.onClick)
            result = item.onClick(event, name);
        if (this.onSelect) this.onSelect(event, name);
        return result;
    }
}
</script>