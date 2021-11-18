/*
    const mongoose = require('mongoose');
    const Hospital = require('./models/hospital');

    createHospitalData = () => {
        await mongoose.connection.dropCollection('hospitals');

        const testHospitalsAmount = 10;
        const testHospitals = await Hospital.find({ address: "Tsimiski" });
        if (testHospitals.length !== testHospitalsAmount) {
            for (let i = 0; i < testHospitalsAmount; i++) {
                for (let j = 0; j < 3; j++) {
                    await Hospital.create({
                        code: "General Hospital",
                        name: `Hospital ${i}`,
                        departments: {
                            Cardiology: {
                                availableHours: [new Date('December 17, 2021 03:24:00'),new Date('December 21, 2021 03:24:00'),new Date('December 28, 2021 03:24:00')],
                                doctors: []
                            };
                            Neurology: {
                                availableHours: [Date.now(),Date.now(),Date.now()],
                                doctors: []
                            },
                            Orthopaedics: {
                                availableHours: [Date.now(),Date.now(),Date.now()],
                                doctors: []
                            }
                        },
                        phoneNumber: "0900696969"
                        address: "Tsimiski",
                    });
                }
            }
        }
    }

*/
