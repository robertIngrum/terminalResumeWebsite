import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';

const themes = {
	dark: {
		black: "#292d3e",	
		brightBlack: "#434758",
		red: "#f07178",	
		brightRed: "#ff8b92",
		green: "#c3e88d",	
		brightGreen: "#ddffa7",
		yellow: "#ffcb6b",	
		brightYellow: "#ffe585",
		blue: "#82aaff",	
		brightBlue: "#9cc4ff",
		magenta: "#c792ea",	
		brightMagenta: "#e1acff",
		cyan: "#89ddff",	
		brightCyan: "#a3f7ff",
		white: "#d0d0d0",
		brightWhite: "#ffffff",
		background: "#292d3e",
		cursor: "#d0d0d0",
		cursorAccent: "#d0d0d0",
	},
};

const term = new Terminal({
	theme: themes.dark,
	windowOptions: {
		setWinLines: 10,
	},
});
term.open(document.getElementById('terminal'));
term.writeln('Hello!');
term.writeln('For my personal website, I present to you an overly complicated terminal interface.');
term.writeln('I\'ve implemented a few commands, you can view them with `help`.');
term.writeln('If you prefer a normal website, you can type `old` or click the link at the bottom of the page.');

let currentLine = '';
let cursorPosition = 0;

term.onData(e => {
	console.log("Key pressed", e);

	const code = e.charCodeAt(0);

	if (code === 13) {
		processCommand(currentLine);

		currentLine = '';
		cursorPosition = 0;

		term.write('\r\n');
		term.write('$ ');

		return;
	}

	if (code === 127) {
		if (cursorPosition <= 0) { return; }

		currentLine = currentLine.slice(0, cursorPosition - 1) + currentLine.slice(cursorPosition);
		cursorPosition--;

		// Redraw the current line
		term.write('\b \b');
	
		return;
	}

	if (code < 32) {
		// Ignore other control characters
		return;
	}

	// Regular input
	currentLine = currentLine.slice(0, cursorPosition) + e + currentLine.slice(cursorPosition);
	cursorPosition++;
	term.write(e);
});

function processCommand(command) {
	if (command === '') {
		return;
	} else if (command === 'ls') {
		term.write('\r\nHaha no commands here.');
	} else {
		term.write(`\r\nCommand not found: ${command}`);
	}
}

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
fitAddon.fit();

term.loadAddon(new WebLinksAddon());

