import React from 'react'
import './styles/Message.scss'
import { useParams } from 'react-router'
function Message({ receiver, timestamp, msg }) {
	let params = useParams()
	// 'siamak' haman username login shode khahad bod
	return receiver !== 'siamak' ? (
		<div className='msg'>
			<div className='bubble alt'>
				<div className='txt'>
					<div className='txt__wrap'>
						<span className='name alt'>{'siamak'}</span>
						<span className='timestamp'>{timestamp}</span>
					</div>

					<p className='message'>{msg}</p>
				</div>
				<div className='bubble-arrow alt'></div>
			</div>
		</div>
	) : (
		<div className='msg'>
			<div className='bubble'>
				<div className='txt'>
					<div className='txt__wrap'>
						<span className='name'>{params.user}</span>
						<span className='timestamp'>{timestamp}</span>
					</div>
					<span className='message'>{msg}</span>
				</div>
				<div className='bubble-arrow'></div>
			</div>
		</div>
	)
}

export default Message
