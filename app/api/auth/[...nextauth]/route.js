import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

const authOptions = {
    session: { strategy: "jwt" },
    providers: [CredentialsProvider({
        async authorize(credentials) {
            const { email, password } = credentials
            try {
                await connectDB()
            } catch (error) {
                throw new Error("مشکل در ارتباط با سرور")
            }
            if (!email || !password) throw new Error("اطلاعات صحیح نمی باشد")

            const user = await User.findOne({ email })

            if (!user) throw new Error("کاربری با این ایمیل پیدا نشد")

            const isValid = await verifyPassword(password, user.password)

            if (!isValid) throw new Error("ایمیل یا رمز ورود صحیح نمی باشد")

            return { email }
        }
    })]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }