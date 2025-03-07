import { PlayIcon } from 'lucide-react';
import { useState } from 'react';
import ReactPlayer from 'react-player/wistia';
import type { Video as Props } from '~/types/video';
import { cn } from '~/utils/misc';
export const Video = ({ id, hashed_id, thumbnailAltText }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying(true);
  };
  return (
    <div className="group relative h-full w-full">
      <div
        className={cn(
          'absolute inset-0 z-20 flex cursor-pointer items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          isPlaying ? 'hidden' : 'flex',
        )}
        onClick={play}
      >
        <PlayIcon className="h-12 w-12" />
      </div>
      <ReactPlayer
        url={`https://fast.wistia.com/embed/${hashed_id}`}
        width="100%"
        height="100%"
        playing={isPlaying}
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
