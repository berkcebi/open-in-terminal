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
    const path = atom.project.getPaths()[0];

    if (!path) {
      return false;
    }

    exec('open -a Terminal \"' + path + '\"');

    return true;
  }

};
