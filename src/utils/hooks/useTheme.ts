import { useMediaQuery } from '@uidotdev/usehooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { z } from 'zod';
import type { Theme, ThemeFormSchema } from '../theme';

export function useTheme(initial?: Theme | undefined) {
  const [theme, setTheme] = useState(initial);
  const hasMounted = useRef(false);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const isDark = useMemo(
    () => theme === 'dark' || (!theme && prefersDark),
    [theme, prefersDark],
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      // document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove('dark');
      // document.documentElement.classList.add("light");
    }
  }, [isDark]);

  useEffect(() => {
    // TODO: This is not The Way (but it works)
    if (!hasMounted.current) {
      // Skip running on the first render to avoid using the OS theme
      hasMounted.current = true;
      return;
    }
    async function updateTheme(formData: FormData) {
      const response = await fetch('/api/theme', {
        method: 'POST',
        body: formData,
      });

      const data: z.infer<typeof ThemeFormSchema> = await response.json();
      setTheme(data.theme);
    }

    const formData = new FormData();
    formData.append('theme', prefersDark ? 'dark' : 'light');
    updateTheme(formData);
  }, [prefersDark, setTheme]);

  return { isDark, theme, setTheme };
}
