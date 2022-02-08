import React from 'react'
import './styles/Register.scss'
import { Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import axios from '../service/api/baseUrl'
import { useNavigate } from 'react-router'
function Register() {
	let navigate = useNavigate()
	const schema = Yup.object().shape({
		username: Yup.string()
			.required('Username required')
			.min(6, 'username should be atleast 6 character'),
		password: Yup.string()
			.required('Password required')
			.min(8, 'password should be 8 character'),
		repeatPassword: Yup.string().oneOf(
			[Yup.ref('password'), null],
			'Passwords must match'
		),
		email: Yup.string().email('this is not in email format').required(),
	})
	const handleRegister = async (values) => {
		await axios
			.post('/account/register', {
				username: values.username,
				password: values.password,
				email: values.email,
			})
			.then((res) => {
				alert('you succesfully registred')
				navigate('/messenger', { replace: true })
			})
			.catch((err) => alert(err))
	}
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
					}}
					validationSchema={schema}
					onSubmit={handleRegister}>
					{({ errors, touched }) => (
						<Form className='register__form'>
							<Field
								name='username'
								className='form-control register__input'
								placeholder='username'
							/>

							{touched.username && errors.username && (
								<p className='text-danger'>{errors.username}</p>
							)}
							<Field
								name='password'
								className='form-control register__input'
								placeholder='password'
							/>

							{touched.password && errors.password && (
								<p className='text-danger'>{errors.password}</p>
							)}
							<Field
								name='repeatPassword'
								placeholder='repeat password'
								className='form-control register__input'
							/>

							{touched.repeatPassword && errors.repeatPassword && (
								<p className='text-danger'>{errors.repeatPassword}</p>
							)}
							<Field
								name='email'
								className='form-control register__input'
								placeholder='email'
							/>

							{/* If this field has been touched, and it contains an error, display

           it */}

							{touched.email && errors.email && (
								<p className='text-danger'>{errors.email}</p>
							)}

							<button type='submit' className='btn btn-danger'>
								Submit
							</button>
						</Form>
					)}
				</Formik>
				{/* <Formik
					initialValues={{
						username: '',
						email: '',
						password: '',
						repeatPassword: '',
					}}
					validationSchema={schema}
					validateOnChange={schema}
					onSubmit={(values) => {
						// same shape as initial values

						console.log(values)
					}}>
					{({ errors, touched }) => (
						<Form className='register__form'>
							<input
								type='text'
								className='form-control register__input'
								placeholder='username'
								name='username'
								autoComplete='new-password'
							/>
							{errors.username && touched.username && (
								<label htmlFor='username'>{errors.username}</label>
							)}

							<input
								type='password'
								className='form-control register__input'
								placeholder='password'
								name='password'
								autoComplete='new-password'
							/>
							{errors.password && touched.password && (
								<label htmlFor='password'>{errors.password}</label>
							)}
							<input
								type='password'
								placeholder='repeat password'
								className='form-control register__input'
								name='repeatPassword'
								autoComplete='new-password'
							/>
							{errors.repeatPassword && touched.repeatPassword && (
								<label htmlFor='repeatPassword'>{errors.repeatPassword}</label>
							)}
							<input
								type='email'
								className='form-control register__input'
								placeholder='email'
								name='email'
							/>
							{errors.email && touched.email && (
								<label htmlFor='email'>{errors.email}</label>
							)}
							<button
								className='btn btn-danger'
								type='submit'
								onClick={(e) => {
									e.preventDefault()
								}}>
								Register
							</button>
						</Form>
					)}
				</Formik> */}
				<div className='register__footer'>
					<Link to='/messenger/account/login'>
						<h3>sign in</h3>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Register
