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
					<h2>ali_aziz</h2>
				</div>
			</div>
			<div className='chat__content'>
				{/* chat part */}
				<div className='chat__contentPart'>
					<div class='msg'>
						<div class='bubble alt'>
							<div class='txt'>
								<div className='txt__wrap'>
									<span class='name alt'>Siamak</span>
									<span class='timestamp'>10:22 pm</span>
								</div>

								<p class='message'>سلام علی نجسن</p>
							</div>
							<div class='bubble-arrow alt'></div>
						</div>
					</div>
					<div class='msg'>
						<div class='bubble'>
							<div class='txt'>
								<div className='txt__wrap'>
									<span class='name'>ali_aziz</span>
									<span class='timestamp'>10:25 pm</span>
								</div>
								<span class='message'>
									سلام بالا هارداسان گه گداخ گیمه سورا ایش
									گوراخ{' '}
								</span>
							</div>
							<div class='bubble-arrow'></div>
						</div>
					</div>
				</div>
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
