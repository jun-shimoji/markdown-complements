import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {

		let editor:any = vscode.window.activeTextEditor;
		let sel = editor.selection;
		let cursor = editor.selection.active;
		let line = editor.selection.active.line;
		let text = editor.document.getText(sel);
		editor?.edit((builder: any) => {
            builder.replace(editor?.selection, text?.toLocaleLowerCase());
        });
		console.log('cursor: ', cursor);
		console.log('line: ', line);
		vscode.window.showInformationMessage(text);
	});

	let cmd2 = vscode.commands.registerCommand('extension.calc', () => {
		vscode.window.showInputBox({
			prompt: 'Tiny Calculator:',
			validateInput: param => {
				var regex = /\d+\s*[-+*/]\s*\d/;
				return regex.test(param) ? '' : 'input: number [-+*/] number';
			}
		}).then((value) => {
			if (value === undefined) {
				return;
			};
			let result = eval(value);
			vscode.window.showInformationMessage(value + ' = ' + result);
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(cmd2);
	

}

// this method is called when your extension is deactivated
export function deactivate() {}
