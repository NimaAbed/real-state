import Profile from '@/models/Profile';
import BuyResidentialPage from '@/template/BuyResidentialsPage';
import connectDB from '@/utils/connectDB';
import React from 'react';

const BuyResidentials = async ({ searchParams }) => {
    //بهتر است در کامپوننت های سرور سابد از ای پی ای روت استفاده نکنیم (این مورد حالت تمرینی دارد)
    // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile`, { cache: "no-cache" })
    // const data = await res.json()

    await connectDB()

    const profile = await Profile.find({ published: true }).select("-userId")

    console.log(searchParams)

    if (!profile) return <h3>مشکلی پیش آمده دوباره امتحان کن</h3>

    let result = profile
    if (searchParams.category) {
        result = result.filter(item => item.category === searchParams.category)
    }

    return (
        <BuyResidentialPage data={result} />
    );
};

export default BuyResidentials;