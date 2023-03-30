import { useQuery } from "@vue/apollo-composable"
import { gql } from "graphql-tag"

export function getUserByID(id: number) {
    return useQuery(gql`
      query UserQuery($id: Int) {
    getUserByID(ID: $id) {
        ...respFields
    }
}
     fragment respFields on User {
    id
    username
    age
    sex
}`, {id: id})
}

export function getUsers(ids: Array<number> = []) {
    return useQuery(gql`
      query UserQuery($ids: [Int]!) {
    getUsers(IDs: $ids) {
        ...respFields
    }
}
     fragment respFields on User {
    id
    username
    age
    sex
}`, {ids: ids})
}