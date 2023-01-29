
/* import {useState} from 'react';

const App = ({labelOn, labelOff} : any) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className='container'>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? labelOn : labelOff}
    </label>
  );
}
 */
import '../styles/styles.css'; 

const App = () => {
    return (
      <div className='container'>        
        <h1 className="text-4xl text-amber-300">Hello!!</h1>
        <h2 className="text-2xl text-rose-600">Welcome to your First React App..!</h2>           
        <h5>(created wihthout create-react-app)</h5>
      </div>
    )  
}

export default App;
