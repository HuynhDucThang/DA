import React, { useState } from "react";
import Slider from "react-slider";
import "./slider.css";

interface IProps {
  min: number;
  max: number;
  values: number[];
  handleChange: (newValues: number[]) => void;
}

export default function SliderC({ min, max, values, handleChange }: IProps) {
  //   const [values, setValues] = useState([0, 100]);
  const handleOnChange = (newValues: number[]) => handleChange(newValues);

  return (
    <>
      <Slider
        className="slider"
        value={values}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <label htmlFor="minPrice">Giá tối thiểu:</label>
            <input
              type="number"
              id="minPrice"
              value={values[0]}
              onChange={(e) => handleOnChange([+e.target.value, values[1]])}
            />
          </div>
          <div>
            <label htmlFor="maxPrice">Giá tối đa:</label>
            <input
              type="number"
              id="maxPrice"
              value={values[1]}
              onChange={(e) => handleOnChange([values[0], +e.target.value])}
            />
          </div>
        </div>
      </div>
    </>
  );
}
