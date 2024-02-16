<template>
  <el-dropdown trigger="click" @command="onCommand">
    <div class="operation-warp">
      <u-icon>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M586.624 234.624a74.624 74.624 0 1 1-149.184 0 74.624 74.624 0 0 1 149.12 0z m0 554.624a74.624 74.624 0 1 1-149.248 0 74.624 74.624 0 0 1 149.248 0zM512 586.624a74.624 74.624 0 1 0 0-149.248 74.624 74.624 0 0 0 0 149.248z"
            fill="currentColor"
          ></path>
        </svg>
      </u-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="report">举报</el-dropdown-item>
        <el-dropdown-item command="remove">删除</el-dropdown-item>
        <el-dropdown-item divided command="copy">复制</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
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
