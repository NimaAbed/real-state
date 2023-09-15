import AdminCard from '@/module/AdminCard';
import React from 'react';

const AdminPage = ({ profiles }) => {

    return (
        <div>
            {profiles.length ? null : <p>هیچ آگهی در انتظار تایید وجود ندارد</p>}
            {profiles.map(item => (
                <AdminCard data={JSON.parse(JSON.stringify(item))} key={item._id} />
            ))}
        </div>
    );
};

export default AdminPage;