const mongoose = require('mongoose');
const { withFilter } = require('graphql-subscriptions')
const { createApolloFetch } = require('apollo-fetch');
const { PubSub } = require('graphql-subscriptions');

const fetch = createApolloFetch({
    uri: `${process.env.MOTHER_SERVER_URL}`
})

const pubsub = new PubSub();

module.exports = {
    Query: {
        async testNotification(root, data, context) {
            pubsub.publish('notification', { notification: 'test' })
            return 'test';
        },
        async lastUpdated(root, data, context) {
            return '25/2';
        },
        async clinicInfo(root, data, context) {
            return {
                name: 'The Best Clinic',
                openAt: '100:00-200:00 PM',
                address: 'Zohal',
                telephone: '0599000000',
                description: 'We are the Zohal doctors in Zohal',
            };
        },
        async patientsAheadOfMe(root, data, { mongo: { WaitingList } }) {
            const w = await WaitingList.find({ doctorId: data.doctorId });
            const i = w.findIndex(x => x.patientId == data.patientId);

            return i;
        },
        async allPatients(root, data, { mongo: { Person } }) {
            return await Person.find({ type: 'patient' });
        },
        async allDoctors(root, data, { mongo: { Person } }) {
            return await Person.find({ type: 'doctor' });
        },
        async allSecretaries(root, data, { mongo: { Person } }) {
            return await Person.find({ type: 'secretary' });
        },
        async allCashiers(root, data, { mongo: { Person } }) {
            return await Person.find({ type: 'cashier' });
        },
        async admin(root, data, { mongo: { Person } }) {
            return await Person.findOne({ type: 'admin' });
        },
        async allRequestedAppointments(root, data, { mongo: { RequestedAppointment } }) {
            return await RequestedAppointment.find();
        },
        async patientInfo(root, data, { mongo: { Person } }) {
            return await Person.findById(data.id);
        },
        async doctorInfo(root, data, { mongo: { Person } }) {
            return await Person.findById(data.id);
        },
        async secretaryInfo(root, data, { mongo: { Person } }) {
            return await Person.findById(data.id);
        },
        async cashierInfo(root, data, { mongo: { Person } }) {
            return await Person.findById(data.id);
        },
        async waitingList(root, data, { mongo: { WaitingList } }) {
            return await WaitingList.find();
        },
    },
    Mutation: {
        async addPatient(root, data, { mongo: { Person, Patient } }) {
            const p = new Person(
                {
                    firstName: data.param.firstName,
                    lastName: data.param.lastName,
                    phoneNumber: data.param.phoneNumber,
                    gender: data.param.gender,
                    username: data.param.username,
                    password: "",
                    type: 'patient',
                }
            );

            await p.save();

            const pp = new Patient({
                _id: p._id,
                balance: [],
                prescriptions: [],
                paid: [],
            });

            await pp.save();

            return p;
        },
        async updatePatient(root, data, { mongo: { Person, Patient } }) {
            const p = await Person.findById(data.patientId);
            p.firstName = data.param.firstName || p.firstName;
            p.lastName = data.param.lastName || p.lastName;
            p.phoneNumber = data.param.phoneNumber || p.phoneNumber;
            p.gender = data.param.gender || p.gender;
            p.username = data.param.username || p.username;

            await p.save();
            return p;
        },
        async addDoctor(root, data, { mongo: { Person, Doctor } }) {
            const d = new Person(
                {
                    firstName: data.param.firstName,
                    lastName: data.param.lastName,
                    phoneNumber: data.param.phoneNumber,
                    gender: data.param.gender,
                    username: data.param.username,
                    password: data.param.password,
                    type: 'doctor',
                }
            );

            await d.save();

            const dd = new Doctor({
                _id: d._id,
                specialization: data.param.specialization,
            });

            await dd.save();

            return d;
        },
        async updateDoctor(root, data, { mongo: { Person, Doctor } }) {
            const d = await Person.findById(data.doctorId);
            d.firstName = data.param.firstName || d.firstName;
            d.lastName = data.param.lastName || d.lastName;
            d.phoneNumber = data.param.phoneNumber || d.phoneNumber;
            d.gender = data.param.gender || d.gender;
            d.username = data.param.username || d.username;
            d.password = data.param.password || d.password;

            await d.save();

            const dd = await Doctor.findById(data.doctorId);
            dd.specialization = data.param.specialization || dd.specialization;

            await dd.save();

            return d;
        },
        async deleteDoctor(root, data, { mongo: { Person, Doctor } }) {
            const d = await Person.findById(data.doctorId);

            d.remove();
            await d.save();

            const dd = await Doctor.findById(data.doctorId);
            dd.remove();
            await dd.save();

            return null;
        },

        async addSecretary(root, data, { mongo: { Person } }) {
            const s = new Person(
                {
                    firstName: data.param.firstName,
                    lastName: data.param.lastName,
                    phoneNumber: data.param.phoneNumber,
                    gender: data.param.gender,
                    username: data.param.username,
                    password: data.param.password,
                    type: 'secretary',
                }
            );

            await s.save();

            return s;
        },
        async updateSecretary(root, data, { mongo: { Person } }) {
            const d = await Person.findById(data.secretaryId);
            d.firstName = data.param.firstName || d.firstName;
            d.lastName = data.param.lastName || d.lastName;
            d.phoneNumber = data.param.phoneNumber || d.phoneNumber;
            d.gender = data.param.gender || d.gender;
            d.username = data.param.username || d.username;
            d.password = data.param.password || d.password;

            await d.save();

            return d;
        },
        async deleteSecretary(root, data, { mongo: { Person } }) {
            const d = await Person.findById(data.secretaryId);

            d.remove();
            await d.save();

            return null;
        },

        async addCashier(root, data, { mongo: { Person } }) {
            const c = new Person(
                {
                    firstName: data.param.firstName,
                    lastName: data.param.lastName,
                    phoneNumber: data.param.phoneNumber,
                    gender: data.param.gender,
                    username: data.param.username,
                    password: data.param.password,
                    type: 'cashier',
                }
            );

            await c.save();

            return c;
        },
        async updateCashier(root, data, { mongo: { Person } }) {
            const d = await Person.findById(data.cashierId);
            d.firstName = data.param.firstName || d.firstName;
            d.lastName = data.param.lastName || d.lastName;
            d.phoneNumber = data.param.phoneNumber || d.phoneNumber;
            d.gender = data.param.gender || d.gender;
            d.username = data.param.username || d.username;
            d.password = data.param.password || d.password;

            await d.save();

            return d;
        },
        async deleteCashier(root, data, { mongo: { Person } }) {
            const d = await Person.findById(data.cashierId);

            d.remove();
            await d.save();

            return null;
        },

        async addAdmin(root, data, { mongo: { Person } }) {
            const c = new Person(
                {
                    firstName: data.param.firstName,
                    lastName: data.param.lastName,
                    phoneNumber: data.param.phoneNumber,
                    gender: data.param.gender,
                    username: data.param.username,
                    password: data.param.password,
                    type: 'admin',
                }
            );

            await c.save();

            return c;
        },

        async addAppointment(root, data, { mongo: { Patient, Doctor, Appointment } }) {
            const d = await Doctor.findById(data.doctorId);
            const p = await Patient.findById(data.patientId);

            const app = new Appointment({
                patientId: p._id,
                doctorId: d._id,
                data: data.date,
                description: data.description,
            })

            await app.save();

            const result = await fetch({
                query: `
                    mutation addClinicToPatient($patientId: ID!){
                        addClinicToPatient(patientId: $patientId, clinicURL: "${process.env.MY_SERVER}") {
                          _id
                        }
                    }
                    `,
                variables: {
                    patientId: data.patientId,
                },
            });

            return app;
        },
        async deleteAppointment(root, data, { mongo: { Appointment } }) {
            const d = await Appointment.findById(data.appointmentId);

            d.remove();
            await d.save();

            return null;
        },
        async requestUpdateAppointment(root, data, { mongo: { Patient, Doctor, RequestedAppointment } }) {
            const app = await Appointment.findById(data.appointmentId);

            // add to requested appointments
            const r = new RequestedAppointment({
                patientId: app.patientId,
                doctorId: app.doctorId,
                message: data.message,
            });

            app.reomve();

            await app.save();
            await r.save();

            return r;
        },
        async requestAppointment(root, data, { mongo: { RequestedAppointment, Person, Patient } }) {
            const r = new RequestedAppointment({
                patientId: data.patientId,
                doctorId: data.doctorId,
                message: data.message,
            });

            await r.save();

            const p = await Person.findById(data.patientId);

            if (!p) {
                // add patient
                const result = await fetch({
                    query: `
                    query PatientInfo($patientId: ID!){
                        patientInfo(patientId: $patientId) {
                          _id
                          firstName
                          lastName
                          phoneNumber
                          gender
                          username
                        }
                      }
                    `,
                    variables: {
                        patientId: data.patientId,
                    },
                });

                const p = new Person(
                    {
                        _id: result.data.patientInfo._id,
                        firstName: result.data.patientInfo.firstName,
                        lastName: result.data.patientInfo.lastName,
                        phoneNumber: result.data.patientInfo.phoneNumber,
                        gender: result.data.patientInfo.gender,
                        username: result.data.patientInfo.username,
                        password: "",
                        type: 'patient',
                    }
                );

                await p.save();

                const pp = new Patient({
                    _id: p._id,
                    balance: [],
                    appointments: [],
                    prescriptions: [],
                });

                await pp.save();
            }

            return r;
        },
        async deleteRequestedAppointment(root, data, { mongo: { RequestedAppointment } }) {
            const p = await RequestedAppointment.findById(data.id);

            p.remove();
            await p.save();

            return null;
        },

        async addBalance(root, data, { mongo: { Patient, Doctor } }) {
            if (!data.amount || !data.description) {
                return null;
            }

            const d = await Doctor.findById(data.doctorId);
            const p = await Patient.findById(data.patientId);

            const bal = {
                _id: mongoose.Types.ObjectId(), doctorId: d._id, patientId: p._id,
                amount: data.amount, description: data.description
            };

            await p.balance.push(bal);

            await p.save();

            return bal;
        },

        async addPrescription(root, data, { mongo: { Patient, Doctor } }) {
            const d = await Doctor.findById(data.doctorId);
            const p = await Patient.findById(data.patientId);

            const prescription = {
                _id: mongoose.Types.ObjectId(),
                doctorId: d._id,
                description: data.description,
            };

            await p.prescriptions.push(prescription);

            await p.save();

            return prescription;
        },
        async deletePrescription(root, data, { mongo: { Patient } }) {
            const p = await Patient.findById(data.patientId);

            p.prescriptions.pull(data.prescriptionId);

            await p.save();

            return null;
        },

        async login(root, data, { mongo: { Person } }) {
            const p = await Person.find({ username: data.username });

            if (p && p[0] && data.password == p[0].password) {
                return { userType: p[0].type, _id: p[0]._id }
            }

            return null;
        },

        async pay(root, data, { mongo: { Patient } }) {
            const p = await Patient.findById(data.patientId);

            const doc = p.balance.id(data.balanceId);
            delete doc['date']
            p.paid.push(doc)

            p.balance.id(data.balanceId).remove();

            await p.save();
            return 0;
        },

        async search(root, data, { mongo: { Person } }) {
            // const types = data.who.split(',')

            const p = await Person.find({
                $and: [
                    { $or: [{ type: 'doctor' }, { type: 'secretary' }, { type: 'cashier' }] },
                    { firstName: new RegExp(data.searchString, 'i') },
                ]
            });


            return p;

        },
        async addToWaitingList(root, data, { mongo: { Doctor, WaitingList } }) {
            const d = await Doctor.findById(data.doctorId);

            if (d.isCurrentlyBusy) {
                const w = new WaitingList({
                    patientId: data.patientId,
                    doctorId: data.doctorId,
                });

                await w.save();

                return w;
            }

            d.isCurrentlyBusy = true;
            await d.save();

            pubsub.publish('next_patient', { nextPatient: { _id: data.patientId } })
            // pubsub.publish('waiting_list_clinic', { patientsAheadOfMe: `${process.env.MY_SERVER}` })

            return null;
        },
        async deleteFromWaitingList(root, data, { mongo: { WaitingList } }) {
            const w = await WaitingList.findById(data.id);

            w.remove()

            await w.save();

            return null
        },
        async nextPatient(root, data, { mongo: { Doctor, WaitingList } }) {
            const wl = await WaitingList.find({ doctorId: data.toDoctor });
            const w = wl[0]

            if (!w) {
                return false;
            }

            const id = w.patientId;

            w.remove()
            await w.save();

            const doctor = await Doctor.findById(data.toDoctor)

            doctor.isCurrentlyBusy = true;
            await doctor.save();

            console.log(id)

            pubsub.publish('next_patient', { nextPatient: { _id: id } })

            return true;
        }
    },
    Subscription: {
        nextPatient: {
            subscribe: () => pubsub.asyncIterator('next_patient')
        },
        notification: {
            resolve: (paylaod) => {
                console.log('paaaaay', payload)
                return paylaod
            },
            subscribe: () => withFilter(
                () => pubsub.asyncIterator('notification'),
                (payload, args) => {
                    console.log("payload", payload);
                    // return payload._id.toString() == args.id
                    return true
                },
            ),
        }
    },
    Patient: {
        async balance(root, data, { mongo: { Patient } }) {
            const t = await Patient.findById(root._id)
            if (!t) return []

            return t.balance || [];
        },
        async paid(root, data, { mongo: { Patient } }) {
            const t = await Patient.findById(root._id)
            if (!t) return []

            return t.paid || [];
        },
        async appointments(root, data, { mongo: { Patient, Appointment } }) {
            const t = await Appointment.find({ patientId: root._id });
            if (!t) return []

            return t || [];
        },
        async prescriptions(root, data, { mongo: { Patient } }) {
            const t = await Patient.findById(root._id);
            if (!t) return []

            return t.prescriptions || [];
        },
    },
    Doctor: {
        async specialization(root, data, { mongo: { Doctor } }) {
            const t = await Doctor.findById(root._id);
            if (!t) return []

            return t.specialization;
        },
        async appointments(root, data, { mongo: { Doctor, Appointment } }) {
            const t = await Appointment.find({ doctorId: root._id });
            if (!t) return []

            return t || [];
        }
    },
    Balance: {
        async patient(root, data, { mongo: { Person } }) {
            return await Person.findById(root.patientId);
        },
        async doctor(root, data, { mongo: { Person } }) {
            return await Person.findById(root.doctorId);
        },
    },
    Appointment: {
        async patient(root, data, { mongo: { Person } }) {
            return await Person.findById(root.patientId);
        },
        async doctor(root, data, { mongo: { Person } }) {
            return await Person.findById(root.doctorId);
        },
    },
    Prescription: {
        async doctor(root, data, { mongo: { Person } }) {
            return await Person.findById(root.doctorId);
        },
    },
    RequestedAppointment: {
        async patient(root, data, { mongo: { Person } }) {
            return await Person.findById(root.patientId);
        },
        async doctor(root, data, { mongo: { Person } }) {
            return await Person.findById(root.doctorId)
        },
    },
    Employee: {
        __resolveType(obj, context, info) {
            switch (obj.type) {
                case 'doctor':
                    return 'Doctor';
                case 'secretary':
                    return 'Secretary';
                case 'cashier':
                    return 'Cashier';
            }
        },
    },
    WaitingListItem: {
        async patient(root, data, { mongo: { Person } }) {
            return await Person.findById(root.patientId);
        },
        async doctor(root, data, { mongo: { Person } }) {
            return await Person.findById(root.doctorId)
        },
    }
};
