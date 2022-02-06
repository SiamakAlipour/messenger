import React, { useEffect, useState } from 'react'
import ContactItem from '../components/ContactItem'
import './styles/Contacts.scss'
// import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ScrollContainer from 'react-indiana-drag-scroll'
// import { useParams } from 'react-router-dom'
import axios from '../service/api/baseUrl'
function Contacts() {
	// let params = useParams()
	const [contacts, setContacts] = useState([])
	const [lastMessage, setLastMessage] = useState([])
	// getting contact from api

	useEffect(() => {
		axios
			.get(`/account/contacts/siamak`)
			.then((res) => {
				setContacts(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])
	// getting last message from api

	useEffect(() => {
		const fetchData = async () => {
			return await Promise.all(
				contacts.map((contact) => {
					const data = axios
						.post('/message/sync', { user1: contact.name, user2: 'siamak' })
						.then((res) => {
							const length = res.data.length
							const lastPM = res.data[length - 1]
							return lastPM.message
						})
						.catch((err) => {
							console.log(err)
						})
					setLastMessage(...lastMessage, data)
				})
			)
		}
		fetchData()
		console.log('lastMessage : ', lastMessage)
	}, [contacts])
	// useEffect(() => {

	// }, [lastMessage])
	return (
		<div className='contacts'>
			<div className='contacts__header'>
				<div className='contacts__selfInfo'>
					<img
						className='contacts_selfInfoImage'
						src='http://wallpaperwaifu.com/wp-content/uploads/2021/03/satoru-gojo-jujutsu-kaisen-thumb.jpg'
						alt=''
					/>
					<p className='contacts_selfInfoName'>siamak</p>
				</div>

				<div className='contacts__selfOptions'>
					<IconButton color='inherit'>
						<PersonAddIcon />
					</IconButton>
					<IconButton color='inherit'>
						<SettingsIcon className='settingsIcon' />
					</IconButton>
				</div>
			</div>

			<ScrollContainer className='contacts__content' hideScrollbars={false}>
				{contacts.map((contact, index) => (
					<ContactItem
						key={contact._id}
						contactName={contact.name}
						lastMessage={lastMessage[index]}
						avatar={''}
					/>
				))}
			</ScrollContainer>
		</div>
	)
}

export default Contacts
