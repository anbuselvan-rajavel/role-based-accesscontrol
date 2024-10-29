"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

const LoginPage = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'user'>('user');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
           await login(username, password, role);
           if(role === 'admin'){
            router.push('/admin'); // Redirect to admin page
           }else{
            router.push('/user'); // Redirect to user page
           }
            
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center' style={{backgroundImage: 'url(/images/bg-image.png)'}}>
            <form onSubmit={handleSubmit} className='p-8 rounded-lg shadow-md w-96 bg-white'>
                <h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>
                {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className="mb-4">
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value as 'admin' | 'user')} 
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button 
                    type='submit' 
                    className='w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300'
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
