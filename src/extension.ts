// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }
      let doc = vscode.window.activeTextEditor.document;

      // let uri = vscode.Uri.parse("swiper:Swiper Find View");
      // let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider

      await vscode.window.showTextDocument(doc, {
        preview: false,
        viewColumn: vscode.ViewColumn.Beside
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
