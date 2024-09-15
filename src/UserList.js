import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';


const fetchUsers = async () => {
  const { data } = await axios.get('/db.json');
  return data.users; // Ensure 'users' is an array
};

const UserList = ({ theme }) => {
  const { data = [], error, isLoading } = useQuery('users', fetchUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const styles = {
    list: {
      backgroundColor: theme === 'light' ? '#eff0f1' : '#18191b',
      color: theme === 'light' ? '#000000' : '#ffffff',
      padding: '20px',
      borderRadius: '5px',
    },
  };

  return (
    <div style={styles.list}>
      <h2>Stored Users</h2>
      <ul>
        {data.map((user, index) => (
          <li key={index}>
            {user.nickname} - {user.password} - {user.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
