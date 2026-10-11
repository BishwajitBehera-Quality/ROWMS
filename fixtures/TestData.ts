//import dotenv from 'dotenv';
//dotenv.config();


export const users = {
    admin: {
        username: process.env.admin_UserName || '',
        password: process.env.admin_Password || '',
    },

    testAdmin: {

        userName: 'CompassAdmin@ct.gov',
        passWord: '6WV_H%Y:S/%*c>*L'

    },

    dummyUser: {

        userName: 'CompassAdmin@ct.gov',
        passWord: '6WV_H%Y:S/%*c>L'

    }
}