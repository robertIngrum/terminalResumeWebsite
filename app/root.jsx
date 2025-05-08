import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

const bodyStyle = { background: '#434758' };

export default function App() {
  return (
    <html>
      <head>
				<title>/robertIngrum</title>

        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body style={bodyStyle}>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

