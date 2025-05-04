import React, { useEffect, useState } from 'react';
import '../App.css';
import { updateRecordInServer } from '../slices/studentSlice';
import { useDispatch, useSelector } from 'react-redux';


const Updaterecord = (props) => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [regNo,setRegNo] = useState('');
    const [age,setAge] = useState('');
    const [place,setPlace] = useState('');
    const [contact,setContact] = useState('');
    const [id,setId] = useState()


    const {selectedStudent} = useSelector((state) => state.students)
    const dispatch = useDispatch();

    const updateRecord = () => {
        props.onHide();
        dispatch(updateRecordInServer({name,regNo,email,age,place,contact,id}))
        

    }

    useEffect(() => {
        if(Object.keys(selectedStudent).length !==0){
            setName(selectedStudent.name)
            setRegNo(selectedStudent.registerNo)
            setEmail(selectedStudent.email)
            setAge(selectedStudent.age)
            setPlace(selectedStudent.place)
            setContact(selectedStudent.contact)
            setId(selectedStudent.id)
        }

    },[selectedStudent])

    
    const cancelRecord = () => {
        props.onHide()

    }



    return <>
        <div className="App">
            <div className='container-fluid modal update-container' {...props}>
                <div className="container form-container update-form-container">
                    <div className="modal-header">
                    <h1 className='modal-title'>Update Records</h1>
                    </div>
                    <div className="modal-body">
                    <form >
                        <div className="row mb-3 form-g">
                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="inputName" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputRegNo" className="col-sm-2 col-form-label">RegisterNo</label>
                            <div className="col-sm-10">
                                <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} className="form-control" id="inputRegNo" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputAge" className="col-sm-2 col-form-label">Age</label>
                            <div className="col-sm-10">
                                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control" id="inputAge" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPlace" className="col-sm-2 col-form-label">Place</label>
                            <div className="col-sm-10">
                                <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} className="form-control" id="inputPlace" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputContact" className="col-sm-2 col-form-label">Contact</label>
                            <div className="col-sm-10">
                                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} className="form-control" id="inputContact" />
                            </div>
                        </div>
                    </form>
                    </div>
                    
                        <div className="row modal-footer">
                            <div className="col-12 submit-column ">
                                <button type="submit" onClick={(e) => updateRecord(e)} className="btn submit-btn btn-primary">Update Record</button>
                                <button type="submit" onClick={() => cancelRecord()} className="btn submit-btn btn-primary">Cancel</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </>
}

export default Updaterecord;
