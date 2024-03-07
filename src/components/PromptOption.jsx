import styles from "./PromptOption.module.css"
import Badge from 'react-bootstrap/Badge';

function PromptOption(props) {

    const onPromptSelectionHandler = () => {
        if (props.prompt.type === 'primary') {
            props.onPromptSelection(props.prompt);
        }
        else if (props.prompt.type === 'dependent' && props.definitions) {
            props.onPromptSelection(props.prompt);
        }
    }

    const textDescClass = props.prompt.type === 'dependent' && !props.definitions
        ? styles.text_desc_disabled
        : styles.text_desc;

    const optiocCardClass = props.prompt.type === 'dependent' && !props.definitions
        ? styles.optionCardDisable
        : styles.optionCard;

    const mainDivStyle = props.isCurrentPrompt && props.definitions ?
        `${optiocCardClass} ${styles.currentPrompt}` : props.isDrivedPrompt && props.definitions ? `${optiocCardClass} ${styles.drivedPrompt}` : `${optiocCardClass}`;

    const badgeText= props.isCurrentPrompt && props.definitions ? 'active prompt': props.isDrivedPrompt && props.definitions ? 'continue with': null
    return (
        <div className={mainDivStyle} onClick={onPromptSelectionHandler}>
            <div className={styles.detailDiv}>
                {badgeText && <Badge style={{marginTop:'5px', marginBottom:'2px', padding:'2px', fontSize:'11px', color:'#f4f4f4'}} bg="test">{badgeText}</Badge>}
                <p className={textDescClass}>{props.prompt.description}</p>

               
            </div>
        </div>
    );
}

export default PromptOption;

