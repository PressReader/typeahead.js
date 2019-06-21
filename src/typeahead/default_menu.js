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
        var $el = this.$target;
        var o = _.getRelativeOffset($el, this.$container);
        this._show({
          left: o && o.left >= 0 ? (o.left + 'px') : null,
          top: o && o.top >= 0 ? (o.top + $el.outerHeight() + this.topIndent  + 'px') : null,
          width: $el.outerWidth() + 'px',
        });
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
      if (params) {
        this.left = params.left;
        this.top = params.top;
        this.width = params.width;
      }

      this.$node.css({
        display: 'block',
        left: this.left,
        top: this.top,
        width: this.width
      });
    }
  });

  return DefaultMenu;
})();
