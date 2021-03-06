"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyFormView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
var text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var CompanyFormView = /** @class */ (function () {
    function CompanyFormView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.node('form', { 'name': 'company-form', 'onsubmit': function (e) { return e.preventDefault(); }, 'autocomplete': 'off' }, [
                __this.widget(new panel_1.Panel({}, [
                    __this.widget(new panel_1.PanelBody({}, [
                        __this.widget(new grid_1.GridLayout({}, [
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new text_field_1.TextField({ wml: { 'id': 'company' }, ww: { 'name': 'company', 'label': 'Company Name*', 'value': __context.values.post.data.company, 'onChange': __context.values.post.onChange } }, []), { wml: { 'id': 'company' }, ww: { 'name': 'company', 'label': 'Company Name*', 'value': __context.values.post.data.company, 'onChange': __context.values.post.onChange } })
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new text_field_1.TextField({ wml: { 'id': 'company_logo' }, ww: { 'name': 'company_logo', 'label': 'Logo', 'placeholder': 'Please provide a url to a png image with resolution 400 x 400', 'value': __context.values.post.data.company_logo, 'onChange': __context.values.post.onChange } }, []), { wml: { 'id': 'company_logo' }, ww: { 'name': 'company_logo', 'label': 'Logo', 'placeholder': 'Please provide a url to a png image with resolution 400 x 400', 'value': __context.values.post.data.company_logo, 'onChange': __context.values.post.onChange } })
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new text_field_1.TextField({ wml: { 'id': 'company_email' }, ww: { 'name': 'company_email', 'label': 'Email*', 'value': __context.values.post.data.company_email, 'onChange': __context.values.post.onChange } }, []), { wml: { 'id': 'company_email' }, ww: { 'name': 'company_email', 'label': 'Email*', 'value': __context.values.post.data.company_email, 'onChange': __context.values.post.onChange } })
                                ]), {})
                            ]), {})
                        ]), {})
                    ]), {})
                ]), {})
            ]);
        };
    }
    CompanyFormView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    CompanyFormView.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    CompanyFormView.prototype.node = function (tag, attrs, children) {
        var e = __document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, '');
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = __document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    CompanyFormView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    CompanyFormView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    CompanyFormView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    CompanyFormView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    CompanyFormView.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.views = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return CompanyFormView;
}());
exports.CompanyFormView = CompanyFormView;
//# sourceMappingURL=company.js.map