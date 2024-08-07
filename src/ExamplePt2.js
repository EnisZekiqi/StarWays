import { useState,useEffect } from "react";
import Cookies from "js-cookie";

const ExamplePt2 = ({toggleChoosenNumber,toggleChoosenSlider}) => {

    const[selectedNumber,setSelectedNumber]=useState('')
    const [selectedSlider,setSelectedSlider]=useState('')

const submitNumber = ()=>{
    toggleChoosenNumber(selectedNumber)
}

const handleChangeNumber =(event)=>{
    setSelectedNumber(event.target.value)
}





const handleSliderChange=(event)=>{
    setSelectedSlider(event.target.value)
}


const submitSlider = (theOption)=>{
    toggleChoosenSlider(theOption)
}
    return ( 
        <div>
        <h1>Show numbers</h1>

        <select name="" id="" value={selectedNumber} onChange={handleChangeNumber}>
            <option value="1">1$</option>
            <option value="2">2$</option>
            <option value="3">3$</option>
            <option value="4">4$</option>
            <option value="5">5$</option>
            <option value="6">6$</option>
            <option value="7">7$</option>
        </select>
        <button onClick={submitNumber}>Show Number</button>


        <div className="flex flex-col">
            
        <button onClick={()=>submitSlider('option1')}>Option1</button>
        <button onClick={()=>submitSlider('option2')}>Option2</button>
        </div>
        </div>
     );
}
 
export default ExamplePt2;