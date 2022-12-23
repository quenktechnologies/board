import * as boardServerLibFiltersCheck from '@board/server/lib/filters/check'; 
import * as boardServerLibDataChecks from '@board/server/lib/data/checks'; 
import * as dotErrors from './errors'; 
import * as boardServerLibFiltersBody from '@board/server/lib/filters/body'; 
import * as boardServerLibFiltersAudit from '@board/server/lib/filters/audit'; 
import * as boardServerLibFiltersQuery from '@board/server/lib/filters/query'; 
import * as boardServerLibDataSearchFilters from '@board/server/lib/data/search/filters'; 
import * as boardServerLibDataSearchFields from '@board/server/lib/data/search/fields'; 
//@ts-ignore: 6133
import {System} from '@quenk/potoo/lib/actor/system';
//@ts-ignore: 6133
import * as _json from '@quenk/noni/lib/data/jsonx';
//@ts-ignore: 6133
import {Template} from '@quenk/tendril/lib/app/module/template';
//@ts-ignore: 6133
import {Module} from '@quenk/tendril/lib/app/module';
//@ts-ignore: 6133
import {Request} from '@quenk/tendril/lib/app/api/request;'
//@ts-ignore: 6133
import {RouteConf as $RouteConf} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';




// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';

import { ApiController } from '@board/server/lib/controllers/api';

import { JobModel } from '@board/server/lib/data/models/job';

export const jobsCtrl = new ApiController(JobModel.getInstance);

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `r`,
'app': {'dirs': {'self': `/build/r`},
'filters': [boardServerLibFiltersCheck.checkBody(boardServerLibDataChecks.checksAvailable,boardServerLibDataChecks.partialChecksAvailable,dotErrors.templates),boardServerLibFiltersBody.fromParams,boardServerLibFiltersAudit.ensureOwner,boardServerLibFiltersQuery.compile({'policies': boardServerLibDataSearchFilters.policiesAvailable,
'fields': boardServerLibDataSearchFields.fieldsAvailable}),boardServerLibFiltersAudit.auditWrite(`user`)],
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'get',
path:'/jobs',
filters:[jobsCtrl.search.bind(jobsCtrl)],tags:{search: `job` }});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
