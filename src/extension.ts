
import * as vscode from 'vscode';
import { NIL as NIL_UUID, v4 as uuidv4, validate as uuidValidate } from 'uuid';

export function activate(context: vscode.ExtensionContext) {

	let guidConvertCmd = vscode.commands.registerCommand('guidconverter.convert', async () => {

		let guidSource = await vscode.window.showInputBox({
			ignoreFocusOut: true,
			prompt: 'Input Raw/Guid',
		}) ?? '';

		let isGuid: boolean = uuidValidate(guidSource);

		try {
			const convert = require('raw-guid-converter');
			let converted: string = isGuid
				? convert.convertString(guidSource)
				: convert.convertRaw(guidSource);

			vscode.env.clipboard.writeText(converted);
			vscode.window.showInformationMessage('Copied to clipboard :\n' + converted);
		} catch (error) {
			vscode.window.showErrorMessage('Error : ' + error);
		}
	});

	context.subscriptions.push(guidConvertCmd);

	let emptyguidCmd = vscode.commands.registerCommand('guidconverter.empty_guid', async () => {
		vscode.env.clipboard.writeText(NIL_UUID);
		vscode.window.showInformationMessage('Copied to clipboard :\n' + NIL_UUID);
	});

	context.subscriptions.push(emptyguidCmd);

	let newGuidCmd = vscode.commands.registerCommand('guidconverter.new_guid', async () => {
		let newGuid = uuidv4();
		vscode.env.clipboard.writeText(newGuid);
		vscode.window.showInformationMessage('Copied to clipboard :\n' + newGuid);
	});

	context.subscriptions.push(newGuidCmd);

	let newRawCmd = vscode.commands.registerCommand('guidconverter.new_raw', async () => {
		try {
			const convert = require('raw-guid-converter');
			let newGuid = uuidv4();
			let converted: string = convert.convertString(newGuid);

			vscode.env.clipboard.writeText(converted);
			vscode.window.showInformationMessage('Copied to clipboard :\n' + converted);
		} catch (error) {
			vscode.window.showErrorMessage('Error : ' + error);
		}
	});

	context.subscriptions.push(newRawCmd);

	let emptyRawCmd = vscode.commands.registerCommand('guidconverter.empty_raw', async () => {
		let emptyRaw = '00000000000000000000000000000000';
		vscode.env.clipboard.writeText(emptyRaw);
		vscode.window.showInformationMessage('Copied to clipboard :\n' + emptyRaw);
	});

	context.subscriptions.push(emptyRawCmd);

	let inlineConvertCmd = vscode.commands.registerCommand('guidconverter.inline_convert', async () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; 
		}

		let selection = editor.selection;
		let guidSource = editor.document.getText(selection);
		let isGuid: boolean = uuidValidate(guidSource);

		try {
			const convert = require('raw-guid-converter');
			let converted: string = isGuid
				? convert.convertString(guidSource)
				: convert.convertRaw(guidSource);

			editor.edit((editBuilder) => editBuilder.replace(selection, converted));
		} catch (error) {
			vscode.window.showErrorMessage('Error : ' + error);
		}
	});

	context.subscriptions.push(inlineConvertCmd);

	let inlineRawCmd = vscode.commands.registerCommand('guidconverter.inline_raw', async () => {
		try {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; 
			}

			let selection = editor.selection;
			const convert = require('raw-guid-converter');

			let newGuid = uuidv4();
			let converted: string = convert.convertString(newGuid);

			editor.edit((editBuilder) => editBuilder.insert(selection.active, converted));
		} catch (error) {
			vscode.window.showErrorMessage('Error : ' + error);
		}
	});

	context.subscriptions.push(inlineRawCmd);

	let inlineGuidCmd = vscode.commands.registerCommand('guidconverter.inline_guid', async () => {
		try {
			var editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; 
			}

			let selection = editor.selection;
			let newGuid = uuidv4();

			editor.edit((editBuilder) => editBuilder.insert(selection.active, newGuid));
		} catch (error) {
			vscode.window.showErrorMessage('Error : ' + error);
		}
	});

	context.subscriptions.push(inlineGuidCmd);
}

export function deactivate() { }
