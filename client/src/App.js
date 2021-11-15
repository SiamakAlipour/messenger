import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './container/Main';

function App() {
	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/messenger' element={<Main />} />
					<Route index path='/messenger/login' element={<Login />} />
					<Route path='/messenger/register' element={<Register />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
