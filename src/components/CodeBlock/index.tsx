// import {Refractor, registerLanguage} from 'react-refractor';
// import ts from 'refractor/lang/typescript'
import { CodeBlock as CodeBlockComponent } from '~/components/ui/code-block';
// import './styles.css'

// registerLanguage(ts)

export const CodeBlock = (props: {
  language: string;
  code: string;
  highlightedLines: string[];
}) => {
  return (
    <div className="not-prose pointer-events-auto">
      <CodeBlockComponent
        files={[
          {
            title: 'schema.ts',
            language: props.language,
            code: props.code,
            // highlightedLines: props.highlightedLines.map((line) => parseInt(line))
          },
        ]}
        defaultTitle="theme.ts"
        // className="size-[400px]"
      />
    </div>
  );
  // return (
  //   <Refractor
  //     // In this example, `props` is the value of a `code` field
  //     language={props.language}
  //     value={props.code}
  //     markers={props.highlightedLines}
  //   />
  // )
};
