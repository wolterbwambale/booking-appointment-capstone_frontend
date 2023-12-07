import getFormValues from './getFormValues';
import './Addform.css';

const Doctors = () => {
  const sendDoctorData = (formField) => {
    fetch('http://127.0.0.1:4000/api/v1/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formField),
    })
      .then((response) => response.json())
      .then((formField) => {
        console.log('Success:', formField);
      })
      .catch((error) => {
        throw error('Error:', error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { isEmpty, data } = getFormValues(e.currentTarget);

    if (isEmpty) {
      console.log('Please provide all values');
      return;
    }
    sendDoctorData(data);
  };

  return (
    <div className="container">
      <h2 className="header">Doctor&apos;s Details</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-25">
            Name:
          </div>
          <div className="col-75">
            <input id="name" type="text" name="name" className="form-input" />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            Specialization:
          </div>
          <div className="col-75">
            <input id="specialization" type="text" name="specialization" className="form-input" />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            Years of experience:
          </div>
          <div className="col-75">
            <input id="experience" type="text" name="years_of_experience" className="form-input" />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            Price per appointment:
          </div>
          <div className="col-75">
            <input id="price" type="text" name="price_per_appointment" className="form-input" />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            Image:
          </div>
          <div className="col-75">
            <input id="image" type="text" name="image" className="form-input" />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            User_id:
          </div>
          <div className="col-75">
            <input id="userId" type="text" name="user_id" className="form-input" />
          </div>
        </div>
        <div className="row">
          <button className="btnDoctor" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Doctors;
