# What is this?
This project's goal is to create a development kit fully based on nw.js (previously node-webkit) and angular.js.

This project is currently actively maintained by [Athom](https://github.com/athombv/) and [PRINTR](https://github.com/PRINTR3D).

If you're in the need of a development kit for your own project or company as well, please feel free to contribute!

## Get started

### Installation
Requirements: [node.js](https://nodejs.org/), [bower](http://bower.io/), [grunt](http://gruntjs.com/), [nw.js](https://github.com/nwjs/nw.js/)

1. Fork/download this repo and clone locally.
2. Create a subfolder called `core` and clone [printhom/devkit-core](https://github.com/printhom/devkit-core) in it.
2. run `npm install` to install node dependencies
3. run `bower install` to install front-end dependencies
4. run `grunt` to compile dependencies
5. Make an alias to the nw.js executable as `nw`
6. run `nw .` in the cloned folder

### Develop
The editor consists of a framework, with components:

* editors (e.g. a code editor, a JSON editor..)
* widgets (e.g. a markdown viewer..)
* headers (e.g. a title bar, a 'Run' button..)
* popups (e.g. a settings popup, a login popup)
* themes

This core ships some components, that can be found in `./core/components/`. You can extend these for your own application by putting them in `./app/components/` and referencing to them in `./app/app.js`.

Run `grunt watch` before running `nw.js .` while development, or your changes won't be applied.

## Contribute
Contributions are more than welcome! Send a pull request from your own fork to do so.

## Licence
MIT, see LICENCE.md