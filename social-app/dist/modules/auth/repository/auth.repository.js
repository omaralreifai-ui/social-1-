"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userrepo = exports.authRepository = exports.AuthRepository = void 0;
const user_model_1 = require("../../../lib/db/user.model");
const db_abstract_1 = require("../../../lib/db/db.abstract");
class AuthRepository extends db_abstract_1.AbstractRpository {
    constructor() {
        super(user_model_1.User);
    }
    async checkUserExistByEmail(email) {
        return this.model.findOne({ email });
    }
    async updateUserByEmail(email, update) {
        return this.model.findOneAndUpdate({ email }, update, { new: true });
    }
    async createUser(data) {
        return this.model.create(data);
    }
}
exports.AuthRepository = AuthRepository;
exports.authRepository = new AuthRepository();
exports.Userrepo = exports.authRepository;
exports.default = exports.authRepository;
