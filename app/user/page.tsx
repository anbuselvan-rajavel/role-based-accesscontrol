"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import { Divider } from 'primereact/divider';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (!user) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [user, router]);

    const header = <h6>Pick a password</h6>
    const footer = (
        <>
        <Divider/>
        <p className='mt-2'>Suggestions</p>
        <ul className='pl-2 ml-2 mt-0 line-height-3'>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
        </ul>
        </>
    )
       
    

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold text-right">Welcome, {user?.username}!</h1>
            <p className='text-right'>Your role: {user?.role}</p>
            <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded float-right">
                Logout
            </button>
            <Password value={value} onChange={(e) => setValue(e.target.value)} feedback={true} weakLabel='super duper weak'
            strongRegex='/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/' toggleMask  className='border' header={header} footer={footer} />
        </div>
    );
};

export default Dashboard;
