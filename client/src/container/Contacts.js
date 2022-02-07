import React, { useEffect, useState } from 'react'
import ContactItem from '../components/ContactItem'
import './styles/Contacts.scss'
// import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ScrollContainer from 'react-indiana-drag-scroll'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
// import { useParams } from 'react-router-dom'
import axios from '../service/api/baseUrl'
function Contacts() {
	// let params = useParams()
	const [contacts, setContacts] = useState([])
	const [contactInput, setContactInput] = useState('')
	const [isAddContact, setIsAddContact] = useState(false)
	const user = JSON.parse(localStorage.getItem('user'))
	const logout = () => {
		localStorage.removeItem('user')
		window.location.reload()
	}
	// getting contact from api

	useEffect(() => {
		axios
			.get(`/account/contacts/${user.username}`)
			.then((res) => {
				setContacts(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<div className='contacts'>
			<div className='contacts__header'>
				<div className='contacts__selfInfo'>
					<img className='contacts_selfInfoImage' src={user.avatar} alt='' />
					<p className='contacts_selfInfoName'>{user.username}</p>
				</div>

				<div className='contacts__selfOptions'>
					<IconButton color='inherit' onClick={() => setIsAddContact(true)}>
						<PersonAddIcon />
					</IconButton>
					<IconButton color='inherit'>
						<SettingsIcon className='settingsIcon' />
					</IconButton>
					<IconButton color='inherit' onClick={logout}>
						<LogoutIcon />
					</IconButton>
				</div>
			</div>
			{isAddContact && (
				<div className='contacts__contactInput'>
					<IconButton color='inherit' onClick={() => setIsAddContact(false)}>
						<CloseIcon />
					</IconButton>
					<form action=''>
						<input
							type='text'
							placeholder='contact name'
							value={contactInput}
							onChange={(e) => setContactInput(e.target.value)}
						/>
						<button
							type='submit'
							onClick={(e) => {
								e.preventDefault()
								alert('contact added')
								setIsAddContact(false)
							}}></button>
					</form>
				</div>
			)}
			<ScrollContainer className='contacts__content' hideScrollbars={false}>
				{contacts.map((contact) => (
					<ContactItem
						key={contact._id}
						contactName={contact.name}
						avatar={''}
					/>
				))}
			</ScrollContainer>
		</div>
	)
}

export default Contacts
