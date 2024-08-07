import {
	ACTION_INVALIDATE_SESSION,
	ACTION_REFRESH_DATA,
	ACTION_SET_EDIT_MODE,
	ACTION_SET_EDIT_SECTIONS,
	ACTION_SET_STATUS,
	ACTION_STATUS_ERROR,
	ACTION_STATUS_SUCCESS,
} from "./constants";

export type ShortcutDataProps = {
	id: string;
	label: string;
	url: string;
};

export type SectionProps = {
	id: string;
	shortcuts: ShortcutDataProps[];
	title: string;
};

export type StateProps = {
	editSections: boolean;
	editMode: boolean;
	sections: SectionProps[];
	status:
		| string
		| typeof ACTION_STATUS_ERROR
		| typeof ACTION_STATUS_SUCCESS
		| typeof ACTION_INVALIDATE_SESSION;
};

export type ActionProps =
	| undefined
	| {
			payload: {
				editMode: boolean;
			};
			type: typeof ACTION_SET_EDIT_MODE;
	  }
	| {
			payload: {
				editSections: boolean;
			};
			type: typeof ACTION_SET_EDIT_SECTIONS;
	  }
	| {
			payload: {
				status: typeof ACTION_STATUS_ERROR | typeof ACTION_STATUS_SUCCESS;
			};
			type: typeof ACTION_SET_STATUS;
	  }
	| {
			payload: {
				sections: SectionProps[];
				status:
					| string
					| typeof ACTION_STATUS_ERROR
					| typeof ACTION_STATUS_SUCCESS;
			};
			type: typeof ACTION_REFRESH_DATA;
	  }
	| {
			payload: {
				status:
					| string
					| typeof ACTION_STATUS_ERROR
					| typeof ACTION_STATUS_SUCCESS;
			};
			type: typeof ACTION_INVALIDATE_SESSION;
	  };

export type AppContextProps = {
	dispatch: React.Dispatch<ActionProps>;
	state: StateProps;
};
