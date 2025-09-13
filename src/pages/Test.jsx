import React, { useState } from 'react'

const Test = () => {
    const [color, setColor] = useState('#ffffff');
    const [showPicker, setShowPicker] = useState(false);
  
    const handleColorChange = (e) => {
      setColor(e.target.value);
    };
  
    const handleButtonClick = () => {
      setShowPicker(!showPicker);
    };
  
    const handlePickerClose = () => {
      setShowPicker(false);
    };
  
  return (
    <div style={{minHeight:"500px", marginTop:"100px"}}>
    <button onClick={event => { { handleButtonClick; } }}>Pick Color</button>
    {showPicker && (
      <div>
        <input type="color" value="{color}" onChange={event => { { handleColorChange; } }} />
        <button onClick={event => { { handlePickerClose } }}>Close</button>
      </div>
    )}
    <div style={{ backgroundcolor: color, width: '100px', height: '100px', marginTop: '10px', border:"2px solid red" }} />
  </div>
  )
}

export default Test