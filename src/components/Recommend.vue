<template>
    <div>
      <List item-layout="vertical" :loading="loading">
        <ListItem v-for="item in data" :key="item.id">
          <ListItemMeta :title="item.title"/>
          {{ item.content }}
          <template slot="action">
            <!--图标-->
            <li>
              <Icon type="ios-star-outline" /> 123
            </li>
            <li>
              <Icon type="ios-thumbs-up-outline" /> 234
            </li>
            <li>
              <Icon type="ios-chatbubbles-outline" /> 345
            </li>
          </template>
          <template slot="extra" v-if="showImg">
            <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 200px">
          </template>
        </ListItem>
      </List>
    </div>
</template>

<script>
  export default {
    name: 'Recommend',
    data () {
      return {
        loading: false,
        showImg: true,
        data: [
          {
            id: '001',
            title: 'This is title 1',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '002',
            title: 'This is title 2',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '003',
            title: 'This is title 3',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
