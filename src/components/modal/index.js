import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ activeModal = false, children }) {

    return <>
        {activeModal == true &&
            <div className='Modal'>
                <div className='Modal-wrapper'>
                    <div className='Modal-content'>
                        {children}
                    </div>
                </div>
            </div>
        }
    </>
}

Modal.propTypes = {
    activeModal: PropTypes.bool,
    children: PropTypes.node,
}

export default React.memo(Modal)