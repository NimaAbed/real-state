import styles from "@/module/CategoryCard.module.css"
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ name, title }) => {
    return (
        <div className={styles.card}>
            <Link href={`/buy-residentials?category=${name}`}>
                <Image src={`/images/${name}.png`} alt={title} width={240} height={144} property="true" />
                <p>{title}</p>
            </Link>
        </div>
    );
};

export default CategoryCard;