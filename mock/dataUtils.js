const familyDoctorSpecialty = 'Family Doctor';

const specialtiesAndDepartments = [
  { department: 'Pathology', specialty: 'Pathologist' },
  { department: 'Oncology', specialty: 'Oncologist' },
  { department: 'Dermatology', specialty: 'Dermatologist' },
  { department: 'Pneumonology', specialty: 'Pneumonologist' },
  { department: 'Rheumatology', specialty: 'Rheumatologist' },
  { department: 'Gastroenterology', specialty: 'Gastroenterologist' },
  { department: 'Neurology', specialty: 'Neurologist' },
  { department: 'Cardiology', specialty: 'Cardiologist' },
  { department: 'Endocrinology', specialty: 'Endocrinologist' },
  { department: 'Hematology', specialty: 'Hematologist' },
  { department: 'Urology', specialty: 'Urologist' },
  { department: 'Orthopedics', specialty: 'Orthopedic Surgeon' },
  { department: 'Psychiatry', specialty: 'Psychiatrist' },
  { department: 'Otorhinolaryngology', specialty: 'Otorhinolaryngologist' },
  { department: 'Ophthalmology', specialty: 'Ophthalmologist' },
  { department: 'Radiology', specialty: 'Radiologist' },
];

const departments = specialtiesAndDepartments.map((entry) => entry.department);

module.exports = {
  specialtiesAndDepartments,
  departments,
  familyDoctorSpecialty,
};
