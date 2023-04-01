interface User {
    id: number
    username: string
    age: number | undefined
    sex: string
    phone: string
    type: number | undefined
}

interface UserLoginForm {
    username: string
    password: string
}
