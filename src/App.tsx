import { useEffect, useRef, useState } from 'react';
import { MarkdownHooks } from 'react-markdown';

import './index.css';
import Terminal from './components/Terminal';
import Resume from './components/Resume';
import Sidebar from './components/Sidebar';

import logo from './logo.svg';
import mdFile from '../blog/Why you should hire me.md';
import _3dView from './components/3dView';

export type AppStates = {
  [key in 'showBlog' | 'showResume' | 'currentCommand' | 'showWhoami']: [
    unknown,
    Function
  ];
};

export function App() {
  const mainViewRef = useRef(null);
  const _3dViewRef = useRef(null);
  const [showResume, setShowResume] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showWhoami, setShowWhoami] = useState(false);
  const blurApp = !!showWhoami ? 'blur-[5px]' : '';
  const _3dViewClassName = !!showWhoami ? 'z-10' : '';
  const [markdownTxt, setMarkdownTxt] = useState<string>();
  const [currentCommand, setCurrentCommand] = useState('');
  const handleShowBlog = (url: string) => {
    setShowBlog(false);

    if (!!url) {
      fetch(url)
        .then(async (res) => await res.text())
        .then((mdTxt) => {
          setMarkdownTxt(mdTxt);
          setShowBlog(true);
        });
    }
  };
  const sharedStates: AppStates = {
    currentCommand: [currentCommand, setCurrentCommand],
    showBlog: [showBlog, handleShowBlog],
    showResume: [showResume, setShowResume],
    showWhoami: [showWhoami, setShowWhoami]
  };

  useEffect(() => {
    fetch(mdFile)
      .then(async (res) => await res.text())
      .then((mdTxt) => setMarkdownTxt(mdTxt));
  }, []);

  return (
    <div>
      {showWhoami && (
        <div
          ref={_3dViewRef}
          className={`${_3dViewClassName} absolute w-screen h-screen`}
        >
          <_3dView
            callbackFn={() => {
              // Hide _3dView after 10 seconds
              setTimeout(() => {
                setShowWhoami(false);
              }, 10000);
            }}
            selfRef={_3dViewRef}
            targetViewRef={mainViewRef}
          />
        </div>
      )}
      <div
        ref={mainViewRef}
        className={`xl:flex xs:flex-col w-full p-5 ${blurApp}`}
      >
        <Sidebar parentStates={sharedStates} />
        <main className={`xl:w-screen`}>
          {!showResume && <Terminal parentStates={sharedStates} />}

          {!showResume && showBlog && (
            <div id="mdContent" className="mdContent">
              <MarkdownHooks>{markdownTxt}</MarkdownHooks>
            </div>
          )}

          {showResume && <Resume />}
        </main>
      </div>
    </div>
  );
}

export default App;
