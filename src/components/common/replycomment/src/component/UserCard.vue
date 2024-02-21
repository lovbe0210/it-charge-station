<template>
  <div class="settings" v-show="true" v-b-tooltip.hover.leftbottom.v-secondary>
    <span class="iconfont icon-colorful-setting"/>
  </div>



  <el-popover
    v-if="slots.card"
    placement="top"
    :width="300"
    :show-after="300"
    @before-enter="() => showInfo(uid, (v: any) => (userInfo = v))"
  >

    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
<!--  <template v-else>
    <slot />
  </template>-->
</template>

<script>
  import { ElPopover } from '~/element/popover'
  import { InjectContentBox, InjectContentBoxApi, InjectSlots } from '../../key'
  import InputBox from "./InputBox";
  import Operate from "./Operate";
  import UFold from "./Fold";
  import {dayjs} from "dayjs";

  export default {
  name: 'UserCard',
  data() {
    return {
      userInfo: {}
    }
  },
  props: {
    uid: {
      type: String
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    showInfo(uid) {
      this.$emit('showInfo', uid)
    }
  }
}

</script>

<style lang="less" scoped></style>
