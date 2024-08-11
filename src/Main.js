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

import PersonAddIcon from '@mui/icons-material/PersonAdd';
const Main = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [posts, setPosts] = useState([]);
    const [highlight, setHighlight] = useState('Not Highlighted');

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
        <Profile  user={user} posts={posts} setPosts={setPosts}  handleGoBack={handleGoBack} toggleEdit={toggleEdit} />
      )}
      {editProfile && (
        <EditProfile handleGoBack={handleGoBack} />
      )}
        {activeTab === 'home' && <div>Home Content</div>}
        {activeTab === 'search' && <Search />}
        {activeTab === 'explore' && <div>Explore Content</div>}
        {activeTab === 'messages' && <div>Messages Content</div>}
        {activeTab === 'notification' && <Notifications user={user} />}
        {activeTab === 'create' &&   <Create highlight={highlight} toggleHighlight={toggleHighlight} user={user} handleAddPost={handleAddPost} />}
      </div>
      
    </div>
  );
}
 
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
    <p>{userPosts.length} Posts</p>
    <p>friends</p>
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
    <FaCamera style={{width:'125px',height:'125px',padding:'20px'}}/>
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
              <p className="mt-4">No searched user yet</p> // Message displayed when there's no query
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
                    <p>{user.nickname}</p> {/* Displaying 'nickname' */}
                    <p>{user.description}</p> {/* Displaying 'description' */}
                     
                  </div>
                  </div>
                  <PersonAddIcon/>
                </div>
              ))
            ) : (
              <p className="mt-4">No users found</p> // Message displayed when no users match the query
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

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    setBookmarks(storedBookmarks);
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  const handleToggleFavorite = (postId) => {
    const currentUserId = user.id;
    const currentUserNickname = user.nickname; // Get the nickname of the user performing the action
    const updatedFavorites = { ...favorites };
  
    if (!updatedFavorites[currentUserId]) {
      updatedFavorites[currentUserId] = [];
    }
  
    if (updatedFavorites[currentUserId].includes(postId)) {
      updatedFavorites[currentUserId] = updatedFavorites[currentUserId].filter(id => id !== postId);
    } else {
      updatedFavorites[currentUserId].push(postId);
  
      const post = posts.find(post => post.id === postId);
      const postOwnerId = post.userId;
  
      // Create a notification only if the post owner is not the current user
      if (postOwnerId !== currentUserId) {
        const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
        const userNotifications = storedNotifications[postOwnerId] || [];
  
        userNotifications.push({
          senderNickname: currentUserNickname, // Use the nickname of the user performing the action
          postText: post.text,
          timestamp: new Date().toISOString(),
          id: Date.now(),
        });
  
        storedNotifications[postOwnerId] = userNotifications;
        localStorage.setItem('notifications', JSON.stringify(storedNotifications));
      }
    }
  
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  

  const handleToggleBookmark = (postId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || typeof storedUser !== 'object') {
      console.error('Logged-in user data is invalid or missing');
      return;
    }
  
    const currentUserNickname = storedUser.nickname; // Get the logged-in user's nickname
    const currentUserId = storedUser.id; // Get the logged-in user's ID
  
    const post = posts.find(post => post.id === postId);
    if (!post) return;
  
    const postOwnerId = post.userId; // The user who owns the post
  
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    const userNotifications = storedNotifications[postOwnerId] || [];
  
    const updatedBookmarks = { ...bookmarks };
    const isBookmarked = updatedBookmarks[currentUserId]?.includes(postId);
  
    if (isBookmarked) {
      // Remove from bookmarks
      updatedBookmarks[currentUserId] = updatedBookmarks[currentUserId].filter(id => id !== postId);
    } else {
      // Add to bookmarks
      updatedBookmarks[currentUserId] = [...(updatedBookmarks[currentUserId] || []), postId];
  
      // Add notification
      userNotifications.push({
        senderNickname: currentUserNickname, // Use the logged-in user's nickname
        postText: post.text,
        timestamp: new Date().toISOString(),
        action: 'Liked', // Action taken by the logged-in user
        id: Date.now(),
      });
    }
  
    // Update bookmarks and notifications in localStorage
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  
    storedNotifications[postOwnerId] = userNotifications;
    localStorage.setItem('notifications', JSON.stringify(storedNotifications));
  };
  
  
  
  
  

  // Handle toggling bookmark (save)
 

  return (
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
            <p>{posts.length} posts</p> {/* Display number of posts */}
          </div>
          <p>{user.description}</p> {/* Displaying 'description' */}
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
          {posts.length > 0 ? (
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
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={favorites[user.id]?.includes(post.id)}
                    onChange={() => handleToggleFavorite(post.id)}
                  />
                  <Checkbox
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                    checked={bookmarks[user.id]?.includes(post.id)}
                    onChange={() => handleToggleBookmark(post.id)} 
                  />
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
        </div>
      </div>
    </div>
  );
};
const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  

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

  const clearAllNotifications = () => {
    setNotifications([]);
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
    storedNotifications[user.id] = [];
    localStorage.setItem('notifications', JSON.stringify(storedNotifications));
  };
  const savedTheme = localStorage.getItem('color') || 'light';

  return (
    <div className="notifications p-4">
      <h2 style={{  color:savedTheme === 'light'?'#232629':'#fbfbfb' }} className="font-bold text-2xl mb-2">Notifications</h2>
      {notifications.length > 0 ? (
        <>
          {notifications.map((notification) => (
            <div key={notification.id} className="notification p-2 mb-2 flex justify-between items-center" style={{ background:savedTheme === 'light'? '#fbfbfb':'#232629', color:savedTheme === 'light'?'#232629':'#fbfbfb' , borderRadius: '10px',border:savedTheme === 'light'?'1px solid #dddfe2':'1px solid #3b3f45' }}>
            <p className="font-normal text-sm" key={notification.id}>
            <strong style={{color:savedTheme === 'light'?'#7e9cbe':'#c2d0e0'}} className="font-semibold text-lg">{notification.senderNickname}</strong> {notification.action} your post: <em >{notification.postText}</em>
             </p>
              <button onClick={() => markAsRead(notification.id)} style={{ marginLeft: '10px', background: '#a0b6cf',color:'#26374a', borderRadius: '3px', padding: '5px' }}>Mark as Read</button>
            </div>
          ))}
          <button  onClick={clearAllNotifications} style={{ marginTop: '10px', background: '#a0b6cf',color:'#26374a', borderRadius: '10px', padding: '10px' }}>Clear All Notifications</button>
        </>
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};



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