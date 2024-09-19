import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import UserForm from "./UserForm";
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const Home = () => {

    const savedTheme = localStorage.getItem('color') || 'light';

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: savedTheme ==='light'? '#fbfbfb' : 'rgb(35, 38, 41)',
        color: savedTheme ==='light'? '#232629' : '#fbfbfb',
       border: savedTheme ==='light'?'1px solid #3b3f45':'1 px solid #dddfe2',
       borderRadius:'10px',
       overflowY:'auto',
        p: 4,
      };

const [logInModal,setLogInModal] =useState(false)

    return ( 
        <div>
           <div className="flex justify-around items-center ">
           <div className="flex justify-start flex-col gap-10 container items-center lg:items-stretch px-10 mx-auto">
                <div className="lg:w-2/3 flex flex-col items-start">
                    <div className="flex items-center justify-center md:justify-stretch w-full">
                    <div className="starterLine hidden lg:block h-1 w-8 -ml-3.5 rounded-t-sm"
                    style={{backgroundColor:savedTheme === 'light' ? '#26374a':'#a0b6cf'}}
                    />
                    <div className="wrapper2 px-1"
                    style={{border:savedTheme === 'light'? '2px solid #dddfe2':'2px solid #3b3f45',
                        backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629',
                        color:savedTheme === 'light'?'rgb(35, 38, 41)':'#fbfbfb',
                        borderRadius:'10px'
                    }}
                    >
                        Trusted by 5,000+ Users
                    </div>
                    </div>
                    <div className="flex items-center gap-3.5">
                    <div className="starterLine  hidden lg:block h-32 lg:h-48 w-2 -ml-3.5 -mt-4 lg:-mt-14 rounded-t-sm"
                    style={{background: savedTheme === 'light' ? '#26374a':'#a0b6cf'}}
                    />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold lg:font-extrabold mt-2 text-center lg:text-start"
                    style={{color:savedTheme === 'light'?'rgb(35, 38, 41)':'rgb(251, 251, 251)'}}
                    >Welcome to the Newest Platform <b className="vv"
                    style={{color:savedTheme==='light'?'#7e7ebe':"#c2c2e0"}}
                    >StarWays</b></h1>
                    </div>
                </div>
              <div className="flex gap-6 w-full h-fit">
              <div className="flex flex-col ">
              <div className="starterLine  hidden lg:block h-48 w-1 -ml-3.5 -mt-12 lg:-mt-24 rounded-t-sm"
                    style={{background: savedTheme === 'light'
                        ? 'linear-gradient(to bottom, #26374a 0%, rgba(38, 55, 74, 0.2) 100%)'
                        : 'linear-gradient(to bottom, #a0b6cf 0%, rgba(160, 182, 207, 0.1) 80%)',
                        filter: 'blur(0.5px)'
                    }}
                    /> 
                <div className="hidden lg:block">
                <LoginIcon className="loginIcon hidden lg:block" sx={{ marginLeft: '-27px', marginTop: '15px',  color:savedTheme === 'light'? '#26374a':'#a0b6cf',scale:'1.3',
                    filter: 'drop-shadow(0px 0px 6px #a0b6cf)'
                }} />
                </div>
                <div className="starterLine  hidden lg:block h-48 w-1 -ml-3.5 mt-3.5 rounded-t-sm"
                    style={{background: savedTheme === 'light'? '#26374a':'#a0b6cf'
                    }}
                    /> 
                    <div className="starterLine  hidden lg:block h-24 w-1 -ml-3.5 mt-4.5 rounded-t-sm"
                    style={{background: savedTheme === 'light'
                        ? 'linear-gradient(to bottom, #26374a 0%, rgba(38, 55, 74, 0.2) 100%)'
                        : 'linear-gradient(to bottom, #a0b6cf 0%, rgba(160, 182, 207, 0.1) 80%)',
                      
                    }}
                    /> 
              </div>
                <div className="hidden md:block w-full lg:w-2/5 h-fit  login">
                   <UserForm/>
                </div>
                <div className="flex w-full items-center gap-3 justify-center md:hidden">
                    <button onClick={()=>setLogInModal(true)} className="rounded-md p-1.5 text-sm font-semibold"
                    style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45'}}
                    >Log In</button>
                    <button className="rounded-md p-1.5 text-sm font-semibold"
                    style={{color:savedTheme === 'light'?'#26374a':'#a0b6cf'}}
                    >Learn more</button>
                </div>
               
              </div>
              <div className="">
              <Modal
  open={logInModal}
  onClose={() => setLogInModal(false)}
>
  <Box sx={style}>
    <h2 className="mb-6 font-bold text-2xl">Log In</h2>
    <UserForm/>
  </Box>
</Modal>
               
              </div>
            </div>
         
           </div>
        
        </div>
     );
}
 
export default Home;