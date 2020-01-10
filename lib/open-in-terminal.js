'use babel';

const exec = require('child_process').exec;

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-in-terminal:open-project-in-terminal': () => this.open()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  open() {
    path = atom.packages.getActivePackage('tree-view').mainModule.provideTreeView().selectedPaths()[0];

    if (!path) {
      path = atom.workspace.getPath()
    }
    
    if (!path) {
      return false;
    }

    const fs = require("fs");
    if (fs.lstatSync(path).isFile()) {
      const lastSlash = path.lastIndexOf('/');
      path = path.substring(0, lastSlash);
    }

    exec('open -a Terminal \"' + path + '\"');

    return true;
  }

};
