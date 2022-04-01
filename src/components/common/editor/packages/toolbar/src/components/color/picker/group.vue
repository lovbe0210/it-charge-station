<template>
    <span class="colorpicker-group">
        <am-color-picker-item v-for="color in colors"
        :engine="engine"
        :color="color.value"
        :active="color.active"
        :key="color.value"
        :on-select="onSelect"
        :set-stroke="setStroke"
        />
    </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EngineInterface } from "@aomao/engine";
import AmColorPickerItem from './item.vue'
@Component({
    components: {
        AmColorPickerItem
    }
})
export default class AmColorGroup extends Vue {
    @Prop({ type: Object, required: true}) engine!: EngineInterface
    @Prop(Array) colors?: { value: string; active: boolean }[]
    @Prop({ type: [Boolean, Object], default: undefined}) setStroke?: boolean
    @Prop(Function) onSelect?: (color: string, event: MouseEvent) => void
}
</script>