import * as __wml from '@quenk/wml';
import { Maybe as __Maybe } from '@quenk/noni/lib/data/maybe';
export interface Meta {
    property?: string;
    httpEquiv?: string;
    charset?: string;
    name?: string;
    content?: string;
}
export interface HeadViewContext {
    title: string;
    noSite?: boolean;
    styles?: (string)[];
    meta?: (Meta)[];
}
export declare class HeadView implements __wml.View {
    constructor(__context: HeadViewContext);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    views: __wml.View[];
    widgets: __wml.Widget[];
    tree: Node;
    template: __wml.Template;
    registerView(v: __wml.View): __wml.View;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attrs, children: __wml.Content[]): __wml.Content;
    widget(w: __wml.Widget, attrs: __wml.Attrs): __wml.Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findGroupById<E extends __wml.WMLElement>(name: string): E[];
    invalidate(): void;
    render(): __wml.Content;
}
