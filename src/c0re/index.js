import * as auth from './auth';
import * as account from './account';
import * as user from './user';
import * as content from './content';

var functionList = {
    auth,
    account,
    user,
    content
};

export function getFunction(functionName) {
    return functionList[functionName];
}