export const EndPoint = {
    Employees: {
        GetAllEmployees: "/employees",
        GetEmployeeById: (id: number) => `/employees/${id}`,
        CreateEmployee: "/employees",
        UpdateEmployee: (id: number) => `/employees/${id}`,
        DeleteEmployee: (id: number) => `/employees/${id}`,
    },
    Departments: {
        GetAllDepartments: "/departments",
        GetDepartmentById: (id: number) => `/departments/${id}`,
        createDepartment: "/departments",
        updateDepartment: (id: number) => `/departments/${id}`,
        deleteDepartment: (id: number) => `/departments/${id}`,

    },
    JobTitles: {
        GetAllJobTitles: "/jobtitles",
        GetJobTitleById: (id: number) => `/jobtitles/${id}`,
        createJobTitle: "/jobtitles",
        updateJobTitle: (id: number) => `/jobtitles/${id}`,
        deleteJobTitle: (id: number) => `/jobtitles/${id}`,
    },
    LeaveBalances: "/leavebalances",
    LeaveRequests: "/leaverequests",
    LeaveTypes: "/leavetypes",
} as const