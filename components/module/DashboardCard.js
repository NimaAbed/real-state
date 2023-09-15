"use client"

import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import Card from './Card';
import styles from "@/module/DashboardCard.module.css"
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const DashboardCard = ({ data }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const deleteHandler = async () => {
        setLoading(true)
        const res = await fetch(`/api/profile/delete/${data._id}`, {
            method: "DELETE"
        })
        const result = await res.json()
        setLoading(false)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.message)
            router.refresh()
        }
    }

    const editHandler = () => {
        router.push(`/dashboard/my-profiles/${data._id}`)
    }

    return (
        <div className={styles.container}>
            <Card data={data} />
            <div className={styles.main}>
                <button onClick={editHandler}>ویرایش <FiEdit /></button>
                {loading ? (<ThreeDots color="#db0505" wrapperStyle={{ margin: "0 auto" }} />) : (<button onClick={deleteHandler}>حذف آگهی <AiOutlineDelete /></button>)}
            </div>
            <Toaster />
        </div>
    );
};

export default DashboardCard;