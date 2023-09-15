"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner';
import styles from "@/template/SignupPage.module.css"
import Link from 'next/link';

import toast, { Toaster } from 'react-hot-toast';

const SignupPage = () => {
    const router = useRouter()
    const [value, setValue] = useState({
        email: "",
        password: "",
        rePassword: ""
    })
    const [loading, setLoading] = useState(false)

    const changeHandler = (evt) => {
        const { name } = evt.target
        setValue({ ...value, [name]: evt.target.value })
    }

    const submitHandler = async (evt) => {
        evt.preventDefault()
        if (value.password === value.rePassword) {
            setLoading(true)
            const res = await fetch("api/auth/signup", {
                method: "POST",
                body: JSON.stringify(value),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            setLoading(false)
            if (data.error) {
                toast.error(data.error)
            } else if (data.message) {
                toast.success(data.message)
                router.push("/signin")
            }
        } else {
            toast.error("رمز عبور با تکرار یکی نیست")
        }
    }

    return (
        <>
            <div className={styles.form}>
                <h4>فرم ثبت نام </h4>
                <form>
                    <label>ایمیل</label>
                    <input type='text' name='email' value={value.email} onChange={changeHandler} />
                    <label>رمز عبور :</label>
                    <input type='password' name='password' value={value.password} onChange={changeHandler} />
                    <label> تکرار رمز عبور :</label>
                    <input type='password' name='rePassword' value={value.rePassword} onChange={changeHandler} />
                    {loading ? (<ThreeDots color='#304ffe' height={45} wrapperStyle={{ margin: "auto" }} />)
                        : (<button onClick={submitHandler} type='submit'>ثبت نام</button>)}

                </form>
                <p>حساب کاربری دارید <Link href="/signin">ورود</Link></p>
            </div>
            <Toaster />
        </>

    );
};

export default SignupPage;