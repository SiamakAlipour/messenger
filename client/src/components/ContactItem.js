import React, { useState, useEffect } from 'react'
import './styles/ContactItem.scss'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'
import axios from '../service/api/baseUrl'

function ContactItem({ contactName }) {
	let navigate = useNavigate()
	const [lastMessage, setLastMessage] = useState('')
	const [avatar, setAvatar] = useState('')
	useEffect(() => {
		axios
			.post('/message/sync', {
				user1: 'siamak',
				user2: contactName,
			})
			.then((res) => {
				const length = res.data.length
				const lastPM = res.data[length - 1]
				return setLastMessage(lastPM.message)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])
	useEffect(() => {
		axios
			.get(`/account/${contactName}`)
			.then((res) => {
				const { avatar } = res.data
				return setAvatar(avatar)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])
	const handleClick = () => {
		let rightPart = document.getElementById('right')
		let leftPart = document.getElementById('left')
		// let backButton = document.getElementById('backButton');
		// let chatHeader = document.getElementById('chatHeader');
		// mainPart.style.flexDirection = 'column';
		rightPart.classList.add('right__click')
		leftPart.classList.add('left__click')
		// backButton.classList.add('buttonShow');
		// chatHeader.classList.add('show');
	}
	return (
		<div
			className='contactItem'
			onClick={() => {
				navigate(`/${contactName}`)
			}}>
			<div className='contactItem__avatar'>
				{' '}
				{avatar ? <img src={avatar} alt='' /> : <PersonIcon />}{' '}
			</div>{' '}
			<div className='contactItem__msg' onClick={handleClick}>
				<h5> {contactName} </h5> <p> {lastMessage} </p>{' '}
			</div>{' '}
		</div>
	)
}

export default ContactItem
