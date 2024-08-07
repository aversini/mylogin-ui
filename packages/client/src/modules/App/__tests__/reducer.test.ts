import { describe, expect, it } from "vitest";

import {
	ACTION_REFRESH_DATA,
	ACTION_STATUS_SUCCESS,
} from "../../../common/constants";
import { reducer } from "../reducer";

describe("Non-DOM tests", () => {
	describe("reducer tests", () => {
		it("should return the initial state", () => {
			const state = {
				status: ACTION_STATUS_SUCCESS,
				sections: [],
				editMode: false,
				editSections: false,
			};
			expect(reducer(state, undefined)).toEqual(state);
		});

		it("should update the data state on ACTION_DATA", () => {
			const state = {
				status: ACTION_STATUS_SUCCESS,
				sections: [],
				editMode: false,
				editSections: false,
			};
			const actionPayload = {
				status: ACTION_STATUS_SUCCESS,
				editMode: false,
				sections: [
					{
						title: "testTitle",
						id: "testId",
						shortcuts: [
							{
								id: "testId",
								label: "testLabel",
								url: "testUrl",
							},
						],
					},
				],
			};
			expect(
				reducer(state, {
					type: ACTION_REFRESH_DATA,
					payload: actionPayload,
				}),
			).toEqual({
				editSections: false,
				editMode: actionPayload.editMode,
				status: actionPayload.status,
				sections: actionPayload.sections,
			});
		});
	});
});
