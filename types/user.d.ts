interface User {
    id: number
    username: string
    age: number | undefined
    sex: string
    phone: string
    type: number | undefined
}

interface UserLoginForm {
    phone: string
    password: string
    verifyCode: string
    loginType: number
}

interface Token {
    tokenString: string
    user: User
}
