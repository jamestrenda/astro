export function Description({
  title = "What's this?",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <details>
      <summary>{title} 👀</summary>
      {children}
    </details>
  );
}
