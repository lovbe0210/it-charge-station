<template>
  <!--<u-comment-scroll style="width: 820px; margin-left: 20px" :disable="disable" @more="more">

  </u-comment-scroll>-->
  <u-comment
    ref="commentRef"
    :config="config"
    relative-time
    page
    formDisabled
    :show-form="false"
    @submit="submit"
    @like="like"
    @reply-page="replyPage"
    @show-info="showInfo"
    @focus="focus"
    @mention-search="mentionSearchFn"
  >
    <!-- <template>导航栏卡槽</template> -->
    <!-- <template #header>头部卡槽</template> -->
    <!-- <template #info>信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <!-- <template #func>功能区域卡槽</template> -->
    <!--      <u-comment-nav v-model="latest" @sorted="sorted"></u-comment-nav>-->
    <!--<template #card="scope">-->
      <!--<el-skeleton :loading="loading" :throttle="200" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 50px; height: 50px; margin-bottom: 10px"/>
          <div>
            <el-skeleton-item variant="h3" style="width: 50%"/>
            <el-skeleton-item variant="text" style="margin-right: 16px"/>
            <el-skeleton-item variant="text" style="width: 30%"/>
          </div>
        </template>
        <template #default>
          <div class="user-card">
            <div class="user-avatar">
              <el-avatar style="margin-top: 5px" :size="40" fit="cover" :src="scope.avatar">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
              </el-avatar>
            </div>
            <div class="user-content">
              <div class="user-info">
                <a href="" class="username" target="_blank">
                  <span class="name" style="max-width: 10em">{{ scope.username }}</span>
                  <span blank="true" class="rank">
                    <u-icon size="24" v-html="useLevel(scope.level)"></u-icon>
                  </span>
                </a>
              </div>
              <div class="social-info">
                <a href="" class="attention">
                  <span>{{ scope.attention }}</span>
                  <span>关注</span>
                </a>
                <a href="" class="follower">
                  <span>{{ scope.follower }}</span>
                  <span>粉丝</span>
                </a>
                <a href="" class="like">
                  <span>{{ scope.like }}</span>
                  <span>获赞</span>
                </a>
              </div>
              <div class="card-btn">
                <el-button type="primary">关注</el-button>
                <el-button>发消息</el-button>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>-->
     <!-- <a-skeleton :loading="loading" active>
        <div class="user-card">
          <div class="user-avatar">
            <el-avatar style="margin-top: 5px" :size="40" fit="cover" :src="scope.avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
          </div>
          <div class="user-content">
            <div class="user-info">
              <a href="" class="username" target="_blank">
                <span class="name" style="max-width: 10em">{{ scope.username }}</span>
                <span blank="true" class="rank">
                      <u-icon size="24" v-html="useLevel(scope.level)"></u-icon>
                    </span>
              </a>
            </div>
            <div class="social-info">
              <a href="" class="attention">
                <span>{{ scope.attention }}</span>
                <span>关注</span>
              </a>
              <a href="" class="follower">
                <span>{{ scope.follower }}</span>
                <span>粉丝</span>
              </a>
              <a href="" class="like">
                <span>{{ scope.like }}</span>
                <span>获赞</span>
              </a>
            </div>
            <div class="card-btn">
              <el-button type="primary">关注</el-button>
              <el-button>发消息</el-button>
            </div>
          </div>
        </div>
      </a-skeleton>-->

   <!-- </template>-->
    <!--<template #operate="scope">
      <Operate :comment="scope" @remove="remove"/>
    </template>-->
  </u-comment>
</template>

<script>
  // import UCommentScroll from "./CommentScroll";
  import UComment from "./Comment"
  // import UCommentNav from "./CommentNav"
  // import Operate from "./Operate"
  import {createObjectURL} from "@/utils/emoji";
  import {usePage} from "@/utils/hooks";
  // 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases/tag/v0.0.0
  // static文件放在public下,引入emoji.ts文件可以移动assets下引入,也可以自定义到指定位置
  import emoji from "@/assets/emoji/emoji.js";
  import {dayjs} from 'dayjs';
  import {getComment, reply, commentSize} from '@/assets/emoji/comment';

  const baseUserArr = [
    {
      userId: 1,
      userName: '张三',
      userAvatar: 'https://gd-hbimg.huaban.com/cba6c7af94997ba172c32bbe668794553f29e91ef26f-qnroJ7_fw240webp'
    },
    {
      userId: 2,
      userName: '李四',
      userAvatar: 'https://gd-hbimg.huaban.com/d01263d11d07748a2193bbbdd3b9a0c8a4b062b9f39d-PKvV2t_fw240webp'
    },
    {
      userId: 3,
      userName: '王五',
      userAvatar: 'https://gd-hbimg.huaban.com/69d92bfbf36fc111e1f563403311e7943628c9fc108bf-6l34Pa_fw240webp'
    },
    {
      userId: 4,
      userName: '赵六',
      userAvatar: 'https://gd-hbimg.huaban.com/7f5c54a455f61f431ec1f7b7c0e583f4a725fb73adba-5DgU3q_fw240webp'
    },
    {
      userId: 5,
      userName: '孙七',
      userAvatar: 'https://gd-hbimg.huaban.com/edea85f44f3f8bce8d094ed78f390164a9eba229cb2e-1Lc22F_fw240webp'
    },
    {
      userId: 6,
      userName: '周八',
      userAvatar: 'https://gd-hbimg.huaban.com/c1b2131c6977e01a430d6575ba678a4afeabcad222605-UJUwwb_fw240webp'
    },
    {
      userId: 7,
      userName: '吴九',
      userAvatar: 'https://gd-hbimg.huaban.com/4942e77078bda39a458980049b528236bf79183814998-zVzEJv_fw240webp'
    },
    {
      userId: 8,
      userName: '郑十',
      userAvatar: 'https://gd-hbimg.huaban.com/628236086a2ca12d2074bdd29f496f38a4d0c06ae50f-Rj3vsO_fw240webp'
    },
    {
      userId: 9,
      userName: '王富贵',
      userAvatar: 'https://gd-hbimg.huaban.com/0108a6b65d211d3bc602bc0431e84b31f9e62ac08015f-JifENm_fw240webp'
    },
    {
      userId: 10,
      userName: '赵富贵',
      userAvatar: 'https://gd-hbimg.huaban.com/d9643d6181d506ccc159a940e11bdc6b9a2b53ae57139-pxAnk9_fw240webp'
    }
  ];

  export default {
    name: 'Full',
    data() {
      return {
        tempId: 100,
        // 当前页数
        pageNum: 2,
        // 页大小
        pageSize: 1,
        // 评论总数量
        total: commentSize,
        // 用户信息是否加载
        loading: false,
        // 是否禁用滚动加载评论
        disable: false,
        latest: true,
        config: {
          user: {
            id: 0,
            username: '',
            avatar: '',
            // 评论id数组 建议:存储方式用户id和文章id和评论id组成关系,根据用户id和文章id来获取对应点赞评论id,然后加入到数组中返回
            likeIds: []
          },
          emoji: emoji,
          comments: [],
          mentionConfig: {
            userArr: [
              {
                userId: 1,
                userName: '张三',
                userAvatar: 'https://gd-hbimg.huaban.com/cba6c7af94997ba172c32bbe668794553f29e91ef26f-qnroJ7_fw240webp'
              },
              {
                userId: 2,
                userName: '李四',
                userAvatar: 'https://gd-hbimg.huaban.com/d01263d11d07748a2193bbbdd3b9a0c8a4b062b9f39d-PKvV2t_fw240webp'
              },
              {
                userId: 3,
                userName: '王五',
                userAvatar: 'https://gd-hbimg.huaban.com/69d92bfbf36fc111e1f563403311e7943628c9fc108bf-6l34Pa_fw240webp'
              },
              {
                userId: 4,
                userName: '赵六',
                userAvatar: 'https://gd-hbimg.huaban.com/7f5c54a455f61f431ec1f7b7c0e583f4a725fb73adba-5DgU3q_fw240webp'
              },
              {
                userId: 5,
                userName: '孙七',
                userAvatar: 'https://gd-hbimg.huaban.com/edea85f44f3f8bce8d094ed78f390164a9eba229cb2e-1Lc22F_fw240webp'
              },
              {
                userId: 6,
                userName: '周八',
                userAvatar: 'https://gd-hbimg.huaban.com/c1b2131c6977e01a430d6575ba678a4afeabcad222605-UJUwwb_fw240webp'
              },
              {
                userId: 7,
                userName: '吴九',
                userAvatar: 'https://gd-hbimg.huaban.com/4942e77078bda39a458980049b528236bf79183814998-zVzEJv_fw240webp'
              },
              {
                userId: 8,
                userName: '郑十',
                userAvatar: 'https://gd-hbimg.huaban.com/628236086a2ca12d2074bdd29f496f38a4d0c06ae50f-Rj3vsO_fw240webp'
              },
              {
                userId: 9,
                userName: '王富贵',
                userAvatar: 'https://gd-hbimg.huaban.com/0108a6b65d211d3bc602bc0431e84b31f9e62ac08015f-JifENm_fw240webp'
              },
              {
                userId: 10,
                userName: '赵富贵',
                userAvatar: 'https://gd-hbimg.huaban.com/d9643d6181d506ccc159a940e11bdc6b9a2b53ae57139-pxAnk9_fw240webp'
              }
            ],
            userIdKey: 'userId',
            userNameKey: 'userName',
            userAvatarKey: 'userAvatar',
            show: true,
            mentionColor: '#1e80ff',
            showAvatar: true,
            isLoading: true
          }
        }
      }
    },
    components: {
      // UCommentScroll,
      UComment
      // UCommentNav,
      // Operate
    },
    methods: {
      // 请求获取用户详细信息
      showInfo(uid, finish) {
        console.log(this.loading.value)
        this.loading.value = true
        console.log('获取用户信息: ' + uid)
        let userInfo
        setTimeout(() => {
          userInfo = {
            id: String(uid),
            username: '落🤍尘' + uid,
            avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
            level: 6,
            like: 36011,
            attention: 15,
            follower: 6878
          }
          this.loading.value = false
          finish(userInfo)
        }, 200)
      },
      // 提交评论事件
      submit(content, parentId, file, finish, reply, mentionList) {
        let str = '提交评论:' + content + ';\t父id: ' + parentId + ';\t图片:' + file + ';\t被回复评论:' + reply +
          ';\t提及列表:' + JSON.stringify(mentionList)
        console.log(str)
        /**
         * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
         */
        let contentImg = file?.map(e => createObjectURL(e)).join('||')

        this.tempId += 1
        const comment = {
          id: this.tempId,
          parentId: parentId,
          uid: this.config.user.id,
          address: '来自江苏',
          content: content,
          likes: 0,
          createTime: dayjs().subtract(5, 'seconds').toString(),
          contentImg: contentImg,
          user: {
            username: this.config.user.username,
            avatar: this.config.user.avatar,
            level: 6,
            homeLink: `/${this.tempId}`
          },
          reply: null
        }
        setTimeout(() => {
          console.log(comment)
          finish(comment)
          // UToast({message: '评论成功!', type: 'info'})
          this.$Message.success('评论成功!')
        }, 200)
      },
      // 点赞按钮事件
      like(id, finish) {
        console.log('点赞: ' + id)
        setTimeout(() => {
          finish()
        }, 200)
      },

      // 评论框焦点事件
      focus() {
        console.log('评论框焦点事件')
      },
      // 删除评论
      remove(comment) {
        setTimeout(() => {
          this.$refs.commentRef.value?.remove(comment)
        }, 200)
      },
      //回复分页
      replyPage({parentId, pageNum, pageSize, finish}) {
        let tmp = {
          total: reply.total,
          list: usePage(pageNum, pageSize, reply.list)
        }
        console.log('回复分页')
        setTimeout(() => {
          finish(tmp)
        }, 200)
      },
      // 加载更多评论
      more() {
        console.log(this.disable)
        if (this.pageNum <= Math.ceil(this.total / this.pageSize)) {
          setTimeout(() => {
            this.config.comments.push(...getComment(this.pageNum, 1))
            this.pageNum++;
          }, 200)
        } else {
          this.disable = true
        }
      },
      mentionSearchFn(keyword) {
        if (this.config && this.config.mentionConfig) {
          this.config.mentionConfig.isLoading = true
        }
        if (!keyword) {
          setTimeout(() => {
            if (this.config && this.config.mentionConfig) {
              this.config.mentionConfig.userArr = baseUserArr
            }
          }, 1000)

          if (this.config && this.config.mentionConfig) {
            this.config.mentionConfig.isLoading = false
          }
          return
        }
        setTimeout(() => {
          if (this.config && this.config.mentionConfig) {
            this.config.mentionConfig.userArr = baseUserArr.filter(e => {
              return e.userName.includes(keyword)
            })
          }
          if (this.config && this.config.mentionConfig) {
            this.config.mentionConfig.isLoading = false
          }
        }, 1000)
      },
      sorted(latest) {
        console.log(latest)
      }
    },
    mounted() {
      // 初始化评论列表
      this.config.comments = getComment(1, 10);
      setTimeout(() => {
        const user = {
          id: 1,
          username: 'user',
          avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
          // 评论id数组 建议:存储方式用户id和文章id和评论id组成关系,根据用户id和文章id来获取对应点赞评论id,然后加入到数组中返回
          likeIds: [1, 2, 3]
        }
        this.config.user = user
      }, 100)

      setTimeout(() => {
        this.config.user.likeIds = [2, 3]
      }, 5000)
    }
  }
</script>

<style lang="less" scoped>
  .user-card {
    display: flex;

    .user-content {
      flex: 1;
      margin-left: 16px;

      .user-info {
        .username {
          display: flex;
          align-items: center;
          text-decoration: none;

          .name {
            max-width: 100px;
            font-weight: 500;
            font-size: 15px;
            color: #252933;
            line-height: 32px;
            margin-right: 4px;
          }
        }
      }

      .social-info {
        font-size: 12px;
        margin-bottom: 10px;

        a {
          text-decoration: none;
        }

        a:not(:first-child) {
          margin-left: 18px;
        }

        a span:last-child {
          margin-left: 3px;
          color: #9499a0;
        }
      }
    }
  }
</style>
