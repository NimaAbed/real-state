import React from 'react';
import styles from "@/template/MyProfilesPage.module.css"
import DashboardCard from '@/module/DashboardCard';

const MyProfilesPage = ({ profiles }) => {
    return (
        <div>
            {profiles.length ? null : <p className={styles.text}>هیچ آگهی ثبت نشده است</p>}
            {profiles.map(item => <DashboardCard key={item._id} data={JSON.parse(JSON.stringify(item))} />)}
        </div>
    );
};

export default MyProfilesPage;