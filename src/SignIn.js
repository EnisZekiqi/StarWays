import Navbar from "./Navbar";
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import Test2 from './Test2'
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Test from './Test'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const SignIn = () => {
    const [theme, setTheme] = useState('light');
 


  
    const [description,setDescription]=useState('')
    const [month, setMonth] = useState('');
      const [day, setDay] = useState('');
      const [year, setYear] = useState('');
      const [gender, setGender] = useState('');
//// state of the description,month,year,gender

      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const days = Array.from({ length: 31 }, (_, i) => i + 1); // Array for days 1-31
      const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
      ////// arrays fro teh day month and years 


    const [open, setOpen] = useState(false); //// snackbar opener 
   
    const [userError,setUserError]=useState(false) //// same username attempt

    useEffect(() => {
      const savedTheme = localStorage.getItem('color') || 'light';
      setTheme(savedTheme);
    }, []);
  
    const updateTheme = (choosenTheme) => {
      setTheme(choosenTheme);
      localStorage.setItem('color', choosenTheme);
    };
  
    const colors = {
      css: {
        borderBottom: theme === 'light' ? '2px solid #dddfe2' : '2px solid #3b3f45'
      }
    };
  
    const styles = {
      input: {
        margin: '10px 0',
        padding: '10px',
        width: '100%',
        borderRadius: '4px',
        border: `1px solid ${theme === 'light' ? '#ccc' : '#444'}`,
        backgroundColor: theme === 'light' ? '#fbfbfb' : '#232629',
        color: theme === 'light' ? '#232629' : '#fbfbfb'
      },
      button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#a0b6cf',
        color: '#26374a',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        fontWeight: 600
      },
      form: {
        backgroundColor: theme === 'light' ? '#fbfbfb' : '#232629',
        border: theme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
        padding: '20px',
        borderRadius: '5px'
      }
    };
  

  

    const navigate = useNavigate();
  
    const mutation = useMutation((newUser) => {
      return axios.post('/db.json', newUser);
    });
  
    const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]); // Local state to store users
  const [error, setError] = useState('');
  const [nicknameLong,setNicknameLong]=useState('')
  const [descriptionLong,setDescriptionLong]=useState('')
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nickname.trim() === '' || password.trim() === '' || description.trim() === '') {
      setError('Please fill out all fields.');
      return;
    }

    if (nickname.length > 12) {
      setNicknameLong('Username should have 12 letters');
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 3000);
      return;
    }
    if (description.length > 15) {
      setDescriptionLong('Description should have 12 letters');
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 3000);
      return;
    }

    try {
      // 1. Fetch the current users
      const response = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users', {
       
      });

      // Log the response to see its structure
      console.log('API response:', response.data);

      // 2. Add the new user to the table
      const newUser = {
        nickname,
        password,
        description,
        birth_month: month, // Change to match your database schema
        birth_day: day, // Change to match your database schema
        birth_year: year, // Change to match your database schema
        gender,
        avatar: '', // Add avatar logic if needed
        is_private: false // Or whatever default you want
      };

      // 3. Create the user via POST request
      await axios.post('https://66edb996380821644cddd154.mockapi.io/api/users', 
        newUser,
        
      );

      localStorage.setItem('user', JSON.stringify(newUser));

      // Navigate to the main page or show a success message
      setTimeout(() => {
        navigate('/main');
      }, 2000);

    } catch (error) {
      console.error('Error saving user:', error);
      setError('Failed to save the user');
    }
  };
  
  



  const [anchorEl, setAnchorEl] = useState(null);

const open1 = Boolean(anchorEl);

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  


    return ( 
        <div style={{backgroundColor:theme === 'light'?'#fbfbfb':'#18191b'}} className="h-fit ">
             <div>
            <div style={colors.css} className="flex justify-between items-center ">
           <a href="/">
           <div className="wrapper" style={{backgroundColor:'#a0b6cf'}}>
            <svg width='55px' viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z" fill="#26374a"></path><path d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z" fill="#26374a"></path></g></svg>
            </div>
           </a>
                <div className="flex gap-3 items-center pr-2">
                <a href="/" className="font-medium"
                    style={{color:theme === 'light' ? '#232629':'#fbfbfb'}}
                    >
                     Go Back
                    </a>
                <Button
        id="basic-button"
        aria-controls={open1 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick}
        className="flex items-center"
        style={{ minWidth: 'auto', padding: 0 }}
      >
        <MenuIcon sx={{color:theme==='light'?'#232629':'#fbfbfb',zIndex:1000}}/>

      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open1}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            marginTop: '-40px', // Adjust to space between button and menu
            padding:'10px',
            zIndex: 120, // Ensure the menu appears above other content
        color:theme==='light'?'#232629':'#fbfbfb',backgroundColor:theme==='light'?'#fbfbfb':'#232629',
        border:theme==='light'?'1px solid #dddfe2':'1px solid #3b3f45',borderRadius:'10px'
          },
        }}
      >
        <Test updateTheme={updateTheme}/>
      <a href="#information" ><MenuItem sx={{fontFamily:'"Inter", sans-serif'}} className="menuItem" onClick={handleClose}>Information</MenuItem></a>  
      
      </Menu>
                   
                    
                </div>
            </div>
        </div>
        <div className="empty2 -mt-5"/>
        <h1 style={{
          marginBottom:5,marginTop:'-15px', color: theme === 'light' ? '#232629' : '#fbfbfb'
        }} className="font-bold text-xl md:text-2xl text-center">Create an account for free</h1>
       <div className="w-full flex items-center justify-center ">
       <div className="flex flex-col items-center justify-center md:w-1/2 px-4 pb-6 pt-4"
        style={{backgroundColor:theme === 'light' ? '#fbfbfb':'#232629',
          border:theme === 'light '? '1px solid #dddfe2':'1px solid #dddfe2',
          borderRadius:'10px'
        }}
        > 
         <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4" >
        <div className="flex justify-around gap-3 flex-col md:flex-row">
        <input
          type="text"
          placeholder="Username"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={styles.input}
        />
         <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          
        />
        </div>
        <div className="flex md:hidden items-center justify-center h-0.5 w-full px-6"
        style={{backgroundColor:theme=== 'light'?'#5e666e':'#d6d9dc',opacity:0.6}}
        ></div>
        <select style={styles.input} value={month} onChange={(e) => setMonth(e.target.value)} required>
        <option value="">Select Month</option>
        {months.map((m, index) => <option key={index} value={m}>{m}</option>)}
      </select>
      
      <select style={styles.input} value={day} onChange={(e) => setDay(e.target.value)} required>
        <option value="">Select Day</option>
        {days.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>
      
      <select style={styles.input} value={year} onChange={(e) => setYear(e.target.value)} required>
        <option value="">Select Year</option>
        {years.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>

      {/* Gender Selector */}
      <select style={styles.input} value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input type="text" style={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
         <button type="submit" style={styles.button}>
         {loading ?
            <div className='justify-center flex items-center gap-2'>
              <div className="loader" style={{backgroundColor:'#26374a'}}/>
              <p>Siggin In</p>
            </div> : 'Sign In'}
         </button>
         </form>
        </div>
       </div>
       <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={userError ? 'This username already exists' : error}
      
      />
       <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={nicknameLong ? 'Nickname must have 12 letters max' : error}
      
      />
       <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={descriptionLong ? 'Description must have 15 letters max' : error}
      
      />
      <div className="empty3 "></div>
        </div>
     );
}
 
export default SignIn;