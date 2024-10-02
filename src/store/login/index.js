import StoreModule from '../module';

class LoginState extends StoreModule {

    initState() {
        return {
            token: "",
            error: "",
            user: {}
        };
    }

    async registerUser(login, password) {
        const response = await fetch("/api/v1/users/sign", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        })
        const json = await response.json()

        console.log(json);
        
        if(!json.error) {
            this.setState({ ...this.getState(), token: json.result.token })
        } else {
            this.setState({ ...this.getState(), error: json.error.message })
        }
    }
    
    async getDataUser() {
        const response = await fetch("/api/v1/users/self?fields=*", {
            method: "GET",
            headers: {
                "X-Token": this.getState().token,
                "Content-Type": "application/json"
            },
        })
        const json = await response.json()

        console.log(this.getState().token, json.result);
        

        this.setState({...this.getState(), user: {email: json.result.email, name: json.result.profile.name, phone: json.result.profile.phone, username: json.result.username}})
    }

    exitAccount() {
        this.setState({ ...this.getState(), token: "", user: {}, error: "" })
    }
}



export default LoginState;
