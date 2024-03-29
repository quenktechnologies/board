"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailMessageModel = exports.ModelImpl = void 0;
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
/**
 * MailMessageModelModel for MailMessage (AUTOGENERATED).
 */
class MailMessageModel extends dback_model_mongodb_1.BaseModel {
    constructor(name, database, collection) {
        super(database, collection);
        this.name = name;
        this.database = database;
        this.collection = collection;
        this.id = 'id';
    }
    static getInstance(db) {
        return new MailMessageModel('mail', db, db.collection('mail'));
    }
}
exports.MailMessageModel = MailMessageModel;
exports.ModelImpl = MailMessageModel;
//# sourceMappingURL=mail-message.js.map