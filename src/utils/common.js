export default {
  /**
   * 主题刷新
   * @param themProperty
   */
  flushCustomerSet (themProperty) {
    let styleProperty =
      `--background-img: ${themProperty.backgroundImg};` +
      `--background-color: ${themProperty.backgroundColor};` +
      `--theme-color: ${themProperty.themColor};` +
      `--font-color: ${themProperty.fontColor};` +
      `--title-color: ${themProperty.titleColor};`
    document.querySelector(':root').setAttribute('style', styleProperty)
  }
}
