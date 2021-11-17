import React from 'react';
import './styles/Register.scss';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
function Register() {
	return (
		<div className='register'>
			<div className='register__title'>
				<h3>Hi Lets get started</h3>
			</div>

			<div className='register__content'>
				<h3>Register</h3>
				<Formik
					initialValues={{
						username: '',
						email: '',
						password: '',
						repeatPassword: '',
					}}>
					{({ errors, touched }) => (
						<form className='register__form'>
							<input
								type='text'
								className='form-control register__input'
								placeholder='username'
								name='username'
								autoComplete='new-password'
							/>
							{errors.username && (
								<label htmlFor='username'>
									{errors.username}
								</label>
							)}

							<input
								type='password'
								className='form-control register__input'
								placeholder='password'
								name='password'
								autoComplete='new-password'
							/>
							{errors.password && (
								<label htmlFor='password'>
									{errors.password}
								</label>
							)}
							<input
								type='password'
								placeholder='repeat password'
								className='form-control register__input'
								name='repeatPassword'
								autoComplete='new-password'
							/>
							{errors.repeatPassword && (
								<label htmlFor='repeatPassword'>
									{errors.repeatPassword}
								</label>
							)}
							<input
								type='email'
								className='form-control register__input'
								placeholder='email'
								name='email'
							/>
							{errors.email && (
								<label htmlFor='email'>{errors.email}</label>
							)}
							<button
								className='btn btn-danger'
								onClick={(e) => {
									e.preventDefault();
								}}>
								Register
							</button>
						</form>
					)}
				</Formik>
				<div className='register__footer'>
					<Link to='/account/login'>
						<h3>sign in</h3>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
