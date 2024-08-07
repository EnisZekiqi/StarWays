import { useState } from "react";


const Example = ({toggleText}) => {



    const [inputValue,setInputValue]=useState('')

    const handleChange=(event)=>{
      setInputValue(event.target.value)
    }
    
    
    const submitText = ()=>{
      toggleText(inputValue)
      setInputValue('')
      localStorage.setItem('text',inputValue)
    }

    return ( 
        <div>
            <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Enter new text" 
      />
      <button onClick={submitText}>Change Text</button>
        </div>
     );
}
 
export default Example;