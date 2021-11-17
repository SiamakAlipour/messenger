import React from 'react';
import './styles/Chat.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import TelegramIcon from '@mui/icons-material/Telegram';
function Chat() {
	const handleClick = () => {
		let rightPart = document.getElementById('right');
		let leftPart = document.getElementById('left');
		let backButton = document.getElementById('backButton');
		let chatHeader = document.getElementById('chatHeader');
		// mainPart.style.flexDirection = 'column';
		rightPart.classList.remove('right__click');
		leftPart.classList.remove('left__click');
		backButton.classList.remove('buttonShow');
		chatHeader.classList.remove('show');
	};
	return (
		<div className='chat'>
			<div className='chat__header' id='chatHeader'>
				<div className='chat__headerLeftPart'>
					{/* backToContacts */}
					<ArrowBackIosNewIcon
						id='backButton'
						onClick={handleClick}
					/>

					{/* avatar */}
					<div className='chat__contactAvatar'>
						<PersonIcon />
					</div>
				</div>
				<div className='chat__headerRightPart'>
					<h2>Lorem Ipsum</h2>
				</div>
			</div>
			<div className='chat__content'>
				{/* chat part */}
				<div className='chat__contentPart'></div>
				{/* chat input */}

				<form className='chat__contentInput'>
					<input type='text' className='chat__input' />
					<button
						type='submit'
						onClick={(e) => {
							e.preventDefault();
						}}>
						<TelegramIcon />{' '}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Chat;
