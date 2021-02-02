"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omopVocabularies = exports.omopConceptSetToFhirValueSet = void 0;
var ts_fhir_types_1 = require("@ahryman40k/ts-fhir-types");
var slugify_1 = require("slugify");
var omopVocabularies_1 = require("./omopVocabularies");
Object.defineProperty(exports, "omopVocabularies", { enumerable: true, get: function () { return omopVocabularies_1.omopVocabularies; } });
var PHEMA_WORKBENCH_VALUESET_PREFIX = "https://workbench.phema.science/fhir/ValueSet";
var PHEMA_WORKBENCH_CODESYSTEM_PREFIX = "https://workbench.phema.science/fhir/CodeSystem";
var getCodeSystemUrl = function (vocabularyName) {
    var vocabulary = omopVocabularies_1.omopVocabularies.find(function (vocab) {
        return vocab.omopVocabularyId == vocabularyName;
    });
    if (!vocabulary) {
        return PHEMA_WORKBENCH_CODESYSTEM_PREFIX + "/omop-unknown-vocabulary";
    }
    else if (vocabulary.fhirCanonicalUrl) {
        return vocabulary.fhirCanonicalUrl;
    }
    else {
        return PHEMA_WORKBENCH_CODESYSTEM_PREFIX + "/" + slugify_1.default(vocabulary.omopVocabularyId);
    }
};
var omopConceptSetToFhirValueSet = function (_a) {
    var conceptSetId = _a.conceptSetId, conceptSet = _a.conceptSet;
    var valueSet = {
        resourceType: "ValueSet",
    };
    var nameIdx = conceptSet[0].indexOf("Name");
    var conceptCodeIdx = conceptSet[0].indexOf("Concept Code");
    var conceptNameIdx = conceptSet[0].indexOf("Concept Name");
    var vocabularyIdx = conceptSet[0].indexOf("Vocabulary");
    // if we are dealing with the conceptSetExpression CSV file, we need to
    // add explicit excludes
    var excludeIdx = conceptSet[0].indexOf("Exclude");
    valueSet.id = conceptSetId; // this will like get ignored
    valueSet.url = PHEMA_WORKBENCH_VALUESET_PREFIX + "/" + conceptSetId;
    valueSet.status = ts_fhir_types_1.R4.ValueSetStatusKind._active;
    valueSet.name = conceptSet[1][nameIdx];
    valueSet.publisher = "PhEMA Workbench OMOP Concept Set Transformer";
    var codeLists = {};
    var excludedLists = {};
    for (var i = 1; i < conceptSet.length; i++) {
        var conceptSetEntry = conceptSet[i];
        var codeableConcept = {
            code: conceptSetEntry[conceptCodeIdx],
            display: conceptSetEntry[conceptNameIdx],
        };
        var codeSystemUrl = getCodeSystemUrl(conceptSetEntry[vocabularyIdx]);
        if (excludeIdx != -1 && conceptSetEntry[excludeIdx] === "true") {
            // exclude concept
            if (!excludedLists[codeSystemUrl]) {
                excludedLists[codeSystemUrl] = [codeableConcept];
            }
            else {
                excludedLists[codeSystemUrl].push(codeableConcept);
            }
        }
        else {
            // include concept
            if (!codeLists[codeSystemUrl]) {
                codeLists[codeSystemUrl] = [codeableConcept];
            }
            else {
                codeLists[codeSystemUrl].push(codeableConcept);
            }
        }
    }
    valueSet.compose = { include: [] };
    Object.keys(codeLists).forEach(function (system) {
        valueSet.compose.include.push({
            system: system,
            concept: codeLists[system],
        });
    });
    if (Object.keys(excludedLists).length > 0) {
        debugger;
        valueSet.compose.exclude = [];
        Object.keys(excludedLists).forEach(function (system) {
            valueSet.compose.exclude.push({
                system: system,
                concept: codeLists[system],
            });
        });
    }
    return valueSet;
};
exports.omopConceptSetToFhirValueSet = omopConceptSetToFhirValueSet;
