import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ title = 'Модалка', onClose = () => {}, textButton, children }) {
  const cn = bem('ModalLayout');

  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef();
  const frame = useRef();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
      layout.current.style.alignItems =
        layout.current.clientHeight < frame.current.clientHeight ? 'flex-start' : 'center';
      layout.current.style.justifyContent =
        layout.current.clientWidth < frame.current.clientWidth ? 'flex-start' : 'center';
    });
    // Следим за изменениями размеров layout
    resizeObserver.observe(layout.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cn()} ref={layout}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{title}</h1>
          <button className={cn('close')} onClick={onClose}>
            {textButton}
          </button>
        </div>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  textButton: PropTypes.string,
  children: PropTypes.node,
};

export default memo(ModalLayout);
