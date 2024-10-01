<<<<<<< HEAD
import React, { memo, useEffect, useState } from "react";
import "./style.css"

function Pagination({ page, changePage, maxPage }) {
    let [mass, setMass] = useState(["1", "2", "3", "...", `${maxPage}`])

    useEffect(() => {
        switch (page) {
            case 1:
            case 2: {
                setMass(["1", "2", "3", "...", `${maxPage}`])
                break
            }
            case 3: {
                setMass(["1", "2", "3", "4", "...", `${maxPage}`])
                break
            }
            case maxPage:
            case (maxPage - 1): {
                setMass(["1", "...", `${maxPage - 2}`, `${maxPage - 1}`, `${maxPage}`])
                break
            }
            case (maxPage - 2): {
                setMass(["1", "...", `${maxPage - 3}`, `${maxPage - 2}`, `${maxPage - 1}`, `${maxPage}`])
                break
            }
            default: {
                setMass(["1", "...", `${page - 1}`, `${page}`, `${page + 1}`, "...", `${maxPage}`])
                break
            }
        }
    }, [page, maxPage])

    return <div className="Pagination">
        <div className="Pagination-content">
            {mass.map((v, i) => {
                if (v == "...") {
                    return <div className="Pagination-threeDots" key={i}>{v}</div>
                }
                if (v == page) {
                    return <div className="Pagination-number Pagination-number_active" key={i}>{v}</div>
                }
                return <div className="Pagination-number" onClick={() => changePage(Number(v))} key={i}>{v}</div>
            })}
        </div>
    </div>
}


export default memo(Pagination)
=======
import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  // Количество страниц
  const length = Math.ceil(props.count / Math.max(props.limit, 1));

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(props.page - props.indent, 1);
  let right = Math.min(left + props.indent * 2, length);
  // Корректировка когда страница в конце
  left = Math.max(right - props.indent * 2, 1);

  // Массив номеров, чтобы удобней рендерить
  let items = [];
  // Первая страница всегда нужна
  if (left > 1) items.push(1);
  // Пропуск
  if (left > 2) items.push(null);
  // Последовательность страниц
  for (let page = left; page <= right; page++) items.push(page);
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
          className={cn('item', { active: number === props.page, split: !number })}
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

Pagination.defaultProps = {
  page: 1,
  limit: 10,
  count: 1000,
  indent: 1,
};

export default memo(Pagination);
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
