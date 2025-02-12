import { NavLink } from "react-router-dom";

export const MonthVSweek = () => {
  return <>
    <div className="btn-group" role="group">
      {/* Week Button */}
      <NavLink
        to="/showWeek"
        className={({ isActive }) =>
          `btn btn-outline-primary ${isActive ? 'border-2' : 'border-0'}`
        }
        style={{
          transition: 'all 0.2s ease-in-out',
        }}
      >
        שבוע
      </NavLink>

      {/* Month Button */}
      <NavLink
        to="/my_show_month"
        className={({ isActive }) =>
          `btn btn-outline-primary ${isActive ? 'border-2' : 'border-0'}`
        }
        style={{
          transition: 'all 0.2s ease-in-out',
        }}
      >
        חודש
      </NavLink>
    </div>
    </>
}
