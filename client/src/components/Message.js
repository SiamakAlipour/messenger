import React from 'react'
import './styles/Message.scss'
function Message({ received, name, timestamp, msg }) {
	return !received ? (
		<div className='msg'>
			<div className='bubble'>
				<div className='txt'>
					<div className='txt__wrap'>
						<span className='name'>{name}</span>
						<span className='timestamp'>{timestamp}</span>
					</div>
					<span className='message'>{msg}</span>
				</div>
				<div className='bubble-arrow'></div>
			</div>
		</div>
	) : (
		<div className='msg'>
			<div className='bubble alt'>
				<div className='txt'>
					<div className='txt__wrap'>
						<span className='name alt'>{name}</span>
						<span className='timestamp'>{timestamp}</span>
					</div>

					<p className='message'>{msg}</p>
				</div>
				<div className='bubble-arrow alt'></div>
			</div>
		</div>
	)
}

export default Message
