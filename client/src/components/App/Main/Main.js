import React, { useState, useEffect } from 'react';
import './Main.scss';
import { Navigate } from 'react-router-dom';
import Contacts from '../../../container/Contacts';
import Chat from '../../../container/Chat';
import { useParams } from 'react-router-dom';
function Main() {
	let params = useParams();
	const user = JSON.parse(localStorage.getItem('user'));

	// if (!user) {
	// 	return <Navigate to='/messenger/account/login' />;
	// }

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
