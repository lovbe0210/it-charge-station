<template>
    <div
    :class="['toolbar-dropdown toolbar-collapse', {'toolbar-dropdown-right': isRight},className]"
    ref="collapse"
    >
    <am-button
    v-if="!isCustomize"
    name="collapse"
    :icon="icon"
    :content="content"
    :on-click="triggerClick"
    :active="visible"
    :disabled="disabled"
    />
    <div v-if="visible" class="toolbar-dropdown-list" data-element="ui">
        <slot name="header">
            <div v-if="header" class="toolbar-collapse-header" v-html="header" />
        </slot>
        <div class="toolbar-collapse-content">
            <am-collapse-group 
            v-for="(group,index) in groups"
            :key="index"
            :engine="engine"
            v-bind="group"
            :on-select="triggerSelect"
            />
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VNode } from "vue";
import { EngineInterface, isMobile } from "@aomao/engine";
import { CollapseGroupProps } from '../../types';
import AmButton from '../button.vue';
import AmCollapseGroup from './group.vue';

@Component({
    components: {
        AmButton,
        AmCollapseGroup
    },
})
export default class AmCollapse extends Vue  {
    @Prop(Object) engine?: EngineInterface
    @Prop(String) header?: string
    @Prop({ type: Array, required: true, default: [] }) groups!: Array<CollapseGroupProps>
    @Prop({ type: [Boolean, Object], default: undefined}) disabled?: boolean
    @Prop(String) className?: string
	@Prop({ type: String, default: undefined}) icon?: string
    @Prop({ type: [String, Function], default: undefined}) content?: string | (() => string) | VNode
    @Prop(Function) onSelect?: (event: MouseEvent, name: string) => boolean | void

    isCustomize = false
    visible = false
    isRight = false

    show(){
        this.visible = true
        setTimeout(() => {
            document.addEventListener('click', this.hide);
        }, 10);
    };

    hide(event?: MouseEvent){
        if (event) {
            // let node = event.target;
            // while (node) {
            //     if (node === collapse.value) {
            //         return;
            //     }
            //     node = (node as Element).parentNode;
            // }
        }
        document.removeEventListener('click', this.hide);
        this.visible = false
    };

    mounted(){
        this.isCustomize = !(this.icon || this.content);
        this.visible = this.isCustomize
        if (this.$refs.collapse && isMobile) {
			const rect = (this.$refs.collapse as Element).getBoundingClientRect();
			this.isRight = rect.left > window.visualViewport.width / 2;
		}
    }

    unmounted(){
        if(this.isCustomize) document.removeEventListener('click', this.hide);
    }

    triggerClick(){
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    };

    triggerSelect(event:MouseEvent,name:string){
        this.hide()
        if(this.onSelect) this.onSelect(event,name)
    }
}
</script>
<style>
.toolbar-collapse-header {
    color: #8c8c8c;
    margin: 4px 16px 0;
    font-size: 12px;
    line-height: 20px;
    text-align: left;
    padding-bottom: 8px;
    margin-bottom: 6px;
    border-bottom: 1px solid #e8e8e8;
}

.toolbar-collapse-header code{
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 2px;
    border: 1px solid #d9d9d9;
}

.toolbar-collapse-content {
    min-width: 200px
}

.toolbar-collapse-group-title {
    padding: 2px 16px;
    text-align: left;
    color: #8c8c8c;
    font-weight: 700;
    font-size: 12px;
    line-height: 24px;
}

.toolbar-collapse-item {
    display: flex;
    cursor: pointer;
    padding: 4px 16px 0;
}

.toolbar-collapse-item-active {
    background-color: #f4f4f4;
}

.editor-toolbar .toolbar-collapse-item-disabled, .data-toolbar-component-list .toolbar-collapse-item-disabled, .editor-toolbar:not(.editor-toolbar-mobile) .toolbar-collapse-item-disabled:hover,  .data-toolbar-component-list .toolbar-collapse-item-disabled:hover {
  background-color: transparent;
  border: 1px solid transparent;
  box-shadow: none;
  color: #000000;
  opacity: 0.25;
  cursor: not-allowed;
}

.toolbar-collapse-item .toolbar-collapse-item-text
{
    display: block;
    text-align: left;
    margin-left: 8px;
}

.toolbar-collapse-item .toolbar-collapse-item-title{
    display: block;
    color: #595959;
    line-height: 24px;
    font-size: 14px;
    font-weight: normal;
}

.toolbar-collapse-item .toolbar-collapse-item-description
{
    display: block;
    font-size: 12px;
    color: rgba(0,0,0,.45);
}
</style>