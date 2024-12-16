import { fetchApi } from "../fetch"

const auth = {
    login: (data: any) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data: any) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    logout: () => fetchApi('/auth/logout', { method: 'POST' }),
}

export default auth