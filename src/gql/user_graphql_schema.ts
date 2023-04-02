const userFieldFragment = `
fragment respFields on User {
    id
    username
    age
    sex
    phone
    type
}`

export const getUserByIDQuery = `
query ($id: Int!) {
    user(ID: $id) {
        ...respFields
    }
}
${userFieldFragment}`

export const getUsersQuery = `
query ($ids: [Int!]!) {
    users(IDs: $ids) {
        ...respFields
    }
}
${userFieldFragment}   
`

export const createUserMutation = `
mutation ($input: UserInput!) {
    createUser(input: $input) {
        ...respFields
    }
}
${userFieldFragment}   
`

export const deleteUserMutation = `
mutation ($id: Int!) {
    deleteUser(ID: $id) {
        ...respFields
    }
}
${userFieldFragment}   
`

export const loginQuery = `
query ($input: UserLoginInput!){
    login(input: $input) {
        token
        user {
            ...respFields
        }
    }
}
${userFieldFragment}
`
export {}
