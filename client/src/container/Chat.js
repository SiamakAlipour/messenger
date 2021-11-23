import React, { useState } from 'react';
import './styles/Chat.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonIcon from '@mui/icons-material/Person';
import TelegramIcon from '@mui/icons-material/Telegram';
import moment from 'moment';
import Message from '../components/Message';
function Chat() {
	const [chatInput, setChatInput] = useState('');
	const [msgList, setMsgList] = useState([
		{
			name: 'siamak',
			timestamp: moment().format('LT'),
			msg: 'سلام علی نجسن',
			sender: false,
		},
		{
			name: 'ali_aziz',
			timestamp: moment().format('LT'),
			msg: 'سلام یاخچیم',
			sender: true,
		},
	]);
	const handleInput = (e) => {
		setChatInput(e.target.value);
	};
	const handleSend = (e) => {
		e.preventDefault();
		setMsgList([
			...msgList,
			{
				name: 'siamak',
				timestamp: moment().format('LT'),
				msg: chatInput,
				sender: false,
			},
		]);
		setChatInput('');
	};
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
					{msgList.map((list, index) => (
						<Message
							sender={list.sender}
							name={list.name}
							timestamp={list.timestamp}
							msg={list.msg}
							key={index}
						/>
					))}
				</div>
				{/* chat input */}

				<form className='chat__contentInput' onSubmit={handleSend}>
					<input
						type='text'
						className='chat__input'
						value={chatInput}
						onChange={handleInput}
					/>
					<button type='submit'>
						<TelegramIcon />{' '}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Chat;
