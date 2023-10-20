/**
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
  'use strict';
  if (typeof define === 'function' && define.amd) {
      // AMD
      define(['jquery'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {/*
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,n=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),i=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-n(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(i-a))<=o?r[r.length-1]=s.add(e):r.push(e),i=a}),r},i=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=i(e);if(o.remove){var n=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.2",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=n,r._parseOptions=i,r._apply=function(e,o){var s=i(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),u=h.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),i=0;if(s.target)i=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),n=e.css("display");"inline-block"!==n&&"flex"!==n&&"inline-flex"!==n&&(n="block");var a={
display:n};a[s.property]="",e.css(a),e.outerHeight(!1)>i&&(i=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=n(e.css("border-top-width"))+n(e.css("border-bottom-width")),o+=n(e.css("padding-top"))+n(e.css("padding-bottom"))),e.css(s.property,i-o+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),n=o.attr("data-mh")||o.attr("data-match-height");n in e?e[n]=e[n].add(o):e[n]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(n,a){if(a&&"resize"===a.type){var i=t(window).width();if(i===e)return;e=i;
}n?o===-1&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi);var h=t.fn.on?"on":"bind";t(window)[h]("load",function(t){r._update(!1,t)}),t(window)[h]("resize orientationchange",function(t){r._update(!0,t)})});
      // CommonJS
      module.exports = factory(require('jquery'));
  } else {
      // Global
      factory(jQuery);
  }
})(function($) {
  /*
  *  internal
  */

  var _previousResizeWidth = -1,
      _updateTimeout = -1;

  /*
  *  _parse
  *  value parse utility function
  */

  var _parse = function(value) {
      // parse value and convert NaN to 0
      return parseFloat(value) || 0;
  };

  /*
  *  _rows
  *  utility function returns array of jQuery selections representing each row
  *  (as displayed after float wrapping applied by browser)
  */

  var _rows = function(elements) {
      var tolerance = 1,
          $elements = $(elements),
          lastTop = null,
          rows = [];

      // group elements by their top position
      $elements.each(function(){
          var $that = $(this),
              top = $that.offset().top - _parse($that.css('margin-top')),
              lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

          if (lastRow === null) {
              // first item on the row, so just push it
              rows.push($that);
          } else {
              // if the row top is the same, add to the row group
              if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                  rows[rows.length - 1] = lastRow.add($that);
              } else {
                  // otherwise start a new row group
                  rows.push($that);
              }
          }

          // keep track of the last row top
          lastTop = top;
      });

      return rows;
  };

  /*
  *  _parseOptions
  *  handle plugin options
  */

  var _parseOptions = function(options) {
      var opts = {
          byRow: true,
          property: 'height',
          target: null,
          remove: false
      };

      if (typeof options === 'object') {
          return $.extend(opts, options);
      }

      if (typeof options === 'boolean') {
          opts.byRow = options;
      } else if (options === 'remove') {
          opts.remove = true;
      }

      return opts;
  };

  /*
  *  matchHeight
  *  plugin definition
  */

  var matchHeight = $.fn.matchHeight = function(options) {
      var opts = _parseOptions(options);

      // handle remove
      if (opts.remove) {
          var that = this;

          // remove fixed height from all selected elements
          this.css(opts.property, '');

          // remove selected elements from all groups
          $.each(matchHeight._groups, function(key, group) {
              group.elements = group.elements.not(that);
          });

          // TODO: cleanup empty groups

          return this;
      }

      if (this.length <= 1 && !opts.target) {
          return this;
      }

      // keep track of this group so we can re-apply later on load and resize events
      matchHeight._groups.push({
          elements: this,
          options: opts
      });

      // match each element's height to the tallest element in the selection
      matchHeight._apply(this, opts);

      return this;
  };

  /*
  *  plugin global options
  */

  matchHeight.version = 'master';
  matchHeight._groups = [];
  matchHeight._throttle = 80;
  matchHeight._maintainScroll = false;
  matchHeight._beforeUpdate = null;
  matchHeight._afterUpdate = null;
  matchHeight._rows = _rows;
  matchHeight._parse = _parse;
  matchHeight._parseOptions = _parseOptions;

  /*
  *  matchHeight._apply
  *  apply matchHeight to given elements
  */

  matchHeight._apply = function(elements, options) {
      var opts = _parseOptions(options),
          $elements = $(elements),
          rows = [$elements];

      // take note of scroll position
      var scrollTop = $(window).scrollTop(),
          htmlHeight = $('html').outerHeight(true);

      // get hidden parents
      var $hiddenParents = $elements.parents().filter(':hidden');

      // cache the original inline style
      $hiddenParents.each(function() {
          var $that = $(this);
          $that.data('style-cache', $that.attr('style'));
      });

      // temporarily must force hidden parents visible
      $hiddenParents.css('display', 'block');

      // get rows if using byRow, otherwise assume one row
      if (opts.byRow && !opts.target) {

          // must first force an arbitrary equal height so floating elements break evenly
          $elements.each(function() {
              var $that = $(this),
                  display = $that.css('display');

              // temporarily force a usable display value
              if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                  display = 'block';
              }

              // cache the original inline style
              $that.data('style-cache', $that.attr('style'));

              $that.css({
                  'display': display,
                  'padding-top': '0',
                  'padding-bottom': '0',
                  'margin-top': '0',
                  'margin-bottom': '0',
                  'border-top-width': '0',
                  'border-bottom-width': '0',
                  'height': '100px',
                  'overflow': 'hidden'
              });
          });

          // get the array of rows (based on element top position)
          rows = _rows($elements);

          // revert original inline styles
          $elements.each(function() {
              var $that = $(this);
              $that.attr('style', $that.data('style-cache') || '');
          });
      }

      $.each(rows, function(key, row) {
          var $row = $(row),
              targetHeight = 0;

          if (!opts.target) {
              // skip apply to rows with only one item
              if (opts.byRow && $row.length <= 1) {
                  $row.css(opts.property, '');
                  return;
              }

              // iterate the row and find the max height
              $row.each(function(){
                  var $that = $(this),
                      style = $that.attr('style'),
                      display = $that.css('display');

                  // temporarily force a usable display value
                  if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                      display = 'block';
                  }

                  // ensure we get the correct actual height (and not a previously set height value)
                  var css = { 'display': display };
                  css[opts.property] = '';
                  $that.css(css);

                  // find the max height (including padding, but not margin)
                  if ($that.outerHeight(false) > targetHeight) {
                      targetHeight = $that.outerHeight(false);
                  }

                  // revert styles
                  if (style) {
                      $that.attr('style', style);
                  } else {
                      $that.css('display', '');
                  }
              });
          } else {
              // if target set, use the height of the target element
              targetHeight = opts.target.outerHeight(false);
          }

          // iterate the row and apply the height to all elements
          $row.each(function(){
              var $that = $(this),
                  verticalPadding = 0;

              // don't apply to a target
              if (opts.target && $that.is(opts.target)) {
                  return;
              }

              // handle padding and border correctly (required when not using border-box)
              if ($that.css('box-sizing') !== 'border-box') {
                  verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                  verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
              }

              // set the height (accounting for padding and border)
              $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
          });
      });

      // revert hidden parents
      $hiddenParents.each(function() {
          var $that = $(this);
          $that.attr('style', $that.data('style-cache') || null);
      });

      // restore scroll position if enabled
      if (matchHeight._maintainScroll) {
          $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
      }

      return this;
  };

  /*
  *  matchHeight._applyDataApi
  *  applies matchHeight to all elements with a data-match-height attribute
  */

  matchHeight._applyDataApi = function() {
      var groups = {};

      // generate groups by their groupId set by elements using data-match-height
      $('[data-match-height], [data-mh]').each(function() {
          var $this = $(this),
              groupId = $this.attr('data-mh') || $this.attr('data-match-height');

          if (groupId in groups) {
              groups[groupId] = groups[groupId].add($this);
          } else {
              groups[groupId] = $this;
          }
      });

      // apply matchHeight to each group
      $.each(groups, function() {
          this.matchHeight(true);
      });
  };

  /*
  *  matchHeight._update
  *  updates matchHeight on all current groups with their correct options
  */

  var _update = function(event) {
      if (matchHeight._beforeUpdate) {
          matchHeight._beforeUpdate(event, matchHeight._groups);
      }

      $.each(matchHeight._groups, function() {
          matchHeight._apply(this.elements, this.options);
      });

      if (matchHeight._afterUpdate) {
          matchHeight._afterUpdate(event, matchHeight._groups);
      }
  };

  matchHeight._update = function(throttle, event) {
      // prevent update if fired from a resize event
      // where the viewport width hasn't actually changed
      // fixes an event looping bug in IE8
      if (event && event.type === 'resize') {
          var windowWidth = $(window).width();
          if (windowWidth === _previousResizeWidth) {
              return;
          }
          _previousResizeWidth = windowWidth;
      }

      // throttle updates
      if (!throttle) {
          _update(event);
      } else if (_updateTimeout === -1) {
          _updateTimeout = setTimeout(function() {
              _update(event);
              _updateTimeout = -1;
          }, matchHeight._throttle);
      }
  };

  /*
  *  bind events
  */

  // apply on DOM ready event
  $(matchHeight._applyDataApi);

  // use on or bind where supported
  var on = $.fn.on ? 'on' : 'bind';

  // update heights on load and resize events
  $(window)[on]('load', function(event) {
      matchHeight._update(false, event);
  });

  // throttled update heights on resize events
  $(window)[on]('resize orientationchange', function(event) {
      matchHeight._update(true, event);
  });

});