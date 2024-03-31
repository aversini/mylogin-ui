import { Button, ButtonIcon, ButtonLink } from "@versini/ui-components";
import { TextArea } from "@versini/ui-form";
import { IconEdit } from "@versini/ui-icons";
import { useContext, useState } from "react";

import {
	ACTION_REFRESH_DATA,
	ACTION_SET_STATUS,
	ACTION_STATUS_ERROR,
	ACTION_STATUS_SUCCESS,
	LOCAL_STORAGE_BASIC_AUTH,
} from "../../common/constants";
import { useLocalStorage } from "../../common/hooks";
import { FAKE_USER_EMAIL } from "../../common/strings";
import type { SectionProps } from "../../common/types";
import { editShortcuts } from "../../common/utilities";
import { AppContext } from "../App/AppContext";

export const Shortcuts = () => {
	const storage = useLocalStorage();
	const { state, dispatch } = useContext(AppContext);
	const [editable, setEditable] = useState<string | null>();
	const [userInputShortcuts, setUserInputShortcuts] = useState("");
	const [userInputSectionTitle, setUserInputSectionTitle] = useState("");
	const [basicAuth] = useState(storage.get(LOCAL_STORAGE_BASIC_AUTH));

	const onClickSaveShortcuts = async ({
		section,
	}: {
		section: SectionProps;
	}) => {
		setEditable(editable === section.id ? null : section.id);
		try {
			const { jsonParse } = await import("../../common/jsonUtilities");
			try {
				section.title = jsonParse(userInputSectionTitle, true);
				section.shortcuts = jsonParse(userInputShortcuts);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}

			const response = await editShortcuts({
				userId: FAKE_USER_EMAIL,
				basicAuth,
				sectionId: section.id,
				sectionTitle: section.title,
				shortcuts: section.shortcuts,
			});
			if (response.status !== 200) {
				dispatch({
					type: ACTION_SET_STATUS,
					payload: {
						status: ACTION_STATUS_ERROR,
					},
				});
			} else {
				dispatch({
					type: ACTION_REFRESH_DATA,
					payload: {
						status: ACTION_STATUS_SUCCESS,
						sections: response.data,
					},
				});
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return state && state?.sections?.length > 0 ? (
		<>
			{state.sections.map((section) => {
				return (
					<div key={section.id} className="mb-5">
						<h2 className="heading text-center font-bold text-slate-200">
							{section.title}
							<ButtonIcon
								focusMode="light"
								mode="light"
								noBorder
								size="small"
								className="ml-1"
								label="Edit section"
								onClick={() => {
									setEditable(editable === section.id ? null : section.id);
									setUserInputSectionTitle(
										JSON.stringify(section.title, null, 2),
									);
									setUserInputShortcuts(
										JSON.stringify(section.shortcuts, null, 2),
									);
								}}
							>
								<IconEdit className="h-3 w-3" />
							</ButtonIcon>
						</h2>

						{editable && editable === section.id ? (
							<>
								<TextArea
									className="mt-2"
									textAreaClassName="font-mono text-sm"
									mode="dark"
									focusMode="light"
									label={`Shortcuts for ${section.title}`}
									name={`shortcuts-${section.id}`}
									value={userInputShortcuts}
									onChange={(e) => setUserInputShortcuts(e.target.value)}
								/>

								<Button
									mode="light"
									focusMode="light"
									className="mr-2 mt-3"
									onClick={() => {
										setEditable(editable === section.id ? null : section.id);
									}}
								>
									Cancel
								</Button>
								<Button
									focusMode="light"
									noBorder
									className="mt-3"
									onClick={() => {
										onClickSaveShortcuts({ section });
									}}
								>
									Save
								</Button>
							</>
						) : (
							<div className="flex flex-wrap justify-center">
								{section.shortcuts.map((shortcut, idx) => {
									return (
										<ButtonLink
											focusMode="light"
											key={`${shortcut.url}-${shortcut.label}-${idx}`}
											noBorder
											link={shortcut.url}
											target="_blank"
											className="mr-1 mt-1 w-44 sm:w-52"
											maxLabelLength={23}
										>
											{shortcut.label}
										</ButtonLink>
									);
								})}
							</div>
						)}
					</div>
				);
			})}
		</>
	) : (
		<div className="text-center font-bold">No shortcuts found.</div>
	);
};
