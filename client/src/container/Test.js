import React from 'react';
import DragScroll from 'react-dragscroll';

function Test() {
	return (
		<DragScroll width={404} height={85}>
			<div className='nowrap'>
				<div className='icon' />
				<div className='icon' />
				<div className='icon' />
				<div className='icon' />
				<div className='icon' />
				<div className='icon' />
			</div>
		</DragScroll>
	);
}

export default Test;
