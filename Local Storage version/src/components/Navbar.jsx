import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between items-center p-2.5 h-18 bg-teal-400'>

<div className='hover:cursor-pointer text-2xl font-bold'>
      <div className='flex'> <span>&lt;</span> <h1>PassVault</h1><span>/&gt;</span></div>
</div>
<ul >
    <li className='flex justify-center space-x-4'>
         <button className='hover:underline border border-teal-600 bg-teal-900 text-white p-2' onClick={() => window.open("https://github.com", "_blank")}> Contribute on Github</button>
    </li>
</ul>
   </nav>
  )
}

export default Navbar
