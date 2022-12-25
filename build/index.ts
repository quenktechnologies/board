import * as quenkTendrilConnectionMongodb from '@quenk/tendril-connection-mongodb'; 
import * as quenkTendrilSessionMongodb from '@quenk/tendril-session-mongodb'; 
import * as quenkTendrilShowNunjucks from '@quenk/tendril-show-nunjucks'; 
import * as dotR from './r'; 
import * as dotEvents from './events'; 
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



import * as mongodb from 'mongodb';
import * as jobStatus from '@board/server/lib/data/job';

import {
    insertOne,
    findOne,
    find
} from '@quenk/noni-mongodb/lib/database/collection';

import {
    created,
    conflict
} from '@quenk/tendril/lib/app/api/response';
import { fork } from '@quenk/tendril/lib/app/api/control';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
//import { tell } from '@quenk/tendril/lib/app/api/control/actor';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';

import { render } from '@quenk/tendril-show-wml';

//import { OutgoingMessage } from '@board/server/lib/actors/mail/server';

import { check } from '@board/server/lib/data/checks/job';

import { NotFoundView } from './views/404';
import { PostJobFormView } from './views/post';
import { JobView } from './views/job';
import { IndexView } from './views';

export const ERROR_AUTH_FAILED = 'Invalid Email or password! Try again.';

export class BoardController {

    /**
     * showJobs currently approved.
     *
     * This only shows the most recent 50 jobs. In future we will refactor if
     * needed to show more.
     */
    onIndex(_: Request): Action<void> {

        return doAction(function*() {

            let db = yield getMain();

            let collection = db.collection('jobs');

            let qry = { status: jobStatus.JOB_STATUS_ACTIVE };

            let jobs = yield fork(find(
                collection,
                qry,
                { sort: { created_on: -1 }, limit: 50 }
            ));

            return <Action<void>>render(new IndexView({ jobs }));

        });

    }

    /**
     * onPostJobPage displays the form for creating new jobs on a new
     * page.
     */
    onPostJobPage(_: Request): Action<void> {

        return render(new PostJobFormView({}));

    }

    /**
     * onPostJob saves the submitted job data in the database for approval later.
     */
    onPostJob(r: Request): Action<undefined> {

        return doAction(function*() {

            let eResult = yield fork(check(r.body));

            if (eResult.isRight()) {

                let data = eResult.takeRight();
                let db = yield getMain();
                let collection = db.collection('jobs');

                // XXX: This is important to prevent the user from being able to
                // set the status. In the future we should split out the
                // validation for job again.
                data.status = jobStatus.JOB_STATUS_NEW;

                data.created_on = new Date();

                yield fork(insertOne(collection, data));

                // if (process.env.ADMIN_EMAIL)
                //   yield tell('/mail', new OutgoingMessage(process.env.ADMIN_EMAIL,
                //     'New job', 'Someone jobed *a new job* to board!'));



                return created({ id: data.id });

            } else {

                return conflict({ errors: eResult.takeLeft().explain() });

            }

        });

    }

    /**
     * showJob displays a page for a single approved job.
     */
    onJob(r: Request): Action<void> {

        return doAction(function*() {

            let id = Number(r.params.id); //XXX: this could be done with a check.

            let db = yield getMain();

            let collection = db.collection('jobs');

            let qry = { id, status: jobStatus.JOB_STATUS_ACTIVE };

            let mResult = yield fork(findOne(collection, qry));

            if (mResult.isNothing()) {
                return render(new NotFoundView({}), 404);
            } else {

                let job = mResult.get();

                return render(new JobView({
                    job,

                    // TODO: Move this to a library function
                    meta: [
                        {
                            property: 'og:site_name',
                            content: 'Caribbean Developers'
                        },
                        { property: 'og:type', content: 'article' },
                        { property: 'og:image', content: "https://jobs.caribbeandevelopers.org/ogimg.png" },
                        { property: 'og:title', content: job.title },
                        { property: 'og:description', content: job.type }
                    ]
                }));

            }

        });

    }

}

//retrieves the main connection from the tendril pool.
const getMain = (): Action<mongodb.Db> => checkout('main');
export const board = new BoardController();
//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `/`,
'app': {'dirs': {'self': `/build`,
'public': [`../public`,`../packages/board-widgets/public`,`../frontend/public`]},
'session': {'enable': true,
'options': {'secret': (<string>process.env['SESSION_SECRET']),
'name': `sessid`},
'store': {'provider': quenkTendrilSessionMongodb.provider,
'options': {'uri': (<string>process.env['MONGO_URL'])}}},
'csrf': {'token': {'enable': true,
'send_cookie': true}},
'views': {'provider': quenkTendrilShowNunjucks.show},
'log': {'enable': true,
'format': (<string>process.env['LOG_FORMAT'])},
'parsers': {'body': {'json': {'enable': true}}},
'middleware': {'available': {},
'enabled': []},
'modules': {'r': dotR.template},
'on': {'connected': [dotEvents.connected],
'started': dotEvents.started},
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'get',
path:'/',
filters:[board.onIndex.bind(board)],tags:{}});

$routes.push({
method:'get',
path:'/post',
filters:[board.onPostJobPage.bind(board)],tags:{}});

$routes.push({
method:'post',
path:'/post',
filters:[board.onPostJob.bind(board)],tags:{}});

$routes.push({
method:'get',
path:'/:id',
filters:[board.onJob.bind(board)],tags:{}});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s),
'server': {'port': (<string>process.env['PORT']),
'host': `0.0.0.0`},
'connections': {'main': {'connector': quenkTendrilConnectionMongodb.connector,
'options': [(<string>process.env['MONGO_URL']),{'useNewUrlParser': true}]}}})
