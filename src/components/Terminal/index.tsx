import type React from 'react';
import { useState, useEffect, useRef, JSX } from 'react';
import {
  CommandOutput,
  COMMANDS,
  DEFAULT_HOSTNAME,
  DEFAULT_USER,
  Directory,
  HELP_OUTPUT_VIEW,
  HOME_CONTENT_DIR,
  isHomeDir,
  SupportedCommands,
  TERMINAL_WELCOME_MSG,
  TerminalProps
} from './constants';
import hireMe_md from '../../../blog/Why You Should Hire Me.md';
import Whoami from '../3dView';

const event = new KeyboardEvent('keydown', {
  bubbles: true,
  cancelable: false,
  key: 'Enter'
});

export default function Terminal({ parentStates }: TerminalProps) {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [dirs, setDirs] = useState<Directory>({
    '/': {
      type: 'dir',
      content: {
        home: {
          type: 'dir',
          content: {
            guest: {
              type: 'dir',
              content: HOME_CONTENT_DIR
            }
          }
        }
      }
    },
    '~': {
      type: 'dir',
      content: HOME_CONTENT_DIR
    },
    '~/blog': {
      type: 'dir',
      content: HOME_CONTENT_DIR['blog'].content
    },
    '~/location': {
      type: 'dir',
      content: HOME_CONTENT_DIR['location'].content
    },
    '/home/guest': {
      type: 'dir',
      content: HOME_CONTENT_DIR
    },
    '/home': {
      type: 'dir',
      content: {
        guest: HOME_CONTENT_DIR as never
      }
    }
  });
  const [currDir, setCurrDir] = useState<string>('~');
  const [suggestedCommands, setSuggestedCommands] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = parentStates.currentCommand;
  const [showBlog, handleShowBlog] = parentStates.showBlog;
  const [showResume, setShowResume] = parentStates.showResume;
  const [showWhoami, setShowWhoami] = parentStates.showWhoami;
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    setHistory([
      {
        command: '',
        output: [
          `Jonas' Web Terminal v1.0.0.\n\n`,
          "Type 'help' to see available commands."
        ],
        timestamp: new Date()
      }
    ]);

    // Initiate focus on Terminal input
    handleTerminalClick();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  useEffect(() => {
    inputRef.current?.addEventListener('keydown', (e: Event) => {
      e.target;
    });
  }, [inputRef]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [command, ...args] = trimmedCmd.split(' ');

    let output: string[] = [];
    let outputView: JSX.Element | undefined = undefined;

    switch (command) {
      case '':
        output = [];
        break;
      case 'clear':
        setHistory([]);
        handleShowBlog(undefined);
        return;
      case 'date':
        output = [new Date().toString()];
        break;
      case 'locale':
        if (args[0] === '-a') {
          output = ['pt_BR\n', 'en_US\n', 'fr_FR\n', 'es_ES\n'];
        }
        break;
      case 'echo':
        if (args[0] === '$home') {
          output = ['/home/guest'];
        } else if (args[0] === '$lang') {
          output = ['en_US.UTF-8'];
        } else if (args[0][0] === '$') {
          output = ['\n'];
        } else {
          output = [args.join(' ') || ''];
        }
        break;
      case 'open':
        if (args[0] === 'resume.pdf' && isHomeDir(currDir)) {
          window.open('https://ipenavi.com/assets/resm-dark-en.pdf', '_blank');
        } else if (
          args[0] === '~/resume.html' ||
          (args[0] === 'resume.html' && isHomeDir(currDir))
        ) {
          setShowResume(true);
        } else if (
          args[0] === '~/blog/Why You Should Hire Me.md'.toLocaleLowerCase() ||
          currDir === '~/blog' ||
          currDir === `/home/${DEFAULT_USER}/blog`
        ) {
          handleShowBlog(hireMe_md);
        }
        break;
      case 'whoami':
        setShowWhoami(true);
        outputView = (
          <div className="mt-3 mb-3 flex flex-col">
            <span className="mb-3">Hi there! I'm Jonas 👋</span>

            <span>
              👨‍💻 Computer Curious
            </span>
            <span>
              📍 Based in Toronto, Canada
            </span>
          </div>
        );
        break;
      case 'cat':
        if (args[0] === 'resume.txt' && isHomeDir(currDir)) {
          output = [
            TERMINAL_WELCOME_MSG + '\n\n',
            `Experience in Software Engineering, Development, and Tech. Support – Pragmatic, eager to learn and aspired to enrich and unlock not only my knowledge and potential, but also others.\n\n`,
            `
 ▄▀▀ █▄▀ █ █   █   ▄▀▀       █▀▄ ██▀ █ █     ▄▀▀ ▀█▀ ▄▀▄ ▄▀▀ █▄▀
 ▄██ █ █ █ █▄▄ █▄▄ ▄██       █▄▀ █▄▄ ▀▄▀ ▄   ▄██  █  █▀█ ▀▄▄ █ █
`,
            `[Coding languages]: JavaScript/TypeScript, Java/Scala, Golang, .Net (C#, VB), Bash, SQL, and Python.\n\n`,
            `[Technologies]: Git, Node.js/Next.js, Graphql, React/Angular, jQuery, Jest/Mocha/Jasmine/Karma, HTML, CSS/Sass/Less, Bootstrap, Spring, Maven, Gradle, MySQL/HANA/SQLServer, MongoDB, Kubernetes, Docker, Cloud Foundry, Codepipeline/Travis/Jenkins, AWS/Azure/GCP -  also interested in:  WebAssembly, WebGL, Rust, Flutter, Computer Vision [OpenCV, dLib], and Machine Learning [TensorFlow].\n\n`,
            `
 █▀▄ █▀▄ ▄▀▄ █▀ ██▀ ▄▀▀ ▄▀▀ █ ▄▀▄ █▄ █ ▄▀▄ █     ██▀ ▀▄▀ █▀▄ ██▀ █▀▄ █ ██▀ █▄ █ ▄▀▀ ██▀
 █▀  █▀▄ ▀▄▀ █▀ █▄▄ ▄██ ▄██ █ ▀▄▀ █ ▀█ █▀█ █▄▄   █▄▄ █ █ █▀  █▄▄ █▀▄ █ █▄▄ █ ▀█ ▀▄▄ █▄▄
\n`,
            `Amazon, Toronto - Senior Software Engineer (JUN 2022 - MAR 2025)\n`,
            `   Full stack engineer focused on frontend solutions for Amazon Ads on a DSP application:\n`
          ];
        } else if (
          args[0] === '~/resume.html' ||
          (args[0] === 'resume.html' && isHomeDir(currDir))
        ) {
          output = ['cat: resume.html: Permission denied'];
        } else if (args[0] === '.profile') {
          outputView = (
            <div className="flex flex-col">
              <a href="https://www.linkedin.com/in/blzjns/">
                &gt; https://www.linkedin.com/in/blzjns/
              </a>
              <a href="https://github.com/blzjns">
                &gt; https://github.com/blzjns
              </a>
              <a href="mailto:jonashoehnes@gmail.com">
                &gt; jonashoehnes@gmail.com
              </a>
              <br />
              <button
                className="w-fit"
                onClick={() => handleShowBlog(hireMe_md)}
              >
                Click here to see my resume in HTML!
              </button>
            </div>
          );
        } else {
          output = [`cat: ${args[0] || 'filename'}: No such file or directory`];
        }
        break;
      case 'history':
        output = commandHistory.map((cmd, index) => `${index + 1}  ${cmd}\n`);
        break;
      case 'cowsay':
        const message = args.join(' ') || 'Hello, World!';
        const border = '_'.repeat(message.length + 2);
        output = [
          ` ${border}\n`,
          `< ${message} >\n`,
          ` ${'-'.repeat(message.length + 2)}\n`,
          '        \\   ^__^\n',
          '         \\  (oo)\\_______\n',
          '            (__)\\       )\\/\\\n',
          '                ||----w |\n',
          '                ||     ||\n'
        ];
        break;
      case 'date':
        output = [new Date().toUTCString()];
        break;
      case 'help':
        if (!args[0]) {
          // output = COMMANDS['help'].output!;
          outputView = HELP_OUTPUT_VIEW;
        } else {
          output = [COMMANDS[args[0] as SupportedCommands].description];
        }
        break;
      case 'ls':
        if (
          (args.length === 0 || (args.length > 0 && args[0] === '-a')) &&
          dirs[currDir]?.content
        ) {
          let dirContent = Object.keys(dirs[currDir].content);
          if (args.length === 0) {
            dirContent = Object.keys(dirs[currDir].content).filter(
              (i) => i[0] !== '.'
            );
          }

          outputView = (
            <div>
              {dirContent.map((v) => {
                if (dirs[currDir].content![v].type === 'file') {
                  return <span className="text-white">{v} </span>;
                }

                return <span className="text-blue-400 font-bold">{v} </span>;
              })}
            </div>
          );
        } else if (
          args.length > 0 &&
          (args[0] === '-l' || args[0] === '-la') &&
          dirs[currDir]?.content
        ) {
          let dirContent = Object.keys(dirs[currDir].content);
          if (args[0] === '-l') {
            dirContent = Object.keys(dirs[currDir].content).filter(
              (i) => i[0] !== '.'
            );
          }
          outputView = (
            <div className="flex flex-col">
              <table className="xl:max-w-[40%]">
                <tr>
                  <th className="font-normal text-left">
                    total {dirContent.length}
                  </th>
                </tr>
                {dirContent.map((v) => {
                  const randomPID = Math.floor(Math.random() * 9);
                  const randomContentSize = Math.floor(Math.random() * 7000);
                  const date = new Date();
                  const month = date.toLocaleString('default', {
                    month: 'short'
                  });
                  const day = date.toLocaleString('default', {
                    day: 'numeric'
                  });
                  const hours = date.getHours();
                  const minutes = date.getMinutes();
                  const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

                  let permissionStr = 'drwxr-xr-x';
                  let color = 'text-blue-400 font-bold';
                  if (dirs[currDir].content![v].type === 'file') {
                    permissionStr = '-rw-rw-r--';
                    if (v === 'resume.html') {
                      permissionStr = '----------';
                    }
                    color = 'text-white font-normal';
                  }

                  return (
                    <>
                      <tr>
                        <td className="w-[205px]">
                          {permissionStr} {randomPID} {DEFAULT_USER}{' '}
                          {DEFAULT_USER}
                        </td>
                        <td className="w-[40px] text-right">
                          {randomContentSize}
                        </td>
                        <td className="w-[35px] text-center">{month}</td>
                        <td className="w-[15px] text-right">{day + ' '}</td>
                        <td>
                          {time} <span className={color}>{v}</span>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </table>
            </div>
          );
        } else if (args[0] === '--help') {
          output = [
            'Usage: ls [FILE]...\n',
            'List information about the FILEs (the current directory by default).'
          ];
        } else if (args.length > 0 && args[0][0] === '-') {
          output = [`ls: invalid option -- '${args[0].substring(1)}'`];
        }
        break;
      case 'pwd':
        const absCurrDir =
          currDir[0] !== '~'
            ? currDir
            : `/home/guest/${currDir.replace('~/', '')}`;
        output = [absCurrDir];
        break;
      case 'cd':
        if (args[0]?.lastIndexOf('/') === args[0]?.length - 1) {
          args[0] = args[0].substring(0, args[0].length - 1);
        }

        if (args[0] === '..' && currDir !== '/') {
          if (currDir === '~') {
            setCurrDir('/home');
          } else {
            const prevDir = currDir.substring(0, currDir.lastIndexOf('/'));
            setCurrDir(prevDir);
          }
        } else if (dirs[args[0]]) {
          setCurrDir(args[0]);
        } else if (dirs[`${currDir}/${args[0]}`]) {
          setCurrDir(`${currDir}/${args[0]}`);
        } else if (dirs[`/${args[0]}`]) {
          setCurrDir(`/${args[0]}`);
        } else if (dirs[`~/${args[0]}`]) {
          setCurrDir(`~/${args[0]}`);
        } else {
          output = [`cd: ${args[0]}: No such file or directory`];
        }
        break;
      case 'mkdir':
        const newDir: string =
          currDir !== '/' ? `${currDir}/${args[0]}` : `/${args[0]}`;

        dirs[currDir].content![args[0]] = {
          type: 'dir',
          content: {}
        };
        dirs[newDir] = {
          type: 'dir',
          content: {}
        };
        setDirs({ ...dirs });

        break;
      default:
        if (COMMANDS[command as keyof typeof COMMANDS]) {
          output = COMMANDS[command as keyof typeof COMMANDS].output!;
          outputView = COMMANDS[command as keyof typeof COMMANDS].outputView;
        } else {
          output = [`${command}: command not found`];
        }
    }

    const newEntry: CommandOutput = {
      command: cmd,
      output,
      outputView,
      currDir,
      timestamp: new Date()
    };

    setHistory((prev) => [...prev, newEntry]);

    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd.trim()]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(currentCommand);
    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestedCommands.length > 0) {
      setSuggestedCommands([]);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(COMMANDS);
      const dirContent =
        dirs[currDir].content! && Object.keys(dirs[currDir].content);

      const currentCommandTokens = currentCommand.toLowerCase().split(' ');
      const matches = [...availableCommands, ...dirContent].filter((cmd) => {
        if (!!currentCommandTokens[1] || currentCommandTokens.length > 1) {
          return (
            !COMMANDS[cmd as SupportedCommands] &&
            cmd.startsWith(currentCommandTokens[1])
          );
        }

        return cmd.startsWith(currentCommandTokens[0]);
      });

      if (matches.length === 1) {
        if (!!currentCommandTokens[1]) {
          setCurrentCommand(`${currentCommandTokens[0]} ${matches[0]}`);
        } else if (
          !!COMMANDS[currentCommandTokens[0] as SupportedCommands] &&
          !currentCommandTokens[1] &&
          !!matches[0]
        ) {
          setCurrentCommand(`${currentCommandTokens[0]} ${matches[0]}`);
        } else if (currentCommandTokens.length === 1) {
          setCurrentCommand(matches[0]);
        }
      } else if (matches.length >= 1) {
        setSuggestedCommands(matches);
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    // <div className="xl:w-screen h-fit border-2 border-solid border-green-300 bg-black text-green-400 font-mono text-sm overflow-hidden">
    <div className="h-fit border-2 border-solid border-green-300 bg-black text-green-400 font-mono text-sm overflow-hidden">
      <div
        ref={terminalRef}
        className="overflow-y-auto p-4 cursor-text"
        onClick={handleTerminalClick}
      >
        <div className="space-y-1">
          {history.map((entry, index) => (
            <div key={index}>
              {entry.command && (
                <div className="flex items-center">
                  <span className="text-green-500">{`${DEFAULT_USER}@${DEFAULT_HOSTNAME}`}</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">{entry.currDir}</span>
                  <span className="text-white">$&nbsp;</span>
                  <span className="text-white">{entry.command}</span>
                </div>
              )}
              <div className="xl:whitespace-pre-wrap md:whitespace-pre-wrap whitespace-pre text-white">
                {entry.outputView ?? entry.output}
              </div>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-500">{`${DEFAULT_USER}@${DEFAULT_HOSTNAME}`}</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">{currDir}</span>
            <span className="text-white">$&nbsp;</span>
            <input
              id="terminalInput"
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-green-400"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="animate-pulse text-green-400">█</span>
          </form>

          {suggestedCommands.length > 1 && (
            <span className="text-white">{suggestedCommands.join(' ')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
