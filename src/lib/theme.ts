type Theme = "light" | "dark";

export const setTheme = (theme: Theme) => {
  const root = document.documentElement;
  const isDark = theme === "dark";

  root.style.setProperty("--background", isDark ? "0 0% 10%" : "0 0% 100%");
  root.style.setProperty("--foreground", isDark ? "0 0% 100%" : "0 0% 0%");
  root.style.setProperty("--card", isDark ? "0 0% 15%" : "0 0% 100%");
  root.style.setProperty("--card-foreground", isDark ? "0 0% 100%" : "0 0% 0%");
  root.style.setProperty("--popover", isDark ? "0 0% 15%" : "0 0% 100%");
  root.style.setProperty(
    "--popover-foreground",
    isDark ? "0 0% 100%" : "0 0% 0%",
  );
  root.style.setProperty("--primary", "210 100% 50%");
  root.style.setProperty("--primary-foreground", "0 0% 100%");
  root.style.setProperty("--secondary", isDark ? "0 0% 20%" : "0 0% 96%");
  root.style.setProperty(
    "--secondary-foreground",
    isDark ? "0 0% 100%" : "0 0% 0%",
  );
  root.style.setProperty("--muted", isDark ? "0 0% 20%" : "0 0% 96%");
  root.style.setProperty(
    "--muted-foreground",
    isDark ? "0 0% 70%" : "0 0% 45%",
  );
  root.style.setProperty("--accent", "210 100% 50%");
  root.style.setProperty("--accent-foreground", "0 0% 100%");
  root.style.setProperty("--destructive", "0 84.2% 60.2%");
  root.style.setProperty("--destructive-foreground", "0 0% 100%");
  root.style.setProperty("--border", isDark ? "0 0% 20%" : "0 0% 90%");
  root.style.setProperty("--input", isDark ? "0 0% 20%" : "0 0% 90%");
  root.style.setProperty("--ring", "210 100% 50%");

  localStorage.setItem("theme", theme);
};

export const getTheme = (): Theme => {
  return (localStorage.getItem("theme") as Theme) || "light";
};
