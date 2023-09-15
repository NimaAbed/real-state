import styles from "@/module/TextList.module.css"
import { MdOutlineLibraryAdd } from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"


const TextList = ({ title, profileData, setProfileData, type }) => {

    const addHandler = () => {
        setProfileData({ ...profileData, [type]: [...profileData[type], ""] })
    }

    const inputHandler = (evt, index) => {
        const { value } = evt.target
        const list = [...profileData[type]]
        list[index] = value
        setProfileData({ ...profileData, [type]: list })
    }

    const deleteHandelr = (index) => {
        const list = [...profileData[type]]
        list.splice(index, 1)
        setProfileData({ ...profileData, [type]: list })
    }

    return (
        <div className={styles.container}>
            <p>{title}</p>
            {profileData[type].map((item, index) => (
                <div className={styles.card} key={index}>
                    <input type="text" value={item} onChange={(evt) => inputHandler(evt, index)} />
                    <button onClick={() => deleteHandelr(index)}>حذف</button>
                </div>
            ))}
            <button onClick={addHandler}>افزودن <MdOutlineLibraryAdd /></button>
        </div>
    );
};

export default TextList;