import React, { useState } from 'react';

const DualRangeSlider = () => {
  const [range, setRange] = useState([0, 100]);

  const handleSliderChange = (event : any) => {
    const { name, value } = event.target;

    setRange((prevRange) => ({
      ...prevRange,
      [name]: parseInt(value, 10),
    }));
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={range[0]}
        onChange={handleSliderChange}
        name="0"
      />
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={range[1]}
        onChange={handleSliderChange}
        name="1"
      />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <span style={{ marginRight: '10px' }}>Min: {range[0]}</span>
        <span>Max: {range[1]}</span>
      </div>
    </div>
  );
};

export default DualRangeSlider;
