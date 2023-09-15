import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import styles from "@/module/CustomDatePicker.module.css"


const CustomDatePicker = ({ profileData, setProfileData }) => {

    const dateHandler = (evt) => {
        const data = new Date(evt)
        console.log(data)
        setProfileData({ ...profileData, constructionDate: data })
    }

    return (
        <div className={styles.container}>
            <p>تاریخ ساخت</p>
            <DatePicker value={profileData.constructionDate} onChange={dateHandler} calendar={persian} locale={persian_fa} />
        </div>
    );
};

export default CustomDatePicker;