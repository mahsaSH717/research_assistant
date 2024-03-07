import Button from 'react-bootstrap/Button';
import styles from "./PromptBuildingArea.module.css"
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import PromptBuildingForm from './PromptBuildingForm';
import TableBuildingForm from './TableBuildingForm';
import { FaChevronDown } from "react-icons/fa";


function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    return (
        <FaChevronDown className={styles.collapseBtn} onClick={decoratedOnClick}>
            {children}
        </FaChevronDown>
    );
}

function PromptBuildingArea({ prompt, showChatBots, selectedDimensions,
    andSelectedDimensions, orSelectedDimensions, notSelectedDimensions,
    disableClearDataBtn, mainTableText, definitionsText, onMainTableTextChange, onDefinitionsTextChange,
    onShowPromptList, onShowChatBots, onGenerateTable, onClearData }) {

    return (
        <div>
            <Accordion defaultActiveKey="0" alwaysOpen>
                <Card className={styles.accCard}>
                    <Card.Header className={styles.accHeader}>
                        Create a Chatbot Prompt
                        <ContextAwareToggle eventKey="0" />
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Button
                                variant='secondary'
                                className={styles.btnMain}
                                onClick={onShowPromptList}>{prompt.description ? prompt.description : 'Select Prompt'}
                            </Button>
                            <PromptBuildingForm
                                prompt={prompt}
                                selectedDimensions={selectedDimensions}
                                andSelectedDimensions={andSelectedDimensions}
                                orSelectedDimensions={orSelectedDimensions}
                                notSelectedDimensions={notSelectedDimensions}
                                showChatBots={showChatBots}
                                onShowChatBots={onShowChatBots} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className={styles.accCard}>
                    <Card.Header className={styles.accHeader}>
                        Generate Data
                        <ContextAwareToggle eventKey="1" />
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <TableBuildingForm
                                disableClearDataBtn={disableClearDataBtn}
                                selectedPrompt={prompt}
                                mainTableText={mainTableText}
                                definitionsText={definitionsText}
                                onMainTableTextChange={onMainTableTextChange}
                                onDefinitionsTextChange={onDefinitionsTextChange}
                                onGenerateTable={onGenerateTable}
                                onClearData={onClearData} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>

    );
}

export default PromptBuildingArea;