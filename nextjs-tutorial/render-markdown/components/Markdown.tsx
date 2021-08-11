/* eslint-disable react/no-children-prop */

import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { NormalComponents, SpecialComponents } from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Head from 'next/head';
interface IProps {
  content: string;
  title: string;
}

const Markdown: FC<IProps> = ({ content, title }) => {
  const components: Partial<NormalComponents & SpecialComponents> = {
    // @ts-ignore
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');

      return !inline && match ? (
        <SyntaxHighlighter
          style={prism}
          PreTag="div"
          language={match[1]}
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
      ) : (
        <code className={className ? className : ''} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="markdown-body">
        <ReactMarkdown components={components} children={content} />
      </div>
    </>
  );
};

export default Markdown;
