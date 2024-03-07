import Form from 'react-bootstrap/Form';
import styles from "./MultiContextContHeader.module.css";
import { FaPlus } from "react-icons/fa";


function MultiContextContHeader(props) {

    return (
        <div className={styles.contHeader}>
            <Form.Label>Context List</Form.Label>
            <FaPlus className={styles.addBtn}  onClick={props.handler} />
        </div>
    );
 }

export default MultiContextContHeader;