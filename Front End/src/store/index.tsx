import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TldState {
  tlds: string[];
}

export interface ToastState {
  success: boolean;
  message: string;
}

export interface UserState {
  id: number;
  age: number;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    id: number;
    postalCode: string;
    houseNumber: string;
    street: string;
  };
}

export interface asset {
  id: string;
  symbol: string;
  name: string;
}
export type AssetsState = { assets: asset[] };

export interface apiAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}
export type ApiAssetsState = {
  apiAssets: apiAsset[];
};

export const initialTldState: TldState = { tlds: [] };

export const tldSlice = createSlice({
  name: "tld",
  initialState: initialTldState,
  reducers: {
    setTld: (state, { payload }: PayloadAction<string[]>) => {
      state.tlds = payload;
    },
  },
});

export const initialToastState: ToastState = { success: true, message: "" };

export const toastSlice = createSlice({
  name: "toast",
  initialState: initialToastState,
  reducers: {
    setToast: (state, { payload }: PayloadAction<ToastState>) => {
      state.success = payload.success;
      state.message = payload.message;
    },
  },
});

export const initialUserState: UserState = {
  id: 0,
  age: 0,
  firstName: "",
  lastName: "",
  email: "",
  address: {
    id: 0,
    postalCode: "",
    houseNumber: "",
    street: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserState>) => {
      state.id = payload.id;
      state.age = payload.age;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.address = payload.address;
    },
  },
});

export const initialAssetsState: AssetsState = {
  assets: [],
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState: initialAssetsState,
  reducers: {
    setAssets: (state, { payload }: PayloadAction<asset[]>) => {
      state.assets = payload;
      console.log(payload);
    },
    addAsset: (state, { payload }: PayloadAction<asset>) => {
      state.assets.push(payload);
      console.log(payload);
    },
    removeAsset: (state, { payload }: PayloadAction<string>) => {
      state.assets = state.assets.filter((asset) => asset.id !== payload);
      console.log(payload);
    },
  },
});

export const initialApiAssetsState: ApiAssetsState = {
  apiAssets: []
};

export const apiAssetsSlice = createSlice({
  name: "apiAssets",
  initialState: initialApiAssetsState,
  reducers: {
    setApiAssets: (
      state,
      { payload }: PayloadAction<apiAsset[]>
    ) => {
      state.apiAssets = payload;
      console.log(payload);
    },

  },
});

const store = configureStore({
  reducer: {
    tldSlice: tldSlice.reducer,
    toastSlice: toastSlice.reducer,
    userSlice: userSlice.reducer,
    assetsSlice: assetsSlice.reducer,
    apiAssetsSlice: apiAssetsSlice.reducer,
  },
});

export const { setTld } = tldSlice.actions;
export const { setToast } = toastSlice.actions;
export const { setUser } = userSlice.actions;
export const { setAssets, addAsset, removeAsset } = assetsSlice.actions;
export const { setApiAssets } = apiAssetsSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export default store;

// export const authSelector = (state: RootState) => state.auth
