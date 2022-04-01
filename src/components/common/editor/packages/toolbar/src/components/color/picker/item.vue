<template>
    <span
    :class="['colorpicker-group-item', {
        'colorpicker-group-item-border': needBorder,
        'colorpicker-group-item-active': active,
        'colorpicker-group-item-special': special,
    }]"
    @click="triggerSelect"
    :title="title"
    >
        <span :style="refreshStyles.block">
            <svg :style="refreshStyles.check" viewBox="0 0 18 18">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
        </span>
    </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import tinycolor2 , { ColorInput } from 'tinycolor2';
import { EngineInterface } from '@aomao/engine';
import Palette from './palette'

@Component({})
export default class AmColorItem extends Vue {
    @Prop({ type: Object, required: true}) engine!: EngineInterface
    @Prop(String) color!: string
    @Prop({ type: [Boolean, Object], default: undefined}) active?: boolean
    @Prop({ type: [Boolean, Object], default: undefined}) setStroke?: boolean
    @Prop(Function) onSelect?: (color: string, event: MouseEvent) => void

    title = ''
    special = false
    state?: {
        hsl: any;
        hex: string;
        rgb: any;
        hsv: any;
        oldHue: any;
        source: any;
    } 
    needBorder = false
    styles?: {
        check: {
            fill: string;
            display: string;
        };
        block: {
            backgroundColor: string;
            border: string | undefined;
        };
    }

    mounted(){
        this.special = 'transparent' === this.color;
        this.title = this.engine.language.get<string>('toolbar', 'colorPicker', this.color.toUpperCase())
        this.state = this.toState(this.color || '#FFFFFF')
        this.needBorder = ['#ffffff', '#fafafa', 'transparent'].indexOf(this.state.hex) >= 0;
        this.styles = this.getStyles(this.state)
    }

    triggerSelect(event: MouseEvent){
        event.preventDefault();
        event.stopPropagation();
        if (this.onSelect) this.onSelect(this.color, event);
    };

    public get refreshStyles() {
        return this.getStyles()
    }
   
    getContrastingColor(color: {
        hsl: tinycolor2.ColorFormats.HSLA;
        hex: string;
        rgb: tinycolor2.ColorFormats.RGBA;
        hsv: tinycolor2.ColorFormats.HSVA;
        oldHue: any;
        source: any;
    }){
        if(!color) return ''
        if (color.hex === 'transparent') {
            return 'rgba(0,0,0,0.4)';
        }

        const yiq =
            (color.rgb.r * 299 + color.rgb.g * 587 + color.rgb.b * 114) / 1000;
        return yiq >= 210 ? '#8C8C8C' : '#FFFFFF';
    }
    toState(color: ColorInput, oldHue?: number){
        const tinyColor = (color as any)['hex']
            ? tinycolor2((color as any)['hex'])
            : tinycolor2(color);
        const hsl = tinyColor.toHsl();
        const hsv = tinyColor.toHsv();
        const rgb = tinyColor.toRgb();
        const hex = tinyColor.toHex();

        if (hsl.s === 0) {
            hsl.h = oldHue || 0;
            hsv.h = oldHue || 0;
        }

        const transparent = hex === '000000' && rgb.a === 0;
        return {
            hsl: hsl,
            hex: transparent ? 'transparent' : '#'.concat(hex),
            rgb: rgb,
            hsv: hsv,
            oldHue: (color as any)['h'] || oldHue || hsl.h,
            source: (color as any)['source'],
        };
    }
    getStyles(state?:any){
        return {
            check: {
                fill: this.getContrastingColor(state || this.state),
                display: this.active ? 'block' : 'none',
            },
            block: {
                backgroundColor: this.color,
                border:this.setStroke ? '1px solid '.concat(Palette.getStroke(this.color)) : undefined
            }
        }
    }
}
</script>