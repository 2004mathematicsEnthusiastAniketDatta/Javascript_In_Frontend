const terminalOutput = document.querySelector('.terminal-output');
const commandInput = document.querySelector('#command-input');
const executeButton = document.querySelector('#execute-button');

const commands = {
    'help': 'Available commands: help, ls, cd, mkdir, rm, cat',
    'ls': 'Directory listing: file1.txt, file2.txt, directory1',
    'cd': 'Changed directory to: /home/user',
    'mkdir': 'Created directory: directory1',
    'rm': 'Removed file: file1.txt',
    'cat': 'File contents: Hello World!'
};

executeButton.addEventListener('click', () => {
    const command = commandInput.value.trim();
    if (command === '') return;
    const output = commands[command] || 'Unknown command';
    terminalOutput.innerHTML += `<p>$ ${command}</p><p>${output}</p>`;
    commandInput.value = '';
});

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        executeButton.click();
    }
});

document.querySelector('.close-button').addEventListener('click', () => {
    window.close();
});
