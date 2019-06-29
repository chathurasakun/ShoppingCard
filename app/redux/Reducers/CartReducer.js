import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as KeyConstants from '../KeyConstants';

const INITIAL_STATE = {
	cardList: []
};

const UserReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case KeyConstants.default.ADD_TO_CART: {
			return {
				...state,
				cardList: [...state.cardList, action.payload]
			}
		}
		case KeyConstants.default.REMOVE_FROM_CART: {
			let cardList = state.cardList.filter((existingItem) => existingItem.id !== action.payload.id);
			return { ...state, cardList }
		}
		default:
			return state;
	}
};

const persistConfig = {
	key: 'card',
	storage: storage,
	timeout: null
	//blacklist: ['isLoggingIn']
};

export default persistReducer(persistConfig, UserReducer);