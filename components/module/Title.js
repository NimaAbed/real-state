import styles from "@/module/Title.module.css"

const Title = ({ name }) => {
    return (
        <h3 className={styles.title}>{name}</h3>
    );
};

export default Title;