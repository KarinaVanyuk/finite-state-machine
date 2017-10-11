class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	this.states=config.states;
    	this.initial=config.initial;
    	this.currentState=config.initial;
    	this.history=[this.initial]
    	this.allState=0;
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
    	if (this.states[state]!= undefined) {
    		this.currentState=state;
    		this.history.push(state);
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
    const state=['normal','busy', 'hungry', 'sleeping' ];
    let b=this.currentState 
    for (var i = 0; i < state.length; i++) {
    	let a=this.states[state[i]].transitions;
          
            if (event in a) {
            	
            	this.currentState = a[event];
            }
               }
           


    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.currentState=this.initial;
    	this.allState=0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	const arr=[];
    	const state=['normal','busy', 'hungry', 'sleeping' ];
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
    	if (this.allState!=0) {
    		this.currentState=this.history[this.allState-1];
    		this.allState--;
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
    	if (this.allState!=this.history.length-1) {
    		this.currentState=this.history[this.allState+1];
    		this.allState++;
    		 return true;
    	}
    	else{
    		return false
    	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.history.length = 1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
