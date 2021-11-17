import React from 'react';
import './styles/ContactItem.scss';
import PersonIcon from '@mui/icons-material/Person';
function ContactItem({ contactName, lastMessage, avatar }) {
	const handleClick = () => {
		let rightPart = document.getElementById('right');
		let leftPart = document.getElementById('left');
		let backButton = document.getElementById('backButton');
		let chatHeader = document.getElementById('chatHeader');
		// mainPart.style.flexDirection = 'column';
		rightPart.classList.add('right__click');
		leftPart.classList.add('left__click');
		backButton.classList.add('buttonShow');
		chatHeader.classList.add('show');
	};
	return (
		<div className='contactItem'>
			<div className='contactItem__avatar'>
				{avatar ? <img src={avatar} alt='' /> : <PersonIcon />}
			</div>
			<div className='contactItem__msg' onClick={handleClick}>
				<h5>{contactName}</h5>
				<p>{lastMessage}</p>
			</div>
		</div>
	);
}

export default ContactItem;
