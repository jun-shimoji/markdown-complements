import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {

		let editor:any = vscode.window.activeTextEditor; //activeなtexteditorのobject取得

		let position = editor.selection.active;
		let line = editor.selection.active.line;
		let textLine = editor.document.lineAt(line).text; //lineのテキストを行ごと取得

		editor?.edit((builder: any) => {
			let startPos = new vscode.Position(line, 0);
			let endPos = new vscode.Position(line, textLine.length);
			let myPos = new vscode.Selection(startPos, endPos);
			builder.delete(myPos); // カーソルのある行を削除
            builder.replace(editor?.selection, '* ' + textLine?.trim());
        });
		console.log('position: ', position);
		console.log('line: ', line);
		vscode.window.showInformationMessage(textLine);
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
