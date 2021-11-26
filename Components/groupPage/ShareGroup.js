import styles from "../../styles/groupPage.module.css";
import { connect } from "react-redux";
import { useState } from "react";

const ShareGroup = ({ group }) => {
    const [copyButtonText, setCopyButtonText] = useState("Copy URL");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopyButtonText("Copied!");
        setTimeout(() => {
            setCopyButtonText("Copy URL");
        }, 1000);
    };

    return (
        <>
            {group && group.public && (
                <div className={styles.shareContainer}>
                    <h1>
                        Share group via <span>{`/group/${group.groupID}`}</span>
                    </h1>
                    <button
                        type="button"
                        className={styles.formButton}
                        onClick={() => {
                            copyToClipboard(`/group/${group.groupID}`);
                        }}
                    >
                        {copyButtonText}
                    </button>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        group: state.urlGroup.activeGroup,
    };
};

export default connect(mapStateToProps)(ShareGroup);
