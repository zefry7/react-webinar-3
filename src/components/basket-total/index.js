import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

<<<<<<< HEAD
function BasketTotal({ sum = 0, textTotal = "Итого" }) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{textTotal}</span>
=======
function BasketTotal({ sum, t }) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t('basket.total')}</span>
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
<<<<<<< HEAD
  textTotal: PropTypes.string
=======
  t: PropTypes.func,
};

BasketTotal.defaultProps = {
  sum: 0,
  t: text => text,
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
};

export default memo(BasketTotal);
