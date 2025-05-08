import React from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { ReactXTermJs, FitAddon, WebLinksAddon } from './.client/serverSafe';

const Terminal = () => {
	const currentLine = useRef('');
	const cursorPosition = useRef(0);
	const { ref, instance } = ReactXTermJs !== undefined ?
		ReactXTermJs.useXTerm() :
		{ ref: null, instance: null };

	const processCommand = (command) => {
		if (command === '') {
			return;
		} else if (command === 'ls') {
			instance?.write('\r\nHaha no commands here.');
		} else {
			instance?.write(`\r\nCommand not found: ${command}`);
		}
	}

	const onDataHandler = (e) => {
		if (instance == null) return;

		console.log("Key pressed", e);

		const code = e.charCodeAt(0);

		if (code === 13) {
			processCommand(currentLine.current);

			currentLine.current = '';
			cursorPosition.current = 0;

			instance.write('\r\n');
			instance.write('$ ');

			return;
		}

		if (code === 127) {
			if (cursorPosition <= 0) { return; }

			currentLine.current = currentLine.current.slice(0, cursorPosition.current - 1) + currentLine.current.slice(cursorPosition.current);
			cursorPosition.current--;

			// Redraw the current line
			instance.write('\b \b');
		
			return;
		}

		if (code < 32) {
			// Ignore other control characters
			return;
		}

		// Regular input
		currentLine.current = currentLine.current.slice(0, cursorPosition.current) + e + currentLine.current.slice(cursorPosition.current);
		cursorPosition.current++;
		instance.write(e);
	};

	useEffect(() => {
		if (instance === null) return;

		instance.onData(onDataHandler);

		instance.writeln('Hello!');
		instance.writeln('For my personal website, I present to you an overly complicated terminal interface.');
		instance.writeln('I\'ve implemented a few commands, you can view them with `help`.');
		instance.writeln('If you prefer a normal website, you can type `old` or click the link at the bottom of the page.');

		const fitAddon = new FitAddon();
		instance.loadAddon(fitAddon);
		fitAddon.fit();

		instance.loadAddon(new WebLinksAddon());
	}, [instance]);

	return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};

export default Terminal;

