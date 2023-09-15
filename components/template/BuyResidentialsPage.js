import Card from "@/module/Card";
import Sidebar from "@/module/Sidebar";
import styles from "@/template/BuyResidentialsPage.module.css"


const BuyResidentialsPage = ({ data }) => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.main}>
                {data.length ? null : <p className={styles.text}>هیچ آگهی ثبت نشده است</p>}
                {data.map(item => (
                    <Card key={item._id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default BuyResidentialsPage;