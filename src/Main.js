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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { FaCamera } from "react-icons/fa";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Checkbox from '@mui/material/Checkbox';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { TbMessagesOff } from "react-icons/tb";
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Tooltip from '@mui/material/Tooltip';
import { AiFillMoon } from "react-icons/ai";
import {motion} from 'framer-motion'
const Main = () => {

  const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [posts, setPosts] = useState([]);
    const [highlight, setHighlight] = useState('Not Highlighted');
    const [showUserProfile,setShowUserProfile]=useState(null)
    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);

    const savedTheme = localStorage.getItem('color') || 'light';
    const backgroundColor = savedTheme === 'light' ? '#eff0f1' : '#18191b';
      const svgFillColor = savedTheme === 'light' ? '#26374a' : '#a0b6cf';
      const textColor = savedTheme === 'light' ?  '#26374a' : '#a0b6cf';
    
    useEffect(() => {
      if (user) {
        const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
        const userNotifications = storedNotifications[user.id] || [];
        setNotificationsCount(userNotifications.length);
      }
    }, [user]);

    useEffect(() => {
      // Retrieve messages from localStorage
      if (user) {

      const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
      const userMessages = storedMessages[user.id] || [];
      setMessages(storedMessages);
      setMessagesCount(storedMessages.length);
    }
    }, [user]);

   

const [notificationsCount, setNotificationsCount] = useState(0);
const [messagesCount,setMessagesCount]=useState(0)

    
    const toggleHighlight = (highlight) => {
      setHighlight(highlight);
    };

    const handleAddPost = (feeling, text, highlight, userId) => {
      const newPost = { feeling, text, highlight, id: Date.now(), userId };
      const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const updatedPosts = [...existingPosts, newPost];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    
      return newPost; // Return the new post
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
        localStorage.removeItem('onlineStatus');
      };
///////Sidebar functions  /////
const [activeTab, setActiveTab] = useState('home');



const handleTabChange = (tab) => {
  if (tab === 'notification' && user) {
    // Fetch notifications from localStorage when the notification tab is clicked
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    const userNotifications = storedNotifications[user.id] || [];
    
    // Set the notifications and clear the count
    setNotifications(userNotifications);
    setNotificationsCount(0); // Clear the notification count once the tab is clicked
  }
  if (tab === 'messages' && user) {
    // Fetch notifications from localStorage when the notification tab is clicked
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
    const userMessages = storedMessages[user.id] || [];
    
    // Set the notifications and clear the count
    setMessages(userMessages);
    setMessagesCount(0); // Clear the notification count once the tab is clicked
  }
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

   
    const [theme,setTheme]=useState('light')
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log('Loaded user data:', storedUser); 
      }
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    }, []);
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
      // Automatically hide the intro after 5 seconds
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 5000);
      
      // Delay user loading for the same duration
      const userLoadingDelay = setTimeout(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        }
      }, 5000);
  
      return () => {
        clearTimeout(timer);
        clearTimeout(userLoadingDelay);
      };
    }, []);
  
    const introAnimation = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 2 } },
      exit: { opacity: 0, transition: { duration: 1 } }
    };
  
   

    if (showIntro) {
      return (
        <motion.div
        className="fixed inset-0 z-50 flex flex-col md:flex-row items-center justify-center"
        style={{ backgroundColor }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 4.5, duration: 0.5 }}
      >
        {/* Animated SVG */}
        <motion.svg
          width="150px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill={svgFillColor}
          stroke={svgFillColor}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <g  fill={svgFillColor}>
            <motion.path
              d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z"
              stroke="#26374a"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
              d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z"
              fill={svgFillColor}
            />
          </g>
        </motion.svg>
  
        {/* Animated Text */}
        <motion.h1
          className=" text-4xl mt-8"
          style={{ color: textColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          Starways
        </motion.h1>
      </motion.div>
      );
    }
  
    if (!user) {
      return <div style={{backgroundColor: savedTheme === 'light' ? '#eff0f1' : '#18191b'}}>Loading user data...</div>;
    }

  
    
     

      

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
     
    {/* Demo for loggin in for the first time*/}
      
    
      {/* Sidebar */}
      <div className={`hidden lg:flex fixed  flex-col justify-around  pl-3 ${themeClass}`} style={{ width: '20%', height: '100vh', backgroundColor: savedTheme === 'light' ? '#eff0f1' : '#18191b',
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
            {messages.length > 0 && <span  style={{borderRadius:'50%',background:savedTheme ==='light'?'#A0B6CF':'#A0B6CF',color:'#26374a'}} className=" px-2 font-bold notification-badge"> {messagesCount > 0 && `${messagesCount}`}</span>}
        </div>
        <div onClick={() => handleTabChange('notification')} id="notifi"
         className={getItemClass('notification')}>
          
            <NotificationsIcon/>
            
            <p>Notification</p>
            <p className="px-2 font-bold" style={{borderRadius:'50%',background:savedTheme ==='light'?'#A0B6CF':'#A0B6CF',color:'#26374a'}}> {notificationsCount > 0 && `${notificationsCount}`}</p> {/* Show count only if > 0 */}
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
        <MenuIcon sx={{color:savedTheme==='light'?'#232629':'#fbfbfb',zIndex:1000}}/>
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
            zIndex: 120, // Ensure the menu appears above other content
        color:savedTheme==='light'?'#232629':'#fbfbfb',backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',
        border:savedTheme==='light'?'1px solid #dddfe2':'1px solid #3b3f45',borderRadius:'10px'
          },
        }}
      >
        <Test updateTheme={updateTheme}/>
        <MenuItem sx={{fontFamily:'"Inter", sans-serif'}} className="menuItem" onClick={handleCloseLogOut}><a href="/">Log Out</a></MenuItem>
      </Menu>
    </div>
      </div>
     <div>
      <div className="flex items-center lg:hidden fixed top-0 w-full py-2 justify-between h-fit"
      style={{backgroundColor:savedTheme==='light'?'#eff0f1':'#18191b',zIndex:1000,color: savedTheme === 'light' ? '#232629' : '#fbfbfb',borderBottom:savedTheme=== 'light'?'1px solid #dddfe2':'1px solid #3b3f45'}}
      >
      <h1 className="font-bold text-xl " style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb',marginLeft:'5px' }}>StarWays</h1>
      <div className="flex gap-4">
      <div onClick={() => handleTabChange('messages')} id="message" 
         className={getItemClass('messages')}>
            <QuestionAnswerIcon/>
            
            {messages.length > 0 && <span  style={{borderRadius:'50%',background:savedTheme ==='light'?'#A0B6CF':'#A0B6CF',color:'#26374a'}} className=" p-0.5 -ml-2.5 -mt-4  font-medium text-xs notification-badge"> {messagesCount > 0 && `${messagesCount}`}</span>}
        </div>
        <div onClick={() => handleTabChange('notification')} id="notifi"
         className={getItemClass('notification')}>
          
            <NotificationsIcon/>
            
           
            <p className="p-0.5 rounded-full -ml-3 -mt-4 font-medium text-xs" style={{background:savedTheme ==='light'?'#A0B6CF':'#A0B6CF',color:'#26374a'}}> {notificationsCount > 0 && `${notificationsCount}`}</p> {/* Show count only if > 0 */}
        </div>
      </div>
      </div>
     <div className="flex lg:hidden fixed bottom-0 w-full py-2 justify-around h-fit"
      style={{zIndes:1000,backgroundColor:savedTheme==='light'?'#eff0f1':'#18191b', color: savedTheme === 'light' ? '#232629' : '#fbfbfb',  borderTop:savedTheme=== 'light'?'1px solid #dddfe2':'1px solid #3b3f45',}}
     >
      <div onClick={() => handleTabChange('home')} id="home" className={getItemClass('home')}>
        {activeTab === 'home' ?  <HomeIcon />: <HomeOutlinedIcon />}
      </div>
        <div onClick={() => handleTabChange('searchplusExplore')} id="search" className={getItemClass('searchplusExplore')}>
            <SearchIcon/>
           
        </div>
        <div onClick={() => handleTabChange('create')} id="add"
        className={getItemClass('create')}>
          
          {activeTab === 'create' ? <AddCircleIcon/>  : <AddCircleOutlineOutlinedIcon/>} 
        </div>
        <div  onClick={() => handleTabChange('profile')} id="profile" className={getItemClass('profile')}
          style={{borderRadius:'100%',border:activeTab === 'profile' ?(savedTheme === 'light'? '1px solid #26374a':'1px solid #a0b6cf'):'',height:'fit-content',width:'fit-content',padding:'2px', display: 'flex', // To center the avatar within the div
            alignItems: 'center',
            justifyContent: 'center'}}
          >
        <Avatar sx={{width:'30px',height:'30px'}} alt={user.nickname}src={user.avatar || ''} />
           
        </div>
      </div>
     </div>

      {/* Main content */}
      <div className="flow flex-1 overflow-y-auto mb-12 mt-6" style={{  padding: '16px' }}>
      {activeTab === 'profile' && !editProfile && (
        <Profile updateTheme={updateTheme} user={user} setUser={setUser} posts={posts} setPosts={setPosts}  handleGoBack={handleGoBack} toggleEdit={toggleEdit} />
      )}
      {editProfile && (
        <EditProfile handleGoBack={handleGoBack} />
      )}
        {activeTab === 'home' && <HomeComponent/>}
        {activeTab === 'search' && <Search />}
        {activeTab === 'searchplusExplore' && <SearchPlusExplore />}
        {activeTab === 'explore' && <ExploreComponent/>}
        {activeTab === 'messages' && <div><SendMessage user={showUserProfile}/></div>}
        {activeTab === 'notification' && <Notifications user={user} />}
        {activeTab === 'create' &&   <Create highlight={highlight} toggleHighlight={toggleHighlight} user={user} handleAddPost={handleAddPost} />}
        <div className="empty3 block lg:hidden"></div>
      </div>
      
    </div>
  );
}



const HomeComponent = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState({});
  const [likedPosts, setLikedPosts] = useState({});

  // Fetch friends and their posts
  useEffect(() => {
    const fetchFriendPosts = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};

        if (storedUser && storedUser.id && storedFriends[storedUser.id]) {
          const friendIds = storedFriends[storedUser.id]; // IDs of the user's friends

          // Fetch posts from localStorage
          const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

          // Filter posts from friends only
          const friendPosts = storedPosts.filter(post => friendIds.includes(post.userId));
          setAllPosts(friendPosts);

          // Fetch all users to get friend details from jsonbin.io
          const response = await axios.get('https://api.jsonbin.io/v3/b/66f02668ad19ca34f8aab320', {
            headers: {
              'X-Master-Key': '$2a$10$FLD5iYCGIbkUuKuyqX1Ee.zWVlf6DEH70.S5VMHv6pxLixGBbmYJq'
            }
          });
          setFriends(response.data.record.users || []);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchFriendPosts();
  }, []);

  // Handle bookmark and like actions
  const handleToggleBookmark = (postId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || typeof storedUser !== 'object') {
      console.error('Logged-in user data is invalid or missing');
      return;
    }

    const currentUserNickname = storedUser.nickname;
    const currentUserId = storedUser.id;

    const post = allPosts.find(post => post.id === postId);
    if (!post) return;

    const postOwnerId = post.userId;

    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    const userNotifications = storedNotifications[postOwnerId] || [];

    setBookmarks(prevBookmarks => {
      const updatedBookmarks = { ...prevBookmarks };
      const isBookmarked = updatedBookmarks[currentUserId]?.includes(postId);

      if (isBookmarked) {
        updatedBookmarks[currentUserId] = updatedBookmarks[currentUserId].filter(id => id !== postId);
      } else {
        updatedBookmarks[currentUserId] = [...(updatedBookmarks[currentUserId] || []), postId];

        userNotifications.push({
          senderNickname: currentUserNickname,
          postText: post.text,
          timestamp: new Date().toISOString(),
          action: 'liked',
          action2: 'your post:',
          id: Date.now(),
        });
      }

      storedNotifications[postOwnerId] = userNotifications;
      localStorage.setItem('notifications', JSON.stringify(storedNotifications));
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

      setLikedPosts(prevLikedPosts => {
        const updatedLikedPosts = { ...prevLikedPosts };

        if (updatedLikedPosts[postId]) {
          delete updatedLikedPosts[postId];
        } else {
          updatedLikedPosts[postId] = true;
        }

        const savedLiked = JSON.parse(localStorage.getItem('likedPosts')) || {};
        savedLiked[currentUserId] = updatedLikedPosts;
        localStorage.setItem('likedPosts', JSON.stringify(savedLiked));

        return updatedLikedPosts;
      });

      return updatedBookmarks;
    });
  };

  // Load liked posts from localStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && typeof storedUser === 'object') {
      const currentUserId = storedUser.id;
      const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
      setLikedPosts(savedLikedPosts[currentUserId] || {});
    }
  }, []);

  const savedTheme = localStorage.getItem('color') || 'light';

  return (
    <div style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }}>
      <h1 style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="hidden lg:block font-bold text-3xl">Home</h1>
      {loading && <p>Loading friends and posts...</p>}
      {error && <p>{error}</p>}
      <div className="empty3 -mt-3"></div>
      {!loading && !error && allPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allPosts.map((post) => {
            const user = friends.find(friend => friend.id === post.userId) || { nickname: 'Unknown User' };

            return (
              <div
                key={post.id}
                className="post p-4 flex flex-col"
                style={{
                  backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
                  borderRadius: '5px',
                  border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
                }}
              >
                <div className="flex justify-between gap-2 items-center -ml-2">
                  <div className="flex gap-2 items-center -mt-2 ml-1">
                    {user.avatar && (
                      <Avatar
                        src={user.avatar}
                        alt={`${user.nickname}'s avatar`}
                        className="w-8 h-8 rounded-full"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    <p style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>
                      <b>{user.nickname}</b>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <p><strong className="text-lg">Feeling:</strong> {post.feeling}</p>
                  <p>{post.text}</p>
                </div>
                <div className="mt-4">
                  <Checkbox
                    icon={<FavoriteBorder sx={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }} />}
                    checkedIcon={<Favorite sx={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }} />}
                    checked={!!likedPosts[post.id]}
                    onChange={() => handleToggleBookmark(post.id)}
                  />
                </div>
              </div>
            );
          })}
          <div className="empty"></div>
        </div>
      ) : (
        <p>
          <div className="flex flex-col  items-center justify-center mt-12">
        <div style={{borderRadius:"100%",border:savedTheme ==='light'?'3px solid #dddfe2':'3px solid #3b3f45'}} className="camera-wrapper">
        <CheckCircleIcon sx={{width:'125px',height:'125px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
        </div>
          <p style={{color:savedTheme==='light'?'#232629':'#fbfbfb',}} className="text-xl font-semibold mt-2">You are all caught up</p>
        </div></p>
      )}
    </div>
  );
};




const ExploreComponent = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const[friends,setFriends]=useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const savedTheme = localStorage.getItem('color') || 'light';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};

        // Fetch posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

        // Fetch all users to get friend details from jsonbin.io
        const response = await axios.get('https://api.jsonbin.io/v3/b/66f02668ad19ca34f8aab320', {
          headers: {
            'X-Master-Key': '$2a$10$FLD5iYCGIbkUuKuyqX1Ee.zWVlf6DEH70.S5VMHv6pxLixGBbmYJq'
          }
        });

        setAllUsers(response.data.record.users || []);
        setFriends(response.data.record.users || []); // Assuming all users are friends for now

        // If the user has friends, filter friend posts
        let friendPosts = [];
        if (storedUser && storedUser.id && storedFriends[storedUser.id]) {
          const friendIds = storedFriends[storedUser.id]; // IDs of the user's friends
          friendPosts = storedPosts.filter(post => friendIds.includes(post.userId));
        }

        // Set all posts
        setAllPosts([...friendPosts, ...storedPosts]); // Combine friend posts with all posts
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && typeof storedUser === 'object') {
      const currentUserId = storedUser.id;
      const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
      setLikedPosts(savedLikedPosts[currentUserId] || {});
    }
  }, []);

  const getUserById = (userId) => {
    const user = allUsers.find(user => user.id === userId);
    return user || { nickname: 'Unknown User' }; // Default to 'Unknown User' if not found
  };

  const handleToggleBookmark = (postId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || typeof storedUser !== 'object') {
      console.error('Logged-in user data is invalid or missing');
      return;
    }

    const currentUserId = storedUser.id;
    const post = allPosts.find(post => post.id === postId);
    if (!post) return;

    const isBookmarked = likedPosts[postId];
    const updatedLikedPosts = { ...likedPosts };

    if (isBookmarked) {
      delete updatedLikedPosts[postId];
    } else {
      updatedLikedPosts[postId] = true;

      // Add notification logic
      const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
      const userNotifications = storedNotifications[post.userId] || [];
      userNotifications.push({
        senderNickname: storedUser.nickname,
        postText: post.text,
        timestamp: new Date().toISOString(),
        action: 'liked',
        action2: 'your post:',
        id: Date.now(),
      });
      storedNotifications[post.userId] = userNotifications;
      localStorage.setItem('notifications', JSON.stringify(storedNotifications));
    }

    // Update localStorage
    const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
    savedLikedPosts[currentUserId] = updatedLikedPosts;
    localStorage.setItem('likedPosts', JSON.stringify(savedLikedPosts));

    // Update state
    setLikedPosts(updatedLikedPosts);
  };

  const style = {
    color: savedTheme === 'light' ? '#232629' : '#fbfbfb',
  };

  const postStyle = {
    backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
    borderRadius: '5px',
    border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
  };

  const checkboxStyle = {
    color: savedTheme === 'light' ? '#26374a' : '#a0b6cf',
  };

  return (
    <div style={style}>
      <h1 className="font-bold text-3xl">Explore</h1>
      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      <div className="empty3 -mt-3"></div>
      {!loading && !error && allPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allPosts.map((post) => {
            const user = getUserById(post.userId);
            return (
              <div
                key={post.id}
                className="post p-4 flex flex-col"
                style={postStyle}
              >
                <div className="flex justify-between gap-2 items-center -ml-2">
                  <div className="flex gap-2 items-center -mt-2 ml-1">
                    {user.avatar && (
                      <Avatar
                        src={user.avatar}
                        alt={`${user.nickname}'s avatar`}
                        className="w-8 h-8 rounded-full"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    <p style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>
                      <b>{user.nickname}</b>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <p><strong className="text-lg">Feeling:</strong> {post.feeling}</p>
                  <p>{post.text}</p>
                </div>
                <div className="mt-4">
                  <Checkbox
                    icon={<FavoriteBorder sx={checkboxStyle} />}
                    checkedIcon={<Favorite sx={checkboxStyle} />}
                    checked={!!likedPosts[post.id]}
                    onChange={() => handleToggleBookmark(post.id)}
                  />
                </div>
              </div>
            );
          })}
          <div className="empty"></div>
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};




const SearchPlusExplore = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const[friends,setFriends]=useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showUserProfile, setShowUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const savedTheme = localStorage.getItem('color') || 'light';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};

        // Fetch posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

        // Fetch all users to get friend details from jsonbin.io
        const response = await axios.get('https://api.jsonbin.io/v3/b/66f02668ad19ca34f8aab320', {
          headers: {
            'X-Master-Key': '$2a$10$FLD5iYCGIbkUuKuyqX1Ee.zWVlf6DEH70.S5VMHv6pxLixGBbmYJq'
          }
        });

        setAllUsers(response.data.record.users || []);
        setFriends(response.data.record.users || []); // Assuming all users are friends for now

        // If the user has friends, filter friend posts
        let friendPosts = [];
        if (storedUser && storedUser.id && storedFriends[storedUser.id]) {
          const friendIds = storedFriends[storedUser.id]; // IDs of the user's friends
          friendPosts = storedPosts.filter(post => friendIds.includes(post.userId));
        }

        // Set all posts
        setAllPosts([...friendPosts, ...storedPosts]); // Combine friend posts with all posts
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && typeof storedUser === 'object') {
      const currentUserId = storedUser.id;
      const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
      setLikedPosts(savedLikedPosts[currentUserId] || {});
    }
  }, []);

  const getUserById = (userId) => {
    const user = allUsers.find(user => user.id === userId);
    return user || { nickname: 'Unknown User' }; // Default to 'Unknown User' if not found
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(allUsers);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allUsers.filter(user =>
        user.nickname.toLowerCase().startsWith(lowerCaseQuery)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, allUsers]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && typeof storedUser === 'object') {
      const currentUserId = storedUser.id;
      const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
      setLikedPosts(savedLikedPosts[currentUserId] || {});
    }
  }, []);

  const handleToggleBookmark = (postId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return;

    const currentUserId = storedUser.id;
    const post = allPosts.find(post => post.id === postId);
    if (!post) return;

    const userNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    const notifications = userNotifications[post.userId] || [];

    setLikedPosts(prevLikedPosts => {
      const updatedLikedPosts = { ...prevLikedPosts };
      if (updatedLikedPosts[postId]) {
        delete updatedLikedPosts[postId];
      } else {
        updatedLikedPosts[postId] = true;
        notifications.push({
          senderNickname: storedUser.nickname,
          postText: post.text,
          timestamp: new Date().toISOString(),
          action: 'liked',
          action2: 'your post:',
          id: Date.now(),
        });
      }

      localStorage.setItem('likedPosts', JSON.stringify({ [currentUserId]: updatedLikedPosts }));
      localStorage.setItem('notifications', JSON.stringify({ ...userNotifications, [post.userId]: notifications }));
      return updatedLikedPosts;
    });
  };

  const showUser = (user) => {
    setShowUserProfile(user);

    // Filter the posts by the selected user's ID
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = storedPosts.filter(post => post.userId === user.id);
    setUserPosts(userPosts);
  };

  const handleBackToSearch = () => {
    setShowUserProfile(null);
    setUserPosts([]);
  };

  const style = {
    color: savedTheme === 'light' ? '#232629' : '#fbfbfb',
  };

  const style2 = {
    backgroundColor: savedTheme === 'light' ? '#fbfbfb' : 'rgb(35, 38, 41)',
    color: savedTheme === 'light' ? '#232629' : '#fbfbfb',
    border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
    borderRadius: '10px',
    width: '400px',
  };

  const adjustments = showUserProfile ? "justify-center items-stretch" : "justify-center items-center";

  return (
    <div>
      <div className={`flex flex-col ${adjustments}`} style={style}>
        {showUserProfile ? (
          <ProfileUsers
            allUsers={allUsers}
            posts={userPosts}
            user={showUserProfile}
            onBack={handleBackToSearch}
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Search users..."
              className="mt-8 lg:mt-0 w-48 md:w-64 "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
                padding: '5px',
                borderRadius: '5px',
                border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
               
              }}
            />
            <div>
              {searchQuery.trim() === '' ? (
                <>
                  {loading && <p>Loading users...</p>}
                  {error && <p>{error}</p>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {allPosts.map((post) => {
                      const user = allUsers.find(user => user.id === post.userId) || { nickname: 'Unknown User' };
                      return (
                        <div
                          key={post.id}
                          className="post p-4 flex flex-col"
                          style={{
                            backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
                            borderRadius: '5px',
                            border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
                          }}
                        >
                          <div className="flex justify-between gap-2 items-center -ml-2">
                            <div className="flex gap-2 items-center -mt-2 ml-1">
                              {user.avatar && (
                                <Avatar
                                  src={user.avatar}
                                  alt={`${user.nickname}'s avatar`}
                                  className="w-8 h-8 rounded-full"
                                  style={{ objectFit: 'cover' }}
                                />
                              )}
                              <p style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>
                                <b>{user.nickname}</b>
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col mt-4">
                            <p><strong className="text-lg">Feeling:</strong> {post.feeling}</p>
                            <p>{post.text}</p>
                          </div>
                          <div className="mt-4">
                            <Checkbox
                              icon={<FavoriteBorder sx={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }} />}
                              checkedIcon={<Favorite sx={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }} />}
                              checked={!!likedPosts[post.id]}
                              onChange={() => handleToggleBookmark(post.id)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      onClick={() => showUser(user)}
                      className="usersSearch flex justify-between w-full items-center gap-3 mt-3 p-2"
                      style={style2}
                      key={user.id}
                    >
                      <div className="flex gap-3" style={{ zIndex: 0 }}>
                        <Avatar src={user.avatar} alt={`${user.nickname}'s avatar`} style={{ width: '50px', height: '50px', zIndex: 0 }} />
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold">{user.nickname}</p>
                          <p className="font-light text-sm" style={{color:savedTheme ==='light'?'#5e666e':'#d6d9dc'}}>{user.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center mt-12">
                    <div style={{ borderRadius: "100%", border: savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45' }} className="camera-wrapper">
                      <PersonIcon sx={{ width: '125px', height: '125px', padding: '20px', color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} />
                    </div>
                    <p style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="text-xl font-semibold mt-2">No users</p>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};



const Profile = ({ handleGoBack, updateTheme, toggleEdit, posts, setPosts }) => {

  const [user, setUser] = useState(null);
  const[allUsers,setAllUsers]=useState([])
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('light');
  const [editProfile, setEditProfile] = useState(false);
  const [selected, setSelected] = useState(null); // show specific post state 
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const open1 = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogOut = () => {
    setAnchorEl(null);
    Cookies.set('isAuthenticated', 'false');
  };

  const handleClickShow = (post) => { // toggle the post 
    setSelected(post);
    setOpen(true);
  };

  const handleClosePost = () => { // close post
    setSelected(null);
    setOpen(false);
  };

  const [friendCount, setFriendCount] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Correctly set user from localStorage
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      setFriendCount(getFriendCount(user.id));
    }
  }, [user]);

  const getFriendCount = (userId) => {
    const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
    const userFriends = storedFriends[userId] || [];
    return userFriends.length;
  };

  const [friendsChecker, setFriendsChecker] = useState(false);
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Add the rest of your component logic here...

 

  // Fetch users and filter friends' data when the modal is open
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.jsonbin.io/v3/b/66f02668ad19ca34f8aab320', {
          headers: {
            'X-Master-Key': '$2a$10$FLD5iYCGIbkUuKuyqX1Ee.zWVlf6DEH70.S5VMHv6pxLixGBbmYJq'
          }
        });
        const users = response.data.record.users || [];
        setAllUsers(users);
  
        // Fetch stored friends from localStorage
        const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const userFriends = storedFriends[currentUser.id] || [];
  
        // Filter to show only friends
        const friendsDetails = users.filter(user => userFriends.includes(user.id));
        setFriendsData(friendsDetails);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [friendsChecker]);
  
  
  

  const handleRemovePost = (postId, userId) => {
    const updatedPosts = posts.filter(post => post.id !== postId || post.userId !== userId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleSaveChanges = (postId, newFeeling, newText) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId && post.userId === user.id
        ? { ...post, feeling: newFeeling, text: newText }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));

    }
   
  

  }, []);

  if (!user) {
    return <div className="flex items-center justify-center">Loading user data...</div>;
  }

 

  const userPosts = posts.filter(post => post.userId === user.id);

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



  return(
   <div style={{ color:savedTheme==='light'?'#232629':'#fbfbfb',marginTop:50}}>
    <div className="flex gap-6 items-center">
   <div className="hidden md:block"> <Avatar  sx={{width:'125px',height:'125px'}} alt={user.nickname} src={user.avatar || ''}/></div>
    <div className="block md:hidden"><Avatar  sx={{width:'75px',height:'75px'}} alt={user.nickname} src={user.avatar || ''}/></div>
   <div className="flex flex-col gap-3">
   <div className="flex gap-3">
    <h1 className="font-medium text-xl"> {user.nickname}</h1>
    <button onClick={()=>toggleEdit('editProfile')} className="font-ligt text-xs md:text-sm px-0.5 md:px-1"
    style={{backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',borderRadius:'10px',
      border:savedTheme==='light'?'1px solid #dddfe2':'1px solid #3b3f45',
      color:savedTheme==='light'?'#232629':'#fbfbfb',
    }}
    >Edit Profile</button>
    <div className="block md:hidden">
    <Button
        id="basic-button"
        aria-controls={open1 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick}
        className="flex items-center"
        style={{ minWidth: 'auto', padding: 0 }}
      >
        <SettingsOutlinedIcon sx={{color:savedTheme==='light'?'#232629':'#fbfbfb',zIndex:1000}}/>

      </Button>
    </div>
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
        color:savedTheme==='light'?'#232629':'#fbfbfb',backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',
        border:savedTheme==='light'?'1px solid #dddfe2':'1px solid #3b3f45',borderRadius:'10px'
          },
        }}
      >
        <Test updateTheme={updateTheme}/>
       
        <MenuItem sx={{fontFamily:'"Inter", sans-serif'}} className="menuItem" onClick={handleCloseLogOut}><a href="/">Log Out</a></MenuItem>
      </Menu>
   </div>
   <div className="flex items-center gap-4 md:gap-6">
           <p className="flex gap-2">{userPosts.length} <b className="font-medium md:font-semibold ml-1">posts</b> </p>
           <p className="flex gap-2 cursor-pointer" onClick={()=>setFriendsChecker(true)}>{friendCount} <b className="font-semibold ml-1">friends</b></p>
         </div>
    <p>{user.description}</p> 
   </div>
    </div>

    <div className="flex justify-center w-full mt-8 gap-4"
    style={{borderTop:savedTheme==='light'?'1px solid #dddfe2':'1px solid #3b3f45'}}
    >
    
    </div>
    
        
    <div className="posts mt-4">
    <div>
  {userPosts.length === 0 ? (
    <div className="flex flex-col  items-center justify-center mt-12">
    <div style={{borderRadius:"100%",border:savedTheme ==='light'?'3px solid #dddfe2':'3px solid #3b3f45'}} className="camera-wrapper">
    <CameraAltIcon sx={{width:'125px',height:'125px',padding:'20px'}}/>
    </div>
      <p style={{color:savedTheme==='light'?'#232629':'#fbfbfb',}} className="text-xl font-semibold mt-2">No posts yet</p>
    </div>
  ) : (
    <div>
      {userPosts.map((post) => (
        <div
          key={post.id}
          className="post p-4 mb-4 flex justify-between"
          style={{
            backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
            borderRadius: '5px',
            border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
          }}
        >
          <div className="flex flex-col">
            {post.highlight === 'Highlighted' && (
              <div
                className="high font-semibold text-xs p-1 w-fit -ml-4 -mt-4"
                style={{ backgroundColor: '#a0b6cf', color: '#26374a' }}
              >
                Highlighted
              </div>
            )}
            <p><strong>Feeling:</strong> {post.feeling}</p>
            <p>{post.text}</p>
          </div>
          <div className="flex gap-4">
            <button variant="contained" color="primary" onClick={() => handleClickShow(post)}>
              <SettingsIcon />
            </button>
            <button variant="contained" color="secondary" onClick={() => handleRemovePost(post.id, user.id)}>
              <CloseIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
        <div className="emtpy3 opacity-0">111</div>
      </div>

        {editProfile && 
        <EditProfile />
        }
        {selected && 
        <ModalPost open={open} post={selected}   handleSaveChanges={handleSaveChanges}  handleClosePost={handleClosePost}/>
        }
        {friendsChecker && 
        <div>
         <Modal
  open={friendsChecker}
  onClose={() => setFriendsChecker(false)}
>
  <Box sx={style}>
    <h2 className="mb-6 font-bold text-2xl">Friends List</h2>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : friendsData.length > 0 ? (
      friendsData.map((friend) => (
        <div
          key={friend.id}
          className="flex gap-4 mb-4"
          style={{
            borderBottom: '1px solid #ccc',
            paddingBottom: '8px',
          }}
        >
          <Avatar
            sx={{ width: '50px', height: '50px' }}
            alt={friend.nickname}
            src={friend.avatar || ''}
          />
          <div>
            <h3 className="font-semibold">{friend.nickname}</h3>
            {friend.description ? (
              <p className="font-light text-sm">{friend.description}</p>
            ) : (
              <p className="font-light">No description yet</p>
            )}
          </div>
        </div>
      ))
    ) : (
      <p>No friends found.</p>
    )}
  </Box>
</Modal>

        </div>
        }
   </div>
  )
}


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUserProfile, setShowUserProfile] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.jsonbin.io/v3/b/66f02668ad19ca34f8aab320', {
          headers: {
            'X-Master-Key': '$2a$10$FLD5iYCGIbkUuKuyqX1Ee.zWVlf6DEH70.S5VMHv6pxLixGBbmYJq'
          }
        });

        // Assuming users and posts are stored in the response
        const data = response.data.record;
        setAllUsers(data.users || []);  // Set the fetched users
        setAllPosts(data.posts || []);  // Set the fetched posts
      } catch (err) {
        setError('Failed to fetch users and posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(allUsers);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allUsers.filter(user =>
        user.nickname.toLowerCase().startsWith(lowerCaseQuery)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, allUsers]);

  const showUser = (user) => {
    setShowUserProfile(user);

    // Filter the posts by the selected user's ID
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = storedPosts.filter(post => post.userId === user.id);
    setUserPosts(userPosts);
  };

  // Handle back to search view


  const handleBackToSearch = () => {
    setShowUserProfile(null);
    setUserPosts([]);
  };

  const savedTheme = localStorage.getItem('color') || 'light';

  const style = {
    color: savedTheme === 'light' ? '#232629' : '#fbfbfb',
  };

  const style2 = {
    backgroundColor: savedTheme === 'light' ? '#fbfbfb' : 'rgb(35, 38, 41)',
    color: savedTheme === 'light' ? '#232629' : '#fbfbfb',
    border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
    borderRadius: '10px',
    width: '300px',
  };

  const adjustments = showUserProfile ? "justify-center items-stretch" : "justify-center items-center";

  return (
    <div className={`flex flex-col ${adjustments}`} style={style}>
      {showUserProfile ? (
        <ProfileUsers
          allUsers={allUsers}
          posts={userPosts}
          user={showUserProfile}
          onBack={handleBackToSearch}
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search users..."
            className="mt-28 lg:mt-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
              padding: '5px',
              borderRadius: '5px',
              border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
              width: '300px',
              marginBottom: '10px'
            }}
          />

          <div>
            {searchQuery.trim() === '' ? (
              <div className="flex flex-col items-center justify-center mt-12">
                <div style={{ borderRadius: "100%", border: savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45' }} className="camera-wrapper">
                  <PersonIcon sx={{ width: '125px', height: '125px', padding: '20px', color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} />
                </div>
                <p style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="text-xl font-semibold mt-2">No Searched user yet</p>
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  onClick={() => showUser(user)}
                  className="usersSearch flex justify-between items-center gap-3 mt-3 p-2"
                  style={style2}
                  key={user.id}
                >
                  <div className="flex gap-3" style={{ zIndex: 0 }}>
                    <Avatar src={user.avatar} alt={`${user.nickname}'s avatar`} style={{ width: '50px', height: '50px', zIndex: 0 }} />
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">{user.nickname}</p>
                      <p className="font-light text-sm">{user.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mt-12">
                <div style={{ borderRadius: "100%", border: savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45' }} className="camera-wrapper">
                  <PersonIcon sx={{ width: '125px', height: '125px', padding: '20px', color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} />
                </div>
                <p style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="text-xl font-semibold mt-2">No users</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};





const ProfileUsers = ({ user,posts, allUsers,onBack }) => { // Destructure 'user' from props
  const savedTheme = localStorage.getItem('color') || 'light';

  // Dummy data for posts, adjust as needed
  const [favorites, setFavorites] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [isPrivate,setIsPrivate]=useState(false)

  const [postList, setPostList] = useState(posts || []); // Initialize postList

  useEffect(() => {
  

    setPostList(posts);
  }, [posts]);
  const userPosts = postList.filter(post => post.userId === user.id);
  

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    setBookmarks(storedBookmarks);
   
  }, []);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && typeof storedUser === 'object') {
      const currentUserId = storedUser.id;
      const savedLiked = JSON.parse(localStorage.getItem('likedPosts')) || {};
      setFavorites(savedLiked[currentUserId] || {}); // Set favorites for the current user
    }
  }, []);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || typeof storedUser !== 'object') {
      console.error('Logged-in user data is invalid or missing');
      return;
    }

    
  
    const currentUserId = storedUser.id;
    const savedLiked = JSON.parse(localStorage.getItem('likedPosts')) || {};
    setLikedPosts(savedLiked[currentUserId] || {});
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Define parsedUser here
     
      setIsPrivate(parsedUser.isPrivate || false); // Access isPrivate from parsedUser
    }
  }, []);

 
  

  const handleToggleBookmark = (postId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || typeof storedUser !== 'object') {
      console.error('Logged-in user data is invalid or missing');
      return;
    }
  
    const currentUserNickname = storedUser.nickname;
    const currentUserId = storedUser.id;
  
    const post = posts.find(post => post.id === postId);
    if (!post) return;
  
    const postOwnerId = post.userId;
  
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    const userNotifications = storedNotifications[postOwnerId] || [];
  
    setBookmarks(prevBookmarks => {
      const updatedBookmarks = { ...prevBookmarks };
      const isBookmarked = updatedBookmarks[currentUserId]?.includes(postId);
  
      if (isBookmarked) {
        // Remove from bookmarks
        updatedBookmarks[currentUserId] = updatedBookmarks[currentUserId].filter(id => id !== postId);
      } else {
        // Add to bookmarks
        updatedBookmarks[currentUserId] = [...(updatedBookmarks[currentUserId] || []), postId];
  
        // Add notification
        userNotifications.push({
          senderNickname: currentUserNickname,
          postText: post.text,
          timestamp: new Date().toISOString(),
          action: 'liked',
          action2: 'your post:',
          id: Date.now(),
        });
      }
  
      // Update notifications in localStorage
      storedNotifications[postOwnerId] = userNotifications;
      localStorage.setItem('notifications', JSON.stringify(storedNotifications));
  
      // Update bookmarks in localStorage
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  
      // Handle liking the post and updating likedPosts
      setLikedPosts(prevLikedPosts => {
        const updatedLikedPosts = { ...prevLikedPosts };
  
        if (updatedLikedPosts[postId]) {
          delete updatedLikedPosts[postId]; // Unliking the post
        } else {
          updatedLikedPosts[postId] = true; // Liking the post
        }
  
        // Update liked posts in localStorage
        const savedLiked = JSON.parse(localStorage.getItem('likedPosts')) || {};
        savedLiked[currentUserId] = updatedLikedPosts;
        localStorage.setItem('likedPosts', JSON.stringify(savedLiked));
  
        // Update the state
        return updatedLikedPosts;
      });
  
      return updatedBookmarks;
    });
  };
  
  const [likedPosts, setLikedPosts] = useState({});
  
  
  const [friendStatus, setFriendStatus] = useState('');

  // Fetch the friend status from localStorage or other source
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
  
    const currentUserId = currentUser.id;
    const postOwnerId = user.id;
  
    const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
    const currentUserFriends = storedFriends[currentUserId] || [];
    
    // Check if the friend request is already sent
    if (currentUserFriends.includes(postOwnerId)) {
      setFriendStatus('Friends');
    } else {
      setFriendStatus('Add Friend');
    }
  
    // Check if a friend request is pending
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    const postOwnerNotifications = storedNotifications[postOwnerId] || [];
    const pendingRequest = postOwnerNotifications.find(notification => 
      notification.senderNickname === currentUser.nickname && 
      notification.action === 'Sent a friend request'
    );
  
    if (pendingRequest) {
      setFriendStatus('Request Sent');
    }
  }, [user.id]);

  const handleAddFriend = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
  
    const currentUserId = currentUser.id;
    const currentUserNickname = currentUser.nickname;
    const postOwnerId = user.id;
  
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    const userNotifications = storedNotifications[postOwnerId] || [];
  
    // Check if there's already a pending request
    if (userNotifications.some(notification => notification.senderNickname === currentUserNickname && notification.action === 'Sent a friend request')) {
      return;
    }
  
    userNotifications.push({
      senderId: currentUserId, // Add senderId for later use
      senderNickname: currentUserNickname,
      action: 'Sent a friend request',
      timestamp: new Date().toISOString(),
      id: Date.now(),
    });
  
    storedNotifications[postOwnerId] = userNotifications;
    localStorage.setItem('notifications', JSON.stringify(storedNotifications));
  
    setFriendStatus('Request Sent');
  };

  const [ModalConfirmation,setModalConfirmation]=useState(false)


  const handleCloseConfirmation =()=>{    /// close post
    
    setModalConfirmation(false)
  }

  const handleRemoveFriend = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
  
    const currentUserId = currentUser.id;
    const postOwnerId = user.id;
  
    // Retrieve and update the friends data from local storage
    const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
    
    // Remove the friend from the current user's friend list
    if (storedFriends[currentUserId]) {
      storedFriends[currentUserId] = storedFriends[currentUserId].filter(friendId => friendId !== postOwnerId);
    }
    
    // Remove the current user from the friend's friend list
    if (storedFriends[postOwnerId]) {
      storedFriends[postOwnerId] = storedFriends[postOwnerId].filter(friendId => friendId !== currentUserId);
    }
  
    // Save the updated friends list back to local storage
    localStorage.setItem('friends', JSON.stringify(storedFriends));
  
    // Update the friend status to 'Add Friend' after removal
    setFriendStatus('Add Friend');
    
    // Close the confirmation modal if applicable
    setModalConfirmation(false);
  };


  const [friendCount, setFriendCount] = useState(0);
  useEffect(() => {
    // Get friend count when the component mounts or user changes
    setFriendCount(getFriendCount(user.id));
  }, [user.id]);

  const getFriendCount = (userId) => {
    const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
    const userFriends = storedFriends[userId] || [];
    return userFriends.length;
  };


  const isUserOnline = (userId) => {
    const onlineStatus = JSON.parse(localStorage.getItem('onlineStatus'));
    return onlineStatus && onlineStatus.userId === userId && onlineStatus.online;
  }; //// online status if the user is online 


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: savedTheme ==='light'? '#fbfbfb' : 'rgb(35, 38, 41)',
    color: savedTheme ==='light'? '#232629' : '#fbfbfb',
   border: savedTheme ==='light'?'1px solid #3b3f45':'1 px solid #dddfe2',
   borderRadius:'10px',
   
    p: 4,
  };

  const [showMessage,setShowMessage]=useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [recipientUser, setRecipientUser] = useState(null);
  const handleSendMessage = ({ recipientUser }) => {
    // Retrieve the logged-in user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user'));
  
    if (!currentUser || !currentUser.id) {
      console.error('Current user is not defined');
      return;
    }
  
    if (!message.trim()) {
      console.error('Message cannot be empty');
      return;
    }
  
    const newMessage = {
      senderId: currentUser.id,
      senderNickname: currentUser.nickname,
      recipientId: recipientUser.id,
      recipientNickname: recipientUser.nickname,
      content: message,
      timestamp: new Date().toISOString(),
    };
  
    // Save the message (could be stored in localStorage, sent to a backend, etc.)
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
  
    setMessage('');  // Clear the message input
    setModalOpen(false);  // Close the modal
    console.log('Message sent to', recipientUser.nickname);
    
  };
  return (
    <div>
      {showMessage ? 
    <SendMessage user={selectedUser} posts={posts} friendCount={friendCount}  goBackMessage={() => setShowMessage(false)}/>
    :(
      <div className="flex justify-between w-full mt-12 ml-4 ">
      <button className="w-fit h-fit" onClick={onBack} style={{ marginBottom: '50px',marginLeft:'-30px',marginRight:'20px' }}>
      <ArrowBackIosNewIcon />
     </button>
     <div className=" relative flex gap-6  w-full ">
     <h1 className="absolute md:hidden  left-28 font-semibold text-xl text-center w-fit"
     style={{borderBottom:savedTheme ==='light'?'2px solid #dddfe2':'2px solid #3b3f45'}}
     >{user.nickname}</h1>
       <div className="h-fit flex mt-7 md:mt-0">
       <div className="hidden md:block">
       <Avatar className="block md:hidden" sx={{ width: '115px', height: '115px' }} alt={user.nickname} src={user.avatar || ''} />
         {isUserOnline(user.id) ? <Tooltip title="Online"><span className="11 absolute flex w-8 h-8 rounded-full ml-24 -mt-8"
         style={{zIndex:100,backgroundColor:'#a0cfa0',border:savedTheme === 'light' ?'3px solid #eff0f1':'3px solid #18191b'}}
         ></span></Tooltip> : <Tooltip title="Offline"><span className="11 absolute flex items-center w-8 h-8 rounded-full ml-24 -mt-8"
         style={{zIndex:100,backgroundColor:savedTheme === 'light'?'#eff0f1':'#18191b',border:savedTheme === 'light' ?'3px solid #eff0f1':'3px solid #18191b'}}
         ><AiFillMoon className="w-6 h-6" style={{color:savedTheme === 'light' ? '#4a4a26':'#cfcfa0'}}/></span></Tooltip>}
        </div>
       <div className="block md:hidden ">
        <div className="flex flex-col">
       
        <Avatar className="block md:hidden " sx={{ width: '75px', height: '75px' }} alt={user.nickname} src={user.avatar || ''} />
       
        </div>
        {isUserOnline(user.id) ? <Tooltip title="Online"><span className="22 relative flex w-6 h-6 rounded-full ml-14 -mt-5"
         style={{zIndex:100,backgroundColor:'#a0cfa0',border:savedTheme === 'light' ?'3px solid #eff0f1':'3px solid #18191b'}}
         ></span></Tooltip> : <Tooltip title="Offline"><span className="22 relative flex items-center w-6 h-6 rounded-full ml-14 -mt-5"
         style={{zIndex:100,backgroundColor:savedTheme === 'light'?'#eff0f1':'#18191b',border:savedTheme === 'light' ?'3px solid #eff0f1':'3px solid #18191b'}}
         ><AiFillMoon className="w-6 h-6" style={{color:savedTheme === 'light' ? '#4a4a26':'#cfcfa0'}}/></span></Tooltip>}
        </div>
       </div>
       <div className="flex flex-col gap-3 w-full mt-7 md:mt-0">
         <div className="flex gap-3">
           <h1 className="hidden md:block font-medium text-xl">{user.nickname}</h1>
          
         </div>
         <div className="flex items-center gap-6">
         <div className="flex-col items-center md:flex-row text-center">{postList.length} <b className="font-semibold ml-1">posts</b></div>
           <div className="flex-col items-center md:flex-row text-center">{friendCount} <b className="font-semibold ml-1">friends</b></div>
         </div>
         <p style={{color:savedTheme ==='light'?'#5e666e':'#d6d9dc'}}>{user.description}</p>
         <div className="flex gap-4 mt-8 md:mt-4 -ml-20 md:-ml-0 font-medium text-sm  md:text-lg">
         {friendStatus === 'Add Friend' && (
             <button  style={{color: '#26374a' ,backgroundColor:'#a0b6cf'}}  onClick={handleAddFriend} className=" px-2.5 md:px-4 py-1 md:py-2 rounded">
               Add Friend
             </button>
           )}
           {friendStatus === 'Request Sent' && (
             <button  style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',backgroundColor:savedTheme ==='light'?'#fbfbfb':'#232629'}} className=" text-white px-2.5 md:px-4 py-1 md:py-2 rounded" disabled>
               Request Sent
             </button>
           )}
           {friendStatus === 'Friends' && (
             <button onClick={()=>setModalConfirmation(true)} style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',backgroundColor:savedTheme ==='light'?'#fbfbfb':'#232629', color:savedTheme === 'light' ? '#26374a' : '#a0b6cf'}} className=" px-2.5 md:px-4 py-1 md:py-2 rounded" >
               Friends
             </button>
           )}
           <button style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',backgroundColor:savedTheme ==='light'?'#fbfbfb':'#232629', color:savedTheme === 'light' ? '#26374a' : '#a0b6cf'}} onClick={() => setModalOpen(true)} className=" px-2.5 md:px-4 py-1 md:py-2 rounded">Send Message</button>
         </div> {/* Displaying 'description' */}
         <div className="flex justify-center items-center w-full  -ml-20 md:-ml-0"
         style={{borderTop:savedTheme==='light'?'1px solid #dddfe2':'1px solid #3b3f45'}}
         >
         
         </div>
         {user.isPrivate && friendStatus !== 'Friends' ? (
  // If the user is private and the viewer is not a friend, show a message or empty state
  <div className="flex flex-col items-center justify-center mt-12">
    <div style={{borderRadius:"100%",border:savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45'}} className="camera-wrapper">
      <LockIcon sx={{width:'125px',height:'125px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
    </div>
    <p style={{color:savedTheme === 'light' ? '#232629' : '#fbfbfb'}} className="text-xl font-semibold mt-2">This user's posts are private</p>
  </div>
) : (
  posts.length > 0 ? (
    posts.map((post) => (
     
       <div
        key={post.id}
        className="post   py-4 px-2 md:px-4 mb-4 mt-4 -ml-20 flex flex-col md:flex-row justify-between w-full"
        style={{
          backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
          borderRadius: '5px',
          border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
          width:'100%'
        }}
      >
        <div className="flex flex-col mb-3 md:mb-0">
          {post.highlight === 'Highlighted' && (
            <div
              className="high font-semibold text-xs p-1 w-fit -ml-3.5 -mt-4"
              style={{ backgroundColor: '#a0b6cf', color: '#26374a' }}
            >
              Highlighted
            </div>
          )}
          <p className="mt-3 md:mt-0"><strong>Feeling:</strong> {post.feeling}</p>
          <p>{post.text}</p>
        </div>
        <div className="flex items-center" style={{zIndex:0}}>
          <Checkbox
           icon={<FavoriteBorder sx={{color:savedTheme ==='light' ? '#26374a':'#a0b6cf'}}/>}
           checkedIcon={<Favorite sx={{color:savedTheme ==='light' ? '#26374a':'#a0b6cf'}}/>}
            checked={!!likedPosts[post.id]} // Ensure the checkbox is checked if the post is liked
            onChange={() => handleToggleBookmark(post.id)}
          />
        </div>
      </div>
     
    ))
  ) : (
    <div className="flex flex-col items-center justify-center mt-12 mb-4  -ml-24 w-full">
      <div style={{borderRadius:"100%",border:savedTheme ==='light'?'3px solid #dddfe2':'3px solid #3b3f45'}} className="camera-wrapper">
        <CameraAltIcon sx={{width:'125px',height:'125px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
      </div>
      <p style={{color:savedTheme==='light'?'#232629':'#fbfbfb',}} className="text-xl font-semibold mt-2">No posts yet</p>
    </div>
  )
)}

       </div>
     </div>
     {ModalConfirmation && 
     <div>
       <Modal
      open={ModalConfirmation}
      onClose={handleCloseConfirmation}
     >
     <Box sx={style}>
       <div className="flex flex-col">
         <p>Are you sure you want to remove <b>{user.nickname}</b> from friends</p>
         <div className="flex gap-3 justify-end mt-4">
         <button className="p-1" style={{color: '#26374a',backgroundColor:'#a0b6cf',borderRadius:'10px'}}  onClick={handleRemoveFriend}>Confirm</button>
         <button className="p-1.5" style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',backgroundColor:savedTheme ==='light'?'#fbfbfb':'#232629' ,borderRadius:'10px'}} onClick={handleCloseConfirmation}>Cancle</button>
         </div>
       </div>
     </Box>  
     </Modal>
     </div>
     }
     {isModalOpen && (
     <div>
       <Modal
      open={isModalOpen}
      onClose={() => setModalOpen(false)}
    >
      <Box sx={style}>
       
      <SendMessageModal recipientUser={user} onClose={() => setModalOpen(false)} />
        
      </Box>  
    </Modal>
     </div>
       
      )}
   </div>
    )
    }
     
    </div>
  );
};

const SendMessageModal = ({ recipientUser, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Retrieve the logged-in user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (!currentUser || !currentUser.id) {
      console.error('Current user is not defined');
      return;
    }

    if (!recipientUser || !recipientUser.id) {
      console.error('Recipient user is not defined');
      return;
    }

    if (!message.trim()) {
      console.error('Message cannot be empty');
      return;
    }

    const newMessage = {
      senderId: currentUser.id,
      senderNickname: currentUser.nickname,
      recipientId: recipientUser.id,
      recipientNickname: recipientUser.nickname,
      content: message,
      timestamp: new Date().toISOString(),
    };

    // Save the message in localStorage or send to the backend
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    setMessage('');  // Clear the message input
    onClose();  // Close the modal
    console.log('Message sent to', recipientUser.nickname);
  };

  const savedTheme = localStorage.getItem('color') || 'light';

  return (
    <div>
      <h3>Send a message to <b>{recipientUser.nickname}</b></h3>
     <div className="flex flex-col gap-4 mt-2">
     <textarea rows='2' style={{ background: savedTheme === 'light' ? '#fbfbfb' : '#232629', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '10px', border: savedTheme === 'light' ? '2px solid #dddfe2' : '2px solid #3b3f45' }}
       value={message} onChange={(e) => setMessage(e.target.value)} />
      <div className="flex gap-4 justify-end">
      <button className="p-1" style={{color: '#26374a',backgroundColor:'#a0b6cf',borderRadius:'10px'}} onClick={handleSendMessage}>Send</button>
      <button className="p-1.5" style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',backgroundColor:savedTheme ==='light'?'#fbfbfb':'#232629' ,borderRadius:'10px'}} onClick={onClose}>Cancel</button>
      </div>
     </div>
    </div>
  );
};



const SendMessage = (user)=>{
  const savedTheme = localStorage.getItem('color') || 'light';
   const [messages, setMessages] = useState([]);

   const updateMessagesInLocalStorage = (messages) => {
    localStorage.setItem('messages', JSON.stringify(messages));
  };

  useEffect(() => {
    // Retrieve messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, []);

  // Retrieve the logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (!currentUser || !currentUser.id) {
    console.error('Current user is not defined');
    return <div>Error: No current user</div>;
  }

  const handleMarkAsRead = (messageToRemove) => {
    // Remove the specific message only if it is related to the current user
    const updatedMessages = messages.filter(
      (msg) =>
        (msg.senderId !== currentUser.id && msg.recipientId !== currentUser.id) ||
        msg.timestamp !== messageToRemove.timestamp
    );
    setMessages(updatedMessages);
    updateMessagesInLocalStorage(updatedMessages);
  };

  const handleClearAllMessages = () => {
    // Clear all messages related to the current user
    const updatedMessages = messages.filter(
      (msg) => msg.senderId !== currentUser.id && msg.recipientId !== currentUser.id
    );
    setMessages(updatedMessages);
    updateMessagesInLocalStorage(updatedMessages);
  };
  // Filter messages that are either sent by or received by the current user
  const userMessages = messages.filter(
    (message) =>
      message.senderId === currentUser.id || message.recipientId === currentUser.id
  );
  return (
    <div className="messages p-4 mt-6 md:mt-0">
    <div className="flex justify-between items-center mb-0 md:mb-5">
    <h2 style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="font-bold text-xl md:text-2xl mb-2">Messages</h2>
    <button style={{ background: '#a0b6cf', color: '#26374a', borderRadius: '10px', padding: '5px' }} className="text-xs md:text-base" onClick={handleClearAllMessages}>Clear All Messages</button>
    </div>
    {userMessages.length > 0 ? (
     <div>
      {userMessages.map((msg, index) => (
       <div className="">
         <div className="flex items-center justify-between p-2 mb-2" key={index} style={{ background: savedTheme === 'light' ? '#fbfbfb' : '#232629', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '10px', border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45' }}>
         <div className="">
         <p>
            <strong className="text-sm md:text-base" style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>{msg.senderNickname}</strong> to{' '}
            <strong className="text-sm md:text-base" style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>{msg.recipientNickname}</strong> : <p className="text-sm md:text-base">{msg.content}</p>
          </p>
          <span className="text-xs md:text-base"><strong  style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }} className="mr-4">Time:</strong>{new Date(msg.timestamp).toLocaleString()}</span>
          
         </div>
        <div className="flex">
        <button className="p-0.5 md:p-1.5 hidden md:block" style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px' }} onClick={() => handleMarkAsRead(msg)}>Mark as Read</button>  
        <button className=" block md:hidden text-xs md:text-base" style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px',padding:'1px' }} onClick={() => handleMarkAsRead(msg)}><DoneOutlinedIcon/></button>  
        </div>
        </div>
       </div>
      ))}

     </div>
    ) : (
      <div className="flex flex-col items-center justify-center mt-12">
          <div style={{ borderRadius: "100%", border: savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45' }} className="camera-wrapper">
            <TbMessagesOff  style={{ width: '125px', height: '125px', padding: '20px', color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} />
          </div>
          <p style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb', }} className="text-xl font-semibold mt-2">No Messages yet</p>
        </div>
    )}
   
  </div>
  );
}

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  const [friendStatus, setFriendStatus] = useState('');
  const [friendCount, setFriendCount] = useState(user.friends?.length || 0);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    setNotifications(storedNotifications[user.id] || []);
  }, [user.id]);

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
    setNotifications(updatedNotifications);

    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    storedNotifications[user.id] = updatedNotifications;
    localStorage.setItem('notifications', JSON.stringify(storedNotifications));
  };

  const handleAcceptFriend = (notification) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
  
    const currentUserId = currentUser.id;
    const senderId = notification.senderId;
  
    const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
    if (!storedFriends[currentUserId]) storedFriends[currentUserId] = [];
    if (!storedFriends[senderId]) storedFriends[senderId] = [];
    console.log('Updated Friends List:', storedFriends);
    // Add each other to friends list
    if (!storedFriends[currentUserId].includes(senderId)) {
      storedFriends[currentUserId].push(senderId);
    }
    if (!storedFriends[senderId].includes(currentUserId)) {
      storedFriends[senderId].push(currentUserId);
    }
  
    localStorage.setItem('friends', JSON.stringify(storedFriends));
  
    // Send notification to the sender
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    const senderNotifications = storedNotifications[senderId] || [];
    senderNotifications.push({
      senderNickname: currentUser.nickname,
      action: 'accepted your friend request',
      timestamp: new Date().toISOString(),
      id: Date.now(),
    });
  
    storedNotifications[senderId] = senderNotifications;
    localStorage.setItem('notifications', JSON.stringify(storedNotifications));
  
    // Mark the request as accepted
    markAsRead(notification.id);
  
    // Update UI
    setFriendStatus('Friends');
    setFriendCount(prevCount => prevCount + 1);
  };
  

  const clearAllNotifications = () => {
    setNotifications([]);
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    storedNotifications[user.id] = [];
    localStorage.setItem('notifications', JSON.stringify(storedNotifications));
  };

  const savedTheme = localStorage.getItem('color') || 'light';

  return (
    <div className="notifications p-3 md:p-4 mt-6 md:mt-0">
      <div className="flex justify-between  items-center mb-0 md:mb-5">
      <h2 style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="font-bold text-xl md:text-2xl mb-2">Notifications</h2>
      <button className="text-xs md:text-base" onClick={clearAllNotifications} style={{ background: '#a0b6cf', color: '#26374a', borderRadius: '10px', padding: '4px' }}>Clear All Notifications</button>
      </div>
      {notifications.length > 0 ? (
        <>
          {notifications.map((notification) => (
            <div key={notification.id} className="notification p-2 mb-2 flex justify-between items-center" style={{ background: savedTheme === 'light' ? '#fbfbfb' : '#232629', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '10px', border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45' }}>
              <p className="font-normal text-sm" key={notification.id}>
                <strong  style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }} className="font-semibold text-sm md:text-base">{notification.senderNickname}</strong> {notification.action} {notification.action2} <em>{notification.postText}</em>
              </p>
              {notification.action === 'Sent a friend request' ? (
                <>
                 <div className="flex gap-2">
                 <button onClick={() => handleAcceptFriend(notification)} style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px', padding: '5px' }}>Accept Friend</button>
                 <button onClick={() => markAsRead(notification.id)} style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px', padding: '5px' }}> <CloseIcon /></button>
                 </div>
                </>
              ) : (
                <div className="flex">
                  <button className="p-0.5 md:p-1.5 hidden md:block"  onClick={() => markAsRead(notification.id)} style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px', padding: '5px' }}>Mark as Read</button>
                  <button className=" block md:hidden" onClick={() => markAsRead(notification.id)} style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px', padding: '1px' }}><DoneOutlinedIcon/></button>
                </div>
              )}
            </div>
          ))}
         
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12">
          <div style={{ borderRadius: "100%", border: savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45' }} className="camera-wrapper">
            <NotificationsOffIcon sx={{ width: '125px', height: '125px', padding: '20px', color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} />
          </div>
          <p style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb', }} className="text-xl font-semibold mt-2">No Notification yet</p>
        </div>
      )}
    </div>
  );
};




const EditProfile = ({ handleGoBack }) => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(''); // Image URL
  const [isPrivate, setIsPrivate] = useState(false); // Account privacy
  const [password, setPassword] = useState('');
  const [nickname,setNickname]=useState('')
  const [error, setError] = useState('');
  const [savedChangesMessage, setSavedChangesMessage] = useState(false);
  const [changesDescription,setChangesDescription]=useState(false) //// error for long description
  const[changesUsername,setChangesUsername]=useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setImage(parsedUser.avatar || ''); // Set initial image state from user data
      setIsPrivate(parsedUser.isPrivate || false);
    }
  }, []);

  const handleImageChange = (e) => {
    const { value } = e.target;
    setImage(value); // Update the image URL state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'nickname' && value.length > 12) {
      setChangesUsername(true);
      setTimeout(() => {
        setChangesUsername(false);
      }, 3000);
      return; // Prevent further updates if length exceeds 12
    }
  
    if (name === 'description' && value.length > 10) {
      setChangesDescription(true);
      setTimeout(() => {
        setChangesDescription(false);
      }, 3000);
      return; // Prevent further updates if length exceeds 10
    }
  
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSaveChanges = async () => {
    const updatedUser = { ...user };
  
    if (password.trim() !== '') {
      updatedUser.password = password;
    }
  
    if (image.trim() !== '') {
      updatedUser.avatar = image; // Update avatar with the new image URL
    }
  
    // Save updated user in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
  
    try {
      // Fetch current users from the API
      const response = await axios.get('https://api.jsonbin.io/v3/b/66f02668ad19ca34f8aab320', {
        headers: {
          'X-Master-Key': '$2a$10$FLD5iYCGIbkUuKuyqX1Ee.zWVlf6DEH70.S5VMHv6pxLixGBbmYJq'
        }
      });
  
      const users = response.data.record.users; // Get the list of all users
  
      // Ensure the current user exists and update their details
      const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
  
      // Save the updated users list back to the API
      await axios.put(
        'https://api.jsonbin.io/v3/b/66f02668ad19ca34f8aab320',
        { users: updatedUsers }, // Send the entire updated users list
        {
          headers: {
            'X-Master-Key': '$2a$10$FLD5iYCGIbkUuKuyqX1Ee.zWVlf6DEH70.S5VMHv6pxLixGBbmYJq',
            'Content-Type': 'application/json'
          }
        }
      );
  
      // Display success message and navigate back
      setSavedChangesMessage(true);
      setTimeout(() => {
        setSavedChangesMessage(false);
        handleGoBack();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to save changes');
    }
  };

  const handleTogglePrivacy = () => {
    const newPrivacySetting = !isPrivate;
    setIsPrivate(newPrivacySetting);
    setUser({ ...user, isPrivate: newPrivacySetting });
    localStorage.setItem('user', JSON.stringify({ ...user, isPrivate: newPrivacySetting })); // Update in local storage
  };

  if (!user) {
    return <div className="mt-12 lg:mt-0">Loading user data...</div>;
  }

  const savedTheme = localStorage.getItem('color') || 'light';

  return (
    <div className="flex gap-5 md:gap-14  w-full" style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb', marginTop: 30 }}>
      <div className="cursor-pointer h-fit" onClick={handleGoBack} style={{ color: savedTheme === 'light' ? '#5e666e' : '#d6d9dc' }}>
        <ArrowBackIosNewIcon />
      </div>
      <div className="flex flex-col w-3/4 -ml-3 lg:-ml-0">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 p-4" style={{ backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#232629', borderRadius: '10px' }}>
          <div className="flex gap-4">
            <Avatar sx={{ width: '55px', height: '55px' }} alt={user.nickname} src={image} /> {/* Use the image state */}
            <div className="flex flex-col">
              <h1 className="font-medium text-lg">{user.nickname}</h1>
              <p className="font-light text-md" style={{ color: savedTheme === 'light' ? '#5e666e' : '#d6d9dc' }}>
                {user.description}
              </p>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={handleImageChange} // Update image URL
            className="p-1 md:p-2 w-48 md:w-fit"
            style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px',border:savedTheme ==='light'?'#dddfe2':'#3b3f45' }}
          />
          <button onClick={handleSaveChanges} className="px-2 font-medium" style={{ backgroundColor: savedTheme === 'light' ? '#A0B6CF' : '#A0B6CF', color: savedTheme === 'light' ? '#26374a' : '#26374a', borderRadius: '5px' }}>
            Change Photo
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">

<p className="font-light"> Description</p>
  <input
    type="text"
    name="description"
    value={user.description}
    onChange={handleInputChange}
    className="p-1 md:p-2"
    style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px', border:savedTheme ==='light'?'#dddfe2':'#3b3f45'}}
  />
</div>
<div className="flex flex-col gap-2 mt-3">
          <p className="font-light">Gender</p>
           
          <select
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
              className="p-2"
              style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px',border:savedTheme ==='light'?'#dddfe2':'#3b3f45' }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <p className="font-extralight text-xs">This won't be part of your public profile</p>
          </div>
        <p className="font-semibold mt-6 text-lg">Account settings</p>
  <p className="font-light mt-3 mb-2">Username</p>
  <input
  type="text"
  name="nickname"
  value={user.nickname}
  onChange={handleInputChange}
  className="p-2"
  style={{ 
    backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', 
    color: savedTheme === 'light' ? '#232629' : '#fbfbfb', 
    borderRadius: '5px',
    border: savedTheme === 'light' ? '#dddfe2' : '#3b3f45' 
  }}
/>
   <p className="font-light mt-3 mb-2">Password</p>
    <input
      type="password"
      name="password"
      value={password}
      onChange={handlePasswordChange}
      className="p-2"
      style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px',border:savedTheme ==='light'?'#dddfe2':'#3b3f45' }}
    />
    <div className="flex items-center gap-4 md:gap-2 mt-4">
  <p className="font-light text-sm md:text-md">Account Privacy</p>
  <label className="switch">
    <input type="checkbox" checked={isPrivate}  style={{
accentColor: isPrivate ? "#a0b6cf" : "",transform: "scale(1.2)", // Scale the checkbox to make it larger
width: '15px',  // Optional width for alignment purposes
height: '15px', // Use accentColor to apply color when checked
}} onChange={handleTogglePrivacy} />
    <span className="slider round"></span>
  </label>
  <span>{isPrivate ? 'Private' : 'Public'}</span>
  </div>
        <button onClick={handleSaveChanges} className="mt-2 p-2 font-semibold" style={{ backgroundColor: savedTheme === 'light' ? '#A0B6CF' : '#A0B6CF', color: savedTheme === 'light' ? '#26374a' : '#26374a', borderRadius: '5px' }}>
          Save Changes
        </button>
      </div>
      {savedChangesMessage && (
        <Snackbar
          open={savedChangesMessage}
          sx={{ backgroundColor: '#a0cfa0', color: '#264a26', borderRadius: 15 }}
          autoHideDuration={6000}
          onClose={() => setSavedChangesMessage(false)}
        >
          <SnackbarContent
            sx={{ backgroundColor: '#a0cfa0', color: '#264a26', fontWeight: 500 }}
            message="Changes are made successfully"
          />
        </Snackbar>
      )}
       {changesDescription && (
        <Snackbar
          open={changesDescription}
          sx={{ backgroundColor: '#cfcfa0', color: '#4a4a26', borderRadius: 15 }}
          autoHideDuration={6000}
          onClose={() => setChangesDescription(false)}
        >
          <SnackbarContent
            sx={{ backgroundColor: '#cfcfa0', color: '#4a4a26', fontWeight: 500 }}
            message="Description must have 15 letters max"
          />
        </Snackbar>
      )}
       {changesUsername && (
        <Snackbar
          open={changesUsername}
          sx={{ backgroundColor: '#cfcfa0', color: '#4a4a26', borderRadius: 15 }}
          autoHideDuration={6000}
          onClose={() => setChangesDescription(false)}
        >
          <SnackbarContent
            sx={{ backgroundColor: '#cfcfa0', color: '#4a4a26', fontWeight: 500 }}
            message="Nickname must have 12 letters max"
          />
        </Snackbar>
      )}
    </div>
  );
};


const Create = ({ handleAddPost,user, toggleHighlight, highlight }) => {

  const [feeling, setFeeling] = useState('');
  const [userPosts,setUserPosts]=useState([])
  const [text, setText] = useState('');
  const [emptyError,setEmptyError]=useState(false)
  const [open, setOpen] = useState(false); /// error snackbar
  const [postsuccess,setPostsuccess]=useState(false)

  const handleFeelingChange = (e) => {
    setFeeling(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (feeling.trim() !== '' && text.trim() !== '') {
      setPostsuccess(true);
      setTimeout(() => {
        setPostsuccess(false);
      }, 3000);
      
      const newPost = handleAddPost(feeling, text, highlight, user.id);
      
      // Optionally, add the new post to the current user's posts state
      setUserPosts(prevPosts => [...prevPosts, newPost]);
  
      // Reset input fields
      setFeeling('');
      setText('');
    } else {
      setEmptyError(true);
      setOpen(true);
      setTimeout(() => {
        setEmptyError(false);
      }, 3000);
    }
  };
  
  
  const savedTheme = localStorage.getItem('color') || 'light';
  return (
  <div className="mt-10 lg:mt-0">
      <div className="md:flex hidden  flex-col">
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
        <div className="hidden md:block">  <option value="">How are you Feeling</option></div>
        <div className="block md:hidden">  <option value=""> Feeling</option></div>
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
    <div className="md:hidden flex flex-col">
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
       
       </div>
      <div className="flex flex-col w-fit gap-4 mt-4 items-center" >
        <p style={{color: savedTheme === 'light' ? '#232629' : '#fbfbfb'}} className="text-xs text-light">Choose if you want the post to be highlighted or not</p>
         <div className="flex gap-4 mb-4">
         <button className="p-1 text-sm font-semibold" style={{backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',color: savedTheme === 'light' ? '#232629' : '#fbfbfb',border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',borderRadius:'10px'}} onClick={()=>toggleHighlight('Highlighted')}>Highlighted</button>
         <button className="p-1 text-sm font-semibold" style={{backgroundColor:savedTheme==='light'?'#fbfbfb':'#232629',color: savedTheme === 'light' ? '#232629' : '#fbfbfb',border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',borderRadius:'10px'}} onClick={()=>toggleHighlight('Not Highlighted')}>Not Highlighted</button>
         </div>
      </div>
      <select 
        style={{ backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px',padding:'3px' }} 
        value={feeling} onChange={handleFeelingChange}>
        <div className="hidden md:block">  <option value="">How are you Feeling</option></div>
        <div className="block md:hidden">  <option value=""> Feeling</option></div>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Excited">Excited</option>
        </select>
       <div className="flex w-full justify-center mt-4">
       <button type="submit" className="px-2 font-medium " style={{ backgroundColor: '#A0B6CF', color: '#26374a', borderRadius: '5px',width:'100%' }}>
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
    {postsuccess &&
    <div>
    <Snackbar
     open={postsuccess}
     sx={{backgroundColor:'#cfa0a0',color:'#4a2626', borderRadius:15}}
     autoHideDuration={6000}
     onClose={() => postsuccess(false)}
    
   >
      <SnackbarContent
         sx={{
           backgroundColor: '#a0cfa0',
           color: '#264a26',
           fontWeight:500,
          
         }}
         message="Post made Successfully"
       />
   </Snackbar>
 </div>
    }
  </div>
  );
};

const ModalPost =({post,open,handleClosePost,handleSaveChanges })=>{

  const savedTheme = localStorage.getItem('color') || 'light';

  const [editedFeeling, setEditedFeeling] = useState(post.feeling);
  const [editedText, setEditedText] = useState(post.text);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: savedTheme ==='light'? '#fbfbfb' : 'rgb(35, 38, 41)',
    color: savedTheme ==='light'? '#232629' : '#fbfbfb',
   border: savedTheme ==='light'?'1px solid #3b3f45':'1 px solid #dddfe2',
   borderRadius:'10px',
   
    p: 4,
  };

  const handleFeelingChange = (e) => {
    setEditedFeeling(e.target.value);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSave = () => {
    handleSaveChanges(post.id, editedFeeling, editedText);
    handleClosePost();
  };

  return(
    <div>
      <Modal
       open={open}
       onClose={handleClosePost}
      >
      <Box sx={style}>
      {post.highlight === 'Highlighted' &&
              <div className="high font-semibold text-xs p-1 w-fit -ml-8 -mt-8"
                style={{ backgroundColor: '#a0b6cf', color: '#26374a' }}
              >Highlighted</div>
            }
            <p><strong>Feeling:</strong> {post.feeling}</p>
            <p>{post.text}</p>
            <div className="flex flex-col"  >
              <p className="font-extralight text-sm mt-4">Settings</p>
              <p><strong>Feeling:</strong></p>
        <select
          type="text"
          value={editedFeeling}
          onChange={handleFeelingChange}
          className="input-field mt-2 mb-4 p-2"
          style={{
            backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
            borderRadius: '5px',
            border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',}}
        >
         <option value="">How are you Feeling</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Excited">Excited</option>
        </select>
        <p><strong>Text:</strong></p>
        <textarea
          value={editedText}
          onChange={handleTextChange}
          className="input-field mt-2 mb-4 p-2"
          rows="3"
          style={{
            backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
            borderRadius: '5px',
            border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',}}
        />
        <div className="flex justify-end gap-4">
          <button onClick={handleSave}
            style={{ backgroundColor: '#a0b6cf', color: '#26374a' }}
          className="save-button p-2 bg-blue-500 text-white rounded">
            Save Changes
          </button>
          <button onClick={handleClosePost}
          style={{  backgroundColor: '#cfa0a0',
              color: '#4a2626',}} className="close-button p-2 bg-red-500 text-white rounded">
            Cancel
          </button>
        </div>
            </div>
      </Box>
      </Modal>
    </div>
  )
}
export default Main;