import * as user from './user';

var functionList = {
    user
};

export function getFunction(functionName) {
    return functionList[functionName];
}