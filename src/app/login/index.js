import { memo, useCallback, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Input from '../../components/input';
import Field from '../../components/field';
import SideLayout from '../../components/side-layout';
import TopHead from '../../containers/top-head';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';

function Login() {
  const { t } = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();

  useInit(() => {
    store.actions.session.resetErrors();
  });

  const select = useSelector(state => ({
    waiting: state.session.waiting,
    errors: state.session.errors,
  }));

  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value, name) => {
      setData(prevData => ({ ...prevData, [name]: value }));
    }, []),

    // Отправка данных формы для авторизации
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        store.actions.session.signIn(data, () => {
          // Возврат на страницу, с которой пришли
          const back =
            location.state?.back && location.state?.back !== location.pathname
              ? location.state?.back
              : '/';
          navigate(back);
        });
      },
      [data, location.state],
    ),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout padding="medium">
        <form onSubmit={callbacks.onSubmit}>
          <h2>{t('auth.title')}</h2>
          <Field label={t('auth.login')} error={select.errors?.login}>
            <Input name="login" value={data.login} onChange={callbacks.onChange} />
          </Field>
          <Field label={t('auth.password')} error={select.errors?.password}>
            <Input
              name="password"
              type="password"
              value={data.password}
              onChange={callbacks.onChange}
            />
          </Field>
          <Field error={select.errors?.other} />
          <Field>
            <button type="submit">{t('auth.signIn')}</button>
          </Field>
        </form>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Login);
