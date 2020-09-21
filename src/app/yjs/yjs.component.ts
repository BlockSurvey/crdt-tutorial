import { Component } from "@angular/core";
import * as Y from "yjs";
import CodeMirror from "codemirror";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";

@Component({
  selector: "app-yjs",
  templateUrl: "./yjs.component.html",
  styleUrls: ["./yjs.component.scss"],
})
export class YjsComponent {

  // New Doc initialised
  ydoc = new Y.Doc();

  // Websocket Provider
  provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "codemirror-large",
    this.ydoc
  );

  textContent = "Disconnect"

  constructor() {
    // Using Codemirror package from YJS for building connection between users

    // Codemirror Code for setting up Textarea field for entering data
    const yText = this.ydoc.getText("codemirror");
    const editorContainer = document.createElement("div");
    editorContainer.setAttribute("id", "editor");
    document.body.insertBefore(editorContainer, null);

    // Code for adding line numbers to the text editor.
    const editor = CodeMirror(editorContainer, {
      mode: "javascript",
      lineNumbers: true,
    });

    const binding = new CodemirrorBinding(yText, editor, this.provider.awareness);

    const provider = this.provider;
    const ydoc = this.ydoc;

    // @ts-ignore
    window.example = { provider, ydoc, yText, binding, Y };
  }

  // Function for making connection between users.
  connect() {
    if (this.provider.shouldConnect) {
      this.provider.disconnect();
      this.textContent = "Connect";
    } else {
      this.provider.connect();
      this.textContent = "Disconnect";
    }
  }
}
