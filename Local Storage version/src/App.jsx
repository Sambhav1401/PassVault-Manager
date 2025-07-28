import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/manager'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />

    
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"><Manager /></div>
    
    </>
  )
}

export default App
