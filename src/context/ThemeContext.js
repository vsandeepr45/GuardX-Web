import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(() => {

        return (
            localStorage.getItem("guardx-theme") ||
            "light"
        );

    });

    useEffect(() => {

        const root =
            document.documentElement;

        if (theme === "dark") {

            root.setAttribute(
                "data-theme",
                "dark"
            );

        } else {

            root.setAttribute(
                "data-theme",
                "light"
            );

        }

        localStorage.setItem(
            "guardx-theme",
            theme
        );

    }, [theme]);

    function changeTheme(newTheme) {

        if (
            newTheme !== "light" &&
            newTheme !== "dark"
        ) {
            return;
        }

        setTheme(newTheme);
    }

    function toggleTheme() {

        setTheme((previous) => {

            return previous === "light"
                ? "dark"
                : "light";

        });

    }

    return (

        <ThemeContext.Provider
            value={{
                theme,
                changeTheme,
                toggleTheme
            }}
        >

            {children}

        </ThemeContext.Provider>

    );
}

export function useTheme() {

    return useContext(
        ThemeContext
    );

}