/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/components/HierarchicalTerms-Lite.js"
/*!*********************************************************!*\
  !*** ./src/blocks/components/HierarchicalTerms-Lite.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */




class HierarchicalTermSelector extends _wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Component {
  constructor() {
    super();
    this.state = {};
  }
  renderTerms(renderedTerms) {
    return renderedTerms.map(term => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "editor-post-taxonomies__hierarchical-terms-choice",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CheckboxControl, {
          checked: true,
          __nextHasNoMarginBottom: true,
          label: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.unescape)(term.name)
        })
      }, term.id);
    });
  }
  render() {
    return [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
      className: "components-base-control__label",
      children: [this.props.label, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        className: "monsterinsights-popular-posts-pro-pill",
        children: "PRO"
      })]
    }, "monsterinsights-hierarchical-term-list-label"), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "editor-post-taxonomies__hierarchical-terms-list monsterinsights-hierarchical-terms monsterinsights-hierarchical-terms-disabled",
      tabIndex: "0",
      role: "group",
      children: this.renderTerms([{
        name: 'News',
        id: 1
      }, {
        name: 'Technology',
        id: 2
      }])
    }, "monsterinsights-hierarchical-term-list")];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HierarchicalTermSelector);

/***/ },

/***/ "./src/blocks/components/PopularPostsLicenseCheck-Lite.js"
/*!****************************************************************!*\
  !*** ./src/blocks/components/PopularPostsLicenseCheck-Lite.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const PopularPostsLicenseCheck = {};
PopularPostsLicenseCheck.canaccess = level => {
  if ('lite' === level) {
    return true;
  }
  return false;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopularPostsLicenseCheck);

/***/ },

/***/ "./src/blocks/components/PopularPostsThemePicker.js"
/*!**********************************************************!*\
  !*** ./src/blocks/components/PopularPostsThemePicker.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopularPostsThemePickerControl)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PopularPostsLicenseCheck_GUTENBERG_APP_VERSION__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PopularPostsLicenseCheck-GUTENBERG_APP_VERSION */ "./src/blocks/components/PopularPostsLicenseCheck-Lite.js");
/* harmony import */ var _theme_access_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./theme-access.mjs */ "./src/blocks/components/theme-access.mjs");
/* harmony import */ var _GUTENBERG_APP_THEME_Icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GUTENBERG_APP_THEME-Icons */ "./src/blocks/components/monsterinsights-Icons.js");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var pure_react_carousel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! pure-react-carousel */ "./node_modules/pure-react-carousel/dist/index.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
 * External dependencies
 */






/**
 * WordPress dependencies
 */




function PopularPostsThemePickerControl({
  className,
  selected,
  help,
  onChange,
  options = [],
  icons = [],
  itemsPerGroup = 4
}) {
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useInstanceId)(PopularPostsThemePickerControl);
  const id = `inspector-monsterinsights-popular-posts-theme-control-${instanceId}`;
  // Enforce the licence gate here, not only through the
  // `monsterinsights-theme-picker-label-disabled` CSS rule. If that stylesheet
  // fails to reach the editor the `pointer-events: none` lock disappears with
  // it, leaving Pro themes freely selectable on Lite.
  const onChangeValue = event => {
    const value = event.target.value;
    if (!(0,_theme_access_mjs__WEBPACK_IMPORTED_MODULE_3__.canSelectTheme)(value, options, _PopularPostsLicenseCheck_GUTENBERG_APP_VERSION__WEBPACK_IMPORTED_MODULE_2__["default"].canaccess)) {
      return;
    }
    onChange(value);
  };
  const slides = [];
  let groupBreakIndex = 0;
  let currentIndex = 0;
  let selectedSlide = 0;
  for (const option_key in options) {
    if (!options.hasOwnProperty(option_key)) {
      continue;
    }
    const option = options[option_key];
    if ('undefined' === typeof slides[groupBreakIndex]) {
      slides[groupBreakIndex] = [];
    }
    slides[groupBreakIndex][currentIndex] = option;
    if (option.value === selected) {
      selectedSlide = groupBreakIndex;
    }
    if (currentIndex === itemsPerGroup - 1) {
      currentIndex = 0;
      groupBreakIndex++;
    } else {
      currentIndex++;
    }
  }
  const carouselNavigation = () => {
    if (slides.length > 1) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "monsterinsights-carousel-navigation",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(pure_react_carousel__WEBPACK_IMPORTED_MODULE_7__.ButtonBack, {
          children: _GUTENBERG_APP_THEME_Icons__WEBPACK_IMPORTED_MODULE_4__["default"].chevronleft
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(pure_react_carousel__WEBPACK_IMPORTED_MODULE_7__.DotGroup, {
          className: "monsterinsights-carousel-navigation-dots"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(pure_react_carousel__WEBPACK_IMPORTED_MODULE_7__.ButtonNext, {
          children: _GUTENBERG_APP_THEME_Icons__WEBPACK_IMPORTED_MODULE_4__["default"].chevronright
        })]
      });
    }
  };
  const checkIcon = () => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
      className: "monsterinsights-theme-picker-check",
      children: _GUTENBERG_APP_THEME_Icons__WEBPACK_IMPORTED_MODULE_4__["default"].checkmark
    });
  };
  const labelClass = option => {
    let labelClass = 'monsterinsights-theme-picker-label-' + option.value;
    if (option.value === selected) {
      labelClass += ' monsterinsights-theme-picker-label-selected';
    }
    if (!_PopularPostsLicenseCheck_GUTENBERG_APP_VERSION__WEBPACK_IMPORTED_MODULE_2__["default"].canaccess(option.level)) {
      labelClass += ' monsterinsights-theme-picker-label-disabled';
    }
    return labelClass;
  };
  return !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(options) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.BaseControl, {
    id: id,
    help: help,
    __nextHasNoMarginBottom: true,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, 'monsterinsights-theme-picker'),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(pure_react_carousel__WEBPACK_IMPORTED_MODULE_7__.CarouselProvider, {
      naturalSlideWidth: 250,
      totalSlides: slides.length,
      className: "monsterinsights-theme-picker-carousel",
      currentSlide: selectedSlide,
      dragEnabled: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(pure_react_carousel__WEBPACK_IMPORTED_MODULE_7__.Slider, {
        children: slides.map((slide, slideIndex) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(pure_react_carousel__WEBPACK_IMPORTED_MODULE_7__.Slide, {
          className: "monsterinsights-theme-picker-slide",
          index: slideIndex,
          children: slide.map((option, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "monsterinsights-slider-theme-option",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
              id: `${id}-${slideIndex}-${index}`,
              className: "monsterinsights-slider-theme-input",
              type: "radio",
              name: id,
              value: option.value,
              onChange: onChangeValue,
              checked: option.value === selected,
              "aria-describedby": !!help ? `${id}__help` : undefined
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("label", {
              htmlFor: `${id}-${slideIndex}-${index}`,
              className: labelClass(option),
              children: [option.value === selected && checkIcon(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "monsterinsights-theme-picker-label-icon",
                children: icons[option.value] ? icons[option.value] : ''
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "monsterinsights-theme-picker-label-text",
                children: option.label
              })]
            })]
          }, `${id}-${slideIndex}-${index}`))
        }, `${id}-${slideIndex}`))
      }), carouselNavigation()]
    })
  });
}

/***/ },

/***/ "./src/blocks/components/monsterinsights-Icons.js"
/*!********************************************************!*\
  !*** ./src/blocks/components/monsterinsights-Icons.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const icons = {};
icons.checkmark = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "24",
  height: "20",
  viewBox: "0 0 24 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M21.0565 2.94355C23.0188 4.87903 24 7.23118 24 10C24 12.7688 23.0188 15.1344 21.0565 17.0968C19.121 19.0323 16.7688 20 14 20C11.2312 20 8.86559 19.0323 6.90323 17.0968C4.96774 15.1344 4 12.7688 4 10C4 7.23118 4.96774 4.87903 6.90323 2.94355C8.86559 0.981183 11.2312 0 14 0C16.7688 0 19.121 0.981183 21.0565 2.94355ZM12.8306 15.2823L20.25 7.8629C20.5726 7.5672 20.5726 7.27151 20.25 6.97581L19.3629 6.04839C19.0403 5.75269 18.7312 5.75269 18.4355 6.04839L12.3871 12.0968L9.56452 9.27419C9.26882 8.97849 8.95968 8.97849 8.6371 9.27419L7.75 10.2016C7.42742 10.4973 7.42742 10.793 7.75 11.0887L11.9435 15.2823C12.2392 15.6048 12.5349 15.6048 12.8306 15.2823Z",
    fill: "#338EEF"
  })
});
icons.chevronright = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "8",
  height: "12",
  viewBox: "0 0 8 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M7.77369 5.53211L2.28571 0.19266C2.1537 0.0642201 1.9934 -6.52786e-08 1.80481 -5.7035e-08C1.61622 -4.87915e-08 1.45592 0.0642201 1.3239 0.192661L0.701556 0.798165C0.569543 0.926605 0.503536 1.08257 0.503536 1.26605C0.484677 1.44954 0.541254 1.6055 0.673267 1.73394L5.05799 6L0.673268 10.2661C0.541255 10.3945 0.484678 10.5505 0.503537 10.7339C0.503537 10.9174 0.569543 11.0734 0.701556 11.2018L1.3239 11.8073C1.45592 11.9358 1.61622 12 1.80481 12C1.9934 12 2.1537 11.9358 2.28571 11.8073L7.77369 6.46789C7.92456 6.33945 8 6.18349 8 6C8 5.81651 7.92456 5.66055 7.77369 5.53211Z",
    fill: "#C4C4C4"
  })
});
icons.chevronleft = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "8",
  height: "12",
  viewBox: "0 0 8 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M0.226309 5.53211L5.71429 0.19266C5.8463 0.0642201 6.0066 -6.52786e-08 6.19519 -5.7035e-08C6.38378 -4.87915e-08 6.54408 0.0642201 6.6761 0.192661L7.29844 0.798165C7.43046 0.926605 7.49646 1.08257 7.49646 1.26605C7.51532 1.44954 7.45875 1.6055 7.32673 1.73394L2.94201 6L7.32673 10.2661C7.45875 10.3945 7.51532 10.5505 7.49646 10.7339C7.49646 10.9174 7.43046 11.0734 7.29844 11.2018L6.6761 11.8073C6.54408 11.9358 6.38378 12 6.19519 12C6.0066 12 5.8463 11.9358 5.71429 11.8073L0.226309 6.46789C0.0754363 6.33945 6.83386e-07 6.18349 6.91406e-07 6C6.99426e-07 5.81651 0.0754363 5.66055 0.226309 5.53211Z",
    fill: "#C4C4C4"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (icons);

/***/ },

/***/ "./src/blocks/index-Lite.js"
/*!**********************************!*\
  !*** ./src/blocks/index-Lite.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popular_posts_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popular-posts-inline */ "./src/blocks/popular-posts-inline/index.js");
/* harmony import */ var _popular_posts_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popular-posts-widget */ "./src/blocks/popular-posts-widget/index.js");



/***/ },

/***/ "./src/blocks/popular-posts-inline/components/monsterinsights-InlineIcons.js"
/*!***********************************************************************************!*\
  !*** ./src/blocks/popular-posts-inline/components/monsterinsights-InlineIcons.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const icons = {};
icons.inlinepop = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "20",
  height: "16",
  viewBox: "0 0 20 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 0H20V2H0V0ZM20 14V16H0V14H20ZM2 4C0.895431 4 0 4.89543 0 6V10C0 11.1046 0.895431 12 2 12H6C7.10457 12 8 11.1046 8 10V6C8 4.89543 7.10457 4 6 4H2ZM10 5H20V7H10V5ZM18 9H10V11H18V9Z",
    fill: "#555D66"
  })
});
icons.alpha = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "38",
  viewBox: "0 0 70 38",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "70",
    height: "37.8947",
    rx: "3",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "5.72729",
    y: "19.8947",
    width: "58.5455",
    height: "8.52632",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "5.72729",
    y: "7.57892",
    width: "17.1818",
    height: "8.52632",
    rx: "3",
    fill: "#338EEF"
  })]
});
icons.beta = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "31",
    y: "21",
    width: "32",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "31",
    y: "10",
    width: "18",
    height: "9",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "7",
    y: "10",
    width: "20",
    height: "20",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "1.5",
    y: "1.5",
    width: "67",
    height: "37",
    rx: "1.5",
    stroke: "#E7F2FD",
    strokeWidth: "3"
  })]
});
icons.charlie = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "28",
  viewBox: "0 0 70 28",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "16",
    y: "19",
    width: "54",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    y: "11",
    width: "70",
    height: "3",
    rx: "1.5",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "26",
    height: "7",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "4.5",
    cy: "23.5",
    r: "4.5",
    fill: "#1170D5"
  })]
});
icons.delta = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "21",
    width: "54",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "22",
    y: "9",
    width: "18",
    height: "9",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M12.0303 9.5625C12.4613 8.8125 13.5387 8.8125 13.9697 9.5625L17.8483 16.3125C18.2793 17.0625 17.7406 18 16.8787 18H9.12134C8.25942 18 7.72072 17.0625 8.15168 16.3125L12.0303 9.5625Z",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "1.5",
    y: "1.5",
    width: "67",
    height: "37",
    rx: "1.5",
    stroke: "#E7F2FD",
    strokeWidth: "3"
  })]
});
icons.echo = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "70",
    height: "40",
    rx: "3",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "24.8182",
    y: "16",
    width: "39.4545",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "5.72729",
    y: "16",
    width: "15.2727",
    height: "9",
    rx: "3",
    fill: "#338EEF"
  })]
});
icons.foxtrot = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "26",
    y: "22",
    width: "44",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "26",
    y: "9",
    width: "28",
    height: "9",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    y: "9",
    width: "22",
    height: "22",
    rx: "3",
    fill: "#338EEF"
  })]
});
icons.golf = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "29",
  viewBox: "0 0 70 29",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    y: "11",
    width: "70",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    y: "26",
    width: "70",
    height: "3",
    rx: "1.5",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "21",
    height: "7",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "25",
    y: "1",
    width: "45",
    height: "3",
    rx: "1.5",
    fill: "#B8D8F9"
  })]
});
icons.hotel = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "70",
    height: "40",
    rx: "3",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "22",
    y: "16",
    width: "40",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M12.0303 16.5625C12.4613 15.8125 13.5387 15.8125 13.9697 16.5625L17.8483 23.3125C18.2793 24.0625 17.7406 25 16.8787 25H9.12134C8.25942 25 7.72072 24.0625 8.15168 23.3125L12.0303 16.5625Z",
    fill: "#338EEF"
  })]
});
icons.india = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
    clipPath: "url(#clip0)",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: "70",
      height: "40",
      rx: "3",
      fill: "#E7F2FD"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      x: "26",
      y: "16",
      width: "36",
      height: "9",
      rx: "3",
      fill: "#1170D5"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      x: "8",
      y: "16",
      width: "14",
      height: "9",
      rx: "3",
      fill: "#1170D5"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      y: "41",
      width: "41",
      height: "4",
      transform: "rotate(-90 0 41)",
      fill: "#338EEF"
    })]
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
      id: "clip0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
        width: "70",
        height: "40",
        rx: "3",
        fill: "white"
      })
    })
  })]
});
icons.juliett = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "70",
    height: "40",
    rx: "3",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "30",
    y: "20",
    width: "32",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M50 14C50 12.3431 51.3431 11 53 11H60C61.1046 11 62 11.8954 62 13V15C62 16.6569 60.6569 18 59 18H53C51.3431 18 50 16.6569 50 15V14Z",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "30",
    y: "11",
    width: "32",
    height: "4",
    rx: "2",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "11",
    width: "18",
    height: "18",
    rx: "3",
    fill: "#338EEF"
  })]
});
icons.kilo = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    y: "22",
    width: "70",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    y: "9",
    width: "26",
    height: "9",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "12.7273",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "25.4545",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "38.1818",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "50.9091",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "63.6364",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    y: "37",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "12.7273",
    y: "37",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "25.4545",
    y: "37",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "38.1818",
    y: "37",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "50.9091",
    y: "37",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "63.6364",
    y: "37",
    width: "6.36364",
    height: "3",
    rx: "1",
    fill: "#B8D8F9"
  })]
});
icons.lima = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "70",
    height: "40",
    rx: "3",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "6",
    y: "22",
    width: "32",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "6",
    y: "8",
    width: "20",
    height: "9",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "42",
    y: "9",
    width: "22",
    height: "22",
    rx: "3",
    fill: "#338EEF"
  })]
});
icons.mike = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "70",
    height: "40",
    rx: "3",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "35",
    y: "15",
    width: "27",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M28.8438 28H10.1562C9.55729 28 9.04818 27.7934 8.62891 27.3802C8.20964 26.967 8 26.4653 8 25.875V22.3C8 21.0297 9.02974 20 10.3 20H21.7C22.9703 20 24 18.9703 24 17.7V13.3C24 12.0297 25.0297 11 26.3 11H28.8438C29.4427 11 29.9518 11.2066 30.3711 11.6198C30.7904 12.033 31 12.5347 31 13.125V25.875C31 26.4653 30.7904 26.967 30.3711 27.3802C29.9518 27.7934 29.4427 28 28.8438 28ZM10.3 11C9.02974 11 8 12.0297 8 13.3V15.7C8 16.9703 9.02974 18 10.3 18H19.7C20.9703 18 22 16.9703 22 15.7V13.3C22 12.0297 20.9703 11 19.7 11H10.3Z",
    fill: "#338EEF"
  })]
});
icons.november = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "70",
  height: "40",
  viewBox: "0 0 70 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "29",
    y: "22",
    width: "33",
    height: "9",
    rx: "3",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "29",
    y: "9",
    width: "18",
    height: "9",
    rx: "3",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M17 28C21.4183 28 25 24.4183 25 20C25 15.5817 21.4183 12 17 12C12.5817 12 9 15.5817 9 20C9 24.4183 12.5817 28 17 28ZM20.544 21.8756L17.5907 16.7081C17.3281 16.2488 16.6719 16.2488 16.4093 16.7081L13.456 21.8756C13.1935 22.3349 13.5217 22.9091 14.0467 22.9091H19.9533C20.4783 22.9091 20.8065 22.3349 20.544 21.8756Z",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "1.5",
    y: "1.5",
    width: "67",
    height: "37",
    rx: "1.5",
    stroke: "#E7F2FD",
    strokeWidth: "3"
  })]
});
icons.themeIcon = (color = '#EB5757') => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    width: "14",
    height: "19",
    viewBox: "0 0 14 19",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M7.875 0.899463C7.875 1.59183 8.0816 2.24711 8.49479 2.8653C8.93229 3.48349 9.44271 4.06458 10.026 4.60859C10.6337 5.15259 11.2292 5.73369 11.8125 6.35188C12.4201 6.97007 12.9306 7.76135 13.3438 8.72572C13.7812 9.66537 14 10.7163 14 11.8785C14 13.832 13.3073 15.5011 11.9219 16.8858C10.5608 18.2953 8.92014 19 7 19C5.07986 19 3.42708 18.2953 2.04167 16.8858C0.680556 15.5011 0 13.832 0 11.8785C0 9.94973 0.668403 8.28062 2.00521 6.87116C2.27257 6.57443 2.58854 6.50024 2.95312 6.64861C3.31771 6.79697 3.5 7.08134 3.5 7.50171V10.6545C3.5 11.3221 3.71875 11.8908 4.15625 12.3607C4.61806 12.8305 5.16493 13.0654 5.79688 13.0654C6.45312 13.0654 7.01215 12.8428 7.47396 12.3978C7.93576 11.9279 8.16667 11.3592 8.16667 10.6916C8.16667 10.2712 8.04514 9.86318 7.80208 9.46754C7.58333 9.0719 7.31597 8.71336 7 8.3919C6.68403 8.07044 6.34375 7.73662 5.97917 7.39043C5.63889 7.04425 5.34722 6.66097 5.10417 6.2406C4.88542 5.82024 4.73958 5.35041 4.66667 4.83114C4.59375 4.31186 4.67882 3.68131 4.92188 2.93948C5.18924 2.17293 5.63889 1.33219 6.27083 0.417277C6.51389 0.0463641 6.84201 -0.0772735 7.25521 0.0463641C7.6684 0.170002 7.875 0.454368 7.875 0.899463Z",
      fill: color
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (icons);

/***/ },

/***/ "./src/blocks/popular-posts-inline/index.js"
/*!**************************************************!*\
  !*** ./src/blocks/popular-posts-inline/index.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_GUTENBERG_APP_THEME_InlineIcons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/GUTENBERG_APP_THEME-InlineIcons */ "./src/blocks/popular-posts-inline/components/monsterinsights-InlineIcons.js");
/* harmony import */ var _components_PopularPostsThemePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PopularPostsThemePicker */ "./src/blocks/components/PopularPostsThemePicker.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/popular-posts-inline/block.json");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);












const blockId = 'monsterinsights/popular-posts-inline';
const MonsterInsightsVars = window.monsterinsights_gutenberg_tool_vars;
const actions = {
  setThemes(themes) {
    return {
      type: 'SET_THEMES',
      themes
    };
  },
  receiveThemes(path) {
    return {
      type: 'RECEIVE_THEMES',
      path
    };
  }
};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.registerStore)('monsterinsights/v1/popular-posts/inline', {
  reducer(state = {
    themes: {}
  }, action) {
    switch (action.type) {
      case 'SET_THEMES':
        return {
          ...state,
          themes: action.themes
        };
    }
    return state;
  },
  actions,
  selectors: {
    receiveThemes(state) {
      const {
        themes
      } = state;
      return themes;
    }
  },
  controls: {
    RECEIVE_THEMES(action) {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
        path: action.path
      });
    }
  },
  resolvers: {
    *receiveThemes(state) {
      const themes = yield actions.receiveThemes('/monsterinsights/v1/popular-posts/themes/inline');
      if ('undefined' !== typeof themes.themes) {
        for (const slug in themes.themes) {
          if (themes.themes.hasOwnProperty(slug)) {
            themes.themes[slug].value = slug;
          }
        }
        return actions.setThemes(themes);
      }
    }
  }
});

/**
 * Register block
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.registerBlockType)(blockId, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_4__,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Inline Popular Posts', "google-analytics-for-wordpress"),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add inline popular posts from MonsterInsights', "google-analytics-for-wordpress"),
  category: 'widgets',
  icon: _components_GUTENBERG_APP_THEME_InlineIcons__WEBPACK_IMPORTED_MODULE_0__["default"].inlinepop,
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Popular', "google-analytics-for-wordpress"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Posts', "google-analytics-for-wordpress"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Inline', "google-analytics-for-wordpress"), 'MonsterInsights'],
  example: {
    attributes: {
      preview: true
    }
  },
  edit: (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.withSelect)(select => {
    return {
      themes: select('monsterinsights/v1/popular-posts/inline').receiveThemes()
    };
  })(props => {
    const {
      attributes: {
        preview,
        theme,
        title_size,
        title_color,
        label_color,
        label_text,
        label_background,
        background_color,
        background_border,
        icon_background,
        icon_color,
        border_color,
        border_color2
      },
      themes,
      setAttributes
    } = props;
    const colors = [{
      name: 'pink',
      color: '#F58EA8'
    }, {
      name: 'red',
      color: '#CD3034'
    }, {
      name: 'orange',
      color: '#FD6A21'
    }, {
      name: 'yellow',
      color: '#FBB82B'
    }, {
      name: 'green',
      color: '#7FDBB6'
    }, {
      name: 'green',
      color: '#21CF86'
    }, {
      name: 'blue',
      color: '#91D2FA'
    }, {
      name: 'blue',
      color: '#1B95E0'
    }, {
      name: 'purple',
      color: '#9A57DD'
    }, {
      name: 'gray',
      color: '#EEEEEE'
    }, {
      name: 'gray',
      color: '#ACB8C3'
    }, {
      name: 'black',
      color: '#000000'
    }];
    const loadedThemes = 'undefined' !== typeof themes.themes ? themes.themes : {};
    const defaultSelected = 'undefined' === typeof props.attributes.theme ? themes.selected : theme;
    const themeObject = 'undefined' !== typeof defaultSelected && 'undefined' !== typeof loadedThemes[defaultSelected] ? loadedThemes[defaultSelected] : {};
    const themeStyles = 'undefined' !== typeof themeObject.styles ? themeObject.styles : {};
    const displayValues = {};
    for (const styleElement in themeStyles) {
      if (!themeStyles.hasOwnProperty(styleElement)) {
        continue;
      }
      for (const styleProp in themeStyles[styleElement]) {
        if (!themeStyles[styleElement].hasOwnProperty(styleProp)) {
          continue;
        }
        const attributeKey = styleElement + '_' + styleProp;
        if ('undefined' === typeof props.attributes[attributeKey]) {
          displayValues[attributeKey] = themeStyles[styleElement][styleProp];
        } else {
          displayValues[attributeKey] = props.attributes[attributeKey];
        }
      }
    }
    const titleControls = () => {
      if ('undefined' === typeof themeStyles.title) {
        return;
      }
      const elements = [];
      if ('undefined' !== typeof themeStyles.title.size) {
        elements.push(FontSizeInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Title Font Size', "google-analytics-for-wordpress"), 'title_size'));
      }
      if ('undefined' !== typeof themeStyles.title.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Title Color', "google-analytics-for-wordpress"), 'title_color'));
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Title Settings', "google-analytics-for-wordpress"),
        children: elements
      }, "monsterinsights-popular-posts-inline-title");
    };
    const labelControls = () => {
      if ('undefined' === typeof themeStyles.label) {
        return;
      }
      const elements = [];
      if ('undefined' !== typeof themeStyles.label.text) {
        elements.push(TextInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label Text', "google-analytics-for-wordpress"), 'label_text'));
      }
      if ('undefined' !== typeof themeStyles.label.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label Color', "google-analytics-for-wordpress"), 'label_color'));
      }
      if ('undefined' !== typeof themeStyles.label.background) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label Background', "google-analytics-for-wordpress"), 'label_background'));
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label Settings', "google-analytics-for-wordpress"),
        children: [' ', elements, ' ']
      }, "monsterinsights-popular-posts-inline-label");
    };
    const borderControls = () => {
      const elements = [];
      if ('undefined' !== typeof themeStyles.border && 'undefined' !== typeof themeStyles.border.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border Color', "google-analytics-for-wordpress"), 'border_color'));
      }
      if ('undefined' !== typeof themeStyles.border && 'undefined' !== typeof themeStyles.border.color2) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom Border Color', "google-analytics-for-wordpress"), 'border_color2'));
      }
      if ('undefined' !== typeof themeStyles.background && 'undefined' !== typeof themeStyles.background.border) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border Color', "google-analytics-for-wordpress"), 'background_border'));
      }
      if (0 === elements.length) {
        return;
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border Settings', "google-analytics-for-wordpress"),
        children: [' ', elements, ' ']
      }, "monsterinsights-popular-posts-inline-border");
    };
    const backgroundControls = () => {
      if ('undefined' === typeof themeStyles.background || 'undefined' === typeof themeStyles.background.color) {
        return;
      }
      const elements = [];
      if ('undefined' !== typeof themeStyles.background.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background Color', "google-analytics-for-wordpress"), 'background_color'));
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background Settings', "google-analytics-for-wordpress"),
        children: [' ', elements, ' ']
      }, "monsterinsights-popular-posts-inline-background");
    };
    const iconControls = () => {
      if ('undefined' === typeof themeStyles.icon) {
        return;
      }
      const elements = [];
      if ('undefined' !== typeof themeStyles.icon.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Icon Color', "google-analytics-for-wordpress"), 'icon_color'));
      }
      if ('undefined' !== typeof themeStyles.icon.background) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Icon Background Color', "google-analytics-for-wordpress"), 'icon_background'));
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Icon Settings', "google-analytics-for-wordpress"),
        children: [' ', elements, ' ']
      }, "monsterinsights-popular-posts-inline-icon");
    };
    const FontSizeInput = (label, attribute) => {
      const value = displayValues[attribute];
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.RangeControl, {
        label: label,
        value: parseInt(value),
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        min: 1,
        max: 100,
        onChange: newValue => setAttributes({
          [attribute]: '' === newValue ? '' : parseInt(newValue)
        })
      }, 'monsterinsights-popular-posts-input' + attribute);
    };
    const TextInput = (label, attribute) => {
      const value = displayValues[attribute];
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.TextControl, {
        label: label,
        type: "text",
        value: value,
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        onChange: newValue => setAttributes({
          [attribute]: newValue
        })
      }, 'monsterinsights-popular-posts-input' + attribute);
    };
    const ColorInput = (label, attribute) => {
      const value = displayValues[attribute];
      return [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
        children: label
      }, 'monsterinsights-popular-posts-label' + attribute), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.ColorPalette, {
        value: value,
        colors: colors,
        onChange: value => {
          setAttributes({
            [attribute]: value
          });
        }
      }, 'monsterinsights-popular-posts-input' + attribute)];
    };
    const ThemeImage = () => {
      if ('undefined' !== typeof themeObject.image && themeObject.image) {
        const imageName = 'undefined' !== typeof themeStyles.image ? themeStyles.image : 'theme-preview-image.jpg';
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "monsterinsights-inline-popular-posts-image",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
            src: MonsterInsightsVars.vue_assets_path + 'img/' + imageName
          })
        });
      }
    };
    const ThemeLabel = () => {
      if ('undefined' !== typeof themeStyles.label) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          style: {
            color: displayValues.label_color,
            backgroundColor: displayValues.label_background
          },
          className: "monsterinsights-inline-popular-posts-label",
          children: displayValues.label_text
        });
      }
    };
    const ThemeTitle = () => {
      if ('undefined' !== typeof themeStyles.title && 'undefined' === typeof themeObject.list && 'undefined' !== typeof themeStyles.title.text) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("a", {
          href: "#",
          className: "monsterinsights-inline-popular-posts-title",
          style: {
            color: displayValues.title_color,
            fontSize: displayValues.title_size + 'px'
          },
          children: themeStyles.title.text
        });
      }
    };
    const ThemeList = () => {
      if ('undefined' !== typeof themeObject.list) {
        const items = [];
        for (const index in themeObject.list) {
          items.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("li", {
            style: {
              color: displayValues.title_color,
              fontSize: displayValues.title_size + 'px'
            },
            children: themeObject.list[index]
          }, 'monsterinsights-popular-posts-preview-list-item-' + index));
        }
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("ul", {
          className: "monsterinsights-inline-popular-posts-list",
          children: items
        });
      }
    };
    const ThemeIcon = () => {
      if ('undefined' !== typeof themeStyles.icon) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          className: "monsterinsights-inline-popular-posts-icon",
          style: {
            backgroundColor: displayValues.icon_background
          },
          children: _components_GUTENBERG_APP_THEME_InlineIcons__WEBPACK_IMPORTED_MODULE_0__["default"].themeIcon(displayValues.icon_color)
        });
      }
    };
    const ThemeBorder = () => {
      if ('undefined' !== typeof themeStyles.border && 'undefined' !== typeof themeStyles.border.color) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          className: "monsterinsights-inline-popular-posts-border",
          style: {
            borderColor: displayValues.border_color
          }
        });
      }
    };
    const ThemeBorder2 = () => {
      if ('undefined' !== typeof themeStyles.border && 'undefined' !== typeof themeStyles.border.color2) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          className: "monsterinsights-inline-popular-posts-border-2",
          style: {
            borderColor: displayValues.border_color2
          }
        });
      }
    };
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.useBlockProps)();
    if (preview) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
          src: MonsterInsightsVars.block_preview_urls.inline,
          style: {
            width: '100%'
          },
          alt: ""
        })
      }, "monsterinsights-popular-posts-inline-block-preview");
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Theme', "google-analytics-for-wordpress"),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_PopularPostsThemePicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
              id: "monsterinsights-popular-posts-inline-theme",
              options: loadedThemes,
              selected: defaultSelected,
              icons: _components_GUTENBERG_APP_THEME_InlineIcons__WEBPACK_IMPORTED_MODULE_0__["default"],
              onChange: option => {
                setAttributes({
                  theme: option
                });
              }
            })
          }, "monsterinsights-popular-posts-inline-theme-row")
        }, "monsterinsights-popular-posts-inline-theme"), titleControls(), labelControls(), borderControls(), backgroundControls(), iconControls()]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: 'monsterinsights-inline-popular-posts-widget monsterinsights-inline-popular-posts-' + defaultSelected,
          style: {
            backgroundColor: displayValues.background_color,
            borderColor: displayValues.background_border
          },
          children: [ThemeImage(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "monsterinsights-inline-popular-posts-text",
            children: [ThemeIcon(), ThemeLabel(), ThemeBorder(), ThemeTitle(), ThemeList(), ThemeBorder2()]
          })]
        })
      })]
    });
  }),
  save: props => {
    return null;
  }
}));

/***/ },

/***/ "./src/blocks/popular-posts-widget/components/monsterinsights-WidgetIcons.js"
/*!***********************************************************************************!*\
  !*** ./src/blocks/popular-posts-widget/components/monsterinsights-WidgetIcons.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const icons = {};
icons.widgetpop = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "16",
  height: "20",
  viewBox: "0 0 16 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 0C0.895431 0 0 0.895431 0 2V10C0 11.1046 0.895431 12 2 12H14C15.1046 12 16 11.1046 16 10V2C16 0.895431 15.1046 0 14 0H2ZM8.94046 4.70557L8 2L7.05954 4.70557L4.19577 4.76393L6.47831 6.49443L5.64886 9.23607L8 7.6L10.3511 9.23607L9.52169 6.49443L11.8042 4.76393L8.94046 4.70557ZM0 14H14V16H0V14ZM10 18H0V20H10V18Z",
    fill: "#555D66"
  })
});
icons.alpha = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "74",
  height: "46",
  viewBox: "0 0 74 46",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "74",
    height: "46",
    rx: "5",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "7.40002",
    y: "12",
    width: "59.2",
    height: "9",
    rx: "2",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "7.40002",
    y: "25",
    width: "51.8",
    height: "9",
    rx: "2",
    fill: "#338EEF"
  })]
});
icons.beta = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "74",
  height: "46",
  viewBox: "0 0 74 46",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M0 15C0 13.3431 1.34315 12 3 12H4V34H3C1.34315 34 0 32.6569 0 31V15Z",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "12",
    y: "12",
    width: "54",
    height: "9",
    rx: "2",
    fill: "#4296F0"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "12",
    y: "25",
    width: "44",
    height: "9",
    rx: "2",
    fill: "#4296F0"
  })]
});
icons.charlie = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "74",
  height: "46",
  viewBox: "0 0 74 46",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "74",
    height: "46",
    rx: "3",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "74",
    height: "4",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "14",
    width: "58",
    height: "9",
    rx: "2",
    fill: "#4296F0"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "27",
    width: "40",
    height: "9",
    rx: "2",
    fill: "#4296F0"
  })]
});
icons.delta = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "74",
  height: "39",
  viewBox: "0 0 74 39",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "31",
    y: "12",
    width: "43",
    height: "7",
    rx: "2",
    fill: "#4296F0"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "31",
    y: "23",
    width: "32",
    height: "7",
    rx: "2",
    fill: "#4296F0"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "31",
    y: "34",
    width: "43",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    y: "12",
    width: "27",
    height: "27",
    rx: "2",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "74",
    height: "4",
    fill: "#1170D5"
  })]
});
icons.echo = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "74",
  height: "76",
  viewBox: "0 0 74 76",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "74",
    height: "76",
    rx: "5",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "41",
    width: "58",
    height: "7",
    rx: "2",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "61",
    width: "7",
    height: "7",
    rx: "3.5",
    fill: "#A0CBF8"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "8",
    width: "58",
    height: "29",
    rx: "2",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "52",
    width: "34",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "46",
    y: "52",
    width: "20",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  })]
});
icons.foxtrot = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "74",
  height: "43",
  viewBox: "0 0 74 43",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "74",
    height: "43",
    rx: "5",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "8",
    width: "58",
    height: "7",
    rx: "2",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "28",
    width: "7",
    height: "7",
    rx: "3.5",
    fill: "#A0CBF8"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "19",
    width: "34",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "46",
    y: "19",
    width: "20",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  })]
});
icons.golf = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "74",
  height: "56",
  viewBox: "0 0 74 56",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "74",
    height: "56",
    rx: "5",
    fill: "#E7F2FD"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "21",
    width: "58",
    height: "7",
    rx: "2",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "41",
    width: "7",
    height: "7",
    rx: "3.5",
    fill: "#A0CBF8"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "8",
    width: "16",
    height: "9",
    rx: "2",
    fill: "#1170D5"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "32",
    width: "34",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "46",
    y: "32",
    width: "20",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  })]
});
icons.hotel = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "74",
  height: "50",
  viewBox: "0 0 74 50",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    width: "74",
    height: "50",
    rx: "5",
    fill: "#338EEF"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M54.0625 42H19.9375C18.8438 42 17.9141 41.6111 17.1484 40.8333C16.3828 40.0556 16 39.1111 16 38V14C16 12.8889 16.3828 11.9444 17.1484 11.1667C17.9141 10.3889 18.8438 10 19.9375 10H54.0625C55.1562 10 56.0859 10.3889 56.8516 11.1667C57.6172 11.9444 58 12.8889 58 14V38C58 39.1111 57.6172 40.0556 56.8516 40.8333C56.0859 41.6111 55.1562 42 54.0625 42ZM28.3867 16.0833C27.5117 15.1389 26.4453 14.6667 25.1875 14.6667C23.9297 14.6667 22.8359 15.1389 21.9062 16.0833C21.0312 16.9722 20.5938 18.0556 20.5938 19.3333C20.5938 20.6111 21.0312 21.7222 21.9062 22.6667C22.8359 23.5556 23.9297 24 25.1875 24C26.4453 24 27.5117 23.5556 28.3867 22.6667C29.3164 21.7222 29.7812 20.6111 29.7812 19.3333C29.7812 18.0556 29.3164 16.9722 28.3867 16.0833ZM21.25 36.6667H52.75V27.3333L45.5312 20C45.0938 19.5556 44.6562 19.5556 44.2188 20L33.0625 31.3333L28.4688 26.6667C28.0312 26.2222 27.5938 26.2222 27.1562 26.6667L21.25 32.6667V36.6667Z",
    fill: "#59A3F2"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "26",
    width: "58",
    height: "7",
    rx: "2",
    fill: "#F1F7FE"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "8",
    y: "37",
    width: "34",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "46",
    y: "37",
    width: "20",
    height: "5",
    rx: "2",
    fill: "#A0CBF8"
  })]
});
icons.comments = color => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    width: "13",
    height: "12",
    viewBox: "0 0 13 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      fill: color
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M7.8251 1.25893C8.70332 2.09821 9.14243 3.10714 9.14243 4.28571C9.14243 5.46429 8.70332 6.47321 7.8251 7.3125C6.94689 8.15179 5.8887 8.57143 4.65056 8.57143C3.78674 8.57143 2.98771 8.34821 2.25346 7.90179C1.63439 8.34821 0.993719 8.57143 0.331456 8.57143C0.302662 8.57143 0.273868 8.5625 0.245074 8.54464C0.216279 8.50893 0.194684 8.47321 0.180287 8.4375C0.151493 8.34821 0.158691 8.26786 0.201882 8.19643C0.50422 7.83929 0.763366 7.35714 0.979321 6.75C0.432235 6.01786 0.158691 5.19643 0.158691 4.28571C0.158691 3.10714 0.5978 2.09821 1.47602 1.25893C2.35424 0.419643 3.41242 0 4.65056 0C5.8887 0 6.94689 0.419643 7.8251 1.25893ZM11.7771 10.1786C11.993 10.7857 12.2522 11.2679 12.5545 11.625C12.5977 11.6964 12.6049 11.7768 12.5761 11.8661C12.5473 11.9554 12.4969 12 12.425 12C11.7627 12 11.122 11.7768 10.5029 11.3304C9.7687 11.7768 8.96967 12 8.10585 12C7.18444 12 6.34941 11.7589 5.60076 11.2768C4.85212 10.7946 4.30503 10.1607 3.9595 9.375C4.21865 9.41071 4.449 9.42857 4.65056 9.42857C6.07587 9.42857 7.29241 8.92857 8.30021 7.92857C9.32239 6.91071 9.83349 5.69643 9.83349 4.28571C9.83349 4.08929 9.82629 3.91071 9.81189 3.75C10.6325 4.07143 11.302 4.59821 11.8203 5.33036C12.3386 6.04464 12.5977 6.83929 12.5977 7.71429C12.5977 8.625 12.3242 9.44643 11.7771 10.1786Z"
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (icons);

/***/ },

/***/ "./src/blocks/popular-posts-widget/index.js"
/*!**************************************************!*\
  !*** ./src/blocks/popular-posts-widget/index.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/popular-posts-widget/block.json");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_GUTENBERG_APP_THEME_WidgetIcons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/GUTENBERG_APP_THEME-WidgetIcons */ "./src/blocks/popular-posts-widget/components/monsterinsights-WidgetIcons.js");
/* harmony import */ var _components_PopularPostsThemePicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/PopularPostsThemePicker */ "./src/blocks/components/PopularPostsThemePicker.js");
/* harmony import */ var _components_HierarchicalTerms_GUTENBERG_APP_VERSION__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/HierarchicalTerms-GUTENBERG_APP_VERSION */ "./src/blocks/components/HierarchicalTerms-Lite.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);


/**
 * WordPress dependencies
 */








/**
 * Internal dependencies
 */




const blockId = 'monsterinsights/popular-posts-widget';
const MonsterInsightsVars = window.monsterinsights_gutenberg_tool_vars;
const actions = {
  setThemes(themes) {
    return {
      type: 'SET_THEMES',
      themes
    };
  },
  receiveThemes(path) {
    return {
      type: 'RECEIVE_THEMES',
      path
    };
  }
};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.registerStore)('monsterinsights/v1/popular-posts/widget', {
  reducer(state = {
    themes: {}
  }, action) {
    switch (action.type) {
      case 'SET_THEMES':
        return {
          ...state,
          themes: action.themes
        };
    }
    return state;
  },
  actions,
  selectors: {
    receiveThemes(state) {
      const {
        themes
      } = state;
      return themes;
    }
  },
  controls: {
    RECEIVE_THEMES(action) {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: action.path
      });
    }
  },
  resolvers: {
    *receiveThemes(state) {
      const themes = yield actions.receiveThemes('/monsterinsights/v1/popular-posts/themes/widget');
      if ('undefined' !== typeof themes.themes) {
        for (const slug in themes.themes) {
          if (themes.themes.hasOwnProperty(slug)) {
            themes.themes[slug].value = slug;
          }
        }
        return actions.setThemes(themes);
      }
    }
  }
});

/**
 * Register block
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(blockId, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_2__,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Popular Posts', "google-analytics-for-wordpress"),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add popular posts from MonsterInsights', "google-analytics-for-wordpress"),
  category: 'widgets',
  icon: _components_GUTENBERG_APP_THEME_WidgetIcons__WEBPACK_IMPORTED_MODULE_7__["default"].widgetpop,
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Popular', "google-analytics-for-wordpress"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Posts', "google-analytics-for-wordpress"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Widget', "google-analytics-for-wordpress"), 'MonsterInsights'],
  example: {
    attributes: {
      preview: true
    }
  },
  edit: (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.withSelect)(select => {
    return {
      themes: select('monsterinsights/v1/popular-posts/widget').receiveThemes()
    };
  })(props => {
    const {
      attributes: {
        preview,
        theme,
        title_size,
        title_color,
        label_color,
        label_text,
        label_background,
        background_color,
        background_border,
        meta_color,
        meta_size,
        meta_author,
        meta_comments,
        meta_date,
        comments_color,
        columns,
        widget_title,
        widget_title_text,
        post_count,
        categories
      },
      themes,
      setAttributes
    } = props;
    const colors = [{
      name: 'pink',
      color: '#F58EA8'
    }, {
      name: 'red',
      color: '#CD3034'
    }, {
      name: 'orange',
      color: '#FD6A21'
    }, {
      name: 'yellow',
      color: '#FBB82B'
    }, {
      name: 'green',
      color: '#7FDBB6'
    }, {
      name: 'green',
      color: '#21CF86'
    }, {
      name: 'blue',
      color: '#91D2FA'
    }, {
      name: 'blue',
      color: '#1B95E0'
    }, {
      name: 'purple',
      color: '#9A57DD'
    }, {
      name: 'gray',
      color: '#EEEEEE'
    }, {
      name: 'gray',
      color: '#ACB8C3'
    }, {
      name: 'black',
      color: '#000000'
    }];
    const loadedThemes = 'undefined' !== typeof themes.themes ? themes.themes : {};
    const defaultSelected = 'undefined' === typeof props.attributes.theme ? themes.selected : theme;
    const themeObject = 'undefined' !== typeof defaultSelected && 'undefined' !== typeof loadedThemes[defaultSelected] ? loadedThemes[defaultSelected] : {};
    const themeStyles = 'undefined' !== typeof themeObject.styles ? themeObject.styles : {};
    const displayValues = {};
    for (const styleElement in themeStyles) {
      if (!themeStyles.hasOwnProperty(styleElement)) {
        continue;
      }
      for (const styleProp in themeStyles[styleElement]) {
        if (!themeStyles[styleElement].hasOwnProperty(styleProp)) {
          continue;
        }
        const attributeKey = styleElement + '_' + styleProp;
        if ('undefined' === typeof props.attributes[attributeKey]) {
          displayValues[attributeKey] = themeStyles[styleElement][styleProp];
        } else {
          displayValues[attributeKey] = props.attributes[attributeKey];
        }
        if ('on' === displayValues[attributeKey]) {
          displayValues[attributeKey] = true;
        }
        if ('off' === displayValues[attributeKey]) {
          displayValues[attributeKey] = false;
        }
      }
    }
    const titleControls = () => {
      if ('undefined' === typeof themeStyles.title) {
        return;
      }
      const elements = [];
      if ('undefined' !== typeof themeStyles.title.size) {
        elements.push(FontSizeInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title Font Size', "google-analytics-for-wordpress"), 'title_size'));
      }
      if ('undefined' !== typeof themeStyles.title.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title Color', "google-analytics-for-wordpress"), 'title_color'));
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title Settings', "google-analytics-for-wordpress"),
        children: elements
      }, "monsterinsights-popular-posts-widget-title");
    };
    const metaStyleControls = () => {
      if ('undefined' === typeof themeStyles.meta) {
        return;
      }
      const elements = [];
      if ('undefined' !== typeof themeStyles.meta.size) {
        elements.push(FontSizeInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Meta Font Size', "google-analytics-for-wordpress"), 'meta_size'));
      }
      if ('undefined' !== typeof themeStyles.meta.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Meta Color', "google-analytics-for-wordpress"), 'meta_color'));
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Meta Settings', "google-analytics-for-wordpress"),
        children: elements
      }, "monsterinsights-popular-posts-widget-meta-styles");
    };
    const commentsStyleControls = () => {
      if ('undefined' === typeof themeStyles.comments) {
        return;
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Settings', "google-analytics-for-wordpress"),
        children: ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Color', "google-analytics-for-wordpress"), 'comments_color')
      }, "monsterinsights-popular-posts-widget-comment-styles");
    };
    const labelControls = () => {
      if ('undefined' === typeof themeStyles.label) {
        return;
      }
      const elements = [];
      if ('undefined' !== typeof themeStyles.label.text) {
        elements.push(TextInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Label Text', "google-analytics-for-wordpress"), 'label_text'));
      }
      if ('undefined' !== typeof themeStyles.label.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Label Color', "google-analytics-for-wordpress"), 'label_color'));
      }
      if ('undefined' !== typeof themeStyles.label.background) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Label Background', "google-analytics-for-wordpress"), 'label_background'));
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Label Settings', "google-analytics-for-wordpress"),
        children: [' ', elements, ' ']
      }, "monsterinsights-popular-posts-widget-label");
    };
    const columnsControls = () => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Wide-Layout Options', "google-analytics-for-wordpress"),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.RadioControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choose Layout', "google-analytics-for-wordpress"),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Adjust the number of columns displayed when the widget is placed in a wide container.', "google-analytics-for-wordpress"),
          className: "monsterinsights-wide-column-options monsterinsights-popular-posts-widget-columns-control",
          options: [{
            value: 1,
            label: column1span()
          }, {
            value: 2,
            label: column2span()
          }, {
            value: 3,
            label: column3span()
          }],
          selected: columns,
          onChange: newValue => {
            setAttributes({
              columns: '' === newValue ? '' : parseInt(newValue)
            });
            const updatedOptions = postCountOptions(parseInt(newValue));
            if (-1 === updatedOptions.indexOf(post_count)) {
              setAttributes({
                post_count: parseInt(updatedOptions[0])
              });
            }
          }
        }, "monsterinsights-popular-posts-widget-columns-control"), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Post Count', "google-analytics-for-wordpress"),
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Number of posts displayed.', "google-analytics-for-wordpress"),
          options: postCountOptions(columns, true),
          value: post_count,
          onChange: newValue => {
            setAttributes({
              post_count: parseInt(newValue)
            });
          }
        }, "monsterinsights-popular-posts-widget-post-count")]
      }, "monsterinsights-popular-posts-widget-columns");
    };
    const postCountOptions = (columns, labeled) => {
      let options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      if (2 === columns) {
        options = [2, 4, 6, 8, 10];
      }
      if (3 === columns) {
        options = [3, 6, 9];
      }
      if (labeled) {
        options = options.map(function (option) {
          return {
            value: option,
            label: option
          };
        });
      }
      return options;
    };
    const metaControls = () => {
      if ('undefined' !== typeof themeStyles.meta) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Options', "google-analytics-for-wordpress"),
          children: [meta_authorControl(), meta_dateControl(), meta_commentsControl()]
        }, "monsterinsights-popular-posts-widget-meta-options");
      }
    };
    const behaviorControls = () => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Behavior Settings', "google-analytics-for-wordpress"),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Widget Title', "google-analytics-for-wordpress"),
          __nextHasNoMarginBottom: true,
          checked: widget_title,
          onChange: newValue => {
            setAttributes({
              widget_title: newValue
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Widget Title', "google-analytics-for-wordpress"),
          type: "text",
          value: widget_title_text,
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          onChange: newValue => setAttributes({
            widget_title_text: newValue
          })
        }, 'monsterinsights-popular-posts-input-widget-title-text'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_HierarchicalTerms_GUTENBERG_APP_VERSION__WEBPACK_IMPORTED_MODULE_9__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Only Show Posts From These Categories', "google-analytics-for-wordpress"),
          slug: "category",
          onUpdateTerms: newValue => {
            setAttributes({
              categories: newValue
            });
          },
          terms: categories
        })]
      }, "monsterinsights-popular-posts-widget-behavior-options");
    };
    const inArray = (needle, haystack) => {
      const length = haystack.length;
      for (let i = 0; i < length; i++) {
        if (haystack[i] == needle) {
          return true;
        }
      }
      return false;
    };
    const meta_authorControl = () => {
      if ('undefined' !== typeof themeStyles.meta.author) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Author', "google-analytics-for-wordpress"),
          __nextHasNoMarginBottom: true,
          checked: displayValues.meta_author,
          onChange: newValue => {
            setAttributes({
              meta_author: newValue
            });
          }
        });
      }
    };
    const meta_dateControl = () => {
      if ('undefined' !== typeof themeStyles.meta.date) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Date', "google-analytics-for-wordpress"),
          __nextHasNoMarginBottom: true,
          checked: displayValues.meta_date,
          onChange: newValue => {
            setAttributes({
              meta_date: newValue
            });
          }
        });
      }
    };
    const meta_commentsControl = () => {
      if ('undefined' !== typeof themeStyles.meta.comments) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Comments', "google-analytics-for-wordpress"),
          __nextHasNoMarginBottom: true,
          checked: displayValues.meta_comments,
          onChange: newValue => {
            setAttributes({
              meta_comments: newValue
            });
          }
        });
      }
    };
    const column1span = () => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("span", {
        className: "monsterinsights-wide-column monsterinsights-wide-column-one",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {})]
      });
    };
    const column2span = () => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("span", {
        className: "monsterinsights-wide-column monsterinsights-wide-column-two",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {})]
      });
    };
    const column3span = () => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("span", {
        className: "monsterinsights-wide-column monsterinsights-wide-column-three",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {})]
      });
    };
    const borderControls = () => {
      const elements = [];
      if ('undefined' !== typeof themeStyles.border && 'undefined' !== typeof themeStyles.border.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Color', "google-analytics-for-wordpress"), 'borderColor'));
      }
      if ('undefined' !== typeof themeStyles.border && 'undefined' !== typeof themeStyles.border.color2) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bottom Border Color', "google-analytics-for-wordpress"), 'borderColor2'));
      }
      if ('undefined' !== typeof themeStyles.background && 'undefined' !== typeof themeStyles.background.border) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Color', "google-analytics-for-wordpress"), 'background_border'));
      }
      if (0 === elements.length) {
        return;
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Settings', "google-analytics-for-wordpress"),
        children: [' ', elements, ' ']
      }, "monsterinsights-popular-posts-inline-border");
    };
    const backgroundControls = () => {
      if ('undefined' === typeof themeStyles.background || 'undefined' === typeof themeStyles.background.color) {
        return;
      }
      const elements = [];
      if ('undefined' !== typeof themeStyles.background.color) {
        elements.push(ColorInput((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Color', "google-analytics-for-wordpress"), 'background_color'));
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Settings', "google-analytics-for-wordpress"),
        children: [' ', elements, ' ']
      }, "monsterinsights-popular-posts-widget-background");
    };
    const FontSizeInput = (label, attribute) => {
      const value = displayValues[attribute];
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.RangeControl, {
        label: label,
        value: parseInt(value),
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        min: 1,
        max: 100,
        onChange: newValue => setAttributes({
          [attribute]: '' === newValue ? '' : parseInt(newValue)
        })
      }, 'monsterinsights-popular-posts-input' + attribute);
    };
    const TextInput = (label, attribute) => {
      const value = displayValues[attribute];
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
        label: label,
        type: "text",
        value: value,
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        onChange: newValue => setAttributes({
          [attribute]: newValue
        })
      }, 'monsterinsights-popular-posts-input' + attribute);
    };
    const ColorInput = (label, attribute) => {
      const value = displayValues[attribute];
      return [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
        children: label
      }, 'monsterinsights-popular-posts-label' + attribute), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
        value: value,
        colors: colors,
        onChange: value => {
          setAttributes({
            [attribute]: value
          });
        }
      }, 'monsterinsights-popular-posts-input' + attribute)];
    };
    const ThemeImage = (list, index) => {
      if (list.length > 0 && 'undefined' !== typeof list[index]) {
        const imageName = list[index];
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "monsterinsights-widget-popular-posts-image",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("img", {
            src: MonsterInsightsVars.vue_assets_path + 'img/' + imageName
          })
        });
      }
    };
    const ThemeLabel = () => {
      if ('undefined' !== typeof themeStyles.label) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          style: {
            color: displayValues.label_color,
            backgroundColor: displayValues.label_background
          },
          className: "monsterinsights-widget-popular-posts-label",
          children: displayValues.label_text
        });
      }
    };
    const ThemeMeta = () => {
      if ('undefined' !== typeof themeStyles.meta) {
        return [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "monsterinsights-widget-popular-posts-meta",
          style: {
            color: displayValues.meta_color,
            fontSize: displayValues.meta_size + 'px'
          },
          children: [Thememeta_author(), ThemeMetaSeparator(), Thememeta_date()]
        }, "monsterinsights-widget-popular-posts-meta-options"), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          children: Thememeta_comments()
        }, "monsterinsights-widget-popular-posts-comments-options")];
      }
    };
    const Thememeta_author = () => {
      if (displayValues.meta_author) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          className: "monsterinsights-widget-popular-posts-author",
          children: "by Aazim Akhtar"
        });
      }
    };
    const ThemeMetaSeparator = () => {
      if (displayValues.meta_author && displayValues.meta_date) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          dangerouslySetInnerHTML: {
            __html: themeStyles.meta.separator
          }
        });
      }
    };
    const Thememeta_comments = () => {
      if ('undefined' !== typeof themeStyles.meta && 'undefined' !== typeof themeStyles.meta.comments && displayValues.meta_comments) {
        const comments_color = 'undefined' !== typeof themeStyles.comments ? displayValues.comments_color : displayValues.meta_color;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("span", {
          className: "monsterinsights-widget-popular-posts-comments",
          style: {
            color: comments_color,
            fontSize: displayValues.meta_size + 'px'
          },
          children: [_components_GUTENBERG_APP_THEME_WidgetIcons__WEBPACK_IMPORTED_MODULE_7__["default"].comments(comments_color), " 24"]
        });
      }
    };
    const Thememeta_date = () => {
      if (displayValues.meta_date) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          className: "monsterinsights-widget-popular-posts-date",
          children: "Yesterday"
        });
      }
    };
    const fillListItems = listItems => {
      while (listItems.length <= 10) {
        listItems = listItems.concat(listItems);
      }
      return listItems;
    };
    const ThemeList = () => {
      if ('undefined' !== typeof themeObject.list && 'undefined' !== typeof themeObject.list.items) {
        // Make sure we have at least 10 items.
        const listItems = fillListItems(themeObject.list.items);
        const imageItems = 'undefined' !== typeof themeObject.list.images ? fillListItems(themeObject.list.images) : [];
        const items = [];
        for (const index in listItems) {
          if (parseInt(index) === parseInt(post_count)) {
            break;
          }
          items.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("li", {
            style: {
              backgroundColor: displayValues.background_color,
              borderColor: displayValues.background_border
            },
            children: [ThemeImage(imageItems, index), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              className: "monsterinsights-widget-popular-posts-text",
              children: [ThemeLabel(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("a", {
                className: "monsterinsights-widget-popular-posts-title",
                style: {
                  color: displayValues.title_color,
                  fontSize: displayValues.title_size + 'px'
                },
                children: listItems[index]
              }), ThemeMeta()]
            })]
          }, 'monsterinsights-popular-posts-preview-list-item-' + index));
        }
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("ul", {
          className: "monsterinsights-widget-popular-posts-list",
          children: items
        });
      }
    };
    const WidgetTitle = () => {
      if (widget_title) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("h2", {
          className: "monsterinsights-widget-popular-posts-widget-title",
          children: widget_title_text
        });
      }
    };
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.useBlockProps)();
    if (preview) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("img", {
          src: MonsterInsightsVars.block_preview_urls.widget,
          style: {
            width: '100%'
          },
          alt: ""
        })
      }, "monsterinsights-popular-posts-widget-block-preview");
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Theme', "google-analytics-for-wordpress"),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_PopularPostsThemePicker__WEBPACK_IMPORTED_MODULE_8__["default"], {
              id: "monsterinsights-popular-posts-widget-theme",
              options: loadedThemes,
              selected: defaultSelected,
              icons: _components_GUTENBERG_APP_THEME_WidgetIcons__WEBPACK_IMPORTED_MODULE_7__["default"],
              onChange: option => {
                setAttributes({
                  theme: option
                });
              }
            })
          }, "monsterinsights-popular-posts-widget-theme-row")
        }, "monsterinsights-popular-posts-widget-theme"), titleControls(), backgroundControls(), labelControls(), borderControls(), metaStyleControls(), commentsStyleControls(), columnsControls(), metaControls(), behaviorControls()]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: 'monsterinsights-widget-popular-posts-widget monsterinsights-widget-popular-posts-' + defaultSelected + ' monsterinsights-widget-popular-posts-columns-' + columns,
          children: [WidgetTitle(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "monsterinsights-widget-popular-posts-text",
            children: ThemeList()
          })]
        })
      })]
    });
  }),
  save: props => {
    return null;
  }
}));

/***/ },

/***/ "./src/plugins/Headline-Analyzer/block-toolbar.js"
/*!********************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/block-toolbar.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_headline_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/headline-api */ "./src/plugins/Headline-Analyzer/utils/headline-api.js");
/* harmony import */ var _utils_headline_ownership__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/headline-ownership */ "./src/plugins/Headline-Analyzer/utils/headline-ownership.js");
/* harmony import */ var _components_HeadlineAISuggestions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/HeadlineAISuggestions */ "./src/plugins/Headline-Analyzer/components/HeadlineAISuggestions.js");
/* harmony import */ var _metabox_components_pro_badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../metabox/components/pro-badge */ "./src/plugins/metabox/components/pro-badge.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);











const withHeadlineOptimize = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const toolVars = window.monsterinsights_gutenberg_tool_vars;
    const licenseType = toolVars?.license_type ?? 'lite';
    const upgradeUrl = toolVars?.upgrade_url ?? '';
    // Mirrors the PHP proxy gate (license_can('plus') → plus, pro, master).
    // Lite and Basic fall through to the upsell.
    const canOptimize = ['plus', 'pro', 'master'].includes(licenseType);
    // Roles without monsterinsights_view_dashboard can't get a bearer token, so
    // the toolbar entry (and its upsell) is hidden for them — clicking it could
    // only ever surface a misleading auth error. See HeadlineOptimizeButton.
    const userCanOptimize = toolVars?.can_optimize_headline ?? false;
    const [popoverOpen, setPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [aiSuggestions, setAiSuggestions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [aiLoading, setAiLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [aiError, setAiError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [rateLimitCountdown, setRateLimitCountdown] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    const abortRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

    // The Popover renders in the top document, but the heading block lives
    // inside the editor canvas iframe — a plain document.querySelector for the
    // block returns null there, leaving the Popover unanchored at the editor's
    // corner. Anchor instead to the floating block toolbar (which IS in the top
    // document) so the popover drops in just beneath it; if that toolbar isn't
    // present (e.g. Top Toolbar mode), fall back to the block element and
    // translate its iframe-relative rect into top-document coordinates.
    const clientIdRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(props.clientId);
    clientIdRef.current = props.clientId;
    const popoverAnchorRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    if (!popoverAnchorRef.current) {
      popoverAnchorRef.current = {
        ownerDocument: document,
        getBoundingClientRect() {
          const toolbar = document.querySelector('.block-editor-block-contextual-toolbar');
          if (toolbar) {
            return toolbar.getBoundingClientRect();
          }
          const iframe = document.querySelector('iframe[name="editor-canvas"]');
          const canvasDoc = iframe?.contentDocument ?? document;
          const blockEl = canvasDoc.querySelector(`[data-block="${clientIdRef.current}"]`);
          if (!blockEl) {
            return new window.DOMRect();
          }
          const rect = blockEl.getBoundingClientRect();
          if (iframe && canvasDoc !== document) {
            const frame = iframe.getBoundingClientRect();
            return new window.DOMRect(rect.left + frame.left, rect.top + frame.top, rect.width, rect.height);
          }
          return rect;
        }
      };
    }
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!props.isSelected) {
        setPopoverOpen(false);
      }
    }, [props.isSelected]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (rateLimitCountdown <= 0) {
        return;
      }
      const t = setTimeout(() => setRateLimitCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }, [rateLimitCountdown]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      return () => {
        if (abortRef.current) {
          abortRef.current.abort();
        }
      };
    }, []);
    const handleOptimize = async () => {
      // Open immediately with the loading state — results and errors render
      // into the already-visible popover. If the user dismisses it (or
      // deselects the block) mid-fetch, it stays closed rather than
      // reappearing when the response lands.
      setPopoverOpen(true);
      if (abortRef.current) {
        abortRef.current.abort();
      }
      abortRef.current = new AbortController();
      setAiLoading(true);
      setAiError(null);
      setAiSuggestions(null);
      try {
        const result = await (0,_utils_headline_api__WEBPACK_IMPORTED_MODULE_6__.optimizeHeadline)({
          headline: headlineText,
          signal: abortRef.current.signal
        });
        if (!result?.suggestions?.length) {
          throw {
            type: 'unknown',
            retryable: false,
            meta: {}
          };
        }
        setAiSuggestions(result);
      } catch (err) {
        const normalized = (0,_utils_headline_api__WEBPACK_IMPORTED_MODULE_6__.normalizeNetworkError)(err);
        if (normalized.type === 'aborted') {
          return;
        }
        setAiError(normalized);
        if (normalized.type === 'rate_limited') {
          setRateLimitCountdown(normalized.meta?.retryAfter ?? 60);
        }
      } finally {
        setAiLoading(false);
      }
    };
    const handleApply = headline => {
      // Intentional: AI suggestions are plain text and replace the heading's
      // RichText content wholesale. Existing inline <strong>/<em>/<a> in the
      // user's heading is dropped on apply by design.
      props.setAttributes({
        content: headline
      });
      setPopoverOpen(false);
    };
    const handleMenuClick = () => {
      if (!canOptimize) {
        setPopoverOpen(true);
        return;
      }
      handleOptimize();
    };

    // Early return AFTER hooks — Rules of Hooks require consistent hook order
    // across renders for a given component instance.
    if (props.name !== 'core/heading') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(BlockEdit, {
        ...props
      });
    }

    // `content` is normally a RichTextData instance here (not a plain string) —
    // RichTextData shims String.prototype methods like .replace/.trim onto
    // itself, so a duck-type check on .replace (rather than typeof === 'string')
    // accepts both a plain string and RichTextData. This is a defensive
    // fallback to '' for any attribute shape outside that contract; the
    // core/block crash this fix addresses is already excluded by the
    // core/heading check above, since core/block never reaches this line.
    const rawContent = props.attributes?.content;
    const headlineText = typeof rawContent?.replace === 'function' ? rawContent.replace(/<[^>]*>/g, '').trim() : '';
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockSettingsMenuControls, {
        children: ({
          selectedClientIds,
          onClose
        }) => {
          // SlotFill is global — gate so we only render the item for the
          // currently-selected heading block, between Edit as HTML and Delete.
          if (!userCanOptimize || !selectedClientIds || !selectedClientIds.includes(props.clientId)) {
            return null;
          }
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
            disabled: canOptimize && (aiLoading || rateLimitCountdown > 0),
            onClick: () => {
              handleMenuClick();
              onClose();
            },
            children: canOptimize && aiLoading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Optimizing…', "google-analytics-for-wordpress") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Optimize this headline', "google-analytics-for-wordpress")
          });
        }
      }), userCanOptimize && popoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
        anchor: popoverAnchorRef.current,
        placement: "bottom-start",
        onClose: () => setPopoverOpen(false),
        className: "monsterinsights-headline-toolbar-popover",
        children: !canOptimize ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_HeadlineAISuggestions__WEBPACK_IMPORTED_MODULE_8__["default"], {
            isLocked: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_metabox_components_pro_badge__WEBPACK_IMPORTED_MODULE_9__["default"], {
            license: "lite",
            upgrade_url: upgradeUrl
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
          children: [aiLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "monsterinsights-ai-loading",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Optimizing your headline…', "google-analytics-for-wordpress")
            })]
          }), aiError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "monsterinsights-ai-error",
            children: [aiError.type === 'rate_limited' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: rateLimitCountdown > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.sprintf)(/* translators: %d: seconds remaining before retry. */
              (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Too many requests. Try again in %ds.', "google-analytics-for-wordpress"), rateLimitCountdown) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Too many requests. Please try again.', "google-analytics-for-wordpress")
            }), aiError.type === 'auth' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("We couldn't verify your license with the AI service. Please check that your website is connected and your license is active.", "google-analytics-for-wordpress")
            }), aiError.type === 'validation' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Couldn't process this headline. Please try a different one.", "google-analytics-for-wordpress")
            }), aiError.type === 'exhausted' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("p", {
              children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("You've used all your AI credits for this month.", "google-analytics-for-wordpress"), /^https:\/\//i.test(upgradeUrl) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
                children: [' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("a", {
                  href: upgradeUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Upgrade', "google-analytics-for-wordpress")
                })]
              })]
            }), aiError.type === 'server' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('AI service is temporarily unavailable. Please try again in a moment.', "google-analytics-for-wordpress")
            }), aiError.type === 'network' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Couldn't reach the AI service. Check your connection and try again.", "google-analytics-for-wordpress")
            }), aiError.type === 'unknown' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('An unexpected error occurred. Please try again.', "google-analytics-for-wordpress")
            })]
          }), aiSuggestions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_HeadlineAISuggestions__WEBPACK_IMPORTED_MODULE_8__["default"], {
            suggestions: aiSuggestions.suggestions,
            currentTitle: headlineText,
            onReplace: () => {},
            onApply: handleApply
          })]
        })
      })]
    });
  };
}, 'withHeadlineOptimize');
if ('undefined' !== typeof monsterinsights_gutenberg_tool_vars && monsterinsights_gutenberg_tool_vars.allowed_post_types.includes(monsterinsights_gutenberg_tool_vars.current_post_type) && monsterinsights_gutenberg_tool_vars.is_headline_analyzer_enabled &&
// Mirror the sidebar election: the non-owner bundle must not also register
// the toolbar entry. See utils/headline-ownership.js.
(0,_utils_headline_ownership__WEBPACK_IMPORTED_MODULE_7__.claimHeadlineAnalyzerOwnership)()) {
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockEdit', 'monsterinsights/headline-optimize', withHeadlineOptimize, 10);
}

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlineAISuggestionItem.js"
/*!******************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlineAISuggestionItem.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _HeadlinePieChart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HeadlinePieChart */ "./src/plugins/Headline-Analyzer/components/HeadlinePieChart.js");
/* harmony import */ var _utils_score_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/score-color */ "./src/plugins/Headline-Analyzer/utils/score-color.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const InfoIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 15 15",
  fill: "none",
  "aria-hidden": "true",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
    d: "M7.41667 14.0833C11.0986 14.0833 14.0833 11.0986 14.0833 7.41667C14.0833 3.73477 11.0986 0.75 7.41667 0.75C3.73477 0.75 0.75 3.73477 0.75 7.41667C0.75 11.0986 3.73477 14.0833 7.41667 14.0833Z",
    stroke: "#393F4C",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
    d: "M7.41699 7.41666V10.0833",
    stroke: "#393F4C",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("circle", {
    cx: "7.41667",
    cy: "4.75001",
    r: "0.666667",
    fill: "#393F4C"
  })]
});
const LockIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
  width: "11",
  height: "14",
  viewBox: "0 0 11 14",
  fill: "none",
  "aria-hidden": "true",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0.329492 6.38431H1.22773C1.29538 6.38431 1.35021 6.32947 1.35021 6.26183V4.22882C1.35021 3.06633 1.82596 2.0093 2.59148 1.24336C2.59172 1.24313 2.59185 1.24282 2.59185 1.24249C2.59185 1.24216 2.59198 1.24185 2.59221 1.24161C3.35826 0.475745 4.41552 0 5.57881 0C6.74137 0 7.79855 0.475895 8.56463 1.24198L8.56577 1.243C9.33151 2.00897 9.80741 3.06615 9.80741 4.22882V6.26183C9.80741 6.32947 9.86224 6.38431 9.92988 6.38431H10.6204C10.8016 6.38431 10.9499 6.53265 10.9499 6.71369V13.6706C10.9499 13.8517 10.8016 14 10.6204 14H0.329492C0.14834 14 0 13.8517 0 13.6706V6.71369C0 6.53265 0.14834 6.38431 0.329492 6.38431ZM2.99312 6.26195C2.99312 6.32953 3.0479 6.38431 3.11548 6.38431H8.04168C8.10932 6.38431 8.16416 6.32947 8.16416 6.26183V4.20535C8.16416 3.49455 7.87328 2.84786 7.4054 2.37928C7.40525 2.37913 7.40502 2.37912 7.40486 2.37925C7.4047 2.37938 7.40446 2.37936 7.40431 2.37922C6.93596 1.91065 6.28939 1.61966 5.57881 1.61966C4.86776 1.61966 4.22108 1.91064 3.75213 2.37902C3.28398 2.84762 2.99312 3.49442 2.99312 4.20535V6.26195ZM6.35205 9.45618C6.21671 10.0523 5.70559 10.6798 5.83505 11.2772L5.96741 11.888C6.04681 12.2544 5.76857 12.6009 5.39364 12.6025C5.02704 12.604 4.74791 12.2742 4.81006 11.9129L4.93373 11.194C5.03527 10.6037 4.56208 10.0074 4.45282 9.41849C4.44212 9.36082 4.43652 9.30136 4.43652 9.24059C4.43652 8.705 4.87061 8.27091 5.40643 8.27091C5.94168 8.27091 6.37611 8.705 6.37611 9.24059C6.37611 9.31469 6.36779 9.38684 6.35205 9.45618Z",
    fill: "currentColor"
  })
});
const HeadlineAISuggestionItem = ({
  suggestion,
  isSelected,
  isLocked,
  onReplace,
  onApply
}) => {
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/editor');
  const [showReason, setShowReason] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const infoRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const score = Number.isFinite(suggestion?.score) ? suggestion.score : 0;
  const color = (0,_utils_score_color__WEBPACK_IMPORTED_MODULE_5__.getScoreColor)(score);

  // Locked preview shown to Lite users in place of real AI suggestions. Renders
  // as a <div> with no interactive descendants so the row stays out of the tab
  // order and assistive tech doesn't announce a fake action — the only call to
  // action lives in the ProBadge below the list.
  if (isLocked) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: `monsterinsights-ai-suggestion-item ${color.className} is-locked`,
      "aria-hidden": "true",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "monsterinsights-ai-suggestion-item__primary",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
          className: "monsterinsights-ai-suggestion-item__score",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeadlinePieChart__WEBPACK_IMPORTED_MODULE_4__["default"], {
            barScore: score,
            barColor: color.hex,
            width: 40
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            className: "monsterinsights-ai-suggestion-item__score-value",
            children: score
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          className: "monsterinsights-ai-suggestion-item__headline",
          children: suggestion.headline
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          className: "monsterinsights-ai-suggestion-item__lock",
          "aria-hidden": "true",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(LockIcon, {})
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "monsterinsights-ai-suggestion-item__info",
        "aria-hidden": "true",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InfoIcon, {})
      })]
    });
  }
  const handleReplace = () => {
    if (onReplace) {
      onReplace(suggestion.headline);
    }
    if (onApply) {
      onApply(suggestion.headline);
    } else {
      editPost({
        title: suggestion.headline
      });
    }
  };

  // The row click target is a real <button>, with the (i) info trigger as a
  // sibling — never nested inside the row button. This keeps the ARIA tree valid
  // (no nested interactive elements) and gets us native Space/Enter activation
  // without a manual onKeyDown that would scroll the page on Space.
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: `monsterinsights-ai-suggestion-item ${color.className}${isSelected ? ' is-selected' : ''}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
      type: "button",
      className: "monsterinsights-ai-suggestion-item__primary",
      onClick: handleReplace,
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: 1: headline text, 2: score out of 100. */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%1$s, score %2$d out of 100', "google-analytics-for-wordpress"), suggestion.headline, score),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
        className: "monsterinsights-ai-suggestion-item__score",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeadlinePieChart__WEBPACK_IMPORTED_MODULE_4__["default"], {
          barScore: score,
          barColor: color.hex,
          width: 40
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          className: "monsterinsights-ai-suggestion-item__score-value",
          children: score
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "monsterinsights-ai-suggestion-item__headline",
        children: suggestion.headline
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
      ref: infoRef,
      type: "button",
      className: "monsterinsights-ai-suggestion-item__info",
      onMouseEnter: () => setShowReason(true),
      onMouseLeave: () => setShowReason(false),
      onFocus: () => setShowReason(true),
      onBlur: () => setShowReason(false),
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Why this suggestion', "google-analytics-for-wordpress"),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InfoIcon, {})
    }), showReason && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
      anchor: infoRef.current,
      placement: "left",
      focusOnMount: false,
      className: "monsterinsights-ai-suggestion-item__reasoning-popover",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "monsterinsights-ai-suggestion-item__reasoning",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reason', "google-analytics-for-wordpress")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
          children: suggestion.reasoning
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlineAISuggestionItem);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlineAISuggestions.js"
/*!***************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlineAISuggestions.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HeadlineAISuggestionItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeadlineAISuggestionItem */ "./src/plugins/Headline-Analyzer/components/HeadlineAISuggestionItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const norm = s => (s ?? '').trim().toLowerCase();
const LOCKED_PREVIEW_SCORES = [91, 91, 90, 90, 88];
const HeadlineAISuggestions = ({
  suggestions,
  currentTitle = '',
  isLocked = false,
  onReplace,
  onApply
}) => {
  if (isLocked) {
    const placeholderHeadline = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sample optimized headline preview', "google-analytics-for-wordpress");
    const lockedSuggestions = LOCKED_PREVIEW_SCORES.map(score => ({
      score,
      headline: placeholderHeadline,
      reasoning: ''
    }));
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "monsterinsights-ai-suggestions",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
        className: "monsterinsights-ai-suggestions__heading",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Suggested Improvements', "google-analytics-for-wordpress")
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "monsterinsights-ai-suggestions__sub",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a headline to replace current one', "google-analytics-for-wordpress")
      }), lockedSuggestions.map((suggestion, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_HeadlineAISuggestionItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
        suggestion: suggestion,
        isLocked: true
      }, index))]
    });
  }
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  const currentNorm = norm(currentTitle);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "monsterinsights-ai-suggestions",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
      className: "monsterinsights-ai-suggestions__heading",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Suggested Improvements', "google-analytics-for-wordpress")
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: "monsterinsights-ai-suggestions__sub",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a headline to replace current one', "google-analytics-for-wordpress")
    }), suggestions.map((suggestion, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_HeadlineAISuggestionItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
      suggestion: suggestion,
      isSelected: norm(suggestion.headline) === currentNorm,
      onReplace: onReplace,
      onApply: onApply
    }, index))]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlineAISuggestions);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlineOptimizeButton.js"
/*!****************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlineOptimizeButton.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const SparkleIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg", {
  className: "monsterinsights-headline-optimize-button__icon",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": "true",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M11.1429 4.71428C11.1429 9.21145 14.7885 12.8571 19.2857 12.8571C14.7885 12.8571 11.1429 16.5028 11.1429 21C11.1429 16.5028 7.49717 12.8571 3 12.8571C7.49717 12.8571 11.1429 9.21145 11.1429 4.71428Z",
    fill: "currentColor"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M17.1424 3C17.1424 4.89355 18.6774 6.42857 20.571 6.42857C18.6774 6.42857 17.1424 7.96358 17.1424 9.85714C17.1424 7.96358 15.6074 6.42857 13.7139 6.42857C15.6074 6.42857 17.1424 4.89355 17.1424 3Z",
    fill: "currentColor"
  })]
});
const HeadlineOptimizeButton = ({
  isLoading,
  onOptimize,
  licenseType
}) => {
  // Plus, Pro, and Master can run the optimizer (mirrors the PHP
  // license_can('plus') gate); Lite and Basic get the upsell button.
  const canOptimize = ['plus', 'pro', 'master'].includes(licenseType);

  // The server token gate needs monsterinsights_view_dashboard. Roles that lack
  // it (e.g. Authors) would hit a misleading auth error on click, so hide the
  // optimizer outright rather than showing a button — or a license upsell — that
  // can never work for them. They keep the read-only analyzer panels.
  const userCanOptimize = window.monsterinsights_gutenberg_tool_vars?.can_optimize_headline ?? false;
  if (!userCanOptimize) {
    return null;
  }
  if (!canOptimize) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "monsterinsights-headline-optimize-button-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Upgrade to Pro to optimize headlines', "google-analytics-for-wordpress"),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("button", {
          type: "button",
          className: "monsterinsights-headline-optimize-button",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SparkleIcon, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Optimize This Headline', "google-analytics-for-wordpress")
          })]
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "monsterinsights-headline-optimize-button-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("button", {
      className: "monsterinsights-headline-optimize-button",
      disabled: isLoading,
      onClick: onOptimize,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SparkleIcon, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        children: isLoading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Optimizing…', "google-analytics-for-wordpress") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Optimize This Headline', "google-analytics-for-wordpress")
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlineOptimizeButton);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlinePanelCharacterCount.js"
/*!*********************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlinePanelCharacterCount.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons */ "./src/plugins/Headline-Analyzer/icons.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _HeadlinePieChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HeadlinePieChart */ "./src/plugins/Headline-Analyzer/components/HeadlinePieChart.js");
/* harmony import */ var _utils_score_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/score-color */ "./src/plugins/Headline-Analyzer/utils/score-color.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








const HeadlinePanelCharacterCount = props => {
  const textPanelTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Character Count', "google-analytics-for-wordpress");
  const characterLength = props.data.result.length;
  const barScore = characterLength >= 66 ? 100 : Math.round(characterLength * 1.51);
  let classOnLength = '';
  let statusOnLength = '';
  let barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.green;
  let descOnCharLength = '';
  if (characterLength <= 19) {
    classOnLength = 'red';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.red;
  } else if (characterLength >= 20 && characterLength <= 34) {
    classOnLength = 'orange';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.orange;
  } else if (characterLength >= 35 && characterLength <= 66) {
    classOnLength = 'green';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.green;
  } else if (characterLength >= 67 && characterLength <= 79) {
    classOnLength = 'orange';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.orange;
  } else if (characterLength >= 80) {
    classOnLength = 'red';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.red;
  }
  if (characterLength <= 34) {
    statusOnLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Too Short', "google-analytics-for-wordpress");
    descOnCharLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You have space to add more keywords and power words to boost your rankings and click-through rate.', "google-analytics-for-wordpress");
  } else if (characterLength >= 35 && characterLength <= 66) {
    statusOnLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Good', "google-analytics-for-wordpress");
    descOnCharLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Headlines that are about 55 characters long will display fully in search results and tend to get more clicks.', "google-analytics-for-wordpress");
  } else if (characterLength >= 67) {
    statusOnLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Too Long', "google-analytics-for-wordpress");
    descOnCharLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('At this length, it will get cut off in search results. Try reducing it to about 55 characters.', "google-analytics-for-wordpress");
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: textPanelTitle,
      className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('monsterinsights-headline-analyzer-panel-character-count', 'monsterinsights-headline-analyzer-panel-has-icon', classOnLength),
      icon: 'green' === classOnLength ? _icons__WEBPACK_IMPORTED_MODULE_3__["default"].check : _icons__WEBPACK_IMPORTED_MODULE_3__["default"].warning,
      initialOpen: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "monsterinsights-headline-analyzer-pie-chart-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('monsterinsights-headline-analyzer-character-length', classOnLength),
            children: characterLength
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_HeadlinePieChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
            barScore: barScore,
            barColor: barColor
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: "monsterinsights-headline-analyzer-status-on-character-length",
            children: statusOnLength
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
          children: descOnCharLength
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlinePanelCharacterCount);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlinePanelSearchPreview.js"
/*!********************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlinePanelSearchPreview.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const HeadlinePanelSearchPreview = props => {
  const panelTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search Preview', "google-analytics-for-wordpress");
  const descText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Here is how your headline will look like in google search results page.', "google-analytics-for-wordpress");
  const postUrl = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/editor').getPermalink();
  const postUrlAttribute = {
    href: postUrl
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: panelTitle,
      className: "monsterinsights-headline-analyzer-panel-search-preview",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
          children: props.data.sentence
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          className: "monsterinsights-headline-analyzer-post-url",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
            ...postUrlAttribute,
            target: "_blank",
            children: postUrl
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: descText
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlinePanelSearchPreview);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlinePanelSentiment.js"
/*!****************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlinePanelSentiment.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons */ "./src/plugins/Headline-Analyzer/icons.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const HeadlinePanelSentiment = props => {
  const textNeutralSentiment = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your headline has a neutral sentiment.', "google-analytics-for-wordpress");
  const textNeutralSentimentGuideline = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Headlines that are strongly positive or negative tend to get more engagement then neutral ones.', "google-analytics-for-wordpress");
  const textPositiveSentiment = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your headline has a positive sentiment.', "google-analytics-for-wordpress");
  const textPositiveSentimentGuideline = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Positive headlines tend to get better engagement than neutral or negative ones.', "google-analytics-for-wordpress");
  const textNegativeSentiment = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your headline has a negative sentiment.', "google-analytics-for-wordpress");
  const textNegativeSentimentGuideline = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Negative headlines are attention-grabbing and tend to perform better than neutral ones.', "google-analytics-for-wordpress");
  const textPanelTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sentiment', "google-analytics-for-wordpress");
  const sentiment = 'neu' === props.data.result.sentiment ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Neutral', "google-analytics-for-wordpress") : 'pos' === props.data.result.sentiment ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Positive', "google-analytics-for-wordpress") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Negative', "google-analytics-for-wordpress");
  const sentimentIcon = 'neu' === props.data.result.sentiment ? _icons__WEBPACK_IMPORTED_MODULE_3__["default"].neutral : 'pos' === props.data.result.sentiment ? _icons__WEBPACK_IMPORTED_MODULE_3__["default"].smile : _icons__WEBPACK_IMPORTED_MODULE_3__["default"].negative;
  const classOnSentiment = 'neu' === props.data.result.sentiment ? 'orange' : 'pos' === props.data.result.sentiment ? 'green' : 'red';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: textPanelTitle,
      className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('monsterinsights-headline-analyzer-panel-sentiment', 'monsterinsights-headline-analyzer-panel-has-icon', classOnSentiment),
      icon: sentimentIcon,
      initialOpen: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h4", {
          children: sentiment
        }), 'neu' === props.data.result.sentiment ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
          children: [textNeutralSentiment, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), " ", textNeutralSentimentGuideline]
        }) : '', 'pos' === props.data.result.sentiment ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
          children: [textPositiveSentiment, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), " ", textPositiveSentimentGuideline]
        }) : '', 'neg' === props.data.result.sentiment ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
          children: [textNegativeSentiment, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), " ", textNegativeSentimentGuideline]
        }) : '']
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlinePanelSentiment);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlinePanelStartEndWords.js"
/*!********************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlinePanelStartEndWords.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const HeadlinePanelStartEndWords = props => {
  const textPanelTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Beginning & Ending Words', "google-analytics-for-wordpress");
  const words = props.data.result.input_array_orig;
  const guideLineText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Most readers only look at the first and last 3 words of a headline before deciding whether to click.', "google-analytics-for-wordpress");
  let beginningWords = '';
  let endingWords = '';
  if (words.length >= 6) {
    beginningWords = words.slice(0, 3).join(' ');
    endingWords = words.slice(-3).join(' ');
  } else if (words.length > 3 && words.length <= 5) {
    beginningWords = words.slice(0, 3).join(' ');
    endingWords = words.slice(3).join(' ');
  } else {
    beginningWords = words.slice(0, 3).join(' ');
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: textPanelTitle,
      className: "monsterinsights-headline-analyzer-panel-beginning-ending-words",
      initialOpen: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: [beginningWords ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "monsterinsights-headline-analyzer-words beginning",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            children: beginningWords
          })
        }) : '', endingWords ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "monsterinsights-headline-analyzer-words ending",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            children: endingWords
          })
        }) : '', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          className: "monsterinsights-headline-analyzer-words-guideline",
          children: guideLineText
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlinePanelStartEndWords);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlinePanelType.js"
/*!***********************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlinePanelType.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const HeadlinePanelType = props => {
  const headlineTypes = props.data.result.headline_types.join(', ');
  const panelTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Headline Type', "google-analytics-for-wordpress");
  const typePanelTitle = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
    className: "monsterinsights-headline-analyzer-panel-types-title",
    children: [panelTitle, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      children: headlineTypes
    })]
  });
  const typeLinkText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %1$s: HTML line break tags. %2$s: opening anchor tag. %3$s: closing anchor tag. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Headlines that are lists and how-to get more engagement on average than other types of headlines. %1$sRead more about %2$sdifferent types of headlines here.%3$s', "google-analytics-for-wordpress"), '<br/><br/>', '<a href="https://optinmonster.com/why-these-21-headlines-went-viral-and-how-you-can-copy-their-success/" target="_blank" className="monsterinsights-headline-analyzer-link">', '</a>');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: typePanelTitle,
      className: "monsterinsights-headline-analyzer-panel-types",
      initialOpen: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h4", {
          children: headlineTypes
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          dangerouslySetInnerHTML: {
            __html: typeLinkText
          }
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlinePanelType);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlinePanelWordBalance.js"
/*!******************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlinePanelWordBalance.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons */ "./src/plugins/Headline-Analyzer/icons.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _HeadlineWordsBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HeadlineWordsBlock */ "./src/plugins/Headline-Analyzer/components/HeadlineWordsBlock.js");
/* harmony import */ var _utils_score_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/score-color */ "./src/plugins/Headline-Analyzer/utils/score-color.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








const HeadlinePanelWordBalance = props => {
  const textPanelTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Word Balance', "google-analytics-for-wordpress");
  const textGuideline = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Compare the percentages of your results to the goal for each category and adjust as necessary.', "google-analytics-for-wordpress");
  const classOnScore = (0,_utils_score_color__WEBPACK_IMPORTED_MODULE_6__.getScoreColor)(props.data.score).className;
  const classOnCommonWords = 0 === props.data.result.common_words_per ? 'red' : props.data.result.common_words_per < 0.2 ? 'orange' : 'green';
  const classOnCommonWordsBg = 0 === props.data.result.common_words_per ? 'red-bg' : props.data.result.common_words_per < 0.2 ? 'orange-bg' : 'green-bg';
  const textGetMoreClicks = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your headline would be more likely to get clicks if it had more uncommon words.', "google-analytics-for-wordpress");
  const guideLineOnCommonWords = props.data.result.common_words_per < 0.2 ? textGetMoreClicks : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Headlines with 20–30% common words are more likely to get clicks.', "google-analytics-for-wordpress");
  const classOnUnCommonWords = 0 === props.data.result.uncommon_words_per ? 'red' : props.data.result.uncommon_words_per < 0.1 ? 'orange' : 'green';
  const classOnUnCommonWordsBg = 0 === props.data.result.uncommon_words_per ? 'red-bg' : props.data.result.uncommon_words_per < 0.1 ? 'orange-bg' : 'green-bg';
  const guideLineOnUnCommonWords = props.data.result.uncommon_words_per < 0.1 ? textGetMoreClicks : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Headlines with uncommon words are more likely to get clicks.', "google-analytics-for-wordpress");
  const classOnEmotionalWords = 0 === props.data.result.emotion_words_per ? 'red' : props.data.result.emotion_words_per < 0.1 ? 'orange' : 'green';
  const classOnEmotionalWordsBg = 0 === props.data.result.emotion_words_per ? 'red-bg' : props.data.result.emotion_words_per < 0.1 ? 'orange-bg' : 'green-bg';
  const guideLineOnEmotionalWords = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Emotionally triggered headlines are likely to drive more clicks.', "google-analytics-for-wordpress");
  const classOnPowerWords = 0 === props.data.result.power_words.length ? 'orange' : 'green';
  const classOnPowerWordsBg = 0 === props.data.result.power_words.length ? 'orange' : 'green-bg';
  const guideLineOnPowerWords = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Headlines with Power Words are more likely to get clicks.', "google-analytics-for-wordpress");
  const textCommonWords = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Common Words', "google-analytics-for-wordpress");
  const textTwentyThirty = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('20–30%', "google-analytics-for-wordpress");
  const textUncommonWords = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Uncommon Words', "google-analytics-for-wordpress");
  const textTenTwenty = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('10–20%', "google-analytics-for-wordpress");
  const textEmotionalWords = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Emotional Words', "google-analytics-for-wordpress");
  const textTenFifteen = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('10–15%', "google-analytics-for-wordpress");
  const textPowerWords = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Power Words', "google-analytics-for-wordpress");
  const textLeastOne = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('At least one', "google-analytics-for-wordpress");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: textPanelTitle,
      className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('monsterinsights-headline-analyzer-panel-word-balance', 'monsterinsights-headline-analyzer-panel-has-icon', classOnScore),
      icon: 'green' === classOnScore ? _icons__WEBPACK_IMPORTED_MODULE_3__["default"].check : _icons__WEBPACK_IMPORTED_MODULE_3__["default"].warning,
      initialOpen: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h4", {
          children: props.data.result.word_balance
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
          children: textGuideline
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_HeadlineWordsBlock__WEBPACK_IMPORTED_MODULE_5__["default"], {
          title: textCommonWords,
          value: Math.round(props.data.result.common_words_per * 100),
          goalValue: textTwentyThirty,
          words: props.data.result.common_words,
          guideLine: guideLineOnCommonWords,
          classOnScore: classOnCommonWords,
          classOnScoreBg: classOnCommonWordsBg
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_HeadlineWordsBlock__WEBPACK_IMPORTED_MODULE_5__["default"], {
          title: textUncommonWords,
          value: Math.round(props.data.result.uncommon_words_per * 100),
          goalValue: textTenTwenty,
          words: props.data.result.uncommon_words,
          guideLine: guideLineOnUnCommonWords,
          classOnScore: classOnUnCommonWords,
          classOnScoreBg: classOnUnCommonWordsBg
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_HeadlineWordsBlock__WEBPACK_IMPORTED_MODULE_5__["default"], {
          title: textEmotionalWords,
          value: Math.round(props.data.result.emotion_words_per * 100),
          goalValue: textTenFifteen,
          words: props.data.result.emotion_words,
          guideLine: guideLineOnEmotionalWords,
          classOnScore: classOnEmotionalWords,
          classOnScoreBg: classOnEmotionalWordsBg
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_HeadlineWordsBlock__WEBPACK_IMPORTED_MODULE_5__["default"], {
          title: textPowerWords,
          value: Math.round(props.data.result.power_words_per * 100),
          goalValue: textLeastOne,
          words: props.data.result.power_words,
          guideLine: guideLineOnPowerWords,
          classOnScore: classOnPowerWords,
          classOnScoreBg: classOnPowerWordsBg
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlinePanelWordBalance);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlinePanelWordCount.js"
/*!****************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlinePanelWordCount.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons */ "./src/plugins/Headline-Analyzer/icons.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _HeadlinePieChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HeadlinePieChart */ "./src/plugins/Headline-Analyzer/components/HeadlinePieChart.js");
/* harmony import */ var _utils_score_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/score-color */ "./src/plugins/Headline-Analyzer/utils/score-color.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








const HeadlinePanelWordCount = props => {
  const textWordCount = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Word Count', "google-analytics-for-wordpress");
  const wordLength = props.data.result.word_count;
  const barScore = wordLength >= 10 ? 100 : Math.round(wordLength * 10);
  let classOnLength = '';
  let statusOnLength = '';
  let barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.green;
  let descOnWordLength = '';
  if (wordLength <= 4) {
    classOnLength = 'red';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.red;
    statusOnLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Not Enough Words', "google-analytics-for-wordpress");
    descOnWordLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your headline doesn’t use enough words. You have more space to add keywords and power words to improve your SEO and get more engagement.', "google-analytics-for-wordpress");
  } else if (wordLength >= 5 && wordLength <= 9) {
    classOnLength = 'green';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.green;
    statusOnLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Good', "google-analytics-for-wordpress");
    descOnWordLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your headline has the right amount of words. Headlines are more likely to be clicked on in search results if they have about 6 words.', "google-analytics-for-wordpress");
  } else if (wordLength >= 10 && wordLength <= 11) {
    classOnLength = 'orange';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.orange;
    statusOnLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Reduce Word Count', "google-analytics-for-wordpress");
  } else {
    classOnLength = 'red';
    barColor = _utils_score_color__WEBPACK_IMPORTED_MODULE_6__.SCORE_COLORS.red;
    statusOnLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Too Many Words', "google-analytics-for-wordpress");
    descOnWordLength = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your headline has too many words. Long headlines will get cut off in search results and won’t get as many clicks.', "google-analytics-for-wordpress");
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: textWordCount,
      className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('monsterinsights-headline-analyzer-panel-word-count', 'monsterinsights-headline-analyzer-panel-has-icon', classOnLength),
      icon: 'green' === classOnLength ? _icons__WEBPACK_IMPORTED_MODULE_3__["default"].check : _icons__WEBPACK_IMPORTED_MODULE_3__["default"].warning,
      initialOpen: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "monsterinsights-headline-analyzer-pie-chart-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('monsterinsights-headline-analyzer-word-length', classOnLength),
            children: wordLength
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_HeadlinePieChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
            barScore: barScore,
            barColor: barColor
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: "monsterinsights-headline-analyzer-status-on-word-length",
            children: statusOnLength
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
          children: descOnWordLength
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlinePanelWordCount);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlinePieChart.js"
/*!**********************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlinePieChart.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const HeadlinePieChart = props => {
  const score = props.barScore;
  const width = props.width ? props.width + 'px' : '80px';
  const rightDeg = score > 50 ? 0 : 180 - 360 / 100 * score;
  const color = props.barColor;
  const fragmentLeft = () => {
    if (score > 50) {
      const leftDeg = 180 + (score - 50) * 360 / 100;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "monsterinsights-donut-section monsterinsights-donut-section-left",
        style: {
          transform: 'rotate(0deg)'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "monsterinsights-donut-filler",
          style: {
            backgroundColor: color,
            transform: 'rotate(' + leftDeg + 'deg)'
          }
        })
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "monsterinsights-donut-container",
      style: {
        flexDirection: 'column'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "monsterinsights-donut",
        style: {
          width,
          paddingBottom: width,
          backgroundColor: '#f2f2f2'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "monsterinsights-donut-sections",
          style: {
            transform: 'rotate(0deg)'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "monsterinsights-donut-section monsterinsights-donut-section-right",
            style: {
              transform: 'rotate(0deg)'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "monsterinsights-donut-filler",
              style: {
                backgroundColor: color,
                transform: 'rotate(-' + rightDeg + 'deg)'
              }
            })
          }), fragmentLeft()]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "monsterinsights-donut-overlay",
          style: {
            height: '70%',
            width: '70%',
            top: 'calc(15%)',
            left: 'calc(15%)',
            backgroundColor: 'rgb(255, 255, 255)'
          }
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlinePieChart);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlineTabCurrentScore.js"
/*!*****************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlineTabCurrentScore.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _HeadlinePieChart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HeadlinePieChart */ "./src/plugins/Headline-Analyzer/components/HeadlinePieChart.js");
/* harmony import */ var _HeadlineOptimizeButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HeadlineOptimizeButton */ "./src/plugins/Headline-Analyzer/components/HeadlineOptimizeButton.js");
/* harmony import */ var _utils_score_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/score-color */ "./src/plugins/Headline-Analyzer/utils/score-color.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const labelForScore = score => {
  if (score >= 90) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Excellent', "google-analytics-for-wordpress");
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Could Be Better', "google-analytics-for-wordpress");
};
const HeadlineTabCurrentScore = ({
  analyzer,
  isLoading,
  onOptimize,
  licenseType
}) => {
  const textTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title Optimization', "google-analytics-for-wordpress");
  const currentScore = analyzer.currentHeadlineData.score;
  // isLow stays gated at < 90 — it drives only the attention background and
  // whether the Optimize button shows. The score color uses the shared
  // 0–69 red / 70–79 orange / 80+ green scheme.
  const isLow = currentScore < 90;
  const {
    className: classOnScore,
    hex: barColor
  } = (0,_utils_score_color__WEBPACK_IMPORTED_MODULE_5__.getScoreColor)(currentScore);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: textTitle,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('monsterinsights-headline-analyzer-current-score-tab', {
          'is-low-score': isLow
        }),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "monsterinsights-headline-analyzer-score-row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "monsterinsights-headline-analyzer-pie-chart-container",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('monsterinsights-headline-analyzer-current-score', classOnScore),
              children: currentScore
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeadlinePieChart__WEBPACK_IMPORTED_MODULE_3__["default"], {
              barScore: currentScore,
              barColor: barColor,
              width: 56
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('monsterinsights-headline-analyzer-score-label', classOnScore),
            children: labelForScore(currentScore)
          })]
        }), isLow && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeadlineOptimizeButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
          isLoading: isLoading,
          onOptimize: onOptimize,
          licenseType: licenseType
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlineTabCurrentScore);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/components/HeadlineWordsBlock.js"
/*!************************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/components/HeadlineWordsBlock.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const HeadlineWordsBlock = props => {
  const textGoal = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Goal:', "google-analytics-for-wordpress");
  const progressBarStyle = {
    width: props.value + '%'
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "monsterinsights-headline-analyzer-words-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h5", {
      children: props.title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "monsterinsights-headline-analyzer-words-block-data",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('monsterinsights-headline-analyzer-words-block-percentage', props.classOnScore),
        children: [props.value, "%"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
        className: "monsterinsights-headline-analyzer-words-block-goal",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("strong", {
          children: textGoal
        }), props.goalValue]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
        className: "monsterinsights-headline-analyzer-words-block-progressbar",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "monsterinsights-headline-analyzer-progressbar-bg"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('monsterinsights-headline-analyzer-progressbar-part', props.classOnScoreBg),
          style: progressBarStyle
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
      className: "monsterinsights-headline-analyzer-words-tag-list",
      children: props.words.length > 0 ? props.words.map((word, index) => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
          children: word
        }, index);
      }) : ''
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: "monsterinsights-headline-analyzer-words-guideline",
      children: props.guideLine
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadlineWordsBlock);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/icons.js"
/*!************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/icons.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_score_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/score-color */ "./src/plugins/Headline-Analyzer/utils/score-color.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const icons = {};
icons.headline = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
  width: "15",
  height: "14",
  viewBox: "0 0 15 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "M13.5 2V12H14.5C14.6458 12 14.7604 12.0521 14.8438 12.1562C14.9479 12.2396 15 12.3542 15 12.5V13.5C15 13.6458 14.9479 13.7604 14.8438 13.8438C14.7604 13.9479 14.6458 14 14.5 14H9.5C9.35417 14 9.22917 13.9479 9.125 13.8438C9.04167 13.7604 9 13.6458 9 13.5V12.5C9 12.3542 9.04167 12.2396 9.125 12.1562C9.22917 12.0521 9.35417 12 9.5 12H10.5V8H4.5V12H5.5C5.64583 12 5.76042 12.0521 5.84375 12.1562C5.94792 12.2396 6 12.3542 6 12.5V13.5C6 13.6458 5.94792 13.7604 5.84375 13.8438C5.76042 13.9479 5.64583 14 5.5 14H0.5C0.354167 14 0.229167 13.9479 0.125 13.8438C0.0416667 13.7604 0 13.6458 0 13.5V12.5C0 12.3542 0.0416667 12.2396 0.125 12.1562C0.229167 12.0521 0.354167 12 0.5 12H1.5V2H0.5C0.354167 2 0.229167 1.95833 0.125 1.875C0.0416667 1.77083 0 1.64583 0 1.5V0.5C0 0.354167 0.0416667 0.239583 0.125 0.15625C0.229167 0.0520833 0.354167 0 0.5 0H5.5C5.64583 0 5.76042 0.0520833 5.84375 0.15625C5.94792 0.239583 6 0.354167 6 0.5V1.5C6 1.64583 5.94792 1.77083 5.84375 1.875C5.76042 1.95833 5.64583 2 5.5 2H4.5V6H10.5V2H9.5C9.35417 2 9.22917 1.95833 9.125 1.875C9.04167 1.77083 9 1.64583 9 1.5V0.5C9 0.354167 9.04167 0.239583 9.125 0.15625C9.22917 0.0520833 9.35417 0 9.5 0H14.5C14.6458 0 14.7604 0.0520833 14.8438 0.15625C14.9479 0.239583 15 0.354167 15 0.5V1.5C15 1.64583 14.9479 1.77083 14.8438 1.875C14.7604 1.95833 14.6458 2 14.5 2H13.5Z",
    fill: "white"
  })
});
icons.headlineBlack = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
  width: "15",
  height: "14",
  viewBox: "0 0 15 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "M13.5 2V12H14.5C14.6458 12 14.7604 12.0521 14.8438 12.1562C14.9479 12.2396 15 12.3542 15 12.5V13.5C15 13.6458 14.9479 13.7604 14.8438 13.8438C14.7604 13.9479 14.6458 14 14.5 14H9.5C9.35417 14 9.22917 13.9479 9.125 13.8438C9.04167 13.7604 9 13.6458 9 13.5V12.5C9 12.3542 9.04167 12.2396 9.125 12.1562C9.22917 12.0521 9.35417 12 9.5 12H10.5V8H4.5V12H5.5C5.64583 12 5.76042 12.0521 5.84375 12.1562C5.94792 12.2396 6 12.3542 6 12.5V13.5C6 13.6458 5.94792 13.7604 5.84375 13.8438C5.76042 13.9479 5.64583 14 5.5 14H0.5C0.354167 14 0.229167 13.9479 0.125 13.8438C0.0416667 13.7604 0 13.6458 0 13.5V12.5C0 12.3542 0.0416667 12.2396 0.125 12.1562C0.229167 12.0521 0.354167 12 0.5 12H1.5V2H0.5C0.354167 2 0.229167 1.95833 0.125 1.875C0.0416667 1.77083 0 1.64583 0 1.5V0.5C0 0.354167 0.0416667 0.239583 0.125 0.15625C0.229167 0.0520833 0.354167 0 0.5 0H5.5C5.64583 0 5.76042 0.0520833 5.84375 0.15625C5.94792 0.239583 6 0.354167 6 0.5V1.5C6 1.64583 5.94792 1.77083 5.84375 1.875C5.76042 1.95833 5.64583 2 5.5 2H4.5V6H10.5V2H9.5C9.35417 2 9.22917 1.95833 9.125 1.875C9.04167 1.77083 9 1.64583 9 1.5V0.5C9 0.354167 9.04167 0.239583 9.125 0.15625C9.22917 0.0520833 9.35417 0 9.5 0H14.5C14.6458 0 14.7604 0.0520833 14.8438 0.15625C14.9479 0.239583 15 0.354167 15 0.5V1.5C15 1.64583 14.9479 1.77083 14.8438 1.875C14.7604 1.95833 14.6458 2 14.5 2H13.5Z",
    fill: "#000"
  })
});
icons.warning = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "M16 8C16 6.58065 15.6129 5.22581 14.9032 4C14.1935 2.77419 13.2258 1.80645 12 1.09677C10.7742 0.387097 9.41936 0 8 0C6.54839 0 5.22581 0.387097 4 1.09677C2.77419 1.80645 1.77419 2.77419 1.06452 4C0.354839 5.22581 0 6.58065 0 8C0 9.45161 0.354839 10.7742 1.06452 12C1.77419 13.2258 2.77419 14.2258 4 14.9355C5.22581 15.6452 6.54839 16 8 16C9.41936 16 10.7742 15.6452 12 14.9355C13.2258 14.2258 14.1935 13.2258 14.9032 12C15.6129 10.7742 16 9.45161 16 8ZM8 9.6129C8.3871 9.6129 8.74194 9.77419 9.03226 10.0645C9.32258 10.3548 9.48387 10.7097 9.48387 11.0968C9.48387 11.5161 9.32258 11.871 9.03226 12.1613C8.74194 12.4516 8.3871 12.5806 8 12.5806C7.58065 12.5806 7.22581 12.4516 6.93548 12.1613C6.64516 11.871 6.51613 11.5161 6.51613 11.0968C6.51613 10.7097 6.64516 10.3548 6.93548 10.0645C7.22581 9.77419 7.58065 9.6129 8 9.6129ZM6.58065 4.29032C6.58065 4.16129 6.6129 4.06452 6.67742 4C6.74194 3.93548 6.83871 3.87097 6.96774 3.87097H9.03226C9.12903 3.87097 9.22581 3.93548 9.29032 4C9.35484 4.06452 9.41936 4.16129 9.41936 4.29032L9.16129 8.67742C9.16129 8.77419 9.09677 8.87097 9.03226 8.93548C8.96774 9 8.87097 9.03226 8.77419 9.03226H7.22581C7.09677 9.03226 7 9 6.93548 8.93548C6.87097 8.87097 6.83871 8.77419 6.83871 8.67742L6.58065 4.29032Z",
    fill: _utils_score_color__WEBPACK_IMPORTED_MODULE_0__.SCORE_COLORS.orange
  })
});
icons.smile = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "M2.32258 2.35484C3.89247 0.784946 5.78495 0 8 0C10.2151 0 12.0968 0.784946 13.6452 2.35484C15.2151 3.90323 16 5.78495 16 8C16 10.2151 15.2151 12.1075 13.6452 13.6774C12.0968 15.2258 10.2151 16 8 16C5.78495 16 3.89247 15.2258 2.32258 13.6774C0.774194 12.1075 0 10.2151 0 8C0 5.78495 0.774194 3.90323 2.32258 2.35484ZM11.2903 5.74194C11.0968 5.52688 10.8602 5.41935 10.5806 5.41935C10.3011 5.41935 10.0538 5.52688 9.83871 5.74194C9.64516 5.93548 9.54839 6.17204 9.54839 6.45161C9.54839 6.73118 9.64516 6.97849 9.83871 7.19355C10.0538 7.3871 10.3011 7.48387 10.5806 7.48387C10.8602 7.48387 11.0968 7.3871 11.2903 7.19355C11.5054 6.97849 11.6129 6.73118 11.6129 6.45161C11.6129 6.17204 11.5054 5.93548 11.2903 5.74194ZM6.12903 5.74194C5.93548 5.52688 5.69892 5.41935 5.41935 5.41935C5.13978 5.41935 4.89247 5.52688 4.67742 5.74194C4.48387 5.93548 4.3871 6.17204 4.3871 6.45161C4.3871 6.73118 4.48387 6.97849 4.67742 7.19355C4.89247 7.3871 5.13978 7.48387 5.41935 7.48387C5.69892 7.48387 5.93548 7.3871 6.12903 7.19355C6.34409 6.97849 6.45161 6.73118 6.45161 6.45161C6.45161 6.17204 6.34409 5.93548 6.12903 5.74194ZM11.7097 10.9032C11.7957 10.8172 11.8387 10.7204 11.8387 10.6129C11.8387 10.4839 11.8065 10.3871 11.7419 10.3226C11.6774 10.2366 11.5914 10.172 11.4839 10.129C11.3978 10.0645 11.3011 10.043 11.1935 10.0645C11.086 10.086 10.9892 10.1505 10.9032 10.2581C10.1505 11.1613 9.1828 11.6129 8 11.6129C6.8172 11.6129 5.84946 11.1613 5.09677 10.2581C5.01075 10.1505 4.91398 10.086 4.80645 10.0645C4.69892 10.043 4.5914 10.0645 4.48387 10.129C4.39785 10.172 4.32258 10.2366 4.25806 10.3226C4.19355 10.3871 4.16129 10.4839 4.16129 10.6129C4.16129 10.7204 4.2043 10.8172 4.29032 10.9032C5.25806 12.0645 6.49462 12.6452 8 12.6452C9.50538 12.6452 10.7419 12.0645 11.7097 10.9032Z",
    fill: _utils_score_color__WEBPACK_IMPORTED_MODULE_0__.SCORE_COLORS.green
  })
});
icons.neutral = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "M2.32258 2.35484C3.89247 0.784946 5.78495 0 8 0C10.2151 0 12.0968 0.784946 13.6452 2.35484C15.2151 3.90323 16 5.78495 16 8C16 10.2151 15.2151 12.1075 13.6452 13.6774C12.0968 15.2258 10.2151 16 8 16C5.78495 16 3.89247 15.2258 2.32258 13.6774C0.774194 12.1075 0 10.2151 0 8C0 5.78495 0.774194 3.90323 2.32258 2.35484ZM6.12903 5.74194C5.93548 5.52688 5.69892 5.41935 5.41935 5.41935C5.13978 5.41935 4.89247 5.52688 4.67742 5.74194C4.48387 5.93548 4.3871 6.17204 4.3871 6.45161C4.3871 6.73118 4.48387 6.97849 4.67742 7.19355C4.89247 7.3871 5.13978 7.48387 5.41935 7.48387C5.69892 7.48387 5.93548 7.3871 6.12903 7.19355C6.34409 6.97849 6.45161 6.73118 6.45161 6.45161C6.45161 6.17204 6.34409 5.93548 6.12903 5.74194ZM11.0968 11.6129C11.4409 11.6129 11.6129 11.4409 11.6129 11.0968C11.6129 10.7527 11.4409 10.5806 11.0968 10.5806H4.90323C4.55914 10.5806 4.3871 10.7527 4.3871 11.0968C4.3871 11.4409 4.55914 11.6129 4.90323 11.6129H11.0968ZM9.83871 7.19355C10.0538 7.3871 10.3011 7.48387 10.5806 7.48387C10.8602 7.48387 11.0968 7.3871 11.2903 7.19355C11.5054 6.97849 11.6129 6.73118 11.6129 6.45161C11.6129 6.17204 11.5054 5.93548 11.2903 5.74194C11.0968 5.52688 10.8602 5.41935 10.5806 5.41935C10.3011 5.41935 10.0538 5.52688 9.83871 5.74194C9.64516 5.93548 9.54839 6.17204 9.54839 6.45161C9.54839 6.73118 9.64516 6.97849 9.83871 7.19355Z",
    fill: "#626D83"
  })
});
icons.negative = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "M2.32258 2.35484C3.89247 0.784946 5.78495 0 8 0C10.2151 0 12.0968 0.784946 13.6452 2.35484C15.2151 3.90323 16 5.78495 16 8C16 10.2151 15.2151 12.1075 13.6452 13.6774C12.0968 15.2258 10.2151 16 8 16C5.78495 16 3.89247 15.2258 2.32258 13.6774C0.774194 12.1075 0 10.2151 0 8C0 5.78495 0.774194 3.90323 2.32258 2.35484ZM4.3871 7.48387C4.3871 7.76344 4.48387 8.01075 4.67742 8.22581C4.89247 8.41935 5.13978 8.51613 5.41935 8.51613C5.69892 8.51613 5.93548 8.41935 6.12903 8.22581C6.34409 8.01075 6.45161 7.76344 6.45161 7.48387C6.45161 7.44086 6.43011 7.35484 6.3871 7.22581C6.4086 7.22581 6.41935 7.22581 6.41935 7.22581C6.44086 7.22581 6.45161 7.22581 6.45161 7.22581C6.70968 7.22581 6.87097 7.10753 6.93548 6.87097C6.95699 6.78495 6.96774 6.70968 6.96774 6.64516C6.96774 6.58065 6.94624 6.52688 6.90323 6.48387C6.88172 6.41935 6.83871 6.36559 6.77419 6.32258C6.73118 6.27957 6.67742 6.24731 6.6129 6.22581L4.03226 5.45161C3.88172 5.4086 3.74194 5.41935 3.6129 5.48387C3.50538 5.54839 3.43011 5.64516 3.3871 5.77419C3.36559 5.86021 3.35484 5.93548 3.35484 6C3.37634 6.06452 3.39785 6.12903 3.41935 6.19355C3.44086 6.23656 3.47312 6.27957 3.51613 6.32258C3.58065 6.36559 3.65591 6.39785 3.74194 6.41935L4.70968 6.74194C4.49462 6.93548 4.3871 7.1828 4.3871 7.48387ZM9.80645 12.4516C9.93548 12.6237 10.0968 12.6882 10.2903 12.6452C10.4839 12.6021 10.6129 12.4946 10.6774 12.3226C10.7419 12.1505 10.7097 11.9785 10.5806 11.8065C9.91398 10.9892 9.05376 10.5806 8 10.5806C6.94624 10.5806 6.07527 10.9892 5.3871 11.8065C5.34409 11.871 5.31183 11.9462 5.29032 12.0323C5.26882 12.1183 5.26882 12.1935 5.29032 12.2581C5.31183 12.3226 5.34409 12.3871 5.3871 12.4516C5.43011 12.5161 5.48387 12.5699 5.54839 12.6129C5.6129 12.6344 5.67742 12.6559 5.74194 12.6774C5.82796 12.6774 5.90323 12.6667 5.96774 12.6452C6.05376 12.6021 6.12903 12.5376 6.19355 12.4516C6.64516 11.914 7.24731 11.6452 8 11.6452C8.75269 11.6452 9.35484 11.914 9.80645 12.4516ZM12.2903 6.41935C12.4194 6.37634 12.5161 6.30107 12.5806 6.19355C12.6452 6.06452 12.6559 5.92473 12.6129 5.77419C12.5914 5.68817 12.5484 5.6129 12.4839 5.54839C12.4194 5.48387 12.3441 5.45161 12.2581 5.45161C12.172 5.43011 12.086 5.43011 12 5.45161L9.41935 6.22581C9.26882 6.26882 9.16129 6.35484 9.09677 6.48387C9.03226 6.5914 9.02151 6.72043 9.06452 6.87097C9.12903 7.10753 9.29032 7.22581 9.54839 7.22581C9.56989 7.22581 9.5914 7.22581 9.6129 7.22581C9.56989 7.33333 9.54839 7.41935 9.54839 7.48387C9.54839 7.76344 9.64516 8.01075 9.83871 8.22581C10.0538 8.41935 10.3011 8.51613 10.5806 8.51613C10.8602 8.51613 11.0968 8.41935 11.2903 8.22581C11.5054 8.01075 11.6129 7.76344 11.6129 7.48387C11.6129 7.1828 11.5054 6.93548 11.2903 6.74194L12.2903 6.41935Z",
    fill: "#626D83"
  })
});
icons.check = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "M13.6452 2.35484C15.2151 3.90323 16 5.78495 16 8C16 10.2151 15.2151 12.1075 13.6452 13.6774C12.0968 15.2258 10.2151 16 8 16C5.78495 16 3.89247 15.2258 2.32258 13.6774C0.774194 12.1075 0 10.2151 0 8C0 5.78495 0.774194 3.90323 2.32258 2.35484C3.89247 0.784946 5.78495 0 8 0C10.2151 0 12.0968 0.784946 13.6452 2.35484ZM7.06452 12.2258L13 6.29032C13.2581 6.05376 13.2581 5.8172 13 5.58065L12.2903 4.83871C12.0323 4.60215 11.7849 4.60215 11.5484 4.83871L6.70968 9.67742L4.45161 7.41935C4.21505 7.1828 3.96774 7.1828 3.70968 7.41935L3 8.16129C2.74194 8.39785 2.74194 8.63441 3 8.87097L6.35484 12.2258C6.5914 12.4839 6.82796 12.4839 7.06452 12.2258Z",
    fill: _utils_score_color__WEBPACK_IMPORTED_MODULE_0__.SCORE_COLORS.green
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (icons);

/***/ },

/***/ "./src/plugins/Headline-Analyzer/index.js"
/*!************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/index.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_headline_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/headline-api */ "./src/plugins/Headline-Analyzer/utils/headline-api.js");
/* harmony import */ var _utils_score_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/score-color */ "./src/plugins/Headline-Analyzer/utils/score-color.js");
/* harmony import */ var _utils_headline_ownership__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/headline-ownership */ "./src/plugins/Headline-Analyzer/utils/headline-ownership.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icons */ "./src/plugins/Headline-Analyzer/icons.js");
/* harmony import */ var _components_HeadlineTabCurrentScore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/HeadlineTabCurrentScore */ "./src/plugins/Headline-Analyzer/components/HeadlineTabCurrentScore.js");
/* harmony import */ var _components_HeadlinePanelWordBalance__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/HeadlinePanelWordBalance */ "./src/plugins/Headline-Analyzer/components/HeadlinePanelWordBalance.js");
/* harmony import */ var _components_HeadlinePanelSentiment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/HeadlinePanelSentiment */ "./src/plugins/Headline-Analyzer/components/HeadlinePanelSentiment.js");
/* harmony import */ var _components_HeadlinePanelType__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/HeadlinePanelType */ "./src/plugins/Headline-Analyzer/components/HeadlinePanelType.js");
/* harmony import */ var _components_HeadlinePanelCharacterCount__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/HeadlinePanelCharacterCount */ "./src/plugins/Headline-Analyzer/components/HeadlinePanelCharacterCount.js");
/* harmony import */ var _components_HeadlinePanelWordCount__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/HeadlinePanelWordCount */ "./src/plugins/Headline-Analyzer/components/HeadlinePanelWordCount.js");
/* harmony import */ var _components_HeadlinePanelStartEndWords__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/HeadlinePanelStartEndWords */ "./src/plugins/Headline-Analyzer/components/HeadlinePanelStartEndWords.js");
/* harmony import */ var _components_HeadlinePanelSearchPreview__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/HeadlinePanelSearchPreview */ "./src/plugins/Headline-Analyzer/components/HeadlinePanelSearchPreview.js");
/* harmony import */ var _components_HeadlineAISuggestions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/HeadlineAISuggestions */ "./src/plugins/Headline-Analyzer/components/HeadlineAISuggestions.js");
/* harmony import */ var _metabox_components_pro_badge__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../metabox/components/pro-badge */ "./src/plugins/metabox/components/pro-badge.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__);




















class HeadlineAnalyzerErrorBoundary extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, info) {
    if (true) {
      console.error('[HeadlineAnalyzer]', error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
        className: "monsterinsights-headline-analyzer-empty-title-warning",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Something went wrong. Please reload the page.', "google-analytics-for-wordpress")
      });
    }
    return this.props.children;
  }
}

// The single-owner election (see utils/headline-ownership.js) guarantees only
// one analyzer mounts even when MonsterInsights and ExactMetrics are both
// active, so there is exactly one pinned "Headline Analyzer" button — no
// cross-instance DOM-ownership dance is needed, just find that button.
const scoreBadgeClass = 'monsterinsights-headline-analyzer-score-badge';
const findPinnedButton = label => document.querySelector(`.components-button[aria-label='${label}']`);
const MonsterInsightsHeadlineAnalyzer = () => {
  const postTitle = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getEditedPostAttribute('title'));
  const textHeadlineAnalyzer = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Headline Analyzer', "google-analytics-for-wordpress");
  const emptyTitleWarning = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Write your post title to see the analyzer data. This Headline Analyzer tool enables you to write irresistible SEO headlines that drive traffic, shares, and rank better in search results.', "google-analytics-for-wordpress");
  const notice = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %1s: opening anchor tag. %2s: closing anchor tag. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This headline analyzer is part of MonsterInsights to help you increase your traffic. See your %1swebsite traffic reports%2s.', "google-analytics-for-wordpress"), `<a href="${monsterinsights_gutenberg_tool_vars.reports_url}" class="monsterinsights-headline-analyzer-link">`, '</a>');
  const toolVars = window.monsterinsights_gutenberg_tool_vars;
  const licenseType = toolVars.license_type ?? 'lite';
  const upgradeUrl = toolVars.upgrade_url ?? '';
  // Plus, Pro, and Master can run the optimizer (mirrors the PHP
  // license_can('plus') gate); Lite and Basic get the locked upsell.
  const canOptimize = ['plus', 'pro', 'master'].includes(licenseType);
  // Roles without monsterinsights_view_dashboard can't get a bearer token, so the
  // optimizer (and its license upsell) is hidden for them — see HeadlineOptimizeButton.
  const userCanOptimize = toolVars?.can_optimize_headline ?? false;

  // MonsterInsights + ExactMetrics both active: only the elected owner renders
  // this panel, but warn the user that duplicate analytics are loaded (which
  // also means duplicate tracking on the front end). See headline-ownership.js.
  const isDuplicate = (0,_utils_headline_ownership__WEBPACK_IMPORTED_MODULE_7__.hasDuplicateHeadlineAnalyzer)();
  const [analyzer, setAnalyzer] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [aiSuggestions, setAiSuggestions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [aiError, setAiError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [aiLoading, setAiLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [rateLimitCountdown, setRateLimitCountdown] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const debounceTimerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const abortControllerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const headlineFetchAbortRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const isReplacingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  const lastReplacedTitleRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const scoreTagRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const currentScore = analyzer.dataExist && analyzer.currentHeadlineData ? analyzer.currentHeadlineData.score : 0;
  const hasData = 'undefined' !== typeof analyzer.headlineData && analyzer.dataExist && analyzer.headlineData.analysed;

  // Reuse this instance's badge, or create it inside the button this instance
  // owns. Dedupe is anchored in the DOM (badge class lookup + pruning), not in
  // the ref alone: a Gutenberg slot re-parent can detach and re-attach the
  // pinned button, and a ref-only guard would insert a second span next to the
  // survivor.
  const ensureScoreBadge = () => {
    const button = findPinnedButton(textHeadlineAnalyzer);
    if (!button) {
      return null;
    }
    let badge = scoreTagRef.current && button.contains(scoreTagRef.current) ? scoreTagRef.current : null;
    if (!badge) {
      badge = document.createElement('span');
      badge.className = scoreBadgeClass;
      const pinnedIcon = button.querySelector('svg');
      // parentNode can be transiently null during a Gutenberg re-render; swallow
      // so the error boundary doesn't reset the sidebar over a DOM timing blip.
      try {
        pinnedIcon.parentNode.insertBefore(badge, pinnedIcon.nextSibling);
      } catch (e) {
        return null;
      }
    }

    // Prune any other badge in this button so a span that survived a
    // remount can't double-render the score.
    button.querySelectorAll(`.${scoreBadgeClass}`).forEach(el => {
      if (el !== badge) {
        el.remove();
      }
    });
    scoreTagRef.current = badge;
    return badge;
  };

  // Create score badge span on mount; always return cleanup so the node is removed on unmount
  // even if the pinned icon was absent when this effect first ran.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    ensureScoreBadge();
    return () => {
      if (scoreTagRef.current) {
        scoreTagRef.current.remove();
        scoreTagRef.current = null;
      }
    };
  }, [textHeadlineAnalyzer]);

  // Update score badge text and color in place; lazily creates the badge if the
  // creation effect ran while the pinned icon was not yet in the DOM.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const badge = ensureScoreBadge();
    if (!badge) {
      return;
    }
    const button = badge.closest('.components-button');
    if (!button) {
      return;
    }
    if (analyzer.dataExist && 'undefined' !== typeof analyzer.currentHeadlineData?.score) {
      const score = parseInt(analyzer.currentHeadlineData.score, 10);
      const colorClass = (0,_utils_score_color__WEBPACK_IMPORTED_MODULE_6__.getScoreColor)(score).className;
      button.setAttribute('monsterinsights-button-color', colorClass);
      badge.textContent = `${score}/100`;
    } else {
      button.setAttribute('monsterinsights-button-color', 'red');
      badge.textContent = '00/100';
    }
  }, [analyzer.dataExist, currentScore, textHeadlineAnalyzer]);

  // Hide panel toggle buttons inside the sidebar wrapper
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const wrapper = document.querySelector('.monsterinsights-headline-analyzer-wrapper');
    if (!wrapper) {
      return;
    }
    const headingElements = wrapper.parentNode.querySelectorAll('.components-panel__header');
    if (headingElements) {
      headingElements.forEach(element => {
        const button = element.querySelector('[aria-pressed="true"]');
        if (button && null !== button && null !== button.offsetParent) {
          button.style.display = 'none';
        }
      });
    }
    return () => {
      const w = document.querySelector('.monsterinsights-headline-analyzer-wrapper');
      if (!w) {
        return;
      }
      w.parentNode.querySelectorAll('.components-panel__header').forEach(element => {
        const button = element.querySelector('[aria-pressed="true"]');
        if (button) {
          button.style.display = '';
        }
      });
    };
  }, [analyzer.dataExist]);

  // Debounced fetch of headline score when post title changes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      if (headlineFetchAbortRef.current) {
        headlineFetchAbortRef.current.abort();
      }
      headlineFetchAbortRef.current = new AbortController();
      const formData = new FormData();
      formData.append('_ajax_nonce', monsterinsights_gutenberg_tool_vars.nonce);
      formData.append('action', 'monsterinsights_gutenberg_headline_analyzer_get_results');
      formData.append('dataType', 'json');
      formData.append('q', postTitle);
      fetch(monsterinsights_gutenberg_tool_vars.ajaxurl, {
        method: 'POST',
        body: formData,
        signal: headlineFetchAbortRef.current.signal
      }).then(res => {
        if (!res.ok) {
          throw new Error('HTTP error');
        }
        return res.json();
      }).then(json => {
        setAnalyzer(prev => {
          const newData = {
            dataExist: false
          };
          if (json?.data?.analysed) {
            newData.currentHeadlineData = json.data;
            newData.headlineData = json.data;
            newData.dataExist = true;
            if ('undefined' !== typeof prev.headlineData) {
              const prevScores = 'undefined' !== typeof prev.previousHeadlinesData ? prev.previousHeadlinesData : [];
              newData.previousHeadlinesData = [prev.headlineData, ...prevScores];
            }
          }
          return {
            ...prev,
            ...newData
          };
        });
      }).catch(error => {
        if (error.name === 'AbortError') {
          return;
        }
        setAnalyzer(prev => ({
          ...prev,
          dataExist: false
        }));
        console.error(error);
      });
    }, 1000);
    return () => {
      clearTimeout(debounceTimerRef.current);
      if (headlineFetchAbortRef.current) {
        headlineFetchAbortRef.current.abort();
      }
    };
  }, [postTitle]);

  // Clear AI state and cancel in-flight request when title changes.
  // Skip when the change was triggered by the Replace button — suggestions should persist.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isReplacingRef.current && postTitle === lastReplacedTitleRef.current) {
      // Clear the flag the moment the editor echoes our replaced title back so
      // subsequent genuine edits are not ignored. Avoids the prior 100ms timer
      // that was both racy on slow devices and overly long on fast ones.
      isReplacingRef.current = false;
      lastReplacedTitleRef.current = null;
      return;
    }
    setAiSuggestions(null);
    setAiError(null);
    setAiLoading(false);
    setRateLimitCountdown(0);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, [postTitle]);

  // Cancel in-flight requests on unmount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (headlineFetchAbortRef.current) {
        headlineFetchAbortRef.current.abort();
      }
    };
  }, []);

  // Rate-limit countdown ticker
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (rateLimitCountdown <= 0) {
      return;
    }
    const t = setTimeout(() => setRateLimitCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [rateLimitCountdown]);

  // Called by HeadlineAISuggestionItem just before editPost — prevents the [postTitle]
  // effect from clearing the suggestions list when the change came from Replace.
  // The flag is cleared inside the [postTitle] effect on the first echo whose
  // value matches the title we just wrote, not on a fixed timeout.
  const handleReplaceTitle = newTitle => {
    // Same-title replace produces no echo, so the effect-driven clear would
    // never fire and the flag would stay dirty. Nothing to suppress here.
    if (newTitle === postTitle) {
      return;
    }
    isReplacingRef.current = true;
    lastReplacedTitleRef.current = newTitle;
  };
  const handleOptimize = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    setAiLoading(true);
    setAiError(null);
    setAiSuggestions(null);
    try {
      const result = await (0,_utils_headline_api__WEBPACK_IMPORTED_MODULE_5__.optimizeHeadline)({
        headline: postTitle,
        signal: abortControllerRef.current.signal
      });
      if (!result?.suggestions?.length) {
        throw {
          type: 'unknown',
          retryable: false,
          meta: {}
        };
      }
      setAiSuggestions(result);
    } catch (err) {
      const normalized = (0,_utils_headline_api__WEBPACK_IMPORTED_MODULE_5__.normalizeNetworkError)(err);
      if (normalized.type === 'aborted') {
        return;
      }
      setAiError(normalized);
      if (normalized.type === 'rate_limited') {
        setRateLimitCountdown(normalized.meta?.retryAfter ?? 60);
      }
    } finally {
      setAiLoading(false);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__.PluginSidebarMoreMenuItem, {
      target: "monsterinsights-headline-analyzer",
      children: textHeadlineAnalyzer
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(HeadlineAnalyzerErrorBoundary, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__.PluginSidebar, {
        name: "monsterinsights-headline-analyzer",
        title: textHeadlineAnalyzer,
        className: "monsterinsights-headline-analyzer-wrapper",
        icon: _icons__WEBPACK_IMPORTED_MODULE_8__["default"].headline,
        children: [isDuplicate && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
          className: "monsterinsights-ai-error monsterinsights-headline-analyzer-duplicate-notice",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Duplicate analytics scripts have been found. Please ensure there is only one Google Analytics plugin active on your site.', "google-analytics-for-wordpress")
          })
        }), hasData ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlineTabCurrentScore__WEBPACK_IMPORTED_MODULE_9__["default"], {
          analyzer: analyzer,
          isLoading: aiLoading || rateLimitCountdown > 0,
          onOptimize: handleOptimize,
          licenseType: licenseType
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
          className: "monsterinsights-headline-analyzer-empty-title-warning",
          children: emptyTitleWarning
        }), aiError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
          className: "monsterinsights-ai-error",
          children: [aiError.type === 'rate_limited' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
            children: rateLimitCountdown > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %d: seconds remaining before retry. */
            (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Too many requests. Try again in %ds.', "google-analytics-for-wordpress"), rateLimitCountdown) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Too many requests. Please try again.', "google-analytics-for-wordpress")
          }), aiError.type === 'auth' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("We couldn't verify your license with the AI service. Please check that your website is connected and your license is active.", "google-analytics-for-wordpress")
          }), aiError.type === 'validation' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Couldn't process this headline. Please try a different one.", "google-analytics-for-wordpress")
          }), aiError.type === 'exhausted' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("p", {
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("You've used all your AI credits for this month.", "google-analytics-for-wordpress"), /^https:\/\//i.test(upgradeUrl) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.Fragment, {
              children: [' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("a", {
                href: upgradeUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Upgrade', "google-analytics-for-wordpress")
              })]
            })]
          }), aiError.type === 'server' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('AI service is temporarily unavailable. Please try again in a moment.', "google-analytics-for-wordpress")
          }), aiError.type === 'network' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Couldn't reach the AI service. Check your connection and try again.", "google-analytics-for-wordpress")
          }), aiError.type === 'unknown' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('An unexpected error occurred. Please try again.', "google-analytics-for-wordpress")
          })]
        }), aiSuggestions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlineAISuggestions__WEBPACK_IMPORTED_MODULE_17__["default"], {
          suggestions: aiSuggestions.suggestions,
          currentTitle: postTitle,
          onReplace: handleReplaceTitle
        }), userCanOptimize && !canOptimize && hasData && !aiSuggestions && !aiError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlineAISuggestions__WEBPACK_IMPORTED_MODULE_17__["default"], {
            isLocked: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_metabox_components_pro_badge__WEBPACK_IMPORTED_MODULE_18__["default"], {
            license: "lite",
            upgrade_url: upgradeUrl
          })]
        }), hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlinePanelWordBalance__WEBPACK_IMPORTED_MODULE_10__["default"], {
          data: analyzer.headlineData
        }), hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlinePanelSentiment__WEBPACK_IMPORTED_MODULE_11__["default"], {
          data: analyzer.headlineData
        }), hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlinePanelType__WEBPACK_IMPORTED_MODULE_12__["default"], {
          data: analyzer.headlineData
        }), hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlinePanelCharacterCount__WEBPACK_IMPORTED_MODULE_13__["default"], {
          data: analyzer.headlineData
        }), hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlinePanelWordCount__WEBPACK_IMPORTED_MODULE_14__["default"], {
          data: analyzer.headlineData
        }), hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlinePanelStartEndWords__WEBPACK_IMPORTED_MODULE_15__["default"], {
          data: analyzer.headlineData
        }), hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_components_HeadlinePanelSearchPreview__WEBPACK_IMPORTED_MODULE_16__["default"], {
          data: analyzer.headlineData
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
          className: "monsterinsights-headline-analyzer-bottom-notice",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("p", {
            dangerouslySetInnerHTML: {
              __html: notice
            }
          })
        })]
      })
    })]
  });
};

// register & render editor sidebar plugin for post_type `post` only
if ('undefined' !== typeof monsterinsights_gutenberg_tool_vars && monsterinsights_gutenberg_tool_vars.allowed_post_types.includes(monsterinsights_gutenberg_tool_vars.current_post_type) && monsterinsights_gutenberg_tool_vars.is_headline_analyzer_enabled &&
// Only the elected owner mounts the analyzer; a sibling analytics plugin
// (MI/EM both active) backs off here. See utils/headline-ownership.js.
(0,_utils_headline_ownership__WEBPACK_IMPORTED_MODULE_7__.claimHeadlineAnalyzerOwnership)()) {
  (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__.registerPlugin)('monsterinsights-headline-analyzer', {
    icon: _icons__WEBPACK_IMPORTED_MODULE_8__["default"].headlineBlack,
    render: MonsterInsightsHeadlineAnalyzer
  });
}

/***/ },

/***/ "./src/plugins/Headline-Analyzer/utils/headline-api.js"
/*!*************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/utils/headline-api.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeNetworkError: () => (/* binding */ normalizeNetworkError),
/* harmony export */   optimizeHeadline: () => (/* binding */ optimizeHeadline)
/* harmony export */ });
// AI Headline Optimizer client. The browser no longer talks to the AI service —
// instead it hits a server-side admin-ajax handler that holds the bearer token,
// proxies to the AI service, and scores each suggestion before responding.
// PHP wp_send_json_error already shapes failures as { type, message, retryable, meta },
// so this module just forwards the envelope.

async function optimizeHeadline({
  headline,
  context = '',
  type = 'title',
  signal
} = {}) {
  const vars = window.monsterinsights_gutenberg_tool_vars || {};
  const fd = new FormData();
  fd.append('action', 'monsterinsights_gutenberg_headline_analyzer_optimize');
  fd.append('_ajax_nonce', vars.nonce);
  fd.append('headline', headline);
  fd.append('context', context);
  fd.append('type', type);
  const res = await fetch(vars.ajaxurl, {
    method: 'POST',
    body: fd,
    signal,
    credentials: 'same-origin'
  });
  let json = {};
  try {
    json = await res.json();
  } catch (_) {}
  if (!res.ok || !json?.success) {
    // A non-JSON body (e.g. an Nginx/PHP-FPM 502/504 HTML page when the upstream
    // AI service times out) leaves json = {}, so there's no shaped data to use.
    // Derive the type from the status: 5xx is a transient, retryable gateway
    // error and should surface as `server`, not the generic non-retryable `unknown`.
    const err = json?.data || {
      type: res.status >= 500 ? 'server' : 'unknown',
      message: '',
      retryable: res.status >= 500,
      meta: {}
    };
    throw err;
  }
  return json.data; // { suggestions: [{ headline, type, reasoning, score }], credits }
}

// Catches raw thrown errors that don't already match the PHP envelope —
// AbortError from cancellation, TypeError from network drop. Server-shaped
// errors with a `type` field fall through unchanged so callers see the same
// `{ type, ... }` shape regardless of where the failure originated.
function normalizeNetworkError(err) {
  if (err?.name === 'AbortError') {
    return {
      type: 'aborted',
      message: '',
      retryable: false,
      meta: {}
    };
  }
  if (err?.type) {
    return err;
  }
  return {
    type: 'network',
    message: '',
    retryable: true,
    meta: {}
  };
}

/***/ },

/***/ "./src/plugins/Headline-Analyzer/utils/headline-ownership.js"
/*!*******************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/utils/headline-ownership.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   claimHeadlineAnalyzerOwnership: () => (/* binding */ claimHeadlineAnalyzerOwnership),
/* harmony export */   hasDuplicateHeadlineAnalyzer: () => (/* binding */ hasDuplicateHeadlineAnalyzer)
/* harmony export */ });
/**
 * Single-owner election for the Headline Analyzer.
 *
 * When MonsterInsights and ExactMetrics are both active, two editor bundles load
 * (each product ships its own editor.js). Without coordination both would mount
 * the analyzer: duplicate sidebar, two pinned toolbar buttons with the same
 * aria-label, and stacked score badges (the "43/10043/100" bug). The first
 * bundle to execute claims ownership; the second backs off entirely.
 *
 * The coordination tokens MUST be brand-neutral. robo rewrites
 * monsterinsights -> exactmetrics across the ExactMetrics build, so a token like
 * `monsterinsightsHeadlineOwner` would become `exactmetricsHeadlineOwner` in the
 * EM bundle — the two bundles would read different globals and never dedupe.
 * Names below contain no brand substring on purpose; do not "brand" them.
 */

// Shared across bundles (window). Neutral names — see file header.
const OWNER_FLAG = '__wpHeadlineAnalyzerOwner';
const COUNT_FLAG = '__wpHeadlineAnalyzerInstances';

// Memoized per bundle: each editor.js gets its own module instance, so this
// resolves once and both entry points (sidebar + block toolbar) in the same
// bundle agree on the verdict.
let isOwner = null;

/**
 * Claim ownership of the Headline Analyzer for this bundle.
 *
 * Idempotent: increments the cross-bundle instance count exactly once per
 * bundle, sets the owner flag if unclaimed, and returns whether THIS bundle won.
 * Call from each registration guard and only register when it returns true.
 *
 * @return {boolean} True if this bundle should mount the analyzer.
 */
const claimHeadlineAnalyzerOwnership = () => {
  if (null !== isOwner) {
    return isOwner;
  }
  const w = window;
  w[COUNT_FLAG] = (w[COUNT_FLAG] || 0) + 1;
  if (w[OWNER_FLAG]) {
    // Another analytics plugin already mounted the analyzer.
    isOwner = false;
  } else {
    w[OWNER_FLAG] = true;
    isOwner = true;
  }
  return isOwner;
};

/**
 * Whether more than one analytics plugin loaded the analyzer (MI + EM both
 * active). Read at render time — by then every bundle's top-level registration
 * guard has already run and incremented the count.
 *
 * @return {boolean} True when a duplicate analytics plugin is present.
 */
const hasDuplicateHeadlineAnalyzer = () => (window[COUNT_FLAG] || 0) > 1;

/***/ },

/***/ "./src/plugins/Headline-Analyzer/utils/score-color.js"
/*!************************************************************!*\
  !*** ./src/plugins/Headline-Analyzer/utils/score-color.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SCORE_COLORS: () => (/* binding */ SCORE_COLORS),
/* harmony export */   getScoreColor: () => (/* binding */ getScoreColor)
/* harmony export */ });
const SCORE_COLORS = {
  red: '#D82F5A',
  orange: '#F89655',
  green: '#58CB92'
};

// 0–69 red, 70–79 orange, 80+ green. Single source of truth for the headline
// score color, shared by the toolbar badge, the sidebar score tab, the AI
// suggestion items, and the word-balance overall score so all four surfaces
// stay in sync.
const getScoreColor = score => {
  const value = parseInt(score, 10) || 0;
  const className = value < 70 ? 'red' : value <= 79 ? 'orange' : 'green';
  return {
    className,
    hex: SCORE_COLORS[className]
  };
};

/***/ },

/***/ "./src/plugins/conversion-event/index.js"
/*!***********************************************!*\
  !*** ./src/plugins/conversion-event/index.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _metabox_components_pro_badge__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../metabox/components/pro-badge */ "./src/plugins/metabox/components/pro-badge.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);









// Add custom attributes to the button block

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'monsterinsights-extend-blocks/monsterinsights-add-attributes', (settings, name) => {
  const supportedBlocks = ['core/button', 'core/image'];
  if (!supportedBlocks.includes(name)) {
    return settings;
  }
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      monsterinsightsMarkAsConversionEvent: {
        type: 'boolean',
        default: false
      },
      monsterinsightsMarkAsKeyEvent: {
        type: 'boolean',
        default: false
      },
      monsterinsightsCustomEventName: {
        type: 'string',
        default: ''
      }
    }
  };
});

// Add custom control to the block's sidebar
const MonsterinsightsAddConversionEventControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const supportedBlocks = ['core/button', 'core/image'];
    if (!supportedBlocks.includes(props.name)) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      license_type,
      conversion_tracking_upgrade_url
    } = monsterinsights_gutenberg_tool_vars;
    if ('pro' !== license_type) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(BlockEdit, {
          ...props
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
            title: "MonsterInsights",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
              label: "Mark as a conversion event",
              checked: false,
              disabled: true,
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_metabox_components_pro_badge__WEBPACK_IMPORTED_MODULE_7__["default"], {
              license: license_type,
              upgrade_url: conversion_tracking_upgrade_url
            })]
          })
        })]
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      monsterinsightsMarkAsConversionEvent: markAsConversionEvent
    } = attributes;
    const onMarkAsKeyEventChange = newValue => {
      if (false === newValue) {
        setAttributes({
          monsterinsightsMarkAsKeyEvent: false
        });
        return;
      }
      if (!attributes.monsterinsightsCustomEventName) {
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/notices').createInfoNotice('Please enter a custom event name to mark as a key event.', {
          type: 'snackbar',
          explicitDismiss: true
        });
        return;
      }

      // Check event name is more than 3 characters.
      if (attributes.monsterinsightsCustomEventName.length < 3) {
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/notices').createInfoNotice('Custom event name must be at least 3 characters long to be tracked as a key event.', {
          type: 'snackbar',
          explicitDismiss: true
        });
        return;
      }

      // Send ajax request to mark as key event. Send request to relay to mark as key event.
      const formData = new FormData();
      formData.append('action', 'monsterinsights_conversion_tracking_mark_as_key_event');
      formData.append('eventName', attributes.monsterinsightsCustomEventName);
      formData.append('nonce', monsterinsights_gutenberg_tool_vars.nonce);
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default()({
        url: monsterinsights_gutenberg_tool_vars.ajaxurl,
        method: 'POST',
        body: formData
      }).then(response => {
        if (response && response.data) {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/notices').createInfoNotice(response.data.message, {
            type: 'snackbar',
            explicitDismiss: true
          });
        }
      });
      setAttributes({
        monsterinsightsMarkAsKeyEvent: newValue
      });
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "MonsterInsights",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: "Mark as a conversion event",
            checked: markAsConversionEvent,
            onChange: newValue => setAttributes({
              monsterinsightsMarkAsConversionEvent: newValue
            }),
            __nextHasNoMarginBottom: true
          }), markAsConversionEvent && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "Custom Event Name",
              value: attributes.monsterinsightsCustomEventName,
              onChange: newValue => setAttributes({
                monsterinsightsCustomEventName: newValue
              }),
              placeholder: "click-(elementID)",
              __nextHasNoMarginBottom: true,
              __next40pxDefaultSize: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
              label: "Mark as Key Event",
              checked: attributes.monsterinsightsMarkAsKeyEvent,
              onChange: onMarkAsKeyEventChange,
              help: "Mark this click as a key event which can be tracked in all of your reports.",
              __nextHasNoMarginBottom: true
            })]
          })]
        })
      })]
    });
  };
}, 'MonsterinsightsAddConversionEventControl');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockEdit', 'extend-button-block/monsterinsights-add-custom-control', MonsterinsightsAddConversionEventControl);

/***/ },

/***/ "./src/plugins/index.js"
/*!******************************!*\
  !*** ./src/plugins/index.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Headline_Analyzer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Headline-Analyzer */ "./src/plugins/Headline-Analyzer/index.js");
/* harmony import */ var _Headline_Analyzer_block_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Headline-Analyzer/block-toolbar */ "./src/plugins/Headline-Analyzer/block-toolbar.js");
/* harmony import */ var _metabox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metabox */ "./src/plugins/metabox/index.js");
/* harmony import */ var _conversion_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./conversion-event */ "./src/plugins/conversion-event/index.js");
/**
 * Import Sidebar Plugins
 */






/***/ },

/***/ "./src/plugins/metabox/components/page-insights-Lite.js"
/*!**************************************************************!*\
  !*** ./src/plugins/metabox/components/page-insights-Lite.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_insights_show_btn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-insights-show-btn */ "./src/plugins/metabox/components/page-insights-show-btn.js");
/* harmony import */ var _page_insights_hide_btn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-insights-hide-btn */ "./src/plugins/metabox/components/page-insights-hide-btn.js");
/* harmony import */ var _page_insights_tab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-insights-tab */ "./src/plugins/metabox/components/page-insights-tab.js");
/* harmony import */ var _page_insights_tab_result_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-insights-tab-result-item */ "./src/plugins/metabox/components/page-insights-tab-result-item.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







class PageInsights extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super();
    this.state = {
      showBtnClicked: false,
      tabs: {
        last30days: true,
        yesterday: false
      }
    };
    this.texts = {
      last30days: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Last 30 days', "google-analytics-for-wordpress"),
      yesterday: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Yesterday', "google-analytics-for-wordpress"),
      bouncerate: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bounce Rate', "google-analytics-for-wordpress"),
      timeonpage: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Time On Page', "google-analytics-for-wordpress"),
      loadingtime: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Load Time', "google-analytics-for-wordpress"),
      entrances: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Entrances', "google-analytics-for-wordpress"),
      pageviews: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page Views', "google-analytics-for-wordpress"),
      exits: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Exits', "google-analytics-for-wordpress")
    };
  }
  showPageInsightsClick = () => {
    this.setState({
      showBtnClicked: true
    });
  };
  hidePageInsightsClick = () => {
    this.setState({
      showBtnClicked: false
    });
  };
  tabclick = current_tab => {
    const tabs = this.state.tabs;
    for (const [key, value] of Object.entries(tabs)) {
      tabs[key] = key === current_tab;
    }
    this.setState({
      tabs
    });
  };
  render() {
    if (this.props.hidden) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {});
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "monsterinsights-metabox lite",
      id: "monsterinsights-metabox-page-insights",
      children: [!this.state.showBtnClicked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_page_insights_show_btn__WEBPACK_IMPORTED_MODULE_2__["default"], {
        onClick: this.showPageInsightsClick
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        id: "monsterinsights-page-insights-content",
        className: this.state.showBtnClicked ? 'active' : '',
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "monsterinsights-page-insights__tabs",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_page_insights_tab__WEBPACK_IMPORTED_MODULE_4__["default"], {
            text: this.texts.last30days,
            tab: "tab-last-30-days-content",
            active: this.state.tabs.last30days,
            onClick: this.tabclick,
            interval: "last30days"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_page_insights_tab__WEBPACK_IMPORTED_MODULE_4__["default"], {
            text: this.texts.yesterday,
            tab: "tab-yesterday-content",
            active: this.state.tabs.yesterday,
            onClick: this.tabclick,
            interval: "yesterday"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "monsterinsights-page-insights-tabs-content",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "monsterinsights-page-insights-tabs-content__tab active",
            id: "tab-last-30-days-content",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "monsterinsights-page-insights-tabs-content__tab-items",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_page_insights_tab_result_item__WEBPACK_IMPORTED_MODULE_5__["default"], {
                value: "1m 43s",
                label: this.texts.timeonpage
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_page_insights_tab_result_item__WEBPACK_IMPORTED_MODULE_5__["default"], {
                value: "19056",
                label: this.texts.entrances
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_page_insights_tab_result_item__WEBPACK_IMPORTED_MODULE_5__["default"], {
                value: "26558",
                label: this.texts.pageviews
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_page_insights_tab_result_item__WEBPACK_IMPORTED_MODULE_5__["default"], {
                value: "13428",
                label: this.texts.exits
              })]
            })
          })
        })]
      }), this.state.showBtnClicked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_page_insights_hide_btn__WEBPACK_IMPORTED_MODULE_3__["default"], {
        onClick: this.hidePageInsightsClick
      })]
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageInsights);

/***/ },

/***/ "./src/plugins/metabox/components/page-insights-hide-btn.js"
/*!******************************************************************!*\
  !*** ./src/plugins/metabox/components/page-insights-hide-btn.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



class PageInsightsHideBtn extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super();
    this.state = {};
    this.btn_text = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide Page Insights', "google-analytics-for-wordpress");
  }
  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
      className: "button",
      href: "#",
      id: "monsterinsights_hide_page_insights",
      onClick: this.props.onClick,
      children: this.btn_text
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageInsightsHideBtn);

/***/ },

/***/ "./src/plugins/metabox/components/page-insights-show-btn.js"
/*!******************************************************************!*\
  !*** ./src/plugins/metabox/components/page-insights-show-btn.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



class PageInsightsShowBtn extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super();
    this.state = {};
    this.btn_show_text = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Page Insights', "google-analytics-for-wordpress");
  }
  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
      className: "button",
      href: "#",
      id: "monsterinsights_show_page_insights",
      onClick: this.props.onClick,
      children: this.btn_show_text
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageInsightsShowBtn);

/***/ },

/***/ "./src/plugins/metabox/components/page-insights-tab-result-item.js"
/*!*************************************************************************!*\
  !*** ./src/plugins/metabox/components/page-insights-tab-result-item.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



class PageInsightsTabResultItem extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "monsterinsights-page-insights-tabs-content__tab-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "monsterinsights-page-insights-tabs-content__tab-item__result",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          children: this.props.value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "monsterinsights-page-insights-tabs-content__tab-item__title",
        children: this.props.label
      })]
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageInsightsTabResultItem);

/***/ },

/***/ "./src/plugins/metabox/components/page-insights-tab.js"
/*!*************************************************************!*\
  !*** ./src/plugins/metabox/components/page-insights-tab.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



class PageInsightsTab extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    this.props.onClick(this.props.interval);
  };
  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
      href: "#",
      className: 'monsterinsights-page-insights__tabs-tab ' + (this.props.active ? 'active' : ''),
      "data-tab": "this.props.tab",
      onClick: this.handleClick,
      children: this.props.text
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageInsightsTab);

/***/ },

/***/ "./src/plugins/metabox/components/pro-badge.js"
/*!*****************************************************!*\
  !*** ./src/plugins/metabox/components/pro-badge.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const ProBadge = props => {
  if ('lite' !== props.license) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {});
  }
  const texts = {
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This is a PRO feature.', "google-analytics-for-wordpress"),
    upgrade: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Upgrade', "google-analytics-for-wordpress")
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "monsterinsights-metabox-pro-badge",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
          width: "15",
          height: "14",
          viewBox: "0 0 15 14",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
            d: "M6.57617 1.08203L4.92578 4.45898L1.19336 4.99219C0.533203 5.09375 0.279297 5.90625 0.761719 6.38867L3.42773 9.00391L2.79297 12.6855C2.69141 13.3457 3.40234 13.8535 3.98633 13.5488L7.3125 11.7969L10.6133 13.5488C11.1973 13.8535 11.9082 13.3457 11.8066 12.6855L11.1719 9.00391L13.8379 6.38867C14.3203 5.90625 14.0664 5.09375 13.4062 4.99219L9.69922 4.45898L8.02344 1.08203C7.74414 0.498047 6.88086 0.472656 6.57617 1.08203Z",
            fill: "#31862D"
          })
        }), texts.description]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "monsterinsights-metabox-pro-badge-upgrade",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
          href: props.upgrade_url,
          target: "_blank",
          rel: "noopener noreferrer",
          children: texts.upgrade
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProBadge);

/***/ },

/***/ "./src/plugins/metabox/components/site-notes.js"
/*!******************************************************!*\
  !*** ./src/plugins/metabox/components/site-notes.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const SiteNotes = () => {
  // Use useSelect to safely get meta and title from editor store
  const {
    metas,
    currentTitle
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const editor = select('core/editor');
    return {
      metas: editor?.getEditedPostAttribute('meta') || {},
      currentTitle: editor?.getEditedPostAttribute('title') || ''
    };
  }, []);

  // Use useDispatch to get dispatch function
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/editor');

  // State hooks
  const [addSiteNote, setAddSiteNote] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [siteNoteText, setSiteNoteText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [customSiteNote, setCustomSiteNote] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [category, setCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);

  // Memoized constants
  const texts = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    checkbox: {
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add a Site Note when publishing this post', "google-analytics-for-wordpress"),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add a Site Note', "google-analytics-for-wordpress")
    },
    category: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Category', "google-analytics-for-wordpress")
    },
    published_template: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Published: %s', "google-analytics-for-wordpress")
  }), []);
  const categories = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return window.monsterinsights_gutenberg_tool_vars?.site_notes_categories || [];
  }, []);

  // Initialize state from metas when they become available
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (metas && Object.keys(metas).length > 0) {
      setAddSiteNote(!!metas._monsterinsights_sitenote_active);
      setSiteNoteText(metas._monsterinsights_sitenote_note || '');
      setCategory(metas._monsterinsights_sitenote_category || 0);
    }
  }, [metas]);

  // Save functions
  const saveActiveField = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(value => {
    editPost({
      meta: {
        _monsterinsights_sitenote_active: !!value
      }
    });
  }, [editPost]);
  const saveNoteField = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(value => {
    editPost({
      meta: {
        _monsterinsights_sitenote_note: value
      }
    });
  }, [editPost]);
  const saveCategoryField = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(value => {
    editPost({
      meta: {
        _monsterinsights_sitenote_category: value
      }
    });
  }, [editPost]);

  // Refresh note text function
  const refreshNoteText = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)((current_title = '') => {
    if (!current_title) {
      current_title = currentTitle;
    }
    const newText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(texts.published_template, current_title);
    setSiteNoteText(newText);
    saveNoteField(newText);
  }, [currentTitle, texts.published_template, saveNoteField]);

  // Toggle control change handler
  const onToggleControlChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(value => {
    // When user opens site-note toggle, set first category as selected
    if (value && category === 0 && categories.length > 0) {
      const firstCategory = categories[0].value;
      setCategory(firstCategory);
      saveCategoryField(firstCategory);
    }
    setAddSiteNote(!!value);
    saveActiveField(!!value);
    refreshNoteText();
  }, [category, categories, saveActiveField, saveCategoryField, refreshNoteText]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      checked: addSiteNote,
      help: texts.checkbox.help,
      label: texts.checkbox.label,
      onChange: onToggleControlChange,
      __nextHasNoMarginBottom: true
    }), addSiteNote && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
      help: "",
      label: "",
      value: siteNoteText,
      onChange: text => {
        const templateRegex = new RegExp('^' + texts.published_template.replace('%s', '.*').replaceAll('"', '\\"') + '$', 'g');
        const siteNoteNotChanged = templateRegex.test(text);
        setSiteNoteText(text);
        setCustomSiteNote(!siteNoteNotChanged);
        saveNoteField(text);
      }
    }), addSiteNote && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: texts.category.label,
      options: categories,
      value: category,
      className: 'site-notes-select',
      onChange: category_id => {
        setCategory(category_id);
        saveCategoryField(category_id);
      },
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteNotes);

/***/ },

/***/ "./src/plugins/metabox/index.js"
/*!**************************************!*\
  !*** ./src/plugins/metabox/index.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_pro_badge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/pro-badge */ "./src/plugins/metabox/components/pro-badge.js");
/* harmony import */ var _components_page_insights_GUTENBERG_APP_VERSION__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/page-insights-GUTENBERG_APP_VERSION */ "./src/plugins/metabox/components/page-insights-Lite.js");
/* harmony import */ var _components_site_notes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/site-notes */ "./src/plugins/metabox/components/site-notes.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);










const MonsterInsightsMetabox = () => {
  const MonsterInsightsVars = window.monsterinsights_gutenberg_tool_vars;

  // Basic validation - ensure vars are loaded
  if (!MonsterInsightsVars) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.Fragment, {});
  }

  // Use useSelect hook to get meta data safely
  const metas = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select('core/editor')?.getEditedPostAttribute('meta') || {};
  }, []);
  const [hasSkipTracking, setHasSkipTracking] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(!!metas._monsterinsights_skip_tracking);

  // Use useDispatch hook
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/editor');

  // For non-public post types, show only SiteNotes
  if ('1' !== MonsterInsightsVars.public_post_type) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
      name: "monsterinsights-metabox",
      title: "MonsterInsights",
      className: "monsterinsights-metabox-wrapper",
      icon: "mi",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_site_notes__WEBPACK_IMPORTED_MODULE_8__["default"], {})
    });
  }

  // For public post types, show everything
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
    name: "monsterinsights-metabox",
    title: "MonsterInsights",
    className: "monsterinsights-metabox-wrapper",
    icon: "mi",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToggleControl, {
      checked: hasSkipTracking,
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toggle to prevent Google Analytics from tracking this page.', "google-analytics-for-wordpress"),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exclude page from Google Analytics Tracking', "google-analytics-for-wordpress"),
      disabled: 'lite' === MonsterInsightsVars.license_type,
      __nextHasNoMarginBottom: true,
      onChange: value => {
        setHasSkipTracking(!!value);
        editPost({
          meta: {
            _monsterinsights_skip_tracking: value
          }
        });
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_page_insights_GUTENBERG_APP_VERSION__WEBPACK_IMPORTED_MODULE_7__["default"], {
      addonInstalled: MonsterInsightsVars.page_insights_addon_active,
      hidden: hasSkipTracking
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_pro_badge__WEBPACK_IMPORTED_MODULE_6__["default"], {
      license: MonsterInsightsVars.license_type,
      upgrade_url: MonsterInsightsVars.upgrade_url
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_site_notes__WEBPACK_IMPORTED_MODULE_8__["default"], {})]
  });
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('monsterinsights-metabox', {
  render: MonsterInsightsMetabox
});

/***/ },

/***/ "./src/assets/scss/monsterinsights/editor.scss"
/*!*****************************************************!*\
  !*** ./src/assets/scss/monsterinsights/editor.scss ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/assets/scss/monsterinsights/frontend-Lite.scss"
/*!************************************************************!*\
  !*** ./src/assets/scss/monsterinsights/frontend-Lite.scss ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/pure-react-carousel/dist/index.es.js"
/*!***********************************************************!*\
  !*** ./node_modules/pure-react-carousel/dist/index.es.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ButtonBack: () => (/* binding */ index),
/* harmony export */   ButtonBackView: () => (/* binding */ ButtonBack),
/* harmony export */   ButtonFirst: () => (/* binding */ index$1),
/* harmony export */   ButtonFirstView: () => (/* binding */ ButtonFirst),
/* harmony export */   ButtonLast: () => (/* binding */ index$2),
/* harmony export */   ButtonLastView: () => (/* binding */ ButtonLast),
/* harmony export */   ButtonNext: () => (/* binding */ index$3),
/* harmony export */   ButtonNextView: () => (/* binding */ ButtonNext),
/* harmony export */   ButtonPlay: () => (/* binding */ index$4),
/* harmony export */   ButtonPlayView: () => (/* binding */ ButtonPlay),
/* harmony export */   CarouselContext: () => (/* binding */ Context),
/* harmony export */   CarouselProvider: () => (/* binding */ CarouselProvider),
/* harmony export */   Dot: () => (/* binding */ Dot$1),
/* harmony export */   DotGroup: () => (/* binding */ index$5),
/* harmony export */   DotGroupView: () => (/* binding */ DotGroup),
/* harmony export */   DotView: () => (/* binding */ Dot),
/* harmony export */   Image: () => (/* binding */ Image$1),
/* harmony export */   ImageView: () => (/* binding */ Image),
/* harmony export */   ImageWithZoom: () => (/* binding */ index$6),
/* harmony export */   ImageWithZoomView: () => (/* binding */ ImageWithZoom),
/* harmony export */   Slide: () => (/* binding */ index$7),
/* harmony export */   SlideView: () => (/* binding */ Slide),
/* harmony export */   Slider: () => (/* binding */ index$8),
/* harmony export */   SliderView: () => (/* binding */ Slider),
/* harmony export */   Spinner: () => (/* binding */ Spinner),
/* harmony export */   SpinnerView: () => (/* binding */ Spinner),
/* harmony export */   Store: () => (/* binding */ Store),
/* harmony export */   WithStore: () => (/* binding */ WithStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e}).apply(this,arguments)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _objectWithoutPropertiesLoose(e,t){if(null==e)return{};var r,i,n={},s=Object.keys(e);for(i=0;i<s.length;i++)r=s[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}function _objectWithoutProperties(e,t){if(null==e)return{};var r,i,n=_objectWithoutPropertiesLoose(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)r=s[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _possibleConstructorReturn(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var r,i=_getPrototypeOf(e);if(t){var n=_getPrototypeOf(this).constructor;r=Reflect.construct(i,arguments,n)}else r=i.apply(this,arguments);return _possibleConstructorReturn(this,r)}}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,i=new Array(t);r<t;r++)i[r]=e[r];return i}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function createCommonjsModule(e,t){return t={exports:{}},e(t,t.exports),t.exports}function emptyFunction(){}function emptyFunctionWithReset(){}function cn(e){return e.map(function(e){return!1===e?null:e}).join(" ").replace(/\s+/g," ").trim()}function slideSize(e,t){return 100/e*t/t}function slideTraySize(e,t){return 100*e/t}function pct(e){return"".concat(e,"%")}function equal(e,t,r){if(e===t)return!0;var i=types[jkrosoType(e)],n=types[jkrosoType(t)];return!(!i||i!==n)&&i(e,t,r)}function memoGaurd(e){return function(t,r,i){if(!i)return e(t,r,[]);for(var n,s=i.length;n=i[--s];)if(n[0]===t&&n[1]===r)return!0;return e(t,r,i)}}function arrayEqual(e,t,r){var i=e.length;if(i!==t.length)return!1;for(r.push([e,t]);i--;)if(!equal(e[i],t[i],r))return!1;return!0}function objectEqual(e,t,r){if("function"==typeof e.equal)return r.push([e,t]),e.equal(t,r);var i=getEnumerableProperties(e),n=getEnumerableProperties(t),s=i.length;if(s!==n.length)return!1;for(i.sort(),n.sort();s--;)if(i[s]!==n[s])return!1;for(r.push([e,t]),s=i.length;s--;){var o=i[s];if(!equal(e[o],t[o],r))return!1}return!0}function getEnumerableProperties(e){var t=[];for(var r in e)"constructor"!==r&&t.push(r);return t}function isNonNullObject(e){return!!e&&"object"==typeof e}function isSpecial(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||isReactElement(e)}function isReactElement(e){return e.$$typeof===REACT_ELEMENT_TYPE}function emptyTarget(e){return Array.isArray(e)?[]:{}}function cloneUnlessOtherwiseSpecified(e,t){return!1!==t.clone&&t.isMergeableObject(e)?deepmerge(emptyTarget(e),e,t):e}function defaultArrayMerge(e,t,r){return e.concat(t).map(function(e){return cloneUnlessOtherwiseSpecified(e,r)})}function mergeObject(e,t,r){var i={};return r.isMergeableObject(e)&&Object.keys(e).forEach(function(t){i[t]=cloneUnlessOtherwiseSpecified(e[t],r)}),Object.keys(t).forEach(function(n){r.isMergeableObject(t[n])&&e[n]?i[n]=deepmerge(e[n],t[n],r):i[n]=cloneUnlessOtherwiseSpecified(t[n],r)}),i}function deepmerge(e,t,r){(r=r||{}).arrayMerge=r.arrayMerge||defaultArrayMerge,r.isMergeableObject=r.isMergeableObject||isMergeableObject;var i=Array.isArray(t);return i===Array.isArray(e)?i?r.arrayMerge(e,t,r):mergeObject(e,t,r):cloneUnlessOtherwiseSpecified(t,r)}function WithStore(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return{}},r=function(r){function i(e,r){var s;return _classCallCheck(this,i),s=n.call(this,e,r),s.state=t(_objectSpread2({},r.state)),s.updateStateProps=s.updateStateProps.bind(_assertThisInitialized(s)),s}_inherits(i,r);var n=_createSuper(i);return _createClass(i,[{key:"componentDidMount",value:function(){this.context.subscribe(this.updateStateProps)}},{key:"shouldComponentUpdate",value:function(e,t){return!equals(t,this.state)||!equals(e,this.props)}},{key:"componentWillUnmount",value:function(){this.context.unsubscribe(this.updateStateProps)}},{key:"updateStateProps",value:function(){this.setState(t(_objectSpread2({},this.context.state)))}},{key:"render",value:function(){var t=this,r=deepmerge_1(this.state,this.props);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(e,_extends({ref:function(e){t.instance=e}},r,{carouselStore:{getStoreState:this.context.getStoreState,masterSpinnerError:this.context.masterSpinnerError,masterSpinnerSuccess:this.context.masterSpinnerSuccess,setStoreState:this.context.setStoreState,subscribeMasterSpinner:this.context.subscribeMasterSpinner,unsubscribeAllMasterSpinner:this.context.unsubscribeAllMasterSpinner,unsubscribeMasterSpinner:this.context.unsubscribeMasterSpinner}}),this.props.children)}}]),i}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));return _defineProperty(r,"contextType",Context),_defineProperty(r,"propTypes",{children:CarouselPropTypes.children}),_defineProperty(r,"defaultProps",{children:null}),r}var ReactPropTypesSecret="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",ReactPropTypesSecret_1=ReactPropTypesSecret;emptyFunctionWithReset.resetWarningCache=emptyFunction;var factoryWithThrowingShims=function(){function e(e,t,r,i,n,s){if(s!==ReactPropTypesSecret_1){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return r.PropTypes=r,r},propTypes=createCommonjsModule(function(e){e.exports=factoryWithThrowingShims()}),LOADING="loading",SUCCESS="success",ERROR="error",CarouselPropTypes={children:propTypes.oneOfType([propTypes.arrayOf(propTypes.node),propTypes.node]),direction:propTypes.oneOf(["forward","backward"]),height:function(e,t){var r=e[t];return"vertical"!==e.orientation||null!==r&&"number"==typeof r?null:new Error("Missing required property '".concat(t,"' when orientation is vertical.  You must supply a number representing the height in pixels"))},orientation:propTypes.oneOf(["horizontal","vertical"]),isBgImage:function(e,t){return!0===e[t]&&"img"===e.tag?new Error("HTML img elements should not have a backgroundImage.  Please use ".concat(t," for other block-level HTML tags, like div, a, section, etc...")):null}},boundedRange=function(e){var t=e.min,r=e.max,i=e.x;return Math.min(r,Math.max(t,i))},s={buttonBack:"buttonBack___1mlaL"},_excluded=["carouselStore","className","currentSlide","disabled","onClick","step","totalSlides","visibleSlides","infinite"],ButtonBack=function(e){function t(e){var i;return _classCallCheck(this,t),i=r.call(this,e),i.handleOnClick=i.handleOnClick.bind(_assertThisInitialized(i)),i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"handleOnClick",value:function(e){var t=this.props,r=t.carouselStore,i=t.currentSlide,n=t.onClick,s=t.step,o=t.infinite,a=t.visibleSlides,l=t.totalSlides-a,c=Math.max(i-s,0);o&&(c=0===i?l:c),r.setStoreState({currentSlide:c,isPlaying:!1},null!==n&&n.call(this,e))}},{key:"render",value:function(){var e=this.props,r=(e.carouselStore,e.className),i=(e.currentSlide,e.disabled,e.onClick,e.step,e.totalSlides,e.visibleSlides,e.infinite),n=_objectWithoutProperties(e,_excluded),o=cn([s.buttonBack,"carousel__back-button",r]),a=t.setDisabled(this.props.disabled,this.props.currentSlide,i);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button",_extends({type:"button","aria-label":"previous",className:o,onClick:this.handleOnClick,disabled:a},n),this.props.children)}}],[{key:"setDisabled",value:function(e,t,r){return null!==e?e:0===t&&!r}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));_defineProperty(ButtonBack,"propTypes",{carouselStore:propTypes.object.isRequired,children:CarouselPropTypes.children.isRequired,className:propTypes.string,currentSlide:propTypes.number.isRequired,disabled:propTypes.bool,onClick:propTypes.func,step:propTypes.number.isRequired,totalSlides:propTypes.number.isRequired,visibleSlides:propTypes.number.isRequired,infinite:propTypes.bool}),_defineProperty(ButtonBack,"defaultProps",{className:null,disabled:null,onClick:null,infinite:!1});var jkrosoType=createCommonjsModule(function(e,t){var r={}.toString,i="undefined"!=typeof window?window.Node:Function;e.exports=t=function(e){var t=typeof e;if("object"!=t)return t;if(t=n[r.call(e)],"object"==t)return e instanceof Map?"map":e instanceof Set?"set":"object";if(t)return t;if(e instanceof i)switch(e.nodeType){case 1:return"element";case 3:return"text-node";case 9:return"document";case 11:return"document-fragment";default:return"dom-node"}};var n=t.types={"[object Function]":"function","[object Date]":"date","[object RegExp]":"regexp","[object Arguments]":"arguments","[object Array]":"array","[object Set]":"set","[object String]":"string","[object Null]":"null","[object Undefined]":"undefined","[object Number]":"number","[object Boolean]":"boolean","[object Object]":"object","[object Map]":"map","[object Text]":"text-node","[object Uint8Array]":"bit-array","[object Uint16Array]":"bit-array","[object Uint32Array]":"bit-array","[object Uint8ClampedArray]":"bit-array","[object Error]":"error","[object FormData]":"form-data","[object File]":"file","[object Blob]":"blob"}}),jkrosoType_1=jkrosoType.types,types={};types.number=function(e,t){return e!==e&&t!==t},types.function=function(e,t,r){return e.toString()===t.toString()&&types.object(e,t,r)&&equal(e.prototype,t.prototype)},types.date=function(e,t){return+e==+t},types.regexp=function(e,t){return e.toString()===t.toString()},types.element=function(e,t){return e.outerHTML===t.outerHTML},types.textnode=function(e,t){return e.textContent===t.textContent},types.arguments=types["bit-array"]=types.array=memoGaurd(arrayEqual),types.object=memoGaurd(objectEqual);var equals=equal,isMergeableObject=function(e){return isNonNullObject(e)&&!isSpecial(e)},canUseSymbol="function"==typeof Symbol&&Symbol.for,REACT_ELEMENT_TYPE=canUseSymbol?Symbol.for("react.element"):60103;deepmerge.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(e,r){return deepmerge(e,r,t)},{})};var deepmerge_1=deepmerge,Context=react__WEBPACK_IMPORTED_MODULE_0___default().createContext(),deepFreeze=function e(t){return Object.freeze(t),Object.getOwnPropertyNames(t).forEach(function(r){!t.hasOwnProperty(r)||null===t[r]||"object"!=typeof t[r]&&"function"!=typeof t[r]||Object.isFrozen(t[r])||e(t[r])}),t},DEFAULT_STATE={masterSpinnerFinished:!1},Store=function(){function e(t){_classCallCheck(this,e),this.state=deepFreeze(deepmerge_1(DEFAULT_STATE,t)),this.subscriptions=[],this.masterSpinnerSubscriptions={},this.setStoreState=this.setStoreState.bind(this),this.getStoreState=this.getStoreState.bind(this),this.subscribe=this.subscribe.bind(this),this.unsubscribe=this.unsubscribe.bind(this),this.updateSubscribers=this.updateSubscribers.bind(this),this.subscribeMasterSpinner=this.subscribeMasterSpinner.bind(this),this.unsubscribeMasterSpinner=this.unsubscribeMasterSpinner.bind(this),this.unsubscribeAllMasterSpinner=this.unsubscribeAllMasterSpinner.bind(this),this.masterSpinnerSuccess=this.masterSpinnerSuccess.bind(this),this.masterSpinnerError=this.masterSpinnerError.bind(this)}return _createClass(e,[{key:"setStoreState",value:function(e,t){this.state=deepFreeze(deepmerge_1(this.state,e)),this.updateSubscribers(t)}},{key:"getStoreState",value:function(){return deepmerge_1({},this.state)}},{key:"subscribe",value:function(e){this.subscriptions.push(e)}},{key:"unsubscribe",value:function(e){var t=this.subscriptions.indexOf(e);-1!==t&&this.subscriptions.splice(t,1)}},{key:"updateSubscribers",value:function(e){this.subscriptions.forEach(function(e){return e()}),"function"==typeof e&&e(this.getStoreState())}},{key:"subscribeMasterSpinner",value:function(e){-1===Object.keys(this.masterSpinnerSubscriptions).indexOf(e)&&(this.masterSpinnerSubscriptions[e]={success:!1,error:!1,complete:!1})}},{key:"unsubscribeMasterSpinner",value:function(e){return-1!==Object.keys(this.masterSpinnerSubscriptions).indexOf(e)&&(this.setMasterSpinnerFinished(),delete this.masterSpinnerSubscriptions[e])}},{key:"unsubscribeAllMasterSpinner",value:function(){this.masterSpinnerSubscriptions={},this.setMasterSpinnerFinished()}},{key:"masterSpinnerSuccess",value:function(e){this.masterSpinnerSubscriptions[e].success=!0,this.masterSpinnerSubscriptions[e].complete=!0,this.setMasterSpinnerFinished()}},{key:"masterSpinnerError",value:function(e){this.masterSpinnerSubscriptions[e].error=!0,this.masterSpinnerSubscriptions[e].complete=!0,this.setMasterSpinnerFinished()}},{key:"setMasterSpinnerFinished",value:function(){this.setStoreState({masterSpinnerFinished:this.isMasterSpinnerFinished()})}},{key:"isMasterSpinnerFinished",value:function(){var e=this;return 0===Object.keys(this.masterSpinnerSubscriptions).filter(function(t){return!0!==e.masterSpinnerSubscriptions[t].complete}).length}}]),e}(),_excluded$1=["children","className","currentSlide","disableAnimation","disableKeyboard","hasMasterSpinner","interval","isPageScrollLocked","isPlaying","lockOnWindowScroll","naturalSlideHeight","naturalSlideWidth","orientation","playDirection","step","dragStep","tag","totalSlides","touchEnabled","dragEnabled","visibleSlides","infinite","isIntrinsicHeight"],_class,CarouselProvider=(_class=function(e){function t(e){var i;if(_classCallCheck(this,t),i=r.call(this,e),e.isIntrinsicHeight&&"horizontal"!==e.orientation)throw Error('isIntrinsicHeight can only be used in "horizontal" orientation. See Readme for more information.');var n={currentSlide:e.currentSlide,disableAnimation:e.disableAnimation,disableKeyboard:e.disableKeyboard,hasMasterSpinner:e.hasMasterSpinner,imageErrorCount:0,imageSuccessCount:0,interval:e.interval,isPageScrollLocked:e.isPageScrollLocked,isPlaying:e.isPlaying,lockOnWindowScroll:e.lockOnWindowScroll,masterSpinnerThreshold:0,naturalSlideHeight:e.naturalSlideHeight,naturalSlideWidth:e.naturalSlideWidth,orientation:e.orientation,playDirection:e.playDirection,privateUnDisableAnimation:!1,slideSize:slideSize(e.totalSlides,e.visibleSlides),slideTraySize:slideTraySize(e.totalSlides,e.visibleSlides),step:e.step,dragStep:e.dragStep,totalSlides:e.totalSlides,touchEnabled:e.touchEnabled,dragEnabled:e.dragEnabled,visibleSlides:e.visibleSlides,infinite:e.infinite,isIntrinsicHeight:e.isIntrinsicHeight};return i.carouselStore=new Store(n),i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"componentDidUpdate",value:function(e){var t=this,r={};["currentSlide","disableAnimation","disableKeyboard","hasMasterSpinner","interval","isPlaying","naturalSlideHeight","naturalSlideWidth","lockOnWindowScroll","orientation","playDirection","step","dragStep","totalSlides","touchEnabled","dragEnabled","visibleSlides"].forEach(function(i){e[i]!==t.props[i]&&(r[i]=t.props[i])}),this.props.currentSlide!==e.currentSlide&&!this.props.disableAnimation&&(r.disableAnimation=!0,r.privateUnDisableAnimation=!0),this.props.totalSlides===e.totalSlides&&this.props.visibleSlides===e.visibleSlides||(r.slideSize=slideSize(this.props.totalSlides,this.props.visibleSlides),r.slideTraySize=slideTraySize(this.props.totalSlides,this.props.visibleSlides)),this.carouselStore.state.currentSlide>=this.props.totalSlides&&(r.currentSlide=Math.max(this.props.totalSlides-1,0)),Object.keys(r).length>0&&this.carouselStore.setStoreState(r)}},{key:"componentWillUnmount",value:function(){this.carouselStore.unsubscribeAllMasterSpinner()}},{key:"getStore",value:function(){return this.carouselStore}},{key:"render",value:function(){var e=this.props,t=(e.children,e.className,e.currentSlide,e.disableAnimation,e.disableKeyboard,e.hasMasterSpinner,e.interval,e.isPageScrollLocked,e.isPlaying,e.lockOnWindowScroll,e.naturalSlideHeight,e.naturalSlideWidth,e.orientation,e.playDirection,e.step,e.dragStep,e.tag),r=(e.totalSlides,e.touchEnabled,e.dragEnabled,e.visibleSlides,e.infinite,e.isIntrinsicHeight,_objectWithoutProperties(e,_excluded$1)),i=cn(["carousel",this.props.className]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t,_extends({className:i},r),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Context.Provider,{value:this.carouselStore},this.props.children))}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),_defineProperty(_class,"propTypes",{children:CarouselPropTypes.children.isRequired,className:propTypes.string,currentSlide:propTypes.number,disableAnimation:propTypes.bool,disableKeyboard:propTypes.bool,hasMasterSpinner:propTypes.bool,interval:propTypes.number,isPageScrollLocked:propTypes.bool,isPlaying:propTypes.bool,lockOnWindowScroll:propTypes.bool,naturalSlideHeight:propTypes.number.isRequired,naturalSlideWidth:propTypes.number.isRequired,orientation:CarouselPropTypes.orientation,playDirection:CarouselPropTypes.direction,step:propTypes.number,dragStep:propTypes.number,tag:propTypes.string,totalSlides:propTypes.number.isRequired,touchEnabled:propTypes.bool,dragEnabled:propTypes.bool,visibleSlides:propTypes.number,infinite:propTypes.bool,isIntrinsicHeight:propTypes.bool}),_defineProperty(_class,"defaultProps",{className:null,currentSlide:0,disableAnimation:!1,disableKeyboard:!1,hasMasterSpinner:!1,interval:5e3,isPageScrollLocked:!1,isPlaying:!1,lockOnWindowScroll:!1,orientation:"horizontal",playDirection:"forward",step:1,dragStep:1,tag:"div",touchEnabled:!0,dragEnabled:!0,visibleSlides:1,infinite:!1,isIntrinsicHeight:!1}),_class);Context.Consumer;var index=WithStore(ButtonBack,function(e){return{currentSlide:e.currentSlide,step:e.step,totalSlides:e.totalSlides,visibleSlides:e.visibleSlides,infinite:e.infinite}}),s$1={buttonFirst:"buttonFirst___2rhFr"},_excluded$2=["carouselStore","className","currentSlide","disabled","onClick","totalSlides"],_class$1,ButtonFirst=(_class$1=function(e){function t(){var e;return _classCallCheck(this,t),e=r.call(this),e.handleOnClick=e.handleOnClick.bind(_assertThisInitialized(e)),e}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"handleOnClick",value:function(e){var t=this.props,r=t.carouselStore,i=t.onClick;r.setStoreState({currentSlide:0,isPlaying:!1},null!==i&&i.call(this,e))}},{key:"render",value:function(){var e=this.props,t=(e.carouselStore,e.className),r=e.currentSlide,i=e.disabled,n=(e.onClick,e.totalSlides,_objectWithoutProperties(e,_excluded$2)),s=cn([s$1.buttonFirst,"carousel__first-button",t]),o=null!==i?i:0===r;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button",_extends({type:"button","aria-label":"first",className:s,onClick:this.handleOnClick,disabled:o},n),this.props.children)}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),_defineProperty(_class$1,"propTypes",{carouselStore:propTypes.object.isRequired,children:CarouselPropTypes.children.isRequired,className:propTypes.string,currentSlide:propTypes.number.isRequired,disabled:propTypes.bool,onClick:propTypes.func,totalSlides:propTypes.number.isRequired}),_defineProperty(_class$1,"defaultProps",{className:null,disabled:null,onClick:null}),_class$1),index$1=WithStore(ButtonFirst,function(e){return{currentSlide:e.currentSlide,totalSlides:e.totalSlides}}),s$2={buttonLast:"buttonLast___2yuh0"},_excluded$3=["carouselStore","className","currentSlide","disabled","onClick","totalSlides","visibleSlides"],_class$2,ButtonLast=(_class$2=function(e){function t(){var e;return _classCallCheck(this,t),e=r.call(this),e.handleOnClick=e.handleOnClick.bind(_assertThisInitialized(e)),e}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"handleOnClick",value:function(e){var t=this.props,r=t.carouselStore,i=t.onClick,n=t.totalSlides,s=t.visibleSlides;r.setStoreState({currentSlide:n-s,isPlaying:!1},null!==i&&i.call(this,e))}},{key:"render",value:function(){var e=this.props,t=(e.carouselStore,e.className),r=e.currentSlide,i=e.disabled,n=(e.onClick,e.totalSlides),s=e.visibleSlides,o=_objectWithoutProperties(e,_excluded$3),a=cn([s$2.buttonLast,"carousel__last-button",t]),l=null!==i?i:r>=n-s;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button",_extends({type:"button","aria-label":"last",className:a,onClick:this.handleOnClick,disabled:l},o),this.props.children)}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),_defineProperty(_class$2,"propTypes",{carouselStore:propTypes.object.isRequired,children:CarouselPropTypes.children.isRequired,className:propTypes.string,currentSlide:propTypes.number.isRequired,disabled:propTypes.bool,onClick:propTypes.func,totalSlides:propTypes.number.isRequired,visibleSlides:propTypes.number.isRequired}),_defineProperty(_class$2,"defaultProps",{className:null,disabled:null,onClick:null}),_class$2),index$2=WithStore(ButtonLast,function(e){return{currentSlide:e.currentSlide,totalSlides:e.totalSlides,visibleSlides:e.visibleSlides}}),s$3={buttonNext:"buttonNext___2mOCa"},_excluded$4=["carouselStore","className","currentSlide","disabled","onClick","step","totalSlides","visibleSlides","infinite"],_class$3,ButtonNext=(_class$3=function(e){function t(e){var i;return _classCallCheck(this,t),i=r.call(this,e),i.handleOnClick=i.handleOnClick.bind(_assertThisInitialized(i)),i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"handleOnClick",value:function(e){var t=this.props,r=t.currentSlide,i=t.onClick,n=t.step,s=t.carouselStore,o=t.infinite,a=t.totalSlides-t.visibleSlides,l=n+r,c=Math.min(l,a);o&&(c=a===r?0:c),s.setStoreState({currentSlide:c,isPlaying:!1},null!==i&&i.call(this,e))}},{key:"render",value:function(){var e=this.props,r=(e.carouselStore,e.className),i=e.currentSlide,n=e.disabled,s=(e.onClick,e.step,e.totalSlides),o=e.visibleSlides,a=e.infinite,l=_objectWithoutProperties(e,_excluded$4),c=cn([s$3.buttonNext,"carousel__next-button",r]),u=t.setDisabled(n,i,o,s,a);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button",_extends({type:"button","aria-label":"next",className:c,onClick:this.handleOnClick,disabled:u},l),this.props.children)}}],[{key:"setDisabled",value:function(e,t,r,i,n){return null!==e?e:t>=i-r&&!n}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent)),_defineProperty(_class$3,"propTypes",{carouselStore:propTypes.object.isRequired,children:CarouselPropTypes.children.isRequired,className:propTypes.string,currentSlide:propTypes.number.isRequired,disabled:propTypes.bool,onClick:propTypes.func,step:propTypes.number.isRequired,totalSlides:propTypes.number.isRequired,visibleSlides:propTypes.number.isRequired,infinite:propTypes.bool}),_defineProperty(_class$3,"defaultProps",{className:null,disabled:null,onClick:null,infinite:!1}),_class$3),index$3=WithStore(ButtonNext,function(e){return{currentSlide:e.currentSlide,step:e.step,totalSlides:e.totalSlides,visibleSlides:e.visibleSlides,infinite:e.infinite}}),s$4={buttonNext:"buttonNext___3Lm3s"},_excluded$5=["carouselStore","children","childrenPaused","childrenPlaying","className","isPlaying","onClick"],_class$4,ButtonPlay=(_class$4=function(e){function t(e){var i;return _classCallCheck(this,t),i=r.call(this,e),i.handleOnClick=i.handleOnClick.bind(_assertThisInitialized(i)),i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"handleOnClick",value:function(e){var t=this.props.onClick;this.props.carouselStore.setStoreState({isPlaying:!this.props.isPlaying},null!==t&&t.call(this,e))}},{key:"render",value:function(){var e=this.props,t=(e.carouselStore,e.children,e.childrenPaused),r=e.childrenPlaying,i=e.className,n=e.isPlaying,s=(e.onClick,_objectWithoutProperties(e,_excluded$5)),o=cn([s$4.buttonNext,"carousel__play-button",i]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button",_extends({type:"button","aria-label":"play",className:o,onClick:this.handleOnClick},s),n&&r,!n&&t,this.props.children)}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent)),_defineProperty(_class$4,"propTypes",{carouselStore:propTypes.object.isRequired,children:propTypes.node,childrenPaused:propTypes.node,childrenPlaying:propTypes.node,className:propTypes.string,isPlaying:propTypes.bool.isRequired,onClick:propTypes.func}),_defineProperty(_class$4,"defaultProps",{children:null,childrenPaused:null,childrenPlaying:null,className:null,onClick:null}),_class$4),index$4=WithStore(ButtonPlay,function(e){return{isPlaying:e.isPlaying}}),s$5={dot:"dot___3c3SI"},_excluded$6=["carouselStore","children","className","currentSlide","disabled","onClick","selected","slide","totalSlides","visibleSlides"],_class$5,Dot=(_class$5=function(e){function t(e){var i;return _classCallCheck(this,t),i=r.call(this,e),i.handleOnClick=i.handleOnClick.bind(_assertThisInitialized(i)),i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"handleOnClick",value:function(e){var t=this.props,r=t.carouselStore,i=t.onClick,n=t.slide,s=t.totalSlides,o=t.visibleSlides,a=n>=s-o?s-o:n;r.setStoreState({currentSlide:a,isPlaying:!1},null!==i&&i.call(this,e))}},{key:"render",value:function(){var e=this.props,t=(e.carouselStore,e.children,e.className),r=e.currentSlide,i=e.disabled,n=(e.onClick,e.selected),s=e.slide,o=(e.totalSlides,e.visibleSlides),a=_objectWithoutProperties(e,_excluded$6),l=s>=r&&s<r+o,c="boolean"==typeof n?n:l,u=!0===l,p="boolean"==typeof i?i:u,d=cn([s$5.dot,c&&s$5.dotSelected,"carousel__dot","carousel__dot--".concat(s),c&&"carousel__dot--selected",t]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button",_extends({"aria-label":"slide dot",type:"button",onClick:this.handleOnClick,className:d,disabled:p},a),this.props.children)}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),_defineProperty(_class$5,"propTypes",{carouselStore:propTypes.object.isRequired,children:CarouselPropTypes.children,className:propTypes.string,currentSlide:propTypes.number.isRequired,disabled:propTypes.bool,onClick:propTypes.func,selected:propTypes.bool,slide:propTypes.number.isRequired,totalSlides:propTypes.number.isRequired,visibleSlides:propTypes.number.isRequired}),_defineProperty(_class$5,"defaultProps",{children:null,className:null,disabled:null,onClick:null,selected:null}),_class$5),Dot$1=WithStore(Dot,function(e){return{currentSlide:e.currentSlide,totalSlides:e.totalSlides,visibleSlides:e.visibleSlides}}),s$6={},_excluded$7=["renderDots"],_excluded2=["carouselStore","children","className","currentSlide","dotNumbers","totalSlides","visibleSlides","disableActiveDots","showAsSelectedForCurrentSlideOnly","renderDots"],_class$6,DotGroup=(_class$6=function(e){function t(){return _classCallCheck(this,t),r.apply(this,arguments)}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"renderDots",value:function(){var e=this.props,t=e.currentSlide,r=e.totalSlides,i=e.visibleSlides,n=e.disableActiveDots,s=e.showAsSelectedForCurrentSlideOnly,o=e.renderDots;if(o){var a=this.props;a.renderDots;return o(_objectWithoutProperties(a,_excluded$7))}for(var l=[],c=0;c<r;c+=1){var u=c>=t&&c<t+i,p=c===t,d=s?p:u,h=c>=r-i?r-i:c;l.push(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Dot$1,{key:c,slide:h,selected:d,disabled:!!n&&d},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span",{className:cn["carousel__dot-group-dot"]},this.props.dotNumbers&&c+1)))}return l}},{key:"render",value:function(){var e=this.props,t=(e.carouselStore,e.children),r=e.className,i=(e.currentSlide,e.dotNumbers,e.totalSlides,e.visibleSlides,e.disableActiveDots,e.showAsSelectedForCurrentSlideOnly,e.renderDots,_objectWithoutProperties(e,_excluded2)),n=cn([s$6.DotGroup,"carousel__dot-group",r]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",_extends({className:n},i),this.renderDots(),t)}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),_defineProperty(_class$6,"propTypes",{children:CarouselPropTypes.children,className:propTypes.string,currentSlide:propTypes.number.isRequired,carouselStore:propTypes.object.isRequired,totalSlides:propTypes.number.isRequired,visibleSlides:propTypes.number.isRequired,dotNumbers:propTypes.bool,disableActiveDots:propTypes.bool,showAsSelectedForCurrentSlideOnly:propTypes.bool,renderDots:propTypes.func}),_defineProperty(_class$6,"defaultProps",{children:null,className:null,dotNumbers:!1,disableActiveDots:!0,showAsSelectedForCurrentSlideOnly:!1,renderDots:null}),_class$6),index$5=WithStore(DotGroup,function(e){return{currentSlide:e.currentSlide,totalSlides:e.totalSlides,visibleSlides:e.visibleSlides}}),s$7={image:"image___xtQGH"},_excluded$8=["src","alt"],_excluded2$1=["carouselStore","children","className","hasMasterSpinner","isBgImage","onError","onLoad","renderError","renderLoading","style","tag"],Image=function(e){function t(e){var i;return _classCallCheck(this,t),i=r.call(this,e),i.state={imageStatus:LOADING},i.handleImageLoad=i.handleImageLoad.bind(_assertThisInitialized(i)),i.handleImageError=i.handleImageError.bind(_assertThisInitialized(i)),i.image=null,i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"componentDidMount",value:function(){t.subscribeMasterSpinner(this.props),this.initImage()}},{key:"componentDidUpdate",value:function(e){e.src!==this.props.src&&(t.unsubscribeMasterSpinner(e),t.subscribeMasterSpinner(this.props),this.initImage())}},{key:"componentWillUnmount",value:function(){t.unsubscribeMasterSpinner(this.props),this.image.removeEventListener("load",this.handleImageLoad),this.image.removeEventListener("error",this.handleImageError),this.image=null}},{key:"initImage",value:function(){if(this.setState({imageStatus:LOADING}),this.image=document.createElement("img"),this.image.addEventListener("load",this.handleImageLoad,!1),this.image.addEventListener("error",this.handleImageError,!1),this.image.src=this.props.src,this.image.readyState||this.image.complete){var e=this.image.src;this.image.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",this.image.src=e}}},{key:"handleImageLoad",value:function(e){this.setState({imageStatus:SUCCESS}),this.props.hasMasterSpinner&&this.props.carouselStore.masterSpinnerSuccess(this.props.src),this.props.onLoad&&this.props.onLoad(e)}},{key:"handleImageError",value:function(e){this.setState({imageStatus:ERROR}),this.props.hasMasterSpinner&&this.props.carouselStore.masterSpinnerError(this.props.src),this.props.onError&&this.props.onError(e)}},{key:"tempTag",value:function(){return"img"===this.props.tag?"div":this.props.tag}},{key:"customRender",value:function(e){return"function"==typeof this.props[e]?this.props[e]():this.props.children}},{key:"renderLoading",value:function(e){var t=this.tempTag(),r=cn([s$7.image,s$7.imageLoading,"carousel__image",this.props.isBgImage&&"carousel__image--with-background","carousel__image--loading",this.props.className]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t,_extends({className:r},e),this.customRender("renderLoading"))}},{key:"renderError",value:function(e){var t=this.tempTag(),r=cn([s$7.image,s$7.imageError,"carousel__image",this.props.isBgImage&&"carousel__image--with-background","carousel__image--error",this.props.className]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t,_extends({className:r},e),this.customRender("renderError"))}},{key:"renderSuccess",value:function(e){var t=this.props,r=t.style,i=t.tag,n=cn([s$7.image,"carousel__image",this.props.isBgImage&&"carousel__image--with-background","carousel__image--success",this.props.className]),s=_extends({},r),o=e;if("img"!==i){var a=e.src;e.alt;o=_objectWithoutProperties(e,_excluded$8),s=_extends({},r,{backgroundImage:'url("'.concat(a,'")'),backgroundSize:"cover"})}return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i,_extends({className:n,style:s},o),this.props.children)}},{key:"render",value:function(){var e=this.props,t=(e.carouselStore,e.children,e.className,e.hasMasterSpinner,e.isBgImage,e.onError,e.onLoad,e.renderError,e.renderLoading,e.style,e.tag,_objectWithoutProperties(e,_excluded2$1));switch(this.state.imageStatus){case LOADING:return this.renderLoading(t);case SUCCESS:return this.renderSuccess(t);case ERROR:return this.renderError(t);default:throw new Error("unknown value for this.state.imageStatus")}}}],[{key:"subscribeMasterSpinner",value:function(e){e.hasMasterSpinner&&e.carouselStore.subscribeMasterSpinner(e.src)}},{key:"unsubscribeMasterSpinner",value:function(e){e.hasMasterSpinner&&e.carouselStore.unsubscribeMasterSpinner(e.src)}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));_defineProperty(Image,"propTypes",{alt:propTypes.string,carouselStore:propTypes.object.isRequired,children:CarouselPropTypes.children,className:propTypes.string,hasMasterSpinner:propTypes.bool.isRequired,isBgImage:CarouselPropTypes.isBgImage,onError:propTypes.func,onLoad:propTypes.func,renderError:propTypes.func,renderLoading:propTypes.func,src:propTypes.string.isRequired,style:propTypes.object,tag:propTypes.string}),_defineProperty(Image,"defaultProps",{alt:"",children:null,className:null,isBgImage:!1,onError:null,onLoad:null,renderError:null,renderLoading:null,style:null,tag:"img"});var Image$1=WithStore(Image,function(e){return{hasMasterSpinner:e.hasMasterSpinner,orientation:e.orientation}}),s$8={spinner:"spinner___27VUp",spin:"spin___S3UuE"},_excluded$9=["className"],_class$7,Spinner=(_class$7=function(e){function t(){return _classCallCheck(this,t),r.apply(this,arguments)}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"render",value:function(){var e=this.props,t=e.className,r=_objectWithoutProperties(e,_excluded$9),i=cn([s$8.spinner,"carousel__spinner",t]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",_extends({className:i},r))}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent)),_defineProperty(_class$7,"propTypes",{className:propTypes.string}),_defineProperty(_class$7,"defaultProps",{className:null}),_class$7),s$9={container:"container___2O72F",overlay:"overlay___IV4qY",hover:"hover___MYy31",zoom:"zoom___3kqYk",loading:"loading___1pvNI",imageLoadingSpinnerContainer:"imageLoadingSpinnerContainer___3UIPD"},_excluded$a=["alt","bgImageProps","bgImageTag","carouselStore","className","imageClassName","overlayClassName","isPinchZoomEnabled","spinner","src","srcZoomed","tag"],_class$8,MOUSE_SCALE=2,MAX_TOUCH_SCALE=3,ImageWithZoom=(_class$8=function(e){function t(e){var i;return _classCallCheck(this,t),i=r.call(this,e),i.state={isImageLoading:!0,isImageLoadingError:!0,isHovering:!1,isZooming:!1,x:null,y:null,scale:1},i.tpCache={},i.handleImageComplete=i.handleImageComplete.bind(_assertThisInitialized(i)),i.handleImageLoadError=i.handleImageLoadError.bind(_assertThisInitialized(i)),i.handleOnMouseMove=i.handleOnMouseMove.bind(_assertThisInitialized(i)),i.handleOnMouseOut=i.handleOnMouseOut.bind(_assertThisInitialized(i)),i.handleOnMouseOver=i.handleOnMouseOver.bind(_assertThisInitialized(i)),i.handleOnTouchEnd=i.handleOnTouchEnd.bind(_assertThisInitialized(i)),i.handleOnTouchMove=i.handleOnTouchMove.bind(_assertThisInitialized(i)),i.handleOnTouchStart=i.handleOnTouchStart.bind(_assertThisInitialized(i)),i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"componentDidUpdate",value:function(e,t){!1===t.isZooming&&!0===this.state.isZooming&&this.props.carouselStore.setStoreState({isPageScrollLocked:!0}),!0===t.isZooming&&!1===this.state.isZooming&&this.props.carouselStore.setStoreState({isPageScrollLocked:!1})}},{key:"handleImageComplete",value:function(e){this.setState({isImageLoading:!1}),this.props&&this.props.onLoad&&this.props.onLoad(e)}},{key:"handleImageLoadError",value:function(e){this.setState({isImageLoadingError:!0,isImageLoading:!1}),this.props&&this.props.onError&&this.props.onError(e)}},{key:"handleOnMouseOver",value:function(){this.state.isZooming||this.setState({isHovering:!0,scale:MOUSE_SCALE})}},{key:"handleOnMouseOut",value:function(){this.state.isZooming||this.setState({isHovering:!1,scale:1})}},{key:"handleOnMouseMove",value:function(e){if(!this.state.isZooming){var t=pct(e.nativeEvent.offsetX/e.target.offsetWidth*100),r=pct(e.nativeEvent.offsetY/e.target.offsetHeight*100);this.setState({x:t,y:r})}}},{key:"handleOnTouchStart",value:function(e){var t=this;this.props.isPinchZoomEnabled&&(_toConsumableArray(e.targetTouches).forEach(function(e){t.tpCache[e.identifier]={clientX:e.clientX,clientY:e.clientY}}),this.setState(function(e){return{isZooming:e.isZooming||Object.keys(t.tpCache).length>1}}))}},{key:"handleOnTouchMove",value:function(e){var r=this;if(this.state.isZooming){e.persist();var i=_toConsumableArray(e.targetTouches).filter(function(e){return r.tpCache[e.identifier]}).slice(0,2);if(2===i.length){e.stopPropagation();var n=e.target.getBoundingClientRect(),s=i[0].identifier,o=i[1].identifier,a={x1:this.tpCache[s].clientX,y1:this.tpCache[s].clientY,x2:this.tpCache[o].clientX,y2:this.tpCache[o].clientY};a.distance=t.distanceBetweenTwoTouches(_objectSpread2({},a));var l=t.midpointBetweenTwoTouches(_objectSpread2({},a));a.cx=l.x,a.cy=l.y;var c={x1:i[0].clientX,y1:i[0].clientY,x2:i[1].clientX,y2:i[1].clientY};c.distance=t.distanceBetweenTwoTouches(_objectSpread2({},c));var u=t.midpointBetweenTwoTouches(_objectSpread2({},c));c.cx=u.x,c.cy=u.y;var p=pct(boundedRange({min:0,max:100,x:(c.cx-n.left)/n.width*100})),d=pct(boundedRange({min:0,max:100,x:(c.cy-n.top)/n.height*100})),h=function(e){return boundedRange({min:1,max:MAX_TOUCH_SCALE,x:e.scale+(c.distance-a.distance)/100})};this.setState(function(e){return{isZooming:1!==h(e),scale:h(e),x:p,y:d}})}}}},{key:"handleOnTouchEnd",value:function(e){var t=this;this.props.isPinchZoomEnabled&&(_toConsumableArray(e.changedTouches).forEach(function(e){delete t.tpCache[e.identifier]}),0===Object.keys(this.tpCache).length&&this.setState({isZooming:!1}))}},{key:"renderLoading",value:function(){if(this.state.isImageLoading){var e=this.props.spinner;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:cn([s$9.imageLoadingSpinnerContainer,"carousel__image-loading-spinner-container"])},e&&e(),!e&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Spinner,null))}return null}},{key:"render",value:function(){var e=this.props,t=e.alt,r=e.bgImageProps,i=e.bgImageTag,n=(e.carouselStore,e.className),s=e.imageClassName,o=e.overlayClassName,a=(e.isPinchZoomEnabled,e.spinner,e.src),l=e.srcZoomed,c=e.tag,u=_objectWithoutProperties(e,_excluded$a),p=cn([s$9.container,n]),d=cn([s$9.image,"carousel__zoom-image",s]),h=cn([s$9.overlay,"carousel__zoom-image-overlay",this.state.isHovering&&s$9.hover,this.state.isZooming&&s$9.zoom,this.state.isHovering&&"carousel__zoom-image-overlay--hovering",this.state.isZooming&&"carousel__zoom-image-overlay--zooming",o]),y={};return(this.state.isHovering||this.state.isZooming)&&(y.transformOrigin="".concat(this.state.x," ").concat(this.state.y),y.transform="scale(".concat(this.state.scale,")")),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(c,_extends({className:p},u),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Image$1,_extends({alt:t,className:d,tag:i,src:a,onLoad:this.handleImageComplete,onError:this.handleImageLoadError},r)),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Image$1,{className:h,tag:"div",src:l||a,style:y,isBgImage:!0,onFocus:this.handleOnMouseOver,onMouseOver:this.handleOnMouseOver,onBlur:this.handleOnMouseOut,onMouseOut:this.handleOnMouseOut,onMouseMove:this.handleOnMouseMove,onTouchStart:this.handleOnTouchStart,onTouchEnd:this.handleOnTouchEnd,onTouchMove:this.handleOnTouchMove}),this.renderLoading())}}],[{key:"midpointBetweenTwoTouches",value:function(e){var t=e.x1,r=e.y1;return{x:(t+e.x2)/2,y:(r+e.y2)/2}}},{key:"distanceBetweenTwoTouches",value:function(e){var t=e.x1,r=e.y1,i=e.x2,n=e.y2;return Math.sqrt(Math.pow(i-t,2)+Math.pow(n-r,2))}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),_defineProperty(_class$8,"propTypes",{alt:propTypes.string,bgImageProps:propTypes.object,bgImageTag:propTypes.string,carouselStore:propTypes.object.isRequired,className:propTypes.string,imageClassName:propTypes.string,overlayClassName:propTypes.string,spinner:propTypes.func,onLoad:propTypes.func,onError:propTypes.func,src:propTypes.string.isRequired,srcZoomed:propTypes.string,tag:propTypes.string,isPinchZoomEnabled:propTypes.bool}),_defineProperty(_class$8,"defaultProps",{alt:void 0,bgImageProps:{},bgImageTag:"div",className:null,imageClassName:null,overlayClassName:null,isPinchZoomEnabled:!0,spinner:null,onLoad:null,onError:null,srcZoomed:null,tag:"div"}),_class$8),index$6=WithStore(ImageWithZoom,function(){return{}}),s$a={slide:"slide___3-Nqo",slideHorizontal:"slideHorizontal___1NzNV",slideInner:"slideInner___2mfX9",focusRing:"focusRing___1airF"},_excluded$b=["ariaLabel","carouselStore","children","className","classNameHidden","classNameVisible","currentSlide","index","innerClassName","innerTag","naturalSlideHeight","naturalSlideWidth","onBlur","onFocus","orientation","slideSize","style","tag","totalSlides","visibleSlides","isIntrinsicHeight"],_class$9,Slide=(_class$9=function(e){function t(e){var i;return _classCallCheck(this,t),i=r.call(this,e),i.handleOnFocus=i.handleOnFocus.bind(_assertThisInitialized(i)),i.handleOnBlur=i.handleOnBlur.bind(_assertThisInitialized(i)),i.state={focused:!1},i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"isVisible",value:function(){var e=this.props,t=e.currentSlide,r=e.index,i=e.visibleSlides;return r>=t&&r<t+i}},{key:"handleOnFocus",value:function(e){var t=this,r=this.props.onFocus;this.setState({focused:!0},function(){null!==r&&r.call(t,e)})}},{key:"handleOnBlur",value:function(e){var t=this,r=this.props.onBlur;this.setState({focused:!1},function(){null!==r&&r.call(t,e)})}},{key:"renderFocusRing",value:function(){return this.state.focused?react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:[s$a.focusRing,"carousel__slide-focus-ring"].join(" ")}):null}},{key:"render",value:function(){var e=this,t=this.props,r=t.ariaLabel,i=(t.carouselStore,t.children,t.className),n=t.classNameHidden,s=t.classNameVisible,o=(t.currentSlide,t.index,t.innerClassName),a=t.innerTag,l=t.naturalSlideHeight,c=t.naturalSlideWidth,u=(t.onBlur,t.onFocus,t.orientation),p=t.slideSize,d=t.style,h=t.tag,y=t.totalSlides,S=(t.visibleSlides,t.isIntrinsicHeight),b=_objectWithoutProperties(t,_excluded$b),m={};"horizontal"===u?(m.width=pct(p),m.paddingBottom=pct(100*l/(c*y))):(m.width=pct(100),m.paddingBottom=pct(100*l/c));var f={};S&&("horizontal"===u?m.height="unset":m.width="unset",m.paddingBottom="unset",f.position="unset");var g=_extends({},m,d),v=this.isVisible(),_=cn([s$a.slide,"horizontal"===u&&s$a.slideHorizontal,"carousel__slide",this.state.focused&&"carousel__slide--focused",v&&s,v&&"carousel__slide--visible",!v&&n,!v&&"carousel__slide--hidden",i]),T=cn([s$a.slideInner,"carousel__inner-slide",o]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(h,_extends({ref:function(t){e.tagRef=t},"aria-selected":this.isVisible(),"aria-label":r,role:this.props.role,onFocus:this.handleOnFocus,onBlur:this.handleOnBlur,className:_,style:g},b),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(a,{ref:function(t){e.innerTagRef=t},className:T,style:f},this.props.children,this.renderFocusRing()))}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent)),_defineProperty(_class$9,"propTypes",{ariaLabel:propTypes.string,carouselStore:propTypes.object,children:CarouselPropTypes.children,className:propTypes.string,classNameHidden:propTypes.string,classNameVisible:propTypes.string,currentSlide:propTypes.number.isRequired,index:propTypes.number.isRequired,innerClassName:propTypes.string,innerTag:propTypes.string,naturalSlideHeight:propTypes.number.isRequired,naturalSlideWidth:propTypes.number.isRequired,onBlur:propTypes.func,onFocus:propTypes.func,orientation:CarouselPropTypes.orientation.isRequired,slideSize:propTypes.number.isRequired,role:propTypes.string,style:propTypes.object,tag:propTypes.string,totalSlides:propTypes.number.isRequired,visibleSlides:propTypes.number.isRequired,isIntrinsicHeight:propTypes.bool}),_defineProperty(_class$9,"defaultProps",{ariaLabel:"slide",carouselStore:null,children:null,className:null,classNameHidden:null,classNameVisible:null,innerClassName:null,innerTag:"div",onBlur:null,onFocus:null,role:"option",style:{},tag:"div",isIntrinsicHeight:!1}),_class$9),index$7=WithStore(Slide,function(e){return{currentSlide:e.currentSlide,naturalSlideHeight:e.naturalSlideHeight,naturalSlideWidth:e.naturalSlideWidth,orientation:e.orientation,slideSize:e.slideSize,totalSlides:e.totalSlides,visibleSlides:e.visibleSlides,isIntrinsicHeight:e.isIntrinsicHeight}}),GetScrollParent=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"parents",value:function(e,t){return null===e.parentNode?t:this.parents(e.parentNode,t.concat([e]))}},{key:"scrollParent",value:function(t){for(var r=this.parents(t.parentNode,[]),i=0;i<r.length;i+=1)if(e.scroll(r[i]))return r[i];return document.scrollingElement||document.documentElement}},{key:"getScrollParent",value:function(t){return e.isNodeValid(t)?this.scrollParent(t):null}}],[{key:"style",value:function(e,t){return getComputedStyle(e,null).getPropertyValue(t)}},{key:"overflow",value:function(t){return e.style(t,"overflow")+e.style(t,"overflow-y")+e.style(t,"overflow-x")}},{key:"scroll",value:function(t){return/(auto|scroll)/.test(e.overflow(t))}},{key:"isNodeValid",value:function(e){return e instanceof HTMLElement||e instanceof SVGElement}}]),e}(),s$b={horizontalSlider:"horizontalSlider___281Ls",touchDisabled:"touchDisabled___2qs4y",horizontalSliderTray:"horizontalSliderTray___1L-0W",verticalSlider:"verticalSlider___34ZFD",verticalSliderTray:"verticalSliderTray___267D8",verticalTray:"verticalTray___12Key",verticalSlideTrayWrap:"verticalSlideTrayWrap___2nO7o",sliderTray:"sliderTray___-vHFQ",sliderAnimation:"sliderAnimation___300FY",masterSpinnerContainer:"masterSpinnerContainer___1Z6hB"},_excluded$c=["ariaLabel","carouselStore","children","className","classNameAnimation","classNameTray","classNameTrayWrap","currentSlide","disableAnimation","disableKeyboard","dragEnabled","hasMasterSpinner","interval","isPageScrollLocked","isPlaying","lockOnWindowScroll","masterSpinnerFinished","moveThreshold","naturalSlideHeight","naturalSlideWidth","onMasterSpinner","orientation","playDirection","privateUnDisableAnimation","slideSize","slideTraySize","spinner","style","totalSlides","touchEnabled","trayProps","trayTag","visibleSlides","isIntrinsicHeight"],_excluded2$2=["dragStep","step","infinite","preventVerticalScrollOnTouch","preventingVerticalScroll","horizontalPixelThreshold","verticalPixelThreshold"],_excluded3=["className","onClickCapture","onMouseDown","onTouchCancel","onTouchEnd","onTouchMove","onTouchStart","ref","style"],_class$a,Slider=(_class$a=function(e){function t(e){var i;return _classCallCheck(this,t),i=r.call(this,e),i.getSliderRef=i.getSliderRef.bind(_assertThisInitialized(i)),i.handleDocumentScroll=i.handleDocumentScroll.bind(_assertThisInitialized(i)),i.handleOnClickCapture=i.handleOnClickCapture.bind(_assertThisInitialized(i)),i.handleOnKeyDown=i.handleOnKeyDown.bind(_assertThisInitialized(i)),i.handleOnMouseDown=i.handleOnMouseDown.bind(_assertThisInitialized(i)),i.handleOnMouseMove=i.handleOnMouseMove.bind(_assertThisInitialized(i)),i.handleOnMouseUp=i.handleOnMouseUp.bind(_assertThisInitialized(i)),i.handleOnTouchCancel=i.handleOnTouchCancel.bind(_assertThisInitialized(i)),i.handleOnTouchEnd=i.handleOnTouchEnd.bind(_assertThisInitialized(i)),i.handleOnTouchMove=i.handleOnTouchMove.bind(_assertThisInitialized(i)),i.handleOnTouchStart=i.handleOnTouchStart.bind(_assertThisInitialized(i)),i.playBackward=i.playBackward.bind(_assertThisInitialized(i)),i.playForward=i.playForward.bind(_assertThisInitialized(i)),i.callCallback=i.callCallback.bind(_assertThisInitialized(i)),i.blockWindowScroll=i.blockWindowScroll.bind(_assertThisInitialized(i)),i.state={cancelNextClick:!1,deltaX:0,deltaY:0,isBeingMouseDragged:!1,isBeingTouchDragged:!1,preventingVerticalScroll:!1,startX:0,startY:0},i.interval=null,i.isDocumentScrolling=null,i.moveTimer=null,i.originalOverflow=null,i.scrollParent=null,i.scrollStopTimer=null,i}_inherits(t,e);var r=_createSuper(t);return _createClass(t,[{key:"componentDidMount",value:function(){this.props.lockOnWindowScroll&&window.addEventListener("scroll",this.handleDocumentScroll,!1),(this.props.touchEnabled||this.props.preventVerticalScrollOnTouch)&&window.addEventListener("touchmove",this.blockWindowScroll,!1),document.documentElement.addEventListener("mouseleave",this.handleOnMouseUp,!1),document.documentElement.addEventListener("mousemove",this.handleOnMouseMove,!1),document.documentElement.addEventListener("mouseup",this.handleOnMouseUp,!1),this.props.isPlaying&&this.play()}},{key:"componentDidUpdate",value:function(e){!e.isPlaying&&this.props.isPlaying&&this.play(),e.isPlaying&&!this.props.isPlaying&&this.stop(),!e.isPageScrollLocked&&this.props.isPageScrollLocked&&this.lockScroll(),e.isPageScrollLocked&&!this.props.isPageScrollLocked&&this.unlockScroll(),!1===e.privateUnDisableAnimation&&!0===this.props.privateUnDisableAnimation&&this.props.carouselStore.setStoreState({privateUnDisableAnimation:!1,disableAnimation:!1})}},{key:"componentWillUnmount",value:function(){document.documentElement.removeEventListener("mouseleave",this.handleOnMouseUp,!1),document.documentElement.removeEventListener("mousemove",this.handleOnMouseMove,!1),document.documentElement.removeEventListener("mouseup",this.handleOnMouseUp,!1),window.removeEventListener("scroll",this.handleDocumentScroll,!1),window.removeEventListener("touchmove",this.blockWindowScroll,!1),this.stop(),window.cancelAnimationFrame.call(window,this.moveTimer),window.clearTimeout(this.scrollStopTimer),this.isDocumentScrolling=null,this.moveTimer=null,this.scrollStopTimer=null}},{key:"getSliderRef",value:function(e){if(this.sliderTrayElement=e,e&&window){var t=e.closest(".carousel");t&&(this.rtl="rtl"===window.getComputedStyle(t,null).getPropertyValue("direction"))}}},{key:"fakeOnDragStart",value:function(e){var t=e.screenX,r=e.screenY,i=e.touchDrag,n=void 0!==i&&i,s=e.mouseDrag,o=void 0!==s&&s;this.props.carouselStore.setStoreState({isPlaying:!1}),window.cancelAnimationFrame.call(window,this.moveTimer),"vertical"===this.props.orientation&&this.props.carouselStore.setStoreState({isPageScrollLocked:!0}),this.setState({isBeingTouchDragged:n,isBeingMouseDragged:o,startX:t,startY:r})}},{key:"fakeOnDragMove",value:function(e,t){var r=this;window.cancelAnimationFrame.call(window,this.moveTimer),this.moveTimer=window.requestAnimationFrame.call(window,function(){r.setState(function(i){return{deltaX:(e-i.startX)*(r.rtl?-1:1),deltaY:t-i.startY,preventingVerticalScroll:Math.abs(t-i.startY)<=r.props.verticalPixelThreshold&&Math.abs(e-i.startX)>=r.props.horizontalPixelThreshold}})})}},{key:"fakeOnDragEnd",value:function(){window.cancelAnimationFrame.call(window,this.moveTimer),this.computeCurrentSlide(),"vertical"===this.props.orientation&&this.props.carouselStore.setStoreState({isPageScrollLocked:!1}),this.setState({deltaX:0,deltaY:0,isBeingTouchDragged:!1,isBeingMouseDragged:!1}),this.isDocumentScrolling=!this.props.lockOnWindowScroll&&null}},{key:"callCallback",value:function(e,t){var r=this.props.trayProps;r&&"function"==typeof r[e]&&(t.persist(),r[e](t))}},{key:"handleOnMouseDown",value:function(e){if(!this.props.dragEnabled)return void this.callCallback("onMouseDown",e);e.preventDefault(),this.fakeOnDragStart({screenX:e.screenX,screenY:e.screenY,mouseDrag:!0}),this.callCallback("onMouseDown",e)}},{key:"handleOnMouseMove",value:function(e){this.state.isBeingMouseDragged&&(this.setState({cancelNextClick:!0}),e.preventDefault(),this.fakeOnDragMove(e.screenX,e.screenY))}},{key:"handleOnMouseUp",value:function(e){this.state.isBeingMouseDragged&&(e.preventDefault(),this.fakeOnDragEnd())}},{key:"handleOnClickCapture",value:function(e){if(!this.state.cancelNextClick)return void this.callCallback("onClickCapture",e);e.preventDefault(),this.setState({cancelNextClick:!1}),this.callCallback("onClickCapture",e)}},{key:"handleOnTouchStart",value:function(e){if(!this.props.touchEnabled)return void this.callCallback("onTouchStart",e);"vertical"===this.props.orientation&&e.preventDefault();var t=e.targetTouches[0];this.fakeOnDragStart({screenX:t.screenX,screenY:t.screenY,touchDrag:!0}),this.callCallback("onTouchStart",e)}},{key:"handleDocumentScroll",value:function(){var e=this;this.props.touchEnabled&&(this.isDocumentScrolling=!0,window.clearTimeout(this.scrollStopTimer),this.scrollStopTimer=window.setTimeout(function(){e.isDocumentScrolling=!1},66))}},{key:"handleOnTouchMove",value:function(e){if(!this.props.touchEnabled||this.props.lockOnWindowScroll&&this.isDocumentScrolling)return void this.callCallback("onTouchMove",e);var t=e.targetTouches[0];t&&(this.fakeOnDragMove(t.screenX,t.screenY),this.callCallback("onTouchMove",e))}},{key:"forward",value:function(){var e=this.props,t=e.currentSlide,r=e.step,i=e.totalSlides,n=e.visibleSlides;return Math.min(t+r,i-n)}},{key:"backward",value:function(){var e=this.props,t=e.currentSlide,r=e.step;return Math.max(t-r,0)}},{key:"handleOnKeyDown",value:function(e){var t=e.keyCode,r=this.props,i=r.carouselStore,n=r.currentSlide,s=r.disableKeyboard,o=r.totalSlides,a=r.visibleSlides,l={};!0===s||o<=a||(37===t&&(e.preventDefault(),this.focus(),l.currentSlide=Math.max(0,n-1),l.isPlaying=!1),39===t&&(e.preventDefault(),this.focus(),l.currentSlide=Math.min(o-a,n+1),l.isPlaying=!1),i.setStoreState(l))}},{key:"playForward",value:function(){var e=this.props,t=e.carouselStore,r=e.currentSlide;t.setStoreState({currentSlide:this.forward()===r?0:this.forward()})}},{key:"playBackward",value:function(){var e=this.props,t=e.carouselStore,r=e.currentSlide,i=e.totalSlides,n=e.visibleSlides;t.setStoreState({currentSlide:this.backward()===r?i-n:this.backward()})}},{key:"play",value:function(){var e=this.props.playDirection;this.interval=setInterval("forward"===e?this.playForward:this.playBackward,this.props.interval)}},{key:"stop",value:function(){window.clearInterval(this.interval),this.interval=null}},{key:"lockScroll",value:function(){var e=new GetScrollParent;this.scrollParent=e.getScrollParent(this.sliderTrayElement),this.scrollParent&&(this.originalOverflow=this.originalOverflow||this.scrollParent.style.overflow,this.scrollParent.style.overflow="hidden")}},{key:"unlockScroll",value:function(){this.scrollParent&&(this.scrollParent.style.overflow=this.originalOverflow,this.originalOverflow=null,this.scrollParent=null)}},{key:"blockWindowScroll",value:function(e){this.state.preventingVerticalScroll&&(e.preventDefault(),e.stopImmediatePropagation())}},{key:"computeCurrentSlide",value:function(){var e=t.slideSizeInPx(this.props.orientation,this.sliderTrayElement.clientWidth,this.sliderTrayElement.clientHeight,this.props.totalSlides),r=t.slidesMoved(this.props.moveThreshold,this.props.orientation,this.state.deltaX,this.state.deltaY,e,this.props.dragStep),i=this.props.totalSlides-Math.min(this.props.totalSlides,this.props.visibleSlides),n=boundedRange({min:0,max:i,x:this.props.currentSlide+r});this.props.infinite&&(this.props.currentSlide>=i&&r>0&&(n=0),0===this.props.currentSlide&&r<0&&(n=i)),this.props.carouselStore.setStoreState({currentSlide:n})}},{key:"focus",value:function(){this.sliderElement.focus()}},{key:"handleOnTouchEnd",value:function(e){this.endTouchMove(),this.callCallback("onTouchEnd",e)}},{key:"handleOnTouchCancel",value:function(e){this.endTouchMove(),this.callCallback("onTouchCancel",e)}},{key:"endTouchMove",value:function(){this.props.touchEnabled&&this.fakeOnDragEnd()}},{key:"renderMasterSpinner",value:function(){var e=this.props,t=e.hasMasterSpinner,r=e.masterSpinnerFinished,i=e.spinner;return t&&!r?("function"==typeof this.props.onMasterSpinner&&this.props.onMasterSpinner(),react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:cn([s$b.masterSpinnerContainer,"carousel__master-spinner-container"])},i&&i(),!i&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Spinner,null))):null}},{key:"render",value:function(){var e=this,t=this.props,r=t.ariaLabel,i=(t.carouselStore,t.children),n=t.className,s=t.classNameAnimation,o=t.classNameTray,a=t.classNameTrayWrap,l=t.currentSlide,c=t.disableAnimation,u=(t.disableKeyboard,t.dragEnabled,t.hasMasterSpinner,t.interval,t.isPageScrollLocked,t.isPlaying,t.lockOnWindowScroll,t.masterSpinnerFinished,t.moveThreshold,t.naturalSlideHeight),p=t.naturalSlideWidth,d=(t.onMasterSpinner,t.orientation),h=(t.playDirection,t.privateUnDisableAnimation,t.slideSize),y=t.slideTraySize,S=(t.spinner,t.style),b=(t.totalSlides,t.touchEnabled),m=t.trayProps,f=t.trayTag,g=t.visibleSlides,v=t.isIntrinsicHeight,_=_objectWithoutProperties(t,_excluded$c),T=_extends({},S),k={};"vertical"===d&&(k.height=0,k.paddingBottom=pct(100*u*g/p),k.width=pct(100));var C={},O=pct(h*l*-1);(this.state.isBeingTouchDragged||this.state.isBeingMouseDragged||c)&&(C.transition="none"),v&&(C.display="flex",C.alignItems="stretch"),"vertical"===d?(C.transform="translateY(".concat(O,") translateY(").concat(this.state.deltaY,"px)"),C.width=pct(100),C.flexDirection="column"):(C.width=pct(y),C.transform="translateX(".concat(O,") translateX(").concat(this.state.deltaX,"px)"),C.flexDirection="row");var P=cn(["vertical"===d?s$b.verticalSlider:s$b.horizontalSlider,!b&&s$b.touchDisabled,"carousel__slider","vertical"===d?"carousel__slider--vertical":"carousel__slider--horizontal",n]),E=cn([s$b.sliderTrayWrap,"carousel__slider-tray-wrapper","vertical"===d?s$b.verticalSlideTrayWrap:s$b.horizontalTrayWrap,"vertical"===d?"carousel__slider-tray-wrap--vertical":"carousel__slider-tray-wrap--horizontal",a]),w=cn([s$b.sliderTray,s||s$b.sliderAnimation,"carousel__slider-tray","vertical"===d?s$b.verticalTray:s$b.horizontalTray,"vertical"===d?"carousel__slider-tray--vertical":"carousel__slider-tray--horizontal",o]),M=(_.dragStep,_.step,_.infinite,_.preventVerticalScrollOnTouch,_.preventingVerticalScroll,_.horizontalPixelThreshold,_.verticalPixelThreshold,_objectWithoutProperties(_,_excluded2$2)),x=(m.className,m.onClickCapture,m.onMouseDown,m.onTouchCancel,m.onTouchEnd,m.onTouchMove,m.onTouchStart,m.ref,m.style,_objectWithoutProperties(m,_excluded3));return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",_extends({ref:function(t){e.sliderElement=t},className:P,"aria-live":"polite","aria-label":r,role:this.props.role,style:T,onKeyDown:this.handleOnKeyDown},M),react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:E,style:k},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(f,_extends({ref:this.getSliderRef,className:w,style:C,onTouchStart:this.handleOnTouchStart,onTouchMove:this.handleOnTouchMove,onTouchEnd:this.handleOnTouchEnd,onTouchCancel:this.handleOnTouchCancel,onMouseDown:this.handleOnMouseDown,onClickCapture:this.handleOnClickCapture},x),i),this.renderMasterSpinner()))}}],[{key:"slideSizeInPx",value:function(e,t,r,i){return("horizontal"===e?t:r)/i}},{key:"slidesMoved",value:function(e,t,r,i,n,s){var o="horizontal"===t?r:i,a=Math.abs(Math.round(o/n)),l=Math.abs(o)>=n*e?s:0,c=Math.max(l,a);if(o<0)return c;var u=-c;return 0===u?0:u}}]),t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),_defineProperty(_class$a,"propTypes",{ariaLabel:propTypes.string,carouselStore:propTypes.object.isRequired,children:propTypes.node.isRequired,className:propTypes.string,classNameAnimation:propTypes.string,classNameTray:propTypes.string,classNameTrayWrap:propTypes.string,currentSlide:propTypes.number.isRequired,disableAnimation:propTypes.bool,disableKeyboard:propTypes.bool,dragEnabled:propTypes.bool.isRequired,dragStep:propTypes.number,hasMasterSpinner:propTypes.bool.isRequired,infinite:propTypes.bool,interval:propTypes.number.isRequired,isPageScrollLocked:propTypes.bool.isRequired,isPlaying:propTypes.bool.isRequired,lockOnWindowScroll:propTypes.bool.isRequired,preventVerticalScrollOnTouch:propTypes.bool,horizontalPixelThreshold:propTypes.number,verticalPixelThreshold:propTypes.number,masterSpinnerFinished:propTypes.bool.isRequired,moveThreshold:propTypes.number,naturalSlideHeight:propTypes.number.isRequired,naturalSlideWidth:propTypes.number.isRequired,onMasterSpinner:propTypes.func,orientation:CarouselPropTypes.orientation.isRequired,playDirection:CarouselPropTypes.direction.isRequired,privateUnDisableAnimation:propTypes.bool,role:propTypes.string,slideSize:propTypes.number.isRequired,slideTraySize:propTypes.number.isRequired,spinner:propTypes.func,step:propTypes.number.isRequired,style:propTypes.object,totalSlides:propTypes.number.isRequired,touchEnabled:propTypes.bool.isRequired,trayProps:propTypes.shape({className:propTypes.string,onClickCapture:propTypes.func,onMouseDown:propTypes.func,onTouchCancel:propTypes.func,onTouchEnd:propTypes.func,onTouchMove:propTypes.func,onTouchStart:propTypes.func,ref:propTypes.shape({}),style:propTypes.string}),trayTag:propTypes.string,visibleSlides:propTypes.number,isIntrinsicHeight:propTypes.bool}),_defineProperty(_class$a,"defaultProps",{ariaLabel:"slider",className:null,classNameAnimation:null,classNameTray:null,classNameTrayWrap:null,disableAnimation:!1,disableKeyboard:!1,dragStep:1,infinite:!1,preventVerticalScrollOnTouch:!0,horizontalPixelThreshold:15,verticalPixelThreshold:10,moveThreshold:.1,onMasterSpinner:null,privateUnDisableAnimation:!1,role:"listbox",spinner:null,style:{},trayProps:{},trayTag:"div",visibleSlides:1,isIntrinsicHeight:!1}),_class$a),index$8=WithStore(Slider,function(e){return{currentSlide:e.currentSlide,disableAnimation:e.disableAnimation,privateUnDisableAnimation:e.privateUnDisableAnimation,disableKeyboard:e.disableKeyboard,dragEnabled:e.dragEnabled,hasMasterSpinner:e.hasMasterSpinner,infinite:e.infinite,interval:e.interval,isPageScrollLocked:e.isPageScrollLocked,isPlaying:e.isPlaying,lockOnWindowScroll:e.lockOnWindowScroll,preventingVerticalScroll:e.preventingVerticalScroll,masterSpinnerFinished:e.masterSpinnerFinished,naturalSlideHeight:e.naturalSlideHeight,naturalSlideWidth:e.naturalSlideWidth,orientation:e.orientation,playDirection:e.playDirection,slideSize:e.slideSize,slideTraySize:e.slideTraySize,step:e.step,dragStep:e.dragStep,totalSlides:e.totalSlides,touchEnabled:e.touchEnabled,visibleSlides:e.visibleSlides,isIntrinsicHeight:e.isIntrinsicHeight}});
//# sourceMappingURL=index.es.js.map


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

"use strict";
module.exports = window["React"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "lodash"
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
(module) {

"use strict";
module.exports = window["lodash"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/compose"
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
(module) {

"use strict";
module.exports = window["wp"]["compose"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/editor"
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
(module) {

"use strict";
module.exports = window["wp"]["editor"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/hooks"
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
(module) {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/plugins"
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
(module) {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ },

/***/ "./node_modules/classnames/index.js"
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else // removed by dead control flow
{}
}());


/***/ },

/***/ "./src/blocks/components/theme-access.mjs"
/*!************************************************!*\
  !*** ./src/blocks/components/theme-access.mjs ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canSelectTheme: () => (/* binding */ canSelectTheme),
/* harmony export */   findThemeOption: () => (/* binding */ findThemeOption)
/* harmony export */ });
/**
 * Licence gating for the Popular Posts theme picker.
 *
 * Kept free of React and of the build-time
 * `PopularPostsLicenseCheck-GUTENBERG_APP_VERSION` alias so it can be unit
 * tested directly: the licence check is injected rather than imported.
 *
 * This is the decision the *selection handler* must consult. Relying on the
 * `pointer-events: none` rule alone means the lock disappears whenever the
 * stylesheet fails to load.
 */

/**
 * Find a theme option by its stored value.
 *
 * @param {string}       value   Theme value, e.g. 'delta'.
 * @param {Array|Object} options Theme options from the picker.
 * @return {Object|undefined} The matching option, or undefined.
 */
function findThemeOption(value, options = []) {
  for (const key in options) {
    if (!Object.prototype.hasOwnProperty.call(options, key)) {
      continue;
    }
    if (options[key] && options[key].value === value) {
      return options[key];
    }
  }
  return undefined;
}

/**
 * Whether the current licence may select the given theme.
 *
 * @param {string}       value     Theme value being selected.
 * @param {Array|Object} options   Theme options from the picker.
 * @param {Function}     canaccess Licence predicate, receives the option's level.
 * @return {boolean} True when selection is permitted.
 */
function canSelectTheme(value, options, canaccess) {
  const option = findThemeOption(value, options);
  if (!option) {
    return false;
  }

  // Options that predate licence levels carry no `level` and stay unrestricted.
  if (!option.level) {
    return true;
  }
  return Boolean(canaccess(option.level));
}

/***/ },

/***/ "./src/blocks/popular-posts-inline/block.json"
/*!****************************************************!*\
  !*** ./src/blocks/popular-posts-inline/block.json ***!
  \****************************************************/
(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"monsterinsights/popular-posts-inline","title":"Inline Popular Posts","category":"widgets","description":"Add inline popular posts.","keywords":["popular","posts","inline"],"textdomain":"default","attributes":{"preview":{"type":"boolean","default":false},"theme":{"type":"string"},"title_size":{"type":"number"},"title_color":{"type":"string"},"label_color":{"type":"string"},"label_text":{"type":"string"},"label_background":{"type":"string"},"background_color":{"type":"string"},"background_border":{"type":"string"},"icon_background":{"type":"string"},"icon_color":{"type":"string"},"border_color":{"type":"string"},"border_color2":{"type":"string"},"slug":{"type":"string"},"followrules":{"type":"boolean"}},"editorStyle":"monsterinsights-gutenberg-editor-css"}');

/***/ },

/***/ "./src/blocks/popular-posts-widget/block.json"
/*!****************************************************!*\
  !*** ./src/blocks/popular-posts-widget/block.json ***!
  \****************************************************/
(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"monsterinsights/popular-posts-widget","title":"Popular Posts","category":"widgets","description":"Add popular posts.","keywords":["popular","posts","widget"],"textdomain":"default","attributes":{"preview":{"type":"boolean","default":false},"theme":{"type":"string"},"title_size":{"type":"number"},"title_color":{"type":"string"},"label_color":{"type":"string"},"label_text":{"type":"string"},"label_background":{"type":"string"},"background_color":{"type":"string"},"background_border":{"type":"string"},"meta_color":{"type":"string"},"meta_size":{"type":"string"},"meta_author":{"type":"boolean"},"meta_date":{"type":"boolean"},"meta_comments":{"type":"boolean"},"comments_color":{"type":"string"},"columns":{"type":"number","default":1},"widget_title":{"type":"boolean"},"widget_title_text":{"type":"string"},"post_count":{"type":"number","default":5},"categories":{"type":"array","default":[]},"slug":{"type":"string"},"followrules":{"type":"boolean"}},"editorStyle":"monsterinsights-gutenberg-editor-css"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_scss_GUTENBERG_APP_THEME_editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/scss/GUTENBERG_APP_THEME/editor.scss */ "./src/assets/scss/monsterinsights/editor.scss");
/* harmony import */ var _assets_scss_GUTENBERG_APP_THEME_frontend_GUTENBERG_APP_VERSION_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/scss/GUTENBERG_APP_THEME/frontend-GUTENBERG_APP_VERSION.scss */ "./src/assets/scss/monsterinsights/frontend-Lite.scss");
/* harmony import */ var _plugins___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/ */ "./src/plugins/index.js");
/* harmony import */ var _blocks_index_GUTENBERG_APP_VERSION__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/index-GUTENBERG_APP_VERSION */ "./src/blocks/index-Lite.js");
/**
 * Import styles & files
 */

if ('undefined' !== typeof window.monsterinsights_gutenberg_tool_vars.translations) {
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.setLocaleData)(window.monsterinsights_gutenberg_tool_vars.translations, "google-analytics-for-wordpress");
}
 // eslint-disable-line import/no-unresolved
 // eslint-disable-line import/no-unresolved

// import plugins

 // eslint-disable-line import/no-unresolved
})();

/******/ })()
;
//# sourceMappingURL=index.js.map