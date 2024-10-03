import StoreModule from '../module';

class ProfileState extends StoreModule {

    initState() {
        return {
            user: {}
        };
    }

    async getDataUser() {
        let token = document.cookie?.split(";")[0]?.split("=")[1]
        
        const response = await fetch("/api/v1/users/self?fields=*", {
            method: "GET",
            headers: {
                "X-Token": token,
                "Content-Type": "application/json"
            },
        })
        const json = await response.json()

        this.setState({ ...this.getState(), user: { email: json.result.email, name: json.result.profile.name, phone: json.result.profile.phone, username: json.result.username } })
    }
}



export default ProfileState;