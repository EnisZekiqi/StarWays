import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import Test from "./Test";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaBullseye } from "react-icons/fa6";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import axios from 'axios';

const Main = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [posts, setPosts] = useState([]);
    const [highlight, setHighlight] = useState('Not Highlighted');

    const toggleHighlight = (highlight) => {
      setHighlight(highlight);
    };

    const handleAddPost = (feeling, text, highlight) => {
      const newPost = { feeling, text, highlight, id: Date.now() };
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };
  
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCloseLogOut = () => {
        setAnchorEl(null);
        Cookies.set('isAuthenticated', 'false')
      };
///////Sidebar functions  /////
const [activeTab, setActiveTab] = useState('home');

const handleTabChange = (tab) => {
  setActiveTab(tab);
  setEditProfile(false)
};
const [editProfile,setEditProfile]=useState(false)

const handleGoBack = ()=>{
  setEditProfile(false)
  setActiveTab('profile')
}

const toggleEdit =(tab)=>{
  setEditProfile(true)
  setActiveTab(tab)
}

useEffect(() => {
  if (activeTab ==='light'|| 'search'||'explore'||'messages'||'notification'||'create') {
    setEditProfile(false)
  }
}, ['home','search','explore','messages','notification','create']);

    const [user, setUser] = useState(null);
    const [theme,setTheme]=useState('light')
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    }, []);
  

    
    if (!user) {
      return <div>Loading user data...</div>;
    }

  
    
      const savedTheme = localStorage.getItem('color') || 'light';

    const colors ={
        css:{
            borderBottom:savedTheme  ==='light' ? '2px solid #dddfe2' : '2px solid #3b3f45',
            backgroundColor: savedTheme === 'light' ? '#eff0f1' : '#18191b',
            color: savedTheme === 'light' ? '#000000' : '#ffffff',
          
        } ,
    
    }

    
  const updateTheme = (choosenTheme) => {
    setTheme(choosenTheme);
    localStorage.setItem('color', choosenTheme);
  };


  //////menu function .////
  const themeClass = savedTheme === 'light' ? 'light-theme' : 'dark-theme';

  const getItemClass = (tab) => (
    `cursor-pointer flex gap-2 items-center sidebar-item ${activeTab === tab ? 'active' : ''}`
  );


  ///profile adjustmens props ////
 

  return (
    <div className="flex " style={{ backgroundColor: savedTheme === 'light' ? '#eff0f1' : '#18191b',height:'100vh',overflowY:'auto' }}>
      {/* Sidebar */}
      <div className={`fixed flex flex-col justify-around  pl-3 ${themeClass}`} style={{ width: '20%', height: '100vh', backgroundColor: savedTheme === 'light' ? '#eff0f1' : '#18191b',
        borderRight:savedTheme=== 'light'?'1px solid #dddfe2':'1px solid #3b3f45',color:savedTheme==='light'?'#232629':'#fbfbfb'
       }}>
        <h1 className="font-bold text-xl " style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }}>StarWays</h1>
        <div onClick={() => handleTabChange('home')} id="home" className={getItemClass('home')}>
        <HomeIcon />
        <p>Home</p>
      </div>
        <div onClick={() => handleTabChange('search')} id="search" className={getItemClass('search')}>
            <SearchIcon/>
            <p>Search</p>
        </div>
        <div onClick={() => handleTabChange('explore')} id="explore"
         className={getItemClass('explore')}>
            <ExploreIcon/>
            <p>Explore</p>
        </div>
        <div onClick={() => handleTabChange('messages')} id="message" 
         className={getItemClass('messages')}>
            <QuestionAnswerIcon/>
            <p>Messages</p>
        </div>
        <div onClick={() => handleTabChange('notification')} id="notifi"
         className={getItemClass('notification')}>
            <NotificationsIcon/>
            <p>Notification</p>
        </div>
        <div onClick={() => handleTabChange('create')} id="add"
        className={getItemClass('create')}>
            <AddCircleIcon/>
            <p>Create</p>
        </div>
        <div onClick={() => handleTabChange('profile')} id="profile" className={getItemClass('profile')}>
        <Avatar sx={{width:'30px',height:'30px'}} alt={user.nickname}src={user.avatar || ''} />
            <p>Profile</p>
        </div>
        <div className="relative flex gap-2 items-center mt-2 cursor-pointer sidebar-item">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="flex items-center"
        style={{ minWidth: 'auto', padding: 0 }}
      >
        <MenuIcon sx={{color:savedTheme==='light'?'#232629':'#fbfbfb'}}/>
        <p className="ml-2 special" style={{color:savedTheme==='light'?'#232629':'#fbfbfb'}}>Menu</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            marginTop: '-40px', // Adjust to space between button and menu
            padding:'10px',
            zIndex: 1200, // Ensure the menu appears above other content
        color:savedTheme==='light'?'#232629':'#fbfbfb',backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',
        border:savedTheme==='light'?'1px solid #dddfe2':'1px solid #3b3f45',borderRadius:'10px'
          },
        }}
      >
        <Test updateTheme={updateTheme}/>
        <MenuItem sx={{fontFamily:'"Inter", sans-serif'}} className="menuItem" onClick={handleClose}>My account</MenuItem>
        <MenuItem sx={{fontFamily:'"Inter", sans-serif'}} className="menuItem" onClick={handleCloseLogOut}><a href="/">Log Out</a></MenuItem>
      </Menu>
    </div>
      </div>

      {/* Main content */}
      <div className="flex-1" style={{ marginLeft: '25%', padding: '16px' }}>
      {activeTab === 'profile' && !editProfile && (
        <Profile  user={user} posts={posts}  handleGoBack={handleGoBack} toggleEdit={toggleEdit} />
      )}
      {editProfile && (
        <EditProfile handleGoBack={handleGoBack} />
      )}
        {activeTab === 'home' && <div>Home Content</div>}
        {activeTab === 'search' && <div>Search Content</div>}
        {activeTab === 'explore' && <div>Explore Content</div>}
        {activeTab === 'messages' && <div>Messages Content</div>}
        {activeTab === 'notification' && <div>Notification Content</div>}
        {activeTab === 'create' &&   <Create highlight={highlight} toggleHighlight={toggleHighlight} user={user} handleAddPost={handleAddPost} />}
      </div>
      
    </div>
  );
}
 
const Profile =({handleGoBack,toggleEdit,posts})=>{
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [theme,setTheme]=useState('light')
  const [editProfile,setEditProfile]=useState(false)





  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));

    }
   
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }


 

  const savedTheme = localStorage.getItem('color') || 'light';


  return(
   <div style={{ color:savedTheme==='light'?'#232629':'#fbfbfb',marginTop:30}}>
    <div className="flex gap-6 items-center">
    <Avatar sx={{width:'125px',height:'125px'}} alt={user.nickname} src={user.avatar || ''}/>
   <div className="flex flex-col gap-3">
   <div className="flex gap-3">
    <h1 className="font-medium text-xl"> {user.nickname}</h1>
    <button onClick={()=>toggleEdit('editProfile')} className="font-ligt text-sm px-1"
    style={{backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',borderRadius:'10px',
      border:savedTheme==='light'?'1px solid #dddfe2':'1px solid #3b3f45',
      color:savedTheme==='light'?'#232629':'#fbfbfb',
    }}
    >Edit Profile</button>
   </div>
    <div className="flex items-center gap-6">
    <p>{posts.length} Posts</p>
    <p>friends</p>
    </div> 
    <p>Description: {user.description}</p> 
   </div>
    </div>

    <div className="flex justify-center w-full mt-8 gap-4"
    style={{borderTop:savedTheme==='light'?'1px solid #dddfe2':'1px solid #3b3f45'}}
    >
    <div className="flex justify-center mt-6 gap-6">
      <div className="flex  gap-2 items-center justify-center">
    <DynamicFeedIcon/>
    <p>Posts</p>
    </div>
    <div className="flex gap-2">
      <BookmarkIcon/>
      <p>Saved</p>
    </div>
    </div>
    </div>
    
        
    <div className="posts mt-4">
        {posts.map((post) => (
          <div key={post.id} className="post p-4 mb-4"  style={{
            backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
            borderRadius: '5px',
            border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
          }}>
            {post.highlight === 'Highlighted' &&
            <div className="high font-semibold text-xs p-1 w-fit -ml-4 -mt-4"
            style={{backgroundColor:'#a0b6cf',color:'#26374a'}}
            >Highlighted</div>
            }
            <p><strong>Feeling:</strong> {post.feeling}</p>
            <p>{post.text}</p>
          </div>
        ))}
        <div className="emtpy3 opacity-0">111</div>
      </div>

        {editProfile && 
        <EditProfile />
        }
   </div>
  )
}

const EditProfile = ({handleGoBack})=>{
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null); //// avatar image 
  
  const [password, setPassword] = useState('');
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));

    }
  }, []);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const updatedUser = { ...user, avatar: reader.result };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Send updated user data to the server
      await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSaveChanges = async () => {
    const updatedUser = { ...user, password };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
  };
  if (!user) {
    return <div>Loading user data...</div>;
  }
  const savedTheme = localStorage.getItem('color') || 'light';

  return (
    <div className="flex gap-14 w-full" style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb', marginTop: 30 }}>
      <div className="cursor-pointer h-fit" onClick={handleGoBack} style={{ color: savedTheme === 'light' ? '#5e666e' : '#d6d9dc' }}>
        <ArrowBackIosNewIcon />
      </div>
      <div className="flex flex-col w-3/4">
        <div className="flex justify-between items-center gap-4 p-4" style={{ backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#232629', borderRadius: '10px' }}>
         <div className="flex gap-4">
         <Avatar sx={{ width: '55px', height: '55px' }} alt={user.nickname} src={user.avatar || ''} />
          <div className="flex flex-col">
            <h1 className="font-medium text-lg"> {user.nickname}</h1>
            <p className="font-light text-md" style={{ color: savedTheme === 'light' ? '#5e666e' : '#d6d9dc' }}>
              {user.description}
            </p>
          </div>
         </div>
          <input
            accept="image/*"
           
            id="contained-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="contained-button-file">
            <button className="px-2 font-medium" style={{ backgroundColor: savedTheme === 'light' ? '#A0B6CF' : '#A0B6CF', color:savedTheme === 'light' ? '#26374a' : '#26374a' , borderRadius: '5px' }} component="span">Change Photo</button>
          </label>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-col gap-2">

          <p className="font-light"> Description</p>
            <input
              type="text"
              name="description"
              value={user.description}
              onChange={handleInputChange}
              className="p-2"
              style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px' }}
            />
          </div>
          
          <div className="flex flex-col gap-2">
          <p className="font-light">Gender</p>
           
          <select
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
              className="p-2"
              style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px' }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <p className="font-extralight text-xs">This won't be part of your public profile</p>
          </div>
         
          <p className="font-semibold mt-4 text-lg">Account settings</p>
          <p className="font-light mt-2">Username</p>
          <input
              type="text"
              name="Username"
              value={user.nickname}
              onChange={handleInputChange}
              className="p-2"
              style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px' }}
            />
           <p className="font-light">Password</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="p-2"
              style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px' }}
            />
          <button onClick={handleSaveChanges} className="mt-2 p-2 font-semibold" style={{ backgroundColor: savedTheme === 'light' ? '#A0B6CF' : '#A0B6CF', color:savedTheme === 'light' ? '#26374a' : '#26374a' , borderRadius: '5px' }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const Create = ({ handleAddPost,user, toggleHighlight, highlight }) => {
  const [feeling, setFeeling] = useState('');
  const [text, setText] = useState('');
  const [emptyError,setEmptyError]=useState(false)
  const [open, setOpen] = useState(false); /// error snackbar


  const handleFeelingChange = (e) => {
    setFeeling(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feeling && text) {
      handleAddPost(feeling, text, highlight);
    }
    if (feeling.trim()==='' || text.trim()==='') {
      setEmptyError(true)
      setOpen(true)
      setTimeout(() => {
        setEmptyError(false)
      }, 3000);
    }
  };
  
  const savedTheme = localStorage.getItem('color') || 'light';
  return (
  <div>
      <div className="flex flex-col">
      <form className="flex flex-col" onSubmit={handleSubmit}>
       <div className="flex items-center gap-4 p-3" 
        style={{ backgroundColor: savedTheme === 'light' ? '#fbfbfb' : 'rgb(35, 38, 41)', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px' }} 
       >
       <Avatar sx={{ width: '55px', height: '55px' }} alt={user.nickname} src={user.avatar || ''} />
       <input
         style={{ backgroundColor: savedTheme === 'light' ? '#fbfbfb' :'rgb(35, 38, 41)', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px',
          border:savedTheme ==='light'?'1px solid #3b3f45':'1 px solid #dddfe2'
          }} 
          value={text}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          className="p-2 w-full"
        
        />
        <select 
        style={{ backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px' }} 
        value={feeling} onChange={handleFeelingChange}>
          <option value="">How are you Feeling</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Excited">Excited</option>
        </select>
       </div>
      <div className="flex w-fit gap-4 mt-4 items-center" >
        <p style={{color: savedTheme === 'light' ? '#232629' : '#fbfbfb'}} className="text-xs text-light">Choose if you want the post to be highlighted or not</p>
         <button className="p-1" style={{backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',color: savedTheme === 'light' ? '#232629' : '#fbfbfb',border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',borderRadius:'10px'}} onClick={()=>toggleHighlight('Highlighted')}>Highlighted</button>
      <button className="p-1" style={{backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',color: savedTheme === 'light' ? '#232629' : '#fbfbfb',border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',borderRadius:'10px'}} onClick={()=>toggleHighlight('Not Highlighted')}>Not Highlighted</button></div>
       <div className="flex justify-end mt-4">
       <button type="submit" className="px-2 font-medium " style={{ backgroundColor: '#A0B6CF', color: '#26374a', borderRadius: '5px',width:'20%' }}>
          Post
        </button>
       </div>
      </form>
    </div>
    {emptyError && 
    <div>
       <Snackbar
        open={open}
        sx={{backgroundColor:'#cfa0a0',color:'#4a2626', borderRadius:15}}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
       
      >
         <SnackbarContent
            sx={{
              backgroundColor: '#cfa0a0',
              color: '#4a2626',
              fontWeight:500,
             
            }}
            message="Please fill the fields to post"
          />
      </Snackbar>
    </div>
    }
  </div>
  );
};
export default Main;