import React from 'react';

type Props = {
	hideAltModal: boolean
	toggleAltModal: any
	children:any
	zFocus?: number
	modalOverlayBG?: string
	modalOverlayOpactiy?: number
}

const AltModal = ({ hideAltModal, toggleAltModal, children, zFocus=40, modalOverlayBG="gray-500", modalOverlayOpactiy=80 }: Props) => {
	if (hideAltModal) return null;
	let modalOverlay = "fixed top-0 left-0 w-full h-full opacity-" + modalOverlayOpactiy + " bg-" + modalOverlayBG

	let modalWrap = "fixed top-0 left-0 w-full h-full pointer-events-none z-" + zFocus

	let modalView = "absolute top-1/2 left-1/2 bg-white overflow-auto h-auto min-h-15rem max-h-95 transform -translate-y-1/2 -translate-x-1/2 max-w-2xl w-10/12 rounded pointer-events-auto"


	return (
		<>
			<div className={modalOverlay} onClick={() => toggleAltModal()} />,
			<div className={modalWrap}>
				<div className={modalView}>
					{children}
				</div>
			</div>
		</>
  	);
}

export default AltModal;