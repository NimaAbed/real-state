import CategoryCard from "@/module/CategoryCard";
import styles from "@/template/HomePage.module.css"
import { FiCircle } from "react-icons/fi"
import { FaCity } from "react-icons/fa"

const HomePage = () => {
    const services = ["خرید", "فروش", "رهن", "اجاره"]
    const cities = ["تهران", "سنندج", "کرمانشاه", "اهواز", "مشهد", "اصفهان", "شیراز", "خرم آباد"]
    return (
        <div>
            <div className={styles.banner}>
                <div className={styles.desc}>
                    <h1>سامانه خرید و اجاره املاک</h1>
                    <ul>
                        {services.map(i => (
                            <li key={i}>
                                <FiCircle />
                                <span>{i}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.categories}>
                <CategoryCard title="خانه ویلایی" name="villa" />
                <CategoryCard title="آپارتمان" name="apartment" />
                <CategoryCard title="مغازه" name="store" />
                <CategoryCard title="دفتر" name="office" />
            </div>
            <div className={styles.city}>
                <h3>شهر های پر بازدید</h3>
                <ul>
                    {cities.map(i => (
                        <li key={i}><FaCity /><span>{i}</span></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;