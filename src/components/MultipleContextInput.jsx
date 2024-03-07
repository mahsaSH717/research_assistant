import { useState, useEffect, useContext } from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { FaMinus } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import MultiContextContHeader from './MultiContextContHeader';
import styles from "./MultipleContextInput.module.css"




function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    return (
        <FaChevronDown className={styles.collapseBtn}  onClick={decoratedOnClick}>
            {children}
        </FaChevronDown>
    );
}

function MultipleContextInput({ onChange }) {

    const [contextList, setContextList] = useState([{ "id": "1", "context": "" }]);

    function addContextHandler() {
        setContextList((prevList) => [
            ...prevList,
            { id: prevList.length > 0 ? String(Math.max(...prevList.map(item => Number(item.id))) + 1) : "1", context: "" },
        ]);
    }

    function removeContextHandler(e) {
        const afterRemove = contextList.filter((item) => item.id !== e.target.id);
        setContextList(afterRemove);
    }

    function updateContextHandler(idToUpdate, updatedContext) {
        const updatedList = contextList.map((item) =>
            item.id === idToUpdate ? { ...item, context: updatedContext } : item
        );
        setContextList(updatedList);
    }

    useEffect(() => {
        onChange(contextList);
    }, [contextList]);

    return (

        <Accordion defaultActiveKey="0" >
            <MultiContextContHeader handler={addContextHandler} />
            {contextList.map((item, index) => (
                <Card key={index} className={styles.accCard}>
                    <Card.Header className={styles.accHeader}>
                        <FaMinus className={styles.btnRemove} id={item.id}  onClick={removeContextHandler} />
                        Context #{item.id}

                        <ContextAwareToggle eventKey={item.id} />
                    </Card.Header>
                    <Accordion.Collapse eventKey={item.id}>
                        <Card.Body>
                            <Form.Control as="textarea"
                                rows={3}
                                value={item.context}
                                onChange={(e) => { updateContextHandler(item.id, e.target.value) }}
                            />

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))}
        </Accordion>
    );
}

export default MultipleContextInput;