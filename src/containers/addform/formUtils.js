const createDoctorFormData = (doctorData, userId) => {
  const formData = new FormData();
  formData.append('doctor[name]', doctorData.name);
  formData.append('doctor[specialization]', doctorData.specialization);
  formData.append('doctor[years_of_experience]', doctorData.years_of_experience);
  formData.append('doctor[price_per_appointment]', doctorData.price_per_appointment);

  if (doctorData.images) {
    for (let i = 0; i < doctorData.images.length; i += 1) {
      formData.append('doctor[images][]', doctorData.images[i]);
    }
  }

  if (userId) {
    formData.append('doctor[user_id]', userId);
  } else {
    throw new Error('User is not logged in.');
  }

  return formData;
};

export default createDoctorFormData;
