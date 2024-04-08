<template>
  <div class="layout-module_feature-note">
    <div class="hot-list">
      <a href="/post/7353484906532995135" class="article-item-link" target="_blank" v-for="index in 10" :key="index">
        <div class="article-item-wrap">
          <div class="article-item-left">
            <div class="article-number article-number-1">
              1
            </div>
            <div class="article-detail">
              <div title="下一代 CSS 框架：Mojo CSS" class="article-title">
                下一代 CSS 框架：Mojo CSS
              </div>
              <div class="article-author">
                <a href="/user/3468339576581548" class="article-author-name" target="_blank">
                  <b-avatar src=""></b-avatar>
                  <span class="article-author-name-text">FED实验室</span>
                </a>
                <div class="author-text">
                  8.3k 浏览
                </div>
                <div class="author-text">
                  82 评论
                </div>
                <div class="author-text">
                  67 收藏
                </div>
              </div>
            </div>
          </div>
          <div class="article-right article-small-right">
            <Button>
              <span>收藏</span>
            </Button>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FeaturedNotes",
    data() {
      return {}
    }
  }
</script>

<style scoped type="less">
  .article-item-link {
    display: inline-block;
    padding: 0;
    margin: 0;
    width: 100%;

    .article-item-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      padding: 1.33rem 1rem;
      border-radius: 4px;
      cursor: pointer;

      .article-item-left {
        display: flex;
        flex-direction: row;
        min-width: 300px;

        .article-number {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 2rem;
          margin-right: 1.66rem;
          min-width: 2rem;
          text-align: center;
          flex-shrink: 0;
        }

        .article-number-1, .article-number-2, .article-number-3 {
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-family: Archivo;
          font-size: 1.66rem;
        }

        .article-number-1 {
          background: linear-gradient(180deg, #f64242 10%, rgba(246, 66, 66, .4) 40%);
        }



        .article-detail {
          display: flex;
          flex-direction: column;
          max-width: 400px;
          min-width: 300px;
        }
      }

      .article-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        width: 21rem;
        flex-shrink: 0;
      }
    }
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: #909090;
  }
</style>
