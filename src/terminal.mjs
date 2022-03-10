import debounce from "./util/debounce.mjs";

export class Terminal extends HTMLElement {

    // default Terminal state
    #state = {
        // fs -> fileSystem
        fs: {
            pwd: null,
            errorHandler: function (event) {

                // Case
                var msg = 'ai meu xuxuzinho' + event;
                switch (event.code) {
                    case DOMException.QUOTA_EXCEEDED_ERR:
                        msg = 'QUOTA_EXCEEDED_ERR';
                        break;
                    case DOMException.NOT_FOUND_ERR:
                        msg = 'NOT_FOUND_ERR';
                        break;
                    case DOMException.SECURITY_ERR:
                        msg = 'SECURITY_ERR';
                        break;
                    case DOMException.INVALID_MODIFICATION_ERR:
                        msg = 'INVALID_MODIFICATION_ERR';
                        break;
                    case DOMException.INVALID_STATE_ERR:
                        msg = 'INVALID_STATE_ERR';
                        break;
                    default:
                        msg = 'Unknown Error';
                        break;
                }

                // Log
                console.log('Filesystem Error: ' + msg);
            }
        },
        input: null,
        output: {}
    };

    #dom = {};
    #history = [' ']; // an stack to manage history
    #historyAtIndex = 1;

    constructor() {
        super();

        this.setState = fs => {
            this.#state.fs.pwd = fs.root;
        }

        // Create FileSystem
        window.requestFileSystem(window.TEMPORARY, 1024 * 1024, this.setState, this.#state.fs.errorHandler);

        const template = document.getElementById('terminal-template').content;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));

        let output = shadowRoot.getElementById('output'); // console output
        let currPwd = shadowRoot.getElementById('currPwd'); // console input
        let input = shadowRoot.getElementById('cmdline'); // console input

        this.#dom.input = input;
        this.#dom.output = output;
        this.#dom.currPwd = currPwd;

        this.#setInputHandlers();
        this.#setOutputHandlers();
    }

    #setInputHandlers = () => {
        // this.handleInput = this.#handleInput.bind(this);
        // this.#dom.input.onkeydown = debounce(this.#handleHistory.bind(this), 337);
        this.#dom.input.onkeypress = debounce(this.#handleInput.bind(this), 401);
        this.#dom.input.onkeydown = this.#dom.input.onkeyup = debounce(this.#handleHistory.bind(this), 337);

        // this.#dom.input.onkeyup = function(e) {
        //     console.log('yeyyyyyyyyy', e)
        // }

        // this.#dom.input.onkeydown = function(e) {
        //     console.log('yooooooooooo', e)
        // }
    };

    #setOutputHandlers = () => {
        const input = this.#dom.input;
        const output = this.#dom.output;

        this.#state.output.write = (stdout) => {

            this.#history.push(input.value);

            const currPwd = this.#dom.currPwd;
            let fromContent = output.innerHTML;

            fromContent += '<div class="cmd-output">';
            fromContent += `<div id="prompt" class="${stdout.code != 0 ? 'error' : 'success'}"><span class="currPwd">${currPwd.innerHTML || '/'}</span>&nbsp;$ ${input.value}</div>`;
            fromContent += "<br />";
            fromContent += stdout.msg;
            // fromContent += "<br />";
            fromContent += '</div>';

            output.innerHTML = fromContent;
            input.value = '';
            currPwd.innerHTML = this.#state.fs.pwd.fullPath;

            return this;
        };

        this.#state.output.clear = () => {
            this.#history.unshift('clear');
            
            output.innerHTML = '';
            input.value = '';
        }
    }

    #handleHistory = (event) => {
        if (event.key == 'l' && event.ctrlKey) {
            this.#state.output.clear();
        }
        else if (event.key == 'c' && event.ctrlKey) {
            this.#state.output.write(new Stdout(1, ''))
        }
        else if (event.key == 'ArrowUp') {
            let lastCmd = this.#history.pop();

            const input = this.#dom.input;
            input.value = lastCmd;

            this.#history.unshift(lastCmd);
        }
        else if (event.key == 'ArrowDown') {
            let lastCmd = this.#history.shift();

            const input = this.#dom.input;
            input.value = lastCmd;

            this.#history.push(lastCmd);
        }
    }

    #handleInput = (event) => {
        if (event.key == 'Enter') {
            const input = event.srcElement.shadowRoot.activeElement.shadowRoot.getElementById('cmdline');

            // Check Command Empty
            if (!input.value) return false;

            // Command
            var inputParse = input.value.split(' ');
            var command = inputParse[0].toLowerCase();

            this.#state.input = inputParse;

            // run Command
            return new Command(command, this.#state);
        }
    }
}

// const hashCode = (str) => {
//     let hash = 0;

//     if (str.length === 0) return hash;

//     for (let i = 0; i < str.length; i++) {
//         let chr = str.charCodeAt(i);
//         hash = ((hash << 5) - hash) + chr;
//         hash |= 0; // Convert to 32bit integer
//     }

//     return hash;
// }

class Stdout {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }
}

class Command {
    #state = null;

    constructor(cmd, state) {
        this.cmd = cmd;
        this.setState(state);

        if (cmd && state) this.invoke(); // self invoke on create
    }

    setState = state => this.#state = state;

    invoke(cmd) {
        if (cmd && this[cmd] != null) return this[cmd].call(this);
        else if (this[this.cmd] != null) return this[this.cmd].call(this);

        return this.#state.output.write(new Stdout(1, `${this.cmd}: command not found`));
    }

    cmdOptions(...optNums) {
        let optionsAreValid;
        const optVals = optNums.map((optNum) => {
            optionsAreValid = this.#state && this.#state.input && this.#state.input[optNum] != null;

            return this.#state && this.#state.input && this.#state.input[optNum];
        });

        return {
            allValid: optionsAreValid,
            values: optVals
        }
    }

    //#region Commands 
    ls() {
        return this.#state.fs.pwd.createReader().readEntries((fileEntries) => {
            // Ls Options
            const lsClass = this.cmdOptions(1).values[0] == '-l' ? 'filesystem-ls-l' : 'filesystem-ls';

            // Content
            let content = '<div class="' + lsClass + '">';

            // Iterator
            for (let file of fileEntries) content += `<span class="is-${!!file.isFile ? 'file' : 'dir'}">${file.name}</span>`;

            content += '</div>';

            // Output
            this.#state.output.write(new Stdout(0, content, this.#state.fs.pwd.fullPath));
        }, this.#state.fs.errorHandler);
    }

    mkdir() {
        // Check Params
        if (!this.cmdOptions(1).allValid) {
            return this.#state.output.write(new Stdout(1, 'Parameters missing, make this thing right'));
        }

        // Add Dir
        return this.#state.fs.pwd.getDirectory(this.#state.input[1], { create: true }, function () { }, this.#state.fs.errorHandler);
    }

    touch() {
        const opts = this.cmdOptions(1);
        const $1 = opts.values[0];

        // Check Params
        if (!opts.allValid) {
            return this.#state.output.write(new Stdout(1, 'Parameters missing, make this thing right'));
        }

        // Touch File
        this.#state.fs.pwd.getFile($1, { create: true, exclusive: true }, (file) => console.log('Created file: ', file), this.#state.fs.errorHandler);
    }

    vi() {
        const $1 = this.cmdOptions(1).values[0];

        if (!$1) {
            return this.#state.output.write(new Stdout(1, ''));
        }

        this.#state.fs.pwd.getFile($1, {}, (fileEntry) => {
            fileEntry.file(fileObj => fileObj.text()
                .then(fileTxt => this.#state.output.write(new Stdout(0, fileTxt)))
                .catch(err => console.error(err)),
                err => console.error(err)
            );

        }, this.#state.fs.errorHandler);

    }

    cat() {
        let $optVals = this.cmdOptions(1).values;
        let $1 = $optVals[0];

        // Check Params
        if ($1 == null) {
            return this.#state.output.write(new Stdout(1, 'Parameters missing, make this thing right'));
        }

        // Touch File
        this.#state.fs.pwd.getFile($1, { create: true }, (file) => {
            file.createWriter((fileWriter) => {
                const blob = new Blob(['a very cool text I wrote myseld wohoooo'], { type: "text/plain" });

                fileWriter.write(blob);

                return this.#state.output.write(new Stdout(0, '', this.#state.fs.pwd.fullPath));
            }, (fileError) => console.error('un errororor' + fileError));



        }, this.#state.fs.errorHandler);
    }

    cd() {
        const optVals = this.cmdOptions(1);
        const $nums = optVals ? optVals.values : [null, null];
        let $1 = $nums[0];

        if (!$1) return this.#state.output.write(new Stdout(1, 'Parameters missing, make this thing right'));

        // Add directory pointer
        this.#state.fs.pwd.getDirectory($1, {},
            // Success
            (dirEntity) => {

                this.#state.fs.pwd = dirEntity;

                return this.#state.output.write(new Stdout(0, ''));
            },
            // Error
            (err) => {
                if (err.name === 'NotFoundError' || err.code === 8) {
                    return this.#state.output.write(new Stdout(1, `cd: no such file or directory: ${$1}`, this.#state.fs.pwd.fullPath));
                }

                console.warn(err);
            }
        );
    }

    rm() {
        const optVals = this.cmdOptions(1, 2);
        const $nums = optVals ? optVals.values : [null, null];
        let $1 = $nums[0];
        let $2 = $nums[1];

        if (!$1) {
            return this.#state.output.write(new Stdout(1, 'Parameters missing, make this thing right'));
        }

        this.#state.fs.pwd.getFile($1, {}, (fileEntry) => {
            const removeFn = $1 == '-R' ? 'removeRecursively' : 'remove';

            fileEntry[removeFn](
                () => this.#state.output.write(new Stdout(0, '', this.#state.fs.pwd.fullPath)),
                this.#state.fs.errorHandler
            );
        });
    }

    mv() {
        return this.#state.output.write(new Stdout(1, 'Not implemented'));
    }

    clear() {
        return this.#state && this.#state.output && this.#state.output.clear();
    }

    help() {
        var helpContent = '';
        helpContent += '<div><strong>cd</strong>     [cd "dir"] [cd ..]         | Navigate on directories</div>';
        helpContent += '<div><strong>clear</strong>  [clear]                    | Clear the display</div>';
        helpContent += '<div><strong>ls</strong>     [ls] [ls -l]               | List files and directories</div>';
        helpContent += '<div><strong>mkdir</strong>  [mkdir "dir name"]         | Create new directory</div>';
        helpContent += '<div><strong>mv</strong>     [mv "to" "from"]           | Move the files or directories</div>';
        helpContent += '<div><strong>touch</strong>  [touch "file name"]        | Touch new file</div>';
        helpContent += '<div><strong>rm</strong>     [rm "file"] [rm -R "dir"]  | Remove files and directories</div>';

        return this.#state && this.#state.output && this.#state.output.write(new Stdout(0, helpContent));
    }
    //#endregion
}



