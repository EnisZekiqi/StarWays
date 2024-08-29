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
const Main = () => {

  const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [posts, setPosts] = useState([]);
    const [highlight, setHighlight] = useState('Not Highlighted');
    const [showUserProfile,setShowUserProfile]=useState(null)
    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);
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
        <Profile  user={user} posts={posts} setPosts={setPosts}  handleGoBack={handleGoBack} toggleEdit={toggleEdit} />
      )}
      {editProfile && (
        <EditProfile handleGoBack={handleGoBack} />
      )}
        {activeTab === 'home' && <div>Home Content</div>}
        {activeTab === 'search' && <Search />}
        {activeTab === 'explore' && <ExploreComponent/>}
        {activeTab === 'messages' && <div><SendMessage user={showUserProfile}/></div>}
        {activeTab === 'notification' && <Notifications user={user} />}
        {activeTab === 'create' &&   <Create highlight={highlight} toggleHighlight={toggleHighlight} user={user} handleAddPost={handleAddPost} />}
      </div>
      
    </div>
  );
}


const ExploreComponent = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setAllPosts(storedPosts);

    // Fetch users from backend
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/users'); // Adjust URL as needed
        setAllUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getUserById = (userId) => {
    return allUsers.find((user) => user.id === userId) || { nickname: 'Unknown User'};
  };

  const [bookmarks, setBookmarks] = useState({});
  const [likedPosts, setLikedPosts] = useState({});

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
      <h1 style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="font-bold text-3xl ">Explore</h1>
      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      <div className="empty3 -mt-3"></div>
      {!loading && !error && allPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          {allPosts.map((post) => {
            const user = getUserById(post.userId);

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
                  <p style={{ color:savedTheme ==='light' ? '#26374a':'a0b6cf' }}>
                    <b>{user.nickname}</b>
                  </p>
                  </div>
                </div>

                
                <div className="flex flex-col mt-4">
                  <p ><strong className="text-lg">Feeling:</strong> {post.feeling}</p>
                  <p>{post.text}</p>
                </div>
               <div className="mt-4">
               <Checkbox
            icon={<FavoriteBorder sx={{color:savedTheme ==='light' ? '#26374a':'#a0b6cf'}}/>}
            checkedIcon={<Favorite sx={{color:savedTheme ==='light' ? '#26374a':'#a0b6cf'}}/>}
            checked={!!likedPosts[post.id]} // Ensure the checkbox is checked if the post is liked
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








const Profile =({handleGoBack,toggleEdit,posts,setPosts})=>{
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [theme,setTheme]=useState('light')
  const [editProfile,setEditProfile]=useState(false)

  const [selected,setSelected]=useState(null) //// show specific post state 
  const [open, setOpen] = useState(false);
  

  const handleClickShow = (post)=>{      //// toggle the post 
    setSelected(post)
    setOpen(true)
  }


  const handleClosePost =()=>{    /// close post
    setSelected(null)
    setOpen(false)
  }

  const [friendCount, setFriendCount] = useState(0);
 


  useEffect(() => {
    if (user && user.id) {
      // Only fetch the friend count if the user object and user.id are available
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

  // Fetch users and filter friends' data when the modal is open
  useEffect(() => {
    const fetchUsersAndFriends = async () => {
      setLoading(true);
      try {
        // Fetch all users from the backend
        const response = await axios.get('http://localhost:5000/users');
        const allUsers = response.data;

        // Fetch stored friends from localStorage
        const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
        const user = JSON.parse(localStorage.getItem('user'));
        const userFriends = storedFriends[user.id] || [];

        // Filter friends' details based on their IDs
        const friendsDetails = allUsers.filter((user) =>
          userFriends.includes(user.id)
        );

        // Set the filtered friends data
        setFriendsData(friendsDetails);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    if (friendsChecker) {
      fetchUsersAndFriends();
    }
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
    return <div>Loading user data...</div>;
  }

 

  const userPosts = posts.filter(post => post.userId === user.id);

  const savedTheme = localStorage.getItem('color') || 'light';


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
   overflowY:'auto',
    p: 4,
  };

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
           <p>{userPosts.length} <b className="font-semibold ml-1">posts</b> </p>
           <p className="cursor-pointer" onClick={()=>setFriendsChecker(true)}>{friendCount} <b className="font-semibold ml-1">friends</b></p>
         </div>
    <p>{user.description}</p> 
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
              onClose={()=>setFriendsChecker(false)}
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
                   {friend.description ? <p className="font-light text-sm">{friend.description}</p> :  <p className="font-light">No description yet</p>}
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

  const [showUserProfile,setShowUserProfile]=useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Fetch users from backend or localStorage
        const response = await axios.get('http://localhost:5000/users'); // Adjust URL as needed
        setAllUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
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

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(allUsers);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allUsers.filter(user =>
        user.nickname.toLowerCase().startsWith(lowerCaseQuery)
      );
      setFilteredUsers(filtered);
    }
  };


  const showUser = async  (user) => {
    setShowUserProfile(user);

    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = allPosts.filter(post => post.userId === user.id);
    try {
      const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`); // Fetch posts by userId
      setUserPosts(response.data);
    } catch (err) {
      setError('Failed to fetch user posts');
    }
    setUserPosts(userPosts);
  };

  const handleBackToSearch = () => {
    setShowUserProfile(null);
    setUserPosts([]);
  };

  const savedTheme = localStorage.getItem('color') || 'light';

  const style = {
   
    color: savedTheme ==='light'? '#232629' : '#fbfbfb',
 
  };

  const style2 = {
    backgroundColor: savedTheme ==='light'? '#fbfbfb' : 'rgb(35, 38, 41)',
    color: savedTheme ==='light'? '#232629' : '#fbfbfb',
     border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
   borderRadius:'10px',
   width:'400px'
 
  };

  const adjustments = showUserProfile ? "justify-center items-stretch":"justify-center items-center"

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: savedTheme === 'light' ? '#fbfbfb' : '#2d2d2d',
              padding: '5px',
              borderRadius: '5px',
              border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45',
              width: '300px',
            }}
          />
         
          <div>
            {searchQuery.trim() === '' ? (
              <div className="flex flex-col  items-center justify-center mt-12">
              <div style={{borderRadius:"100%",border:savedTheme ==='light'?'3px solid #dddfe2':'3px solid #3b3f45'}} className="camera-wrapper">
              <PersonIcon sx={{width:'125px',height:'125px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
              </div>
                <p style={{color:savedTheme==='light'?'#232629':'#fbfbfb',}} className="text-xl font-semibold mt-2">No Searched user yet</p>
              </div> // Message displayed when there's no query
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  onClick={() => showUser(user)}
                  className="usersSearch flex justify-between w-2/3 items-center gap-3 mt-3 p-2"
                  style={style2}
                  key={user.id}
                >
                  <div className="flex gap-3">
                  <Avatar src={user.avatar} alt={`${user.nickname}'s avatar`} style={{ width: '50px', height: '50px' }} />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">{user.nickname}</p> {/* Displaying 'nickname' */}
                    <p className="font-light text-sm">{user.description}</p> {/* Displaying 'description' */}
                     
                  </div>
                  </div>
                  
                </div>
              ))
            ) : (
              <div className="flex flex-col  items-center justify-center mt-12">
              <div style={{borderRadius:"100%",border:savedTheme ==='light'?'3px solid #dddfe2':'3px solid #3b3f45'}} className="camera-wrapper">
              <PersonIcon sx={{width:'125px',height:'125px',padding:'20px',color:savedTheme ==='light'?'#232629':'#fbfbfb'}}/>
              </div>
                <p style={{color:savedTheme==='light'?'#232629':'#fbfbfb',}} className="text-xl font-semibold mt-2">No users</p>
              </div>// Message displayed when no users match the query
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

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    setBookmarks(storedBookmarks);
   
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
      <div className="flex justify-between w-full mt-12">
      <button className="w-fit h-fit" onClick={onBack} style={{ marginBottom: '50px',marginLeft:'-30px',marginRight:'20px' }}>
      <ArrowBackIosNewIcon />
     </button>
     <div className="flex gap-6 w-full ">
       <div className="h-fit">
       <Avatar sx={{ width: '125px', height: '125px' }} alt={user.nickname} src={user.avatar || ''} />
       </div>
       <div className="flex flex-col gap-3 w-full">
         <div className="flex gap-3">
           <h1 className="font-medium text-xl">{user.nickname}</h1>
         </div>
         <div className="flex items-center gap-6">
           <p>{posts.length} <b className="font-semibold ml-1">posts</b> </p>
           <p>{friendCount} <b className="font-semibold ml-1">friends</b></p>
         </div>
         <p>{user.description}</p>
         <div className="flex gap-4 mt-4">
         {friendStatus === 'Add Friend' && (
             <button  style={{color: '#26374a',backgroundColor:'#a0b6cf'}}  onClick={handleAddFriend} className=" px-4 py-2 rounded">
               Add Friend
             </button>
           )}
           {friendStatus === 'Request Sent' && (
             <button  style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',backgroundColor:savedTheme ==='light'?'#fbfbfb':'#232629'}} className=" text-white px-4 py-2 rounded" disabled>
               Request Sent
             </button>
           )}
           {friendStatus === 'Friends' && (
             <button onClick={()=>setModalConfirmation(true)} style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',backgroundColor:savedTheme ==='light'?'#fbfbfb':'#232629', color:'#a0b6cf'}} className=" px-4 py-2 rounded" >
               Friends
             </button>
           )}
           <button style={{border:savedTheme ==='light'?'1px solid #dddfe2':'1px solid #3b3f45',backgroundColor:savedTheme ==='light'?'#fbfbfb':'#232629', color:'#a0b6cf'}} onClick={() => setModalOpen(true)} className=" px-4 py-2 rounded">Send Message</button>
         </div> {/* Displaying 'description' */}
         <div className="flex justify-center items-center w-full  gap-4"
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
        className="post p-4 mb-4 flex justify-between w-full"
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
        <div className="flex items-center">
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
    <div className="flex flex-col items-center justify-center mt-12">
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
    <div className="messages p-4">
      <h2 style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="font-bold text-2xl mb-2">Messages</h2>
    {userMessages.length > 0 ? (
     <div>
      {userMessages.map((msg, index) => (
       <div className="">
         <div className="flex items-center justify-between p-2 mb-2" key={index} style={{ background: savedTheme === 'light' ? '#fbfbfb' : '#232629', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '10px', border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45' }}>
         <div className="">
         <p>
            <strong style={{ color: savedTheme === 'light' ? '#7e9cbe' : '#c2d0e0' }}>{msg.senderNickname}</strong> to{' '}
            <strong style={{ color: savedTheme === 'light' ? '#7e9cbe' : '#c2d0e0' }}>{msg.recipientNickname}</strong>: {msg.content}
          </p>
          <span><strong style={{ color: savedTheme === 'light' ? '#7e9cbe' : '#c2d0e0' }} className="mr-4">Time:</strong>{new Date(msg.timestamp).toLocaleString()}</span>
          
         </div>
         <button style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px', padding: '5px' }} onClick={() => handleMarkAsRead(msg)}>Mark as Read</button>  
        </div>
       </div>
      ))}
 <button style={{ marginTop: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '10px', padding: '10px' }} className="pr-2" onClick={handleClearAllMessages}>Clear All Messages</button>
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
    const senderId = notification.senderId; // Ensure senderId is saved when sending the friend request
  
    // Update friend lists
    const storedFriends = JSON.parse(localStorage.getItem('friends')) || {};
    if (!storedFriends[currentUserId]) storedFriends[currentUserId] = [];
    if (!storedFriends[senderId]) storedFriends[senderId] = [];
  
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
    <div className="notifications p-4">
      <h2 style={{ color: savedTheme === 'light' ? '#232629' : '#fbfbfb' }} className="font-bold text-2xl mb-2">Notifications</h2>
      {notifications.length > 0 ? (
        <>
          {notifications.map((notification) => (
            <div key={notification.id} className="notification p-2 mb-2 flex justify-between items-center" style={{ background: savedTheme === 'light' ? '#fbfbfb' : '#232629', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '10px', border: savedTheme === 'light' ? '1px solid #dddfe2' : '1px solid #3b3f45' }}>
              <p className="font-normal text-sm" key={notification.id}>
                <strong style={{ color: savedTheme === 'light' ? '#7e9cbe' : '#c2d0e0' }} className="font-semibold text-lg">{notification.senderNickname}</strong> {notification.action} {notification.action2} <em>{notification.postText}</em>
              </p>
              {notification.action === 'Sent a friend request' ? (
                <>
                 <div className="flex gap-2">
                 <button onClick={() => handleAcceptFriend(notification)} style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px', padding: '5px' }}>Accept Friend</button>
                 <button onClick={() => markAsRead(notification.id)} style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px', padding: '5px' }}> <CloseIcon /></button>
                 </div>
                </>
              ) : (
                <button onClick={() => markAsRead(notification.id)} style={{ marginLeft: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '3px', padding: '5px' }}>Mark as Read</button>
              )}
            </div>
          ))}
          <button onClick={clearAllNotifications} style={{ marginTop: '10px', background: '#a0b6cf', color: '#26374a', borderRadius: '10px', padding: '10px' }}>Clear All Notifications</button>
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
  const [error, setError] = useState('');
  const [savedChangesMessage, setSavedChangesMessage] = useState(false);
  const [changesDescription,setChangesDescription]=useState(false)

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

  

    localStorage.setItem('user', JSON.stringify(updatedUser));

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
      setSavedChangesMessage(true);
      setTimeout(() => {
        setSavedChangesMessage(false);
        handleGoBack();
      }, 3000);
    } catch (err) {
      setError('Failed to save changes');
    }
  };

  const handleTogglePrivacy = () => {
    setIsPrivate(!isPrivate);
    setUser({ ...user, isPrivate: !isPrivate });
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
            className="p-2"
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
    className="p-2"
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
      name="Username"
      value={user.nickname}
      onChange={handleInputChange}
      className="p-2"
      style={{ backgroundColor: savedTheme === 'light' ? '#fff' : '#2d2d2d', color: savedTheme === 'light' ? '#232629' : '#fbfbfb', borderRadius: '5px',border:savedTheme ==='light'?'#dddfe2':'#3b3f45' }}
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
    <div className="flex items-center gap-2 mt-4">
  <p className="font-light">Account Privacy</p>
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
    </div>
  );
};


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
      handleAddPost(feeling, text, highlight, user.id);
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