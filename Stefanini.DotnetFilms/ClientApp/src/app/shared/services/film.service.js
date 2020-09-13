"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_constants_1 = require("../common/global.constants");
var FilmService = /** @class */ (function () {
    function FilmService(http) {
        this.http = http;
        this._rootUrl = global_constants_1.GlobalConstants.baseApiUrl + '/films';
    }
    FilmService.prototype.getFilms = function () {
        return this.http.get(this._rootUrl);
    };
    return FilmService;
}());
exports.FilmService = FilmService;
//# sourceMappingURL=film.service.js.map