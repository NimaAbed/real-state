import Profile from '@/models/Profile';
import AddProfilePage from '@/template/AddProfilePage';
import React from 'react';

const Edit = async ({ params }) => {

    const profile = await Profile.findOne({ _id: params.profileId })

    if (!profile) return <h3>مشکلی پیش آمده لفطا دوباره امتحان کن</h3>

    return (
        <AddProfilePage data={JSON.parse(JSON.stringify(profile))} />
    );
};

export default Edit;