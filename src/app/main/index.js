import {memo} from 'react';
import useStore from "../../store/use-store";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";

function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
