import 'regenerator-runtime/runtime'
import {userService} from "../src/services/userService";
import {userRepository} from "../src/repositories/userRepository";



jest.mock("../src/repositories/userRepository")

                //Test description name, Input email, Input password, Expected response message type, Expected status code, Expected message body
const casesCreateUser = [
                [   "Inputs are provided correctly",
                    { email: "good@user.email", password: "GoodPassword12345" },
                    { body: { message: "Admin received registration request. Once handled, email will be sent." }, status: 200 }
                ],
                [   "Email is null",
                    { email: null, password: "GoodPassword12345"},
                    { body: { error: "Missing email or password"}, status: 401 }
                ],
                [   "Email is empty",
                    { email: "", password: "GoodPassword12345"},
                    { body: { error: "Missing email or password"}, status: 401 }
                ],
                [   "Password is null",
                    { email: "good@user.email", password: null},
                    { body: { error: "Missing email or password"}, status: 401 }
                ],
                [   "Password is empty",
                    { email: "good@user.email", password: ""},
                    { body: { error: "Missing email or password"}, status: 401 }
                ],
                [   "Email already exists",
                    { email: "user.found@by.this.email", password: "GoodPassword12345"},
                    { body: { error: "Email already exists!"}, status: 409 }
                ],
                [   "Password is not strong enough",
                    { email: "good@user.email", password: "SHort12"},
                    { body: { error: "Password is not strong enough"}, status: 403 }
                ],
                [   "Password is not strong enough",
                    { email: "good@user.email", password: "alllowercases"},
                    { body: { error: "Password is not strong enough"}, status: 403 }
                ],
                [   "Password is not strong enough",
                    { email: "good@user.email", password: "ALLUPPERCASES"},
                    { body: { error: "Password is not strong enough"}, status: 403 }
                ],
                [   "Password is not strong enough",
                    { email: "good@user.email", password: "0123456789"},
                    { body: { error: "Password is not strong enough"}, status: 403 }
                ],
                [   "Password is not strong enough",
                    { email: "good@user.email", password: "lowercases12345"},
                    { body: { error: "Password is not strong enough"}, status: 403 }
                ],
                [   "Password is not strong enough",
                    { email: "good@user.email", password: "UPERCASES12345"},
                    { body: { error: "Password is not strong enough"}, status: 403 }
                ],
                [   "Password is not strong enough",
                    { email: "good@user.email", password: "lowercasesANDUPERCASES"},
                    { body: { error: "Password is not strong enough"}, status: 403 }
                ],
    ];

describe("userCreate test", () => {
    test.each(casesCreateUser)('Create user when: %s', async function (test, inputUser, expectedResult) {
        const result = await userService.createUserTesting(inputUser, userRepository);
        expect(result).toEqual(expectedResult)
    })
})

const casesLoginUser =[
    [   "Email is null",
        { email: null, password: "Password12345"},
        { body: { error: "Inputs not provided"}, status: 400 }
    ],
    [   "Email is empty",
        { email: "", password: "Password12345"},
        { body: { error: "Inputs not provided"}, status: 400 }
    ],
    [   "Password is null",
        { email: "good@user.email", password: null},
        { body: { error: "Inputs not provided"}, status: 400 }
    ],
    [   "Password is empty",
        { email: "good@user.email", password: ""},
        { body: { error: "Inputs not provided"}, status: 400 }
    ],
    // [   "User not found by email",
    //     { email: "no.user.found@by.this.email", password: "Password12345" },
    //     { body: { error: "User does not exist" }, status: 404 }
    // ],
    [   "User found but status is not enabled",
        { email: "user.found@but.status.not.enabled", password: "Password12345" },
        { body: { error: "User needs to be activated" }, status: 403 }
    ],
    [   "User found, enabled but password is  not correct",
        { email: "user.found@enabled.password.is.not.correct", password: "WrongPassword12345" },
        { body: { error: "Password is not correct" }, status: 401 }
    ],
    // [   "User exists and password is correct",
    //     { email: "user.found@enabled.password.is.correct", password: "Password12345" },
    //     { body: { message: "JWT string" }, status: 200 }
    // ],
]



describe("userLogin test", () => {
    test.each(casesLoginUser)('Login user when: %s', async function (test, inputUser, expectedResult) {
        const result = await userService.loginUserTesting(inputUser.email, inputUser.password, userRepository);
        expect(result).toEqual(expectedResult)
    })
})