import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import UserForm from "./UserForm";
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
const Home = () => {

    const savedTheme = localStorage.getItem('color') || 'light';
    return ( 
        <div>
           <div className="flex justify-around items-center ">
           <div className="flex justify-start flex-col gap-10 container items-center lg:items-stretch px-10 mx-auto">
                <div className="lg:w-2/3 flex flex-col items-start">
                    <div className="flex items-center">
                    <div className="starterLine h-1 w-8 -ml-3.5 rounded-t-sm"
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
                    <div className="starterLine h-32 lg:h-48 w-2 -ml-3.5 -mt-4 lg:-mt-14 rounded-t-sm"
                    style={{background: savedTheme === 'light' ? '#26374a':'#a0b6cf'}}
                    />
                    <h1 className="text-4xl lg:text-7xl font-extrabold mt-2"
                    style={{color:savedTheme === 'light'?'rgb(35, 38, 41)':'rgb(251, 251, 251)'}}
                    >Welcome to the Newest Platform <b className="vv"
                    style={{color:savedTheme==='light'?'#7e7ebe':"#c2c2e0"}}
                    >StarWays</b></h1>
                    </div>
                </div>
              <div className="flex gap-6 w-full ">
              <div className="flex flex-col ">
              <div className="starterLine h-48 w-1 -ml-3.5 -mt-12 lg:-mt-24 rounded-t-sm"
                    style={{background: savedTheme === 'light'
                        ? 'linear-gradient(to bottom, #26374a 0%, rgba(38, 55, 74, 0.2) 100%)'
                        : 'linear-gradient(to bottom, #a0b6cf 0%, rgba(160, 182, 207, 0.1) 80%)',
                        filter: 'blur(0.5px)'
                    }}
                    /> 
                <LoginIcon className="loginIcon" sx={{ marginLeft: '-27px', marginTop: '15px',  color:savedTheme === 'light'? '#26374a':'#a0b6cf',scale:'1.3',
                    filter: 'drop-shadow(0px 0px 6px #a0b6cf)'
                }} />
                <div className="starterLine h-48 w-1 -ml-3.5 mt-3.5 rounded-t-sm"
                    style={{background: savedTheme === 'light'? '#26374a':'#a0b6cf'
                    }}
                    /> 
                    <div className="starterLine h-48 w-1 -ml-3.5 mt-4.5 rounded-t-sm"
                    style={{background: savedTheme === 'light'
                        ? 'linear-gradient(to bottom, #26374a 0%, rgba(38, 55, 74, 0.2) 100%)'
                        : 'linear-gradient(to bottom, #a0b6cf 0%, rgba(160, 182, 207, 0.1) 80%)',
                      
                    }}
                    /> 
              </div>
                <div className=" w-full md:w-2/5 login">
                   <UserForm/>
                </div>
               
              </div>
              <div className="">
             
               
              </div>
            </div>
         
           </div>
        
        </div>
     );
}
 
export default Home;