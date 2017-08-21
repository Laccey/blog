/**
 * Created by Wayne on 2017/7/11.
 */
(function () {
    var s = document.createElement("script");
    s.onload = function () {
        bootlint.showLintReportForCurrentDocument([]);
    };
    s.src = "https://maxcdn.bootstrapcdn.com/bootlint/latest/bootlint.min.js";
    document.body.appendChild(s)
})();