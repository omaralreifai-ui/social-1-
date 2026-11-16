import { Model, QueryOptions, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRpository<T> {
    constructor(protected readonly model: Model<T>) {}

    async create(data: any) {
        return this.model.create(data);
    }

    async find(filter: any = {}) {
        return this.model.find(filter);
    }

    async findOne(filter: any) {
        return this.model.findOne(filter);
    }

    async findById(id: string | Types.ObjectId) {
        return this.model.findById(id);
    }

    async update(filter: any, newdata: UpdateQuery<T> | Partial<T>, option?: QueryOptions<T>) {
        return this.model.findOneAndUpdate(filter, newdata, option);
    }

    async updata(filter: any, newdata: UpdateQuery<T> | Partial<T>, option?: QueryOptions<T>) {
        return this.update(filter, newdata, option);
    }

    async delete(filter: any) {
        return this.model.deleteOne(filter);
    }
}
