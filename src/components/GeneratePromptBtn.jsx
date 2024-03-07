import {useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import styles from "./PromptBuildingArea.module.css"

function GeneratePromptBtn({ btnDisable, generatePromptHandler, showOverlay }) {

  const target = useRef(null);

  return (
    <>
      <Button ref={target} className={styles.btnMain} style={{marginTop:'20px'}}
        variant="secondary" onClick={generatePromptHandler}
        disabled={btnDisable}>Generate Prompt
      </Button>
      <Overlay target={target.current} show={showOverlay} placement="right">
        {(props) => (
          <Tooltip {...props}>
            Prompt Copied To Cilpboard.
          </Tooltip>
        )}
      </Overlay>
    </>

  );
}

export default GeneratePromptBtn;