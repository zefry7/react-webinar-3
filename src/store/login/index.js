import StoreModule from '../module';

class LoginState extends StoreModule {

    initState() {
        return {
            token: "",
            error: "",
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

        
        if (!json.error) {
            document.cookie = `token=${json.result.token}`
            this.setState({ ...this.getState(), token: json.result.token })
        } else {
            this.setState({ ...this.getState(), error: json.error.message })
        }
    }

    async exitAccount() {
        await fetch("/api/v1/users/sign", {
            method: "DELETE",
            headers: {
                "X-Token": this.getState().token,
                "Content-Type": "application/json"
            },
        })
        document.cookie = "token=;"
        this.setState({ ...this.getState(), token: "", user: {}, error: "" })
    }

    checkToken() {
        let token = document.cookie?.split(";")[0]?.split("=")[1]
        if(token != null) {
            this.setState({ ...this.getState(), token: token})
        }
    }
}



export default LoginState;
