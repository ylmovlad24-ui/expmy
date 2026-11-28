/**
 * Unified dynamic path resolver for all subpages.
 * Works on localhost and GitHub Pages.
 * Dynamically calculates depth — works for ANY nesting level.
 */
(function () {
  "use strict";

  function getBasePathForAssets() {
    var path = window.location.pathname;

    // Root pages
    if (path === "/" || path === "/index.html") return "";

    // Count path segments after the leading slash
    var segments = path.split("/").filter(function (s) { return s.length > 0; });
    var depth = segments.length;

    var result = "";
    for (var i = 0; i < depth; i++) {
      result += "../";
    }
    return result;
  }

  function getBasePathForComponents() {
    return getBasePathForAssets();
  }

  // Export
  if (typeof window.PathUtils === "undefined") {
    window.PathUtils = {
      getBasePath: getBasePathForAssets,
      getComponentsBasePath: getBasePathForComponents
    };
  }
})();
