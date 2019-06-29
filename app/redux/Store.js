import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CartReducer from './Reducers/CartReducer';
//import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
	key: 'root',
	storage: storage,
	timeout: null
	//stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const rootReducer = combineReducers({
	card: CartReducer
});

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);