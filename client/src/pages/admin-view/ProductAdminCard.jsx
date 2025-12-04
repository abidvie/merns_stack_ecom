// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
// import { AiOutlineEdit } from 'react-icons/ai'; // Edit Icon
// import { RiDeleteBin6Line } from 'react-icons/ri'; // Delete Icon

// function ProductAdminCard({ product, onEdit, onDelete }) {
//   return (
//     <Card sx={{ maxWidth: 345, margin: '10px', boxShadow: 3,height:'100' }}>
//       {/* Product Image */}
//       <CardMedia
//         component="img"
//         height="10px"
//         image={product.image || 'https://via.placeholder.com/200'} // Placeholder image if none exists
//         alt={product.title}
//       />
//       <CardContent>
//         {/* Product Title */}
//         <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//           {product.title}
//         </Typography>

//         {/* Product Description */}
//         <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
//           {product.description}
//         </Typography>

//         {/* Product Price and Stock */}
//         <Box sx={{ marginTop: 2 }}>
//           <Typography variant="body1" color="primary">
//             Price: ${product.price}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             In Stock: {product.totalstock}
//           </Typography>
//         </Box>
//       </CardContent>

//       {/* Action Buttons */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
//         {/* Edit Button */}
//         <Button 
//           variant="outlined" 
//           color="primary" 
//           onClick={() => onEdit(product._id)} 
//           startIcon={<AiOutlineEdit />}
//         >
//           Edit
//         </Button>

//         {/* Delete Button */}
//         <Button 
//           variant="outlined" 
//           color="error" 
//           onClick={() => onDelete(product._id)} 
//           startIcon={<RiDeleteBin6Line />}
//         >
//           Delete
//         </Button>
//       </Box>
//     </Card>
//   );
// }

// export default ProductAdminCard;




import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { AiOutlineEdit } from 'react-icons/ai'; // Edit Icon
import { RiDeleteBin6Line } from 'react-icons/ri'; // Delete Icon

function ProductAdminCard({ product, onEdit, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345, margin: '10px', boxShadow: 3, height: 'auto' }}>
      {/* Product Image */}
      <CardMedia
        component="img"
        height="150"  // Reduced height for the image
        image={product.image || 'https://via.placeholder.com/200'} // Placeholder image if none exists
        alt={product.title}
      />
      <CardContent sx={{ paddingBottom: '16px' }}>  {/* Reduced bottom padding */}
        {/* Product Title */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          {product.title}
        </Typography>

        {/* Product Description */}
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontSize: '0.9rem' }}>
          {product.description}
        </Typography>

        {/* Product Price and Stock */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1" color="primary" sx={{ fontSize: '1rem' }}>
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            In Stock: {product.totalstock}
          </Typography>
        </Box>
      </CardContent>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px' }}>
        {/* Edit Button */}
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => onEdit(product._id)} 
          startIcon={<AiOutlineEdit />}
          sx={{ fontSize: '0.85rem', padding: '5px 10px' }}
        >
          Edit
        </Button>

        {/* Delete Button */}
        <Button 
          variant="outlined" 
          color="error" 
          onClick={() => onDelete(product._id)} 
          startIcon={<RiDeleteBin6Line />}
          sx={{ fontSize: '0.85rem', padding: '5px 10px' }}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
}

export default ProductAdminCard;
