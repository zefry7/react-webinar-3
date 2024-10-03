import React, { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Sign from "../../components/sign";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import Register from "../../components/register";
import Info from "../../components/info";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    let store = useStore()

    const select = useSelector(state => ({
        token: state.login.token,
        user: state.profile.user
    }));

    const callbacks = {
        getDataUser: useCallback(() => store.actions.profile.getDataUser(), [store]),
        exitAccount: useCallback(() => {
            navigate("/")
            store.actions.login.exitAccount()
        }, [store]),
    };

    const { t } = useTranslate();

    useEffect(() => {
        if(select.token == "") {
            navigate("/login")
        } else {
            callbacks.getDataUser()
        }
    }, [select.token])

    return <PageLayout>
        <Sign token={select.token} username={select.user.username} exitAccount={callbacks.exitAccount} />
        <Head title={t('title')}>
            <LocaleSelect />
        </Head>
        <Navigation />
        <Info user={select.user}/>
    </PageLayout>
}

export default memo(Profile)