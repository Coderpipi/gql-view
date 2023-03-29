import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { provideApolloClient } from "@vue/apollo-composable"
import { createPinia } from "pinia"
import { createApp, h } from "vue"

import App from "./App.vue"

import "./assets/main.css"
import router from "./router"

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_BACKEND_URL,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})
const app = createApp({
    setup() {
        provideApolloClient(apolloClient)
    },
    render: () => h(App)
})
app.use(createPinia())
app.use(router)
app.mount("#app")
