import { useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { addNewEvent, handleMyEvents } from "./axios/dateAxios";
import { useDispatch, useSelector } from 'react-redux';
import { addEventAction, changeButton } from "./redux/actions/dateAction";

export const AddEvent=()=>{
 // const isButtonClicked=useSelector(x=>x.dates.isButtonClicked)
  // const events=useSelector(x=>x.dates.getMyEvents|| [])
console.log(new Date().toLocaleDateString('he-IL-u-ca-hebrew', { year: 'numeric' }));

  const myD=useDispatch()
  const tokenString=useSelector(x=>x.users.tokenString)
  const navigate = useNavigate();
const[obj,setObg]=useState({
    day:"",  
    month:"",
    year:new Date().toLocaleDateString('he-IL-u-ca-hebrew', { year: 'numeric' }),
    desc:"",
    remainder:"never",
    token:tokenString,
    color:"alere-warning"
})
  
// useEffect(() => {
//   if (isButtonClicked==true ) {
//     navigate('/my_show_month');
//     myD(changeButton(false))
//   }
// }, [isButtonClicked]);

const handleNewEvent=(e)=>{
  e.preventDefault()
   addNewEvent(obj)
   .then((x)=>{
        console.log(x)
        myD(addEventAction(x.data));
        myD(changeButton(true));
        navigate('/my_show_month')
    })
   
   .catch((err)=>console.log(err))
}
    return<>
    <h1>הוספת ארוע</h1>
    <form className="container " onSubmit={(e)=>handleNewEvent(e)}>
    <div className="mb-3">
       {/* <label htmlFor="year" className="form-label">שנה עברית</label> */}
       {/* <input type="hidden" value={new Date().toLocaleDateString('he-IL-u-ca-hebrew', { year: 'numeric' })} onChange={(x) => setObg({ ...obj, year: x.target.value })} /> */}
    </div>
    <div className="mb-3">
      <label htmlFor="monthselected" className="form-label">חודש</label>
      <select name="month" id="monthselected" className="form-select" onBlur={(x)=>setObg({...obj,month:x.target.value})} required>
        <option value="Tishrei">תשרי</option>
        <option value="Cheshvan"> חשוון</option>
        <option value="Kislev"> כסלו</option>
        <option value="Tevet"> טבת</option>
        <option value="Sh'vat"> שבט</option>
        <option value="Adar"> אדר</option>
        <option value="Adar1"> אדר א</option>
        <option value="Adar2"> אדר ב</option>
        <option value="Nisan"> ניסן</option>
        <option value="Iyyar"> אייר</option>
        <option value="Sivan"> סיון</option>
        <option value="Tamuz"> תמוז</option>
        <option value="Av"> אב</option>
        <option value="Elul"> אלול</option>
      </select>
    </div>

    <div className="mb-3"  >
      <label htmlFor="dayselected" className="form-label">יום</label>
      <select name="day" id="dayselected" className="form-select"  onBlur={(x)=>(setObg({...obj,day:x.target.value}))} required>
        <option value="1"> א</option>
        <option value="2"> ב</option>
        <option value="3"> ג</option>
        <option value="4"> ד</option>
        <option value="5"> ה</option>
        <option value="6 "> ו</option>
        <option value="7"> ז</option>
        <option value="8"> ח</option>
        <option value="9"> ט</option>
        <option value="10 "> י</option>
        <option value="11"> י"א</option>
        <option value="12"> י"ב</option>
        <option value="13"> י"ג</option>
        <option value="14"> י"ד</option>
        <option value="15"> ט"ו</option>
        <option value="16"> ט"ז</option>
        <option value="17"> י"ז</option>
        <option value="18"> י"ח</option>
        <option value="19"> י"ט</option>
        <option value="20"> כ</option>
        <option value="21"> כ"א</option>
        <option value="22"> כ"ב</option>
        <option value="23"> כ"ג</option>
        <option value="24"> כ"ד</option>
        <option value="25"> כ"ה</option>
        <option value="26"> כ"ו</option>
        <option value="27"> כ"ז</option>
        <option value="28"> כ"ח</option>
        <option value="29"> כ"ט</option>
        <option value="30"> ל</option>
      </select>
    </div>

    <div className="mb-3">
      <label htmlFor="event" className="form-label">תאור</label>
      <input id="event" className="form-control" type="text"  placeholder=" תאור הארוע..." onBlur={(x)=>setObg({...obj,desc:x.target.value})} required/>
    </div>

    <div className="mb-3">
      <label htmlFor="reminderElement" className="form-label">תזכורת</label>
      <select name="reminder" id="reminderElement" className="form-select" onBlur={(x)=>setObg({...obj,remainder:x.target.value})} required>
        <option value="yearly">מידי שנה</option>
        <option value="once">פעם אחת</option>
        <option value="never">אף פעם</option>
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="colorEvent" className="form-label">צבע</label>
      <select name="color" id="colorEvent" className="form-select" onBlur={(x)=>setObg({...obj,color:x.target.value})} required>
        <option value="alert-danger">אדום</option>
        <option value="alert-success"> ירוק</option>
        <option value="alert-warning">צהוב </option>
        <option value="alert-secondary">אפור </option>
      </select>
    </div>

  <div className="text-center">
    <button type="submit" className="btn btn-primary">הוספה</button>
  </div>
</form>
    
    </>
}