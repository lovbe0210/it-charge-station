<template>
  <Dropdown trigger="click" :transfer="true" @on-click="onCommand">
    <div class="operation-warp">
      <span class="iconfont operate"></span>
    </div>
    <DropdownMenu slot="list">
      <DropdownItem name="举报">举报</DropdownItem>
      <DropdownItem name="删除">删除</DropdownItem>
      <DropdownItem name="复制">复制</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  export default {
    name: 'Operate',
    data() {
      return {
      }
    },
    props: {
      comment: {
        type: Object
      }
    },
    computed: {
      latest: {
        get() {
          return this.modelValue
        },
        set(value) {
          this.$emit('update:modelValue', value);
          this.$emit('sorted', value)
        }
      }
    },
    methods: {
      onCommand (command) {
        switch (command) {
          case 'remove':
            this.$emit('remove', this.comment)
            console.log(this.comment)
            break
          case 'report':
            this.$Message.success('举报成功: ' + this.comment.id)
            break
          case 'copy':
            this.copyToClipboard(this.comment.content)
            this.$Message.info('复制成功')
        }
      },
      copyToClipboard(content) {
        const textField = document.createElement('textarea');
        textField.innerText = content;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
      }
    }
  }
/*const emit = defineEmits<{
  (e: 'remove', comment: CommentApi): void
}>()*/

</script>

<style lang="less" scoped>
.el-dropdown {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
.operation-warp {
  font-size: 16px;
  color: #9499a0;
  cursor: pointer;
  position: relative;
}
.operation-warp:hover {
  color: #00aeec;
}
</style>
