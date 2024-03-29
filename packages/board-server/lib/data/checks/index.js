"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialChecksFor = exports.partialChecksAvailable = exports.getChecksFor = exports.checksAvailable = void 0;
/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */
const _job = require("./job");
const _mailMessage = require("./mail-message");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * checksAvailable from this module (AUTOGENERATED).
 */
exports.checksAvailable = {
    'job': _job.check,
    'mail-message': _mailMessage.check
};
/**
 * getChecksFor provides a validator from this module.
 */
const getChecksFor = (name) => (0, maybe_1.fromNullable)(exports.checksAvailable[name]);
exports.getChecksFor = getChecksFor;
/**
 * partialChecksAvailable from this module.
 */
exports.partialChecksAvailable = {
    'job': _job.checkPartial,
    'mail-message': _mailMessage.checkPartial
};
/**
 * getPartialChecksFor provides a validator from this module.
 */
const getPartialChecksFor = (name) => (0, maybe_1.fromNullable)(exports.partialChecksAvailable[name]);
exports.getPartialChecksFor = getPartialChecksFor;
//# sourceMappingURL=index.js.map