import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.unorderedItemIndent', () => {

		let editor:any = vscode.window.activeTextEditor; //activeなtexteditorのobject取得
		let position   = editor.selection.active;
		let line       = editor.selection.active.line;
		let textLine   = editor.document.lineAt(line).text; //lineのテキストを行ごと取得

		editor?.edit((builder: any) => {
			let startPos     = position.with(position.line, 0);  //カーソル行の最初の位置
			let endPos       = position.with(position.line, textLine.length);
			let myPos        = new vscode.Selection(startPos, endPos);
			let newPos       = new vscode.Selection(endPos, endPos);
			builder.delete(myPos); // カーソルのある行を削除
            builder.replace(editor?.selection, '* ' + textLine?.trim()); // "*"を追加
			editor.selection = newPos; // この状態だと選択状態になる
			vscode.commands.executeCommand("cursorRight"); // カーソル右押すことで選択状態を解除する
        });
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
