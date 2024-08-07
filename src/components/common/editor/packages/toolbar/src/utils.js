export const autoGetHotkey = (engine, name, itemKey) => {
  const plugin = engine?.plugin.components[name]
  if (plugin && plugin.hotkey) {
    let key = plugin.hotkey();
    if (key) {
      if (Array.isArray(key)) {
        if (itemKey) {
          const index = key.findIndex(
            k => typeof k === "object" && k.args === itemKey
          );
          key = key[index > -1 ? index : 0]
        } else {
          key = key[0]
        }
      }
      if (typeof key === "object") {
        key = key.key;
      }
      return key;
    }
  }
}

/**
 * 是否支持字体
 * @param font 字体名称
 * @returns
 */
export const isSupportFontFamily = font => {
  if (typeof font !== "string") {
    console.log("Font name is not legal !")
    return false;
  }

  let width;
  const body = document.body;

  const container = document.createElement("span");
  container.innerHTML = Array(10).join("wi")
  container.style.cssText = [
    "position:absolute",
    "width:auto",
    "font-size:128px",
    "left:-99999px"
  ].join(" !important;")

  const getWidth = fontFamily => {
    container.style.fontFamily = fontFamily;
    body.appendChild(container);
    width = container.clientWidth;
    body.removeChild(container);

    return width;
  }

  const monoWidth = getWidth("monospace")
  const serifWidth = getWidth("serif")
  const sansWidth = getWidth("sans-serif")

  return (
    monoWidth !== getWidth(font + ",monospace") ||
    sansWidth !== getWidth(font + ",sans-serif") ||
    serifWidth !== getWidth(font + ",serif")
  )
}
