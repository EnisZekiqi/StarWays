import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import UserForm from "./UserForm";
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';
import ustahi from './images/ustahi.jpg'
import Globe from 'react-globe.gl';
import grid1 from './images/grid1.png'
import { GrConnect } from "react-icons/gr";
import { GrSecure } from "react-icons/gr";
import { FaLayerGroup } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { GrFastForward } from "react-icons/gr";
import { TiGroup } from "react-icons/ti";
import { motion,AnimatePresence } from "framer-motion";
import grid4 from './images/grid4.png'
import grid3 from './images/grid3.png'
import copy from './images/copy.svg'
import tick from './images/tick.svg'
///Rating imports
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const Home = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const [rateMessage,setRateMessage]=useState(false)
    const [value, setValue] = useState(() => {
        // Retrieve initial rating from localStorage or default to 0 if none exists
        const savedValue = localStorage.getItem('rate');
        return savedValue ? JSON.parse(savedValue) : 0;
      });
      
      useEffect(() => {
        // Store the updated rating in localStorage whenever `value` changes
        const hasShownMessage = localStorage.getItem('hasShownRateMessage');

  if (!hasShownMessage) {
    // If the message has never been shown, show it once and mark it in localStorage
    setRateMessage(true);
    setTimeout(() => {
      setRateMessage(false);
      // After showing the message once, prevent it from showing again
      localStorage.setItem('hasShownRateMessage', 'true');
    }, 3000);
  }
      }, [value]);

    const handleCopy = () => {
      navigator.clipboard.writeText(' adrian@jsmastery.pro');
      setHasCopied(true);
  
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    };

    const [activeIcon,setActiveIcon]=useState('connect')

    const handleIconChane =(tab)=>{
        setActiveIcon(tab)
    }


    const savedTheme = localStorage.getItem('color') || 'light';

    return ( 
        <div id="information" className="container items-center lg:items-stretch px-10 mx-auto">
            <div className="hidden lg:block">
            <InfoIcon className="loginIcon hidden lg:block" sx={{ marginLeft: '-25px', marginTop: '-45px', color:savedTheme === 'light'? '#26374a':'#a0b6cf',scale:'1.3',
                    filter: 'drop-shadow(0px 0px 6px #a0b6cf)'
                }}/>
            </div>
               <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3 rounded-md p-3"
        style={{backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629'}}
        >
          <div className="grid-container">
            <img src={grid1} alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <div className="flex flex-col gap-3">
              <p className="grid-headtext font-semibold text-xl "   style={{color:savedTheme ==='light'?'#232629':'#c2d0e0'}}>Create Profile , join the community</p>
              <p className="grid-subtext font-light text-sm" style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}}>
                StarWays takes you closer to the world , to you friends and family , for that you need to <a href="/signin"> <b style={{color:savedTheme === 'light'?'#5e666e':'#d6d9dc'}}>Sign In</b></a>  and create an Account
              </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3 p-3 flex rounded-md items-center justify-center" 
        style={{backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629'}}>
          <div className="grid-container  flex flex-col items-center gap-8 justify-between">
                <div className="wrappersecurity ">
                    <div className="flex justify-around gap-4">
                        <div className="connect p-2 rounded-full"
                        style={{border:activeIcon === 'connect'  ? (savedTheme === 'light' ? '1px solid #26374a' : '1px solid #c2d0e0') 
                            : (savedTheme === 'light' ? '1px solid #848c95' : '1px solid #9fa5ac')}}
                         onClick={()=>setActiveIcon('connect')}
                         >
                            <GrConnect style={{width:'30px',height:'30px',color:activeIcon === 'connect'  ? (savedTheme === 'light' ? '#26374a' : '#c2d0e0') 
                   : (savedTheme === 'light' ? '#232629' : '#9fa5ac'),transition:'all 0.2s linear',opacity:activeIcon === 'connect'?'1':'0.6'}}/>
                            </div>
                        <div className="secure p-2 rounded-full"
                        style={{border:activeIcon === 'secure'  ? (savedTheme === 'light' ? '1px solid #26374a' : '1px solid #9fa5ac') 
                            : (savedTheme === 'light' ? '1px solid #848c95' : '1px solid #9fa5ac')}}
                        onClick={()=>setActiveIcon('secure')}>
                            <GrSecure   style={{width:'30px',height:'30px',color:activeIcon === 'secure'  ? (savedTheme === 'light' ? '#26374a' : '#c2d0e0') 
                   : (savedTheme === 'light' ? '#232629' : '#9fa5ac'),transition:'all 0.2s linear',opacity:activeIcon === 'secure'?'1':'0.6'}}/>
                            </div>
                    </div>
                    <div className="flex items-center justify-around gap-4 mt-1 mb-1">
                        <div className="fast p-2 rounded-full"
                         style={{border:activeIcon === 'fast'  ? (savedTheme === 'light' ? '1px solid #26374a' : '1px solid #9fa5ac') 
                            : (savedTheme === 'light' ? '1px solid #848c95' : '1px solid #9fa5ac')}}
                         onClick={()=>setActiveIcon('fast')}
                        >  
                            <GrFastForward  style={{width:'30px',height:'30px',color:activeIcon === 'fast'  ? (savedTheme === 'light' ? '#26374a' : '#c2d0e0') 
                   : (savedTheme === 'light' ? '#232629' : '#9fa5ac'),transition:'all 0.2s linear',opacity:activeIcon === 'fast'?'1':'0.6'}}/>
                            </div>
                        <div className="wrapper rounded-full p-1" style={{backgroundColor:'#a0b6cf'}}>
                        <svg width='65px' viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z" fill="#26374a"></path><path d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z" fill="#26374a"></path></g></svg>
                        </div>
                        <div
                        className="layer p-2 rounded-full"
                        style={{border:activeIcon === 'layer'  ? (savedTheme === 'light' ? '1px solid #26374a' : '1px solid #9fa5ac') 
                            : (savedTheme === 'light' ? '1px solid #848c95' : '1px solid #9fa5ac')}}
                        onClick={()=>setActiveIcon('layer')}
                        ><FaLayerGroup   style={{width:'30px',height:'30px',color:activeIcon === 'layer'  ? (savedTheme === 'light' ? '#26374a' : '#c2d0e0') 
                            : (savedTheme === 'light' ? '#232629' : '#9fa5ac'),transition:'all 0.2s linear',opacity:activeIcon === 'layer'?'1':'0.6'}}/></div>
                    </div>
                    <div className="flex justify-around gap-4">
                        <div
                         className="layer p-2 rounded-full"
                         style={{border:activeIcon === 'edit'  ? (savedTheme === 'light' ? '1px solid #26374a' : '1px solid #9fa5ac') 
                            : (savedTheme === 'light' ? '1px solid #848c95' : '1px solid #9fa5ac')}}
                         onClick={()=>setActiveIcon('edit')}
                        ><GrEdit  style={{width:'30px',height:'30px',color:activeIcon === 'edit'  ? (savedTheme === 'light' ? '#26374a' : '#c2d0e0') 
                            : (savedTheme === 'light' ? '#232629' : '#9fa5ac'),transition:'all 0.2s linear',opacity:activeIcon === 'edit'?'1':'0.6'}}/></div>
                        <div
                         className="layer p-2 rounded-full"
                         style={{border:activeIcon === 'group'  ? (savedTheme === 'light' ? '1px solid #26374a' : '1px solid #9fa5ac') 
                            : (savedTheme === 'light' ? '1px solid #848c95' : '1px solid #9fa5ac')}}
                         onClick={()=>setActiveIcon('group')}
                        ><TiGroup   style={{width:'30px',height:'30px',color:activeIcon === 'group'  ? (savedTheme === 'light' ? '#26374a' : '#c2d0e0') 
                            : (savedTheme === 'light' ? '#232629' : '#9fa5ac'),transition:'all 0.2s linear',opacity:activeIcon === 'group'?'1':'0.6'}}/></div>
                    </div>
                </div>
                <div style={{display:activeIcon !== 'connect'? 'none':''}}>{activeIcon === 'connect' && <AnimatePresence>
                    <motion.div
                initial={{opacity:0,y:-20}}
                animate={{opacity:1,y:0}}
                transition={{damping:20,duration:0.3}}
                exit={{opacity:0,y:-20}}
                >
                    <div className="flex flex-col gap-2 items-center">
                    <h1 className="font-semibold text-2xl"
                    style={{color:savedTheme ==='light'?'#232629':'#c2d0e0'}}
                    >Connect</h1>
                    <p className="px-2 text-center font-light text-sm"
                    style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}}
                    >Connect with your friends and family whenever you are whenever you want </p>
                    </div>
                    </motion.div>
                    </AnimatePresence>}
                    </div>
                <div style={{display:activeIcon !== 'secure'? 'none':''}}>{activeIcon === 'secure' && <motion.div
                  initial={{opacity:0,y:-20}}
                  animate={{opacity:1,y:0}}
                  transition={{damping:20,duration:0.3}}
                > <div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-2xl"
                style={{color:savedTheme ==='light'?'#232629':'#c2d0e0'}}
                >Secure</h1>
                <p className="px-2 text-center font-light text-sm"
                style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}}
                >Our System is very secure and very durable from inanimate threats </p>
                </div></motion.div>}</div>

                <div style={{display:activeIcon !== 'fast'? 'none':''}}>{activeIcon === 'fast' && <motion.div
                 initial={{opacity:0,y:-20}}
                 animate={{opacity:1,y:0}}
                 transition={{damping:20,duration:0.3}}
                ><div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-2xl"
                style={{color:savedTheme ==='light'?'#232629':'#c2d0e0'}}
                >Fast</h1>
                <p className="px-2 text-center font-light text-sm"
                style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}}
                >Fast responses on the messages fast responses to notify you what happend </p>
                </div></motion.div>}</div>

                <div style={{display:activeIcon !== 'layer'? 'none':''}}>{activeIcon === 'layer' && <motion.div
                 initial={{opacity:0,y:-20}}
                 animate={{opacity:1,y:0}}
                 transition={{damping:20,duration:0.3}}
                > <div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-2xl"
                style={{color:savedTheme ==='light'?'#232629':'#c2d0e0'}}
                >Multi Task</h1>
                <p className="px-2 text-center font-light text-sm"
                style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}}
                >All the shortcuts are for you to help multitask and do fast work if you are in a hurry </p>
                </div></motion.div>}</div>

                <div style={{display:activeIcon !== 'edit'? 'none':''}}>{activeIcon === 'edit' && <motion.div
                 initial={{opacity:0,y:-20}}
                 animate={{opacity:1,y:0}}
                 transition={{damping:20,duration:0.3}}
                > <div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-2xl"
                style={{color:savedTheme ==='light'?'#232629':'#c2d0e0'}}
                >Edit</h1>
                <p className="px-2 text-center font-light text-sm"
                style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}}
                >Costumize your profile with lots of options to choose and lots of privacy to select </p>
                </div></motion.div>}</div>

                <div style={{display:activeIcon !== 'group'? 'none':''}}>{activeIcon === 'group' && <motion.div
                 initial={{opacity:0,y:-20}}
                 animate={{opacity:1,y:0}}
                 transition={{damping:20,duration:0.3}}
                > <div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-2xl"
                style={{color:savedTheme ==='light'?'#232629':'#c2d0e0'}}
                >Groups</h1>
                <p className="px-2 text-center font-light text-sm"
                style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}}
                >You can search people explore our platform create new friends and much more </p>
                </div></motion.div>}</div>
            
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4 rounded-md" style={{backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629'}}>
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
              className="globi"
                height={295}
                width={295}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 40, lng: -100, text: 'Rjieka, Croatia', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <div className="flex flex-col gap-4">
              <li style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}} className="grid-headtext text-center px-2">Our current location is in Vushtrri,Kosovo and we would like to expand more</li>
              <li style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}} className="grid-subtext  text-center px-2">StarWays works for everyone and anywhere you are you have access to communicate</li>
              </div>
              <div className="flex flex-col items-center justify-center mt-6 mb-3">
              <h1 className="font-medium text-xl"
                style={{color:savedTheme ==='light'?'#232629':'#c2d0e0'}}
                >Rate Us</h1>
      <Rating
        name="simple-controlled"
        value={value}
        sx={{color:savedTheme==='light'?'#26374a':'#a0b6cf'}}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3" style={{backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629'}}>
          <div className="grid-container">
            <img src={grid3} alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2 rounded-md p-3"  style={{backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629'}}>
          <div className="grid-container">
            <img
              src={grid4}
              alt="grid-4"
              className="w-full md:h-[150px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
             
              <div className="copy-container flex justify-around items-center mt-0 md:mt-3 gap-2" onClick={handleCopy}>
                <img src={hasCopied ?  tick : copy} alt="copy" />
                <p className="lg:text-xl md:text-lg  text-gray_gradient font-light"
                style={{color:savedTheme === 'light'?'#848c95':'#9fa5ac'}}
                >Notify me for the next Update</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Snackbar
          open={rateMessage}
          sx={{ backgroundColor: '#a0cfa0', color: '#264a26', borderRadius: 15 }}
          autoHideDuration={6000}
          onClose={() => setRateMessage(false)}
        >
          <SnackbarContent
            sx={{ backgroundColor: '#a0cfa0', color: '#264a26', fontWeight: 500 }}
            message="Thank you for your rating"
          />
        </Snackbar>
                   
                    <div className="empty opacity-0">1</div>
                    <div className="empty opacity-0">1</div>
                    <div className="empty opacity-0">1</div>
        </div>
     );
}

 
export default Home;