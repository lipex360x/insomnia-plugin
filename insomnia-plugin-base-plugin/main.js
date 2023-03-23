"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateTags = exports.responseHooks = exports.requestHooks = void 0;
exports.requestHooks = [
    (context) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = yield response.json();
        context.store.setItem('itemId', JSON.stringify(data));
    })
];
exports.responseHooks = [
    (context) => __awaiter(void 0, void 0, void 0, function* () {
        const store = yield context.store.getItem('myItem');
        console.log('response', JSON.parse(store));
    })
];
exports.templateTags = [{
        name: 'getKeyInStore',
        displayName: 'Store Value',
        args: [{ type: 'string', defaultValue: 'itemId' }],
        run(context, theKey) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield context.store.getItem(theKey);
                const data = JSON.parse(response);
                console.log('Tag Data', data);
                return data.id;
            });
        }
    }];
