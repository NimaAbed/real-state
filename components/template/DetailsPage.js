import { SiHomebridge } from "react-icons/si"
import { AiOutlinePhone } from "react-icons/ai"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { RiHome3Line } from "react-icons/ri"
import { MdApartment } from "react-icons/md"
import { BiStore, BiCalendarCheck } from "react-icons/bi"
import { GiOfficeChair } from "react-icons/gi"
import { e2p, sp } from "@/utils/replaceNumber"
import styles from "@/template/DetailsPage.module.css"
import ItemList from "@/module/ItemList"
import Title from "@/module/Title"
import ShareButton from "@/module/ShareButton"
import DeleteButton from "@/module/DeleteButton"
import { Toaster } from "react-hot-toast"


const DetailsPage = ({ check = false, data: { _id, title, location, description, amenities, rules, realState, phone, category, price, constructionDate } }) => {

    const categories = {
        apartment: "آپارتمان",
        villa: "ویلا",
        store: "مغازه",
        office: "دفتر"
    }

    const icons = {
        villa: <RiHome3Line />,
        apartment: <MdApartment />,
        store: <BiStore />,
        office: <GiOfficeChair />
    }


    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1>{title}</h1>
                <span><HiOutlineLocationMarker />{location}</span>
                <Title name="توضیحات" />
                <p>{description}</p>
                <Title name="امکانات" />
                <ItemList data={amenities} />
                <Title name="قوانین" />
                <ItemList data={rules} />
            </div>
            <div className={styles.sidebar}>
                <div className={styles.realState}>
                    <SiHomebridge />
                    <p>املاک {realState}</p>
                    <span>
                        <AiOutlinePhone />
                        {e2p(phone)}
                    </span>
                </div>
                <ShareButton />
                <div className={styles.price}>
                    <p>{icons[category]}{categories[category]}</p>
                    <p>{sp(price)} تومان</p>
                    <p><BiCalendarCheck /> {new Date(constructionDate).toLocaleDateString("fa-IR")}</p>
                </div>
                {check && (<div className={styles.price}>
                    <DeleteButton id={JSON.parse(JSON.stringify(_id))} />
                </div>)}
            </div>
            <Toaster />
        </div >
    );
};

export default DetailsPage;