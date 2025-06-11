import { JSX } from 'react';

export type CommandOutput = {
  command: string;
  currDir?: string;
  output: string[];
  outputView?: JSX.Element;
  timestamp: Date;
};

export type SupportedCommands =
  | 'help'
  | 'clear'
  | 'date'
  | 'ls'
  | 'cd'
  | 'mkdir'
  | 'cat'
  | 'echo'
  | 'pwd'
  | 'uname'
  | 'history'
  | 'cowsay'
  | 'whoami'
  | 'open';

type Commands = {
  [key in SupportedCommands]: {
    description: string;
    output?: string[];
    outputView?: JSX.Element;
  };
};

export const isHomeDir = (dir: string) => {
  // remove dir path suffix '/'
  if (dir.lastIndexOf('/') === dir.length - 1) {
    dir = dir.substring(0, dir.length - 1);
  }

  return dir === '~' || dir === '/home/guest';
};

export const COMMANDS: Commands = {
  help: {
    description: 'Show available commands.'
  },
  open: {
    description: 'Open .html, .md and .pdf files'
  },
  clear: {
    description: 'Clear the terminal screen.'
  },
  whoami: {
    description: 'Display user info.',
    // output: [
    //   `Hey there! 👋 I'm Jonas.\n\nComputer Curious/Software Engineer based in Toronto, Canada 📍`
    // ],
    outputView: (
      <div>
        Hey there! 👋 I'm Jonas.
        <br />
        <br />
        Computer Curious/Software Engineer based in Toronto, Canada 📍
      </div>
    )
  },
  date: {
    description: 'Show current date time.'
  },
  pwd: {
    description: 'Print working directory',
    output: ['/home/guest']
  },
  ls: {
    description: 'List directory contents.',
    output: [
      'total 8',
      'drwxr-xr-x  2 guest guest 4096 Dec  5 16:24 documents',
      'drwxr-xr-x  2 guest guest 4096 Dec  5 16:24 downloads',
      '-rw-r--r--  1 guest guest  220 Dec  5 16:24 .bashrc',
      '-rw-r--r--  1 guest guest  807 Dec  5 16:24 .profile',
      '-rw-r--r--  1 guest guest   42 Dec  5 16:24 welcome.txt'
    ]
  },
  cd: {
    description: `Change the shell working directory.\nThe default DIR is the value of the HOME shell variable.`
  },
  uname: {
    description: 'Print system information',
    output: [navigator?.userAgent]
  },
  cat: {
    description: 'Concatenate files and print on the standard output'
  },
  mkdir: {
    description: 'Make directories'
  },
  cowsay: {
    description: 'Display a cow on the standard output'
  },
  echo: {
    description: 'Print a line of text'
  },
  history: {
    description: 'History Library'
  },
};

export const HELP_OUTPUT_VIEW = (
  <table>
    {Object.keys(COMMANDS).map((v, i) => (
      <tr>
        <td className="w-[80px]">{v}</td>
        <td className="xl:whitespace-nowrap md:whitespace-nowrap">
          - {COMMANDS[v as SupportedCommands].description}
        </td>
      </tr>
    ))}
  </table>
);

export type Directory = {
  [key: string]: {
    type: 'file' | 'dir';
    content?: Directory;
  };
};

// const homeContent = ['resume', 'location'];s
export const HOME_CONTENT_DIR: Directory = {
  'resume.html': {
    type: 'file'
  },
  'resume.pdf': {
    type: 'file'
  },
  'resume.txt': {
    type: 'file'
  },
  '.profile': {
    type: 'file'
  },
  location: {
    type: 'dir',
    content: {
      Toronto: {
        type: 'file'
      }
    }
  },
  blog: {
    type: 'dir',
    content: {
      'Why You Should Hire Me.md': {
        type: 'file'
      }
    }
  }
};

export interface TerminalProps {
  parentStates: {
    [key: string]: any;
  }
}

// const profileTerminalOutput = [`https://www.linkedin.com/in/blzjns/`];

export const dirRegex = /\/.*\/[a-z0-9]*/i;

export const TERMINAL_WELCOME_MSG = `
                                                                               ▄▄                           
   ▀████▀                                      ▀████▀  ▀████▀▀                ███                           
     ██                                          ██      ██                    ██                           
     ██   ▄██▀██▄▀████████▄  ▄█▀██▄  ▄██▀███     ██      ██    ▄██▀██▄  ▄▄█▀██ ███████▄ ▀████████▄   ▄▄█▀██ 
     ██  ██▀   ▀██ ██    ██ ██   ██  ██   ▀▀     ██████████   ██▀   ▀██▄█▀   ████    ██   ██    ██  ▄█▀   ██
     ██  ██     ██ ██    ██  ▄█████  ▀█████▄     ██      ██   ██     ████▀▀▀▀▀▀██    ██   ██    ██  ██▀▀▀▀▀▀
███  ██  ██▄   ▄██ ██    ██ ██   ██  █▄   ██     ██      ██   ██▄   ▄████▄    ▄██    ██   ██    ██  ██▄    ▄
 █████    ▀█████▀▄████  ████▄████▀██▄██████▀   ▄████▄  ▄████▄▄ ▀█████▀  ▀█████▀███  ████▄████  ████▄ ▀█████▀
`;

export const DEFAULT_USER = 'guest';
export const DEFAULT_HOSTNAME = 'terminal-web';
