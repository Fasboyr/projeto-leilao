import React from "react";
import style from "./Home.module.css";
import Logout from "../../components/logout/logout";
import { useTranslation } from "react-i18next";
import Dashboard from "../../components/dashboard/dashboard";

const Home = () =>{
    const {t, i18n} = useTranslation();

    const changeLanguage = (language) =>{
        i18n.changeLanguage(language);
    }
return(
    <div>
        <Dashboard/>
    </div>
);
}
export default Home;