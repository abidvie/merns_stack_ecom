import { logoutuser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
const Logout=() => {

const dispatch = useDispatch();
const [message, setMessage] = useState("");
const handleLogout=async()=>{
      try {
        const result = await dispatch(logoutuser());
         console.log('Response log in logoutpage:', result); // Log the full result
        
        if (result.payload.success) {
            setMessage(result.payload.message);
        
        
            toast(result.payload.message);
          navigate('/auth/login'); 

        } else  {
          toast(result.payload.message);
            setMessage(result.error.message);
        }
    } catch (error) {
        // console.error('Error:', error);
         
       setMessage('Log out  failed');
    }    
     
}

    
    return (
     <button onClick={handleLogout} className="logout-btn">
           sdkjfsjdf
    </button>
      
    );
  } 
export default Logout;