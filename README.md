# Starways

Starways is a replica of Instagram, offering a social media experience where users can create accounts, connect with others, share posts, and send messages. It provides an intuitive and feature-rich platform to explore, interact, and build a network.

---

## Features

### 1. **Account Creation and Login**
- **Sign Up**: Create an account by clicking the **Sign Up** button on the navbar.
- **Quick Access**: For a fast check, log in using the following credentials:
  - **Nickname**: `nickname 1`
  - **Password**: `password 1`
  - Ensure you enter the credentials exactly as shown (case-sensitive).
- After logging in, you are redirected to the main page.

### 2. **Navbar Functionalities**
- **Home**: View posts from users you are friends with.
- **Search**: Search for specific users by their nickname.
- **Create**: Create and share new posts.
- **Profile**: Access and manage your profile.

### 3. **Profile Page**
- Displays:
  - Profile picture
  - Name
  - Description
  - List of posts you have created
- **Edit Profile**: Update your profile details, including:
  - Name
  - Age
  - Gender
  - Description
  - Profile picture
  - Privacy toggle (private account mode)

### 4. **Private Account Mode**
- When enabled, your account becomes private:
  - Other users cannot find you in search results.
  - Your posts are hidden from others unless they are your friends.
- Turning off privacy mode makes your account visible to everyone.

### 5. **Search and User Profiles**
- Search for users by nickname.
- Viewing a user's profile shows:
  - Their profile picture
  - Name
  - Description
  - Posts (if their account is public or you are friends)
- Actions available:
  - **Add Friend**: Sends a friend request.
  - **Send Message**: Sends a direct message.

### 6. **Friend Requests**
- Friend requests appear in the **Notification Icon** in the navbar.
- Notifications display a number representing pending requests.
- Accepting a friend request:
  - Adds the user to your friend list.
  - Grants access to their posts, even if their account is private.

### 7. **Messaging**
- Messages appear in the **Message Icon** in the navbar.
- Notifications display the sender's username and message.
- Respond to messages directly from the inbox.

### 8. **Homepage**
- Displays posts from users you are friends with.

### 9. **Explore Section**
- Available on larger screens:
  - Shows posts from all users with public accounts.
- On smaller screens:
  - The explore section is combined with the search component.

---

## How It Works

1. **Sign Up or Log In**: Create an account or use the demo credentials to log in.
2. **Explore and Interact**:
   - Use the navbar to navigate between home, search, create, and profile sections.
   - Search for users to view their profiles, add them as friends, or send messages.
3. **Manage Your Profile**:
   - Edit your details, toggle privacy, and upload a profile picture.
4. **Post and Share**:
   - Create new posts and share them with friends or the public.
5. **Connect with Others**:
   - Accept friend requests to expand your network.
   - Send and receive messages for private conversations.

---

## Technologies Used

- **React.js**: Frontend framework for building the UI.
- **React Router**: For navigation and routing between pages.
- **MockAPI**: Used for storing and fetching user data, posts, and messages.
- **Tailwind CSS**: For responsive and modern styling.
- **Framer Motion**: For animations and transitions.

---

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/starways.git
   cd starways
