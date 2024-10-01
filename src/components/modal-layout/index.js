import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

<<<<<<< HEAD
function ModalLayout({ title = 'Модалка', onClose = () => {}, textButton, children }) {
=======
function ModalLayout(props) {
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
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
<<<<<<< HEAD
    return () => {
=======
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cn()} ref={layout}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
<<<<<<< HEAD
          <h1 className={cn('title')}>{title}</h1>
          <button className={cn('close')} onClick={onClose}>
            {textButton}
          </button>
        </div>
        <div className={cn('content')}>{children}</div>
=======
          <h1 className={cn('title')}>{props.title}</h1>
          <button className={cn('close')} onClick={props.onClose}>
            {props.labelClose}
          </button>
        </div>
        <div className={cn('content')}>{props.children}</div>
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
<<<<<<< HEAD
  textButton: PropTypes.string,
  children: PropTypes.node,
=======
  children: PropTypes.node,
  labelClose: PropTypes.string,
};

ModalLayout.defaultProps = {
  title: 'Модалка',
  labelClose: 'Закрыть',
  onClose: () => {},
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
};

export default memo(ModalLayout);
