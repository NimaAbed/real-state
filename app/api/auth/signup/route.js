import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { hashPassword } from "@/utils/auth";
import User from "@/models/User";


export async function POST(req) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکل در ارتباط با سرور به وجود امده" })
    }
    const { email, password } = await req.json()
    if (!email || !password) {
        return NextResponse.json({ error: "اطلاعات وارد شده درست نیست" })
    }
    const existUser = await User.findOne({ email })
    if (existUser) {
        return NextResponse.json({ error: "این ایمیل قبلا ثبت شده است" })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await User.create({ email, password: hashedPassword })


    return NextResponse.json({ message: "حساب کاربری ایجاد شد" })
}