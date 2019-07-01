import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CartReducer from './Reducers/CartReducer';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
	key: 'root',
	storage: storage,
	timeout: null,
	stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
	card: CartReducer
});

const pReducer = persistReducer(persistConfig, rootReducer);
const createAppropriateStore = createStore;
const createStoreWithMiddleware = applyMiddleware(thunk)(createAppropriateStore);
export const store = createStoreWithMiddleware(pReducer);

//export const store = createStore(pReducer);
export const persistor = persistStore(store);