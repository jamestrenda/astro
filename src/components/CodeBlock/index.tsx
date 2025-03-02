import '@fontsource/jetbrains-mono';
import { Refractor, registerLanguage } from 'react-refractor';
import ts from 'refractor/lang/typescript';
import './styles.css';

registerLanguage(ts);

export const CodeBlock = (props: {
  language: string;
  code: string;
  highlightedLines?: string[];
}) => {
  return (
    <div className="not-prose pointer-events-auto">
      <Refractor
        className="my-0! overflow-x-auto *:font-mono"
        language={props.language}
        value={props.code}
        markers={
          Array.isArray(props.highlightedLines)
            ? props.highlightedLines.map((line) => parseInt(line))
            : undefined
        }
        // className="size-[400px]"
      />
    </div>
  );
};
