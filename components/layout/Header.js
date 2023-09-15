"use client"

import React from 'react';
import { FiLogIn } from "react-icons/fi"
import styles from "@/layout/Header.module.css"
import Link from 'next/link';
import { FaUserAlt } from "react-icons/fa"
import { useSession } from 'next-auth/react';

const Header = () => {
    const { status } = useSession()
    return (
        <header className={styles.header}>
            <div>
                <ul>
                    <li>
                        <Link href="/">صفحه اصلی</Link>
                    </li>
                    <li>
                        <Link href="/buy-residentials">آگهی ها</Link>
                    </li>
                </ul>
            </div>
            {status === "authenticated" ? (<div className={styles.login}>
                <Link href="/dashboard"><FaUserAlt /></Link>
            </div>) : (
                <div className={styles.login}>
                    <Link href="/signin"><FiLogIn /> <span>ورود</span></Link>
                </div>
            )
            }
        </header >
    );
};

export default Header;