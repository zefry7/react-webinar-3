import { useContext } from 'react';
<<<<<<< HEAD:src/store/use-store.js
import { StoreContext } from './context';
=======
import { StoreContext } from '../store/context';
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1:src/hooks/use-store.js

/**
 * Хук для доступа к объекту хранилища
 * @return {Store}
 */
export default function useStore() {
  return useContext(StoreContext);
}
