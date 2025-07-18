"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Form = require("../Form");
var _useForwardRef = _interopRequireDefault(require("../../hooks/useForwardRef"));
var _excluded = ["className", "type", "variant", "value", "placeholder", "rows", "minRows", "maxRows", "maxLength", "showCount", "multiline", "autoSize", "onChange", "disabled"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getCount(value, maxLength) {
  return "".concat("".concat(value).length).concat(maxLength ? "/".concat(maxLength) : '');
}
var Input = exports.Input = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    _props$type = props.type,
    type = _props$type === void 0 ? 'text' : _props$type,
    oVariant = props.variant,
    value = props.value,
    placeholder = props.placeholder,
    _props$rows = props.rows,
    oRows = _props$rows === void 0 ? 1 : _props$rows,
    _props$minRows = props.minRows,
    minRows = _props$minRows === void 0 ? oRows : _props$minRows,
    _props$maxRows = props.maxRows,
    maxRows = _props$maxRows === void 0 ? 5 : _props$maxRows,
    maxLength = props.maxLength,
    _props$showCount = props.showCount,
    showCount = _props$showCount === void 0 ? !!maxLength : _props$showCount,
    multiline = props.multiline,
    autoSize = props.autoSize,
    onChange = props.onChange,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var initialRows = oRows;
  if (initialRows < minRows) {
    initialRows = minRows;
  } else if (initialRows > maxRows) {
    initialRows = maxRows;
  }
  var _useState = (0, _react.useState)(initialRows),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    rows = _useState2[0],
    setRows = _useState2[1];
  var _useState3 = (0, _react.useState)(21),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    lineHeight = _useState4[0],
    setLineHeight = _useState4[1];
  var inputRef = (0, _useForwardRef.default)(ref);
  var theme = (0, _react.useContext)(_Form.ThemeContext);
  var variant = oVariant || (theme === 'light' ? 'flushed' : 'outline');
  var isMultiline = multiline || autoSize || oRows > 1;
  var Element = isMultiline ? 'textarea' : 'input';
  (0, _react.useEffect)(function () {
    if (!inputRef.current) return;
    var lhStr = getComputedStyle(inputRef.current, null).lineHeight;
    var lh = Number(lhStr.replace('px', ''));
    if (lh !== lineHeight) {
      setLineHeight(lh);
    }
  }, [inputRef, lineHeight]);
  var updateRow = (0, _react.useCallback)(function () {
    if (!autoSize || !inputRef.current) return;
    var target = inputRef.current;
    var prevRows = target.rows;
    target.rows = minRows;
    if (placeholder) {
      target.placeholder = '';
    }

    // eslint-disable-next-line no-bitwise
    var currentRows = ~~(target.scrollHeight / lineHeight);
    if (currentRows === prevRows) {
      target.rows = currentRows;
    }
    if (currentRows >= maxRows) {
      target.rows = maxRows;
      target.scrollTop = target.scrollHeight;
    }
    setRows(currentRows < maxRows ? currentRows : maxRows);
    if (placeholder) {
      target.placeholder = placeholder;
    }
  }, [autoSize, inputRef, lineHeight, maxRows, minRows, placeholder]);
  (0, _react.useEffect)(function () {
    if (value === '') {
      setRows(initialRows);
    } else {
      updateRow();
    }
  }, [initialRows, updateRow, value]);
  var handleChange = (0, _react.useCallback)(function (e) {
    updateRow();
    if (onChange) {
      var valueFromEvent = e.target.value;
      var shouldTrim = maxLength && valueFromEvent.length > maxLength;
      var val = shouldTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;
      onChange(val, e);
    }
  }, [maxLength, onChange, updateRow]);

  // const preventCopyPaste = (event: any) => {
  //   event.preventDefault(); // Prevent the default action
  //   alert("Copy and paste disabled!");
  // }

  var input = /*#__PURE__*/_react.default.createElement(Element, (0, _extends2.default)({
    className: (0, _clsx.default)('Input', "Input--".concat(variant), className, 'inputField'),
    type: type,
    value: value,
    placeholder: placeholder,
    maxLength: maxLength,
    ref: inputRef,
    rows: rows,
    disabled: disabled,
    onChange: handleChange
    // onCopy={preventCopyPaste}
    // onCut={preventCopyPaste}
    // onPaste={preventCopyPaste}
    // onContextMenu={preventCopyPaste}
  }, other));
  if (showCount) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _clsx.default)('InputWrapper', {
        'has-counter': showCount
      })
    }, input, showCount && /*#__PURE__*/_react.default.createElement("div", {
      className: "Input-counter"
    }, getCount(value, maxLength)));
  }
  return input;
});