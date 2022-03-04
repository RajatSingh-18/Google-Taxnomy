import { useState } from "react";

function Bill(){
    const[units,setUnits]=useState(0)
    const[value,setValue]=useState(0)
    function calculate(e){
    setUnits(e.target.value)
    if(units==50){
        setValue(units)
    }

    }
    console.log(units)
    return(
        <>
<h1>{value}</h1>
<input type="number" value={units} onChange={calculate}></input>
</>
    )
}export default Bill;