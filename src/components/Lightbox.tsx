import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useId } from 'react';
import { cn } from '~/utils/misc';

interface LightboxProps {
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeButtonClassName?: string;
  contentClassName?: string;
}

export function Lightbox({
  children,
  className,
  overlayClassName,
  closeButtonClassName,
  contentClassName,
}: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxId = useId();
  const descriptionId = useId();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // Handle keyboard navigation and accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Focus the close button when lightbox opens
      closeButtonRef.current?.focus();
      // Add overflow-hidden class to body
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <>
      {/* Clickable content that opens the lightbox */}
      <motion.div
        layoutId={`lightbox-container-${lightboxId}`}
        onClick={() => open()}
        className={cn('cursor-pointer overflow-hidden', className)}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
          }
        }}
      >
        <motion.div layoutId={`lightbox-content-${lightboxId}`}>
          {children}
        </motion.div>
      </motion.div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50"
            aria-labelledby={descriptionId}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn('fixed inset-0 bg-black/80', overlayClassName)}
              onClick={() => close()}
            />

            <div className="fixed inset-0 isolate z-10 p-4">
              {/* Close button */}
              <motion.button
                ref={closeButtonRef}
                className={cn(
                  'absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none',
                  closeButtonClassName,
                )}
                onClick={() => close()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Lightbox content with layout animation */}

              <motion.div
                layoutId={`lightbox-container-${lightboxId}`}
                className={cn(
                  'absolute inset-0 grid place-items-center overflow-hidden',
                  contentClassName,
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  layoutId={`lightbox-content-${lightboxId}`}
                  className="mx-auto w-full max-w-7xl place-items-center overflow-y-auto"
                >
                  {children}
                </motion.div>
              </motion.div>

              {/* Hidden description for screen readers */}
              <div className="sr-only" id={descriptionId}>
                Image lightbox. Press Escape to close.
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
