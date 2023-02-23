import {configureStore} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  // import thunk from 'redux-thunk';
  import storage from "redux-persist/lib/storage";
  
 import userReducer from "../Redux/Slices/userSlice";
 import savedReducer from "../Redux/Slices/savedSlice";
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const rootReducer = persistReducer(persistConfig, userReducer);
  const saveReducer = persistReducer(persistConfig, savedReducer);

export const store = configureStore({
  reducer: { user: rootReducer , saved: saveReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);