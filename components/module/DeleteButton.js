"use client"

import styles from "@/module/DeleteButton.module.css"
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const DeleteButton = ({ id }) => {
    const router = useRouter()

    const deleteHandler = async () => {
        const res = await fetch(`/api/admin/delete/${id}`, { method: "DELETE" })
        const data = res.json()
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            router.back()
        }
    }

    return (
        <button className={styles.button} onClick={deleteHandler}>حذف</button>
    );
};

export default DeleteButton;