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
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function
import useMeasure from "react-use-measure"
import {
  useDragControls,
  useMotionValue,
  useAnimate,
} from "framer-motion";

const Main = () => {

  const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [posts, setPosts] = useState([]);
    const [highlight, setHighlight] = useState('Not Highlighted');
    const [showUserProfile,setShowUserProfile]=useState(null)
    const [notifications, setNotifications] = useState([]);
  

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

   




    
    const toggleHighlight = (highlight) => {
      setHighlight(highlight);
    };

    const handleAddPost = async (feeling, text, highlight, userId, userNickname, userAvatar) => {
      // Prevent execution if any required fields are missing
      if (!feeling.trim() || !text.trim()) {
        console.error('Please fill out all fields.');
        return;
      }
    
      try {
        // 1. Create the new post object
        const newPost = {
          id: uuidv4(),
          feeling,
          text,
          highlight,
          userId,
          userNickname,
          userAvatar,
          createdAt: new Date().toISOString(), // Include createdAt
        };
    
        // 2. Fetch the existing user data
        const userResponse = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${userId}`);
        const existingUser = userResponse.data;
    
        // 3. Update the user's posts array
        const updatedPosts = [...existingUser.posts, newPost];
    
        // 4. Send a PUT request to update the user with the new post
        await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${userId}`, {
          ...existingUser,
          posts: updatedPosts,
        });
    
        // Optionally update local storage if needed
        const existingLocalPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedLocalPosts = [...existingLocalPosts, newPost];
        localStorage.setItem('posts', JSON.stringify(updatedLocalPosts));
    
        // You can return the new post or perform further actions
        return newPost; // Return the new post instead of response.data
      } catch (error) {
        console.error("Error adding post:", error);
        throw error; // Handle errors as needed
      }
    };
    
    
    
    
    
  
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCloseLogOut = async () => {
        setAnchorEl(null);
        const updatedUser = { ...user, isUserOnline: false };
        await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${user.id}`, updatedUser);
        Cookies.set('isAuthenticated', 'false')
        localStorage.removeItem('onlineStatus');
      };
///////Sidebar functions  /////
const [activeTab, setActiveTab] = useState('home');


///notification //////


const [notificationsCount, setNotificationsCount] = useState(0);

const [lastFetchTime, setLastFetchTime] = useState(null);

 // Fetch notifications function
 const fetchNotifications = async () => {
  try {
    const response = await axios.get(`${apiUrl}/${user.id}`);
    const userData = response.data;

    // Set notifications and unread count
    setNotifications(userData.notifications || []);
    const unreadNotificationsCount = userData.notifications.filter(notification => 
      !notification.read && 
      (notification.type === 'friendRequest' || notification.type === 'friendRequestAccepted')
    ).length;
    setNotificationsCount(unreadNotificationsCount);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

////// message .//// 





const [messagesCount, setMessagesCount] = useState(0); // Unread messages count
const [messages, setMessages] = useState([]); // Messages state


const fetchMessages = async () => {
  try {
    const response = await axios.get(`${apiUrl}/${user.id}`);
    const userMessages = response.data.messages || [];
    setMessages(userMessages);

    // Set unread messages count
    const unreadMessagesCount = userMessages.filter(msg => !msg.read).length;
    setMessagesCount(unreadMessagesCount);
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

////////
const apiUrl = "https://66edb996380821644cddd154.mockapi.io/api/users";

useEffect(() => {
  if (user && user.id) {
    fetchNotifications(); // Fetch notifications when user is available
    fetchMessages();      // Fetch messages when user is available
  }
}, [user]); 


const handleTabChange = (tab) => {

  
  setActiveTab(tab);
  setEditProfile(false)

  if (tab === 'notifications') {
    // Reset unread notifications count when the notifications tab is clicked
    setNotificationsCount(0);

    // Mark all notifications as read (you can add logic here to send updated data to the backend)
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  }

  if (tab === 'messages') {
    // Reset unread messages count when the messages tab is clicked
    setMessagesCount(0);

    // Mark all messages as read (you can add logic here to send updated data to the backend)
    const updatedMessages = messages.map(message => ({
      ...message,
      read: true,
    }));
    setMessages(updatedMessages);
  }
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
         <span  style={{borderRadius:'50%',background:savedTheme ==='light'?'#A0B6CF':'#A0B6CF',color:'#26374a'}} className=" px-2 font-bold notification-badge"> {messagesCount > 0 && <span>{messagesCount}</span>}</span>
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
        {activeTab === 'notification' && <Notifications user={user} setNotifications={setNotifications} notifications={notifications}/>}
        {activeTab === 'create' &&   <Create highlight={highlight} toggleHighlight={toggleHighlight} user={user} handleAddPost={handleAddPost} />}
        <div className="empty3 block lg:hidden"></div>
      </div>
      
    </div>
  );
}



const HomeComponent = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers,setAllUsers]=useState([])
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState({});
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');
        const usersData = usersResponse.data || [];
  
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser || !currentUser.id) {
          throw new Error("No logged-in user found.");
        }
  
        const currentUserFriendships = usersData.find(user => user.id === currentUser.id)?.friendships || [];
        const friendIds = currentUserFriendships
          .filter(friend => friend.status === "accepted")
          .map(friend => friend.friendId);
  
        if (friendIds.length === 0) {
          console.warn("No friends found for the current user.");
          setAllPosts([]); 
          return;
        }
  
        const friendPosts = [];
        for (const friendId of friendIds) {
          const friend = usersData.find(user => user.id === friendId);
          if (friend && friend.posts) {
            friendPosts.push(
              ...friend.posts.map(post => ({
                ...post,
                userNickname: friend.nickname, 
                userAvatar: friend.avatar, 
              }))
            );
          }
        }
  
        const privateFriendPosts = usersData
          .filter(user => user.is_private && friendIds.includes(user.id))
          .flatMap(user =>
            user.posts.map(post => ({
              ...post,
              userNickname: user.nickname,
              userAvatar: user.avatar,
            }))
          );
  
        setAllPosts([...friendPosts, ...privateFriendPosts]);
  
        console.log([...friendPosts, ...privateFriendPosts]); // Log posts with avatar and nickname
  
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  
  


  // Handle bookmark and like actions
  

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
  // Use userNickname and userAvatar directly from the post object
  const userNickname = post.userNickname || 'Unknown User';
  const userAvatar = post.userAvatar;

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
        {userAvatar ? (
        <Avatar
          src={userAvatar}
          alt={`${userNickname}'s avatar`}
          className="w-8 h-8 rounded-full"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Avatar
          alt="Unknown User's avatar"
          className="w-8 h-8 rounded-full bg-gray-400"
        />
      )}
          <p style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>
          <b>{post.userNickname}</b>
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <p><strong className="text-lg">Feeling:</strong> {post.feeling}</p>
        <p>{post.text}</p>
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
        // Fetch all users (including their posts) from the single API endpoint
        const response = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');

        const users = response.data || []; // Directly access the users array
        setAllUsers(users); // Save all users

        // Extract posts from each user and combine them into a single array
        const posts = users.flatMap(user => user.posts || []);
        setAllPosts(posts); // Save all posts
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err); // Log error for debugging
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
        // Fetch all users (including their posts) from the single API endpoint
        const response = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');

        const users = response.data || []; // Directly access the users array
        setAllUsers(users); // Save all users

        // Extract posts from each user and combine them into a single array
        const posts = users.flatMap(user => user.posts || []);
        setAllPosts(posts); // Save all posts
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err); // Log error for debugging
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
        user.nickname?.toLowerCase().startsWith(lowerCaseQuery) // Use optional chaining
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

 
  const [searchedUserId, setSearchedUserId] = useState(null);

   const showUser = (user) => {
    setShowUserProfile(user);
    setSearchedUserId(user.id); // Set the searched user ID here
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
            searchedUserId={searchedUserId}
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
  // Find the user by ID, default to an object with a nickname
                    const user = allUsers.find(user => user.id === post.userId) || { nickname: 'Unknown User', avatar: '' };

                    return (
                      <div
                        key={post.id}
                        className="post py-6 px-8 flex flex-col "
                        style={{
                          backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
                          borderRadius: '5px',
                          border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
                        }}
                      >
                        <div className="flex justify-between gap-2 items-center -ml-5">
                          <div className="flex gap-2 items-center -mt-2 ml-1">
                            {user.avatar ? (
                              <Avatar
                                src={user.avatar}
                                alt={`${user.nickname}'s avatar`}
                                className="w-8 h-8 rounded-full"
                                style={{ objectFit: 'cover' }}
                              />
                            ) : (
                              <Avatar
                                alt="Unknown User's avatar"
                                className="w-8 h-8 rounded-full bg-gray-400" // Fallback style for unknown users
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
                        <Avatar src={user.avatar} alt={`${user.nickname || 'Unknown User'}'s avatar`} style={{ width: '50px', height: '50px', zIndex: 0 }} />
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold">{user.nickname || 'Unknown User'}</p> {/* Fallback here too */}
                          <p className="font-light text-sm" style={{color:savedTheme ==='light'?'#5e666e':'#d6d9dc'}}>{user.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Handle case where no users match the search
                  <div className="flex flex-col items-center justify-center mt-12">
                    <div style={{ borderRadius: "100%", border: savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45' }} className="camera-wrapper">
                      <PersonIcon sx={{ width: '125px', height: '125px', padding: '20px', color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} />
                    </div>
                    <p style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="text-xl font-semibold mt-2">No users found</p>
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
  const [allPosts,setAllPosts]=useState([])
  const [usersPost,setUserPosts]=useState([])
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

  const handleCloseLogOut = async () => {
    setAnchorEl(null);
    const updatedUser = { ...user, isUserOnline: false };
    await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${user.id}`, updatedUser);
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
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Correctly set user from localStorage
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users from JSONBin
        const usersResponse = await axios.get('https://api.jsonbin.io/v3/b/66f02668ad19ca34f8aab320', {
          headers: {
            'X-Master-Key': '$2a$10$FLD5iYCGIbkUuKuyqX1Ee.zWVlf6DEH70.S5VMHv6pxLixGBbmYJq'
          }
        });

        // Fetch posts from JSONBin
        const postsResponse = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/posts', {
         
        });

        // Set all posts
        setAllPosts(postsResponse.data.record.posts || []);

        const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Correctly set user from localStorage
    }
        // Filter posts created by the logged-in user
        const currentUserNickname = storedUser.nickname; // Get the logged-in user's nickname
        const filteredUserPosts = postsResponse.data.record.posts.filter(post => post.userNickname === currentUserNickname);

        setUserPosts(filteredUserPosts); // Set user's own posts
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err); // Log error for debugging
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  
  
  

  const handleRemovePost = async (postId, userId) => {
    try {
      // 1. Fetch existing user data to access the posts
      const userResponse = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${userId}`);
      const existingUser = userResponse.data;
  
      // 2. Filter out the post with the matching ID from the user's posts
      const updatedPosts = existingUser.posts.filter(post => post.id !== postId);
  
      // 3. Send a PUT request to update the user with the new posts array
      await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${userId}`, {
        ...existingUser,
        posts: updatedPosts,
      });
  
      // 4. Optionally update local storage
      const existingLocalPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const updatedLocalPosts = existingLocalPosts.filter(post => post.id !== postId);
      localStorage.setItem('posts', JSON.stringify(updatedLocalPosts));
  
      // 5. Update the UI state (if you are managing posts in state)
      setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  
      console.log('Post removed successfully.');
    } catch (error) {
      console.error("Error removing post:", error);
      throw error; // Handle errors as needed
    }
  };
  
  
  
  

  const handleSaveChanges = async (postId, newFeeling, newText) => {
    try {
      // 1. Fetch the existing post data
      const postResponse = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${user.id}`);
      const existingUser = postResponse.data;
  
      // 2. Find the post to be updated
      const postToUpdate = existingUser.posts.find(post => post.id === postId);
      
      // 3. If the post is found, update its feeling and text
      if (postToUpdate) {
        postToUpdate.feeling = newFeeling;
        postToUpdate.text = newText;
  
        // 4. Update the user's posts array on the API
        await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${user.id}`, {
          ...existingUser,
          posts: existingUser.posts,
        });
  
        // 5. Update local state and local storage
        const updatedPosts = existingUser.posts;
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
  
        console.log('Post updated successfully.');
      } else {
        console.error('Post not found.');
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };
  


  const [searchedUserFriendCount, setSearchedUserFriendCount] = useState(0);

  useEffect(() => {
    const checkFriendStatus = async () => {
      // Retrieve the current user's data from localStorage
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const currentUserId = currentUser ? currentUser.id : null;
  
      if (!currentUserId) {
        console.error("No current user found");
        return;
      }
  
      try {
        // Fetch all users from MockAPI
        const usersResponse = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');
        const usersData = usersResponse.data; // Assuming the response is an array of users
  
        // Find the current user from the fetched users
        const currentUserData = usersData.find(user => user.id === currentUserId);
  
        if (currentUserData && Array.isArray(currentUserData.friendships)) {
          // Filter out friendships where the status is not "accepted"
          const acceptedFriends = currentUserData.friendships
            .filter(friendship => friendship.status === "accepted") // Only accepted friendships
            .map(friendship => {
              // Map the friendId to the actual user object
              return usersData.find(user => user.id === friendship.friendId);
            })
            .filter(friend => friend); // Filter out any undefined values (in case a friend ID isn't found)
  
          // Set the friend count and the friends list
          setSearchedUserFriendCount(acceptedFriends.length);
          setFriendsData(acceptedFriends);
        } else {
          // If no friendships found, set empty data
          setSearchedUserFriendCount(0);
          setFriendsData([]);
        }
      } catch (error) {
        // Handle errors, such as failed API calls
        console.error("Failed to fetch data:", error);
        setSearchedUserFriendCount(0);
        setFriendsData([]);
      }
    };
  
    checkFriendStatus(); // Call the function on component mount
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
           <p className="flex gap-2 cursor-pointer" onClick={()=>setFriendsChecker(true)}> {searchedUserFriendCount} <b className="font-semibold ml-1">friends</b></p>
         </div>
    <p className="font-light text-sm" style={{color:savedTheme === 'light'?'#5e666e':'#d6d9dc'}}>{user.description}</p> 
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
   <div className="hidden md:block">
   <CameraAltIcon sx={{width:'125px',height:'125px',padding:'20px'}}/>
   </div>
   <div className="block md:hidden">
   <CameraAltIcon sx={{width:'85px',height:'85px',padding:'20px'}}/>
   </div>
    </div>
      <p style={{color:savedTheme==='light'?'#232629':'#fbfbfb',}} className="text-sm md:text-xl font-semibold mt-2">No posts yet</p>
    </div>
  ) : (
    <div>
     {userPosts.map((post) => (
  <div
    key={post.id} // Use post.id instead of post.createdAt
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
      <button variant="contained" color="secondary" onClick={() => handleRemovePost(post.id,user.id)}>
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
  <Modal open={friendsChecker} onClose={() => setFriendsChecker(false)}>
    <Box sx={style}>
      <h2 className="mb-6 font-bold text-2xl">Friends List</h2>
      {friendsData.length > 0 ? (
       friendsData.map(friend => (
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
        const response = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');
        
        // Assuming users are stored directly in response.data (no 'record' wrapper)
        const users = response.data;
        setAllUsers(users || []);  // Set the fetched users
      } catch (err) {
        setError('Failed to fetch users');
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


  const [searchedUserId, setSearchedUserId] = useState(null);

  const showUser = (user) => {
    setShowUserProfile(user);
    setSearchedUserId(user.id); // Set the searched user ID here
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
          searchedUserId={searchedUserId} // Pass it here
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





const ProfileUsers = ({ user,posts, allUsers,searchedUserId,onBack }) => { // Destructure 'user' from props
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

const handleAddFriend = async () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (!currentUser) return; // Ensure the user is logged in

  const currentUserId = currentUser.id;
  const currentUserNickname = currentUser.nickname;
  const searchedUserId = user.id; // Assuming `user` is the searched user

  try {
    // Fetch all users
    const response = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');
    const data = response.data; // Array of user records

    // Find the current user and the searched user
    const currentUserRecord = data.find((u) => u.id === currentUserId);
    const searchedUserRecord = data.find((u) => u.id === searchedUserId);

    if (!searchedUserRecord || !currentUserRecord) {
      console.error("Users not found");
      return;
    }

    // Check if a friend request has already been sent
    const existingRequest = searchedUserRecord.friendships.find((friendship) => friendship.friendId === currentUserId);
    if (existingRequest) {
      console.log("Friend request already sent or you are already friends");
      return;
    }

    // Create a notification for the friend request
    const notificationMessage = {
      id: new Date().getTime().toString(), // Unique ID for the notification
      senderId: currentUser.id,
      senderNickname: currentUser.nickname,
      action: `${currentUser.nickname} has sent you a friend request.`,
      timestamp: new Date().toISOString(),
    };

    // Add notification to the searched user's notifications
    searchedUserRecord.notifications.push(notificationMessage);
    // Add the current user to the searched user's friendships as "pending"
    searchedUserRecord.friendships.push({
      friendId: currentUserId,
      status: "pending" // Friend request is pending
    });

    // Optionally, add the searched user to the current user's friendships as "requested"
    currentUserRecord.friendships.push({
      friendId: searchedUserId,
      status: "requested" // Current user has sent a request
    });

    // Add notification to the searched user's notifications
    searchedUserRecord.notifications.push(sendNotification);

    // Update both users in the API
    await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${searchedUserId}`, searchedUserRecord);
    await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${currentUserId}`, currentUserRecord);

    // Update UI with friend request status
    setFriendStatus('Request Sent');
  } catch (error) {
    console.error("Failed to send friend request:", error);
  }
};


// Function to send a notification
const sendNotification = async (userId, notification) => {
  try {
    // Send notification to the user (Assuming there's an API endpoint to handle notifications)
    await axios.post(`https://66edb996380821644cddd154.mockapi.io/api/notifications`, {
      userId,
      ...notification,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

  
  
  

  const [ModalConfirmation,setModalConfirmation]=useState(false)


  const handleCloseConfirmation =()=>{    /// close post
    
    setModalConfirmation(false)
  }

  const handleRemoveFriend = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
  
    const apiUrl = "https://66edb996380821644cddd154.mockapi.io/api/posts";
    // Replace with your actual key
  
    // Fetch friendships from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          
        });
        return response.data.record; // Return the record from the response
      } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Return null if there's an error
      }
    };
  
    // Update the JSON Bin with new data
    const updateData = async (data) => {
      try {
        await axios.put(apiUrl, data, {
         
        });
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };

    const currentUserId = currentUser.id;
    const postOwnerId = user.id;
  
    const friendships = await fetchData();
    if (!friendships) return;
  
    // Remove friend from current user's friends list
    let userFriendship = friendships.friendships.find(f => f.userId === currentUserId);
    if (userFriendship) {
      userFriendship.friends = userFriendship.friends.filter(friendId => friendId !== postOwnerId);
    }
  
    // Remove current user from the friend's friends list
    let friendFriendship = friendships.friendships.find(f => f.userId === postOwnerId);
    if (friendFriendship) {
      friendFriendship.friends = friendFriendship.friends.filter(friendId => friendId !== currentUserId);
    }
  
    await updateData(friendships); // Update the JSON Bin
    setFriendStatus('Add Friend');
    setModalConfirmation(false); // Close the confirmation modal if applicable
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


  const isUserOnline = async (userId) => {
    try {
      // Fetch the specific user's data from the API using their ID
      const response = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${userId}`);
      const user = response.data;
  
      // Return the online status of the user
      return user.isUserOnline;
    } catch (error) {
      console.error('Error fetching user online status:', error);
      return false; // Assume offline if there's an error
    }
  };

  const [isOnline, setIsOnline] = useState(false);

  // Fetch the online status asynchronously
  useEffect(() => {
    const fetchOnlineStatus = async () => {
      const online = await isUserOnline(user.id); // Call the async function
      setIsOnline(online); // Update the state with the result
    };
    
    fetchOnlineStatus(); // Invoke the function
  }, [user.id]); 

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


///// friendship status //// signify if you are friend with other user /////

   // Initialize with the user's ID
   const [searchedUserFriendCount, setSearchedUserFriendCount] = useState(0);

   useEffect(() => {
    const checkFriendStatus = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const currentUserId = currentUser ? currentUser.id : null;
  
      try {
        const response = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');
        const data = response.data;
  
        // Find the current user's and searched user's records
        const currentUserRecord = data.find(record => record.id === currentUserId);
        const searchedUserRecord = data.find(record => record.id === searchedUserId);
  
        // Check friendships for both users
        const currentUserFriendship = currentUserRecord ? currentUserRecord.friendships : [];
        const searchedUserFriendship = searchedUserRecord ? searchedUserRecord.friendships : [];
  
        // Check if the current user is in the searched user's friendships
        const isFriend = searchedUserFriendship.some(friendship => 
          friendship.friendId === currentUserId && friendship.status === 'accepted'
        );
  
        // Check if there is a pending friend request
        const isRequestSent = searchedUserFriendship.some(friendship => 
          friendship.friendId === currentUserId && friendship.status === 'pending'
        );
  
        // Update friend status based on the checks
        if (isFriend) {
          setFriendStatus('Friends');
        } else if (isRequestSent) {
          setFriendStatus('Request Sent');
        } else {
          setFriendStatus('Add Friend');
        }
  
        // Set the friend count for the searched user
        setSearchedUserFriendCount(searchedUserFriendship.filter(friendship => friendship.status === 'accepted').length);
  
      } catch (error) {
        console.error("Failed to fetch friendships:", error);
      }
    };
  
    if (searchedUserId) {
      checkFriendStatus();
    }
  }, [searchedUserId]);
  

  const [open,setOpen]=useState(false)


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
         {isOnline ? <Tooltip title="Online"><span className="11 absolute flex w-8 h-8 rounded-full ml-24 -mt-8"
         style={{zIndex:100,backgroundColor:'#a0cfa0',border:savedTheme === 'light' ?'3px solid #eff0f1':'3px solid #18191b'}}
         ></span></Tooltip> : <Tooltip title="Offline"><span className="11 absolute flex items-center w-8 h-8 rounded-full ml-24 -mt-8"
         style={{zIndex:100,backgroundColor:savedTheme === 'light'?'#eff0f1':'#18191b',border:savedTheme === 'light' ?'3px solid #eff0f1':'3px solid #18191b'}}
         ><AiFillMoon className="w-6 h-6" style={{color:savedTheme === 'light' ? '#4a4a26':'#cfcfa0'}}/></span></Tooltip>}
         
        </div>
       <div className="block md:hidden ">
        <div className="flex flex-col">
       
        <Avatar className="block md:hidden " sx={{ width: '75px', height: '75px' }} alt={user.nickname} src={user.avatar || ''} />
       
        </div>
        {isOnline ? <Tooltip title="Online"><span className="22 relative flex w-6 h-6 rounded-full ml-14 -mt-5"
         style={{backgroundColor:'#a0cfa0',border:savedTheme === 'light' ?'3px solid #eff0f1':'3px solid #18191b'}}
         ></span></Tooltip> : <Tooltip title="Offline"><span className="22 relative flex items-center w-6 h-6 rounded-full ml-14 -mt-5"
         style={{backgroundColor:savedTheme === 'light'?'#eff0f1':'#18191b',border:savedTheme === 'light' ?'3px solid #eff0f1':'3px solid #18191b'}}
         ><AiFillMoon className="w-6 h-6" style={{color:savedTheme === 'light' ? '#4a4a26':'#cfcfa0'}}/></span></Tooltip>}
        
        </div>
       </div>
       <div className="flex flex-col gap-3 w-full mt-7 md:mt-0">
         <div className="flex gap-3">
           <h1 className="hidden md:block font-medium text-xl">{user.nickname}</h1>
          
         </div>
         <div className="flex items-center gap-6">
         <div className="flex-col items-center md:flex-row text-center">{postList.length} <b className="font-semibold ml-1">posts</b></div>
         <div className="flex-col items-center md:flex-row text-center">
          {searchedUserFriendCount} <b className="font-semibold ml-1">friends</b>
        </div>
         </div>
         <p className="" style={{color:savedTheme ==='light'?'#5e666e':'#d6d9dc'}}>{user.description}</p>
         <div className="flex gap-4 mt-6 md:mt-4 -ml-20 md:-ml-0 font-medium text-sm  md:text-lg">
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
  <div className="flex flex-col items-center justify-center mt-12 -ml-28 md:-ml-0">
    <div style={{borderRadius:"100%",border:savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45'}} className="camera-wrapper">
     <div className="hidden md:block">
     <LockIcon sx={{width:'125px',height:'125px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
     </div>
     <div className="block md:hidden">
     <LockIcon sx={{width:'85px',height:'85px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
     </div>
    </div>
    <p style={{color:savedTheme === 'light' ? '#232629' : '#fbfbfb'}} className="text-sm md:text-xl font-semibold mt-2">This user's posts are private</p>
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
        
      </div>
     
    ))
  ) : (
    <div className="flex flex-col items-center justify-center mt-12 mb-4  -ml-20 w-full">
      <div style={{borderRadius:"100%",border:savedTheme ==='light'?'3px solid #dddfe2':'3px solid #3b3f45'}} className="camera-wrapper">
       <div className="hidden md:block">
       <CameraAltIcon sx={{width:'125px',height:'125px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
       </div>
       <div className="block md:hidden">
       <CameraAltIcon sx={{width:'85px',height:'85px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
       </div>
      </div>
      <p style={{color:savedTheme==='light'?'#232629':'#fbfbfb',}} className="text-sm md:text-xl font-semibold mt-2">No posts yet</p>
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
    
      <DragCloseDrawer  isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
      <SendMessageModal recipientUser={user} onClose={() => setModalOpen(false)} />
      </DragCloseDrawer>
   </div>
    )
    }
     
    </div>
  );
};




const SendMessageModal = ({ recipientUser, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user')); // Retrieve the logged-in user

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
      id: (Math.random() * 1000000).toFixed(0), // Generate a unique ID for the message
      senderId: currentUser.id,
      senderNickname: currentUser.nickname,
      recipientId: recipientUser.id,
      recipientNickname: recipientUser.nickname,
      content: message,
      timestamp: new Date().toISOString(),
    };

    try {
      // Fetch the sender's data (current user)
      const senderResponse = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${currentUser.id}`);
      const senderData = senderResponse.data;

      // Fetch the recipient's data
      const recipientResponse = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${recipientUser.id}`);
      const recipientData = recipientResponse.data;

      // Add the new message to both users' messages arrays
      const updatedSenderMessages = [...senderData.messages, newMessage];
      const updatedRecipientMessages = [...recipientData.messages, newMessage];

      // Update sender's messages on the API
      await axios.put(
        `https://66edb996380821644cddd154.mockapi.io/api/users/${currentUser.id}`,
        { ...senderData, messages: updatedSenderMessages }
      );

      // Update recipient's messages on the API
      await axios.put(
        `https://66edb996380821644cddd154.mockapi.io/api/users/${recipientUser.id}`,
        { ...recipientData, messages: updatedRecipientMessages }
      );

      console.log('Message sent successfully!');

      // Clear the message input and close the modal
      setMessage('');
      onClose();

    } catch (error) {
      console.error('Failed to send message:', error.response ? error.response.data : error.message);
    }
  };
  const savedTheme = localStorage.getItem('color') || 'light';

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4">Send message to <b>{recipientUser.nickname}</b></h1>
      <textarea
        value={message}
        style={{backgroundColor:savedTheme === 'light'?'#fbfbfb':'#232629',
          color:savedTheme === 'light'?'#232629':'#fbfbfb',
          border:savedTheme === 'light'?'1px solid #dddfe2':'1px solid #3b3f45',
          borderRadius:'5px',
          padding:'5px'
        }}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button className="py-1 px-1.5 rounded-md mt-4" style={{backgroundColor:'#a0b6cf',color:'#26374a'}} onClick={handleSendMessage}>Send</button>
    </div>
  );
};


/////drawer for the message 
const DragCloseDrawer = ({ isModalOpen, setModalOpen, children }) => {
  const savedTheme = localStorage.getItem('color') || 'light';
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
         
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[55vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
            
            style={{ y, backgroundColor:savedTheme === 'light'?'#eff0f1':'#18191b', }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4"
            style={{backgroundColor:savedTheme === 'light'?'#eff0f1':'#18191b',}}
            >
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full  p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};






const SendMessage = () => {
  const savedTheme = localStorage.getItem('color') || 'light';
  const [messages, setMessages] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem('user')); // Modify this as needed

    // Fetch messages from the new API
    
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${currentUser.id}`);
        setMessages(response.data.messages); // Accessing messages from the user data
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();
  }, [currentUser.id]);

  const handleMarkAsRead = async (messageToRemove) => {
    try {
      const response = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${currentUser.id}`);
      const data = response.data;

      // Filter out the message to mark as read
      const updatedMessages = data.messages.filter(msg => msg.id !== messageToRemove.id);

      // Update the user with the new messages array
      await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${currentUser.id}`, {
        ...data,
        messages: updatedMessages,
      });

      // Update the state
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error marking message as read:', error.response ? error.response.data : error.message);
    }
  };

  const handleClearAllMessages = async () => {
    try {
      const response = await axios.get(`https://66edb996380821644cddd154.mockapi.io/api/users/${currentUser.id}`);
      const data = response.data;

      // Clear all messages
      await axios.put(`https://66edb996380821644cddd154.mockapi.io/api/users/${currentUser.id}`, {
        ...data,
        messages: [],
      });

      setMessages([]); // Clear messages locally as well
    } catch (error) {
      console.error('Failed to clear messages', error);
    }
  };
  const userMessages = messages.filter(
    (message) =>
      message.senderId === currentUser.id || message.recipientId === currentUser.id
  );

  return (
    <div className="messages p-4 mt-6 md:mt-0">
      <div className="flex justify-between items-center mb-0 md:mb-5">
        <h2 style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="font-bold text-xl md:text-2xl mb-2">
          Messages
        </h2>
        <button
          style={{ background: '#a0b6cf', color: '#26374a', borderRadius: '10px', padding: '5px' }}
          className="text-xs md:text-base"
          onClick={handleClearAllMessages}
        >
          Clear All Messages
        </button>
      </div>

      {userMessages.length > 0 ? (
        <div>
          {userMessages.map((msg, index) => (
            <div className="message-item flex flex-col md:flex-row justify-between items-center" key={msg.id} style={{ background: savedTheme === 'light' ? '#fbfbfb' : '#232629', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '10px', border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45', padding: '10px', marginBottom: '10px' }}>
              <div className="flex flex-col gap-3">
              <p className="font-light text-sm md:font-medium md:text-md">
                <strong className="font-normal text-md" style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>{msg.senderNickname}</strong> to <strong style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>{msg.recipientNickname}</strong>: {msg.content}
              </p>
              <span className="font-light text-xs"><strong className="font-normal" style={{ color: savedTheme === 'light' ? '#26374a' : '#a0b6cf' }}>Time:</strong> {new Date(msg.timestamp).toLocaleString()}</span>
              </div>
              <button 
              className="p-0.5 md:p-1.5  text-sm md:font-medium md:text-md"
              onClick={() => handleMarkAsRead(msg)} 
              style={{ marginLeft: '10px', marginTop:'5px',background: '#a0b6cf', color: '#26374a', borderRadius: '5px' }}>
              Mark as Read
            </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12">
          <div style={{ borderRadius: "100%", border: savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45' }} className="camera-wrapper">
            <TbMessagesOff style={{ width: '125px', height: '125px', padding: '20px', color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} />
          </div>
          <p style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="text-xl font-semibold mt-2">No Messages yet</p>
        </div>
      )}
    </div>
  );
};


const Notifications = ({ user}) => {
  const [currentUser, setCurrentUser] = useState(null); // Changed to null for better checking
  const [notifications, setNotifications] = useState([]);
  const [friendStatus, setFriendStatus] = useState('');
  const apiUrl = "https://66edb996380821644cddd154.mockapi.io/api/users";

 
 useEffect(() => {
    const fetchCurrentUser = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) return; // Ensure user data is available
      setCurrentUser(userData);

      try {
        const response = await axios.get(`${apiUrl}/${userData.id}`);
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const markAsRead = async (notificationId) => {
    if (!currentUser) return; // Check if currentUser is set
  
    try {
      const response = await axios.get(`${apiUrl}/${currentUser.id}`);
      const data = response.data;
  
      // Ensure notifications are valid and filter out the read notification
      const updatedNotifications = data.notifications
        .filter(notification => notification && notification.id) // Filter out null or undefined notifications
        .filter(notification => notification.id !== notificationId); // Filter out the one being marked as read
  
      // Update user's notifications in the API
      await axios.put(`${apiUrl}/${currentUser.id}`, {
        ...data,
        notifications: updatedNotifications
      });
  
      // Update the notifications in state
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleAcceptFriend = async (senderId, notificationId) => {
    if (!currentUser) return; // Check if currentUser is set
  
    try {
      // Fetch all users
      const response = await axios.get(apiUrl);
      const data = response.data;
  
      // Find the current user and the sender in the API data
      const currentUserRecord = data.find((u) => u.id === currentUser.id);
      const senderRecord = data.find((u) => u.id === senderId);
  
      if (!currentUserRecord || !senderRecord) {
        console.error("User records not found");
        return;
      }
  
      // Add each other to friendships
      currentUserRecord.friendships.push({
        friendId: senderId,
        status: "accepted" // Friend request is accepted
      });
  
      senderRecord.friendships.push({
        friendId: currentUser.id,
        status: "accepted"
      });
  
      // Create a notification for the sender
      const notificationMessage = {
        id: new Date().getTime().toString(), // Unique ID for the notification
        senderId: currentUser.id,
        senderNickname: currentUser.nickname,
        action: `${currentUser.nickname} has accepted your friend request.`,
        timestamp: new Date().toISOString(),
      };
  
      // Add the notification to the sender's notifications
      senderRecord.notifications.push(notificationMessage);
  
      // Update both users' data in the API
      await axios.put(`${apiUrl}/${currentUser.id}`, currentUserRecord);
      await axios.put(`${apiUrl}/${senderId}`, senderRecord);
  
      // Optionally mark the original notification (friend request) as read
      if (notificationId) {
        await markAsRead(notificationId); // Pass the notificationId to mark it as read
  
        // Remove the notification from local state
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== notificationId)
        );
      }
  
      // Optionally, refresh notifications if needed
      // fetchNotifications(); // Uncomment if necessary to reload notifications
  
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    }
  };
  

  const sendMessage = async (fromUserId, toUserId, message) => {
    const messageObject = {
      from: fromUserId,
      to: toUserId,
      content: message,
      timestamp: new Date().toISOString()
    };

    try {
      // Update the users' message history
      await axios.post('https://66edb996380821644cddd154.mockapi.io/api/users', messageObject);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const clearAllNotifications = async () => {
    if (!currentUser) return; // Ensure the user is logged in
  
    try {
      // Fetch the current user's data from the API
      const response = await axios.get(`${apiUrl}/${currentUser.id}`);
      const userData = response.data;
  
      // Clear the notifications in the API
      await axios.put(`${apiUrl}/${currentUser.id}`, {
        ...userData,
        notifications: [] // Set notifications to an empty array
      });
  
      // Clear notifications in the local state
      setNotifications([]);
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  };

  const savedTheme = localStorage.getItem('color') || 'light';

  return (
    <div className="notifications p-3 md:p-4 mt-6 md:mt-0">
      <div className="flex justify-between items-center mb-0 md:mb-5">
        <h2 style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="font-bold text-xl md:text-2xl mb-2">Notifications</h2>
        <button className="text-xs md:text-base" onClick={clearAllNotifications} style={{ background: '#a0b6cf', color: '#26374a', borderRadius: '10px', padding: '4px' }}>Clear All</button>
      </div>

      {notifications.length > 0 ? ( // Check if notifications exist
  notifications
    .filter(notification => notification !== null) // Filter out null values
    .map((notification) => (
      <div key={notification.id} className="notification p-2 mb-2 flex justify-between items-center">
        {/* Display notification message */}
      <p
      className="font-light text-sm md:font-normal md:text-md "
      style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }}>{notification.action} - {new Date(notification.timestamp).toLocaleString()}</p>  

        {/* Conditional rendering based on the action of the notification */}
        {notification.action.includes('sent you a friend request') ? ( // If action is a friend request
          <div className="flex gap-2">
            <button
             style={{ background: '#a0b6cf', color: '#26374a', borderRadius: '5px', padding: '5px' }}
             onClick={() => handleAcceptFriend(notification.senderId, notification.id)}>Accept Friend</button>
            <button 
             style={{ background: '#a0b6cf', color: '#26374a', borderRadius: '5px', padding: '5px' }}
            onClick={() => markAsRead(notification.id)}><CloseIcon/></button>
          </div>
        ) : (
          <button 
          style={{ background: '#a0b6cf', color: '#26374a', borderRadius: '5px', padding: '5px' }}
          onClick={() => markAsRead(notification.id)}><DoneOutlinedIcon/></button> // If it's not a friend request
        )}
      </div>
    ))
) : (
  <div className="flex flex-col items-center justify-center mt-12">
    <div
      style={{
        borderRadius: "100%",
        border: savedTheme === 'light' ? '3px solid #dddfe2' : '3px solid #3b3f45',
      }}
      className="camera-wrapper"
    >
      <NotificationsOffIcon
        sx={{ width: '125px', height: '125px', padding: '20px', color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }}
      />
    </div>
    <p style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="text-xl font-semibold mt-2">
      No Notifications yet
    </p>
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
      setIsPrivate(parsedUser.isPrivate || false); // Read from is_private
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
    const updatedUser = { ...user, isPrivate: isPrivate };
  
    // Update the user fields if they have been modified
    if (password.trim() !== '') {
      updatedUser.password = password;
    }
  
    if (image.trim() !== '') {
      updatedUser.avatar = image; // Update avatar with the new image URL
    }
  
    // Update nickname or any other field you may need (add more as necessary)
    if (nickname.trim() !== '') {
      updatedUser.nickname = nickname;
    }
  
    // Save updated user in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
  
    try {
      // Fetch current users from the new API
      const response = await axios.get('https://66edb996380821644cddd154.mockapi.io/api/users');
  
      const users = response.data; // Get the list of all users
  
      // Ensure the current user exists and update their details
      const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
  
      // Save the updated users list back to the API
      await axios.put(
        `https://66edb996380821644cddd154.mockapi.io/api/users/${updatedUser.id}`,
        updatedUser // Send the updated user object
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
    setIsPrivate((prevPrivacySetting) => !prevPrivacySetting); // Toggle only the state
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (feeling.trim() !== '' && text.trim() !== '') {
      setEmptyError(false); // Reset empty error state
  
      try {
        // Call handleAddPost to add post to JSONBin and local storage
        await handleAddPost(feeling, text, highlight, user.id, user.nickname, user.avatar);
        setPostsuccess(true); // Set success state
  
        // Reset input fields
        setFeeling('');
        setText('');
  
        // Show success message for a duration
        setTimeout(() => setPostsuccess(false), 3000);
      } catch (error) {
        // Handle the error state as necessary
        console.error("Error submitting post:", error);
      }
    } else {
      setEmptyError(true);
      setTimeout(() => setEmptyError(false), 3000);
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
        <option value="select">Select option</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Excited">Excited</option>
          <option value="Excited">Stressed</option>
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