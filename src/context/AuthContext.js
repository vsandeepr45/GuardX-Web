import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        const savedToken = localStorage.getItem("token");

        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }

        if (savedToken) {

            setToken(savedToken);

        }

        setLoading(false);

    }, []);

const login=(userData,jwtToken)=>{

    localStorage.setItem(

        "user",

        JSON.stringify(userData)

    );

    localStorage.setItem(

        "token",

        jwtToken

    );

    setUser(userData);

    setToken(jwtToken);

};

const updateUser=(newUser)=>{

    localStorage.setItem(

        "user",

        JSON.stringify(newUser)

    );

    setUser(newUser);

};

    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

        setToken(null);

    };

    return (

        <AuthContext.Provider

value={{

    user,

    token,

    login,

    logout,

    updateUser,

    loading

}}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);