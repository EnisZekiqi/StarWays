import logo from './logo.svg';
import './App.css';
import Test from './Test';
import Test2 from './Test2';
import { useEffect,useState } from 'react';
import Cookies from 'js-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserForm from './UserForm';

import Example from './Example';
import Selected from './Selected';
import ExamplePt2 from './ExamplePt2';
import ExamplePt3 from './ExamplePt3';
import Home from './Home';
import Home2 from './Home2';
import { Tranquiluxe } from 'uvcanvas';
import Navbar from './Navbar';
import stars from './images/magicpattern-starry-night-1726780801258.png'
import starsDark from './images/magicpattern-starry-night-1726781065678.png'
import startLight from './images/magicpattern-starry-night-1726781255005.png'
function App() {

  const queryClient = new QueryClient();
  const [theme, setTheme] = useState('light');

  const [text,setText]=useState('Hello World')

  const toggleText = (changedText)=>{
    setText(changedText)
  }


useEffect(() => {
  const savedText = localStorage.getItem('text')
  setText(savedText)
}, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('color') || 'light';
    setTheme(savedTheme);
  }, []);

  const updateTheme = (choosenTheme) => {
    setTheme(choosenTheme);
    localStorage.setItem('color', choosenTheme);
  };

  const styles = {
    app: {
      backgroundColor: theme === 'light' ? '#eff0f1' : '#18191b',
      color: theme === 'light' ? '#000000' : '#ffffff',
      minHeight: '100vh',
      backgroundImage:theme ==='light'? startLight:starsDark
    
    },
  };

  const [selected,setSelected]=useState(null)

  const array = [
    {
      name:'enis',
      surname:'zekiqi',
      descript:'ustahi brazil ustahi i dajve '
    },
    {
      name:'enis',
      surname:'zekiqi',
     descript:'ustahi brazil ustahi i dajve part 2'
      
    }
  ]

  const handleClickShow = (item)=>{
    setSelected(item)
  }

const handleBack =()=>{
  setSelected(null)
}
/////////////



const [savedNumber,setSavedNumber]=useState('')
const[option,setOption]=useState('option3')

useEffect(() => {
  const choosenNumber = localStorage.getItem('number')

  if (choosenNumber){
    setSavedNumber(choosenNumber)
  }
}, []);

useEffect(() => {
  
const choosenOption = localStorage.getItem('option')

if (choosenOption) {
  setOption(choosenOption)
}

}, []);

const toggleChoosenNumber = (theNumber)=>{
  setSavedNumber(theNumber)

  localStorage.setItem('number',theNumber)
}

const toggleChoosenSlider=(theOption)=>{
  setOption(theOption)

  localStorage.setItem('option',theOption)
}
/////////////

const [ChoosenGender,setChoosenGender]=useState('')

useEffect(() => {
  
const savedGender = localStorage.getItem('gender')

if (savedGender) {
  setChoosenGender(savedGender)
}

}, []);

const toggleTheGender = (selectedGender)=>{
setChoosenGender(selectedGender)
localStorage.setItem('gender',selectedGender)
}


  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
      <div className={`App ${theme === 'light' ? 'theme-light' : 'theme-dark'}`} style={styles.app}>
      <Navbar theme={theme} updateTheme={updateTheme}/>
      <div className="empty3"/>
      <Home/>
      <Home2/>
      <div className="empty"></div>
      </div>
    </QueryClientProvider>
    </div>
  );
}

export default App;
