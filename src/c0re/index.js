import * as auth from './auth';
import * as user from './user';
import * as content from './content';

var functionList = {
    auth,
    user,
    content
};

export function getFunction(functionName) {
    return functionList[functionName];
}