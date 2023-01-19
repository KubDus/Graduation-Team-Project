import 'regenerator-runtime/runtime'
import { apprenticeshipService } from "../src/services/apprenticeshipService";
import { userRepository } from "../src/services/apprenticeshipService";
import { apprenticeshipRepository } from "../src/repositories/apprenticeshipRepository";


// this line says: I wont look into the real userRepository, instead of it I look after a directory called "__mocks__" for fake-userRepository.
jest.mock("../src/repositories/userRepository");
jest.mock("../src/repositories/apprenticeshipRepository");

const casesCreateApprenticeship = [
    ["Inputs are complete",
        {
            "user": 3,
            "cohort": 3,
            "class": 5,
            "phase": "PROJECT",
            "startdate": "2021-05-01",
            "enddate": "2021-07-30"
        },
        {
            body: {
                message: 'Apprenticeship created.'
            }, status: 200
        }
    ],
    ["inserted user is not valid",
        {
            "user": 7,
            "cohort": 3,
            "class": 5,
            "phase": "PROJECT",
        },
        {
            body: {
                error: "Bad request, not existing user id."
            }, status: 400
        }
    ],
    ["there is no class input",
        {
            "user": 3,
            "cohort": 3,
            "phase": "PROJECT",
            "startdate": "2021-05-01",
            "enddate": "2021-07-30"
        },
        {
            body: {
                error: "Provide all required fields."
            }, status: 400
        }
    ],
    ["the inserted user is not of role apprentice",
        {
            "user": 5,
            "cohort": 3,
            "class": 5,
            "phase": "PROJECT"
        },
        {
            body: {
                error: "User's role is not apprentice. Apprenticeship not created."
            }, status: 403
        }
    ]
]

describe("ApprenticeshipPOST test", () => {
    test.each(casesCreateApprenticeship)('Create apprenticeship when: %s', async function (testName, inputApprenticeship, expectedResult) {
        const result = await apprenticeshipService.createApprenticeship(inputApprenticeship);
        expect(result).toEqual(expectedResult)
    })
})

