import { Timestamp } from "firebase/firestore";
import { Account } from "../types";
import { ReactNode, createContext, useCallback, useContext, useReducer } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/app";

// 1 initial state
type StateType = { userInfo: Account & { status: "finish" | "loading" | "error" } };
const initialState: StateType = {
  userInfo: {
    image_url: "",
    status: "loading",
    display_name: "",
    role: "R3",
    email: "",
    latest_seen: new Timestamp(0, 0),
    teacher_id: "",
  },
};

// 2 reducer
const enum REDUCER_ACTION_TYPE {
  SETUSERINFO,
  SETSTATUS,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload: {
    userInfo: Partial<StateType["userInfo"]>;
  };
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SETUSERINFO:
      console.log("dispatch set user info");

      return {
        userInfo: { ...state.userInfo, ...action.payload.userInfo },
      };
    default:
      console.log("default case");

      return {
        userInfo: state.userInfo,
      };
  }
};

// 6 hook
const useAuthContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUserInfo = useCallback((userInfo: Partial<StateType["userInfo"]>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SETUSERINFO,
      payload: { userInfo },
    });
  }, []);

  return { userInfo: state.userInfo, setUserInfo };
  // return { userInfo: state.userInfo, otherInfo: state.otherInfo , setUserInfo };
};

// 3 initial context
type ContextType = {
  userInfo: StateType["userInfo"];
  setUserInfo: (userInfo: Partial<StateType["userInfo"]>) => void;
  // otherInfo: StateType["otherInfo"];
};

const initialContext = {
  userInfo: initialState.userInfo,
  setUserInfo: () => {},
};

// 4 create context
const AuthContext = createContext<ContextType>(initialContext);

// 5 context provider
const AuthProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const { userInfo, setUserInfo } = useAuthContext();

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6 hook
const useAuthStore = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  return { userInfo, setUserInfo };
};

const useAuthActions = () => {
  const { setUserInfo } = useAuthStore();

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  const logOut = async () => {
    await signOut(auth);

    // after set sign cause trigger auth useEffect and will update status to 'finish'
    setUserInfo(initialState.userInfo);
  };

  const logIn = async () => {
    const userCredential = await signInWithPopup(auth, provider);
    //  reset song context
    if (userCredential) {
      // reset userInfo
      // after set sign cause trigger auth useEffect and will update status to 'finish'
      setUserInfo({ status: "loading" });
    }
  };

  return { logOut, logIn };
};

export default AuthProvider;
export { useAuthStore, initialState, useAuthActions };
