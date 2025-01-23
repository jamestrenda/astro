import { useEffect, useState } from 'react';

export default function ExitPreview() {
  const [inIframe, setInIframe] = useState(true);
  useEffect(() => {
    setInIframe(window.self !== window.top);
  }, []);

  return inIframe ? null : (
    <form
      className="z-9999 pointer-events-auto fixed bottom-0 right-0 rounded-lg"
      action="/api/preview"
      method="POST"
    >
      <button
        className="bg-sky-500 p-4 font-bold leading-none text-white transition-colors hover:bg-sky-600"
        type="submit"
      >
        Exit Preview Mode
      </button>
    </form>
  );
}
