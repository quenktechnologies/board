import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';
import {GridLayout,Row,Column} from '@quenk/wml-widgets/lib/layout/grid'; ;
import {Panel,PanelBody} from '@quenk/wml-widgets/lib/layout/panel'; ;
import {TextField} from '@quenk/wml-widgets/lib/control/text-field'; ;
import {DropList} from '@quenk/wml-widgets/lib/control/drop-list'; ;
import {Checkbox} from '@quenk/wml-widgets/lib/control/checkbox'; ;
import {PostJobFormPanel} from '../'; 


//@ts-ignore:6192
type __IfArg = ()=>__wml.Content[]

//@ts-ignore:6192
type __ForAlt = ()=> __wml.Content[]

//@ts-ignore:6192
type __ForInBody<A> =(val:A, idx:number, all:A[])=>__wml.Content[]

//@ts-ignore:6192
type __ForOfBody<A> = (val:A, key:string, all:object) =>__wml.Content[]

//@ts-ignore:6192
interface __Record<A> {

 [key:string]: A

}

//@ts-ignore:6192
const __if = (__expr:boolean, __conseq:__IfArg,__alt?:__IfArg) : Content[]=>
(__expr) ? __conseq() :  __alt ? __alt() : [];

//@ts-ignore:6192
const __forIn = <A>(list:A[], f:__ForInBody<A>, alt:__ForAlt) : __wml.Content[] => {

   let ret:__wml.Content[] = [];

   for(let i=0; i<list.length; i++)
       ret = ret.concat(f(list[i], i, list));

   return ret.length === 0 ? alt() : ret;

}
//@ts-ignore:6192
const __forOf = <A>(o:__Record<A>, f:__ForOfBody<A>,alt:__ForAlt) : __wml.Content[] => {

    let ret:__wml.Content[] = [];

    for(let key in o)
  	    if(o.hasOwnProperty(key)) 
	        ret = ret.concat(f((o)[key], key, o));

    return ret.length === 0 ? alt(): ret;

}


// @ts-ignore 6192
const text = __document.text;
// @ts-ignore 6192
const unsafe = __document.unsafe
// @ts-ignore 6192
const isSet = (value:any) => value != null
export class PostJobFormPanelView  implements __wml.View {

   constructor(__context: PostJobFormPanel) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new Panel({}, [

        __this.widget(new PanelBody({}, [

        __this.widget(new GridLayout({}, [

        __this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : "title"  },'name': "title",'label': "Title*",'placeholder': "Senior Software Engineer",'value': __context.attrs.data.title,'onChange': __context.attrs.onChange}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : "title"  },'name': "title",'label': "Title*",'placeholder': "Senior Software Engineer",'value': __context.attrs.data.title,'onChange': __context.attrs.onChange})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({'span': 6}, [

        __this.widget(new TextField({wml : { 'id' : "location"  },'name': "location",'label': "Location (where the job is based)*",'value': __context.attrs.data.location,'onChange': __context.attrs.onChange}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : "location"  },'name': "location",'label': "Location (where the job is based)*",'value': __context.attrs.data.location,'onChange': __context.attrs.onChange})
     ]),<__wml.Attrs>{'span': 6}),
__this.widget(new Column({'span': 6}, [

        __this.node('label', <__wml.Attrs>{'class': "ww-label"}, [

        __document.createTextNode('Select A Job Type*')
     ]),
__this.widget(new DropList({wml : { 'id' : "type"  },'className': "board-job-type-dropdown -block",'name': "type",'value': __context.attrs.data.type,'options': __context.typeOptions,'onSelect': __context.attrs.onChange}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : "type"  },'className': "board-job-type-dropdown -block",'name': "type",'value': __context.attrs.data.type,'options': __context.typeOptions,'onSelect': __context.attrs.onChange})
     ]),<__wml.Attrs>{'span': 6})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : "apply_url"  },'name': "apply_url",'label': "Apply Link",'placeholder': "Specify a url or email address applicants can use to apply",'value': __context.attrs.data.apply_url,'onChange': __context.attrs.onChange}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : "apply_url"  },'name': "apply_url",'label': "Apply Link",'placeholder': "Specify a url or email address applicants can use to apply",'value': __context.attrs.data.apply_url,'onChange': __context.attrs.onChange})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.node('b', <__wml.Attrs>{}, [

        __this.widget(new Checkbox({'name': "remote",'value': __context.attrs.data.remote,'onChange': __context.attrs.onChange}, [

        
     ]),<__wml.Attrs>{'name': "remote",'value': __context.attrs.data.remote,'onChange': __context.attrs.onChange}),
__document.createTextNode('\u000a             This job is remote \u000a          ')
     ])
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Row({}, [

        __this.widget(new Column({}, [

        __this.widget(new TextField({wml : { 'id' : "description"  },'name': "description",'placeholder': "Provide full details of the job. Markdown is supported",'rows': 12,'value': __context.attrs.data.description,'onChange': __context.attrs.onChange}, [

        
     ]),<__wml.Attrs>{wml : { 'id' : "description"  },'name': "description",'placeholder': "Provide full details of the job. Markdown is supported",'rows': 12,'value': __context.attrs.data.description,'onChange': __context.attrs.onChange})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{});

       }

   }

   ids: { [key: string]: __wml.WMLElement } = {};

   groups: { [key: string]: __wml.WMLElement[] } = {};

   views: __wml.View[] = [];

   widgets: __wml.Widget[] = [];

   tree: Node = <Node>__document.createElement('div');

   template: __wml.Template;

   registerView(v:__wml.View) : __wml.View {

       this.views.push(v);

       return v;

}
   register(e:__wml.WMLElement, attrs:__wml.Attributes<any>) : __wml.WMLElement {

       let attrsMap = (<__wml.Attrs><any>attrs)

       if(attrsMap.wml) {

         let {id, group} = attrsMap.wml;

         if(id != null) {

             if (this.ids.hasOwnProperty(id))
               throw new Error(`Duplicate id '${id}' detected!`);

             this.ids[id] = e;

         }

         if(group != null) {

             this.groups[group] = this.groups[group] || [];
             this.groups[group].push(e);

         }

         }
       return e;
}

   node(tag:string, attrs:__wml.Attrs, children: __wml.Content[]): __wml.Content {

       let asDOMAttrs = <__document.WMLDOMAttrs><object>attrs

       let e = __document.createElement(tag, asDOMAttrs, children,
                attrs.wml && attrs.wml.ns || '');

       this.register(e, attrs);

       return e;

   }


   widget(w: __wml.Widget, attrs:__wml.Attrs) : __wml.Content {

       this.register(w, attrs);

       this.widgets.push(w);

       return w.render();

   }

   findById<E extends __wml.WMLElement>(id: string): __Maybe<E> {

       let mW:__Maybe<E> = __fromNullable<E>(<E>this.ids[id])

       return this.views.reduce((p,c)=>
       p.isJust() ? p : c.findById(id), mW);

   }

   findGroupById<E extends __wml.WMLElement>(name: string): E[] {
           return this.groups.hasOwnProperty(name) ?
           <E[]>this.groups[name] : [];

   }

   invalidate() : void {

       let {tree} = this;
       let parent = <Node>tree.parentNode;

       if (tree == null)
           return console.warn('invalidate(): '+       'Missing DOM tree!');

       if (tree.parentNode == null)
                  throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');

       parent.replaceChild(<Node>this.render(), tree) 

   }

   render(): __wml.Content {

       this.ids = {};
       this.widgets.forEach(w => w.removed());
       this.widgets = [];
       this.views = [];
       this.tree = <Node>this.template(this);

       this.ids['root'] = (this.ids['root']) ?
       this.ids['root'] : 
       this.tree;

       this.widgets.forEach(w => w.rendered());

       return this.tree;

   }

}