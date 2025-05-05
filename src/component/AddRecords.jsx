import React, { useState } from 'react';
import { addRecordToServer } from '../slices/studentSlice';
import { useDispatch } from 'react-redux'

export default function StudentForm() {
    const [studentRec, setStudentRec] = useState({
        name: "",
        registerNo: "",
        email: "",
        age: "",
        place: "",
        contact: ""
    })

    const dispatch = useDispatch();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setStudentRec((previousState) => {
            return { ...previousState, [name]: value }
        })
    }





    const formSubmit = (e) => {
        e.preventDefault();
        if (studentRec.name && studentRec.registerNo && studentRec.email && studentRec.age && studentRec.place && studentRec.place) {
            dispatch(addRecordToServer(studentRec))
            setStudentRec( {
                name: '',
                email: '',
                registerNo : '',
                place : '',
                contact : '',
                age : ''
            })

        }

    }


    return (
        <div className='container-fluid topcont'>
            <div className="container form-container">
                <h1>Student Records Form</h1>
                <form onSubmit={formSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="inputName" className="col-lg-2 col-form-label">Name</label>
                        <div className="col-lg-10">
                            <input type="text" name='name' value={studentRec.name} onChange={handleInputs} className="form-control" id="inputName" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputRegNo" className="col-lg-2 col-form-label">RegisterNo</label>
                        <div className="col-lg-10">
                            <input type="text" name='registerNo' value={studentRec.registerNo} onChange={handleInputs} className="form-control" id="inputRegNo" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail" className="col-lg-2 col-form-label">Email</label>
                        <div className="col-lg-10">
                            <input type="email" name='email' value={studentRec.email} onChange={handleInputs} className="form-control" id="inputEmail" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputAge" className="col-lg-2 col-form-label">Age</label>
                        <div className="col-lg-10">
                            <input type="number" name='age' value={studentRec.age} onChange={handleInputs} className="form-control" id="inputAge" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPlace" className="col-lg-2 col-form-label">Place</label>
                        <div className="col-lg-10">
                            <input type="text" name='place' value={studentRec.place} onChange={handleInputs} className="form-control" id="inputPlace" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputContact" className="col-lg-2 col-form-label">Contact</label>
                        <div className="col-lg-10">
                            <input type="text" name='contact' value={studentRec.contact} onChange={handleInputs} className="form-control" id="inputContact" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 submit-column">
                            <button type="submit" className="btn submit-btn btn-primary">Add Record</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
