export default function createKeyboardListener(document) {

    let state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId){
        state.playerId = playerId
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }

    function notifyAll(command){    
        if(state.observers.length)
            for (const observerFunction of state.observers){
                observerFunction(command)
            }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event){

        const keyPressed = event.key

        const command = {
            type: 'move-player',
            playerId: state.playerId,
            keyPressed
        }

        notifyAll(command)   
    }

    return {
        subscribe,
        registerPlayerId
    }
}