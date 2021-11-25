import styles from "../../styles/dashboard.module.css";

const Greet = ({ name }) => {
    const capitalize = (str) => {
        return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    };

    return (
        <div className={styles.greetContainer}>
            <h1>Hi, {capitalize(name) || "User"}</h1>
        </div>
    );
};

export default Greet;
