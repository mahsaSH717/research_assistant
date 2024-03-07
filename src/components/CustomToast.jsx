import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
export default function CustomToast({ showToast, header, message, onClose }) {

    return (
        <ToastContainer
            className="p-3"
            position={'bottom-end'}
            style={{ zIndex: 1 }}
        >
            <Toast
                style={{ backgroundColor: '#96858f' }}
                onClose={onClose}
                show={showToast}
                delay={2000}
                autohide>
                <Toast.Header>
                    <strong className="me-auto">{header}</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>);
}