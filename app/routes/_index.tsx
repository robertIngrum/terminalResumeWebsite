import React from '@remix-run/react';
import Terminal from '../utils/Terminal';

const containerStyle = {
	display: 'flex',
	'flex-direction': 'column',
	height: '100vh',
};
const terminalStyle = {
	'flex': 1,
	'margin': '20px',
	'padding': '15px',
	'border-radius': '15px',
	'background': '#92d3e',
};

export default function Index() {
	const onData = (data) => {
		console.log('Data:', data);
	}

	const onResize = ({ cols, rows }) => {
		console.log('Term resized to:', cols, rows);
	}

	const terminalComponent = () => {
		if (Terminal === undefined) {
			return <div>Loading...</div>;
		}

		return <Terminal />;
	}

	return (
		<div id="container" style={containerStyle}>
			<div id="navBar">
				<div id="osActions">
					<div className="osAction" data-action="close"></div>
					<div className="osAction" data-action="minimize"></div>
					<div className="osAction" data-action="maximize"></div>
				</div>
				<div className="tab"></div>
			</div>
			{/* {terminalComponent()} */}
			<Terminal />
		</div>
	);
}

