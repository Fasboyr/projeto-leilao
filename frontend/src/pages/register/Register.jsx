import React, { useState, useRef } from 'react';
import "./Register.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Link } from 'react-router-dom';

const Register = () => {
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const typingTimeoutRef = useRef(null);  // Referência ao timeout para controle de inatividade

    const validatePassword = (value) => {
        const errors = [];

        if (value.length > 0) {
            if (value.length < 6) {
                errors.push("A senha deve ter no mínimo 6 caracteres.");
            }
            else if (!/[A-Z]/.test(value)) {
                errors.push("A senha deve conter pelo menos uma letra maiúscula.");
            }
            else if (!/[a-z]/.test(value)) {
                errors.push("A senha deve conter pelo menos uma letra minúscula.");
            }
            else if (!/[0-9]/.test(value)) {
                errors.push("A senha deve conter pelo menos um número.");
            }
            else if (!/[^A-Za-z0-9]/.test(value)) {
                errors.push("A senha deve conter pelo menos um caractere especial.");
            }

            setErrors(errors);
        }
    };

    const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        if (value.length === 0) {
            typingTimeoutRef.current = setTimeout(() => {
                setErrors([]);
            }, 1000);
        } else {
            typingTimeoutRef.current = setTimeout(() => {
                validatePassword(value);
            }, 1000);  // 1000 ms = 1 segundo
        }
    };
    return (
        <>
           

            <div className="register-grid">
                <Card title="Cadastro">

                    <div class="field">
                        <InputText id="name"
                            type="text"
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            placeholder="Insira seu nome"
                        />
                    </div>

                    <div class="field">
                        <InputText id="email"
                            type="text"
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            placeholder="Insira seu E-mail"
                        />
                    </div>

                    <div className="field">
                        <Password
                            value={password}
                            onChange={onPasswordChange}
                            id="password"
                            className="text-base text-color surface-overlay p-2appearance-none outline-none focus:border-primary w-full"
                            inputClassName="w-full p-2"
                            placeholder="Insira sua senha"
                            feedback={false}
                            toggleMask
                        />
                    </div>

                    <div className="erros">
                        {errors.length > 0 && errors.map((error, index) => (
                            <Message key={index} severity="error" text={error} />
                        ))}
                    </div>

                    <div className="register-options">
                        <Button label="Cancelar" size="small" />
                        <Button label="Cadastrar" size="small" />
                    </div>
                </Card>
            </div>
        </>
    );
}
export default Register;
