"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.omopCsvToValueSets = exports.validateOmopConceptSetCsv = void 0;
var papaparse_1 = require("papaparse");
var __1 = require("../");
var OMOP_CONCEPT_SET_COLUMNS = [
    "Concept Set ID",
    "Name",
    "Concept ID",
    "Concept Code",
    "Concept Name",
    "Domain",
    "Vocabulary",
    "Standard Concept",
    "Concept Class ID",
    "Exclude",
    "Descendants",
    "Mapped",
];
var REQUIRED_OMOP_CONCEPT_SET_COLUMNS = [
    "Concept Set ID",
    "Name",
    "Concept Code",
    "Concept Name",
    "Vocabulary",
];
var validateOmopConceptSetCsv = function (_a) {
    var csv = _a.csv;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var complete = function (result, file) {
                        if (result.errors.length > 0) {
                            reject(result.errors);
                        }
                        else {
                            var headers_1 = result.data[0];
                            // check for required headers
                            REQUIRED_OMOP_CONCEPT_SET_COLUMNS.forEach(function (header) {
                                if (!headers_1.includes(header)) {
                                    reject("\"" + header + "\" header missing");
                                }
                            });
                            resolve(result.data);
                        }
                    };
                    papaparse_1.default.parse(csv, { complete: complete, skipEmptyLines: "greedy" });
                })];
        });
    });
};
exports.validateOmopConceptSetCsv = validateOmopConceptSetCsv;
var getOmopValueSetId = function (valueSetId) {
    return "omop-concept-set-" + valueSetId;
};
var omopCsvToValueSets = function (_a) {
    var csv = _a.csv;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, validateOmopConceptSetCsv({ csv: csv }).then(function (data) {
                    var conceptIdIdx = data[0].indexOf("Concept Set ID");
                    var codeSystems = {};
                    // partition data in CSV by concept set id
                    for (var i = 1; i < data.length; i++) {
                        if (!codeSystems[getOmopValueSetId(data[i][conceptIdIdx])]) {
                            codeSystems[getOmopValueSetId(data[i][conceptIdIdx])] = [data[0]];
                        }
                        codeSystems[getOmopValueSetId(data[i][conceptIdIdx])].push(data[i]);
                    }
                    var valueSets = [];
                    Object.keys(codeSystems).forEach(function (conceptSetId) {
                        valueSets.push(__1.TransformUtils.omopConceptSetToFhirValueSet({
                            conceptSetId: conceptSetId,
                            conceptSet: codeSystems[conceptSetId],
                        }));
                    });
                    return valueSets;
                })];
        });
    });
};
exports.omopCsvToValueSets = omopCsvToValueSets;
