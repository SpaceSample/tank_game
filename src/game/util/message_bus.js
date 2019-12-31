class MsgBus {
    constructor() {
        this.listenerMap = new Map();
    }

    listen (msgType, callBack) {
        let list = this.listenerMap.get(msgType);
        if (!list) {
            list = [];
            this.listenerMap.set(msgType, list);
        }
        list.push(callBack);
    }

    unListen (msgType, callBack) {
        const list = this.listenerMap.get(msgType);
        if (!list){
            return;
        }
        const index = list.indexOf(callBack);
        if (index<0){
            return;
        }
        list[index] = null;
    }

    send (msgType, content) {
        const list = this.listenerMap.get(msgType) || [];
        // if(window.__DEBUG){
        //     console.log('[msg]: '+msgType);
        //     content&&console.log(content);
        // }

        for(let i in list) {
            list[i] && list[i](content);
        }
    }
};

const msgBus = new MsgBus();

export default msgBus;