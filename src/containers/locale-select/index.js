import {memo, useCallback, useMemo} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Select from "../../components/select";

function LocaleSelect() {

  const store = useStore();

  const select = useSelector(state => ({
    lang: state.locale.lang
  }));

  const callbacks = {
    setLang: useCallback(lang => store.actions.locale.setLang(lang), [])
  };

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select onChange={callbacks.setLang} value={select.lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
