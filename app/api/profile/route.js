import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در برقراری با سرور پیش آمده" })
    }

    const profile = await Profile.find({ published: true }).select("-userId")

    return NextResponse.json({ data: profile })

}

export async function POST(req) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در ارتباط با سرور رخ داده است" })
    }

    const body = await req.json()
    const { title, description, location, phone, price, realState, constructionDate, category, rules, amenities } = body
    // console.log(body)
    const session = await getServerSession(req)

    // console.log(session)

    if (!session) return NextResponse.json({ error: "لطفا اول وارد حساب کابری خود شوید" })

    const user = await User.findOne({ email: session.user.email })

    if (!user) return NextResponse.json({ error: "حساب کاربری یافت نشد" })

    if (!title || !location || !description || !phone || !realState || !price || !constructionDate || !category) {
        return NextResponse.json({ error: "اطلاعات وارد شده کامل نیست" })
    }

    const newProdile = await Profile.create({
        title, description, location, phone, price: +price, realState,
        constructionDate, category, rules, amenities, userId: new Types.ObjectId(user._id)
    })

    return NextResponse.json({ message: "آگهی با موفقیت ثبت شد" })

}

export async function PATCH(req) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در ارتباط با سرور رخ داده است" })
    }

    const body = await req.json()
    const { _id, title, description, location, phone, price, realState, constructionDate, category, rules, amenities } = body
    // console.log(body)
    const session = await getServerSession(req)

    // console.log(session)

    if (!session) return NextResponse.json({ error: "لطفا اول وارد حساب کابری خود شوید" })

    const user = await User.findOne({ email: session.user.email })

    if (!user) return NextResponse.json({ error: "حساب کاربری یافت نشد" })

    if (!_id || !title || !location || !description || !phone || !realState || !price || !constructionDate || !category) {
        return NextResponse.json({ error: "اطلاعات وارد شده کامل نیست" })
    }

    const profile = await Profile.findOne({ _id })

    if (!user._id.equals(profile.userId)) {
        return NextResponse.json({ error: "دسترسی شما به این آگاهی رد شده است" })
    }

    profile.title = title
    profile.location = location
    profile.description = description
    profile.phone = phone
    profile.realState = realState
    profile.price = price
    profile.constructionDate = constructionDate
    profile.category = category
    profile.rules = rules
    profile.amenities = amenities
    profile.save()

    console.log(profile)

    return NextResponse.json({ message: "آگهی با موفقیت بروزرسانی شد" })



} 