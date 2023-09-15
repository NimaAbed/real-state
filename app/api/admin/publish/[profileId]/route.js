import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در برقراری با سرور پیش آمده" })
    }

    const session = await getServerSession(req)
    const id = params.profileId

    if (!session) {
        return NextResponse.json({ error: "لطفا وارد حساب کاربری خود شوید" })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        return NextResponse.json({ error: "کاربر یافت نشد" })
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "دسترسی محدود" })
    }

    const profile = await Profile.findOne({ _id: id })

    if (!profile) {
        return NextResponse.json({ error: "آگهی یافت نشد" })
    }

    profile.published = true
    profile.save()

    return NextResponse.json({ message: "آگهی منتشر شد" })

}