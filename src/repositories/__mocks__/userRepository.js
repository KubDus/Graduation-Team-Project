class UserRepository {
    createUser(user) {
        if(user.password && user.email)
        return user;
    }

    async getUserByEmail(email) {
        let user = Object()
        if(email === "no.user.found@by.this.email") {
            return null;
        }
        if(email === "user.found@by.this.email") {
            return user;
        }
        if(email === "user.found@but.status.not.enabled") {
            user = {status : "DISABLED"}
            return user;
        }
        if(email === "user.found@enabled.password.is.not.correct") {
            user = {
                status : "ENABLED",
                password : "$2b$08$R4tRiXCu7ZOIKJtk7VD2A.SoyydxWvNx0vsvgymYNWUrQwYLNQFGC" }
            return user;
        }
        if(email === "user.found@enabled.password.is.correct") {
            user = {
                status : "ENABLED",
                password :  "$2b$08$R4tRiXCu7ZOIKJtk7VD2A.SoyydxWvNx0vsvgymYNWUrQwYLNQFGC" }
            return user;
        }
    }

    async getUserByAuthenticationLink(link) {
        if(link.length !== 0)
        return null;
    }

    async getUserById(id) {
        if(id == 3) {
            return { "id": 1, "email": "igot@email.com", "role": "apprentice" };
        } else if(id == 7) {
            return null;
        } else if(id == 5) {
            return { "id": 5, "role": "mentor" };
        }
    }

}

const userRepository = new UserRepository();
export { userRepository };