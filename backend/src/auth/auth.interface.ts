export interface AuthInterface {
    login: (username: string, password: string) => Promise<any>,
    getSeller: (resourceId: any) => Promise<any>,
}