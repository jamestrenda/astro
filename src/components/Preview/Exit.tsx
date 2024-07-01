import { useEffect, useState } from "react";

export default function ExitPreview() {
  const [inIframe, setInIframe] = useState(true);
  useEffect(() => {
    setInIframe(window.self !== window.top);
  }, []);

  return inIframe ? null : (
    <form
      className="pointer-events-auto fixed bottom-0 rounded-lg right-0 z-[9999]"
      action="/api/preview"
      method="POST"
    >
      <button
        className="bg-sky-500 p-4 leading-none font-bold text-white hover:bg-sky-600 transition-colors"
        type="submit"
      >
        Exit Preview Mode
      </button>
    </form>
  );
}
