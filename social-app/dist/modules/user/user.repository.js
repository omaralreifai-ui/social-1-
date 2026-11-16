"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_abstract_1 = require("../../lib/db/db.abstract");
const user_model_1 = require("../../lib/db/user.model");
class UserRepository extends db_abstract_1.AbstractRpository {
    constructor() {
        super(user_model_1.User);
    }
    async findByEmail(email) {
        return this.model.findOne({ email });
    }
    async checkUserExistByEmail(email) {
        return this.model.findOne({ email });
    }
    async updateUserByEmail(email, update) {
        return this.model.findOneAndUpdate({ email }, update, { new: true });
    }
}
exports.UserRepository = UserRepository;
exports.default = new UserRepository();
