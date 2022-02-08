import './App.scss'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

import Main from './container/Main'

function App() {
	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route path='/messenger' element={<Main />}>
						<Route path={`/messenger/:user`} />
					</Route>
					<Route path='/messenger/account/login' element={<Login />} />
					<Route path='/messenger/account/register' element={<Register />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
