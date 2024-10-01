import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
<<<<<<< HEAD
import { changeLangText, numberFormat, plural } from '../../utils';
import './style.css';
import NavLine from '../nav-line';

function BasketTool({ sum = 0, amount = 0, onOpen = () => { }, lang = "ru" }) {
  const cn = bem('BasketTool');
  
  return (
    <div className={cn()}>
      <NavLine lang={lang}/>
      <div className={cn('wrapper')}>
        <span className={cn('label')}>{changeLangText(lang, "basketLabel")}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
            : changeLangText(lang, "basketEmpty")}
        </span>
        <button onClick={onOpen}>{changeLangText(lang, "basketButton")}</button>
      </div>
=======
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, onOpen, t }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('basket.inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${t('basket.articles', amount)} / ${numberFormat(sum)} ₽`
          : t('basket.empty')}
      </span>
      <button onClick={onOpen}>{t('basket.open')}</button>
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
<<<<<<< HEAD
=======
  t: PropTypes.func,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  t: text => text,
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
};

export default memo(BasketTool);
