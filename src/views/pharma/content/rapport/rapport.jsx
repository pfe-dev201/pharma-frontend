import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Avatar from "../../../../components/avatar/avatar";
import axios from "axios";
import getEnvironnement from "../../../../environnement";
import logo from "../../../../assets/images/pharma.png";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import FormFilterRapport from "../../../../components/formFilterRapport/formFilterRapport";
import "./rapport.css";



function Rapport() {
  const data = [
    { name: "Jan", entree: 19, sortie: 25 },
    { name: "Feb", entree: 11, sortie: 23 },
    { name: "Mar", entree: 30, sortie: 18 },
    { name: "Avr", entree: 11, sortie: 23 },
    { name: "Mai", entree: 0, sortie: 0 },
    { name: "Jui", entree: 0, sortie: 0 },
    { name: "Jul", entree: 0, sortie: 0 },
    { name: "Aou", entree: 23, sortie: 18 },
    { name: "Sep", entree: 11, sortie: 22 },
    { name: "Oct", entree: 0, sortie: 0 },
    { name: "Nov", entree: 11, sortie: 13 },
    { name: "Dec", entree: 0, sortie: 0 }
  ];

  const [image, setImage] = useState(`${getEnvironnement().BACKEND_URL}/storage/default-profile.jpg`);
  const [nom, setNom] = useState("admin");
  const [prenom, setPrenom] = useState("admin");

  const [openFormTrie, setOpenFormTrie] = useState(false);
  const [errorTrie, setErrorTrie] = useState(null);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/users/1`)
      .then((response) => {
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setImage(`${getEnvironnement().BACKEND_URL}/storage/${response.data.image_profile}`);
        setErrorTrie(response.data.error);
      });
  }, []);

  return (
    <div className="entrees-view">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      // open={openBackdrop}
      // onClick={() => setOpenBackdrop(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormFilterRapport
        open={openFormTrie}
        optionsTrierPar={["Médicament","Médicament2","Médicament3","Médicament4"]}
        handleClose={() => setOpenFormTrie(false)}
        onClickValider={() => false}
        onClickAnnuler={() => setOpenFormTrie(false)}
        error={errorTrie}
      />
      <div className="header">
        <Avatar image={image} nom={nom} prenom={prenom} />
        <img className="logo" src={logo} />
      </div>
      {/* <CustomAlert status="success" open={openAlertAdd}>{messageAlert}</CustomAlert> */}
      <div className="option-rapport">
        <div
          className="boutton-filtrer-rapport"
          onClick={() => {
            setOpenFormTrie(true);
            setErrorTrie(null);
          }}
        >
          <p>CONFIGURATION DU RAPPORT</p>
        </div>
      </div>
      <div className="option-rapport">
        <p className="desc">Variation des quantité “<span className="medicament-name">ALDOPA</span>” en fonction des Quantité</p>
      </div>
      <div className="table-medicament">
        <BarChart width={1300} height={450} data={data} barGap={0}>
          <XAxis dataKey="name" stroke="#000" tick={{ fontSize: 36, fontWeight: 400, fontFamily: "Inder", lineHeight: 45 }} />
          <YAxis tickCount={4} tick={{ fontSize: 36, fontWeight: 400, fontFamily: "Inder", color: "#000" }} />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#FFF8" }} />
          <CartesianGrid stroke="#9D0F0F" strokeDasharray="6 6" vertical={false} />
          <Bar dataKey="entree" fill="#A70505" barSize={33} />
          <Bar dataKey="sortie" fill="#4B7D4A" barSize={33} />
        </BarChart>
      </div>
    </div>
  );
}

export default Rapport;