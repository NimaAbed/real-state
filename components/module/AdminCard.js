"use client"

import styles from "@/module/AdminCard.module.css"
import { sp } from "@/utils/replaceNumber";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const AdminCard = ({ data }) => {
    const router = useRouter()

    const publishHandler = async () => {
        const res = await fetch(`/api/admin/publish/${data._id}`, { method: "PATCH" })
        const result = await res.json()
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.message)
            router.refresh()
        }
    }

    const deleteHandler = async () => {
        const res = await fetch(`/api/admin/delete/${data._id}`, { method: "DELETE" })
        const result = await res.json()
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.message)
            router.refresh()
        }
    }

    return (
        <div className={styles.container}>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <div className={styles.properties}>
                <span>{data.location}</span>
                <span>{sp(data.price)}</span>
            </div>
            <button onClick={publishHandler}>انتشار</button>
            <Link className={styles.details} href={`/admin/${data._id}`} >دیدن جزییات</Link>
            <button className={styles.delete} onClick={deleteHandler}>حذف</button>
            <Toaster />
        </div>
    );
};

export default AdminCard;