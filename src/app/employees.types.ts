export interface Employee {
    id: string;
    name: string;
    department: string;
    status: 'ACTIVE' | 'OFFBOARD'
    equipments: {
        id: string;
        name: string;
    }[]
}

export type EmployeeParsed = Employee & { equipment: string } 
