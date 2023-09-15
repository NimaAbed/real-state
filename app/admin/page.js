import DashboardSidbar from '@/layout/DashboardSidbar';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import User from '@/models/User';
import AdminPage from '@/template/AdminPage';
import Profile from '@/models/Profile';

export const metadata = {
    title: 'پنل ادمین | پروژه بوتواستارت',
}

const page = async () => {
    await connectDB()
    const session = await getServerSession(authOptions)

    if (!session) redirect("/signin")

    const user = await User.findOne({ email: session.user.email })

    if (user.role !== "ADMIN") redirect("/dashboard")

    const profiles = await Profile.find({ published: false })

    return (
        <DashboardSidbar role={user.role} email={user.email}>
            <AdminPage profiles={profiles} />
        </DashboardSidbar>
    );
};

export default page;