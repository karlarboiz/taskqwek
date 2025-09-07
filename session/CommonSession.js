class CommonSession {
    constructor(req, data, action) {
    this._req = req;
    this._data = data;
    this._action = action;
    }

    // Getter and Setter for req
    get req() {
    return this._req;
    }

    set req(value) {
    this._req = value;
    }

    // Getter and Setter for data
    get data() {
    return this._data;
    }

    set data(value) {
    this._data = value;
    }

    // Getter and Setter for action
    get action() {
    return this._action;
    }

    set action(value) {
    this._action = value;
    }

    loginSessionPage(){
        let loginInputs = this.req.session.loginInputs;
    
        if(!loginInputs){
            loginInputs = {
                hasError: false,
                errorMessage: {},
                email: '',
                password: '' 
            }
        }

        this.req.session.loginInputs = null;

        return loginInputs;
    }

    loginErrorSessionPage(){
        this.req.session.loginInputs = {
            hasError: true,
            ...this.data
        }
        this.req.session.cookie.originalMaxAge = 5000;

        this.req.session.save(this.action);
    }

    signupSessionPage(){
    
        let signupInputs = this.req.session?.signupInputs;
        
        if(!signupInputs){

            signupInputs = {
                hasError: false,
                errorMessage:{},
                completeName: '',
                email: '',
                password: ''
            }
        }
        
        thisreq.session.signupInputs = null;
    
        return signupInputs;
    }

    signupErrorSessionPage(){
        this.req.session.signupInputs = {
            hasError: true,
            ...this.data
        }

        
        req.session.save(this.action);
    }

}

module.exports = CommonSession;