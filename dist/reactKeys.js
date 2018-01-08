(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('React'), require('ReactDOM')))
    : 'function' == typeof define && define.amd
      ? define(['React', 'ReactDOM'], t)
      : 'object' == typeof exports
        ? (exports.ReactKeys = t(require('React'), require('ReactDOM')))
        : (e.ReactKeys = t(e.React, e.ReactDOM));
})('undefined' == typeof self ? this : self, function(e, t) {
  var r = Math.abs,
    n = String.fromCharCode;
  return (function(e) {
    function t(i) {
      if (r[i]) return r[i].exports;
      var n = (r[i] = { i: i, l: !1, exports: {} });
      return e[i].call(n.exports, n, n.exports, t), (n.l = !0), n.exports;
    }
    var r = {};
    return (
      (t.m = e),
      (t.c = r),
      (t.d = function(e, r, i) {
        t.o(e, r) ||
          Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: i,
          });
      }),
      (t.n = function(e) {
        var r =
          e && e.__esModule
            ? function() {
                return e['default'];
              }
            : function() {
                return e;
              };
        return t.d(r, 'a', r), r;
      }),
      (t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ''),
      t((t.s = 23))
    );
  })([
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      const r = (t.NAME = '@@keys'),
        i = (t.C_UP = 'up'),
        n = (t.C_DOWN = 'down'),
        d = (t.C_LEFT = 'left'),
        o = (t.C_RIGHT = 'right'),
        l = (t.STRATEGY_MIRROR = 'mirror'),
        s = (t.STRATEGY_START = 'start'),
        a = (t.STRATEGY_MEMORY = 'memory'),
        c = (t.BINDER_TYPE = 'binder'),
        u = (t.CAROUSEL_TYPE = 'carousel'),
        p = (t.CAROUSEL_DIRECTIONS = {
          horizontal: 'horizontal',
          horizontalBidirectional: 'horizontal-bidirectional',
          vertical: 'vertical',
          verticalBidirectional: 'vertical-bidirectional',
        }),
        f = (t.CAROUSEL_SCROLLABLE_DIRECTIONS = {
          up: 'up',
          down: 'down',
          left: 'left',
          right: 'right',
        }),
        g = (t.LONG_PRESS_TIMEOUT = 500),
        m = (t.DEBOUNCE_TIMEOUT = 10),
        h = (t.VERTICAL = 'vertical'),
        b = (t.NAVIGATION_CENTER = 'center'),
        y = (t.NAVIGATION_BOUND = 'bound');
    },
    function(t) {
      t.exports = e;
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        (0, h.ensureKnownBinder)(e.id) &&
          (0, u.dispatch)({ type: S, binder: e });
      }
      function n(e, t, r) {
        if ((0, h.ensureKnownBinder)(e)) {
          const i = (0, p.findIdByStrategy)((0, u.getStore)(), e, t);
          (0, u.dispatch)({ type: E, binderId: e });
          const n = (0, b.findBinder)((0, u.getBinders)(), e);
          n && n.type === m.CAROUSEL_TYPE ? d(e, i, r) : o(e, i, r);
        }
      }
      function d(e, t) {
        if (!(0, h.ensureKnownBinder)(e)) return;
        const r = (0, b.findBinder)((0, u.getBinders)(), e),
          { elements: n, selectedId: d } = r;
        if (0 === n.length) return;
        const o = t || n[0].id,
          l = {
            id: e,
            selectedId: o,
            hasMoved: !0,
            prevEl: n.find(t => t.id === d),
            nextEl: n.find(t => t.id === o),
            prevDir: null,
          };
        i(l);
      }
      function o(e, t) {
        if (!(0, h.ensureKnownBinder)(e)) return;
        const r = (0, b.findBinder)((0, u.getBinders)(), e),
          { elements: n, selectedId: d } = r;
        if (0 === n.length) return;
        const o = t || n[0].id,
          l = (0, f.boundsMargin)(o, r, { visibilityOffset: 0 }),
          s = {
            id: e,
            selectedId: o,
            hasMoved: !0,
            prevEl: n.find(t => t.id === d),
            nextEl: n.find(t => t.id === o),
            prevDir: null,
            elements: l.elements,
            marginLeft: l.marginLeft,
            marginTop: l.marginTop,
          };
        i(s);
      }
      function l(e, t, r) {
        e && e.call(r, t || {});
      }
      function s(e, t) {
        e && ('string' == typeof e ? n(e) : e(t));
      }
      function a(e) {
        if ((0, h.ensureKnownBinder)(e)) {
          const { memory: t, prevDir: r } = (0, b.findBinder)(
            (0, u.getBinders)(),
            e
          );
          !t && r && i({ id: e, prevDir: null });
        }
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.UPDATE_PRESS_STATUS = t.ACTIVE_BINDER = t.REMOVE_BINDER = t.UPDATE_BINDER = t.MOUNT_BINDER = t.ADD_BINDER = void 0);
      var c =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var i in ((t = arguments[r]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        };
      (t.addBinder = function(e, t) {
        return (0, h.isUnknownBinder)(e.id)
          ? void (0, u.dispatch)({
              type: y,
              binder:
                t === m.CAROUSEL_TYPE
                  ? (0, b.buildCarsouelFromProps)(e, t)
                  : (0, b.buildBinderFromProps)(e, t),
            })
          : void (0, u.dispatch)({
              type: I,
              binderId: e.id,
              priority: e.priority,
            });
      }),
        (t._updateBinder = i),
        (t._removeBinder = function(e, t = !1) {
          (0, u.dispatch)({ type: _, binderId: e, force: t });
        }),
        (t._activeBinder = n),
        (t._resetCarousel = d),
        (t._resetBinder = o),
        (t.updatePressStatus = function(e, t = null) {
          (0, u.getPress)().press !== e &&
            (0, u.dispatch)({ type: T, press: e, keyCode: t });
        }),
        (t.execCb = l),
        (t.enterTo = s),
        (t.determineNewState = function(e, t, r, n, d, o) {
          if ((0, h.ensureKnownBinder)(e)) {
            const { nextEl: p, prevEl: m, prevDir: h, elements: y } = (0,
            b.findBinder)((0, u.getBinders)(), e);
            if (p) {
              const I = (0, g.calculateNewState)(r, p, m, h, y);
              if (I.hasMoved) {
                const r = (0, f.boundsMargin)(
                  I.nextEl.id,
                  (0, b.findBinder)((0, u.getBinders)(), e),
                  t
                );
                i(
                  c({}, I, {
                    id: e,
                    selectedId: I.nextEl.id,
                    elements: r.elements,
                    marginLeft: r.marginLeft,
                    marginTop: r.marginTop,
                  })
                ),
                  l(n, p, o);
              } else a(e), s(d);
            }
          }
        }),
        (t.resetFlipFlop = a);
      var u = r(5),
        p = r(31),
        f = r(17),
        g = r(7),
        m = r(0),
        h = r(19),
        b = r(4);
      const y = (t.ADD_BINDER = `${m.NAME}/ADD_BINDER`),
        I = (t.MOUNT_BINDER = `${m.NAME}/MOUNT_BINDER`),
        S = (t.UPDATE_BINDER = `${m.NAME}/UPDATE_BINDER`),
        _ = (t.REMOVE_BINDER = `${m.NAME}/REMOVE_BINDER`),
        E = (t.ACTIVE_BINDER = `${m.NAME}/ACTIVE_BINDER`),
        T = (t.UPDATE_PRESS_STATUS = `${m.NAME}/UPDATE_PRESS_STATUS`);
    },
    function(e, t, r) {
      (function(t) {
        if ('production' !== t.env.NODE_ENV) {
          var i =
              ('function' == typeof Symbol &&
                Symbol.for &&
                Symbol.for('react.element')) ||
              60103,
            n = function(e) {
              return 'object' == typeof e && null !== e && e.$$typeof === i;
            };
          e.exports = r(26)(n, !0);
        } else e.exports = r(29)();
      }.call(t, r(8)));
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var i in ((t = arguments[r]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        };
      const i = (t.findMountedId = e => {
          const t = n(e);
          return t ? t.id : void 0;
        }),
        n = (t.findMounted = e => e.find(e => e.mounted)),
        d = (t.findBinder = (e, t) => e.find(e => e.id === t)),
        o = (t.updateBinder = (e, t) => {
          const i = e.findIndex(e => e.id === t.id);
          return Object.assign([], e, { [i]: r({}, e[i], t) });
        }),
        l = (t.computeAddingBinder = (e, t) => {
          const r = s(e, t);
          return t.active ? a(r, t) : r;
        }),
        s = (t.addBinder = (e, t) => [...e, r({}, t, { sleep: !1 })]),
        a = (t.computeMountBinder = (e, t) =>
          c(e, t) ? u(e, t.id) : p(e, t.id)),
        c = (t.isBinderShouldMount = (e, t) => {
          const r = n(e);
          return !r || t.priority >= r.priority;
        }),
        u = (t.mountBinder = (e, t) =>
          e.map(e => {
            const i = r({}, e, { mounted: e.id === t });
            return (
              e.id === t && ((i.mountedTime = Date.now()), (i.sleep = !1)), i
            );
          })),
        p = (t.unsleepBinder = (e, t) =>
          e.map(
            e => (e.memory ? r({}, e, { sleep: e.id !== t && e.sleep }) : e)
          )),
        f = (t.computeRemoveBinder = (e, t, r) => {
          const i = g(e, t, r);
          return m(i) ? i : h(i);
        }),
        g = (t.removeBinder = (e, t, i = !1) => {
          const n = e.find(e => e.id === t);
          return n && (i || !n.memory)
            ? e.filter(e => e.id !== t)
            : e.map(e =>
                r({}, e, {
                  mounted: e.id !== t && e.mounted,
                  sleep: !(e.id !== t) || e.sleep,
                })
              );
        }),
        m = (t.hasMountedBinder = e => e.some(e => e.mounted)),
        h = (t.mountfreshestBinder = e => {
          const t = e.filter(e => !e.sleep);
          if (0 === t.length) return e;
          const r = t.filter(e => e.mountedTime),
            i =
              0 === r.length
                ? t.reduce((e, t) => (e.priority > t.priority ? e : t), t[0])
                : r.reduce(
                    (e, t) => (e.mountedTime > t.mountedTime ? e : t),
                    r[0]
                  );
          return (i.mounted = !0), u(e, i.id);
        }),
        b = (t.buildCurrent = (e, t) => {
          const r = n(e);
          return {
            binderId: r ? r.id : t.binderId,
            selectedId: r ? r.selectedId : t.selectedId,
          };
        }),
        y = (t.buildBinderFromProps = (e, t) => ({
          id: e.id,
          active: e.active,
          type: t,
          selector: e.selector,
          gap: e.gap,
          boundedGap: e.boundedGap,
          topGap: e.topGap,
          rightGap: e.rightGap,
          leftGap: e.leftGap,
          downGap: e.downGap,
          strategy: e.strategy,
          memory: e.memory,
          position: e.position,
          priority: e.priority,
          prevDir: e.prevDir,
          elements: [],
          hasMoved: !1,
          marginLeft: 0,
          marginTop: 0,
        })),
        I = (t.buildCarsouelFromProps = (e, t) => ({
          id: e.id,
          type: t,
          active: e.active,
          circular: e.circular,
          size: e.size,
          index: e.index,
          memory: e.memory,
          priority: e.priority,
          elements: [],
        }));
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getPress = t.getBinders = t.dispatch = t.getStore = t.updateStore = t.globalStore = void 0);
      var i = r(0);
      let n = (t.globalStore = {
        dispatch: () => ({}),
        getState: () => ({ [i.NAME]: {} }),
      });
      const d = (t.updateStore = e => (t.globalStore = n = e)),
        o = (t.getStore = () => n.getState()[i.NAME]),
        l = (t.dispatch = e => n.dispatch(e)),
        s = (t.getBinders = () => n.getState()[i.NAME].binders),
        a = (t.getPress = () => n.getState()[i.NAME].PRESS);
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function n(e, t, r = !1) {
        const i = (0, b.getStore)().current.binderId;
        I.forEach(n => {
          (n.context.uniqElement && n.context.props.id !== i) ||
            n.callback.call(n.context, e, t, r);
        });
      }
      function d(e) {
        _ ||
          (e === B.enter
            ? setTimeout(() => n(e, !1, !0), 0)
            : setTimeout(() => n(e, !1), 0),
          (t.clicked = _ = !0));
      }
      function o(e) {
        e === B.enter && setTimeout(() => n(e, !1), 0);
      }
      function l(r) {
        t.keysCopy = I = [...y];
        const e = r.keyCode ? r.keyCode : r;
        p.default.isBlocked(e) ||
          (d(e),
          !S &&
            -1 !== O.indexOf(e) &&
            (t.pressTimeout = E = setTimeout(() => {
              T(e, 'long'), (0, c.updatePressStatus)(!0, e), (t.fired = S = !0);
            }, h.LONG_PRESS_TIMEOUT)),
          (0, b.getPress)().press && n(e, !0));
      }
      function s(r) {
        const e = r.keyCode ? r.keyCode : r;
        p.default.isBlocked(e) ||
          ((0, m.catcherWatcher)(e),
          T(e, 'short'),
          o(e),
          clearTimeout(E),
          (0, c.updatePressStatus)(!1),
          (t.fired = S = !1),
          (t.clicked = _ = !1));
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getConfig = t.availableForLongPress = t.userConfig = t.rkDebounce = t.eventCb = t.pressTimeout = t.clicked = t.fired = t.keysCopy = t.keysListeners = void 0);
      var a =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var i in ((t = arguments[r]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        };
      (t.callListeners = n),
        (t.callTriggerClick = d),
        (t.releaseClickTouch = o),
        (t.cb = l),
        (t.cbRelease = s),
        (t._init = function(e) {
          e && e.store && (0, b.updateStore)(e.store),
            (t.rkDebounce = C =
              e && e.debounce ? e.debounce : h.DEBOUNCE_TIMEOUT),
            (t.eventCb = T = e && e.eventCb ? e.eventCb : () => ({})),
            (t.userConfig = B = e && e.config ? a({}, B, e.config) : B),
            (t.availableForLongPress = O =
              e && e.longPressTouch ? e.longPressTouch : O),
            e && (!e || e.bindkeys)
              ? e.bindkeys(l, s)
              : (document.addEventListener('keydown', l),
                document.addEventListener('keyup', s));
        }),
        (t.addListener = function(e, t) {
          const r = Math.random()
            .toString(36)
            .substring(2, 10);
          return y.unshift({ id: r, callback: e, context: t }), r;
        }),
        (t.removeListener = function(e) {
          return (t.keysListeners = y = y.filter(t => t.id !== e)), null;
        });
      var c = r(2),
        u = r(10),
        p = i(u),
        f = r(20),
        g = i(f),
        m = r(21),
        h = r(0),
        b = r(5);
      let y = (t.keysListeners = []),
        I = (t.keysCopy = []),
        S = (t.fired = !1),
        _ = (t.clicked = !1),
        E = (t.pressTimeout = null),
        T = (t.eventCb = null),
        C = (t.rkDebounce = h.DEBOUNCE_TIMEOUT),
        B = (t.userConfig = g.default),
        O = (t.availableForLongPress = f.AVAILABLE_FOR_LONG_PRESS);
      t.getConfig = () => B;
    },
    function(e, t, r) {
      'use strict';
      function i(e, t, r, i) {
        let n = !1,
          o = r,
          l = t,
          s = null;
        switch (e) {
          case d.C_UP:
            s = i === d.C_DOWN ? d.C_UP : null;
            break;
          case d.C_RIGHT:
            s = i === d.C_LEFT ? d.C_RIGHT : null;
            break;
          case d.C_DOWN:
            s = i === d.C_UP ? d.C_DOWN : null;
            break;
          case d.C_LEFT:
            s = i === d.C_RIGHT ? d.C_LEFT : null;
            break;
          default:
        }
        if (s) {
          n = !0;
          (o = t), (l = r);
        } else s = i;
        return { hasMoved: n, nextEl: l, prevEl: o, prevDir: s };
      }
      var n = Math.max;
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.calculateElSpace = function(e) {
          if (e) {
            const {
              left: t,
              top: r,
              width: i,
              height: n,
            } = e.getBoundingClientRect();
            return {
              id: e.id,
              width: i,
              height: n,
              left: t,
              top: r,
              down: r + n,
              right: t + i,
            };
          }
        }),
        (t.downLimit = function(e) {
          return n.apply(null, e.map(e => e.coords.down));
        }),
        (t.rightLimit = function(e) {
          return n.apply(null, e.map(e => e.coords.right));
        }),
        (t.getCurrentChildren = function(e, t) {
          return [].slice.call(e.querySelectorAll(t));
        }),
        (t.getDomElement = function(e) {
          return document.getElementById(e);
        }),
        (t.hasElementsDiff = function(e, t) {
          if (0 === e.length) return !1;
          if (0 === t.length || t.length !== e.length) return !0;
          let r = !1,
            i = 0;
          for (const n = Math.min(e.length, t.length); i < n && !r; ) {
            const n = e[i].id || e[i].props.id,
              d = t[i].id || t[i].props.id;
            (r = n !== d), i++;
          }
          return r;
        }),
        (t.hasWrapperDiff = function(e, t, r) {
          if (!e || !t) return !1;
          return 'horizontal' === r
            ? e.width !== t.width || e.height !== t.height || e.left !== t.left
            : 'vertical' === r
              ? e.width !== t.width || e.height !== t.height || e.top !== t.top
              : e.width !== t.width ||
                e.height !== t.height ||
                e.top !== t.top ||
                e.left !== t.left;
        }),
        (t.flipflop = i),
        (t.calculateNewState = function(t, e, r, n, d) {
          let o = !1,
            l = e,
            s = r,
            a = n,
            c = i(t, e, r, n);
          if (!c.hasMoved) {
            const r = e;
            r[t] && (l = d.find(i => i.id === r[t])),
              l.id !== r.id && ((o = !0), (s = r), (a = t)),
              (c = { hasMoved: o, nextEl: l, prevEl: s, prevDir: a });
          }
          return c;
        }),
        (t.debounce = function(e, t, r) {
          var i;
          return function() {
            var n = this,
              d = arguments,
              o = r && !i;
            clearTimeout(i),
              (i = setTimeout(function() {
                (i = null), r || e.apply(n, d);
              }, t)),
              o && e.apply(n, d);
          };
        });
      var d = r(0);
    },
    function(e) {
      function t() {
        throw new Error('setTimeout has not been defined');
      }
      function r() {
        throw new Error('clearTimeout has not been defined');
      }
      function n(e) {
        if (a === setTimeout) return setTimeout(e, 0);
        if ((a === t || !a) && setTimeout)
          return (a = setTimeout), setTimeout(e, 0);
        try {
          return a(e, 0);
        } catch (t) {
          try {
            return a.call(null, e, 0);
          } catch (t) {
            return a.call(this, e, 0);
          }
        }
      }
      function i(e) {
        if (c === clearTimeout) return clearTimeout(e);
        if ((c === r || !c) && clearTimeout)
          return (c = clearTimeout), clearTimeout(e);
        try {
          return c(e);
        } catch (t) {
          try {
            return c.call(null, e);
          } catch (t) {
            return c.call(this, e);
          }
        }
      }
      function d() {
        g &&
          p &&
          ((g = !1), p.length ? (f = p.concat(f)) : (m = -1), f.length && o());
      }
      function o() {
        if (!g) {
          var e = n(d);
          g = !0;
          for (var t = f.length; t; ) {
            for (p = f, f = []; ++m < t; ) p && p[m].run();
            (m = -1), (t = f.length);
          }
          (p = null), (g = !1), i(e);
        }
      }
      function l(e, t) {
        (this.fun = e), (this.array = t);
      }
      function s() {}
      var a,
        c,
        u = (e.exports = {});
      (function() {
        try {
          a = 'function' == typeof setTimeout ? setTimeout : t;
        } catch (r) {
          a = t;
        }
        try {
          c = 'function' == typeof clearTimeout ? clearTimeout : r;
        } catch (t) {
          c = r;
        }
      })();
      var p,
        f = [],
        g = !1,
        m = -1;
      (u.nextTick = function(e) {
        var t = Array(arguments.length - 1);
        if (1 < arguments.length)
          for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        f.push(new l(e, t)), 1 !== f.length || g || n(o);
      }),
        (l.prototype.run = function() {
          this.fun.apply(null, this.array);
        }),
        (u.title = 'browser'),
        (u.browser = !0),
        (u.env = {}),
        (u.argv = []),
        (u.version = ''),
        (u.versions = {}),
        (u.on = s),
        (u.addListener = s),
        (u.once = s),
        (u.off = s),
        (u.removeListener = s),
        (u.removeAllListeners = s),
        (u.emit = s),
        (u.prependListener = s),
        (u.prependOnceListener = s),
        (u.listeners = function() {
          return [];
        }),
        (u.binding = function() {
          throw new Error('process.binding is not supported');
        }),
        (u.cwd = function() {
          return '/';
        }),
        (u.chdir = function() {
          throw new Error('process.chdir is not supported');
        }),
        (u.umask = function() {
          return 0;
        });
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.block = function(e = i.rkDebounce) {
          (n = !0), setTimeout(() => (n = !1), e);
        }),
        (t.isBlocked = function() {
          return n;
        });
      var i = r(6);
      let n = !1;
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.default = new class {
        constructor() {
          (this.blockedStuff = []),
            (this.generalBlock = !1),
            (this.block = this.block.bind(this)),
            (this.unblock = this.unblock.bind(this)),
            (this.blockExcept = this.blockExcept.bind(this)),
            (this.unblockExcept = this.unblockExcept.bind(this)),
            (this.isBlocked = this.isBlocked.bind(this));
        }
        block() {
          this.blockedStuff = [];
          const e = Array.prototype.slice.call(arguments);
          0 < e.length
            ? ((this.generalBlock = !1),
              e.forEach(e => {
                e instanceof Array
                  ? ((this.blockedStuff = this.blockedStuff.concat(e)),
                    (this.blockedStuff = [...new Set(this.blockedStuff)]))
                  : -1 === this.blockedStuff.indexOf(e) &&
                    this.blockedStuff.push(e);
              }))
            : (this.generalBlock = !0);
        }
        blockExcept() {
          (this.generalBlock = !0), (this.blockedStuff = []);
          const e = Array.prototype.slice.call(arguments);
          e.forEach(e => {
            e instanceof Array
              ? ((this.blockedStuff = this.blockedStuff.concat(e)),
                (this.blockedStuff = [...new Set(this.blockedStuff)]))
              : -1 === this.blockedStuff.indexOf(e) &&
                this.blockedStuff.push(e);
          });
        }
        unblockExcept() {
          this.generalBlock = !1;
          const e = Array.prototype.slice.call(arguments);
          if (0 < e.length) this.block(...e);
          else
            throw new Error(
              'unblockExcept need at least on arg, maybe you want to just unblock()'
            );
        }
        unblock() {
          this.generalBlock = !1;
          const e = Array.prototype.slice.call(arguments);
          0 < e.length
            ? e.forEach(e => {
                e instanceof Array
                  ? e.forEach(e => {
                      -1 !== this.blockedStuff.indexOf(e) &&
                        this.blockedStuff.splice(
                          this.blockedStuff.indexOf(e),
                          1
                        );
                    })
                  : -1 !== this.blockedStuff.indexOf(e) &&
                    this.blockedStuff.splice(this.blockedStuff.indexOf(e), 1);
              })
            : (this.blockedStuff = []);
        }
        isBlocked(e) {
          return (
            (!this.generalBlock && -1 !== this.blockedStuff.indexOf(e)) ||
            (this.generalBlock && -1 === this.blockedStuff.indexOf(e))
          );
        }
        getStuff() {
          return this.blockedStuff;
        }
        isGeneralBlocked() {
          return this.generalBlock;
        }
      }();
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(1),
        d = r(3),
        o = i(d),
        l = r(9),
        s = r(6),
        a = r(10),
        c = i(a),
        u = r(2);
      class p extends n.Component {
        static get propTypes() {
          return {
            children: o.default.oneOfType([o.default.object, o.default.array]),
            id: o.default.string.isRequired,
            debounce: o.default.number,
            active: o.default.bool,
          };
        }
        static get defaultProps() {
          return { active: !0 };
        }
        constructor(e) {
          super(e),
            (this.listenerId = (0, s.addListener)(this.keysHandler, this));
        }
        isActive() {
          return (
            this.props.active &&
            !(0, l.isBlocked)() &&
            !c.default.isBlocked(this.props.id)
          );
        }
        keysHandler(e, t, r) {
          if (!r && this.isActive())
            for (const t in s.userConfig) {
              const r = s.userConfig[t],
                i = t
                  .toLowerCase()
                  .replace(/\b[a-z](?=[a-z]{1})/g, e => e.toUpperCase());
              if (
                (Number.isInteger(r) && r === e) ||
                (Array.isArray(r) && -1 !== r.indexOf(e))
              ) {
                this.performAction(this.props[`on${i}`], e);
                break;
              }
            }
        }
        performAction(e, t) {
          const { debounce: r } = this.props;
          e && ((0, l.block)(r), (0, u.execCb)(e, t, this));
        }
        componentWillUnmount() {
          (0, s.removeListener)(this.listenerId);
        }
        render() {
          return this.props.children || null;
        }
      }
      t.default = p;
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return n.globalStore.getState()[d.NAME][e];
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getBinder = i),
        (t.addScrollableRef = function(e, t) {
          (0, o._updateBinder)(e, {
            scrollableRef: t,
            scrollableTranslateX: 0,
            scrollableTranslateY: 0,
          });
        }),
        (t.addNestedScrollableRef = function(e, t, r) {
          const { nestedScrollableRefs: n } = i(e);
          (n[r] = {
            ref: t,
            scrollableTranslateX: 0,
            scrollableTranslateY: 0,
            iFocused: 0,
          }),
            (0, o._updateBinder)(e, { nestedScrollableRefs: n });
        }),
        (t.getScrollableRef = function(e) {
          const { scrollableRef: t } = i(e);
          return t;
        }),
        (t.getScrollableTranslateX = function(e) {
          const { scrollableTranslateX: t } = i(e);
          return t;
        }),
        (t.getScrollableTranslateY = function(e) {
          const { scrollableTranslateY: t } = i(e);
          return t;
        }),
        (t.horizontalScrollHandler = function(e, t) {
          const { direction: r, scrollableRef: n } = i(e);
          (0, o._updateBinder)(e, { scrollableTranslateX: t }),
            (n.style.transform = `translate3d(${t}px, 0, 0)`);
        }),
        (t.horizontalNestedScrollHandler = function(e, t) {
          const { iFocused: r, nestedIFocused: n, nestedScrollableRefs: d } = i(
            e
          );
          (d[r].scrollableTranslateX = t),
            (0, o._updateBinder)(e, { nestedScrollableRefs: d }),
            (d[r].ref.style.transform = `translate3d(${t}px, 0, 0)`);
        }),
        (t.verticalScrollHandler = function(e, t) {
          const { scrollableRef: r } = i(e);
          (0, o._updateBinder)(e, { scrollableTranslateY: t }),
            (r.style.transform = `translate3d(0, ${t}px, 0)`);
        }),
        (t.addScrollableItemRef = function(e, t, r) {
          const {
            direction: n,
            nestedScrollableItems: l,
            scrollableItems: s,
          } = i(e);
          (s[t] = {}),
            (s[t].ref = r),
            n === d.CAROUSEL_DIRECTIONS.vertical ||
            n === d.CAROUSEL_DIRECTIONS.verticalBidirectional
              ? ((s[t].offsetHeight = r.offsetHeight),
                (s[t].offsetTop = r.offsetTop))
              : n === d.CAROUSEL_DIRECTIONS.horizontal &&
                ((s[t].offsetWidth = r.offsetWidth),
                (s[t].offsetLeft = r.offsetLeft)),
            (0, o._updateBinder)(e, { scrollableItems: s });
        }),
        (t.addNestedScrollableItemRef = function(e, t, r, n) {
          const { nestedScrollableItems: d } = i(e);
          d[r] || (d[r] = []),
            (d[r][t] = {}),
            (d[r][t].ref = n),
            (d[r][t].offsetWidth = n.offsetWidth),
            (d[r][t].offsetLeft = n.offsetLeft),
            (0, o._updateBinder)(e, { nestedScrollableItems: d });
        }),
        (t.getItemOffsetHeight = function(e, t) {
          const { scrollableItems: r } = i(e);
          return r[t] ? r[t].offsetHeight : void 0;
        }),
        (t.getItemOffsetLeft = function(e, t) {
          const { scrollableItems: r } = i(e);
          return r[t] ? r[t].offsetLeft : void 0;
        }),
        (t.getItemOffsetTop = function(e, t) {
          const { scrollableItems: r } = i(e);
          return r[t] ? r[t].offsetTop : void 0;
        }),
        (t.getItemOffsetWidth = function(e, t) {
          const { scrollableItems: r } = i(e);
          return r[t] ? r[t].offsetWidth : void 0;
        }),
        (t.getIFocused = function(e) {
          const { iFocused: t } = i(e);
          return t;
        }),
        (t.isItemMounted = function(e) {
          return !!document.getElementById(e);
        }),
        (t.getNestedIFocused = function(e, t) {
          const { nestedScrollableRefs: r } = i(e);
          return r[t] ? r[t].iFocused : 0;
        }),
        (t.getNestedItemOffsetLeft = function(e, t, r) {
          const { nestedScrollableItems: n } = i(e);
          return n[t] && n[t][r] ? n[t][r].offsetLeft : void 0;
        }),
        (t.getNestedItemOffsetWidth = function(e, t, r) {
          const { nestedScrollableItems: n } = i(e);
          return n[t] && n[t][r] ? n[t][r].offsetWidth : void 0;
        }),
        (t.getNestedScrollableTranslateX = function(e, t) {
          const { nestedScrollableRefs: r } = i(e);
          return r[t].scrollableTranslateX;
        }),
        (t.itemFocusedHandler = function(e, t, r) {
          const {
            childItemWrapper: n,
            direction: l,
            focusedClassName: s,
            nestedFocusedClassName: a,
            horizontalChildItemWrapper: c,
            iFocused: u,
            nestedScrollableItems: p,
            nestedScrollableRefs: f,
            preloadItemsCount: g,
            scrollableItems: m,
            verticalChildItemWrapper: h,
          } = i(e);
          if (l === d.CAROUSEL_DIRECTIONS.verticalBidirectional) {
            const i = m[t].ref.querySelector(h),
              n = f[u].iFocused;
            isNaN(r) && (r = f[t].iFocused);
            const d = p[u][n || 0].ref.querySelector(c);
            d && d.classList.remove(a);
            const l = p[t][r || 0].ref.querySelector(c);
            l.classList.add(a),
              (f[t].iFocused = r),
              (0, o._updateBinder)(e, {
                iFocused: t,
                selectedId: i.id,
                nestedIFocused: r,
                nestedSelectedId: l.id,
                nestedScrollableRefs: f,
              });
          } else {
            const r = m[t].ref.querySelector(n);
            if (s) {
              const e = m[u].ref.querySelector(n);
              e && e.classList.remove(s), r.classList.add(s);
            }
            (0, o._updateBinder)(e, {
              iFocused: t,
              selectedId: r.id,
              scrollableItems: m,
            });
          }
        }),
        (t.isCarouselActive = function(e) {
          const { active: t } = i(e);
          return t;
        });
      var n = r(6),
        d = r(0),
        o = r(2);
    },
    function(e) {
      'use strict';
      function t(e) {
        return function() {
          return e;
        };
      }
      var r = function() {};
      (r.thatReturns = t),
        (r.thatReturnsFalse = t(!1)),
        (r.thatReturnsTrue = t(!0)),
        (r.thatReturnsNull = t(null)),
        (r.thatReturnsThis = function() {
          return this;
        }),
        (r.thatReturnsArgument = function(e) {
          return e;
        }),
        (e.exports = r);
    },
    function(e, t, r) {
      'use strict';
      (function(t) {
        var r = function() {};
        'production' !== t.env.NODE_ENV &&
          (r = function(e) {
            if (e === void 0)
              throw new Error('invariant requires an error message argument');
          }),
          (e.exports = function(t, i, n, o, l, s, d, e) {
            if ((r(i), !t)) {
              var a;
              if (void 0 === i)
                a = new Error(
                  'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
                );
              else {
                var c = [n, o, l, s, d, e],
                  u = 0;
                (a = new Error(
                  i.replace(/%s/g, function() {
                    return c[u++];
                  })
                )),
                  (a.name = 'Invariant Violation');
              }
              throw ((a.framesToPop = 1), a);
            }
          });
      }.call(t, r(8)));
    },
    function(e) {
      'use strict';
      e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    },
    function(e, t, r) {
      'use strict';
      (function(t) {
        var i = r(13),
          n = i;
        if ('production' !== t.env.NODE_ENV) {
          var d = function(e) {
            for (
              var t = arguments.length, r = Array(1 < t ? t - 1 : 0), i = 1;
              i < t;
              i++
            )
              r[i - 1] = arguments[i];
            var n = 0,
              d =
                'Warning: ' +
                e.replace(/%s/g, function() {
                  return r[n++];
                });
            'undefined' != typeof console && void 0;
            try {
              throw new Error(d);
            } catch (e) {}
          };
          n = function(e, t) {
            if (t === void 0)
              throw new Error(
                '`warning(condition, format, ...args)` requires a warning message argument'
              );
            if (0 !== t.indexOf('Failed Composite propType: ') && !e) {
              for (
                var r = arguments.length, i = Array(2 < r ? r - 2 : 0), n = 2;
                n < r;
                n++
              )
                i[n - 2] = arguments[n];
              d.apply(void 0, [t].concat(i));
            }
          };
        }
        e.exports = n;
      }.call(t, r(8)));
    },
    function(e, t, r) {
      'use strict';
      function i(e, t) {
        let r = 'equal',
          i = 'equal';
        return (
          e.left > t.left ? (i = 'left') : e.left < t.left && (i = 'right'),
          e.top > t.top ? (r = 'top') : e.top < t.top && (r = 'down'),
          { vertical: r, horizontal: i }
        );
      }
      function n(e, t, r) {
        return t.top >= e.top + r;
      }
      function d(e, t, r) {
        return e.down >= t.down + r;
      }
      function o(e, t, r) {
        return t.left >= e.left + r;
      }
      function l(e, t, r) {
        return e.right >= t.right + r;
      }
      function s(e, t) {
        return n(e, t, 0) && d(e, t, 0);
      }
      function a(e, t) {
        return o(e, t, 0) && l(e, t, 0);
      }
      function c(e, t, r, i, n) {
        const { top: d } = t.coords,
          o = i || n,
          l = 0 > d - (e.top + o),
          s = d - (l ? o : r),
          a = s - e.top;
        return 0 > a && !l ? 0 : -a;
      }
      function u(e, t, r, i, n, d) {
        const { down: o } = t.coords,
          l = n || d,
          s = o + l > i,
          a = o + (s ? l : r);
        return a > i && !s ? -(i - e.down) : -(a - e.down);
      }
      function p(e, t, r, i, n, d) {
        const { right: o } = t.coords,
          l = n || d,
          s = o + l > i,
          a = o + (s ? l : r);
        return a > i && !s ? -(i - e.right) : -(a - e.right);
      }
      function f(e, t, r, i, n) {
        const { left: d } = t.coords,
          o = i || n,
          l = 0 > d - (e.left + o),
          s = d - (l ? o : r),
          a = s - e.left;
        return 0 > a && !l ? 0 : -a;
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var g =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var i in ((t = arguments[r]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        };
      (t.correctBoundsMargin = function(e, t) {
        const {
            wrapper: r,
            elements: i,
            marginLeft: n,
            marginTop: d,
            gap: o,
            boundedGap: l,
            topGap: u,
            leftGap: p,
          } = t,
          g = i.find(t => t.id === e),
          h = (0, m.calculateElSpace)(document.getElementById(e));
        return {
          marginLeft: a(r, h) ? n : f(r, g, o, l, p),
          marginTop: s(r, h) ? d : c(r, g, o, l, u),
        };
      }),
        (t.boundsMargin = function(e, t, r) {
          const {
            wrapper: s,
            elements: a,
            marginLeft: b,
            marginTop: y,
            downLimit: I,
            rightLimit: S,
            gap: _,
            boundedGap: E,
            topGap: T,
            rightGap: C,
            leftGap: B,
            downGap: O,
            selectedId: R,
          } = t;
          let v = b,
            k = y,
            L = a;
          if (!r || R === e)
            return { marginLeft: v, marginTop: k, elements: L };
          const P = document.getElementById(R),
            N = document.getElementById(e);
          if (!P || !N || !s)
            return { marginLeft: v, marginTop: k, elements: L };
          const x = a.find(t => t.id === e),
            w = (0, m.calculateElSpace)(P),
            F = (0, m.calculateElSpace)(N),
            A = i(w, F);
          return (
            'left' !== A.horizontal || o(s, F, _)
              ? ('right' === A.horizontal || 'equal' === A.horizontal) &&
                !l(s, F, _) &&
                (v = p(s, x, _, S, E, C))
              : (v = f(s, x, _, E, B)),
            'top' !== A.vertical || n(s, F, _)
              ? ('down' === A.vertical || 'equal' === A.horizontal) &&
                !d(s, F, _) &&
                (k = u(s, x, _, I, E, O, y))
              : (k = c(s, x, _, E, T)),
            (b !== v || y !== k) &&
              (L = a.map(e =>
                g({}, e, {
                  isVisible: (0, h.isVisible)(
                    s,
                    e.coords,
                    v,
                    k,
                    r.visibilityOffset
                  ),
                })
              )),
            { marginLeft: v, marginTop: k, elements: L }
          );
        }),
        (t.determineGeo = i),
        (t.isInsideTop = n),
        (t.isInsideDown = d),
        (t.isInsideLeft = o),
        (t.isInsideRight = l),
        (t.isVerticalInside = s),
        (t.isHorizontalInside = a),
        (t.calculMarginOnTop = c),
        (t.calculMarginOnDown = u),
        (t.calculMarginOnRight = p),
        (t.calculMarginOnLeft = f);
      var m = r(7),
        h = r(18);
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      const r = (t.insideHorizontal = (e, t, r, i) =>
          e.left - i - r <= t.left && e.right + i - r >= t.right),
        i = (t.insideRight = (e, t, r, i) =>
          e.left - i - r >= t.left && e.left - i - r <= t.right),
        n = (t.insideLeft = (e, t, r, i) =>
          e.right + i - r >= t.left && e.right + i - r <= t.right),
        d = (t.isHorizontalVisible = (e, t, d = 0, o = 0) =>
          r(e, t, d, o) || i(e, t, d, o) || n(e, t, d, o)),
        o = (t.insideVertical = (e, t, r, i) =>
          e.top - i - r <= t.top && e.down + i - r >= t.down),
        l = (t.insideTop = (e, t, r, i) =>
          e.top - i - r >= t.top && e.top - i - r <= t.down),
        s = (t.insideDown = (e, t, r, i) =>
          e.down + i - r >= t.top && e.down + i - r <= t.down),
        a = (t.isVerticalVisible = (e, t, r = 0, i = 0) =>
          o(e, t, r, i) || l(e, t, r, i) || s(e, t, r, i)),
        c = (t.isVisible = (e, t, r, i, n) => d(e, t, r, n) && a(e, t, i, n));
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.ensureState = function() {
          if (!(0, i.getStore)())
            throw new Error(`${n}keys state not present un global state`);
        }),
        (t.ensureKnownBinder = function(e) {
          return !!(0, i.getBinders)().some(t => e === t.id);
        }),
        (t.isUnknownBinder = function(e) {
          return !(0, i.getBinders)().some(t => e === t.id);
        });
      var i = r(5);
      const n = '[react-keys] - ';
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = { left: 37, up: 38, right: 39, down: 40, enter: 13 });
      t.AVAILABLE_FOR_LONG_PRESS = [37, 38, 39, 40];
    },
    function(e, t, r) {
      'use strict';
      function i(e, t) {
        const r = Math.random()
          .toString(36)
          .substring(2, 10);
        return s.push({ id: r, sequence: e, cb: t, history: [] }), r;
      }
      function d(e) {
        s = s.filter(t => t.id !== e);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.catcherWatcher = function(e) {
          const t = n(e);
          s.forEach(e => {
            (e.history += t),
              e.history.length > e.sequence.length &&
                (e.history = e.history.slice(1)),
              e.history.toUpperCase() === e.sequence.toUpperCase() &&
                ((e.history = []), e.cb());
          });
        }),
        (t.addCatcher = i),
        (t.removeCatcher = d);
      var o = r(1),
        l = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o);
      let s = [];
      t.default = (e, t) => r =>
        class extends o.Component {
          componentDidMount() {
            const r = this.props;
            this.id = i(e, () => t.call(this, r));
          }
          componentWillUnmount() {
            d(this.id);
          }
          render() {
            return l.default.createElement(r, this.props);
          }
        };
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(1),
        d = i(n),
        o = r(3),
        l = i(o),
        s = r(12),
        a = r(0);
      class c extends n.Component {
        constructor(...e) {
          var t;
          return (t = super(...e)), (this.state = {}), t;
        }
        componentDidMount() {
          const {
            carouselId: e,
            itemIndex: t,
            nested: r,
            parentCarouselId: i,
            parentItemIndex: n,
          } = this.props;
          r
            ? (0, s.addNestedScrollableItemRef)(i, t, n, this.el)
            : (0, s.addScrollableItemRef)(e, t, this.el);
        }
        shouldComponentUpdate() {
          return !!this.props.hasNestedItems;
        }
        render() {
          const {
              direction: e,
              children: t,
              itemWidth: r,
              itemHeight: i,
              itemStyles: n,
            } = this.props,
            o = {
              width: `${r}px`,
              height: `${i}px`,
              display:
                e === a.CAROUSEL_DIRECTIONS.horizontal
                  ? 'inline-block'
                  : 'block',
            };
          return d.default.createElement(
            'div',
            {
              ref: e => {
                this.el = e;
              },
              style: o,
            },
            d.default.createElement('div', { style: n }, t)
          );
        }
      }
      t.default = c;
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t._blocks = t.unblockExcept = t.blockExcept = t.unblock = t.block = t.resetCarousel = t.removeBinder = t.resetBinder = t.updateBinder = t.activeBinder = t.catcher = t.isVisibleInBinder = t.isLongPress = t.getKeyCode = t.getCurrentBinderId = t.getCurrentBinder = t.getCurrentSelectedId = t.getBinderSelectedId = t.getBinderMarginTop = t.getBinderMarginLeft = t.getBinders = t.isBinderActive = t.isCurrentBinder = t.keysSelector = t.keysReducer = t.Catcher = t.CarouselV2 = t.Carousel = t.Binder = t.Keys = t.keysInit = t.config = void 0);
      var n = r(24),
        d = i(n),
        o = r(11),
        l = i(o),
        s = r(
          !(function() {
            var t = new Error('Cannot find module "./components/Carousel"');
            throw ((t.code = 'MODULE_NOT_FOUND'), t);
          })()
        ),
        a = i(s),
        c = r(38),
        u = i(c),
        p = r(43),
        f = i(p),
        g = r(21),
        m = i(g),
        h = r(6),
        b = r(44),
        y = r(2),
        I = r(45),
        S = r(10),
        _ = i(S);
      const E = (t.config = h.getConfig),
        T = (t.keysInit = h._init),
        C = (t.Keys = l.default),
        B = (t.Binder = d.default),
        O = (t.Carousel = a.default),
        R = (t.CarouselV2 = u.default),
        v = (t.Catcher = f.default),
        k = (t.keysReducer = b.reducer),
        L = (t.keysSelector = I._selector),
        P = (t.isCurrentBinder = I._isCurrentBinder),
        N = (t.isBinderActive = I._isBinderActive),
        x = (t.getBinders = I._getBinders),
        w = (t.getBinderMarginLeft = I._getBinderMarginLeft),
        F = (t.getBinderMarginTop = I._getBinderMarginTop),
        A = (t.getBinderSelectedId = I._getBinderSelectedId),
        M = (t.getCurrentSelectedId = I._getCurrentSelectedId),
        D = (t.getCurrentBinder = I._getCurrentBinder),
        U = (t.getCurrentBinderId = I._getCurrentBinderId),
        W = (t.getKeyCode = I._getKeyCode),
        H = (t.isLongPress = I._isLongPress),
        V = (t.isVisibleInBinder = I._isVisibleInBinder),
        G = (t.catcher = m.default),
        X = (t.activeBinder = y._activeBinder),
        Y = (t.updateBinder = y._updateBinder),
        z = (t.resetBinder = y._resetBinder),
        q = (t.removeBinder = e => (0, y._removeBinder)(e, !0)),
        j = (t.resetCarousel = y._resetCarousel),
        K = (t.block = _.default.block),
        $ = (t.unblock = _.default.unblock),
        J = (t.blockExcept = _.default.blockExcept),
        Z = (t.unblockExcept = _.default.unblockExcept),
        Q = (t._blocks = _.default);
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(1),
        d = i(n),
        o = r(25),
        l = r(30),
        s = r(0),
        a = r(6),
        c = r(2),
        u = r(33),
        p = i(u),
        f = r(34);
      class g extends n.Component {
        constructor(e) {
          super(e),
            (this.uniqElement = !0),
            (this.innerProps = (0, p.default)(e)),
            (this.state = { mounted: !1 });
        }
        componentWillMount() {
          (this.listenerId = (0, a.addListener)(l.keysHandler, this)),
            (0, c.addBinder)(this.innerProps, s.BINDER_TYPE);
        }
        componentWillReceiveProps(e) {
          this.innerProps = (0, p.default)(e);
        }
        componentDidMount() {
          this.setState({ mounted: !0 }),
            setTimeout(() => this.state.mounted && f.mountState.apply(this), 0);
        }
        componentDidUpdate() {
          f.refreshState.apply(this);
        }
        componentWillUnmount() {
          this.setState({ mounted: !1 }),
            (this.listenerId = (0, a.removeListener)(this.listenerId)),
            (0, c._removeBinder)(this.innerProps.id);
        }
        render() {
          const { id: e, children: t } = this.innerProps;
          return d.default.createElement('div', { id: e }, t);
        }
      }
      (g.propTypes = o.propTypes),
        (g.defaultProps = o.defaultProps),
        (t.default = g);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.defaultProps = t.propTypes = void 0);
      var i = r(3),
        n = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(i);
      const d = (t.propTypes = {
          id: n.default.string.isRequired,
          children: n.default.oneOfType([n.default.object, n.default.array]),
          selector: n.default.string,
          position: n.default.string,
          wrapper: n.default.string,
          filter: n.default.string,
          gap: n.default.number,
          boundedGap: n.default.number,
          topGap: n.default.number,
          rightGap: n.default.number,
          leftGap: n.default.number,
          downGap: n.default.number,
          visibilityOffset: n.default.number,
          strategy: n.default.string,
          refreshStrategy: n.default.string,
          memory: n.default.bool,
          active: n.default.bool,
          onRight: n.default.func,
          onLeft: n.default.func,
          onUp: n.default.func,
          onDown: n.default.func,
          onEnter: n.default.func,
          debounce: n.default.number,
          triggerClick: n.default.bool,
          longPress: n.default.bool,
          onLeftExit: n.default.oneOfType([n.default.string, n.default.func]),
          onRightExit: n.default.oneOfType([n.default.string, n.default.func]),
          onUpExit: n.default.oneOfType([n.default.string, n.default.func]),
          onDownExit: n.default.oneOfType([n.default.string, n.default.func]),
          priority: n.default.number,
          direction: n.default.string,
        }),
        o = (t.defaultProps = {
          selector: 'li',
          active: !0,
          strategy: 'none',
          refreshStrategy: 'first',
          memory: !1,
          filter: null,
          gap: 20,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          visibilityOffset: 0,
          longPress: !0,
          triggerClick: !0,
          priority: 0,
        });
    },
    function(e, t, r) {
      'use strict';
      (function(t) {
        var n = r(13),
          i = r(14),
          d = r(16),
          o = r(27),
          l = r(15),
          s = r(28);
        e.exports = function(e, r) {
          function a(e) {
            var t = e && ((S && e[S]) || e[_]);
            if ('function' == typeof t) return t;
          }
          function c(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e !== e && t !== t;
          }
          function u(e) {
            (this.message = e), (this.stack = '');
          }
          function p(e) {
            function n(n, a, c, p, f, g, m) {
              if (((p = p || E), (g = g || c), m !== l))
                if (r)
                  i(
                    !1,
                    'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types'
                  );
                else if (
                  'production' !== t.env.NODE_ENV &&
                  'undefined' != typeof console
                ) {
                  var h = p + ':' + c;
                  !o[h] &&
                    3 > s &&
                    (d(
                      !1,
                      'You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                      g,
                      p
                    ),
                    (o[h] = !0),
                    s++);
                }
              return null == a[c]
                ? n
                  ? null === a[c]
                    ? new u(
                        'The ' +
                          f +
                          ' `' +
                          g +
                          '` is marked as required ' +
                          ('in `' + p + '`, but its value is `null`.')
                      )
                    : new u(
                        'The ' +
                          f +
                          ' `' +
                          g +
                          '` is marked as required in ' +
                          ('`' + p + '`, but its value is `undefined`.')
                      )
                  : null
                : e(a, c, p, f, g);
            }
            if ('production' !== t.env.NODE_ENV)
              var o = {},
                s = 0;
            var a = n.bind(null, !1);
            return (a.isRequired = n.bind(null, !0)), a;
          }
          function f(e) {
            return p(function(t, r, i, n, d) {
              var o = t[r],
                l = h(o);
              if (l !== e) {
                var s = b(o);
                return new u(
                  'Invalid ' +
                    n +
                    ' `' +
                    d +
                    '` of type ' +
                    ('`' + s + '` supplied to `' + i + '`, expected ') +
                    ('`' + e + '`.')
                );
              }
              return null;
            });
          }
          function g(t) {
            switch (typeof t) {
              case 'number':
              case 'string':
              case 'undefined':
                return !0;
              case 'boolean':
                return !t;
              case 'object':
                if (Array.isArray(t)) return t.every(g);
                if (null === t || e(t)) return !0;
                var r = a(t);
                if (r) {
                  var i,
                    n = r.call(t);
                  if (r !== t.entries) {
                    for (; !(i = n.next()).done; ) if (!g(i.value)) return !1;
                  } else
                    for (; !(i = n.next()).done; ) {
                      var d = i.value;
                      if (d && !g(d[1])) return !1;
                    }
                } else return !1;
                return !0;
              default:
                return !1;
            }
          }
          function m(e, t) {
            return (
              'symbol' === e ||
              'Symbol' === t['@@toStringTag'] ||
              ('function' == typeof Symbol && t instanceof Symbol)
            );
          }
          function h(e) {
            var t = typeof e;
            return Array.isArray(e)
              ? 'array'
              : e instanceof RegExp ? 'object' : m(t, e) ? 'symbol' : t;
          }
          function b(e) {
            if ('undefined' == typeof e || null === e) return '' + e;
            var t = h(e);
            if ('object' === t) {
              if (e instanceof Date) return 'date';
              if (e instanceof RegExp) return 'regexp';
            }
            return t;
          }
          function y(e) {
            var t = b(e);
            return 'array' === t || 'object' === t
              ? 'an ' + t
              : 'boolean' === t || 'date' === t || 'regexp' === t
                ? 'a ' + t
                : t;
          }
          function I(e) {
            return e.constructor && e.constructor.name ? e.constructor.name : E;
          }
          var S = 'function' == typeof Symbol && Symbol.iterator,
            _ = '@@iterator',
            E = '<<anonymous>>',
            T = {
              array: f('array'),
              bool: f('boolean'),
              func: f('function'),
              number: f('number'),
              object: f('object'),
              string: f('string'),
              symbol: f('symbol'),
              any: (function() {
                return p(n.thatReturnsNull);
              })(),
              arrayOf: function(e) {
                return p(function(t, r, n, d, o) {
                  if ('function' != typeof e)
                    return new u(
                      'Property `' +
                        o +
                        '` of component `' +
                        n +
                        '` has invalid PropType notation inside arrayOf.'
                    );
                  var s = t[r];
                  if (!Array.isArray(s)) {
                    var a = h(s);
                    return new u(
                      'Invalid ' +
                        d +
                        ' `' +
                        o +
                        '` of type ' +
                        ('`' +
                          a +
                          '` supplied to `' +
                          n +
                          '`, expected an array.')
                    );
                  }
                  for (var c, p = 0; p < s.length; p++)
                    if (
                      ((c = e(s, p, n, d, o + '[' + p + ']', l)),
                      c instanceof Error)
                    )
                      return c;
                  return null;
                });
              },
              element: (function() {
                return p(function(t, r, i, n, d) {
                  var o = t[r];
                  if (!e(o)) {
                    var l = h(o);
                    return new u(
                      'Invalid ' +
                        n +
                        ' `' +
                        d +
                        '` of type ' +
                        ('`' +
                          l +
                          '` supplied to `' +
                          i +
                          '`, expected a single ReactElement.')
                    );
                  }
                  return null;
                });
              })(),
              instanceOf: function(e) {
                return p(function(t, r, i, n, d) {
                  if (!(t[r] instanceof e)) {
                    var o = e.name || E,
                      l = I(t[r]);
                    return new u(
                      'Invalid ' +
                        n +
                        ' `' +
                        d +
                        '` of type ' +
                        ('`' + l + '` supplied to `' + i + '`, expected ') +
                        ('instance of `' + o + '`.')
                    );
                  }
                  return null;
                });
              },
              node: (function() {
                return p(function(e, t, r, i, n) {
                  return g(e[t])
                    ? null
                    : new u(
                        'Invalid ' +
                          i +
                          ' `' +
                          n +
                          '` supplied to ' +
                          ('`' + r + '`, expected a ReactNode.')
                      );
                });
              })(),
              objectOf: function(e) {
                return p(function(t, r, i, n, d) {
                  if ('function' != typeof e)
                    return new u(
                      'Property `' +
                        d +
                        '` of component `' +
                        i +
                        '` has invalid PropType notation inside objectOf.'
                    );
                  var o = t[r],
                    s = h(o);
                  if ('object' !== s)
                    return new u(
                      'Invalid ' +
                        n +
                        ' `' +
                        d +
                        '` of type ' +
                        ('`' +
                          s +
                          '` supplied to `' +
                          i +
                          '`, expected an object.')
                    );
                  for (var a in o)
                    if (o.hasOwnProperty(a)) {
                      var c = e(o, a, i, n, d + '.' + a, l);
                      if (c instanceof Error) return c;
                    }
                  return null;
                });
              },
              oneOf: function(e) {
                return Array.isArray(e)
                  ? p(function(t, r, n, d, o) {
                      for (var l = t[r], s = 0; s < e.length; s++)
                        if (c(l, e[s])) return null;
                      var i = JSON.stringify(e);
                      return new u(
                        'Invalid ' +
                          d +
                          ' `' +
                          o +
                          '` of value `' +
                          l +
                          '` ' +
                          ('supplied to `' +
                            n +
                            '`, expected one of ' +
                            i +
                            '.')
                      );
                    })
                  : ('production' === t.env.NODE_ENV
                      ? void 0
                      : d(
                          !1,
                          'Invalid argument supplied to oneOf, expected an instance of array.'
                        ),
                    n.thatReturnsNull);
              },
              oneOfType: function(e) {
                if (!Array.isArray(e))
                  return (
                    'production' === t.env.NODE_ENV
                      ? void 0
                      : d(
                          !1,
                          'Invalid argument supplied to oneOfType, expected an instance of array.'
                        ),
                    n.thatReturnsNull
                  );
                for (var r, o = 0; o < e.length; o++)
                  if (((r = e[o]), 'function' != typeof r))
                    return (
                      d(
                        !1,
                        'Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.',
                        y(r),
                        o
                      ),
                      n.thatReturnsNull
                    );
                return p(function(t, r, n, d, o) {
                  for (var s, a = 0; a < e.length; a++)
                    if (((s = e[a]), null == s(t, r, n, d, o, l))) return null;
                  return new u(
                    'Invalid ' +
                      d +
                      ' `' +
                      o +
                      '` supplied to ' +
                      ('`' + n + '`.')
                  );
                });
              },
              shape: function(e) {
                return p(function(t, r, i, n, d) {
                  var o = t[r],
                    s = h(o);
                  if ('object' !== s)
                    return new u(
                      'Invalid ' +
                        n +
                        ' `' +
                        d +
                        '` of type `' +
                        s +
                        '` ' +
                        ('supplied to `' + i + '`, expected `object`.')
                    );
                  for (var a in e) {
                    var c = e[a];
                    if (c) {
                      var p = c(o, a, i, n, d + '.' + a, l);
                      if (p) return p;
                    }
                  }
                  return null;
                });
              },
              exact: function(e) {
                return p(function(t, r, i, n, d) {
                  var s = t[r],
                    a = h(s);
                  if ('object' !== a)
                    return new u(
                      'Invalid ' +
                        n +
                        ' `' +
                        d +
                        '` of type `' +
                        a +
                        '` ' +
                        ('supplied to `' + i + '`, expected `object`.')
                    );
                  var c = o({}, t[r], e);
                  for (var p in c) {
                    var f = e[p];
                    if (!f)
                      return new u(
                        'Invalid ' +
                          n +
                          ' `' +
                          d +
                          '` key `' +
                          p +
                          '` supplied to `' +
                          i +
                          '`.\nBad object: ' +
                          JSON.stringify(t[r], null, '  ') +
                          '\nValid keys: ' +
                          JSON.stringify(Object.keys(e), null, '  ')
                      );
                    var g = f(s, p, i, n, d + '.' + p, l);
                    if (g) return g;
                  }
                  return null;
                });
              },
            };
          return (
            (u.prototype = Error.prototype),
            (T.checkPropTypes = s),
            (T.PropTypes = T),
            T
          );
        };
      }.call(t, r(8)));
    },
    function(e) {
      'use strict';
      /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ function t(e) {
        if (null === e || e === void 0)
          throw new TypeError(
            'Object.assign cannot be called with null or undefined'
          );
        return Object(e);
      }
      var r = Object.getOwnPropertySymbols,
        i = Object.prototype.hasOwnProperty,
        d = Object.prototype.propertyIsEnumerable;
      e.exports = (function() {
        try {
          if (!Object.assign) return !1;
          var e = new String('abc');
          if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0]))
            return !1;
          for (var t = {}, r = 0; 10 > r; r++) t['_' + n(r)] = r;
          var i = Object.getOwnPropertyNames(t).map(function(e) {
            return t[e];
          });
          if ('0123456789' !== i.join('')) return !1;
          var d = {};
          return (
            [
              'a',
              'b',
              'c',
              'd',
              'e',
              'f',
              'g',
              'h',
              'i',
              'j',
              'k',
              'l',
              'm',
              'n',
              'o',
              'p',
              'q',
              'r',
              's',
              't',
            ].forEach(function(e) {
              d[e] = e;
            }),
            'abcdefghijklmnopqrst' ===
              Object.keys(Object.assign({}, d)).join('')
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Object.assign
        : function(e) {
            for (var n, o, l = t(e), a = 1; a < arguments.length; a++) {
              for (var s in ((n = Object(arguments[a])), n))
                i.call(n, s) && (l[s] = n[s]);
              if (r) {
                o = r(n);
                for (var c = 0; c < o.length; c++)
                  d.call(n, o[c]) && (l[o[c]] = n[o[c]]);
              }
            }
            return l;
          };
    },
    function(e, t, r) {
      'use strict';
      (function(t) {
        if ('production' !== t.env.NODE_ENV)
          var i = r(14),
            n = r(16),
            d = r(15),
            o = {};
        e.exports = function(e, r, l, s, a) {
          if ('production' !== t.env.NODE_ENV)
            for (var c in e)
              if (e.hasOwnProperty(c)) {
                var u;
                try {
                  i(
                    'function' == typeof e[c],
                    '%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.',
                    s || 'React class',
                    l,
                    c,
                    typeof e[c]
                  ),
                    (u = e[c](r, c, s, l, null, d));
                } catch (e) {
                  u = e;
                }
                if (
                  (n(
                    !u || u instanceof Error,
                    '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                    s || 'React class',
                    l,
                    c,
                    typeof u
                  ),
                  u instanceof Error && !(u.message in o))
                ) {
                  o[u.message] = !0;
                  var p = a ? a() : '';
                  n(
                    !1,
                    'Failed %s type: %s%s',
                    l,
                    u.message,
                    null == p ? '' : p
                  );
                }
              }
        };
      }.call(t, r(8)));
    },
    function(e, t, r) {
      'use strict';
      var i = r(13),
        n = r(14),
        d = r(15);
      e.exports = function() {
        function e(e, t, r, i, o, l) {
          l === d ||
            n(
              !1,
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
            );
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var r = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
        };
        return (r.checkPropTypes = i), (r.PropTypes = r), r;
      };
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.performAction = void 0),
        (t.keysHandler = function(e, t, r) {
          const {
            id: i,
            onLeft: s,
            onLeftExit: u,
            onUp: m,
            onUpExit: h,
            onRight: b,
            onRightExit: y,
            onDown: I,
            onDownExit: S,
            onEnter: _,
            triggerClick: E,
          } = this.innerProps;
          if (this.listenerId) {
            const T = (0, n.findBinder)((0, d.getBinders)(), i);
            if (T) {
              if (
                r &&
                E &&
                (0, c.isActive)(this.innerProps) &&
                !(0, l.isBlocked)() &&
                !a.default.isBlocked(this.innerProps.id)
              )
                return void document.getElementById(T.nextEl.id).click();
              if (
                !r &&
                (0, c.isActive)(this.innerProps) &&
                !(0, l.isBlocked)() &&
                !a.default.isBlocked(this.innerProps.id) &&
                (!t || (t && this.innerProps.longPress))
              )
                switch (e) {
                  case p.default.left:
                    g(this.innerProps, o.C_LEFT, s, u);
                    break;
                  case p.default.up:
                    g(this.innerProps, o.C_UP, m, h);
                    break;
                  case p.default.right:
                    g(this.innerProps, o.C_RIGHT, b, y);
                    break;
                  case p.default.down:
                    g(this.innerProps, o.C_DOWN, I, S);
                    break;
                  case p.default.enter:
                    _ && ((0, l.block)(), (0, f.execCb)(_, T.nextEl, this));
                    break;
                  default:
                }
            }
          }
        });
      var n = r(4),
        d = r(5),
        o = r(0),
        l = r(9),
        s = r(10),
        a = i(s),
        c = r(32),
        u = r(20),
        p = i(u),
        f = r(2);
      const g = (t.performAction = (e, t, r, i) => {
        (0, l.block)(e.debounce),
          (0, f.determineNewState)(e.id, e, t, r, i, void 0);
      });
    },
    function(e, t, i) {
      'use strict';
      function n(e, t, i, n) {
        const d = (0, l.getDomElement)(n.current.selectedId),
          o = d ? d.getBoundingClientRect()[i] : 0,
          s = (0, l.getCurrentChildren)((0, l.getDomElement)(e), t)
            .map(e => ({ id: e.id, diff: r(e.getBoundingClientRect()[i] - o) }))
            .sort((e, t) => e.diff - t.diff);
        return s[0].id;
      }
      function d(e, t, r) {
        const i = (0, l.getDomElement)(r),
          n = i.getBoundingClientRect()[t],
          d = (0, l.getCurrentChildren)(i, e)
            .map(e => ({ id: e.id, [t]: e.getBoundingClientRect()[t] - n }))
            .filter(e => 0 <= e[t])
            .sort((e, r) => e[t] - r[t]);
        return d[0].id;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.findIdByStrategy = function(e, t, r = null) {
          if (r) return r;
          const i = (0, s.findBinder)(e.binders, t);
          if (i.type === o.CAROUSEL_TYPE) return i.selectedId;
          const {
              position: l,
              strategy: a,
              selectedId: c,
              selector: u,
              elements: p,
              memory: f,
            } = i,
            g = l === o.VERTICAL ? 'top' : 'left';
          return a === o.STRATEGY_MIRROR
            ? n(t, u, g, e)
            : a === o.STRATEGY_START ? d(u, g, t) : f ? c : p[0] && p[0].id;
        }),
        (t.findMirrorExitId = n),
        (t.findStartExitId = d);
      var o = i(0),
        l = i(7),
        s = i(4);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.isActive = function({ id: e, active: t }) {
          return !!t && (0, n.findMountedId)((0, i.getBinders)()) === e;
        });
      var i = r(5),
        n = r(4);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i =
          Object.assign ||
          function(e) {
            for (var t, r = 1; r < arguments.length; r++)
              for (var i in ((t = arguments[r]), t))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          },
        n = r(0);
      t.default = e => {
        let t = i({}, e);
        return (
          t.enterStrategy &&
            (t.enterStrategy === n.STRATEGY_MEMORY
              ? (t.memory = !0)
              : (t.strategy = t.enterStrategy),
            delete t.enterStrategy),
          t
        );
      };
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.updateState = void 0);
      var i =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var i in ((t = arguments[r]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        };
      (t.refreshState = function() {
        const e = d.default.findDOMNode(this),
          {
            id: t,
            filter: r,
            wrapper: i,
            selector: n,
            direction: c,
          } = this.innerProps,
          u = (0, o.findBinder)((0, l.getBinders)(), t);
        if (u) {
          const t = (0, s.calculateElSpace)(
              i ? document.querySelector(i) : document.body
            ),
            d = (0, a.createList)(e, n, r),
            o =
              (0, s.hasElementsDiff)(d, u.elements) ||
              ((0, s.hasWrapperDiff)(t, u.wrapper, c) && 0 < d.length);
          o && p(u, t, d, this.innerProps);
        }
      }),
        (t.mountState = function() {
          const e = d.default.findDOMNode(this),
            { id: t, filter: r, wrapper: i, selector: n } = this.innerProps,
            c = (0, o.findBinder)((0, l.getBinders)(), t);
          if (c) {
            const t = (0, s.calculateElSpace)(
                i ? document.querySelector(i) : document.body
              ),
              d = (0, a.createList)(e, n, r);
            p(c, t, d, this.innerProps);
          }
        });
      var n = r(35),
        d = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(n),
        o = r(4),
        l = r(5),
        s = r(7),
        a = r(36),
        c = r(2),
        u = r(37);
      const p = (t.updateState = (e, t, r, n) => {
        const { id: d, visibilityOffset: o, refreshStrategy: l } = n,
          p = (0, u.next)(r, e, l),
          f = {
            marginLeft: p.marginLeft,
            marginTop: p.marginTop,
            offset: o,
            wrapper: t,
          },
          g = (0, a.build)(r, f),
          m = g.find(e => e.id === p.selectedId),
          h = {
            id: d,
            wrapper: t,
            downLimit: (0, s.downLimit)(g),
            rightLimit: (0, s.rightLimit)(g),
            elements: g,
            prevDir: null,
          };
        (0, c._updateBinder)(i({}, h, p, { nextEl: m }));
      });
    },
    function(e) {
      e.exports = t;
    },
    function(e, t, i) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.calculDowScore = t.calculUpScore = t.calculLeftScore = t.calculRightScore = t.elementSort = t.findElement = t.upArray = t.downArray = t.leftArray = t.rightArray = void 0);
      var n =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var i in ((t = arguments[r]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        };
      (t.build = function(e, t) {
        const { wrapper: r, marginLeft: i, offset: p, marginTop: f } = t,
          g = e.map(d.calculateElSpace);
        return g.map(e => {
          const t = n({}, e, {
            right: e.right - i,
            left: e.left - i,
            top: e.top - f,
            down: e.down - f,
          });
          return {
            id: e.id,
            coords: t,
            left: u(s(e, g)),
            right: u(l(e, g)),
            up: u(c(e, g)),
            down: u(a(e, g)),
            isVisible: (0, o.isVisible)(r, t, i, f, p),
          };
        });
      }),
        (t.createList = function(e, t, r) {
          return [].slice
            .call(e.querySelectorAll(t))
            .filter(
              e => '' !== e.id && -1 === [].slice.call(e.classList).indexOf(r)
            );
        });
      var d = i(7),
        o = i(18);
      const l = (t.rightArray = (e, t) =>
          t.filter(t => e.right <= t.left).sort(p(e, f))),
        s = (t.leftArray = (e, t) =>
          t.filter(t => e.left >= t.right).sort(p(e, g))),
        a = (t.downArray = (e, t) =>
          t.filter(t => e.down <= t.top).sort(p(e, h))),
        c = (t.upArray = (e, t) =>
          t.filter(t => e.top >= t.down).sort(p(e, m))),
        u = (t.findElement = e => (e[0] ? e[0].id : void 0)),
        p = (t.elementSort = (e, t) => (r, i) => t(r, e) - t(i, e)),
        f = (t.calculRightScore = (e, t) =>
          r(e.top - t.top) + r(e.left - t.right)),
        g = (t.calculLeftScore = (e, t) =>
          r(e.top - t.top) + r(e.right - t.left)),
        m = (t.calculUpScore = (e, t) =>
          r(e.down - t.top) + r(e.left - t.left)),
        h = (t.calculDowScore = (e, t) =>
          r(e.top - t.down) + r(e.left - t.left));
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.next = void 0);
      var i =
          Object.assign ||
          function(e) {
            for (var t, r = 1; r < arguments.length; r++)
              for (var i in ((t = arguments[r]), t))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          },
        n = r(17);
      const d = (t.next = (e, t, r) => {
          const { selectedId: d } = t;
          let s = {};
          if (l(e, d)) {
            s = e.find(t => t.id === d);
            const r = (0, n.correctBoundsMargin)(s.id, t);
            return i({ selectedId: s.id }, r);
          }
          if ('previous' === r && d) {
            const r = o(t.selectedId, t.elements, e),
              d = (0, n.correctBoundsMargin)(r.id, t);
            return i({ selectedId: r.id }, d);
          }
          return 0 < e.length
            ? ((s = e[0]), { selectedId: s.id, marginLeft: 0, marginTop: 0 })
            : { selectedId: void 0, marginLeft: 0, marginTop: 0 };
        }),
        o = (e, t, r, i = 0) => {
          const n = t.map(t => t.id).indexOf(e),
            d = 0 === n ? 0 : n - 1;
          return !l(r, t[d].id) && i < r.length
            ? o(t[d].id, t, r, i + 1)
            : r[d];
        },
        l = (e, t) => t !== void 0 && e.map(t => t.id).some(e => e === t);
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(1),
        d = i(n),
        o = r(3),
        l = i(o),
        s = r(11),
        a = i(s),
        c = r(39),
        u = i(c),
        p = r(40),
        f = i(p),
        g = r(22),
        m = i(g),
        h = r(41),
        b = i(h),
        y = r(42),
        I = r(2),
        S = r(0),
        _ = r(12);
      class E extends n.Component {
        constructor(e) {
          super(e),
            (this.state = { initialized: !1 }),
            (this.refreshCarousel = e => {
              const { children: t, preloadItemsCount: r } = this.props;
              r < t.length
                ? this.setState({ refresh: !0 }, () => {
                    e();
                  })
                : e();
            }),
            (this.updatePositions = e => {
              const { children: t, id: r, preloadItemsCount: i } = this.props;
              this.refreshCarousel(() => {
                isNaN(e.iFocused) ||
                  (0, _.itemFocusedHandler)(r, e.iFocused, e.nestedIFocused),
                  isNaN(e.scrollableTranslateX)
                    ? isNaN(e.nestedScrollableTranslateX)
                      ? !isNaN(e.scrollableTranslateY) &&
                        (0, _.verticalScrollHandler)(r, e.scrollableTranslateY)
                      : (0, _.horizontalNestedScrollHandler)(
                          r,
                          e.nestedScrollableTranslateX
                        )
                    : (0, _.horizontalScrollHandler)(
                        r,
                        e.scrollableTranslateX,
                        e.nestedScrollableTranslateX
                      );
              });
            });
        }
        componentWillMount() {
          const {
            children: e,
            childItemWrapper: t,
            direction: r,
            focusedClassName: i,
            horizontalChildItemWrapper: n,
            id: d,
            itemsVisiblesCount: o,
            nestedFocusedClassName: l,
            loop: s,
            preloadItemsCount: a,
            verticalChildItemWrapper: c,
          } = this.props;
          if (!r) throw new Error('You must fill direction');
          else if (
            r === S.CAROUSEL_DIRECTIONS.verticalBidirectional &&
            (!n || !c)
          )
            throw new Error(
              'You must fill horizontal child item wrapper and vertical child item wrapper selectors'
            );
          else if (r !== S.CAROUSEL_DIRECTIONS.verticalBidirectional && !t)
            throw new Error('You must fill child item wrapper selector');
          (0, I.addCarouselToStore)(this.props, S.CAROUSEL_TYPE),
            (0, I._updateBinder)(d, {
              childItemWrapper: t,
              focusedClassName: i,
              direction: r,
              iFocused: 0,
              loop: s,
              horizontalChildItemWrapper: n,
              itemsVisiblesCount: o,
              preloadItemsCount: a,
              nestedFocusedClassName: l,
              nestedScrollableItems: [],
              nestedScrollableRefs: [],
              scrollableItems: [],
              scrollableTranslateX: 0,
              scrollableTranslateY: 0,
              scrollableWidth: 0,
              verticalChildItemWrapper: c,
            });
        }
        componentDidMount() {
          (0, _.itemFocusedHandler)(this.props.id, 0, 0);
        }
        componentWillReceiveProps({
          id: e,
          children: t,
          direction: r,
          itemsVisiblesCount: i,
          itemHeight: n,
          itemWidth: d,
          loop: o,
          preloadItemsCount: l,
        }) {
          const { children: s } = this.props;
        }
        getHorizontalWrapperStyles(e, t, r) {
          return {
            height: e,
            width: `${r + t}px`,
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
          };
        }
        getVerticalWrapperStyles(e, t, r) {
          return {
            height: `${e + r}px`,
            width: t,
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
            display: 'block',
          };
        }
        renderItems(e, t, r, i, n, o, l, s, a, c) {
          const { verticalChildItemWrapper: u } = this.props;
          if (n === S.CAROUSEL_DIRECTIONS.verticalBidirectional) {
            const p = t + r + l;
            return i.map((i, f) => {
              const g = f < p && f > t - r - l,
                h = (0, _.getNestedIFocused)(e, f),
                y = h + r + l;
              if (!g && f < p) {
                const t = (0, _.getItemOffsetHeight)(e, f),
                  r = (0, _.getItemOffsetWidth)(e, f);
                return d.default.createElement(
                  'div',
                  {
                    key: `spacer_${f}`,
                    style: {
                      display:
                        n === S.CAROUSEL_DIRECTIONS.horizontal
                          ? 'inline-block'
                          : 'block',
                    },
                  },
                  d.default.createElement('div', {
                    style: { height: t, width: r },
                  })
                );
              }
              return (
                g &&
                d.default.createElement(
                  m.default,
                  {
                    carouselId: e,
                    direction: n,
                    hasNestedItems: !0,
                    key: `item_${f}`,
                    itemIndex: f,
                    itemStyles: o,
                    preloadItemsCount: l,
                    wrapperHeight: c,
                  },
                  d.default.Children.toArray(i.props.children).map(
                    (t, p) =>
                      `.${t.props.className}` === u
                        ? d.default.createElement(
                            'div',
                            {
                              id: i.props.id,
                              className: t.props.className,
                              key: `${e}_${f}`,
                            },
                            d.default.createElement(
                              b.default,
                              {
                                parentCarouselId: e,
                                parentItemIndex: f,
                                carouselId: `${e}_${f}`,
                                direction: S.CAROUSEL_DIRECTIONS.horizontal,
                                nested: !0,
                                scrollableTranslateX: s,
                                scrollableTranslateY: a,
                              },
                              t.props.children.map((t, i) => {
                                const s = i < y && i > h - r - l;
                                if (!s && i < y) {
                                  const t = (0, _.getNestedItemOffsetWidth)(
                                    e,
                                    f,
                                    i
                                  );
                                  return d.default.createElement(
                                    'div',
                                    {
                                      key: `spacer_${f}_${p}_${i}`,
                                      style: { display: 'inline-block' },
                                    },
                                    d.default.createElement('div', {
                                      style: { width: t },
                                    })
                                  );
                                }
                                return (
                                  s &&
                                  d.default.createElement(
                                    m.default,
                                    {
                                      carouselId: `${e}_${p}`,
                                      parentCarouselId: e,
                                      parentItemIndex: f,
                                      direction: n,
                                      key: `item_${f}_${p}_${i}`,
                                      itemIndex: i,
                                      itemStyles: o,
                                      nested: !0,
                                      preloadItemsCount: l,
                                      wrapperHeight: c,
                                    },
                                    t
                                  )
                                );
                              })
                            )
                          )
                        : t
                  )
                )
              );
            });
          }
          return i.map((i, s) => {
            const a = s < t + r + l && s > t - r - l;
            if (!a) {
              const t = (0, _.getItemOffsetHeight)(e, s),
                r = (0, _.getItemOffsetWidth)(e, s);
              return d.default.createElement(
                'div',
                {
                  key: `spacer_${s}`,
                  style: {
                    display:
                      n === S.CAROUSEL_DIRECTIONS.horizontal
                        ? 'inline-block'
                        : 'block',
                  },
                },
                d.default.createElement('div', {
                  style: { height: t, width: r },
                })
              );
            }
            return (
              a &&
              d.default.createElement(
                m.default,
                {
                  carouselId: e,
                  direction: n,
                  key: `item_${s}`,
                  itemIndex: s,
                  itemStyles: o,
                  preloadItemsCount: l,
                  wrapperHeight: c,
                },
                i
              )
            );
          });
        }
        render() {
          const {
              initialized: e,
              itemsLeft: t,
              itemsTop: r,
              itemsPositionsIndex: i,
              scrollableAnimated: n,
              scrollable2Animated: o,
              scrollable2TranslateX: l,
              scrollablesVisibles: s,
              scrollableHeight: a,
              scrollableWidth: c,
            } = this.state,
            {
              active: p,
              children: g,
              direction: m,
              id: h,
              itemsVisiblesCount: y,
              itemHeight: I,
              itemWidth: E,
              itemStyles: T,
              loop: C,
              preloadItemsCount: B,
              onEnter: O,
              wrapperOverflow: R,
              wrapperHeight: v,
              wrapperWidth: k,
            } = this.props,
            L =
              m === S.CAROUSEL_DIRECTIONS.horizontal
                ? this.getHorizontalWrapperStyles(I, R, k)
                : this.getVerticalWrapperStyles(v, k, R),
            P = (0, _.getIFocused)(h),
            N = (0, _.getScrollableTranslateY)(h) || 0,
            x = (0, _.getScrollableTranslateX)(h) || 0;
          return d.default.createElement(
            'div',
            { id: h, style: L },
            d.default.createElement(
              b.default,
              {
                carouselId: h,
                direction:
                  m === S.CAROUSEL_DIRECTIONS.verticalBidirectional
                    ? S.CAROUSEL_DIRECTIONS.vertical
                    : m,
                scrollableHeight: a,
                scrollableTranslateX: x,
                scrollableTranslateY: N,
                scrollable2TranslateX: l,
                scrollableWidth: c,
              },
              this.renderItems(h, P, y, g, m, T, B, x, N, v)
            ),
            C
              ? d.default.createElement(f.default, {
                  id: `keys-${h}`,
                  direction: m,
                  itemsLeft: t,
                  itemsVisiblesCount: y,
                  itemWidth: E,
                  onEnter: O,
                  preloadItemsCount: B,
                  scrollableTranslateX: x,
                  scrollable2TranslateX: l,
                  scrollableHeight: a,
                  scrollableWidth: c,
                  updatePositions: this.updatePositions,
                  wrapperHeight: v,
                  wrapperWidth: k,
                })
              : d.default.createElement(u.default, {
                  binderId: h,
                  direction: m,
                  onEnter: O,
                  wrapperHeight: v,
                  wrapperWidth: k,
                  updatePositions: this.updatePositions,
                })
          );
        }
      }
      (E.propTypes = y.propTypes),
        (E.defaultProps = y.defaultProps),
        (t.default = E);
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(1),
        d = i(n),
        o = r(3),
        l = i(o),
        s = r(11),
        a = i(s),
        c = r(9),
        u = r(
          !(function() {
            var t = new Error('Cannot find module "../../funcHandler"');
            throw ((t.code = 'MODULE_NOT_FOUND'), t);
          })()
        ),
        p = r(7),
        f = r(0),
        g = r(12),
        m = r(6);
      class h extends n.Component {
        constructor(e) {
          super(e),
            (this.getHorizontalPositions = (e, t, r) => {
              if (r) {
                const r = (0, g.getIFocused)(e),
                  i = (0, g.getNestedIFocused)(e, r),
                  n = (0, g.getNestedScrollableTranslateX)(e, r),
                  d =
                    t === f.CAROUSEL_SCROLLABLE_DIRECTIONS.right
                      ? i + 1
                      : i - 1,
                  o = (0, g.getNestedItemOffsetLeft)(e, r, d),
                  l = (0, g.getNestedItemOffsetWidth)(e, r, d);
                return {
                  iFocused: r,
                  nestedIFocused: i,
                  scrollableTranslateX: n,
                  nextIFocused: r,
                  nextNestedIFocused: d,
                  nextItemFocusedPosition: o,
                  itemWidth: l,
                };
              } else {
                const r = (0, g.getIFocused)(e),
                  i = (0, g.getScrollableTranslateX)(e),
                  n =
                    t === f.CAROUSEL_SCROLLABLE_DIRECTIONS.right
                      ? r + 1
                      : r - 1,
                  d = (0, g.getItemOffsetLeft)(e, n),
                  o = (0, g.getItemOffsetWidth)(e, n);
                return {
                  iFocused: r,
                  scrollableTranslateX: i,
                  nextIFocused: n,
                  nextItemFocusedPosition: d,
                  itemWidth: o,
                };
              }
            }),
            (this.getVerticalPositions = (e, t, r) => {
              const i = (0, g.getIFocused)(e);
              if (r) {
                const r = (0, g.getNestedIFocused)(e, i),
                  n = getNestedScrollableTranslateY(e, i),
                  d =
                    t === f.CAROUSEL_SCROLLABLE_DIRECTIONS.down ? r + 1 : r - 1,
                  o = getNestedItemOffsetTop(e, i, d),
                  l = getNestedItemOffsetHeight(e, i, d);
                return {
                  iFocused: i,
                  nestedIFocused: r,
                  scrollableTranslateY: n,
                  nextIFocused: i,
                  nextNestedIFocused: d,
                  nextItemFocusedPosition: o,
                  itemHeight: l,
                };
              } else {
                const r = (0, g.getScrollableTranslateY)(e),
                  n =
                    t === f.CAROUSEL_SCROLLABLE_DIRECTIONS.down ? i + 1 : i - 1,
                  d = (0, g.getItemOffsetTop)(e, n),
                  o = (0, g.getItemOffsetHeight)(e, n);
                return {
                  iFocused: i,
                  scrollableTranslateY: r,
                  nextIFocused: n,
                  nextItemFocusedPosition: d,
                  itemHeight: o,
                };
              }
            }),
            (this.scrollToDown = e => {
              const {
                  binderId: t,
                  wrapperHeight: r,
                  updatePositions: i,
                } = this.props,
                {
                  iFocused: n,
                  itemHeight: d,
                  scrollableTranslateY: o,
                  nestedIFocused: l,
                  nextIFocused: s,
                  nextNestedIFocused: a,
                  nextItemFocusedPosition: c,
                } = this.getVerticalPositions(
                  t,
                  f.CAROUSEL_SCROLLABLE_DIRECTIONS.down,
                  e
                );
              if (c >= -o && c + d <= r - o) {
                i({ iFocused: s });
              } else if (!isNaN(c)) {
                i({ iFocused: s, scrollableTranslateY: o - d });
              }
            }),
            (this.scrollToLeft = e => {
              const {
                  binderId: t,
                  wrapperWidth: r,
                  updatePositions: i,
                } = this.props,
                {
                  iFocused: n,
                  itemWidth: d,
                  scrollableTranslateX: o,
                  nestedIFocused: l,
                  nextIFocused: s,
                  nextNestedIFocused: a,
                  nextItemFocusedPosition: c,
                } = this.getHorizontalPositions(
                  t,
                  f.CAROUSEL_SCROLLABLE_DIRECTIONS.left,
                  e
                );
              if (c >= -o && c + d <= r - o) {
                if (!e) {
                  i({ iFocused: s });
                } else {
                  i({ iFocused: s, nestedIFocused: a });
                }
              } else if (!isNaN(c)) {
                const t = 0 >= o + d ? o + d : 0;
                if (!e) {
                  i({ iFocused: s, scrollableTranslateX: t });
                } else {
                  i({
                    iFocused: s,
                    nestedIFocused: a,
                    nestedScrollableTranslateX: t,
                  });
                }
              }
            }),
            (this.scrollToRight = e => {
              const {
                  binderId: t,
                  wrapperWidth: r,
                  updatePositions: i,
                } = this.props,
                {
                  iFocused: n,
                  itemWidth: d,
                  scrollableTranslateX: o,
                  nestedIFocused: l,
                  nextIFocused: s,
                  nextNestedIFocused: a,
                  nextItemFocusedPosition: c,
                } = this.getHorizontalPositions(
                  t,
                  f.CAROUSEL_SCROLLABLE_DIRECTIONS.right,
                  e
                );
              if (c >= -o && c + d <= r - o) {
                if (!e) {
                  i({ iFocused: s });
                } else {
                  i({ iFocused: s, nestedIFocused: a });
                }
              } else if (!isNaN(c)) {
                const t = o - d;
                if (!e) {
                  i({ iFocused: s, scrollableTranslateX: t });
                } else {
                  i({
                    iFocused: s,
                    nestedIFocused: a,
                    nestedScrollableTranslateX: t,
                  });
                }
              }
            }),
            (this.scrollToUp = e => {
              const {
                  binderId: t,
                  wrapperHeight: r,
                  updatePositions: i,
                } = this.props,
                {
                  iFocused: n,
                  itemHeight: d,
                  scrollableTranslateY: o,
                  nestedIFocused: l,
                  nextIFocused: s,
                  nextNestedIFocused: a,
                  nextItemFocusedPosition: c,
                } = this.getVerticalPositions(
                  t,
                  f.CAROUSEL_SCROLLABLE_DIRECTIONS.up,
                  e
                );
              if (c >= -o && c + d <= r - o) i({ iFocused: s });
              else if (!isNaN(c)) {
                const e = 0 >= o + d ? o + d : 0;
                i({ iFocused: s, scrollableTranslateY: e });
              }
            }),
            (this.ticking = !1);
        }
        componentWillMount() {
          this.listenerId = (0, m.addListener)(this.keysHandler, this);
        }
        componentWillUnmount() {
          (0, m.removeListener)(this.listenerId);
        }
        keysHandler(e) {
          const { binderId: t, direction: r } = this.props,
            i = Date.now(),
            n = i - this.lastKeysCall;
          if ((0, g.isCarouselActive)(t) && (isNaN(n) || 200 < n)) {
            this.lastKeysCall = Date.now();
            const i = r === f.CAROUSEL_DIRECTIONS.verticalBidirectional;
            switch (e) {
              case m.userConfig.left:
                (r === f.CAROUSEL_DIRECTIONS.horizontal || i) &&
                  this.scrollToLeft(i);
                break;
              case m.userConfig.right:
                (r === f.CAROUSEL_DIRECTIONS.horizontal || i) &&
                  this.scrollToRight(i);
                break;
              case m.userConfig.down:
                (r === f.CAROUSEL_DIRECTIONS.vertical || i) &&
                  this.scrollToDown();
                break;
              case m.userConfig.up:
                (r === f.CAROUSEL_DIRECTIONS.vertical || i) &&
                  this.scrollToUp();
                break;
              case m.userConfig.enter:
                const { selectedId: n } = (0, g.getBinder)(t);
                this.props.onEnter(n);
            }
          }
        }
        shouldComponentUpdate() {
          return !1;
        }
        render() {
          return null;
        }
      }
      t.default = h;
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(1),
        d = i(n),
        o = r(11),
        l = i(o),
        s = r(9),
        a = r(
          !(function() {
            var t = new Error('Cannot find module "../../funcHandler"');
            throw ((t.code = 'MODULE_NOT_FOUND'), t);
          })()
        );
      class c extends n.Component {
        constructor(e) {
          super(e),
            (this.scrollToRight = () => {
              const {
                  iFocused: e,
                  itemsLeft: t,
                  scrollableTranslateX: r,
                  scrollable2TranslateX: i,
                  scrollableWidth: n,
                  wrapperWidth: d,
                  items: o,
                  itemWidth: l,
                  updatePositions: s,
                } = this.props,
                a = o[e + 1] ? e + 1 : 0,
                c = this.getItemsVisibles(r, i, n, d, l);
              if (c.includes(a))
                s({ iFocused: a }, () => {
                  this.ticking = !1;
                });
              else {
                const e = r - l,
                  t = i - l;
                s(
                  {
                    iFocused: a,
                    scrollableTranslateX: e,
                    scrollable2TranslateX: t,
                  },
                  () => {
                    const r = this.mustPlaceScrollableToRight(e),
                      i = this.mustPlaceScrollableToRight(t);
                    if (i) {
                      s({ scrollable2TranslateX: e + n });
                    }
                    if (r) {
                      s({ scrollableTranslateX: t + n });
                    }
                    this.ticking = !1;
                  }
                );
              }
            }),
            (this.onCarouselLoopedRight = () => {
              this.ticking =
                this.ticking ||
                window.requestAnimationFrame(this.scrollToRight);
            }),
            (this.scrollToLeft = () => {
              const {
                  iFocused: e,
                  itemsLeft: t,
                  scrollableTranslateX: r,
                  scrollable2TranslateX: i,
                  scrollableWidth: n,
                  wrapperWidth: d,
                  items: o,
                  itemWidth: l,
                  updatePositions: s,
                } = this.props,
                a = o[e - 1] ? e - 1 : o.length - 1,
                c = this.getItemsVisibles(r, i, n, d, l);
              if (c.includes(a)) {
                s({ iFocused: a }, () => {
                  this.ticking = !1;
                });
              } else {
                const e = r + l,
                  t = i + l;
                s(
                  {
                    iFocused: a,
                    scrollableTranslateX: e,
                    scrollable2TranslateX: t,
                  },
                  () => {
                    const r = this.mustPlaceScrollableToLeft(e),
                      i = this.mustPlaceScrollableToLeft(t);
                    if (i) {
                      s({ scrollable2TranslateX: e - n });
                    }
                    if (r) {
                      s({ scrollableTranslateX: t - n });
                    }
                    this.ticking = !1;
                  }
                );
              }
            }),
            (this.onCarouselLoopedLeft = () => {
              this.ticking =
                this.ticking || window.requestAnimationFrame(this.scrollToLeft);
            }),
            (this.ticking = !1);
        }
        mustPlaceScrollableToRight(e) {
          const {
            itemWidth: t,
            preloadItemsCount: r,
            scrollableWidth: i,
          } = this.props;
          return e <= -(t * r - t + i);
        }
        mustPlaceScrollableToLeft(e) {
          const {
            itemWidth: t,
            preloadItemsCount: r,
            wrapperWidth: i,
          } = this.props;
          return e >= i + t * r - t;
        }
        getItemsVisiblesInScrollable(e, t, r, n) {
          if (e > r || 0 >= e + t) return [];
          if (0 > e) {
            const { items: t } = this.props,
              d = [];
            for (let o = -e / n; o < t.length && d.length < r / n; o++)
              d.push(o);
            return d;
          } else {
            const t = [];
            let d = 0;
            for (let o = e / n; o < r / n; o++) t.push(d), d++;
            return t;
          }
        }
        getItemsVisibles(e, t, r, i, n) {
          const d = this.getItemsVisiblesInScrollable(e, r, i, n),
            o = this.getItemsVisiblesInScrollable(t, r, i, n);
          return d.concat(o);
        }
        performCallback(e) {
          if (e) {
            (0, s.block)();
            const { items: t, iFocused: r } = this.props;
            (0, a.enterTo)(e, t[r].props.id);
          }
        }
        render() {
          const { id: e, onDownExit: t, onUpExit: r, onEnter: i } = this.props;
          return d.default.createElement(l.default, {
            id: e,
            active: !0,
            onLeft: this.onCarouselLoopedLeft,
            onRight: this.onCarouselLoopedRight,
            onUp: () => this.performCallback(r),
            onDown: () => this.performCallback(t),
            onEnter: () => this.performCallback(i),
          });
        }
      }
      t.default = c;
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(1),
        d = i(n),
        o = r(22),
        l = i(o),
        s = r(0),
        a = r(3),
        c = i(a),
        u = r(12);
      class p extends d.default.PureComponent {
        constructor(...e) {
          var t;
          return (t = super(...e)), (this.state = {}), t;
        }
        componentDidMount() {
          const {
            carouselId: e,
            nested: t,
            parentCarouselId: r,
            parentItemIndex: i,
          } = this.props;
          t
            ? (0, u.addNestedScrollableRef)(r, this.el, i)
            : (0, u.addScrollableRef)(e, this.el);
        }
        getHorizontalScrollableStyles() {
          return { display: 'flex', flexDirection: 'row', height: '100%' };
        }
        getVerticalScrollableStyles(e) {
          return { width: '100%', height: e };
        }
        render() {
          const {
              children: e,
              direction: t,
              scrollableHeight: r,
              scrollableTranslateX: i,
              scrollableTranslateY: n,
              scrollable2TranslateX: o,
              scrollableWidth: l,
            } = this.props,
            a =
              t === s.CAROUSEL_DIRECTIONS.horizontal
                ? this.getHorizontalScrollableStyles()
                : this.getVerticalScrollableStyles(r),
            c = this.getHorizontalScrollableStyles();
          return d.default.createElement(
            'div',
            {
              className: 'keys-carousel-scrollable',
              ref: e => {
                this.el = e;
              },
              style: a,
            },
            e
          );
        }
      }
      t.default = p;
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.defaultProps = t.propTypes = void 0);
      var i = r(3),
        n = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(i),
        d = r(0);
      const o = (t.propTypes = {
          children: n.default.oneOfType([n.default.object, n.default.array]),
          id: n.default.string.isRequired,
          active: n.default.bool,
          index: n.default.number,
          onDownExit: n.default.oneOfType([n.default.string, n.default.func]),
          onUpExit: n.default.oneOfType([n.default.string, n.default.func]),
          onEnter: n.default.func,
          itemWidth: n.default.number,
          itemHeight: n.default.number,
          loop: n.default.bool,
          preloadItemsCount: n.default.number,
          wrapperOverflow: n.default.number,
        }),
        l = (t.defaultProps = { children: [], active: !1, index: 0, loop: !1 });
    },
    function(e, t, r) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var d = r(1),
        o = i(d),
        l = r(3),
        s = i(l),
        a = r(6);
      class c extends d.Component {
        constructor(e) {
          super(e),
            (this.history = ''),
            (this.listenerId = (0, a.addListener)(this.keysHandler, this));
        }
        componentWillUnmount() {
          (0, a.removeListener)(this.listenerId);
        }
        render() {
          return this.props.children || null;
        }
        keysHandler(e) {
          (this.history += n(e)),
            this.history.length > this.props.sequence.length &&
              (this.history = this.history.slice(1)),
            this.history.toUpperCase() === this.props.sequence.toUpperCase() &&
              ((this.history = ''), this.props.cb());
        }
      }
      (c.propTypes = {
        sequence: s.default.string.isRequired,
        cb: s.default.func.isRequired,
        children: s.default.oneOfType([s.default.object, s.default.array]),
      }),
        (t.default = c);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.initialKeysSate = void 0);
      var i =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var i in ((t = arguments[r]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        };
      t.reducer = function(e = o, t) {
        switch (t.type) {
          case n.ADD_BINDER: {
            let r = (0, d.computeAddingBinder)(e.binders, t.binder),
              n = (0, d.buildCurrent)(r, e.current);
            return i({}, e, { binders: r, current: n });
          }
          case n.MOUNT_BINDER: {
            let r = (0, d.findBinder)(e.binders, t.binderId);
            r.priority = t.priority;
            let n = (0, d.computeMountBinder)(e.binders, r),
              o = (0, d.buildCurrent)(n, e.current);
            return i({}, e, { binders: n, current: o });
          }
          case n.UPDATE_BINDER: {
            let r = (0, d.updateBinder)(e.binders, t.binder),
              n = (0, d.buildCurrent)(r, e.current);
            return i({}, e, { binders: r, current: n });
          }
          case n.REMOVE_BINDER: {
            let r = (0, d.computeRemoveBinder)(e.binders, t.binderId, t.force),
              n = (0, d.buildCurrent)(r, e.current);
            return i({}, e, { binders: r, current: n });
          }
          case n.ACTIVE_BINDER: {
            let r = (0, d.mountBinder)(e.binders, t.binderId),
              n = (0, d.buildCurrent)(r, e.current);
            return i({}, e, { binders: r, current: n });
          }
          case n.UPDATE_PRESS_STATUS:
            return i({}, e, { PRESS: { press: t.press, keyCode: t.keyCode } });
          case 'RESET_STATE':
            return o;
          default:
            return e;
        }
      };
      var n = r(2),
        d = r(4);
      const o = (t.initialKeysSate = {
        current: { binderId: null, selectedId: null },
        binders: [],
        PRESS: { press: !1 },
      });
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t._isVisibleInBinder = t._isBinderActive = t._getBinderMarginTop = t._getBinderMarginLeft = t._getBinderSelectedId = t._isLongPress = t._getKeyCode = t._getCurrentBinderId = t._getCurrentBinder = t._getBinders = t._getCurrentSelectedId = t._isCurrentBinder = t._selector = void 0);
      var i = r(0),
        n = r(5),
        d = r(19),
        o = r(4);
      const l = (t._selector = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t || { marginLeft: 0, marginTop: 0 };
        }),
        s = (t._isCurrentBinder = e => () => {
          (0, d.ensureState)();
          const t =
            (0, n.getStore)().current && (0, n.getStore)().current.binderId;
          return t === e;
        }),
        a = (t._getCurrentSelectedId = () => () => (
          (0, d.ensureState)(), (0, n.getStore)().current.selectedId
        )),
        c = (t._getBinders = () => () => (
          (0, d.ensureState)(), (0, n.getBinders)()
        )),
        u = (t._getCurrentBinder = () => () => {
          (0, d.ensureState)();
          const { binders: e, current: t } = n.globalStore.getState()[i.NAME];
          return (0, o.findBinder)(e, t.binderId);
        }),
        p = (t._getCurrentBinderId = () => () =>
          (0, n.getStore)().current.binderId),
        f = (t._getKeyCode = () => () => (
          (0, d.ensureState)(), (0, n.getStore)().PRESS.keyCode
        )),
        g = (t._isLongPress = () => () => (
          (0, d.ensureState)(), (0, n.getStore)().PRESS.press
        )),
        m = (t._getBinderSelectedId = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t ? t.selectedId : '';
        }),
        h = (t._getBinderMarginLeft = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t ? t.marginLeft : 0;
        }),
        b = (t._getBinderMarginTop = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t ? t.marginTop : 0;
        }),
        y = (t._isBinderActive = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t && t.mounted;
        }),
        I = (t._isVisibleInBinder = (e, t) => () => {
          (0, d.ensureState)();
          const r = (0, o.findBinder)((0, n.getBinders)(), e);
          if (!r) return !1;
          const i = r.elements.find(e => e.id === t);
          return !!i && i.isVisible;
        });
    },
  ]);
});
