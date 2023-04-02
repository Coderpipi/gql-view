import { createUserMutation, deleteUserMutation, getUserByIDQuery, getUsersQuery } from "@/gql/user_graphql_schema"
import { useMutation, useQuery } from "@vue/apollo-composable"
import { gql } from "graphql-tag"

export function getUserByID(id: number) {
    return useQuery(gql(getUserByIDQuery), {id: id})
}

export function getUsers(ids: Array<number> = []) {
    return useQuery(gql(getUsersQuery), {ids: ids})
}

export function createUser(user: User) {
    user.type = Number(user.type)
    const {mutate: sendMessage} = useMutation(gql(createUserMutation))
    return sendMessage({input: user})
}

export function deleteUser(id: number) {
    const {mutate: sendMessage} = useMutation(gql(deleteUserMutation))
    return sendMessage({id})
}

export function updateUser(user: User) {
    console.log(user)
    return new Promise<boolean>((resolve, reject) => {resolve(true)})
}