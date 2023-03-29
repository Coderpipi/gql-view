/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_SERVER_PORT: number
    readonly VITE_SERVER_URL: string
    readonly VITE_BACKEND_URL: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
