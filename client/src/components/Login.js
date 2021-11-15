import React from 'react';
import './styles/Login.scss';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
function Login() {
	return (
		<div className='login'>
			<div className='login__title'>
				<h3>Hi Lets get started</h3>
			</div>

			<div className='login__content'>
				<h3>Login</h3>
				<Formik
					initialValues={{
						username: '',
						password: '',
						rememberMe: false,
					}}>
					<form className='login__form'>
						<input
							type='text'
							className='form-control login__input'
							placeholder='username'
						/>
						<input
							type='password'
							className='form-control login__input'
							placeholder='password'
						/>
						<div className='form-check login__checkbox'>
							<label
								htmlFor='remember'
								className='form-check-label'>
								remember my login
							</label>
							<input
								type='checkbox'
								name='remember'
								className='form-check-input '
							/>
						</div>
						<button className='btn btn-primary'>Login</button>
					</form>
				</Formik>
				<div className='login__footer'>
					<Link to='/messenger/register'>
						<h3>create an account</h3>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
