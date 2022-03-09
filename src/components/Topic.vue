<template>
  <b-container fluid>
    <b-row class="header-row">
      <Dropdown trigger="click" :transfer="true" @on-click="sortBy">
        <a href="javascript:void(0)">
          {{sortedValue.at(curSort).name}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem v-for="item in sortedValue" :key="item.value" :selected="curSort === item.value"
                        :name="item.value">{{item.name}}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </b-row>
    <b-row class="topic-row">
      <b-card-group columns>
        <b-card
          title="我的标题可能比较长，可能会有两行"
          img-src="https://placekitten.com/g/400/450"
          img-alt="Image"
          img-top
        >
          <b-card-text>

          </b-card-text>
        </b-card>

        <b-card header="Quote">
          <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </b-card>

        <b-card title="Title" img-src="https://placekitten.com/500/350" img-alt="Image" img-top>
          <b-card-text>
            This card has supporting text below as a natural lead-in to additional content.
          </b-card-text>
          <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
        </b-card>

        <b-card bg-variant="primary" text-variant="white">
          <blockquote class="card-blockquote">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer>
              <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
            </footer>
          </blockquote>
        </b-card>

        <b-card>
          <b-card-title>Title</b-card-title>
          <b-card-text>
            This card has supporting text below as a natural lead-in to additional content.
          </b-card-text>
          <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
        </b-card>

        <b-card img-src="https://picsum.photos/400/400/?image=41" img-alt="Image" overlay></b-card>

        <b-card img-src="https://picsum.photos/400/200/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This card has even longer content than the first.
          </b-card-text>
          <template v-slot:footer>
            <small class="text-muted">Footer Text</small>
          </template>
        </b-card>
      </b-card-group>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'Topic',
    data() {
      return {
        curSort: 0,
        sortedValue: [
          {
            value: 0,
            name: "最多收藏"
          },
          {
            value: 1,
            name: "最多浏览"
          },
          {
            value: 2,
            name: "最新发布"
          }
        ]
      }
    },
    methods: {
      sortBy(val) {
        if (val !== this.curSort) {
          // 条件发生变化，更新list
          this.curSort = val
          alert('list刷新')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/topic.less";
  @import "./css/common-var";
</style>
