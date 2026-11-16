"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_abstract_1 = require("../../lib/db/db.abstract");
const model_1 = require("./model/model");
class PostRepository extends db_abstract_1.AbstractRpository {
    constructor() {
        super(model_1.post);
    }
}
