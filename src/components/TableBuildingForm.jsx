import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './TableBuildingForm.module.css';


export default function TableBuildingForm({
    selectedPrompt, mainTableText, definitionsText, disableClearDataBtn,
    onMainTableTextChange, onDefinitionsTextChange, onClearData, onGenerateTable }) {

    const needsMainTablePart = selectedPrompt.nextStepFeilds === 'mainText';
    const genBtnLable = needsMainTablePart ? "Generate Table" : "Generate Research Dimensions";

    return (
        (selectedPrompt.description &&
            selectedPrompt.nextStepFeilds !== 'none') && (
            <>
                <div className={styles.resultForm}>
                    {selectedPrompt && selectedPrompt.nextStepFeilds === 'mainText' && (
                        <Form.Group className="mb-3">
                            <Form.Label>Result Table</Form.Label>
                            <Form.Control
                                value={mainTableText}
                                id="resultTableText"
                                as="textarea" rows={3}
                                placeholder="Paste the AI generated table here"
                                onChange={onMainTableTextChange} />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Definitions Table</Form.Label>
                        <Form.Control
                            value={definitionsText}
                            id="definitionsText"
                            as="textarea" rows={3}
                            placeholder="Paste the AI generated table here"
                            onChange={onDefinitionsTextChange} />
                    </Form.Group>
                </div>

                <div className={styles.btns}>
                    <Button
                        variant='secondary'
                        disabled={
                            (needsMainTablePart && !mainTableText) ||
                            (!needsMainTablePart && !definitionsText)
                        }
                        className={styles.genBtn}
                        onClick={onGenerateTable}
                    >
                        {genBtnLable}
                    </Button>
                    <Button
                        variant="secondary"
                        className={styles.clearBtn}
                        onClick={onClearData}
                        disabled={disableClearDataBtn}>
                        Clear Generated Data</Button>
                </div>
            </>
        )
    );

}