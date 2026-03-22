import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

const Modal = ({ children, ariaLabel = 'Dialog' }) => {
	const ref = useRef(null);

	useEffect(() => {
		ref.current?.focus();
	}, []);

	return createPortal(
		<div
			className="ModalContents"
			role="dialog"
			aria-modal="true"
			aria-label={ariaLabel}
			tabIndex={-1}
			ref={ref}
		>
			{children}
		</div>,
		document.getElementById('modal_root')
	);
};

export default Modal;
