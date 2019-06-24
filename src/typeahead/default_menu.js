/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var DefaultMenu = (function() {
  'use strict';

  var s = Menu.prototype;

  function DefaultMenu() {
    Menu.apply(this, [].slice.call(arguments, 0));
  }

  _.mixin(DefaultMenu.prototype, Menu.prototype, {
    // overrides
    // ---------

    open: function open() {
      // only display the menu when there's something to be shown
      if(!this._allDatasetsEmpty()) {
        this.cssDisplayObject = this._buildCssDisplayObject();
        this._show();
      }
      return s.open.apply(this, [].slice.call(arguments, 0));
    },

    close: function close() {
      this._hide();
      return s.close.apply(this, [].slice.call(arguments, 0));
    },

    _onRendered: function onRendered() {
      if (this._allDatasetsEmpty()) {
        this._hide();
      }

      else {
        this.isOpen() && this._show();
      }

      return s._onRendered.apply(this, [].slice.call(arguments, 0));
    },

    _onCleared: function onCleared() {
      if (this._allDatasetsEmpty()) {
        this._hide();
      }

      else {
        this.isOpen() && this._show();
      }

      return s._onCleared.apply(this, [].slice.call(arguments, 0));
    },

    setLanguageDirection: function setLanguageDirection(dir) {
      this.$node.css(dir === 'ltr' ? this.css.ltr : this.css.rtl);
      return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
    },

    // private
    // ---------

    _hide: function hide() {
      this.$node.hide();
    },

    _show: function show(params) {
      this.$node.css(this.cssDisplayObject);
    },

    _buildCssDisplayObject: function buildCssDisplayObject() {
      var $el = this.$target;
      var o = _.getRelativeOffset($el, this.$container);
      var result = { display: 'block' };
      if (o) {
        return $.merge(result, {
          left: o.left + 'px',
          top: (o.top + $el.outerHeight() + this.topIndent  + 'px'),
          width: $el.outerWidth() + 'px'
        });
      }
      return result;
    }
  });

  return DefaultMenu;
})();
