import React from "react";
import "./RecoverPassword.css"

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const RecoverPassword = () => {

    return (

        <div className="recover-grid">
            <Card title="Recuperar Senha">

                <div class="field">
                    <InputText id="email"
                        type="text"
                        className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        placeholder="Insira seu E-mail"
                    />
                </div>

                <div className="register-options">
                    <Button label="Cancelar" size="small" />
                    <Button label="Recuperar" size="small" />
                </div>



            </Card>
        </div>
    );
}
export default RecoverPassword;
