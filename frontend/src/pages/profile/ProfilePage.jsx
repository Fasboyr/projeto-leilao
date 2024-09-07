import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useTranslation } from 'react-i18next';

// Função para aplicar máscara de CPF
const applyCpfMask = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
};

// Função para aplicar máscara de RG
const applyRgMask = (value) => {
    return value
        .replace(/\D/g, '') 
        .replace(/(\d{2})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
};

// Função para aplicar máscara de CEP
const applyCepMask = (value) => {
    return value
        .replace(/\D/g, '') 
        .replace(/(\d{5})(\d{1,3})/, '$1-$2'); 
};

// Função para buscar endereço pelo CEP
const fetchAddressByCep = (cep) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
        return axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`)
            .then(response => {
                const data = response.data;
                if (!data.erro) {
                    return {
                        street: data.logradouro,
                        city: data.localidade,
                        state: data.uf,
                        postalCode: data.cep
                    };
                } else {
                    throw new Error('CEP não encontrado');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o endereço:', error);
                throw error;
            });
    }
};

// Componente principal
const ProfilePage = () => {
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [nome, setNome] = useState('');
    const [rg, setRg] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchAddress);
        } else {
            alert('Geolocalização não é suportada pelo seu navegador.');
        }
    }, []);

    useEffect(() => {
        if (cep.length === 9) {
            fetchAddressByCep(cep)
                .then(address => {
                    setRua(address.street);
                    setCidade(address.city);
                    setEstado(address.state);
                    setCep(address.postalCode);
                })
                .catch(error => {
                    console.error('Erro ao buscar o endereço pelo CEP:', error);
                });
        }
    }, [cep]);

    const fetchAddress = (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'AIzaSyDb91kEPlWY6mfZPoafAdortn9UKSucb1U';
    
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                latlng: `${latitude},${longitude}`,
                key: apiKey
            }
        })
        .then(response => {
            const result = response.data.results[0];
            if (result) {
                const addressComponents = result.address_components;
                const newAddress = {
                    street: addressComponents.find(c => c.types.includes('route'))?.long_name || '',
                    city: addressComponents.find(c => c.types.includes('locality') || c.types.includes('administrative_area_level_2'))?.long_name || '',
                    state: addressComponents.find(c => c.types.includes('administrative_area_level_1'))?.short_name || '',
                    postalCode: addressComponents.find(c => c.types.includes('postal_code'))?.long_name || ''
                };
                setRua(newAddress.street);
                setCidade(newAddress.city);
                setEstado(newAddress.state);
                setCep(newAddress.postalCode);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o endereço pela geolocalização:', error);
        });
    };

    // Validação do CPF
    const validateCpf = (cpf) => {
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) {
            return false;
        }
        return true;
    };


    const onCpfChange = (e) => {
        let value = applyCpfMask(e.target.value);
        setCpf(value);

        const cleanCpf = value.replace(/\D/g, '');
        if (cleanCpf.length === 11) {
            if (!validateCpf(cleanCpf)) {
                setCpfError('CPF inválido.');
            } else {
                setCpfError('');
            }
        } else {
            setCpfError('');
        }
    };

  
    const onRgChange = (e) => {
        let value = applyRgMask(e.target.value);
        setRg(value);
    };

   
    const onCepChange = (e) => {
        let value = applyCepMask(e.target.value);
        setCep(value);
    };

    return (
        <div className={styles.profileGrid}>
            <Card className={styles.card} title={t('profile.title')}>
                <div className={styles.fieldGroup}>
                    <div className={styles.field}>
                        <label htmlFor="nome">{t('profile.name')}</label>
                        <InputText id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder={t('profile.nameInput')} />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="cpf">{t('profile.cpf')}</label>
                        <InputText
                            id="cpf"
                            value={cpf}
                            onChange={onCpfChange}
                            placeholder={t('profile.cpf')}
                            maxLength={14} // Limita a entrada com máscara a 14 caracteres (formato: 000.000.000-00)
                        />
                        {cpfError && <Message severity="error" text={cpfError} />}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="rg">{t('profile.rg')}</label>
                        <InputText
                            id="rg"
                            value={rg}
                            onChange={onRgChange}
                            placeholder={t('profile.rg')}
                            maxLength={12} // Limita a entrada com máscara a 12 caracteres (formato: 00.000.000-0)
                        />
                    </div>
                </div>

                <div className={styles.fieldGroup}>
                    <div className={styles.field}>
                        <label htmlFor="cep">{t('profile.cep')}</label>
                        <InputText
                            id="cep"
                            value={cep}
                            onChange={onCepChange}
                            placeholder={t('profile.cep')}
                            maxLength={9} // Limita a entrada com máscara a 9 caracteres (formato: 00000-000)
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="rua">{t('profile.road')}</label>
                        <InputText id="rua" value={rua} onChange={(e) => setRua(e.target.value)} placeholder={t('profile.road')} />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="cidade">{t('profile.city')}</label>
                        <InputText id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder={t('profile.city')} />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="estado">{t('profile.state')}</label>
                        <InputText id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder={t('profile.state')} />
                    </div>
                </div>

                <div className={styles.profileOptions}>
                    <Button label={t('cancel')} className={styles.profileButtons}/>
                    <Button label={t('profile.save')} className={styles.profileButtons}/>
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;
