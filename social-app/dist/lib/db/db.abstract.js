"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRpository = void 0;
class AbstractRpository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async find(filter = {}) {
        return this.model.find(filter);
    }
    async findOne(filter) {
        return this.model.findOne(filter);
    }
    async findById(id) {
        return this.model.findById(id);
    }
    async update(filter, newdata, option) {
        return this.model.findOneAndUpdate(filter, newdata, option);
    }
    async updata(filter, newdata, option) {
        return this.update(filter, newdata, option);
    }
    async delete(filter) {
        return this.model.deleteOne(filter);
    }
}
exports.AbstractRpository = AbstractRpository;
