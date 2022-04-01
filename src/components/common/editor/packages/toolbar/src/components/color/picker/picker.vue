<template>
    <div
    class="colorpicker-board"
    @mousedown="triggerMouseDown"
    >
        <div
        class="colorpicker-default"
        @click="triggerSelect(defaultColor,$event)"
        >
            <am-color-picker-item
                :engine="engine"
                :color="defaultColor"
                :active-colors="[]"
                :on-select="triggerSelect"
            />
            <span class="colorpicker-default-text">
                {{text}}
            </span>
        </div>
        <am-color-picker-group
        v-for="(data,index) in colorValues"
        :engine="engine"
        :colors="data"
        :key="index"
        :on-select="triggerSelect"
        :set-stroke="setStroke"
        />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EngineInterface } from "@aomao/engine";
import AmColorPickerItem from './item.vue'
import AmColorPickerGroup from './group.vue'
import Palette from './palette'

@Component({
    components: {
        AmColorPickerItem,
        AmColorPickerGroup
    },
})
export default class ColorPicker extends Vue {
    @Prop({ type: Object, required: true}) engine!: EngineInterface
    @Prop(Array) colors?: string[][]
    @Prop({ type: String, required: true}) defaultColor!: string
    @Prop({ type: String, required: true}) defaultActiveColor!: string
    @Prop({ type: [Boolean, Object], default: undefined}) setStroke?: boolean
    @Prop(Function) onSelect?: (color: string, event: MouseEvent) => void
    

    activeColors(values:Array<Array<string | {value:string,active:boolean}>>,activeValue:string){
        return values.map(group => group.map(color => {
            const value = typeof color === "string" ? color : color.value
            return { value, active:activeValue === value }
        }))
    }

    colorValues: {
        value: string;
        active: boolean;
    }[][] = []

    text = ''

    mounted(){
        this.colorValues = this.activeColors(this.colors || Palette.getColors(), this.defaultActiveColor)
        this.text = this.engine.language.get(
                    'toolbar',
                    'colorPicker',
                    this.defaultColor === 'transparent'
                        ? 'nonFillText'
                        : 'defaultText',
                )
    }

    triggerSelect(color: string, event: MouseEvent){
        this.colorValues = this.activeColors(this.colorValues, color)
        if (this.onSelect) this.onSelect(color, event);
    }

    triggerMouseDown(event:MouseEvent){
        if ('INPUT' !== (event.target as Element).tagName) {
            event.preventDefault();
        }
    }
}
</script>
<style>
.colorpicker-default {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    margin: 4px 0 8px;
    border-radius: 2px;
    cursor: pointer;
}

.colorpicker-default:hover {
    background-color: #f5f5f5;
}

.colorpicker-default-text {
    margin-left: 8px; 
}

.colorpicker-group {
    display: flex;
    width: 100%;
    height: auto;
    position: relative;
    padding: 0 8px;
}

.colorpicker-group:nth-child(2){
    margin-bottom: 6px;
}

.colorpicker-group:last-child {
    margin-bottom: 0px;
}

.colorpicker-group-item {
    width: 24px;
    height: 24px;
    padding: 2px 2px;
    display: inline-block;
    border-radius: 3px 3px;
    border: 1px solid transparent;
    flex: 0 0 auto;
    cursor: pointer;
    background-color: #fff;
}
.colorpicker-group-item > span {
    position: relative;
    width: 18px;
    height: 18px;
    display: block;
    border-radius: 2px 2px;
    border: 1px solid transparent;
}
.colorpicker-group-item > span svg {
    position: absolute;
    top: -1px;
    left: 1px;
    width: 12px;
    height: 12px;
}
.colorpicker-group-item-border > span {
    border: 1px solid #e8e8e8;
}
.colorpicker-group-item-special {
    position: relative;
}
.colorpicker-group-item-special:after {
    content: "";
    display: block;
    position: absolute;
    top: 10px;
    left: 0px;
    width: 22px;
    height: 0;
    border-bottom: 2px solid #ff5151;
    transform: rotate(45deg);
}
.colorpicker-group-item:hover {
    border: 1px solid #d9d9d9;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}
</style>