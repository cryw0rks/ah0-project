import * as user from './user';
import * as content from './content';

var functionList = {
    user,
    content
};

export function getFunction(functionName) {
    return functionList[functionName];
}