export const doctors = [
    {
        id_doctor: 1,
        name: "Dr. Armando Teles",
        specialty: "Ginecologia e obstetrícia",
        icon: "M"
    },
    {
        id_doctor: 2,
        name: "Dr. Cleyton Parente",
        specialty: "Cardiologia",
        icon: "M"
    },
    {
        id_doctor: 3,
        name: "Dra. Carmoely Revane",
        specialty: "Pediatria",
        icon: "F"
    },
    {
        id_doctor: 4,
        name: "Dra. Carmem Lucia Dias",
        specialty: "Clinica Geral",
        icon: "F"
    }

];

export const appointments = [
    {
        id_appointment: 1,
        user: "Cleyton",
        service: "Consulta",
        doctor: "Dr. Armando Teles",
        specialty: "Ginecologia e obstetrícia",
        booking_date: "2024-10-28",
        booking_hour: "15:40",
        price: 400

    },
    {
        id_appointment: 2,
        user: "Parente",
        service: "Consulta",
        doctor: "Dr. Cleyton Parente",
        specialty: "Cardiologia",
        booking_date: "2024-12-30",
        booking_hour: "14:40",
        price: 200

    },
    {
        id_appointment: 3,
        user: "Oliveira",
        service: "Consulta",
        doctor: "Dra. Carmoely Revane",
        specialty: "Pediatria",
        booking_date: "2024-12-29",
        booking_hour: "16:40",
        price: 300

    },
    {
        id_appointment: 4,
        user: "Carmoely",
        service: "Consulta",
        doctor: "Dra. Carmem Lucia Dias",
        specialty: "Clinica Geral",
        booking_date: "2024-12-31",
        booking_hour: "15:40",
        price: 500

    }
];
export const doctors_services = [
    {
        id_service: 1,
        description: "Consulta Médica",
        price: 500
    },
    {
        id_service: 2,
        description: "Drenagem Linfática",
        price: 650
    },
    {
        id_service: 3,
        description: "Lipoasperação",
        price: 5000
    },
    {
        id_service: 4,
        description: "Mamoplastia",
        price: 1700
    }
];