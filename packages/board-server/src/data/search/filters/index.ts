/** 
 * AUTOGENERATED DO NOT EDIT DIRECTLY!
 */
import { Record } from '@quenk/noni/lib/data/record';

import { EnabledPolicies } from '@quenk/search-filters-mongodb';

export { EnabledPolicies }

import _job from './job';
import _mailMessage from './mail-message';

/**
 * policiesAvailable is a map of model names to search filter policies that can
 * be used in an application.
 */
export const policiesAvailable: Record<EnabledPolicies> = {

    'job': _job,

    'mailMessage': _mailMessage
}

