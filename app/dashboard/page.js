import DashboardPage from '@/template/DashboardPage';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import User from '@/models/User';
import connectDB from '@/utils/connectDB';

const page = async () => {
    await connectDB()
    const session = await getServerSession(authOptions)

    const user = await User.findOne({ email: session.user.email })

    return (
        <DashboardPage createdAt={user.createdAt} />
    );
};

export default page;