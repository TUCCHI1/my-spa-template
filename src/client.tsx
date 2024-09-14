
import { createRoot } from "react-dom/client"
import { useState } from "react"

function App() {
  return (
    <>
      <h1>Hello, Hono with React!</h1>
      <h2>Example of useState()</h2>
      <Counter />
      <h2>Example of API fetch()</h2>
      <ClockButton />
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  return <button type="button" onClick={() => setCount(count + 1)}>You clicked me {count} times</button>
}

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null)

  const handleClick = async () => {
    const response = await fetch("api/clock")
    const data = await response.json()
    const headers = Array.from(response.headers.entries()).reduce((acc: { [key: string]: string }, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {})
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data
    }
    setResponse(JSON.stringify(fullResponse, null, 2))
  }

  return (
    <>
      <button type="button" onClick={handleClick}>Get Server Time</button>
      <pre>{response}</pre>
    </>
  )
}

const domNode = document.getElementById("root")
if (domNode) {
  const root = createRoot(domNode)
  root.render(<App />)
} else {
  console.error("Root element not found")
}
