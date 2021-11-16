import React, { useState } from 'react';
import './styles/Main.scss';
import { Navigate } from 'react-router-dom';
import Contacts from './Contacts';
import Chat from './Chat';
function Main() {
	const [isLogged, setIsLogged] = useState(true);
	if (!isLogged) {
		return <Navigate to='/messenger/login' />;
	}
	return (
		<div className='main'>
			{/* left part for contacts  */}
			<div className='main__left'>
				<Contacts />
			</div>
			{/* right part for chat room */}
			<div className='main__right'>
				<Chat />
			</div>
		</div>
	);
}

export default Main;
