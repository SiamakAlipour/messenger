import React from 'react';
import ContactItem from '../components/ContactItem';
import './styles/Contacts.scss';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ScrollContainer from 'react-indiana-drag-scroll';
function Contacts() {
	return (
		<div className='contacts'>
			<div className='contacts__header'>
				<div className='contacts__selfAvatar'>
					<img
						src='http://wallpaperwaifu.com/wp-content/uploads/2021/03/satoru-gojo-jujutsu-kaisen-thumb.jpg'
						alt=''
					/>
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

			<ScrollContainer
				className='contacts__content'
				hideScrollbars={false}>
				<ContactItem
					contactName={'ali_aziz'}
					lastMessage={
						'سلام بالا هارداسان گه گداخ گیمه سورا ایش گوراخ'
					}
					avatar={''}
				/>
				<ContactItem
					contactName={'bill_gates'}
					lastMessage={'حالیم بتر خراب دی سیا گلدین پیام ور'}
					avatar={
						'https://splash247.com/wp-content/uploads/2020/11/Bill-Gates.jpg'
					}
				/>
				<ContactItem
					contactName={'hot_devil'}
					lastMessage={'بیا پاییییییییییین'}
					avatar={'https://wallpaperaccess.com/full/2634936.png'}
				/>
				<ContactItem
					contactName={'hitler'}
					lastMessage={'سیا من اولممیشم ها نیاران گالما'}
					avatar={
						'https://i.pinimg.com/280x280_RS/e2/3c/ae/e23cae42dcac7a435ec5e5586e3522c4.jpg'
					}
				/>
				<ContactItem
					contactName={'hitler'}
					lastMessage={'سیا من اولممیشم ها نیاران گالما'}
					avatar={
						'https://i.pinimg.com/280x280_RS/e2/3c/ae/e23cae42dcac7a435ec5e5586e3522c4.jpg'
					}
				/>
				<ContactItem
					contactName={'hitler'}
					lastMessage={'سیا من اولممیشم ها نیاران گالما'}
					avatar={
						'https://i.pinimg.com/280x280_RS/e2/3c/ae/e23cae42dcac7a435ec5e5586e3522c4.jpg'
					}
				/>
			</ScrollContainer>
		</div>
	);
}

export default Contacts;
