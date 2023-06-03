import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as RapportIcon } from "../../assets/icons/rapport.svg";
import { ReactComponent as MedicammentIcon } from "../../assets/icons/medicament.svg";
import { ReactComponent as StockIcon } from "../../assets/icons/stock.svg";
import { ReactComponent as ProfilIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as SettingIcon } from "../../assets/icons/setting.svg";
import { setRole, setUser, userRoleSelector } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "./sideBar.css";

function SideBar () {
  const dispatch = useDispatch();
  const role = useSelector(userRoleSelector);
  return (
    <div className="sideBar">
      <div className="link-div">
        {role === "LIRE"
          ? <></>
          : (
            <>
              <NavLink className="link" to="entrees">
                <MedicammentIcon className="sideIcon"/>
                <span className="link-title">Entrées</span>
              </NavLink>
              <NavLink className="link" to="sorties">
                <MedicammentIcon className="sideIcon"/>
                <span className="link-title">Sorties</span>
              </NavLink>
            </>
          )
        }
        <NavLink className="link" to="stock">
          <StockIcon className="sideIcon"/>
          <span className="link-title">Stock</span>
        </NavLink>
        <NavLink className="link" to="rapport">
          <RapportIcon className="sideIcon"/>
          <span className="link-title">Rapport</span>
        </NavLink>
        <NavLink className="link" to="profil">
          <ProfilIcon className="sideIcon"/>
          <span className="link-title">Profil</span>
        </NavLink>
        {role === "ECRIRE-LIRE" 
          ? (
            <NavLink className="link" to="reglages">
              <SettingIcon className="sideIcon"/>
              <span className="link-title">Réglages</span>
            </NavLink>
          )
          : <></>
        }
      </div>
      <Link
        className="link deconnexion"
        to="/"
        onClick={() => {
          dispatch(setUser(null));
          dispatch(setRole("ECRIRE"));
        }}
      >
        <span className="link-title">Déconnexion</span>
      </Link>
    </div>
  );
}

export default SideBar;