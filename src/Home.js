import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import UserForm from "./UserForm";
const Home = () => {

    const savedTheme = localStorage.getItem('color') || 'light';
    return ( 
        <div>
            <div className="flex justify-around container items-center px-4 mx-auto">
                <div className="w-1/2 flex flex-col items-start">
                    <div className="wrapper2 px-1"
                    style={{border:savedTheme === 'light'? '2px solid #dddfe2':'2px solid #3b3f45',
                        backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629',
                        color:savedTheme === 'light'?'rgb(35, 38, 41)':'#fbfbfb',
                        borderRadius:'10px'
                    }}
                    >
                        Trusted by 5,000+ Users
                    </div>
                    <h1 className="text-6xl font-extrabold mt-2"
                    style={{color:savedTheme === 'light'?'rgb(35, 38, 41)':'rgb(251, 251, 251)'}}
                    >Welcome to the Newest Platform <b className="vv"
                    style={{color:savedTheme==='light'?'#7e7ebe':"#c2c2e0"}}
                    >StarWays</b></h1>
                    <p></p>
                </div>
                <div className="w-1/3 login">
                   <UserForm/>
                </div>
            </div>
        </div>
     );
}
 
export default Home;