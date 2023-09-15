import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params: { profileId } }) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در برقراری در سرور رخ داده است" })
    }

    const session = await getServerSession(req)

    if (!session) {
        return NextResponse.json({ error: "ورود کنید به حساب کاربری" })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        return NextResponse.json({ error: "کاربر یافت نشد" })
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "دسترسی محدود شده" })
    }

    const profile = await Profile.findOneAndDelete({ _id: profileId })


    return NextResponse.json({ message: "آگهی با موفقیت حذف شد" })

}