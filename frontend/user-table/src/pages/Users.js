// src/pages/Users.js
import React from 'react';
import UserTable from '../components/UserTable';
import './Users.css';

const Users = () => {
    return (
        <div className="users-container">
            <h1 className="users-title">Users Page</h1>
            <p className="users-description">List of users will be displayed here.</p>
            <UserTable/>
        </div>
    );
};

export default Users;
