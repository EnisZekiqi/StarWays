import Navbar from "./Navbar";
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import Test2 from './Test2'
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [theme, setTheme] = useState('light');
 


    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [description,setDescription]=useState('')
    const [month, setMonth] = useState('');
      const [day, setDay] = useState('');
      const [year, setYear] = useState('');
      const [gender, setGender] = useState('');


    const [open, setOpen] = useState(false); //// snackbar opener 
    const [error, setError] = useState('');
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
  
    const AddUser = async (user) => {
      try {
        const response = await axios.post('http://localhost:5000/users', user);
        return response.data;
      } catch (err) {
        if (err.response && err.response.status === 409) {
          throw new Error('This username already exists');
        }
        throw err;
      }
    };

    const handleUserSignUp = (newUser) => {
      const storedUsers = localStorage.getItem('users');
      const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Add the new user to the array
      usersArray.push(newUser);
      
      // Save the updated array back to localStorage
      localStorage.setItem('users', JSON.stringify(usersArray));
  };


    const navigate = useNavigate();
  
    const mutation = useMutation((newUser) => {
      return axios.post('http://localhost:5000/users', newUser);
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!nickname || !password || !month || !day || !year || !gender || !description) {
        setError('Please fill out all fields');
        return;
      }
  
      const newUser = {
        nickname,
        password,
        birthday: `${month}/${day}/${year}`,
        gender,
        description
      };
  
      mutation.mutate(newUser, {
        onSuccess: () => {
          navigate('/main');
          Cookies.set('Demo','true')
          
        },
        onError: (err) => {
          if (err.response && err.response.status === 409) {
            setUserError(true);
            setOpen(true);
          } else {
            setError('An error occurred. Please try again.');
            setOpen(true);
          }
        }
      });
    };


    return ( 
        <div style={{backgroundColor:theme === 'light'?'#fbfbfb':'#18191b'}} className="h-fit md:h-screen">
             <div>
            <div style={colors.css} className="flex justify-between items-center ">
           <a href="/">
           <div className="wrapper" style={{backgroundColor:'#a0b6cf'}}>
            <svg width='55px' viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z" fill="#26374a"></path><path d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z" fill="#26374a"></path></g></svg>
            </div>
           </a>
                <div className="flex gap-3 items-center pr-2">
                    
                    <Test2   updateTheme={updateTheme}/>
                    <a href="/signin" className="font-medium"
                    style={{color:theme === 'light' ? '#232629':'#fbfbfb'}}
                    >
                        Sign Up
                    </a>
                    
                </div>
            </div>
        </div>
        <div className="empty2"/>
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
        <div className="flex justify-around gap-3 flex-col md:flex-row">
        <input
            type="text"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={styles.input}
          />
           <input
            type="text"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            style={styles.input}
          />
            <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={styles.input}
          />
        </div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={styles.input}
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />
         <button type="submit" style={styles.button}>Sign In</button>
         </form>
        </div>
       </div>
       <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={userError ? 'This username already exists' : error}
      />
      <div className="empty3 block md:hidden"></div>
        </div>
     );
}
 
export default SignIn;