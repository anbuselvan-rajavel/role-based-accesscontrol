// app/dashboard/page.tsx
"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const [filters, setFilters] = useState<{
        global: { value: string | null; matchMode: FilterMatchMode };
    }>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    useEffect(() => {
        if (!user) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [user, router]);

    const data = [
        {
            "id": 1,
            "name": "Alice Johnson",
            "position": "Software Engineer",
            "department": "Development",
            "email": "alice.j@example.com",
            "hireDate": "2022-01-15"
        },
        {
            "id": 2,
            "name": "Bob Smith",
            "position": "Product Manager",
            "department": "Product",
            "email": "bob.smith@example.com",
            "hireDate": "2021-03-22"
        },
        {
            "id": 3,
            "name": "Carol Davis",
            "position": "UX Designer",
            "department": "Design",
            "email": "carol.d@example.com",
            "hireDate": "2023-05-30"
        },
        {
            "id": 4,
            "name": "David Wilson",
            "position": "QA Engineer",
            "department": "Quality Assurance",
            "email": "david.w@example.com",
            "hireDate": "2020-11-12"
        },
        {
            "id": 5,
            "name": "Emily Johnson",
            "position": "Data Analyst",
            "department": "Analytics",
            "email": "emily.j@example.com",
            "hireDate": "2022-07-01"
        },
        {
            "id": 6,
            "name": "Frank Miller",
            "position": "DevOps Engineer",
            "department": "Operations",
            "email": "frank.m@example.com",
            "hireDate": "2021-09-16"
        },
        {
            "id": 7,
            "name": "Grace Lee",
            "position": "Marketing Specialist",
            "department": "Marketing",
            "email": "grace.l@example.com",
            "hireDate": "2023-02-20"
        },
        {
            "id": 8,
            "name": "Henry Thompson",
            "position": "HR Manager",
            "department": "Human Resources",
            "email": "henry.t@example.com",
            "hireDate": "2019-08-25"
        },
        {
            "id": 9,
            "name": "Irene Garcia",
            "position": "Sales Associate",
            "department": "Sales",
            "email": "irene.g@example.com",
            "hireDate": "2023-03-11"
        },
        {
            "id": 10,
            "name": "Jake White",
            "position": "System Administrator",
            "department": "IT",
            "email": "jake.w@example.com",
            "hireDate": "2020-10-30"
        }
    ]


    return (
        <div className="p-4">
            <h1 className="text-xl font-bold text-right">Welcome, {user?.username}!</h1>
            <p className='text-right'>Your role: {user?.role}</p>
            <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded float-right">
                Logout
            </button>
            <InputText onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilters({
                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                })
            } className='border mb-2 h-8' />
            <DataTable value={data} sortMode='multiple' filters={filters}
            paginator
            rows={5}
            rowsPerPageOptions={[1,2,3,4,5]}
            totalRecords={3}>
                <Column field='id' header='ID' sortable />
                <Column field='name' header='Name' sortable />
                <Column field='position' header='Position' sortable />
                <Column field='department' header='Department' sortable />
                <Column field='email' header='Email' sortable />
                <Column field='hireDate' header='HireDate' sortable />
            </DataTable>
        </div>
    );
};

export default Dashboard;
