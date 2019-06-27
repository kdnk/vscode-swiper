import * as vscode from "vscode";

export default class Provider implements vscode.DocumentLinkProvider {
  static schema = "swiper";

  provideDocumentLinks(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ) {}
}
