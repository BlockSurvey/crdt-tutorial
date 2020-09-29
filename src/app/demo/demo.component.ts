import { Component, OnInit } from "@angular/core";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from 'y-indexeddb';

@Component({
  selector: "app-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.scss"],
})
export class DemoComponent implements OnInit {
  array = [];

  value = "";

  ydoc = new Y.Doc();
  yarray;

  websocketProvider;

  textContent = "Disconnect"

  constructor() {

    // String data in indexdb of browser
    const indexeddbProvider = new IndexeddbPersistence('TodoDoc', this.ydoc)

    // Getting contents of array from doc created.
    this.yarray = this.ydoc.getArray("TodoDoc");

    // Creating a websocket connection between users for a particular doc.
    this.websocketProvider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      "TodoDoc",
      this.ydoc
    );
  }

  ngOnInit() {}

  // Function for observing changes in Array
  demo() {
    this.yarray.observe((event) => {
      for (let i = 0; i < this.yarray.length; i++) {
        console.log(this.yarray.get(i));
      }
    });

    this.ydoc.on("update", (update) => {
      Y.applyUpdate(this.ydoc, update);
    });
  }

  // Function for inserting Data into array
  insert() {
    this.array = [];
    this.array.push(this.value);
    this.ydoc.getArray("TodoDoc").insert(0, this.array);
    this.value = "";
    this.demo();
  }

  // Function for making connection between users.
  connect() {
    if (this.websocketProvider.shouldConnect) {
      this.websocketProvider.disconnect();
      this.textContent = "Connect";
    } else {
      this.websocketProvider.connect();
      this.textContent = "Disconnect";
    }
  }
}
