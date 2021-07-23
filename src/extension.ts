// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	let guidConvertCmd = vscode.commands.registerCommand('guidconverter.convert', async () => {
	
		let guidSource = await vscode.window.showInputBox({
			ignoreFocusOut: true,
			prompt: 'Input Raw/Guid',
		}) ?? '';

		let validator = require('validator');
		let isGuid:boolean = validator.isUUID(guidSource);

		try {
			const convert = require('raw-guid-converter');
			let converted:string = isGuid 
				? convert.convertString(guidSource)
				: convert.convertRaw(guidSource);
			
			vscode.window.showInformationMessage(converted);
		} catch (error) {
			vscode.window.showErrorMessage('Error : ' + error);
		}
	});

	context.subscriptions.push(guidConvertCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
