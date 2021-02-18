import { HIDE_ALERT, SHOW_ALERT } from "../../types"


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
	switch (action.type) {
		case SHOW_ALERT:
			return {
				alert: action.payload

			}
		case HIDE_ALERT:
			return {
				alert: null

			}
		default:
			return state
	}
}