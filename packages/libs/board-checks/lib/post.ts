

/**
 * Post checks module.
 * AUTO GENERATED! DO NOT EDIT DIRECTLY! 
 */
/** imports **/
//@ts-ignore: 6133
import { merge as _merge } from '@quenk/noni/lib/data/record';
//@ts-ignore: 6133
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
//@ts-ignore: 6133
import {
    Precondition,
    Preconditions,
    optional as _optional,
    discard as _discard,
    and as _and,
    or as _or,
    match as _match,
    caseOf as _caseOf,
    async as _async,
    identity as _identity,
    every as _every,
    reject as _reject
} from '@quenk/preconditions/lib/async';
//@ts-ignore: 6133
import {
    map as _map
} from '@quenk/preconditions/lib/async/array';
//@ts-ignore: 6133
import {
    restrict as complete,
    intersect as partial,
    map as _recordMap,
} from '@quenk/preconditions/lib/async/record';

import { Post } from '@board/types/lib/post';
import { validate, validatePartial } from '@board/validators/lib/post';
import { parseMarkdown, inc, unique } from './checks';

//@ts-ignore: 6133
const _title = 'Post';
//@ts-ignore: 6133
const _collection = 'posts';

/**
 * @private Used during template generation.
 */
export type DataType = Post;

/**
 * checks for Post provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'approved': _identity
    ,
    'created_by': _identity
    ,
    'created_on': _identity
    ,
    'last_updated_on': _identity
    ,
    'last_updated_by': _identity
    ,
    'id': _every<Value, Value>(inc('counters.posts'), unique('posts', 'id'))
    ,
    'title': _identity
    ,
    'type': _identity
    ,
    'location': _identity
    ,
    'remote': _identity
    ,
    'description': _identity
    ,
    'description_html': _identity
    ,
    'company': _identity
    ,
    'company_email': _identity
    ,
    'company_logo': _identity
    ,
    'apply_url': _identity
    ,
    'salary_range': _identity

};

/**
 * partialChecks for Post provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'approved': _identity
    ,
    'created_by': _identity
    ,
    'created_on': _identity
    ,
    'last_updated_on': _identity
    ,
    'last_updated_by': _identity
    ,
    'id': _identity
    ,
    'title': _identity
    ,
    'type': _identity
    ,
    'location': _identity
    ,
    'remote': _identity
    ,
    'description': _identity
    ,
    'description_html': _identity
    ,
    'company': _identity
    ,
    'company_email': _identity
    ,
    'company_logo': _identity
    ,
    'apply_url': _identity
    ,
    'salary_range': _identity

};

/**
 * check a Post value.
 */
export const check: Precondition<Value, Post> =
    _and(_and<Value, Post, Post>(
        _async(validate), complete(checks)),
        _every<Post, Post>(parseMarkdown('description', 'description_html'))
    );

/**
 * checkPartial a partial Post value.
 */
export const checkPartial: Precondition<Value, Partial<Post>> =
    _and(_and<Value, Post, Post>(_async(validatePartial),
        partial(partialChecks)),
        _every(parseMarkdown('description', 'description_html')));

