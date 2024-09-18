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
const Home = () => {
    const [hasCopied, setHasCopied] = useState(false);

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
        <div className="container items-center lg:items-stretch px-10 mx-auto">
             <InfoIcon className="loginIcon" sx={{ marginLeft: '-25px', marginTop: '-45px', color:savedTheme === 'light'? '#26374a':'#a0b6cf',scale:'1.3',
                    filter: 'drop-shadow(0px 0px 6px #a0b6cf)'
                }}/>
               <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3 rounded-md p-3"
        style={{backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629'}}
        >
          <div className="grid-container">
            <img src={grid1} alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <div className="flex flex-col gap-3">
              <p className="grid-headtext font-semibold text-xl ">Hi, I’m Enis Zekiqi</p>
              <p className="grid-subtext" style={{color:savedTheme === 'light'?'#5e666e':'#d6d9dc'}}>
                Founder of the StarWays with 12 years of experience of social media apps and with high skill in both programing and managing company
              </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3 flex  items-center justify-center" 
        style={{backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629'}}>
          <div className="grid-container  flex flex-col items-center gap-8 justify-between">
                <div className="wrappersecurity ">
                    <div className="flex justify-around gap-4">
                        <div className="connect p-2 rounded-full"
                        style={{border:activeIcon === 'connect'  ? (savedTheme === 'light' ? '1px solid #26374a' : '1px solid #848c95') 
                            : (savedTheme === 'light' ? '1px solid #c2d0e0' : '1px solid #9fa5ac')}}
                         onClick={()=>setActiveIcon('connect')}
                         >
                            <GrConnect style={{width:'30px',height:'30px',color:activeIcon === 'connect'  ? (savedTheme === 'light' ? '#26374a' : '#848c95') 
                   : (savedTheme === 'light' ? '#c2d0e0' : '#9fa5ac'),transition:'color 0.5s linear'}}/>
                            </div>
                        <div className="secure p-2 rounded-full"
                        style={{border:savedTheme === 'light'? '1px solid #848c95':'1px solid #9fa5ac'}}
                        onClick={()=>setActiveIcon('secure')}>
                            <GrSecure  style={{width:'30px',height:'30px',color:savedTheme === 'light'? '#848c95':'#9fa5ac'}}/>
                            </div>
                    </div>
                    <div className="flex items-center justify-around gap-4 mt-1 mb-1">
                        <div className="fast p-2 rounded-full"
                         style={{border:savedTheme === 'light'? '1px solid #848c95':'1px solid #9fa5ac'}}
                         onClick={()=>setActiveIcon('fast')}
                        >  
                            <GrFastForward  style={{width:'30px',height:'30px',color:savedTheme === 'light'? '#848c95':'#9fa5ac'}}/>
                            </div>
                        <div className="wrapper rounded-full p-1" style={{backgroundColor:'#a0b6cf'}}>
                        <svg width='65px' viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z" fill="#26374a"></path><path d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z" fill="#26374a"></path></g></svg>
                        </div>
                        <div
                        className="layer p-2 rounded-full"
                        style={{border:savedTheme === 'light'? '1px solid #848c95':'1px solid #9fa5ac'}}
                        onClick={()=>setActiveIcon('layer')}
                        ><FaLayerGroup  style={{width:'30px',height:'30px',color:savedTheme === 'light'? '#848c95':'#9fa5ac'}}/></div>
                    </div>
                    <div className="flex justify-around gap-4">
                        <div
                         className="layer p-2 rounded-full"
                         style={{border:savedTheme === 'light'? '1px solid #848c95':'1px solid #9fa5ac'}}
                         onClick={()=>setActiveIcon('edit')}
                        ><GrEdit  style={{width:'30px',height:'30px',color:savedTheme === 'light'? '#848c95':'#9fa5ac'}}/></div>
                        <div
                         className="layer p-2 rounded-full"
                         style={{border:savedTheme === 'light'? '1px solid #848c95':'1px solid #9fa5ac'}}
                         onClick={()=>setActiveIcon('group')}
                        ><TiGroup  style={{width:'30px',height:'30px',color:savedTheme === 'light'? '#848c95':'#9fa5ac'}}/></div>
                    </div>
                </div>
                <div style={{display:activeIcon !== 'connect'? 'none':''}}>{activeIcon === 'connect' && <p>connect</p>}</div>
                <div style={{display:activeIcon !== 'secure'? 'none':''}}>{activeIcon === 'secure' && <p>secure</p>}</div>
                <div style={{display:activeIcon !== 'fast'? 'none':''}}>{activeIcon === 'fast' && <p>fast</p>}</div>
                <div style={{display:activeIcon !== 'layer'? 'none':''}}>{activeIcon === 'layer' && <p>layer</p>}</div>
                <div style={{display:activeIcon !== 'edit'? 'none':''}}>{activeIcon === 'edit' && <p>layer</p>}</div>
                <div style={{display:activeIcon !== 'group'? 'none':''}}>{activeIcon === 'group' && <p>layer</p>}</div>
            
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
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
              <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
              <p className="grid-subtext">I&apos;m based in Rjieka, Croatia and open to remote work worldwide.</p>
              <button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">adrian@jsmastery.pro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
           
                   
                    <div className="empty opacity-0">1</div>
                    <div className="empty opacity-0">1</div>
                    <div className="empty opacity-0">1</div>
        </div>
     );
}
 
export default Home;