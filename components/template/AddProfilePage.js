"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/module/CustomDatePicker";
import RadioList from "@/module/RadioList";
import TextInput from "@/module/TextInput";
import TextList from "@/module/TextList";
import styles from "@/template/AddProfilePage.module.css"
import { Toaster, toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const AddProfilePage = ({ data }) => {
    const router = useRouter()
    const [profileData, setProfileData] = useState({
        title: "",
        description: "",
        location: "",
        phone: "",
        price: "",
        realState: "",
        constructionDate: new Date(),
        category: "",
        rules: [],
        amenities: []
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setProfileData(data)
        }
    }, [])

    const submitHandler = async () => {
        setLoading(true)
        const res = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify(profileData),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        setLoading(false)
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            router.refresh()
        }
    }

    const editHandler = async () => {
        setLoading(true)
        console.log(profileData)
        const res = await fetch("/api/profile", {
            method: "PATCH",
            body: JSON.stringify(profileData),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        setLoading(false)
        console.log(res)
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            router.refresh()
        }
    }

    return (
        <div className={styles.container}>
            <h3>{data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>
            <TextInput
                title="عنوان آگهی"
                name="title"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <TextInput
                title="توضیحات"
                name="description"
                profileData={profileData}
                setProfileData={setProfileData}
                textarea={true}
            />
            <TextInput
                title="آدرس"
                name="location"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <TextInput
                title="شماره تماس"
                name="phone"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <TextInput
                title="قیمت(تومان)"
                name="price"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <TextInput
                title="بنگاه"
                name="realState"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <RadioList profileData={profileData} setProfileData={setProfileData} />
            <TextList title="امکانات رفاهی" profileData={profileData} setProfileData={setProfileData} type="amenities" />
            <TextList title="قوانین" profileData={profileData} setProfileData={setProfileData} type="rules" />
            <CustomDatePicker profileData={profileData} setProfileData={setProfileData} />
            {loading ? (<ThreeDots color="#304ff3" height={45} wrapperStyle={{ margin: "auto" }} />) : data ? (<button className={styles.submit} onClick={editHandler}>ویرایش آگهی</button>) : (<button className={styles.submit} onClick={submitHandler}>ثبت آگهی</button>)}
            <Toaster />
        </div>
    );
};

export default AddProfilePage;
