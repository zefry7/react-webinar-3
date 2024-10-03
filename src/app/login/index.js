import React, { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Sign from "../../components/sign";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import Register from "../../components/register";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const store = useStore();
    const { t } = useTranslate();

    const select = useSelector(state => ({
        token: state.login.token,
        error: state.login.error,
        user: state.profile.user
    }));

    const callbacks = {
        // Удаление из корзины
        registerUser: useCallback((login, password) => store.actions.login.registerUser(login, password), [store]),
        exitAccount: useCallback(() => {
            navigate("/")
            store.actions.login.exitAccount()
        }, [store]),
    };

    useEffect(() => {
        if (select.token != "") {
            navigate("/profile")
        }
    }, [select.token])

    return <PageLayout>
        <Sign token={select.token} username={select.user.username} exitAccount={callbacks.exitAccount} />
        <Head title={t('title')}>
            <LocaleSelect />
        </Head>
        <Navigation />
        <Register onRegister={callbacks.registerUser} error={select.error} />
    </PageLayout>
}

export default memo(Login)