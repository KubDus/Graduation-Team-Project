import { type } from "express/lib/response";
import sequelize from "../config/database";
import User from "../models/user";

const { QueryTypes } = require('@sequelize/core');

class UserRepository {
    createUser(user) {
        return User.create(user);
    }

    async changeUserStatus(user, status) {
        try {
            return await user.update({ status: status });
        } catch (error) {
        }
        return null;
    }

    async updateUser(updateTo, userIdToUpdate, updaterRole) {
        try {
            const user = await User.findByPk(userIdToUpdate);
            if (updateTo.first_name) { user.firstName = updateTo.first_name }
            if (updateTo.last_name) { user.lastName = updateTo.last_name }
            if (updateTo.password) {user.password = updateTo.password}

            if (updaterRole === "admin" || updaterRole === "mentor + admin") {
                if (updateTo.role) { user.role = updateTo.role }
                if (updateTo.status) { user.status = updateTo.status }
                if (updateTo.email) { user.email = updateTo.email }
                if (updateTo.username) { user.username = updateTo.username }
            }
            return await user.save();

        } catch (error) {
            return null;
        }
    }

    async getUserByAuthenticationLink(link) {
        try {
            return await User.findOne({ where: { authenticationLink: link } });
        } catch (err) {
            return null;
        }
    }

    async getUserByEmail(email) {
        try {
            const possibleUser = await User.findOne({ where: { email: email } });
            return possibleUser;
        } catch (error) {
            return null;
        }
    }

    async getUserById(id) {
        try {
            const possibleUser = await User.findByPk(id);
            return possibleUser;
        } catch (error) {
            return null;
        }
    }

    async getUserByUsername(username) {
        try {
            const possibleUser = await User.findOne({ where: { username: username } });
            return possibleUser;
        } catch (error) {
            return null;
        }
    }

    async getUserByLink(link) {
        console.log(link);
        try {
            const possibleUser = await User.findOne({ where: { authenticationLink: link } });
            console.log("repository user: " + possibleUser);
            return possibleUser;
        } catch (err) {
            return null;
        }
    }

    async activateUser(user) {
        console.log("user in activation: " + user.email);
        try {
            await user.update({ status: "ENABLED" });
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            user.status = "SOFT-DELETED";
            return await user.save();
        } catch (error) {
            return null;
        }
    }

    async generalUpdateUser(user, fields) {
        try {
            if (fields) {
                return await user.save({ fields: fields });
            } else {
                return await user.save();
            }
        } catch (err) {
            return null;
        }
    }

    async getAllUsersByStatus(statusFilter){
        try {
            const users = await User.findAll({attributes: ['id','first_name','last_name','username','email','status','role'], where : {status: statusFilter}})
            return users;
        } catch (error) {
            return null;
        }
    }

    async findAllUsersAdminView(){
        try {
            return await User.findAll({attributes : ['id','first_name','last_name','username','email','status','role']})
        } catch (error) {
            return null;
        }
    }

    async findAllUsersMentorView(){
        try {
            return await sequelize.query("SELECT id,first_name,last_name,username,email,status, CASE role WHEN 'mentor + admin' THEN 'mentor' ELSE role END as role FROM project.users WHERE role != 'admin'", {type:QueryTypes.SELECT});
        } catch (error) {
            return null;
        }
    }

    async findAllUsersApprenticeView(user){
        try {
            return await User.findAll({attributes : ['id','first_name','last_name','email','role'], where : {cohort : user.cohort}})
        } catch (error) {
            return null;
        }
    }
}

const userRepository = new UserRepository();
export { userRepository };
