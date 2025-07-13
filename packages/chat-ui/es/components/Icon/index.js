import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["type", "className", "spin", "name"];
import React from 'react';
import clsx from 'clsx';
export var Icon = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var type = props.type,
    className = props.className,
    spin = props.spin,
    name = props.name,
    other = _objectWithoutProperties(props, _excluded);
  var ariaProps = typeof name === 'string' ? {
    'aria-label': name
  } : {
    'aria-hidden': true
  };
  if (type === 'chevron-right') {
    return /*#__PURE__*/React.createElement("svg", {
      fill: "#000",
      height: "18px",
      width: "18px",
      version: "1.1",
      id: "XMLID_287_",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      viewBox: "0 0 24 24",
      xmlSpace: "preserve"
    }, /*#__PURE__*/React.createElement("g", {
      id: "next"
    }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
      points: "6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 \t\t"
    }))));
  } else if (type === 'chevron-left') {
    return /*#__PURE__*/React.createElement("svg", {
      fill: "#000",
      height: "18px",
      width: "18px",
      version: "1.1",
      id: "XMLID_54_",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      viewBox: "0 0 24 24",
      xmlSpace: "preserve"
    }, /*#__PURE__*/React.createElement("g", {
      id: "previous"
    }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
      points: "17.2,23.7 5.4,12 17.2,0.3 18.5,1.7 8.4,12 18.5,22.3 \t\t"
    }))));
  } else if (type === 'restart') {
    return /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M21.7095 7.97114C21.5638 7.87171 21.3845 7.83427 21.2111 7.86704C21.0377 7.89982 20.8844 8.00012 20.785 8.1459L19.428 10.1356C19.0755 8.49311 18.2589 6.98389 17.0439 5.76893C15.379 4.10403 13.1654 3.18713 10.8108 3.18713C8.45626 3.18713 6.24261 4.10403 4.57772 5.76893C1.14076 9.20588 1.14076 14.7982 4.57772 18.2351C6.29619 19.9536 8.55349 20.8128 10.8108 20.8128C13.0681 20.8128 15.3254 19.9536 17.0439 18.2351C17.1677 18.1101 17.2371 17.9412 17.2367 17.7652C17.2363 17.5893 17.1663 17.4207 17.0419 17.2962C16.9174 17.1718 16.7488 17.1017 16.5729 17.1013C16.3969 17.101 16.228 17.1703 16.103 17.2941C13.1848 20.2122 8.43684 20.2122 5.51874 17.2941C2.60065 14.376 2.60065 9.62787 5.51874 6.70978C6.93233 5.29629 8.81172 4.51777 10.8109 4.51777C12.81 4.51777 14.6895 5.29629 16.103 6.70987C17.194 7.80082 17.9051 9.17164 18.1735 10.6598L15.8118 9.04905C15.7396 8.9995 15.6584 8.96469 15.5727 8.9466C15.4871 8.92851 15.3987 8.9275 15.3126 8.94363C15.2266 8.95976 15.1446 8.99272 15.0713 9.0406C14.998 9.08848 14.9349 9.15036 14.8856 9.22268C14.8363 9.29499 14.8017 9.37634 14.7839 9.46204C14.766 9.54775 14.7653 9.63613 14.7817 9.72212C14.7981 9.80811 14.8313 9.89002 14.8794 9.96316C14.9275 10.0363 14.9895 10.0992 15.062 10.1483L18.585 12.5512L18.5855 12.5516C18.6398 12.5885 18.6992 12.6172 18.7618 12.6366C18.7637 12.6373 18.7654 12.6382 18.7673 12.6388C18.7777 12.642 18.7882 12.6432 18.7987 12.6459C18.8513 12.6596 18.9054 12.6668 18.9598 12.6673C19.0683 12.6675 19.1751 12.6411 19.271 12.5905C19.3669 12.5398 19.449 12.4665 19.5101 12.3769L21.8843 8.89576C21.9335 8.82357 21.9681 8.7424 21.9859 8.65686C22.0038 8.57133 22.0047 8.48311 21.9884 8.39725C21.9722 8.31139 21.9392 8.22957 21.8914 8.15645C21.8435 8.08334 21.7817 8.02037 21.7095 7.97114Z",
      fill: "#0F1828"
    }));
  } else if (type === 'back') {
    return /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "18",
      viewBox: "0 0 20 18",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8.5 16.5L1 9M1 9L8.5 1.5M1 9H19",
      stroke: "#0F1828",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }));
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: clsx('Icon', {
      'is-spin': spin
    }, "#svg-icon-".concat(type)),
    ref: ref
  }, ariaProps, other), /*#__PURE__*/React.createElement("use", {
    xlinkHref: "#icon-".concat(type)
  }));
});