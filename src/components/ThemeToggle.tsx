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
            'ring-brand grid h-9 w-16 place-items-center rounded-full border-4 border-solid border-black bg-foreground text-white dark:border-primary dark:bg-primary dark:text-background max-md:w-9',
            isDark ? 'justify-start' : 'justify-end',
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
              <LightbulbOffIcon className="shadow-xs h-7 w-7 rounded-full bg-white p-1" />
            ) : (
              <LightbulbIcon
                className="shadow-xs h-7 w-7 rounded-full bg-primary p-1"
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
