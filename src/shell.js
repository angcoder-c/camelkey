import readline from "node:readline";
import { command2args } from "./utils/funcs.js";
import { wellcome } from "./utils/commands/config.js";
import { LocalDB } from "./db.js";

export class Shell {
    constructor(program) {
        this.program = program;
        this.supportedCommands = [
            'help'
        ]
        this.interfaceInfo = {
            input: process.stdin,
            output: process.stdout,
            prompt: 'camelkey> ',
            terminal: true,
            completer: line => {
                var hits = this.supportedCommands.filter(
                    c => Shell.completerFilter(c, line)
                );
                return [hits.length ? hits : '', line];
            }
        }
    }

    static completerFilter (command, line) {
        if (command.indexOf(line) == 0 && line) {
            return command.length === line.length ? false : true;
        }
        return false;
    }

    static processCommand(program, term, command) {
        if (!command) return process.argv;
        const args = command2args(command);
        try {
            program.parse(args);
            term.setPrompt('')
        } catch (e) { }
    }

    run() {
        const intrl = readline.createInterface(this.interfaceInfo);
        
        console.log(wellcome(true))
        intrl.prompt();
        new LocalDB();

        intrl.on('line', command => {
            Shell.processCommand(this.program, intrl, command);
            intrl.prompt();
            intrl.setPrompt(this.interfaceInfo.prompt)
        });
        intrl.on('close', () => {
            console.log('\nBy');
            process.exit(0);
        });
    }
}