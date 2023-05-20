import useStore from "./use-store";
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import shallowequal from 'shallowequal';

export default function useSelector(selector, desc = '') {
  const store = useStore();

  const [state, setState] = useState(() => selector(store.getState()));

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return store.subscribe(() => {
      const newState = selector(store.getState());
      setState(prevState => {
        const eq = shallowequal(prevState, newState);
        console.log(eq ? `No changes - ${desc}` : `Changes - ${desc}`);
        return eq ? prevState : newState
      });
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return state;
}
