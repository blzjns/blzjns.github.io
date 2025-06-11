import Button from '../Button';

import logo from '../../logo.svg';
import profilePic from '../../profilePic.jpg';
import hireMe_md from '../../../blog/Why You Should Hire Me.md';
import { AppStates } from '@/App';
import { useEffect, useState } from 'react';

const focusOnTerminalInput = () =>
  document.getElementById('terminalInput')?.focus();

export default function Sidebar({ parentStates }: { parentStates: AppStates }) {
  const [, setShowResume] = parentStates.showResume;
  const [, handleShowBlog] = parentStates.showBlog;
  const [, setCurrentCommand] = parentStates.currentCommand;
  const [clientWidth, setClientWidth] = useState(document?.body?.clientWidth);
  const blogLinkCSS = clientWidth > 1280 ? 'visible' : 'hidden';
  const logoCSS = clientWidth > 1280 ? '' : 'w-screen';

  const [logoSrc, setLogoSrc] = useState<string>(logo);
  const [showProfilePic, setShowProfilePic] = useState(false);

  useEffect(() => {
    window.onresize = function (evt: any) {
      setClientWidth((evt.srcElement || evt.currentTarget).innerWidth);
    };
  }, []);

  return (
    <div
      id="sidebar"
      className={`xl:h-auto xl:flex xl:flex-col mb-3 xl:mr-5 pr-5 xl:border-r-1 xl:border-r-white`}
    >
      <div
        onMouseOut={() => setShowProfilePic(false)}
        onMouseOver={() => setShowProfilePic(true)}
        className={`flex justify-center mb-3 hover:animate-pulse ${logoCSS}`}
      >
        {!showProfilePic ? (
          <span className="flex">
            <img src={logoSrc} className="w-30"></img>{' '}
            <span className="font-bold ml-[-20px] mt-[30%]">blzjns</span>
          </span>
        ) : (
          <img
            src={profilePic}
            className="w-30 border-5 border-b-indigo-700 rounded-full"
          ></img>
        )}
      </div>
      <Button onClick={() => setShowResume(false)}>Terminal</Button>
      <Button
        onClick={() => {
          setShowResume(true);
        }}
      >
        Resume
      </Button>
      <Button
        onClick={() => {
          setShowResume(false);
          setCurrentCommand('cd ~/blog');
          focusOnTerminalInput();
        }}
      >
        Blog
      </Button>
      <ul className={`${blogLinkCSS} list-[square] ml-5 mb-5`}>
        <li>
          <a
            onClick={() => {
              setShowResume(false);
              handleShowBlog(hireMe_md);
            }}
          >
            Why You Should Hire Me
          </a>
        </li>
      </ul>
      <Button
        onClick={() => {
          setShowResume(false);
          setCurrentCommand('whoami');
          focusOnTerminalInput();
        }}
      >
        Bio
      </Button>
    </div>
  );
}
