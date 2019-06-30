// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  commands,
  ExtensionContext,
  Position,
  Range,
  window,
  Uri,
  workspace,
  ViewColumn,
  Selection,
  languages,
  DocumentLinkProvider,
  DocumentLink,
  TextDocument,
  CancellationToken
} from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: ExtensionContext) {
  let provider = new Provider();

  let disposable = commands.registerCommand(
    "extension.helloWorld",
    async () => {
      if (!window.activeTextEditor) {
        return "";
      }
      let document = window.activeTextEditor.document;
      let currentText = document.getText();
      let uri = Uri.parse("untitled:swiper");
      let doc = await workspace.openTextDocument(uri); // calls back into the provider
      let editor = await window.showTextDocument(doc, {
        preview: false,
        viewColumn: ViewColumn.Beside
      });
      await editor.edit(edit => {
        edit.insert(new Position(0, 0), `\n${currentText}`);
      });

      editor = window.activeTextEditor;
      const position = editor.selection.active;
      let newPosition = position.with(0, 0);

      let newSelection = new Selection(newPosition, newPosition);
      editor.selection = newSelection;
    }
  );

  let disposable2 = languages.registerDocumentLinkProvider(
    { scheme: "*" },
    provider
  );
  context.subscriptions.push(disposable, disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}

class Provider implements DocumentLinkProvider {
  private _links: DocumentLink[];

  constructor() {
    this._links = [];
  }

  provideDocumentLinks(document: TextDocument, token: CancellationToken) {
    if (document) {
      const lineCount = document.lineCount;
      const uri = document.uri;
      for (let i = 0; i < lineCount; i++) {
        let range = document.lineAt(i).range;
        let link = new DocumentLink(range, uri);
        this._links.push(link);
      }
      return this._links;
    }
  }
}
