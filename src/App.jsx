import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length,setLength] = useState(8)
  const [numberInclude,setNumberInclude] = useState(false)
  const [charInclude,setCharInclude] = useState(false)
  const [password,setPassword] = useState("")

  //useRef hook
  const pRef = useRef(null)

  const copyToClipboard = useCallback(() => {
    pRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXabcdefghijklmnopqrstuvwxyz"
    if(numberInclude) str +="0123456789"
    if(charInclude) str += "!@#$%^&*-_+=[]{}~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberInclude,charInclude,setPassword])

  useEffect(() => {
    passwordGenerator()
  },[length,charInclude,numberInclude,passwordGenerator])
  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <p className='text-white text-center my-3'>Password Generator</p>
        <div className='flex shadow rounded-lg overflow-hidden mb-4"'>
          <input
           type="text" 
           value={password} 
           className='outline-none px-3 py-1 w-full' 
           placeholder='Password' 
           readOnly
           ref={pRef}
           />
          <button 
          className='bg-blue-700 outline-none px-3 py-1 text-white shrink-0  hover:bg-violet-600 active:bg-violet-700 focus:ring-violet-300 '
          onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-3'>
          <div className='flex items-center gap-x-1 my-3 mr-2'>
            <input 
            type="range" 
            min={6} max={100}
            value={length} 
            className='cursor-pointer mr-1'
            onChange={e=>setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1 ml-1'>
              <input
               type="checkbox"
               value={numberInclude}
               id="numberInput"
               className='cursor-pointer'
               onChange={() => {setNumberInclude((prev) => !prev)} }
               />
              <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 ml-1'>
            <input 
            type="checkbox" 
            value={charInclude}
            id='characterInput'
            className='cursor-pointer'
            onChange={() => setCharInclude((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
       </div>
    </>
  )
}

export default App
