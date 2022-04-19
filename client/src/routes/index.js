import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../components/App/Login';
import Register from '../components/App/Register';
import Main from '../components/App/Main';
function index() {
	return (
		<Routes>
			<Route path='/messenger' element={<Main />}>
				<Route path={`/messenger/:user`} />
			</Route>
			<Route path='/messenger/account/login' element={<Login />} />
			<Route path='/messenger/account/register' element={<Register />} />
		</Routes>
	);
}

export default index;
