// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"classes/player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var Player =
/** @class */
function () {
  function Player(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx; // Get character source image

    this.playerImage = document.getElementById("source"); // Style for drawing

    this.ctx.fillStyle = "green"; // Character params

    this.player = {
      x: 100,
      y: 100,
      w: 80,
      h: 125,
      speed: 5,
      dx: 0,
      dy: 0
    };
  } // UPDATE


  Player.prototype.update = function () {
    this.draw();
    this.updateCharacterPosition();
  }; // MOVING


  Player.prototype.moveRight = function () {
    this.player.dx = this.player.speed;
  };

  Player.prototype.moveLeft = function () {
    this.player.dx = -this.player.speed;
  };

  Player.prototype.moveUp = function () {
    this.player.dy = -this.player.speed;
  };

  Player.prototype.moveDown = function () {
    this.player.dy = this.player.speed;
  };

  Player.prototype.stopV = function () {
    this.player.dy = 0;
  };

  Player.prototype.stopH = function () {
    this.player.dx = 0;
  };

  Player.prototype.updateCharacterPosition = function () {
    this.player.x += this.player.dx;
    this.player.y += this.player.dy;
    this.detectWall();
  }; // COLLISION


  Player.prototype.detectWall = function () {
    if (this.player.x < 0) {
      this.player.x = 0;
    }

    if (this.player.x + this.player.w > this.canvas.width) {
      this.player.x = this.canvas.width - this.player.w;
    }

    if (this.player.y < 0) {
      this.player.y = 0;
    }

    if (this.player.y + this.player.h > this.canvas.height) {
      this.player.y = this.canvas.height - this.player.h;
    }
  }; // DRAWING PLAYER


  Player.prototype.draw = function () {
    this.ctx.drawImage(this.playerImage, this.player.x, this.player.y, this.player.w, this.player.h);
  };

  return Player;
}();

exports.Player = Player;
},{}],"classes/input-handler.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputHandler = void 0;

var InputHandler =
/** @class */
function () {
  function InputHandler(player) {
    var _this = this;

    this.player = player;

    this.keyDownHandler = function (e) {
      if (e.key === "ArrowRight" || e.key === "Right") {
        _this.player.moveRight();
      } else if (e.key === "ArrowLeft" || e.key === "Left") {
        _this.player.moveLeft();
      } else if (e.key === "ArrowUp" || e.key === "Up") {
        _this.player.moveUp();
      } else if (e.key === "ArrowDown" || e.key === "Down") {
        _this.player.moveDown();
      }
    };

    this.keyUpHandler = function (e) {
      if (e.key === "ArrowRight" || e.key === "Right" || e.key === "ArrowLeft" || e.key === "Left") {
        _this.player.stopH();
      } else if (e.key === "ArrowUp" || e.key === "Up" || e.key === "ArrowDown" || e.key === "Down") {
        _this.player.stopV();
      }
    };

    this.initEventHandlers();
  }

  InputHandler.prototype.initEventHandlers = function () {
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  };

  return InputHandler;
}();

exports.InputHandler = InputHandler;
},{}],"classes/game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var player_1 = require("./player");

var input_handler_1 = require("./input-handler");

var Game =
/** @class */
function () {
  function Game(canvasID) {
    this.canvasID = canvasID;
    this.init();
    this.player = new player_1.Player(this.canvas, this.ctx);
    new input_handler_1.InputHandler(this.player);
    this.loop();
  }

  Game.prototype.init = function () {
    this.createCanvasElement();
    this.getContext();
  };

  Game.prototype.createCanvasElement = function () {
    var canvasNode = document.createElement("canvas");
    canvasNode.setAttribute("id", this.canvasID);
    document.body.appendChild(canvasNode);
  };

  Game.prototype.getContext = function () {
    this.canvas = document.getElementById(this.canvasID);
    this.canvas.width = window.innerWidth - 40;
    this.canvas.height = window.innerHeight - 40;
    this.ctx = this.canvas.getContext("2d");
  };

  Game.prototype.loop = function () {
    var _this = this;

    this.clear();
    this.player.update();
    requestAnimationFrame(function () {
      return _this.loop();
    });
  };

  Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  return Game;
}();

exports.Game = Game;
},{"./player":"classes/player.ts","./input-handler":"classes/input-handler.ts"}],"script.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_1 = require("./classes/game");

var game = new game_1.Game("game");
},{"./classes/game":"classes/game.ts"}],"C:/Users/danie/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58527" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/danie/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.ts"], null)
//# sourceMappingURL=/script.221c08a2.js.map