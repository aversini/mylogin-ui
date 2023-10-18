import "./index.css";

import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { isBasicAuth } from "./common/utilities";
import { getConfig } from "./config";
import { App } from "./modules/App/App";
import { Edit } from "./modules/Edit/Edit";
import { Shortcuts } from "./modules/Shortcuts/Shortcuts";

const config = getConfig();

const providerConfig = {
	domain: config.domain,
	clientId: config.clientId,
	authorizationParams: {
		redirect_uri: window.location.origin,
		...(config.audience ? { audience: config.audience } : undefined),
	},
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/shortcuts",
				element: <Shortcuts />,
			},
		],
	},

	{
		path: "/edit",
		element: <Edit />,
	},
]);

const root = document.getElementById("root");

if (root) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			{isBasicAuth ? (
				<RouterProvider router={router} />
			) : (
				<Auth0Provider {...providerConfig}>
					<RouterProvider router={router} />
				</Auth0Provider>
			)}
		</React.StrictMode>,
	);
}
