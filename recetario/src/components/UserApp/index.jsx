import React from 'react';
import UserList from '../UserList';
import UserForm from '../UserForm';


const UserApp = () => (
  <div className="usersApp">
    <UserList />
    <h2>
      { 'Nuevo usuario:' }
    </h2>
    <UserForm />
  </div>
);

export default UserApp;