import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRecordFromServer, getRecordsFromServer } from '../slices/studentSlice';
// import { useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setselectedStudent } from '../slices/studentSlice';
import Updaterecord from './updaterecord';




export default function Component() {

    const [updateStatus, setUpdateStatus] = useState(false);

    const dispatch = useDispatch();
    // const navigate = useNavigation();


    const { records } = useSelector((state) => state.students);


    const deleteStudent = (student) => {
        dispatch(deleteRecordFromServer(student))
            // deletefunction()
            .unwrap()
            .then(() => {
                dispatch(getRecordsFromServer())
            })
    }

    const updateFunction = (task) => {
        setUpdateStatus(true)
        dispatch(setselectedStudent(task))
    }

    useEffect(() => {
        dispatch(getRecordsFromServer())
    }, [dispatch])



    return (
        <div className='table-top-container '>
            <div className='table-responsive table-container'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr className='table-row'>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Register No</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Place</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records && records.map((student, index) =>
                                <tr className='table-row' key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.registerNo}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td>{student.place}</td>
                                    <td>{student.contact}</td>
                                    <td className='btn-space'>
                                        <button type="button" onClick={() => updateFunction(student)} className="btn btn-secondary">Update</button>
                                        <button type="button" onClick={() => deleteStudent(student)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>

                            )
                        }


                    </tbody>
                </table>
            </div>
            {
                updateStatus && <Updaterecord show={updateStatus} onHide={() => setUpdateStatus(false)} />
            }

        </div>
    )
}
