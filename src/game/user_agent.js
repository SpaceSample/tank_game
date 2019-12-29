import msgBus from './util/message_bus';

class UserAgent {
    init(){
        document.body.addEventListener('keydown', event => {
            if(event.keyCode === 37){
                msgBus.send('user.key_left');
            }else if(event.keyCode === 38){
                msgBus.send('user.key_up');
            }else if(event.keyCode === 39){
                msgBus.send('user.key_right');
            }else if(event.keyCode === 40){
                msgBus.send('user.key_down');
            }else if(event.keyCode === 32){
                msgBus.send('user.key_space');
            }
        });
    }
}

const singleton = new UserAgent();

export default singleton;