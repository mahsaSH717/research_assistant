import "@fontsource/open-sans";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import PromptCard from "./components/PromptCard";
import { useState } from 'react';
import PromptBuildingArea from './components/PromptBuildingArea';
import ResearchTable from "./components/ResearchTable";
import ResearchDimensionsContainer from './components/ResearchDimensionsContainer';
import CustomToast from './components/CustomToast';
import ResultAreaHeader from "./components/ResultAreaHeader";


function App() {

    const [leftWidth, setLeftWidth] = useState(350);

    const [showPromptPopup, setShowPromptPopup] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState({});

    const [showChatBots, setShowChatBots] = useState(false);

    const [showRDInfoChangeToast, setShowRDInfoChangeToast] = useState(false);
    const [dataCreationToast, setDataCreationToast] = useState(false);

    const [mainTableData, setMainTableData] = useState();
    const [definitionsData, setDefinitionsData] = useState();
    const [selectedResearchDimensions, setSelectedResearchDimensions] = useState([]);
    const [andSelectedResearchDimensions, setAndSelectedResearchDimensions] = useState([]);
    const [orSelectedResearchDimensions, setOrSelectedResearchDimensions] = useState([]);
    const [notSelectedResearchDimensions, setNotSelectedResearchDimensions] = useState([]);


    const [mainTableText, setMainTableText] = useState('');
    const [definitionsText, setDefinitionsText] = useState('');

    const handleMainTableTextChange = (event) => {
        setMainTableText(event.target.value);
    }
    const handleDefinitionsTextChange = (event) => {
        setDefinitionsText(event.target.value);
    }


    const handleRDInfoChangeToastClose = () => {
        setShowRDInfoChangeToast(false);
    }
    const handleDataCreationToastClose = () => {
        setDataCreationToast(false);
    }
    const handleSelectResearchDimension = (name, description, isSelected, selectedFor) => {

        if (selectedFor === 'general') {
            setSelectedResearchDimensions((prevSelection) => {
                if (isSelected) {
                    return [...prevSelection, { [name]: description }];
                }
                else {
                    const updatedSelection = prevSelection.filter(
                        (dimension) => Object.keys(dimension)[0] !== name
                    );
                    return updatedSelection;

                }
            });
        }
        if (selectedFor === 'and') {
            setAndSelectedResearchDimensions((prevSelection) => {
                if (isSelected) {
                    return [...prevSelection, { [name]: description }];
                }
                else {
                    const updatedSelection = prevSelection.filter(
                        (dimension) => Object.keys(dimension)[0] !== name
                    );
                    return updatedSelection;

                }
            });
        }
        if (selectedFor === 'or') {
            setOrSelectedResearchDimensions((prevSelection) => {
                if (isSelected) {
                    return [...prevSelection, { [name]: description }];
                }
                else {
                    const updatedSelection = prevSelection.filter(
                        (dimension) => Object.keys(dimension)[0] !== name
                    );
                    return updatedSelection;

                }
            });
        }
        if (selectedFor === 'not') {
            setNotSelectedResearchDimensions((prevSelection) => {
                if (isSelected) {
                    return [...prevSelection, { [name]: description }];
                }
                else {
                    const updatedSelection = prevSelection.filter(
                        (dimension) => Object.keys(dimension)[0] !== name
                    );
                    return updatedSelection;

                }
            });
        }
    };

    const promptSelectionHandler = prompt => {
        setShowChatBots(false);
        setSelectedPrompt(prompt);
    }

    const showPromptListHandler = () => {
        setShowPromptPopup(true);
    }

    const closePopupHandler = () => { setShowPromptPopup(false); }

    const handleMouseMove = (e) => { setLeftWidth(e.clientX); }

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const generateDefinitionsData = (optionalDefinitionsText) => {
        const defRows = optionalDefinitionsText.split('\n');
        const defData = defRows.slice(1).map(row => row.split('\t'));
        return defData.reduce((acc, row) => {
            acc[String(row[0])] = row[1];
            return acc;
        }, {});
    }

    const expandDefinitions = (initialDefenitions, optionalDefinitionsText) => {
        if (initialDefenitions.length <= 0) {
            return generateDefinitionsData(optionalDefinitionsText);
        }
        else {
            const result = { ...initialDefenitions };
            const definitions = generateDefinitionsData(optionalDefinitionsText);
            Object.keys(result).forEach(key => {
                if (definitions.hasOwnProperty(key)) {
                    result[key] = definitions[key];
                }
            });
            return result;
        }
    }

    const generateMainTabledata = (mainTableText) => {

        const mainTableRows = mainTableText.split('\n');
        const mainTableHeader = mainTableRows[0].split('\t');
        const mainTableData = mainTableRows.slice(1).map(row => row.split('\t'));
        const contexts = mainTableHeader.slice(1);
        const dimensions = mainTableData.map(row => ({
            name: row[0],
            values: row.slice(1).map((value, index) => ({ context: contexts[index], value })),
        }));
        const jsonData = dimensions.map(dimension => ({
            dimension: dimension.name,
            values: dimension.values.map(item => ({ context: item.context, value: item.value })),
        }));
        const initialDefinitions = {};
        dimensions.forEach((dimension) => { initialDefinitions[dimension.name] = ''; });
        return [jsonData, initialDefinitions];
    }

    const handleGenerateResult = () => {

        if (selectedPrompt.nextStepFeilds === 'mainText'
            && mainTableText) {
            const [mainTableData, initialDefinitions] = generateMainTabledata(mainTableText);
            let definitions = initialDefinitions;
            if (definitionsText) {
                definitions = expandDefinitions(initialDefinitions, definitionsText);
            }
            setMainTableData(mainTableData);
            setDefinitionsData(definitions);
        }

        if (
            selectedPrompt.type === 'primary'
            && selectedPrompt.nextStepFeilds === 'definitionsText'
            && definitionsText) {

            const definitions = expandDefinitions([], definitionsText);
            setMainTableData();

            setDefinitionsData(definitions);
        }
        if (selectedPrompt.type === 'dependent'
            && selectedPrompt.nextStepFeilds === 'definitionsText'
            && definitionsData) {
            const definitions = expandDefinitions(definitionsData, definitionsText);
            setDefinitionsData(definitions);
        }
        setDataCreationToast(true);


    }

    const handleChangeResearchDimensionInfo = (prevKey, rdName, rdDesc) => {
        setDefinitionsData((prevDefinitions) => {
            const newDefinitions = { ...prevDefinitions, [rdName]: rdDesc };
            if (prevKey !== rdName) {
                delete newDefinitions[prevKey];
            }
            return newDefinitions;
        });

        if (mainTableData) {
            setMainTableData((prevMainTableData) => {
                const newtest = JSON.parse(JSON.stringify(prevMainTableData));
                newtest.forEach(obj => {
                    if (obj.dimension === prevKey) {
                        obj.dimension = rdName;
                    }
                });
                return newtest;
            });
        }
        setShowRDInfoChangeToast(true);
    }

    const handleClearData = () => {
        setMainTableText('');
        setDefinitionsText('');
        setDefinitionsData();
        setMainTableData();
        setSelectedResearchDimensions([]);
        setAndSelectedResearchDimensions([]);
        setOrSelectedResearchDimensions([]);
        setNotSelectedResearchDimensions([]);
    }

    const handleUpdateTableData = (updatedData) => {
        setMainTableData(updatedData);
    }
    const handleAddingDimension = (newDimensionName) => {
        setDefinitionsData((prevDefinitions) => ({ ...prevDefinitions, [newDimensionName]: '' }));
    }

    const handleDeleteDimension = (dimensionName) => {

        setMainTableData((prevMainTableData) => {
            if (prevMainTableData) {
                const updatedMainTableData = prevMainTableData.filter(
                    (dimension) => dimension.dimension !== dimensionName
                );
                return updatedMainTableData;
            }
        });

        setDefinitionsData((prevDefinitions) => {
            const updatedDefinitions = { ...prevDefinitions };
            delete updatedDefinitions[dimensionName];
            return updatedDefinitions;
        });

    }

    return (
        <div className='body'>
            <PromptCard onClosePopup={closePopupHandler} onPromptSelection={promptSelectionHandler}
                show={showPromptPopup} definitions={definitionsData} selectedPrompt={selectedPrompt} />
            <div className='main' >
                <div className="leftSide" style={{ flex: `0 0 ${leftWidth}px` }}>
                    <PromptBuildingArea
                        prompt={selectedPrompt}
                        showChatBots={showChatBots}
                        selectedDimensions={selectedResearchDimensions}
                        andSelectedDimensions={andSelectedResearchDimensions}
                        orSelectedDimensions={orSelectedResearchDimensions}
                        notSelectedDimensions={notSelectedResearchDimensions}
                        disableClearDataBtn={!definitionsData}
                        mainTableText={mainTableText}
                        definitionsText={definitionsText}
                        onMainTableTextChange={handleMainTableTextChange}
                        onDefinitionsTextChange={handleDefinitionsTextChange}
                        onShowPromptList={showPromptListHandler}
                        onShowChatBots={() => { setShowChatBots(true); }}
                        onGenerateTable={handleGenerateResult}
                        onClearData={handleClearData} />
                </div>
                <div className="splitterContainer" onMouseDown={handleMouseDown}>
                </div>
                <div className="rightSide">

                    <CustomToast
                        id='rdInfoChangeToast'
                        showToast={showRDInfoChangeToast}
                        header="Success Message"
                        message="Reaserch dimension information changed!"
                        onClose={handleRDInfoChangeToastClose} />

                    <CustomToast
                        id='dataCreationToast'
                        showToast={dataCreationToast}
                        header="Success Message"
                        message="New data added!"
                        onClose={handleDataCreationToastClose} />

                    {mainTableData &&
                        <>
                            <ResultAreaHeader
                                title="Comparison Table"
                                mainTableData={mainTableData}
                                definitionsData={definitionsData}
                                isMainHeader={true} />
                            <ResearchTable
                                mainTableData={mainTableData}
                                onUpdateTableData={handleUpdateTableData}
                                onUpdateDimensions={handleAddingDimension}
                            />
                            <ResultAreaHeader
                                title="Dimensions And Definitions"
                                isMainHeader={false} />

                            <ResearchDimensionsContainer
                                prompt={selectedPrompt}
                                definitionsData={definitionsData}
                                onChangeInfo={handleChangeResearchDimensionInfo}
                                onDimensionSelection={handleSelectResearchDimension}
                                onDeleteDimension={handleDeleteDimension}
                            />

                        </>
                    }

                    {!mainTableData && definitionsData &&
                        <>
                            <ResultAreaHeader
                                title="Dimensions And Definitions"
                                mainTableData={mainTableData}
                                definitionsData={definitionsData}
                                isMainHeader={true} />
                            <ResearchDimensionsContainer
                                prompt={selectedPrompt}
                                definitionsData={definitionsData}
                                onChangeInfo={handleChangeResearchDimensionInfo}
                                onDimensionSelection={handleSelectResearchDimension}
                                onDeleteDimension={handleDeleteDimension}

                            />
                        </>
                    }

                </div>
            </div>
        </div>
    );

}

export default App;
