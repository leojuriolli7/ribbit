import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

/** Get the clerk appearance props (Light mode, dark mode & primary color) */
export default function useClerkAppearance() {
  const { resolvedTheme: theme } = useTheme();
  const clerkWidgetTheme = theme === "dark" ? dark : undefined;

  return {
    baseTheme: clerkWidgetTheme,
    variables: {
      colorPrimary: "#22c55e",
    },
  };
}
