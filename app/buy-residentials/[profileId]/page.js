import Profile from '@/models/Profile';
import DetailsPage from '@/template/DetailsPage';
import connectDB from '@/utils/connectDB';
import React from 'react';

const ProfileDetails = async ({ params: { profileId } }) => {
    await connectDB()

    const profile = await Profile.findOne({ _id: profileId }).select("-userId")

    console.log(profile)

    return (
        <DetailsPage data={profile} />
    );
};

export default ProfileDetails;

export async function generalMetadata({ params: { profileId } }) {
    await connectDB()

    const profile = await Profile.findOne({ _id: profileId }).select("-userId")

    return { title: profile.title, description: profile.description }

}