import { useState } from 'react'

import "@/App.css"
import { Input } from './components/ui/input'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <section id="spacer" className='bg-amber-300'> 
        
      </section>
      <div><Input></Input></div>
    </>
  )
}

export default App
