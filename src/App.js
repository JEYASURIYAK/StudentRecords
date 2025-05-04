import './App.css';
import StudentForm from './component/AddRecords';
import Component from './component/component';
import { Provider } from 'react-redux';
import { store } from './store';
// import Updaterecord from './component/updaterecord';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <StudentForm />
        <Component />
      </div>
    </Provider>
  );
}

export default App;
