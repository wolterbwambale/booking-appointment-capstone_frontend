const createDoctorFormData = (doctorData, userId) => {
  const formData = new FormData();
  formData.append('doctor[name]', doctorData.name);
  formData.append('doctor[specialization]', doctorData.specialization);
  formData.append('doctor[years_of_experience]', doctorData.years_of_experience);
  formData.append('doctor[price_per_appointment]', doctorData.price_per_appointment);

 
