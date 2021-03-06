"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.BoardAdmin = exports.TIME_SEARCH_DEBOUNCE = exports.RESOURCE_POST = exports.RESOURCE_POSTS = exports.ACTION_SHOW = exports.ACTION_REMOVE = exports.ACTION_APPROVE = void 0;
var api = require("./api");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var string_1 = require("@quenk/noni/lib/data/string");
var function_1 = require("@quenk/noni/lib/data/function");
var timer_1 = require("@quenk/noni/lib/control/timer");
var dialog_1 = require("@quenk/jouvert/lib/app/service/dialog");
var factory_1 = require("@quenk/jouvert/lib/app/remote/model/factory");
var callback_1 = require("@quenk/jouvert/lib/app/remote/callback");
var app_1 = require("@quenk/jouvert/lib/app");
var remote_1 = require("@quenk/jouvert/lib/app/remote");
var util_1 = require("@quenk/wml-widgets/lib/util");
var browser_1 = require("@quenk/jhr/lib/browser");
var app_2 = require("./views/app");
var preview_1 = require("./views/dialog/preview");
var edit_1 = require("./views/dialog/edit");
var columns_1 = require("./columns");
exports.ACTION_APPROVE = 'approve';
exports.ACTION_REMOVE = 'remove';
exports.ACTION_SHOW = 'show';
exports.RESOURCE_POSTS = '/admin/r/posts';
exports.RESOURCE_POST = '/admin/r/posts/{id}';
exports.TIME_SEARCH_DEBOUNCE = 500;
var agent = browser_1.createAgent();
/**
 * DialogManager is responsible for the actual display and removal of dialog
 * content.
 */
var DialogManager = /** @class */ (function () {
    function DialogManager(node) {
        this.node = node;
    }
    DialogManager.prototype.open = function (view) {
        setView(this.node, view);
    };
    DialogManager.prototype.setView = function (view) {
        setView(this.node, view);
    };
    DialogManager.prototype.close = function () {
        unsetView(this.node);
    };
    return DialogManager;
}());
/**
 * AfterOkExec is a CompleteHandler that simply invokes the passed function.
 */
var AfterOkExec = /** @class */ (function (_super) {
    __extends(AfterOkExec, _super);
    function AfterOkExec(handler) {
        var _this = _super.call(this) || this;
        _this.handler = handler;
        return _this;
    }
    AfterOkExec.prototype.onComplete = function (r) {
        if (r.code === 200)
            this.handler(r);
    };
    return AfterOkExec;
}(callback_1.AbstractCompleteHandler));
/**
 * PostEditViewCtxImpl provides the data and functions used in the dialog for
 * editing posts.
 */
var PostEditViewCtxImpl = /** @class */ (function () {
    /**
     * @param post  The post being edited.
     * @param app   The instance of BoardAdmin.
     */
    function PostEditViewCtxImpl(post, app) {
        var _this = this;
        this.post = post;
        this.app = app;
        this.changes = {};
        this.onChange = function (e) {
            _this.changes[e.name] = e.value;
        };
        this.onSave = function () {
            var posts = _this.app.modelFactory.create(api.POST, new AfterOkExec(function () {
                _this.app.tell('dialogs', new dialog_1.CloseDialog());
                _this.app.runFuture(_this.app.loadInitialPosts());
            }));
            posts.update(_this.post.id, _this.changes).fork();
        };
        this.onCancel = function () {
            _this.app.tell('dialogs', new dialog_1.CloseDialog());
        };
    }
    return PostEditViewCtxImpl;
}());
/**
 * BoardAdmin is the main class for the admin application.
 *
 * @param main    - The DOM node that the main application content will reside.
 * @param dialogs - The DOM node that will be used for dialogs.
 */
var BoardAdmin = /** @class */ (function (_super) {
    __extends(BoardAdmin, _super);
    function BoardAdmin(main, dialogs) {
        var _this = _super.call(this) || this;
        _this.main = main;
        _this.dialogs = dialogs;
        /**
         * view is the WML content to display on the screen.
         */
        _this.view = new app_2.BoardAdminView(_this);
        /**
         * modelFactory for producing RemoteModels on request.
         */
        _this.modelFactory = factory_1.RemoteModelFactory.getInstance(function (t) { return _this.vm.spawn(t); }, 'remote.background');
        /**
         * values contains various bits of information used to generate
         * the view.
         */
        _this.values = {
            header: {
                links: {
                    Logout: function () { return _this.runFuture(_this.logout()); }
                }
            },
            search: {
                onChange: timer_1.debounce(function (e) {
                    var qry = e.value === '' ? {} : { q: e.value };
                    _this.runFuture(_this.searchPosts(qry));
                }, exports.TIME_SEARCH_DEBOUNCE)
            },
            table: {
                id: 'table',
                data: [],
                columns: [
                    new columns_1.TitleColumn(function (post) { return _this.showPost(post); }),
                    new columns_1.CompanyColumn(),
                    new columns_1.ApprovedColumn(),
                    new columns_1.ActionColumn([
                        {
                            text: "View",
                            divider: false,
                            onClick: function (data) { return _this.showPost(data); }
                        },
                        {
                            text: "Approve",
                            divider: false,
                            onClick: function (data) {
                                return _this.runFuture(_this.approvePost(data.id));
                            }
                        },
                        {
                            text: "Edit",
                            divider: false,
                            onClick: function (data) { return _this.editPost(data); }
                        },
                        {
                            text: "Remove",
                            divider: true,
                            onClick: function (data) {
                                return _this.runFuture(_this.removePost(data.id));
                            }
                        }
                    ])
                ]
            }
        };
        _this.onError = function (e) {
            console.error(e);
            alert('An error has occurred! Details have been logged to the console.');
        };
        return _this;
    }
    BoardAdmin.create = function (main, dialogs) {
        return new BoardAdmin(main, dialogs);
    };
    /**
     * searchPosts in the database.
     *
     * Differs from loadPosts() by updating only the table, not the whole
     * view on success.
     *
     * @param qry - The query object to include in the GET request.
     */
    BoardAdmin.prototype.searchPosts = function (qry) {
        if (qry === void 0) { qry = {}; }
        var that = this;
        return future_1.doFuture(function () {
            var r, mtable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get(exports.RESOURCE_POSTS, qry)];
                    case 1:
                        r = _a.sent();
                        mtable = util_1.getById(that.view, that.values.table.id);
                        if (mtable.isJust())
                            mtable.get().update((r.code === 200) ? r.body.data : []);
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    /**
     * loadInitialPosts from the database into the table.
     */
    BoardAdmin.prototype.loadInitialPosts = function () {
        var that = this;
        return future_1.doFuture(function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get(exports.RESOURCE_POSTS)];
                    case 1:
                        r = _a.sent();
                        if (r.code !== 200) {
                            alert('Could not load posts!');
                        }
                        else {
                            that.values.table.data = r.body.data;
                            that.view.invalidate();
                        }
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    /**
     * logout the user from the application.
     */
    BoardAdmin.prototype.logout = function () {
        return confirm('Do you want to logout now?') ?
            agent
                .post('/admin/logout', {})
                .chain(function () {
                window.location.href = '/admin';
                return future_1.pure(undefined);
            }) :
            future_1.pure(undefined);
    };
    /**
     * showPost displays a single Post in a dialog.
     */
    BoardAdmin.prototype.showPost = function (data) {
        var _this = this;
        this.tell('dialogs', new dialog_1.ShowDialogView(new preview_1.PostPreviewView({
            post: data,
            close: function () { return _this.tell('dialogs', new dialog_1.CloseDialog()); }
        }), '$'));
    };
    /**
     * approvePost sets the approved flag on a post to true.
     *
     * Once this is done the post will show on the site.
     */
    BoardAdmin.prototype.approvePost = function (id) {
        var that = this;
        return future_1.doFuture(function () {
            var path, change, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = string_1.interpolate(exports.RESOURCE_POST, { id: id });
                        change = { approved: true };
                        return [4 /*yield*/, agent.patch(path, change)];
                    case 1:
                        r = _a.sent();
                        if (r.code == 200) {
                            alert('Post approved!');
                            that.refresh();
                        }
                        else {
                            alert('Could not complete request!');
                        }
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    /**
     * editPost brings up the dialog editor to quickly edit the title and body
     * of a post.
     */
    BoardAdmin.prototype.editPost = function (data) {
        this.tell('dialogs', new dialog_1.ShowDialogView(new edit_1.PostEditView(new PostEditViewCtxImpl(data, this)), '$'));
    };
    /**
     * removePost permenantly removes a post from the site.
     */
    BoardAdmin.prototype.removePost = function (id) {
        var that = this;
        return future_1.doFuture(function () {
            var path, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = string_1.interpolate(exports.RESOURCE_POST, { id: id });
                        return [4 /*yield*/, agent.delete(path)];
                    case 1:
                        r = _a.sent();
                        if (r.code == 200) {
                            alert('Post removed!');
                            that.refresh();
                        }
                        else {
                            alert('Could not complete request!');
                        }
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    /**
     * show a View on the application's screen.
     */
    BoardAdmin.prototype.show = function (view) {
        setView(this.main, view);
    };
    /**
     * refresh reloads and displays the application.
     */
    BoardAdmin.prototype.refresh = function () {
        this.runFuture(this.loadInitialPosts());
    };
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    BoardAdmin.prototype.runFuture = function (ft) {
        ft.fork(this.onError, function_1.noop);
    };
    /**
     * tell a message to an actor in the system.
     */
    BoardAdmin.prototype.tell = function (addr, msg) {
        this.vm.tell(addr, msg);
        return this;
    };
    /**
     * spawn a root child actor given its Template.
     */
    BoardAdmin.prototype.spawn = function (t) {
        this.vm.spawn(t);
        return this;
    };
    /**
     * @override
     */
    BoardAdmin.prototype.run = function () {
        var _this = this;
        this.spawn({
            id: 'dialogs',
            create: function (s) { return new dialog_1.DialogService(new DialogManager(_this.dialogs), s); }
        });
        this.spawn({
            id: 'remote.background',
            create: function () { return new remote_1.Remote(agent, _this); }
        });
        this.show(this.view);
        this.refresh();
    };
    return BoardAdmin;
}(app_1.JApp));
exports.BoardAdmin = BoardAdmin;
var setView = function (node, view) {
    unsetView(node);
    node.appendChild(view.render());
};
var unsetView = function (node) {
    while (node.firstChild != null)
        node.removeChild(node.firstChild);
};
//# sourceMappingURL=index.js.map