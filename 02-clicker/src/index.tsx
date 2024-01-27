import { createRoot } from "react-dom/client"
import { App } from "./components/App"

const rootTag = document.getElementById("root")

if (!rootTag) {
  throw new Error('missing root container!')
}

const root = createRoot(rootTag)

root.render(<App />)
