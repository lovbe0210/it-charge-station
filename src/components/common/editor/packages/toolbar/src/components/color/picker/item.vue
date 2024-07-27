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

<script>
  import tinycolor2 from 'tinycolor2';
  import Palette from './palette'

  export default {
    name: "AmColorItem",
    props: {
      engine: {
        type: Object,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      active: {
        type: [Boolean, Object],
        default: undefined
      },
      setStroke: {
        type: [Boolean, Object],
        default: undefined
      },
      onSelect: Function
    },
    data() {
      return {
        title: '',
        special: false,
        state: {
          hsl: null,
          hex: '',
          rgb: null,
          hsv: null,
          oldHue: null,
          source: null
        },
        needBorder: false,
        styles: {
          check: {
            fill: '',
            display: ''
          },
          block: {
            backgroundColor: '',
            border: null
          }
        }
      }
    },
    computed: {
      refreshStyles() {
        return this.getStyles();
      }
    },
    mounted() {
      this.special = this.color === 'transparent';
      this.title = this.engine.language.get('toolbar', 'colorPicker', this.color.toUpperCase())
      this.state = this.toState(this.color || '#FFFFFF')
      this.needBorder = ['#ffffff', '#fafafa', 'transparent'].indexOf(this.state.hex) >= 0;
      this.styles = this.getStyles(this.state)
    },
    methods: {
      triggerSelect(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.onSelect) this.onSelect(this.color, event);
      },
      getContrastingColor(color) {
        if (!color) return ''
        if (color.hex === 'transparent') {
          return 'rgba(0,0,0,0.4)';
        }
        const yiq =
          (color.rgb.r * 299 + color.rgb.g * 587 + color.rgb.b * 114) / 1000;
        return yiq >= 210 ? '#8C8C8C' : '#FFFFFF';
      },
      toState(color, oldHue) {
        const tinyColor = color.hex ? tinycolor2((color).hex) : tinycolor2(color);
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
          oldHue: (color).h || oldHue || hsl.h,
          source: (color).source
        };
      },
      getStyles(state) {
        return {
          check: {
            fill: this.getContrastingColor(state || this.state),
            display: this.active ? 'block' : 'none'
          },
          block: {
            backgroundColor: this.color,
            border: this.setStroke ? '1px solid '.concat(Palette.getStroke(this.color)) : undefined
          }
        }
      }
    }
  };
</script>
