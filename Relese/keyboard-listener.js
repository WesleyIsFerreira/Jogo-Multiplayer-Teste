export default function createKeyboardListener(document) {

    let state = {
        observers: []
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
            playerId: 'player1',
            keyPressed
        }

        notifyAll(command)   
    }

    return {
        subscribe
    }
}