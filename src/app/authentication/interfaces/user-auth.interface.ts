export interface UserAuth {
    name: {
        firstName: string;
        lastName: string;
    };
    userPassword: string;
    email: string;
    role: string;
    branchId: string;
}