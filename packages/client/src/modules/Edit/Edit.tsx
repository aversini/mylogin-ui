import { useEffect } from "react";

export const Edit = () => {
	useEffect(() => {
		document.getElementById("logo")?.classList.add("fadeOut");
		setTimeout(() => {
			document
				.getElementById("root")
				?.classList.replace("app-hidden", "fadeIn");
		}, 500);
	}, []);

	return <div>Edit</div>;
};
