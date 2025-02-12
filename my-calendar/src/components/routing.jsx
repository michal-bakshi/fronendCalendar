import { Route, Routes } from "react-router-dom"
import {Login} from './login'
import {Registration} from './registration'
import { HomePage } from "./homePage"
import { ShowMonth } from "./showMonth"
import { AddEvent } from "./addEvent"
import {ShowYourEvents} from './showYourEvents'
import { VeriftEmail } from "./verifyEmail"
import { CheckYourEmail } from "./checkYourEmail"
import { ShowWeek } from "./showWeek"
export const Routing=()=>{
    return <Routes>
        <Route path="my_login" element={<Login></Login>}></Route>
        <Route path="my_registration" element={<Registration></Registration>}></Route>
        <Route path="/" element={<HomePage></HomePage>} ></Route>
        <Route path="my_add_event" element={<AddEvent></AddEvent>}></Route>
        <Route path="my_show_month" element={<ShowMonth></ShowMonth>}></Route>
        {/* <Route path="my_events" element={<ShowYourEvents></ShowYourEvents>}></Route> */}
        <Route path="verify" element={<VeriftEmail></VeriftEmail>}></Route>
        <Route path="checkYourEmail" element={<CheckYourEmail></CheckYourEmail>}></Route>
        <Route path="showWeek" element={<ShowWeek></ShowWeek>}></Route>

    </Routes>
}