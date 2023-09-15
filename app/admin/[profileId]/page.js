import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Profile from '@/models/Profile';
import User from '@/models/User';
import DetailsPage from '@/template/DetailsPage';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({ params: { profileId } }) => {
    await connectDB()
    const session = await getServerSession(authOptions)

    if (!session) redirect("/signin")

    const user = await User.findOne({ email: session.user.email })

    if (!user) redirect("/signin")

    if (user.role !== "ADMIN") redirect("/dashboard")

    const profile = await Profile.findOne({ _id: profileId })

    if (!profile) return <h3>آگهی یافت نشد دوباره امتحان کن</h3>

    return (
        <DetailsPage data={profile} check={true} />
    );
};

export default page;