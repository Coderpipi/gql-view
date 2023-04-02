import { loginQuery } from "@/gql/user_graphql_schema"
import { useQuery } from "@vue/apollo-composable"
import { gql } from "graphql-tag"

export function login(user: UserLoginForm) {
    return useQuery<Token>(gql(loginQuery), {input: user})
}