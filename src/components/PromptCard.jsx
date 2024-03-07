import PromptOption from "./PromptOption";
import styles from "./PromptCard.module.css";
import Modal from 'react-bootstrap/Modal';
import PROMPT_TEMP from "../constants/PromptData.js"



function PromptCard(props) {

    const onPromptSelectionHandler = (selectedPrompt) => {
        props.onClosePopup();
        props.onPromptSelection(selectedPrompt);

    }

    const currentPrompt = Object.entries(PROMPT_TEMP)
        .filter(([key, value]) => (props.definitions && value.description === props.selectedPrompt.description))
        .map(([key, value]) => <PromptOption key={key} prompt={value} onPromptSelection={onPromptSelectionHandler}
            definitions={props.definitions} isCurrentPrompt={true} />);

    const derivedPrompts = Object.entries(PROMPT_TEMP)
        .filter(([key, value]) => props.definitions && props.selectedPrompt.activatePrompts && props.selectedPrompt.activatePrompts.includes(key))
        .map(([key, value]) => <PromptOption key={key} prompt={value} onPromptSelection={onPromptSelectionHandler}
            definitions={props.definitions} isDrivedPrompt={true} />);


    const simplePrompts = Object.entries(PROMPT_TEMP)
        .filter(([key, value]) => (!props.definitions) || ((value.description !== props.selectedPrompt.description)
            && (!props.selectedPrompt.activatePrompts || !props.selectedPrompt.activatePrompts.includes(key))))
        .map(([key, value]) => <PromptOption key={key} prompt={value} onPromptSelection={onPromptSelectionHandler}
            definitions={props.definitions} />);

    return (

        <Modal
            show={props.show}
            onHide={props.onClosePopup}
            backdrop="static"
            keyboard={false}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Please select the prompt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.promptCardItems}>
                    {currentPrompt.length > 0 && <div className={styles.promptCategory}>

                        {currentPrompt}
                    </div>
                    }
                    {derivedPrompts.length > 0 && < div className={styles.promptCategory}>

                        {derivedPrompts}
                    </div>
                    }
                    <div className={styles.promptCategory}>

                        {simplePrompts}
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    );
}

export default PromptCard;