class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	this.states = config.states;
    	this.initial = config.initial;
    	this.currentState = config.initial;
    	this.history = [this.initial]
    	this.allState = 0;
    	this.redoState = []
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	if (this.states[state] != undefined) {
    		this.currentState = state;
    		this.history.push(state);
    		this.redoState = [];
    		this.allState++;

    	}
    	else{
    		throw new Exception("Нет такого состояния");
    	}
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    let b = this.currentState 
var a = this.states[b]. transitions[event]
		if(a){
			this.currentState = this.states[b].transitions[event];
			this.history.push(this.currentState);
			this.allState++;
			this.redoState = [];

		}
		else {
			throw new Exception("Нет такого состояния");
		}
}

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.currentState = this.initial;
    	this.allState = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	const arr = [];
    	const state = ['normal','busy', 'hungry', 'sleeping' ];
    	if (event === undefined) {
    		return state
    	}
    	else{
    		 for (var i = 0; i < state.length; i++) {
    	let a = this.states[state[i]].transitions;
          
            if (event in a) {
            	
            	arr.push(state[i]);
            }
               }
    	}
    	return arr
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

    	if (this.allState !== 0) {
    		this.currentState = this.history[this.allState-1];
    		this.allState--;
    		this.redoState.push(this.currentState)
    		 return true;
    	}
    	else{
    		return false
    	}

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    	if (this.redoState.length < 1 ) {
    		return false
    	}
    	else{
    		this.currentState = this.history[this.allState+1];
    		this.allState++;
    		this.redoState.length--;
    		 return true;
    	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.redoState = [];
    	this.allState = 0;
    	this.history.length = 1;

    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
