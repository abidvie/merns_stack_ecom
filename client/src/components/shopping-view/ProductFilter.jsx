


import './productfilter.css';
import React, { useState } from 'react';

export default function ProductFilter({selectedBrands,selectedCategories,setSelectedBrands,setSelectedCategories,handle_selecteSubmit}) {
  // Set initial state for categories and brands
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedBrands, setSelectedBrands] = useState([]);

  // Handle category checkbox changes
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Handle brand checkbox changes
  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    setSelectedBrands((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Function to handle form submission or getting the selected values
  // const handle_selecteSubmit = () => {
  //   console.log("Selected Categories:", selectedCategories);
  //   console.log("Selected Brands:", selectedBrands);
  // };

  return (
    <>
    <div >
        <div className="filter-column">
      <h2>Filters</h2>

      <div className="filter-section">
        <p className="filter-title">Category</p>
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              value="Men"
              onChange={handleCategoryChange}
            />
            Men
          </label>
          <label>
            <input
              type="checkbox"
              value="Women"
              onChange={handleCategoryChange}
            />
            Women
          </label>
          <label>
            <input
              type="checkbox"
              value="Kids"
              onChange={handleCategoryChange}
            />
            Kids
          </label>
          <label>
            <input
              type="checkbox"
              value="Accessories"
              onChange={handleCategoryChange}
            />
            Accessories
          </label>
          <label>
            <input
              type="checkbox"
              value="Footwear"
              onChange={handleCategoryChange}
            />
            Footwear
          </label>
        </div>
      </div>

      <div className="filter-section">
        <p className="filter-title">Brand</p>
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              value="Nike"
              onChange={handleBrandChange}
            />
            Nike
          </label>
          <label>
            <input
              type="checkbox"
              value="Adidas"
              onChange={handleBrandChange}
            />
            Adidas
          </label>
          <label>
            <input
              type="checkbox"
              value="Puma"
              onChange={handleBrandChange}
            />
            Puma
          </label>
          <label>
            <input
              type="checkbox"
              value="Levi's"
              onChange={handleBrandChange}
            />
            Levi's
          </label>
          <label>
            <input
              type="checkbox"
              value="Zara"
              onChange={handleBrandChange}
            />
            Zara
          </label>
          <label>
            <input
              type="checkbox"
              value="H&M"
              onChange={handleBrandChange}
            />
            H&M
          </label>
        </div>
      </div>

      <button onClick={handle_selecteSubmit} class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
  Submit Filters
</button>

    </div>

    </div>
    </>
  );
}







