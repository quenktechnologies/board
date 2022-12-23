"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.jobsCtrl = void 0;
const boardServerLibFiltersCheck = require("@board/server/lib/filters/check");
const boardServerLibDataChecks = require("@board/server/lib/data/checks");
const dotErrors = require("./errors");
const boardServerLibFiltersBody = require("@board/server/lib/filters/body");
const boardServerLibFiltersAudit = require("@board/server/lib/filters/audit");
const boardServerLibFiltersQuery = require("@board/server/lib/filters/query");
const boardServerLibDataSearchFilters = require("@board/server/lib/data/search/filters");
const boardServerLibDataSearchFields = require("@board/server/lib/data/search/fields");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const api_1 = require("@board/server/lib/controllers/api");
const job_1 = require("@board/server/lib/data/models/job");
exports.jobsCtrl = new api_1.ApiController(job_1.JobModel.getInstance);
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `r`,
    'app': { 'dirs': { 'self': `/build/r` },
        'filters': [boardServerLibFiltersCheck.checkBody(boardServerLibDataChecks.checksAvailable, boardServerLibDataChecks.partialChecksAvailable, dotErrors.templates), boardServerLibFiltersBody.fromParams, boardServerLibFiltersAudit.ensureOwner, boardServerLibFiltersQuery.compile({ 'policies': boardServerLibDataSearchFilters.policiesAvailable,
                'fields': boardServerLibDataSearchFields.fieldsAvailable }), boardServerLibFiltersAudit.auditWrite(`user`)],
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'get',
                path: '/jobs',
                filters: [exports.jobsCtrl.search.bind(exports.jobsCtrl)], tags: { search: `job` }
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map