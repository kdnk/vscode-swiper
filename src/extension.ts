// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // register a content provider for the cowsay-scheme
  const myScheme = "swiper";
  const myProvider = new (class implements vscode.TextDocumentContentProvider {
    // emitter and its event
    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    provideTextDocumentContent(uri: vscode.Uri): string {
      console.log("provideTextDocumentContent");
      // simply invoke swiper, use uri-path as text
      console.log("uri: ", uri);

      if (!vscode.window.activeTextEditor) {
        return "";
      }
      let document = vscode.window.activeTextEditor.document;
      console.log("document: ", document);

      let firstLine = document.lineAt(0);
      let lastLine = document.lineAt(document.lineCount - 1);
      let textRange = new vscode.Range(
        0,
        firstLine.range.start.character,
        document.lineCount - 1,
        lastLine.range.end.character
      );
      console.log("provideTextDocumentContent2");
      let text = document.getText(textRange);
      console.log("text: ", text);
      return text;
    }
  })();
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider)
  );

  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    async () => {
      // Display a message box to the user
      let uri = vscode.Uri.parse("swiper:swiper Find View");
      console.log(uri);
      let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
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
