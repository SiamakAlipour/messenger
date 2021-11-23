import React, { useState } from 'react';
import './styles/Main.scss';
import { Navigate } from 'react-router-dom';
import Contacts from './Contacts';
import Chat from './Chat';
import { useParams } from 'react-router-dom';
function Main() {
	let params = useParams();
	const [isLogged] = useState(true);
	if (!isLogged) {
		return <Navigate to='/messenger/login' />;
	}
	return (
		<div className='main' id='main'>
			{/* left part for contacts  */}
			<div className='main__left' id='left'>
				<Contacts />
			</div>
			{/* right part for chat room */}
			<div className='main__right' id='right'>
				{params.user ? <Chat /> : <h1>select a chat to start</h1>}
			</div>
		</div>
	);
}

export default Main;
