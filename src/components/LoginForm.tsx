import { FC, useContext, useState } from "react";
import request from "../helpers/request";
import Modal from "../Modal/Modal";
import { StoreContext } from './../store/StoreProvider';


interface LoginFormProps {
    handleOnClose: () => void;
    isModalOpen: boolean;
}
 
const LoginForm: FC<LoginFormProps> = ({ handleOnClose, isModalOpen }) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validateMessage, setValidateMessage] = useState<string>('');
    const dataContext = useContext(StoreContext);

    const validateMessageComponent = validateMessage.length 
        ? <p className="login-form__validate-message">{validateMessage}</p>
        : null

    const handleOnChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }
    const handleOnChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleOnCloseModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        handleOnClose()
    }

    const resetStateOfInputs = () => {
        setLogin("");
        setPassword("");
        setValidateMessage("");
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const { data, status } = await request.post('/users', { login, password });

        if(status === 200) {
            dataContext!.setUser(data.user);
            resetStateOfInputs();
            handleOnClose();
        } else {
            setValidateMessage(data.message);
        }
    }

    return (
        <Modal 
            handleOnClose={handleOnClose}
            isOpen={isModalOpen}
            shouldBeCloseOnOutsideClick={true}
        >
            <>
                {validateMessage}
                <form className="login-form" method="post" onSubmit={(event) => handleOnSubmit(event)}>
                    <div className="login-form__row">
                        <label>
                            Login:
                            <input 
                                type="text" 
                                value={login} 
                                onChange={handleOnChangeLogin} 
                            />
                        </label>
                    </div>
                    <div className="login-form__row">
                    <label>
                            Hasło:
                            <input 
                                type="password" 
                                value={password} 
                                onChange={handleOnChangePassword}
                            />
                        </label>
                    </div>
                    <div className="login-form__row">
                        <button type="submit">Zaloguj</button>
                        <button type="button" onClick={handleOnCloseModal}>Anuluj</button>
                    </div>
                </form>
            </>
        </Modal>
    );
}
 
export default LoginForm;