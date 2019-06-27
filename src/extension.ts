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
        return "";
      }
      let document = vscode.window.activeTextEditor.document;
      let currentText = document.getText();
      let uri = vscode.Uri.parse("untitled:swiper");
      let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
      let editor = await vscode.window.showTextDocument(doc, {
        preview: false,
        viewColumn: vscode.ViewColumn.Beside
      });
      await editor.edit(edit => {
        edit.insert(new vscode.Position(0, 0), `\n${currentText}`);
      });

      editor = vscode.window.activeTextEditor;
      const position = editor.selection.active;
      var newPosition = position.with(0, 0);
      var newSelection = new vscode.Selection(newPosition, newPosition);
      editor.selection = newSelection;
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
