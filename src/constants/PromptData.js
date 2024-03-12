const PROMPT_TEMP = {
    '1': {
        activatePrompts:['5','6','8','9','12'],
        nextStepFeilds:'definitionsText',
        type: "primary",
        description: "Get research dimensions for a research problem",
        inputs: ["researchProblem", "contextList"],
        requiredFields: ["researchProblem"],
        optionalFields: ["contextList"],
        baseTemp: `Can you provide a list of research dimensions relevant to the "[researchProblem]" research problem? Provide your response as a Table with 2 columns: the first column contains the research dimension name and the second column contains the dimension description. Note the research dimension name must be a short phrase between 1 to 3 tokens.`,
        baseTemp_contextList: `Can you provide a list of research dimensions relevant to the "[researchProblem]" research problem from the provided Context below? Provide your response as a Table with 2 columns: the first column contains the research dimension name and the second column contains the dimension description. Note the research dimension name must be a short phrase between 1 to 3 tokens.\n[contextList]`
    },
    '2': {
        activatePrompts:['5','6','8','9'],
        nextStepFeilds:'mainText',
        type: "primary",
        description: "Compare entities for a research problem",
        inputs: ["researchProblem", "comparisonEntities"],
        requiredFields: ["researchProblem", "comparisonEntities"],
        optionalFields: [],
        baseTemp: `Generate a research-dimension-and-value-based Comparison relevant to the "[researchProblem]" research problem for the given entities to be compared: "[comparisonEntities]". Provide your response as a Table: the first column contains the dimension name and the subsequent columns contain the dimension value for the respective comparison entities. Also create another Table with 2 columns: the first column contains the research dimension name and the second column contains the dimension description. Note the research dimension name must be a short phrase between 1 to 3 tokens.`,
    },
    '3': {
        activatePrompts:['5','6','8','9'],
        nextStepFeilds:'mainText',
        type: "primary",
        description: "Compare research from scientific contexts",
        inputs: ["researchProblem", "contextList"],
        requiredFields: ["researchProblem", "contextList"],
        optionalFields: [],
        baseTemp: `Generate a research-dimension-and-value-based Comparison relevant to the "[researchProblem]" research problem from the provided Contexts below. Provide your response as a Table: the first column contains the dimension name and the subsequent columns contain the dimension value for the respective Contexts. \n[contextList]\nAlso create another Table with 2 columns: the first column contains the research dimension name and the second column contains the dimension description.Note the research dimension name must be a short phrase between 1 to 3 tokens.`,

    },
    '4': {
        activatePrompts:['5','6','8','9'],
        nextStepFeilds:'mainText',
        type: "primary",
        description: "Compare scientific contexts based on research dimensions",
        inputs: ["researchProblem", "researchDimensions", "contextList"],
        requiredFields: ["researchProblem", "researchDimensions", "contextList"],
        optionalFields: [],
        baseTemp: `Extract values for the given research dimensions relevant to the "[researchProblem]" research problem from the provided Contexts below. Provide your response as a Table: the first column contains the dimension name and the subsequent columns contain the dimension value for the respective Contexts. \nResearch dimensions: [researchDimensions]\n[contextList]\nAlso create another Table with 2 columns: the first column contains the research dimension name and the second column contains the dimension description.`,

    },
    '5': {
        activatePrompts:['1','6','8','9'],
        nextStepFeilds:'definitionsText',
        type: "dependent",
        description: "Create definitions for selected research dimensions",
        inputs: ["researchProblem","selectedResearchDimensions", "contextList"],
        requiredFields: ["researchProblem","selectedResearchDimensions"],
        optionalFields: ["contextList"],
        baseTemp: `Create a table having 2 columns with respect to the "[researchProblem]" research problem: the first column contains the name of the research dimension and the second column contains an elaborate definition for the respective dimension. Use the following research dimensions: [selectedResearchDimensions]`,
        baseTemp_contextList: `Use the context of\n[contextList]\nCreate a table having 2 columns with respect to the "[researchProblem]" research problem: the first column contains the name of the research dimension and the second column contains an elaborate definition for the respective dimension. Use the following research dimensions: [selectedResearchDimensions]`

    },

    '6': {
        activatePrompts:['1','5','8','9'],
        nextStepFeilds:'none',
        type: "dependent",
        description: "Write a blog about selected research dimensions",
        inputs: ["researchProblem","selectedResearchDimensions","maxLengthOfWords","contextList"],
        requiredFields: ["researchProblem","selectedResearchDimensions"],
        optionalFields: ["maxLengthOfWords","contextList"],
        baseTemp: `Write a blog post focused on the research problem related to "[researchProblem]," using only the provided defined research dimensions which are the keys in the following dictionary:\n[selectedResearchDimensionsMap]`,
        baseTemp_maxLengthOfWords: `Write a blog post (of up to [maxLengthOfWords] words), focused on the research problem related to "[researchProblem]". using only the provided defined research dimensions which are the keys in the following dictionary:\n[selectedResearchDimensionsMap]`,
        baseTemp_contextList: `Use the context of\n[contextList]\nWrite a blog post focused on the research problem related to "[researchProblem]". using only the provided defined research dimensions which are the keys in the following dictionary:\n[selectedResearchDimensionsMap]`,
        baseTemp_maxLengthOfWords_contextList: `Use the context of\n[contextList]\nWrite a blog post (of up to [maxLengthOfWords] words), focused on the research problem related to "[researchProblem]". using only the provided defined research dimensions which are the keys in the following dictionary:\n[selectedResearchDimensionsMap]`,

    },

    '7': {
        nextStepFeilds:'none',
        type: "primary",
        description: "Write a scientific review from a context",
        inputs: ["researchProblem","selectedResearchDimensions","singleContext"],
        requiredFields: ["researchProblem","singleContext"],
        optionalFields: ["selectedResearchDimensions"],
        baseTemp: `Act as a scientific reviewer. Review the following context:\n"[singleContext]", that aims to address the research problem "[researchProblem]". Does it address the research problem?\nWrite your review of the context based on the following reviewing criteria: [Originality, Impact, Soundness, Clarity, Appropriate amount of work, Reproducibility, Knowledge of the field]`,
        baseTemp_selectedResearchDimensions: `Act as a scientific reviewer.  Review the following context:\n"[singleContext]", that aims to address the research problem "[researchProblem]". Does it address the research problem? Additionally, evaluate the context on the selected research dimensions, which are the keys in the following dictionary:\n[selectedResearchDimensionsMap].\nWrite your review of the context based on the following reviewing criteria: [Originality, Impact, Soundness, Clarity, Appropriate amount of work, Reproducibility, Knowledge of the field]`,
    },


    '8': {
        activatePrompts:['1','5','9'],
        nextStepFeilds:'none',
        type: "dependent",
        description: "Get ideas for research using selected research dimensions",
        inputs: ["researchProblem","selectedResearchDimensions","contextList"],
        requiredFields: ["researchProblem","selectedResearchDimensions"],
        optionalFields: ["contextList"],
        baseTemp: `Generate research directions or propose research ideas informed by the latest advancements in the field related to the research problem "[researchProblem]", using only the specified research dimensions provided as key elements in the following dictionary:\n[selectedResearchDimensionsMap]`,
        baseTemp_contextList: `Use the context of\n[contextList]\nGenerate research directions or propose research ideas informed by the latest advancements in the field related to the research problem "[researchProblem]", using only the specified research dimensions provided as key elements in the following dictionary:\n[selectedResearchDimensionsMap]`,

    },

    '9': {
        activatePrompts:['1','5','8'],
        isMultipleSelect:true,
        nextStepFeilds:'none',
        type: "dependent",
        description: "Get a literature search query based on the selected research dimensions",
        inputs: ["researchProblem","andSelectedResearchDimensions","orSelectedResearchDimensions","notSelectedResearchDimensions"],
        requiredFields: ["researchProblem","andSelectedResearchDimensions"],
        optionalFields: ["orSelectedResearchDimensions","notSelectedResearchDimensions"],
        baseTemp: `Create a Boolean literature search query customized for the "[researchProblem]" research problem, exclusively using the defined research dimensions provided as key elements in the following dictionary: [selectedResearchDimensionsMapForQuery].\nFor each research dimension, enhance the search query by encompassing all its synonyms within the search string, and employ the logical 'AND' operator to connect the query terms.`,
        baseTemp_orSelectedResearchDimensions: `Create a Boolean literature search query customized for the "[researchProblem]" research problem, exclusively using the defined research dimensions provided as key elements in the following dictionary: [selectedResearchDimensionsMapForQuery].\nFor each research dimension, enhance the search query by encompassing all its synonyms within the search string.\nEmploy the logical 'AND' operator to connect [[andSelectedResearchDimensions]] and logical OR operator to connect [[orSelectedResearchDimensions]] in the query`,
        baseTemp_notSelectedResearchDimensions: `Create a Boolean literature search query customized for the "[researchProblem]" research problem, exclusively using the defined research dimensions provided as key elements in the following dictionary: [selectedResearchDimensionsMapForQuery].\nFor each research dimension, enhance the search query by encompassing all its synonyms within the search string.\nEmploy the logical 'AND' operator to connect [[andSelectedResearchDimensions]] and logical NOT to connect [[notSelectedResearchDimensions]] in the query`,
        baseTemp_orSelectedResearchDimensions_notSelectedResearchDimensions: `Create a Boolean literature search query customized for the "[researchProblem]" research problem, exclusively using the defined research dimensions provided as key elements in the following dictionary: [selectedResearchDimensionsMapForQuery].\nFor each research dimension, enhance the search query by encompassing all its synonyms within the search string.\nEmploy the logical 'AND' operator to connect [[andSelectedResearchDimensions]], logical OR operator to connect [[orSelectedResearchDimensions]], and logical NOT to connect [[notSelectedResearchDimensions]] in the query`,

    },

    '10': {
        nextStepFeilds:'none',
        type: "primary",
        description: "Create user stories and accept criteria from scientific contexts",
        inputs: ["contextList"],
        requiredFields: ["contextList"],
        optionalFields: [],
        baseTemp: `Create a table with userstories and acceptance criteria. put it in a table with 2 columns. The first column contains the userstory, and the second column the acceptance criteria for the userstory. Use this text:\n[contextListAsSingleText]`,

    },

    '11': {
        nextStepFeilds:'none',
        type: "primary",
        description: "Write a basic project proposal",
        inputs: ["researchProblem", "projectCallObjectives"],
        requiredFields: ["researchProblem","projectCallObjectives"],
        optionalFields: [],
        baseTemp: `Prepare a comprehensive project proposal consisting of the following sections: Background, Proposed Solution, Planned Work, Work Packages, Budget, and Impact. Formulate the proposal by drawing from your knowledge of the most recent advancements in research related to the "[researchProblem]" research problem. Address the project call objectives, which are outlined as follows: "[projectCallObjectives]"`,

    },

    '12': {
        activatePrompts:['5','6','8','9'],
        nextStepFeilds:'mainText',
        type: "dependent",
        description: "Compare scientific contexts based on existing research dimensions",
        inputs: ["researchProblem", "selectedResearchDimensions", "contextList"],
        requiredFields: ["researchProblem", "selectedResearchDimensions", "contextList"],
        optionalFields: [],
        baseTemp: `Extract values relevant to the "[researchProblem]" research problem from the provided Contexts below based on the given research dimensions provided as key elements in the following dictionary:\n[selectedResearchDimensionsMap].\nProvide your response as a Table: the first column contains the dimension name and the subsequent columns contain the dimension value for the respective Contexts.\n[contextList]\nAlso create another Table with 2 columns: the first column contains the research dimension name and the second column contains the dimension description.`,

    },
    

};


export default PROMPT_TEMP;