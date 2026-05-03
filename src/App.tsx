import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-navy-900 h-screen flex items-cneter justify-center'>
      <h1 className='text-fm-gold text-4xl font-bold'>
        FM React
      </h1>
    </div>
  )
}

export default App
