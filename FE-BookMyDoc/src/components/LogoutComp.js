import { useDispatch } from "react-redux";
import { logout } from "./slice";
import { useNavigate } from "react-router-dom";


export default function LogoutComp(){

    const navigate=useNavigate();
    const reduxAction=useDispatch();
    localStorage.clear();
    reduxAction(logout());      // loggedIn : false  -  main menu will be visible
    navigate("/");

}