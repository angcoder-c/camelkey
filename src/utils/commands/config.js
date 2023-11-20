import { Command } from "commander";
import { blue, red, bgGreen, green} from '../colors.js';
import figlet from "figlet";

export function factory(name = '', usage = '') {
    const program = (
        name ?
            new Command(name) :
            new Command()
    )

    program
    .configureOutput({
        outputError: (str, write) => write(red(str)),
    })
    .configureHelp({
        subcommandTerm: (cmd) => blue(cmd.name()),
        subcommandDescription: (cmd) => blue(cmd.description()),
        optionTerm: (cmd) => blue(cmd.flags + ', ' + cmd.name()),
        optionDescription: (cmd) => blue(cmd.description),
        commandUsage: (cmd) => blue(cmd.name() + ' ' + cmd.usage()),
        commandDescription: (cmd) => blue(cmd.description()),
        argumentTerm : (cmd) => blue(cmd.name()),
        argumentDescription : (cmd) => blue(cmd.description())
    })
    .allowExcessArguments(false)
    .showSuggestionAfterError(true)
    .exitOverride()

    return program
}

export function wellcome (tab=false) {
    const txt = figlet.textSync("Camel key",{ font: "chunky" }).split('\n')

    let len = txt.length
    let subtitle = 'Password Manager'

    txt[len-1] = bgGreen(subtitle) + txt[len-1].slice(
        subtitle.length, 
        txt[len-1].length
    );

    let data = (
        txt.map( ln => tab ? '\t' + ln :  ln)
    )
    .join('\n')  + '\n'
    
    return green(data)
}