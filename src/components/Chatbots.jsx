
import Button from 'react-bootstrap/Button';
import styles from './Chatbots.module.css';
function Chatbots(){


    return(
        <div className={styles.links}>
         <Button className={styles.linkBtn} href="https://chat.openai.com/" target="_blank" variant="link" >ChatGPT</Button>
         <Button className={styles.linkBtn} href="https://gemini.google.com/app" target="_blank" variant="link" >Gimini</Button>
        </div>
    );
}

export default Chatbots;