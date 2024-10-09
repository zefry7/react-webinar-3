import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const { page = 1, limit = 10, count = 1000, indent = 1 } = props;
  // Количество страниц
  const length = Math.ceil(count / Math.max(limit, 1));

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(props.page - indent, 1);
  let right = Math.min(left + indent * 2, length);
  // Корректировка когда страница в конце
  left = Math.max(right - indent * 2, 1);

  // Массив номеров, чтобы удобней рендерить
  let items = [];
  // Первая страница всегда нужна
  if (left > 1) items.push(1);
  // Пропуск
  if (left > 2) items.push(null);
  // Последовательность страниц
  for (let pageNumber = left; pageNumber <= right; pageNumber++) items.push(pageNumber);
  // Пропуск
  if (right < length - 1) items.push(null);
  // Последняя страница
  if (right < length) items.push(length);

  const onClickHandler = number => e => {
    if (props.onChange && number) {
      e.preventDefault();
      props.onChange(number);
    }
  };

  const cn = bem('Pagination');
  return (
    <ul className={cn()}>
      {items.map((number, index) => (
        <li
          key={index}
          className={cn('item', { active: number === page, split: !number })}
          onClick={onClickHandler(number)}
        >
          {number ? props.makeLink ? <a href={props.makeLink(number)}>{number}</a> : number : '...'}
        </li>
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number,
  indent: PropTypes.number,
  onChange: PropTypes.func,
  makeLink: PropTypes.func,
};

export default memo(Pagination);
