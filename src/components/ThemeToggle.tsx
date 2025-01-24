import { getFormProps, useForm } from '@conform-to/react';
import { getZodConstraint } from '@conform-to/zod';
import { LightbulbIcon, LightbulbOffIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { z } from 'zod';
import { useTheme } from '~/utils/hooks/useTheme';
import { cn } from '~/utils/misc';
import { ThemeFormSchema, type Theme } from '~/utils/theme';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export function ThemeToggle({ initial }: { initial: Theme | undefined }) {
  // TODO: check for isClient
  const { isDark, setTheme } = useTheme(initial);

  const [form] = useForm({
    constraint: getZodConstraint(ThemeFormSchema),
    onSubmit: async (e, { formData }) => {
      e.preventDefault();

      const response = await fetch('/api/theme', {
        method: 'POST',
        body: formData,
      });
      const data: z.infer<typeof ThemeFormSchema> = await response.json();
      setTheme(data.theme);
    },
  });

  return (
    <div className="transition duration-500 starting:-translate-y-2 starting:opacity-0">
      <form {...getFormProps(form)} className="grid place-items-center">
        <button
          type="submit"
          name="theme"
          value={isDark ? 'light' : 'dark'}
          className={cn(
            'ring-brand relative grid h-9 w-16 place-items-center rounded-full bg-zinc-900 bg-gradient-to-r text-white dark:bg-zinc-950 dark:text-black max-md:w-9 dark:max-md:from-indigo-700 dark:max-md:from-0% dark:max-md:via-indigo-700 dark:max-md:to-indigo-600 dark:max-md:to-100%',
            isDark ? 'justify-start pl-1' : 'justify-end pr-1',
          )}
        >
          <motion.div
            layout
            transition={spring}
            whileHover={{
              scale: 1.1,
            }}
          >
            {isDark ? (
              <LightbulbOffIcon className="shadow-xs h-7 w-7 rounded-full bg-indigo-600 p-1 max-md:dark:bg-white" />
            ) : (
              <LightbulbIcon
                className="shadow-xs h-7 w-7 rounded-full bg-indigo-600 p-1"
                strokeWidth={2}
                key="light"
              />
            )}
            <span className="sr-only">{`Toggle ${isDark ? 'light' : 'dark'} mode`}</span>
          </motion.div>
        </button>
      </form>
    </div>
  );
}
