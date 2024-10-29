"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [user, router]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Welcome, {user?.username}!</h1>
            <p>Your role: {user?.role}</p>
            <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
