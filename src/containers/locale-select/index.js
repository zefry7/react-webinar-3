import {memo, useCallback, useMemo} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Select from "../../components/select";
import useTranslate from "../../hooks/use-translate";

function LocaleSelect() {

  const {lang, setLang} = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select onChange={setLang} value={lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
