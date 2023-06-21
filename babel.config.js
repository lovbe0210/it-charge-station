module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // ViewUI组件的按需引入
  'plugins': [
    ['import', {'libraryName': 'view-design', 'libraryDirectory': 'src/components'}, "view"],
    ["import", {"libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css"}, "ant"]
  ]
}
