<template>
    <div
    :class="['toolbar-dropdown', {'toolbar-dropdown-right': isRight}, className]"
    ref="buttonRef"
    @click="triggerClick"
    @mousedown="triggerMouseDown"
    >
        <div
        :class="['toolbar-dropdown-trigger', {
            'toolbar-dropdown-trigger-active': visible,
            'toolbar-dropdown-trigger-arrow': hasArrow !== false,
        }]"
        >
            <am-button
            :name="name"
            :placement="placement"
            :title="title"
            :active="visible"
            :disabled="disabled"
            ref="targetRef"
            >
                <template #default>
                    <slot :item="content">
                        <span v-if="buttonContent && buttonContent.icon" :class="['data-icon',`data-icon-${buttonContent.icon}`]" />
                        <span v-if="buttonContent && !buttonContent.icon && buttonContent.content" class="toolbar-dropdown-button-text" v-html="buttonContent.content"></span>
                    </slot>
                    <span v-if="hasArrow !== false" class="data-icon data-icon-arrow" />
                </template>
            </am-button>
        </div>
        <am-dropdown-list 
        v-if="visible"
        :hasDot="hasDot"
        :engine="engine"
        :direction="direction"
        :name="name"
        :items="items"
        :values="valuesVar"
        :on-select="triggerSelect"
        />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { EngineInterface, isMobile, Placement } from "@aomao/engine";
import { DropdownListItem  } from '../types'
import AmDropdownList from './dropdown-list.vue'
import AmButton from './button.vue'

@Component({
    components: {
        AmButton,
        AmDropdownList
    },
})
export default class Dropdown extends Vue {
    @Prop({ type: Object}) engine?: EngineInterface
    @Prop({ type: String, required: true}) name!: string
    @Prop({ type: [String, Array, Number]}) values?: string | number | string[]
    @Prop({ type: Array, default: []}) items!: DropdownListItem[]
    @Prop(String) icon?: string
	@Prop({ type: [String, Function]}) content?: string | (() => string)
    @Prop(String) title?: string
    @Prop({ type: [Boolean, Object], default: undefined}) disabled?: boolean
    @Prop({ type: [Boolean, Object], default: undefined}) single?: boolean
    @Prop(String) className?: string
    @Prop(String) direction?: 'vertical' | 'horizontal'
    @Prop(Function) onSelect?: (event: MouseEvent, key: string) => void | boolean
    @Prop({ type: [Boolean, Object], default: undefined}) hasArrow?: boolean
    @Prop({ type: [Boolean, Object], default: undefined}) hasDot?: boolean
    @Prop({ type: [String], default: undefined}) placement?: Placement
    valuesVar: string | number | string[] = ""
    buttonContent?: DropdownListItem | {icon?:string,content?:string} | null = null
    isRight = false
    visible = false

    mounted(){
        if (this.$refs.buttonRef && isMobile) {
			const rect = (this.$refs.buttonRef as Element).getBoundingClientRect();
			this.isRight = rect.left > window.visualViewport.width / 2;
		}
    }

    @Watch("$props.values", { immediate: true, deep: true })
    update(values?: string | number | string[]){
        if (this.single !== false)
            values = Array.isArray(values) && values.length > 0 ? values[0] : values;
        const item = this.items.find(
            item =>
                (typeof values === 'string' && item.key === values) ||
                (Array.isArray(values) && values.indexOf(item.key) > -1),
        );
        const defaultItem =
        this.items.length > 0
        ?  this.items.find(item => item.isDefault === true) || this.items[0]
        : null;
        
        if(item){
            if(this.$slots.default){
                this.buttonContent =  item
            }
            else if(typeof this.content === "function") {
                this.buttonContent = {icon: this.icon,content: this.content()}
            }
            else if(Array.isArray(values) && values.length > 1){
                this.buttonContent = {icon: this.icon,content: this.content}
            }else{
                this.buttonContent = {icon:item.icon,content:typeof item.content === "function" ? item.content() : item.content}
            }
        }else if(this.icon || this.content){
            if(!Array.isArray(values) || values.length < 1){
                this.buttonContent = {icon:this.icon,content:typeof this.content === "function" ? this.content() : this.content}
            }
        }else if(defaultItem){
            this.buttonContent = {icon:defaultItem.icon,content:typeof defaultItem.content === "function" ? defaultItem.content() : defaultItem.content}
        }
        this.valuesVar = values ||
                    (this.icon || this.content ? '' : defaultItem?.key || '')
    }

    @Watch("visible", { immediate: true, deep: true })
    watch(value: boolean){
        if(value) document.addEventListener('click', this.hide);
        else document.removeEventListener('click', this.hide);
    }

    triggerMouseDown(event: MouseEvent){
        event.preventDefault();
    }

    triggerClick(event: MouseEvent){
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    show(){
        this.visible = true
    }

    hide(event?: MouseEvent){
        if(event && this.$refs.targetRef && ((this.$refs.targetRef as Vue).$refs.element as Element).contains(event.target as Node)) return;
        this.visible = false
    }

    triggerSelect(event: MouseEvent, key: string){
        this.hide()
        if (this.onSelect) this.onSelect(event, key);
    }
}
</script>
<style>
.toolbar-dropdown {
    position: relative;
}

.toolbar-dropdown .toolbar-dropdown-trigger {
    display: flex;
    align-items: stretch;
    height: 100%;
}

.toolbar-dropdown .toolbar-dropdown-trigger .toolbar-dropdown-button-text {
    font-size: 12px;
}

.toolbar-dropdown .toolbar-dropdown-trigger-arrow .toolbar-button{
    padding-right: 20px;
    margin: 0;
}

.toolbar-dropdown .toolbar-dropdown-trigger-arrow .data-icon-arrow {
    position: absolute;
    right: 6px;
    top: calc(100% / 2 - 2px);
    width: 8px;
    height: 8px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjhweCIgaGVpZ2h0PSI1cHgiIHZpZXdCb3g9IjAgMCA4IDUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi41ICg2NzQ2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPkdyb3VwIENvcHkgNjwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuNDUiPg0KICAgICAgICA8ZyBpZD0idG9vbGJhciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyOC4wMDAwMDAsIC0xOC4wMDAwMDApIj4NCiAgICAgICAgICAgIDxnIGlkPSJwYXJhZ3JhcGgtc3R5bGUiPg0KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNi4wMDAwMDAsIDQuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC1Db3B5LTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMi4wMDAwMDAsIDEyLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAuNTk2MDkzNzUsMi41NTcwMzEyNSBMMy43NDUzMTI1LDYuMzc4MTI1IEMzLjg3NzM0Mzc1LDYuNTI1NzgxMjUgNC4xMDg1OTM3NSw2LjUyNTc4MTI1IDQuMjQwNjI1LDYuMzc4MTI1IEw3LjQwNTQ2ODc1LDIuNTU3MDMxMjUgQzcuNTk2MDkzNzUsMi4zNDI5Njg3NSA3LjQ0NDUzMTI1LDIuMDAzOTA2MjUgNy4xNTc4MTI1LDIuMDAzOTA2MjUgTDAuODQ0NTMxMjUsMi4wMDM5MDYyNSBDMC41NTcwMzEyNSwyLjAwMzkwNjI1IDAuNDA0Njg3NSwyLjM0Mjk2ODc1IDAuNTk2MDkzNzUsMi41NTcwMzEyNSBaIiBpZD0iU2hhcGUiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+);
    background-repeat: no-repeat;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
}

.toolbar-dropdown .toolbar-dropdown-list {
    position: absolute;
    top: 32px;
    font-size: 12px;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 3px 3px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    padding: 5px 0;
    height: auto;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
    z-index: 999;
    max-height: calc(80vh);
    overflow: auto;
}

.toolbar-dropdown.toolbar-dropdown-right:not(.toolbar-dropdown-right) .toolbar-dropdown-list{
    left: 0px;
}

.editor-toolbar-mobile .toolbar-dropdown .toolbar-dropdown-list,.editor-toolbar-popup .toolbar-dropdown .toolbar-dropdown-list{
    bottom: 32px;
    top: auto;
    max-height: calc(30vh);
    overflow: auto;
}

.editor-toolbar-mobile .toolbar-dropdown.toolbar-dropdown-right .toolbar-dropdown-list,.editor-toolbar-popup .toolbar-dropdown.toolbar-dropdown-right .toolbar-dropdown-list{
    right: 0px;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item {
    padding: 2px 10px 2px 16px;
    line-height: 30px;
    color: #595959;
    text-align: left;
    position: relative;
    display: flex;
    white-space: nowrap;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item-disabled {
    color: rgba(17, 31, 44, 0.24);
    cursor: not-allowed;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item:not(.toolbar-dropdown-list-item-disabled):hover {
    color: #262626;
    background-color: #f5f5f5;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item .data-icon {
    margin-right: 8px;
}

.toolbar-dropdown .toolbar-dropdown-list.toolbar-dropdown-horizontal .toolbar-dropdown-list-item {
    display: inline-block;
}

.toolbar-dropdown .toolbar-dropdown-list.toolbar-dropdown-dot .toolbar-dropdown-list-item {
    padding-left: 30px;
    padding-right: 16px;
    white-space: nowrap;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item .data-icon-dot
{
    position: absolute;
    top: 50%;
    left: 8px;
    margin-top: -7px;
    width: 14px;
    height: 14px;
    display: block;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjQgKDY3Mzc4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5VbnRpdGxlZDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuNDUiPgogICAgICAgIDxnIGlkPSJjaGVjayIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMTIuNDY4NzUsMi41OTc2NTYyNSBMMTEuNTEzMDg1OSwyLjU5NzY1NjI1IEMxMS4zNzkxMDE2LDIuNTk3NjU2MjUgMTEuMjUxOTUzMSwyLjY1OTE3OTY5IDExLjE2OTkyMTksMi43NjQ0NTMxMiBMNS41MzMwMDc4MSw5LjkwNTI3MzQ0IEwyLjgzMDA3ODEyLDYuNDgwNDY4NzUgQzIuNzQ2Njc5NjksNi4zNzUxOTUzMSAyLjYyMDg5ODQ0LDYuMzEzNjcxODcgMi40ODY5MTQwNiw2LjMxMzY3MTg3IEwxLjUzMTI1LDYuMzEzNjcxODcgQzEuNDM5NjQ4NDQsNi4zMTM2NzE4NyAxLjM4OTA2MjUsNi40MTg5NDUzMSAxLjQ0NTExNzE5LDYuNDkwMDM5MDYgTDUuMTg5ODQzNzUsMTEuMjM0MTc5NyBDNS4zNjQ4NDM3NSwxMS40NTU2NjQxIDUuNzAxMTcxODcsMTEuNDU1NjY0MSA1Ljg3NzUzOTA2LDExLjIzNDE3OTcgTDEyLjU1NDg4MjgsMi43NzI2NTYyNSBDMTIuNjEwOTM3NSwyLjcwMjkyOTY5IDEyLjU2MDM1MTYsMi41OTc2NTYyNSAxMi40Njg3NSwyLjU5NzY1NjI1IFoiIGlkPSJQYXRoIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=);
    background-repeat: no-repeat;
}
</style>