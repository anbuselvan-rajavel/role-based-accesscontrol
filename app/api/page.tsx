"use client";
import axios from 'axios';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import { Skeleton } from 'primereact/skeleton';

const EmployeeList = () => {
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 10; // Set rows per page

    const fetchEmployees = async (page: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
            setEmployees(response.data.results); 
            setTotalRecords(response.data.info.count);
        } catch (err) {
            setError('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage]);

    const onPageChange = (event: any) => {
        setCurrentPage(event.page + 1); // Update current page (event.page is 0-indexed)
    };

    const renderSkeleton = () => {
        return (
           <DataTable value={Array(20).fill({})} className="p-datatable-striped">
            <Column field="id" header="ID" style={{ width: '5%' }} body={<Skeleton />}></Column>
            <Column field="name" header="Name" style={{ width: '25%' }} body={<Skeleton />}></Column>
            <Column field="status" header="Status" style={{ width: '5%' }} body={<Skeleton />}></Column>
            <Column field="gender" header="Gender" style={{ width: '5%' }} body={<Skeleton />}></Column>
            <Column field="location" header="Location" style={{ width: '25%' }} body={<Skeleton />}></Column>
            <Column field="created" header="Created" style={{ width: '25%' }} body={<Skeleton />}></Column>
        </DataTable>
                 
        );
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-center my-4">Employee List</h1>
            {loading ? renderSkeleton() : (
                <DataTable
                    value={employees}
                    paginator={false} // Disable built-in paginator
                    rows={rowsPerPage}
                    className="p-datatable-gridlines p-datatable-sm"
                >
                    <Column field='id' header="ID" sortable />
                    <Column field='name' header="Name" sortable />
                    <Column field='status' header="Status" sortable />
                    <Column field='gender' header="Gender" sortable />
                    <Column field='location.name' header="Location" sortable />
                    <Column field='created' header="Created" sortable />
                </DataTable>
            )}
            <Paginator
                first={(currentPage - 1) * rowsPerPage} // Calculate first index
                rows={rowsPerPage}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                className="mt-4" // Optional styling
            />
        </div>
    );
};

export default EmployeeList;
