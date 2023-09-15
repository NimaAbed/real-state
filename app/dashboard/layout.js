import DashboardSidbar from '@/layout/DashboardSidbar';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import connectDB from '@/utils/connectDB';
import User from '@/models/User';

export const metadata = {
    title: 'پنل کاربری | پروژه بوتواستارت',
}

const layout = async ({ children }) => {
    const session = await getServerSession(authOptions)

    if (!session) redirect("/signin")

    await connectDB()

    const user = await User.findOne({ email: session.user.email })

    if (!user) return <h3>مشکلی پیش آمده</h3>

    return (
        <DashboardSidbar email={user.email} role={user.role}>{children}</DashboardSidbar>
    );
};

export default layout;