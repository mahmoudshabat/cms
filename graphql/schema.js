module.exports = `
    
    type Query {
       lastUpdated: String
       clinicInfo: ClinicInfo
       allPatients: [Patient!]!
       allDoctors:[Doctor!]!
       allSecretaries:[Secretary!]!
       allCashiers:[Cashier!]!
       allEmployees: [Employee]!
       admin: Admin
       allRequestedAppointments: [RequestedAppointment]!
       patientInfo(id:ID!): Patient
       doctorInfo(id:ID!): Doctor
       secretaryInfo(id:ID!): Secretary
       cashierInfo(id:ID!): Cashier
       waitingList: [WaitingListItem]!
       patientsAheadOfMe(patientId: ID!, doctorId: ID!): Int
       testNotification: String
    }

    type WaitingListItem {
        _id: ID!
        patient: Patient
        doctor: Doctor
    }
    
        
    type Mutation {
        addToWaitingList(patientId: ID!, doctorId: ID!): WaitingListItem
        deleteFromWaitingList(id: ID!): WaitingListItem

        nextPatient(toDoctor: ID!): Boolean


        addPatient(param: PatientInfo): Patient
        updatePatient(patientId:ID!, param:PatientInfo): Patient
        deletePatient(patientId:ID!): Patient
        
        
        addDoctor(param:DoctorInfo): Doctor
        updateDoctor(doctorId:ID!, param:DoctorInfo): Doctor
        deleteDoctor(doctorId:ID!): Doctor
        
        addSecretary(param:EmployeeInfo): Secretary
        updateSecretary(secretaryId:ID!, param:EmployeeInfo): Secretary
        deleteSecretary(secretaryId:ID!): Secretary
        
        addCashier(param:EmployeeInfo): Cashier
        updateCashier(cashierId:ID!, param:EmployeeInfo): Cashier
        deleteCashier(cashierId:ID!): Cashier
        
        addAdmin(param: EmployeeInfo): Admin
        
        addAppointment(patientId: ID!, doctorId: ID!, date: String!, description: String): Appointment
        deleteAppointment(appointmentId: ID!): Appointment
        requestUpdateAppointment(appointmentId: ID!, patientId: ID!, message: String): RequestedAppointment
        requestAppointment(patientId: ID!, doctorId: ID!, message: String): RequestedAppointment
        deleteRequestedAppointment(id: ID!): RequestedAppointment
        
        addBalance(patientId: ID!, doctorId: ID!, amount: Int, description: String): Balance
        deleteBalance(balanceId:ID!): Balance 
        
        addPrescription(patientId: ID!, doctorId: ID!, description: String): Prescription
        deletePrescription(patientId: ID!, prescriptionId: ID!): Prescription
        
        pay(cashierId: ID!, patientId: ID!, balanceId: ID!): Int
        payPortion(cashierId: ID!, patientId: ID!, balanceId: ID!, amount: Int): Int
        
        login(username: String!, password: String!): Login
        search(who: String, searchString: String): [Employee]!
    }

    type Subscription {
        nextPatient: Patient
        notification: String
    }
    

    type ClinicInfo {
        name: String
        openAt: String
        address: String
        telephone: String
        description: String 
    }

    type Admin {
        _id:ID!
        firstName:String
        lastName:String
        phoneNumber:String
        gender:String
        username:String
    }
    
    
    type Patient {
        _id:ID!
        firstName:String
        lastName:String
        phoneNumber:String
        gender:String
        username:String
        balance:[Balance]!
        paid: [Balance]!
        appointments:[Appointment]!
        prescriptions:[Prescription]!
    }
    
    
    type Doctor implements Employee{
        _id:ID!
        firstName:String
        lastName:String
        phoneNumber:String
        gender:String
        username:String
        specialization: String
        appointments:[Appointment]
        type: String
        isCurrentlyBusy: Boolean
    }
    
    
    type Secretary implements Employee {
        _id:ID!
        firstName:String
        lastName:String
        phoneNumber:String
        gender:String
        username:String
        type: String
    }
   
    
    type Cashier implements Employee {
        _id:ID!
        firstName:String
        lastName:String
        phoneNumber:String
        gender:String
        username:String
        type: String
    }
    
    
    type Balance {
        _id: ID!
        patient:Patient
        doctor:Doctor
        amount:Int
        description: String
        date: String
    }
    
    
    type RequestedAppointment {
        _id: ID!
        patient: Patient
        doctor: Doctor
        message: String
    }
    
    
    type Appointment {
        _id:ID!
        patient: Patient
        doctor: Doctor
        date:String
        description: String
    }
    
    
    type Prescription {
        _id:ID!
        doctor: Doctor
        description:String
        date: String
    }
    
    
    scalar Upload
    
    type Login {
        _id: ID!
        userType: String!
    }
    
    
    input PatientInfo {
        firstName:String
        lastName:String
        phoneNumber:String
        gender:String
        username:String
    }
    
    
    input DoctorInfo {
        firstName:String
        lastName:String
        phoneNumber:String
        gender:String
        username:String
        password: String
        specialization:String
    }
    
    
    input EmployeeInfo {
        firstName: String
        lastName: String
        phoneNumber: String
        gender: String
        username: String
        password: String
    }
    
    interface Employee {
        _id: ID!
        firstName: String
        lastName: String
        type: String
    }
    
`;
