import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import { useState, useRef, useEffect } from 'react';
import { FaRegSquare } from "react-icons/fa";
import { BsCheck2Square } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";

import styles from './ResearchDimensions.module.css';

const ReaserchDimension = ({ prompt, name, description, onChangeInfo, onDimensionSelection, onDeleteDimension }) => {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [rdName, setRdName] = useState(name);
    const [rdDesc, setRdDesc] = useState(description);
    const [isSelected, setIsSelected] = useState(false);
    const [isAndSelected, setIsAndSelected] = useState(false);
    const [isOrSelected, setIsOrSelected] = useState(false);
    const [isNotSelected, setIsNotSelected] = useState(false);

    const ref = useRef(null);

    const addResearchDimensionSelectBox=()=>{
       return prompt && (prompt.type === 'dependent' || prompt.optionalFields.includes("selectedResearchDimensions"));
    }

    const handleClick = (event) => {
        event.stopPropagation();
        setShow(!show);
        setTarget(event.target);
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        onDeleteDimension(rdName);
        

    };

    const handleNameChange = (event) => {
        setRdName(event.target.value);
    }
    const handleDescChange = (event) => {
        setRdDesc(event.target.value);

    }

    const handleClosePopOver = () => {
        setShow(false);
    }

    const handleSelection = () => {
        if (addResearchDimensionSelectBox()) {
            setIsSelected((prevStatus) => !prevStatus);
        }
    }

    const handleAndSelection = () => {
        if (addResearchDimensionSelectBox() && prompt.isMultipleSelect) {
            setIsAndSelected((prevStatus) => !prevStatus);
        }
    }
    const handleOrdSelection = () => {
        if (addResearchDimensionSelectBox() && prompt.isMultipleSelect) {
            setIsOrSelected((prevStatus) => !prevStatus);
        }
    }
    const handleNotSelection = () => {
        if (addResearchDimensionSelectBox() && prompt.isMultipleSelect) {
            setIsNotSelected((prevStatus) => !prevStatus);
        }
    }

    useEffect(() => {
        onDimensionSelection(name, description, isSelected, 'general');
    }, [isSelected]);

    useEffect(() => {
        onDimensionSelection(name, description, isAndSelected, 'and');
    }, [isAndSelected]);

    useEffect(() => {
        onDimensionSelection(name, description, isOrSelected, 'or');
    }, [isOrSelected]);

    useEffect(() => {
        onDimensionSelection(name, description, isNotSelected, 'not');
    }, [isNotSelected]);



    return (

        <div ref={ref}>
            <div className={styles.researchDimension}>
                <div className={styles.infoDiv}>
                    <p>{name}</p>
                    <div className={styles.infoBtns}>
                        {addResearchDimensionSelectBox() && !prompt.isMultipleSelect &&
                            !isSelected && <FaRegSquare className={styles.icon} onClick={handleSelection} />}
                        {addResearchDimensionSelectBox() && !prompt.isMultipleSelect &&
                            isSelected && <BsCheck2Square className={styles.icon} onClick={handleSelection} />}
                        <FiMenu
                            className={styles.icon}
                            onClick={handleClick}
                        />
                        <TiDeleteOutline
                            className={styles.iconDelete}
                            onClick={handleDelete}
                        />
                    </div>
                </div>
                {addResearchDimensionSelectBox() && prompt.isMultipleSelect &&
                    <div className={styles.groupBtnCont}>
                        <div className={styles.groupBtn}>
                            <span>AND</span>
                            {!isAndSelected && <FaRegSquare className={styles.icon} onClick={handleAndSelection} />}
                            {isAndSelected && <BsCheck2Square className={styles.icon} onClick={handleAndSelection} />}
                        </div>

                        <div className={styles.groupBtn}>
                            <span>OR</span>
                            {!isOrSelected && <FaRegSquare className={styles.icon} onClick={handleOrdSelection} />}
                            {isOrSelected && <BsCheck2Square className={styles.icon} onClick={handleOrdSelection} />}
                        </div>

                        <div className={styles.groupBtn}>
                            <span>NOT</span>
                            {!isNotSelected && <FaRegSquare className={styles.icon} onClick={handleNotSelection} />}
                            {isNotSelected && <BsCheck2Square className={styles.icon} onClick={handleNotSelection} />}
                        </div>
                    </div>
                }

            </div>

            <Overlay
                show={show}
                target={target}
                placement="left"
                container={ref}
            >

                <Popover id="popover">
                    <Popover.Header as="h5" className={styles.header}>Research dimension info</Popover.Header>
                    <Popover.Body>
                        <Form.Group className="mb-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control defaultValue={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={description} onChange={handleDescChange} />
                        </Form.Group>
                        <div className={styles.btns}>
                            <Button className={styles.saveBtn} onClick={() => {
                                handleClosePopOver();
                                onChangeInfo(name, rdName, rdDesc);
                            }}>Save</Button>
                            <Button className={styles.closeBtn} onClick={handleClosePopOver}>Close</Button>
                        </div>

                    </Popover.Body>
                </Popover>

            </Overlay>
        </div>
    );

};

export default ReaserchDimension;