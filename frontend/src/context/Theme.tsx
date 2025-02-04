import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface SectionTheme {
  primary: string;
  secondary: string;
}

interface ThemeMain {
  colors: {
    bg_third: string;
    bg: string;
    bg_secondary: string;
    bg_qtextbox: string;
    bg_atextbox: string;
    text: string;
    text_secondary: string;
    primary: string;
    secondary: string;
    section: SectionTheme;
  };
  theme_name: string;
}

const sectionThemes = {
  docfynd: {
    primary: "#0000ff",
    secondary: "#DA3D3D",
  },
  searchonmath: {
    primary: "#3eb972",
    secondary: "#446dac",
  },
  chatgpt: {
    primary: "#ff8bff",
    secondary: "#1f4600",
  },
};

const themes = {
  light: {
    colors: {
      bg: "#ffffff",
      bg_secondary: "#f5f5f5",
      bg_qtextbox: "#d6d9f5",
      bg_third: "#d9d9d9",
      bg_atextbox: "#ffffff",
      text: "#000000",
      text_secondary: "#242424",
      primary: "#0000ff",
      secondary: "#DA3D3D",
      section: sectionThemes.docfynd,
    },
    theme_name: "light",
  },
  dark: {
    colors: {
      bg: "#202020",
      bg_secondary: "#242424",
      bg_qtextbox: "#3c3e69",
      bg_third: "#313131",
      bg_atextbox: "#2f3031",
      text: "#ffffff",
      text_secondary: "#cacaca",
      primary: "#0000ff",
      secondary: "#DA3D3D",
      section: sectionThemes.docfynd,
    },
    theme_name: "dark",
  },
};

interface ThemeValue {
  theme: ThemeMain;
  toogleTheme: () => void;
  toogleSectionTheme: (section: keyof typeof sectionThemes) => void;
}

const Theme = createContext({} as ThemeValue);

export default Theme;

export function ThemeProvider({ children }: any) {
  const [mainTheme, setMainTheme] = useState(themes.light);
  const toogleTheme = () => {
    setMainTheme((old) => {
      let newTheme = old.theme_name === "light" ? themes.dark : themes.light;
      newTheme.colors.section = old.colors.section;
      return newTheme;
    });
  };

  const toogleSectionTheme = useCallback(
    (section: keyof typeof sectionThemes) => {
      setMainTheme((old) => {
        const newTheme = { ...old };
        newTheme.colors.section = sectionThemes[section];
        return newTheme;
      });
    },
    []
  );

  return (
    <Theme.Provider
      value={{
        theme: mainTheme,
        toogleTheme,
        toogleSectionTheme,
      }}
    >
      {children}
    </Theme.Provider>
  );
}

export function useTheme() {
  const context = useContext(Theme);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
}
