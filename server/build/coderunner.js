"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coderunner = void 0;
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
exports.coderunner = express_1.default.Router();
exports.coderunner.post("/", (req, res) => {
    let { code } = req.body || "";
    console.log(req.body);
    try {
        fs_1.default.writeFileSync("code.js", code);
        (0, child_process_1.exec)("node code.js", (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                return res.status(200).send({ res: stderr, fl: false });
            }
            if (stderr) {
                return res.status(200).send({ res: stderr, fl: false });
            }
            if (stdout) {
                return res.status(200).send({ res: stdout, fl: true });
            }
        });
    }
    catch (e) {
        res.status(401).send(e);
    }
});
