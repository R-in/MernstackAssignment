import React, { useState } from 'react';
import './UserForm.css';
import axios from 'axios';

const UserForm = ({ onUserAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const userData = { name, email, age: Number(age) };

        try {
            const response = await axios.post('http://localhost:3000/users', userData);
            onUserAdded(response.data); // Call the callback to update user list
            setName('');
            setEmail('');
            setAge('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting the form');
        }
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
