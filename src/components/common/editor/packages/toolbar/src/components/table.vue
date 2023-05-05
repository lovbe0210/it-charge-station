<template>
  <div data-element="ui" class="data-toolbar-table-selector">
    <div
      class="data-toolbar-table-selector-tr"
      v-for="row in currentRows"
      :key="row"
    >
      <div
        v-for="(col, index) in currentCols"
        :class="[
          { 'data-toolbar-table-selector-td': true },
          { actived: row - 1 < selectedRows && col - 1 < selectedCols },
        ]"
        :key="index"
        @mousedown="triggerSelect($event, row - 1, col - 1)"
        @mouseover="triggerHover(row - 1, col - 1)"
      />
    </div>
    <div class="data-toolbar-table-selector-info">
      {{ selectedRows === undefined ? 0 : selectedRows }}x{{
        selectedCols === undefined ? 0 : selectedCols
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class TableSelector extends Vue {
  @Prop({ type: Number, default: 10 }) maxRows!: number;
  @Prop({ type: Number, default: 10 }) maxCols!: number;
  @Prop({ type: Number, default: 4 }) minRows!: number;
  @Prop({ type: Number, default: 4 }) minCols!: number;
  @Prop(Function) onSelect?: (
    event: MouseEvent,
    rows: number,
    cols: number
  ) => void;

  currentRows = 4;
  currentCols = 4;
  selectedRows = 0;
  selectedCols = 0;

  triggerSelect(event: MouseEvent, rows: number, cols: number) {
    event.preventDefault();
    if (this.onSelect) this.onSelect(event, rows + 1, cols + 1);
  }

  triggerHover(rows: number, cols: number) {
    const showRows = Math.max(this.minRows, Math.min(this.maxRows, rows + 2));
    const showCols = Math.max(this.minCols, Math.min(this.maxCols, cols + 2));
    this.currentRows = showRows;
    this.currentCols = showCols;
    this.selectedRows = rows + 1;
    this.selectedCols = cols + 1;
  }
}
</script>
<style>
.data-toolbar-table-selector .data-toolbar-table-selector-tr {
  display: flex;
  flex-wrap: nowrap;
}
.data-toolbar-table-selector
  .data-toolbar-table-selector-tr
  .data-toolbar-table-selector-td {
  width: 20px;
  height: 16px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-bottom: -1px;
  cursor: pointer;
}
.data-toolbar-table-selector
  .data-toolbar-table-selector-tr
  .data-toolbar-table-selector-td.actived {
  background: #ddefff;
}
.data-toolbar-table-selector .data-toolbar-table-selector-info {
  text-align: center;
}
</style>
