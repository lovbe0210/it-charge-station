import container from "markdown-it-container"
import { encodeCardValue } from "@aomao/engine"

export default function mkLightblock(md) {
  const defaultValue = {
    borderColor: "#fed4a4",
    backgroundColor: "#fff5eb",
    text: "light-block"
  }

  md.use(container, "tip", {
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return `<div data-type="lightblock" data-value="${encodeCardValue(
          defaultValue
        )}">`
      } else {
        return "</div>"
      }
    }
  })
}
