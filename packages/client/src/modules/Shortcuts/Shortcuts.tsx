import { Button, ButtonIcon, ButtonLink } from "@versini/ui-components";
import { TextInput } from "@versini/ui-form";
import { IconEdit } from "@versini/ui-icons";
import { useContext, useState } from "react";

import { ACTION_SET_DATA } from "../../common/constants";
import { AppContext } from "../App/AppContext";

export const Shortcuts = () => {
	const { state, dispatch } = useContext(AppContext);
	const [editable, setEditable] = useState<number | null>();
	const [userInputShortcuts, setUserInputShortcuts] = useState("");
	const [userInputSectionTitle, setUserInputSectionTitle] = useState("");

	return state && state?.shortcuts?.length > 0 ? (
		<>
			{state.shortcuts.map((item) => {
				return (
					<div key={item.position} className="mb-5">
						<h2 className="heading text-center font-bold text-slate-200">
							{item.title}
							<ButtonIcon
								focusMode="light"
								mode="light"
								noBorder
								size="small"
								className="ml-1"
								label="Edit section"
								onClick={() => {
									setEditable(
										editable === item.position ? null : item.position,
									);
									setUserInputSectionTitle(JSON.stringify(item.title, null, 2));
									setUserInputShortcuts(JSON.stringify(item.data, null, 2));
								}}
							>
								<IconEdit className="h-3 w-3" />
							</ButtonIcon>
						</h2>

						{editable && editable === item.position ? (
							<>
								<TextInput
									mode="dark"
									focusMode="light"
									label="Section title"
									name={`section-title-${item.position}`}
									className="mb-2 mt-2"
									type="text"
									value={userInputSectionTitle}
									onChange={(e) =>
										setUserInputSectionTitle(e.target.value.toString())
									}
								/>
								<textarea
									className="h-36 w-full p-2 font-mono text-sm text-copy-dark"
									value={userInputShortcuts}
									onChange={(e) => setUserInputShortcuts(e.target.value)}
								/>
								<Button
									focusMode="light"
									noBorder
									className="mr-2 mt-3"
									onClick={() => {
										setEditable(
											editable === item.position ? null : item.position,
										);
									}}
								>
									Cancel
								</Button>
								<Button
									focusMode="light"
									noBorder
									className="mt-3"
									onClick={async () => {
										setEditable(
											editable === item.position ? null : item.position,
										);
										try {
											const { jsonParse, addUniqueId } = await import(
												"../../common/jsonUtilities"
											);
											try {
												item.data = addUniqueId(jsonParse(userInputShortcuts));
											} catch (error) {
												// eslint-disable-next-line no-console
												console.error(error);
											}

											try {
												item.title = jsonParse(userInputSectionTitle, true);
											} catch (error) {
												// eslint-disable-next-line no-console
												console.error(error);
											}

											dispatch({
												type: ACTION_SET_DATA,
												payload: {
													status: "stale",
													shortcut: item,
												},
											});
										} catch (error) {
											// eslint-disable-next-line no-console
											console.error(error);
										}
									}}
								>
									Save
								</Button>
							</>
						) : (
							<div className="flex flex-wrap justify-center">
								{item.data.map((shortcut) => {
									return (
										<ButtonLink
											focusMode="light"
											key={shortcut.id}
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
