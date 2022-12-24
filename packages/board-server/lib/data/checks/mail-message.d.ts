/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */
import { MailMessage } from '@board/types/lib/mail-message';
import * as _json from '@quenk/noni/lib/data/jsonx';
import * as _prec from '@quenk/preconditions/lib/async';
/**
 * DataType checked.
 *
 * Used by template generation.
 * @private
 */
export type DataType = MailMessage;
/**
 * fieldChecks for MailMessage (AUTOGENERATED).
 */
export declare const fieldChecks: _prec.Preconditions<_json.Value, _json.Value>;
/**
 * partialFieldChecks for MailMessage (AUTOGENERATED).
 */
export declare const partialFieldChecks: _prec.Preconditions<_json.Value, _json.Value>;
/**
 * check a value to determine if it is a correct MailMessage
 * (AUTOGENERATED).
 */
export declare const check: _prec.Precondition<_json.Value, MailMessage>;
/**
 * checkPartial is like check but only checks the fields encountered.
 * (AUTOGENERATED).
 */
export declare const checkPartial: _prec.Precondition<_json.Value, Partial<MailMessage>>;