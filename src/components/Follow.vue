<template>
  <b-container fluid>
      <div v-if="1">
        <b-avatar-group overlap="0.65">
          <Button ghost type="text" style="outline:none;">
            <span class="iconfont icon-left disabled"/>
          </Button>
          <b-link href="#some-link" v-for="item in creators" :key="item.id">
            <b-avatar :src="item.avatar">
              <span v-if="1" class="iconfont icon-avatar-man" style="font-size:1.8rem;"></span>
              <div class="c-badge" v-if="1"></div>
            </b-avatar>
            <p style="width:62px;font-size:12px;">{{item.nickName}}</p>
          </b-link>
          <Button ghost type="text" disabled><span class="iconfont icon-right"></span></Button>
        </b-avatar-group>
      </div>
      <div v-else>去 <b-link>发现</b-link> 优秀的创作者
      </div>
    <b-row>
      <div v-if="0"></div>
      <div v-else>暂无动态更新，先去 <b-link>推荐</b-link> 看看</div>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'Follow',
    data () {
      return {
        creators: [
          {
            id: '001',
            avatar: require('@/assets/avatar/01.jpg'),
            level: '6',
            nickName: '昵称多的字数需要限制',
            tag: ['自我驱动', '坚持不懈', '目标大厂', '年薪百万']
          },
          {
            id: '002',
            avatar: 'https://tvax4.sinaimg.cn/large/718153f4gy1gxuwa18v4jj20m80rsqa3.jpg',
            level: '0',
            nickName: 'lovbe0210',
            tag: ['创新', '原创']
          },
          {
            id: '003',
            avatar: require('@/assets/avatar/03.jpg'),
            level: '5',
            nickName: 'lovbe0210',
            tag: ['全栈', '用心写文']
          },
          {
            id: '004',
            avatar: require('@/assets/avatar/02.jpg'),
            level: '2',
            nickName: 'lovbe0210',
            tag: ['前段', '用心写文']
          }
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/follow.less";
</style>
