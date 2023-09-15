"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner';
import styles from "@/template/SignupPage.module.css"
import Link from 'next/link';
import { signIn } from "next-auth/react"

import toast, { Toaster } from 'react-hot-toast';

const SigninPage = () => {
    const router = useRouter()
    const [value, setValue] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const changeHandler = (evt) => {
        const { name } = evt.target
        setValue({ ...value, [name]: evt.target.value })
    }

    const submitHandler = async (evt) => {
        evt.preventDefault()
        setLoading(true)
        const res = await signIn("credentials", {
            ...value,
            redirect: false,
        })
        setLoading(false)
        if (res.error) {
            toast.error(res.error)
        } else {
            router.replace("/")
        }
    }

    return (
        <>
            <div className={styles.form}>
                <h4>فرم ورود </h4>
                <form>
                    <label>ایمیل</label>
                    <input type='text' name='email' value={value.email} onChange={changeHandler} />
                    <label>رمز عبور :</label>
                    <input type='password' name='password' value={value.password} onChange={changeHandler} />
                    {loading ? (<ThreeDots color='#304ffe' height={45} wrapperStyle={{ margin: "auto" }} />)
                        : (<button onClick={submitHandler} type='submit'>ورود</button>)}

                </form>
                <p>حساب کاربری ندارید <Link href="/signup">ثبت نام</Link></p>
            </div>
            <Toaster />
        </>

    );
};

export default SigninPage;