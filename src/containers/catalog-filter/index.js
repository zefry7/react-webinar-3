import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    categoryList: state.category.categoryList,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Категория
    onCategory: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
  };

  useEffect(() => {

    const fetchCategory = async () => {
      const respone = await fetch("/api/v1/categories?fields=_id,title,parent(_id)&limit=*")
      const json = await respone.json()

      let res = []
      let arr = []
      let map = new Map()

      for (const x of json.result.items) {
        map.set(x._id, { title: x.title, parent: x.parent?._id || null })
      }

      for (const x of json.result.items) {
        if (map.get(x._id).parent != null) {
          arr.push([{ title: map.get(map.get(x._id).parent).title, id: map.get(x._id).parent }, { title: x.title, id: x._id }])
        } else {
          arr.push([null, { title: x.title, id: x._id }])
        }
      }

      function ttt(value, line) {
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i][0]?.title == value.title) {
            ttt(arr[i][1], line + "- ")
          }
        }
        res.push({ title: line + "" + value.title, value: value.id })
      }

      for (let i = 0; i < arr.length; ++i) {
        if (arr[i][0] == null) {
          ttt(arr[i][1], "")
        }
      }

      res.reverse()

      store.actions.category.setCategoryList(res)
    }

    fetchCategory()
  }, [])

  return (
    <SideLayout padding="medium">
      <Select options={select.categoryList} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
