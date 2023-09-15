import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی رد برقراری با سرور رخ داده است" })
    }

    const session = await getServerSession(req)

    if (!session) {
        return NextResponse.json({ error: "لطفا وارد حساب کاربری خود شوید" })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        return NextResponse.json({ error: "کاربر یافت نشد" })
    }

    const profile = await Profile.findOne({ _id: params.profileId })

    if (!profile) {
        return NextResponse.json({ error: "آگهی مورد نظر بافت نشد" })
    }

    if (!user._id.equals(profile.userId)) {
        return NextResponse.json({ error: "دسترسی شما به این آگهی رد شده است" })
    }

    await Profile.findOneAndDelete({ _id: params.profileId })


    console.log(params)

    // console.log(params.searchParams.get("profileId"))

    return NextResponse.json({ message: "آگهی شما با موفقیت حدف شد" })
} 