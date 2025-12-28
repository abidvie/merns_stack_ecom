// import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';



// export default function SortBy() {
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 2, minWidth: 100} }>
//         <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
//         <Select
//           labelId="demo-simple-select-autowidth-label"
//           id="demo-simple-select-autowidth"
//           value={age}
//           onChange={handleChange}
//           autoWidth
//           label="Age"
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={21}>Twenty one</MenuItem>
//           <MenuItem value={22}>Twenty one and a half</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// }










// import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// export default function SortBy({ onSortChange }) {
//   const [sortOption, setSortOption] = React.useState('');

//   // Handle change in sort option
//   const handleChange = (event) => {
//     const value = event.target.value;
//     setSortOption(value);

//     // Trigger the callback to parent component with the selected sort option
//     onSortChange(value);
//   };

//   return (
//     <div className="sortby-container  bg-amber-700">
//       <FormControl sx={{ m: 1, minWidth: 200,height:'10px' }}>
//         <InputLabel id="sort-select-label">Sort By</InputLabel>
//         <Select
//           labelId="sort-select-label"
//           id="sort-select"
//           value={sortOption}
//           onChange={handleChange}
//           label="Sort By"
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value="price_asc">Price: Low to High</MenuItem>
//           <MenuItem value="price_desc">Price: High to Low</MenuItem>
//           <MenuItem value="rating">Highest Rated</MenuItem>
//           <MenuItem value="popularity">Most Popular</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// }












import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SortBy({ onSortChange }) {
  const [sortOption, setSortOption] = React.useState('');

  // Handle change in sort option
  const handleChange = (event) => {
    const value = event.target.value;
    setSortOption(value);

    // Trigger the callback to parent component with the selected sort option
    // onSortChange(value);
    console.log(value);
  };

  return (
    <div className="sortby-container">
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        {/* Adjust InputLabel height */}
        <InputLabel 
        
          id="sort-select-label"
          sx={{ top: '-6px', // Adjusts label position (moves it up)
            left: '5px', fontSize: '12px', paddingTop: '0px' }} // Reduces the height of the label
        >
        Sort By
        </InputLabel>
        
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortOption}
          onChange={handleChange}
          label="Sort By"
          sx={{

            height: '30px',        // Adjust height of the select dropdown
            fontSize: '12px',      // Adjust font size inside the select
            padding: '5px 10px',   // Control padding inside the select
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="price_asc">Price: Low to High</MenuItem>
          <MenuItem value="price_desc">Price: High to Low</MenuItem>
          <MenuItem value="rating">Highest Rated</MenuItem>
          <MenuItem value="popularity">Most Popular</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
