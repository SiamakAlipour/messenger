import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './container/Main';
import ContactItem from './components/ContactItem';

function App() {
	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route path='/' element={<Main />}>
						<Route path={`/:user`} />
					</Route>
					<Route path='/account/login' element={<Login />} />
					<Route path='/account/register' element={<Register />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
