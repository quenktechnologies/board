/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */
import { Job } from '@board/types/lib/job';
import * as mongodb from 'mongodb';
import { BaseModel } from '@quenk/dback-model-mongodb';


export {
  JobModel as ModelImpl,
  Job as DataType
}

/**
 * JobModelModel for Job (AUTOGENERATED).
 */
export class JobModel extends BaseModel<Job> {

  constructor(
    public name: string,
    public database: mongodb.Db,
    public collection : mongodb.Collection) { super(database, collection); }

    id = 'id';

  static getInstance (db: mongodb.Db) : JobModel {

    return new JobModel('jobs', db, db.collection('jobs'));

  }

}
