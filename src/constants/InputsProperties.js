const INPUTS_PROPERTIES = {

    'researchProblem': { 'label': 'Research Problem', 'rows': 1, 'placeholder': 'Please enter the research problem', 'isContext': false },
    'singleContext': { 'label': 'Context', 'rows': 3, 'placeholder': 'Please enter the Context', 'isContext': false },
    'comparisonEntities': { 'label': 'Comparison Entities', 'rows': 2, 'placeholder': 'Please enter the comparison entities as a comma separated list', 'isContext': false },
    'researchDimensions': { 'label': 'Research Dimensions', 'rows': 2, 'placeholder': 'Please enter the research dimensions as a comma separated list', 'isContext': false },
    'contextList': { 'label': 'Context List', 'isContext': true },
    'selectedResearchDimensions': { 'label': 'Selected Dimensions', 'placeholder': 'Please select dimensions on the screen', 'readOnly': true, 'isContext': false, 'value': '' },
    'maxLengthOfWords': { 'label': 'Maximum Length', 'rows': 1, 'placeholder': 'Please enter the maximum length in words', 'isContext': false },

    'andSelectedResearchDimensions': { 'label': 'Selected Dimensions For "AND" Operation', 'placeholder': 'Please select dimensions on the screen', 'readOnly': true, 'isContext': false, 'value': '' },
    'orSelectedResearchDimensions': { 'label': 'Selected Dimensions For "OR" Operation', 'placeholder': 'Please select dimensions on the screen', 'readOnly': true, 'isContext': false, 'value': '' },
    'notSelectedResearchDimensions': { 'label': 'Selected Dimensions For "NOT" Operation', 'placeholder': 'Please select dimensions on the screen', 'readOnly': true, 'isContext': false, 'value': '' },
    'projectCallObjectives': { 'label': 'Project Call Objective', 'rows': 3, 'placeholder': 'Please enter the project call objective', 'isContext': false },

}

export default INPUTS_PROPERTIES;