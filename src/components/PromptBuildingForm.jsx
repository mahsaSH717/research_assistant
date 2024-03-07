import { useState } from 'react';
import INPUTS_PROPERTIES from '../constants/InputsProperties';
import PromptInput from './PromptInput';
import GeneratePromptBtn from './GeneratePromptBtn';
import Chatbots from './Chatbots';

const FILEDS_NOT_IN_FORM = ['andSelectedResearchDimensions', 'orSelectedResearchDimensions', 'notSelectedResearchDimensions']


function PromptBuildingForm({ prompt,
    selectedDimensions, andSelectedDimensions, orSelectedDimensions, notSelectedDimensions,
    showChatBots, onShowChatBots }) {
    const [show, setShow] = useState(false);
    const [formValues, setFormValues] = useState({});


    const hasOptionalFilledSelectedResearchDimensions=()=>{
        return prompt.optionalFields.includes("selectedResearchDimensions") && selectedDimensions ?.length !== 0;

    }
    const handleInputChange = (inputName, inputObj) => {
        if (inputObj) {
            setFormValues((prevValues) => ({
                ...prevValues,
                [inputName]: inputObj.target.value,
            }));
        }
    };

    const handleContextChange = (inputName, contextList) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [inputName]: contextList,
        }));
    };

    const getReplacementValue = (key) => {
        if (Array.isArray(formValues[key])) {
            let contextList = ""
            formValues[key].forEach((obj) => { contextList += `Context ${obj.id}\n"${obj.context}"\n`; });
            return contextList;
        } else {
            return formValues[key]
        }
    }

    const getReplacementForResearchDimensions = (dimensions) => {
        return dimensions.map(obj => Object.keys(obj)).flat().join(', ');
    }
    const getReplacementForResearchDimensionsMap = (dimensions) => {
        return dimensions.map(obj => Object.entries(obj).map(([key, value]) => `${key}: ${value}`)).flat().join('\n');
    }

    const fillPrompt = (promptTemp) => {
        let filledPrompt = promptTemp;
        Object.keys(formValues).forEach(key => {
            filledPrompt = filledPrompt.replace(`[${key}]`, getReplacementValue(key));
        });
        if (filledPrompt.includes('[selectedResearchDimensions]')) {
            filledPrompt = filledPrompt.replace('[selectedResearchDimensions]', getReplacementForResearchDimensions(selectedDimensions));
        }
        if (filledPrompt.includes('[selectedResearchDimensionsMap]')) {
            filledPrompt = filledPrompt.replace('[selectedResearchDimensionsMap]', getReplacementForResearchDimensionsMap(selectedDimensions));
        }
        if (filledPrompt.includes('[contextListAsSingleText]')) {
            filledPrompt = filledPrompt.replace('[contextListAsSingleText]', formValues['contextList'].map(item => item.context).join('\n'));
        }
        if (filledPrompt.includes('[selectedResearchDimensionsMapForQuery]')) {
            filledPrompt = filledPrompt.replace('[selectedResearchDimensionsMapForQuery]', getReplacementForResearchDimensionsMap([...andSelectedDimensions, ...orSelectedDimensions, ...notSelectedDimensions]));
        }
        if (filledPrompt.includes('[andSelectedResearchDimensions]')) {
            filledPrompt = filledPrompt.replace('[andSelectedResearchDimensions]', getReplacementForResearchDimensions(andSelectedDimensions));
        }
        if (filledPrompt.includes('[orSelectedResearchDimensions]')) {
            filledPrompt = filledPrompt.replace('[orSelectedResearchDimensions]', getReplacementForResearchDimensions(orSelectedDimensions));
        }
        if (filledPrompt.includes('[notSelectedResearchDimensions]')) {
            filledPrompt = filledPrompt.replace('[notSelectedResearchDimensions]', getReplacementForResearchDimensions(notSelectedDimensions));
        }

        return filledPrompt;
    }

    const getPromptTemp = () => {
        let keyName = 'baseTemp';
        prompt.optionalFields.forEach(optionalField => {
            if ((formValues.hasOwnProperty(optionalField) ||
                FILEDS_NOT_IN_FORM.includes(optionalField)) && !isEmptyField(optionalField)) {
                keyName += `_${optionalField}`
            }
        });
        if (hasOptionalFilledSelectedResearchDimensions()){
            keyName += `_selectedResearchDimensions`
        } 
        return prompt[keyName];
    }

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const generatePrompt = () => {
        const promptTemp = getPromptTemp();
        const filledPrompt = fillPrompt(promptTemp);
        copyTextToClipboard(filledPrompt).then(() => {
            setShow(true);
            setTimeout(() => { setShow(false); }, 1500);
        }).catch((err) => { console.log(err); });

        onShowChatBots();

    };

    const isEmptyField = (field) => {
        if (field === 'selectedResearchDimensions') {
            return selectedDimensions.length <= 0;
        }
        if (field === 'andSelectedResearchDimensions') {
            return andSelectedDimensions.length <= 0;
        }
        if (field === 'orSelectedResearchDimensions') {
            return orSelectedDimensions.length <= 0;
        }
        if (field === 'notSelectedResearchDimensions') {
            return notSelectedDimensions.length <= 0;
        }
        else if (Array.isArray(formValues[field])) {
            return !formValues[field] ||
                formValues[field].every((item) => !item.context.trim())
        } else {
            return !formValues[field]
        }
    }

    const isGenerateButtonDisabled = () => {
        const requiredFields = prompt.requiredFields || [];

        const isAnyRequiredFieldMissing = requiredFields
            .some((field) => isEmptyField(field));

        return isAnyRequiredFieldMissing || requiredFields.length === 0;
    };

    return (
        <div id='promptInputForm'>
            {prompt &&
                prompt.inputs &&
                prompt.inputs.map((input) => {
                    if (INPUTS_PROPERTIES[input]) {
                        let inputProps = { ...INPUTS_PROPERTIES[input] }

                        if (inputProps.isContext) {
                            return (
                                <PromptInput
                                    key={input}
                                    inputProp={inputProps}
                                    onChange={(contextList) =>
                                        handleContextChange(input, contextList)
                                    }
                                />
                            );
                        } else {
                            if (input === 'selectedResearchDimensions') {
                                inputProps.value = selectedDimensions.map(item => `${Object.keys(item)[0]}`).join(', ');
                            }
                            if (input === 'andSelectedResearchDimensions') {
                                inputProps.value = andSelectedDimensions.map(item => `${Object.keys(item)[0]}`).join(', ');
                            }
                            if (input === 'orSelectedResearchDimensions') {
                                inputProps.value = orSelectedDimensions.map(item => `${Object.keys(item)[0]}`).join(', ');
                            }
                            if (input === 'notSelectedResearchDimensions') {
                                inputProps.value = notSelectedDimensions.map(item => `${Object.keys(item)[0]}`).join(', ');
                            }
                            return (
                                <PromptInput
                                    key={input}
                                    inputProp={inputProps}
                                    onChange={(inputValue) =>
                                        handleInputChange(input, inputValue)
                                    }
                                />
                            );
                        }
                    }
                })}

            <GeneratePromptBtn
                btnDisable={isGenerateButtonDisabled()}
                showOverlay={show}
                generatePromptHandler={generatePrompt}
            />
            {showChatBots && <Chatbots />}
        </div>
    );
}


export default PromptBuildingForm;
