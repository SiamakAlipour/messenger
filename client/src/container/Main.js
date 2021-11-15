import React, { useState } from 'react';
import './styles/Main.scss';
import { Navigate } from 'react-router-dom';
function Main() {
	const [isLogged, setIsLogged] = useState(false);
	if (!isLogged) {
		return <Navigate to='/messenger/login' />;
	}
	return (
		<div className='main'>
			<h1>this main</h1>
		</div>
	);
}

export default Main;
