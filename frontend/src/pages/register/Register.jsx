import React from "react";
import "./Register.css";

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Register = () => {

    return (

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
                        id="password"
                        className="text-base text-color surface-overlay p-2appearance-none outline-none focus:border-primary w-full"
                        inputClassName="w-full p-2"
                        placeholder="Insira sua senha"
                        feedback={false}
                        toggleMask
                    />
                </div>
                <div className="register-options">
                    <Button label="Cancelar" size="small" />
                    <Button label="Cadastrar" size="small" />
                </div>



            </Card>
        </div>
    );
}
export default Register;
