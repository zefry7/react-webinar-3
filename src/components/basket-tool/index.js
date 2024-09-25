import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
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
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
