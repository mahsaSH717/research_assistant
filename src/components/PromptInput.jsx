import Form from 'react-bootstrap/Form';
import MultipleContextInput from './MultipleContextInput';

function PromptInput({ inputProp, onChange }) {


    return (
        !inputProp.isContext ?

            (<Form.Group className="mb-3">
                <Form.Label>{inputProp.label}</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={inputProp.rows}
                    placeholder={inputProp.placeholder}
                    onChange={onChange}
                    readOnly={inputProp.readOnly}
                    value={inputProp.value} />
            </Form.Group>
            )
            :
            (<MultipleContextInput onChange={onChange} />)

    );
};


export default PromptInput