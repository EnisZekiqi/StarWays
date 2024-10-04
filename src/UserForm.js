import React, { useState,useEffect } from 'react';
import { useMutation, useQueryClient,useQuery  } from 'react-query';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import { useNavigate  } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const UserForm = ({ }) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [description,setDescription]=useState('')
  const [open, setOpen] = useState(false); //// snackbar opener 
  const [error, setError] = useState('');
  const [userError,setUserError]=useState(false) //// same username attempt
  const [loading, setLoading] = useState(false);
  const [isVisible,setIsVisible]=useState(false)


  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
  
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate =useNavigate()
  

  const fetchUsers = async () => {
    const { data } = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users', {
      
    });
    return data.record.users || [];
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch users from MockAPI
      const { data } = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');
  
      // Find the user by nickname and password
      const user = data.find((u) => u.nickname === nickname && u.password === password);
  
      if (user) {
        setLoading(true);
        Cookies.set('isAuthenticated', 'true', { expires: 10 });
  
        // Update the user object to reflect the online status
        const updatedUser = { ...user, isUserOnline: true };
  
        // Send a PUT request to update the user in MockAPI
        await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${user.id}`, updatedUser);
  
        // Store the updated user with the online status in localStorage
        localStorage.setItem('onlineStatus', JSON.stringify({ userId: user.id, online: true }));
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        // Navigate to the main page
        setTimeout(() => {
          navigate('/main');
        }, 2000);
      } else {
        setError('Invalid username or password');
      }
  
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  

const savedTheme = localStorage.getItem('color') || 'light';


const styles = {
  form: {
    backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#232629',
    border:savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
    padding: '20px',
    borderRadius: '5px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width:'100%',
    borderRadius: '4px',
    border: `1px solid ${savedTheme === 'light' ? '#ccc' : '#444'}`, // Input border color based on the theme
    backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#232629', // Input background color based on the theme
    color: savedTheme === 'light' ? '#232629' : '#fbfbfb', // Input text color based on the theme
  },
  button: {
    padding: '14px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: savedTheme === 'light' ? '#a0b6cf' : '#a0b6cf', // Button color based on the theme
    color: '#26374a',
    cursor: 'pointer',
    fontSize: '16px',
    width:'100%',
    fontWeight:700
  }
};




  return (
   
    <div className=''>
        <form className='flex flex-col items-center' style={styles.form} onSubmit={handleLogin}>
       
      <div className='w-full'>
       
        <input
          type="text"
          placeholder="Username"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={styles.input}
        />
      </div>
      <div className='w-full'>
        <div htmlFor="" className='relative'>
        <div onClick={()=> setIsVisible(prevMode => !prevMode)}>
       {isVisible ?  <VisibilityIcon className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500'/> :  <VisibilityOffIcon className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500'/>}
        </div>
    <input
          type={isVisible ? "text" :"password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        </div>
      </div>
      

     <div className='w-full justify-center flex items-center'>
     <button style={styles.button} type="submit">
            {loading ?
            <div className='justify-center flex items-center gap-2'>
              <div className="loader" style={{backgroundColor:'#26374a'}}/>
              <p>Loggin In</p>
            </div> : 'Log In'}
          </button>
     </div>
     
    </form>
    
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={userError ? 'This username already exists' : error}
      />
      <div className="empty"></div>
    </div>
  );
};

export default UserForm;
