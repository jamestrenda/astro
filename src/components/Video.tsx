import { Loader2, PlayIcon } from 'lucide-react';
import { useState } from 'react';
import ReactPlayer from 'react-player/wistia';
import type { Video as Props } from '~/types/video';
import { cn } from '~/utils/misc';
export const Video = ({ id, hashed_id, thumbnailAltText }: Props) => {
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying(true);
  };
  return (
    <div className="group relative h-full w-full">
      <div
        className={cn(
          'absolute inset-0 z-20 flex cursor-pointer items-center justify-center text-background dark:text-foreground',
          isPlaying ? 'hidden' : 'flex',
          ready ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        onClick={ready ? play : undefined}
      >
        {ready ? (
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/80 transition duration-300 group-hover:bg-primary">
            <PlayIcon className="h-6 w-6" />
          </div>
        ) : (
          <Loader2 className="h-6 w-6 animate-spin" />
        )}
      </div>
      <ReactPlayer
        url={`https://fast.wistia.com/embed/${hashed_id}`}
        width="100%"
        height="100%"
        playing={isPlaying}
        onReady={() => setReady(true)}
        config={{
          options: {
            // controlsVisibleOnLoad: true,
            thumbnailAltText,
            smallPlayButton: true,
            playbar: true,
            fullscreenButton: true,
            volumeControl: true,
            settingsControl: true,
          },
        }}
        style={{
          backgroundColor: 'var(--color-zinc-900)',
        }}
      />
    </div>
  );
};
