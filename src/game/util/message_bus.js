const listenerMap = new Map();

const listen = (msgType, callBack) => {
    const list = listenerMap.get(msgType) || [];
    list.push(callBack);
};

const unListen = (msgType, callBack) => {
    const list = listenerMap.get(msgType);
    if (!list){
        return;
    }
    const index = list.indexOf(callBack);
    if (index<0){
        return;
    }
    list[index] = null;
};

export {listen, unListen};