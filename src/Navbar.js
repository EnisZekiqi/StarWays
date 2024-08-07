import { useState,useEffect } from "react";
import Cookies from "js-cookie";

import Test from './Test'
const Navbar = ({ theme, updateTheme }) => {
    
    const savedTheme = localStorage.getItem('color') || 'light';

    const colors ={
    css:{
        borderBottom:theme  ==='light' ? '2px solid #dddfe2' : '2px solid #3b3f45'
    }
}
const fill ={
    css:{
        fill:theme  ==='light' ? ' #c2d0e0' : ' #7e9cbe'
    }
}

    return ( 
        <div>
            <div style={colors.css} className="flex justify-between items-center">
            <div className="wrapper" style={{backgroundColor:'#a0b6cf'}}>
            <svg width='55px' viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z" fill="#26374a"></path><path d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z" fill="#26374a"></path></g></svg>
            </div>
                <div className="flex gap-3 items-center pr-2">
                    
                    <Test   updateTheme={updateTheme}/>
                    <a href="/signin" className="font-medium">
                        Sign Up
                    </a>
                    
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;