import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import Tableau from "../../../../components/tableau/tableau";
import Filtrer from "../../../../components/filtrer/filtrer";
import Trier from "../../../../components/trier/trier.jsx";
import "./entreesStyle.css";
import FormAjouterMedicament from "../../../../components/formAjouterMedicament/formAjouterMedicament";
import CustomAlert from "../../../../components/customAlert/customAlert";
import FormFiltrerMedicament from "../../../../components/formFiltrerMedicament/formFiltrerMedicament";
import FormTrierMedicament from "../../../../components/formTrierMedicament/formTrierMedicament";
import getEnvironnement from "../../../../environnement";
import Pagination from "../../../../components/pagination/pagination";
import Avatar from "../../../../components/avatar/avater";
import logo from "../../../../assets/images/pharma.png";

function EntreesView() {

  const [medicaments, setMedicaments] = useState([]);  
  const [openForm, setOpenForm] = useState(false);
  const [openFormFiltre, setOpenFormFiltre] = useState(false);
  const [openFormTrie, setOpenFormTrie] = useState(false);
  const [openAlertAdd, setOpenAlertAdd] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [error, setError] = useState(null);
  const [errorFiltre, setErrorFiltre] = useState(null);
  const [errorTrie, setErrorTrie] = useState(null);
  const [numberLeft, setNumberLeft] = useState(1);
  const [numberRight, setNumberRight] = useState(5);
 
  const [image, setImage] = useState(`${getEnvironnement().BACKEND_URL}/storage/default-profile.jpg`);
  const [nom, setNom] = useState("admin");
  const [prenom, setPrenom] = useState("admin");

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/entrees`)
      .then((response) => setMedicaments(response.data));
  }, []);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/users/1`)
      .then((response) => {
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setImage(`${getEnvironnement().BACKEND_URL}/storage/${response.data.image_profile}`);
      });
  }, []);

  const onValidateFilterHandler = () => {
    setErrorFiltre({commencePar: "erreur", DateEgaleA: "erreur categorie"});
    setMessageAlert("le filtre a bien été modifié");
    setOpenAlertAdd(true);
    setOpenFormFiltre(false);
  };

  const onDeleteFilterHandler = () => {
    setMessageAlert("le filtre a bien été supprimé");
    setOpenAlertAdd(true);
    setOpenFormFiltre(false);
  };

  const onValidateTrierHandler = () => {
    setErrorTrie({commencePar: "erreur", DateEgaleA: "erreur categorie"});
    setMessageAlert("le trie a bien été modifié");
    setOpenAlertAdd(true);
    setOpenFormTrie(false);
  };

  const onDeleteTrierHandler = () => {
    setMessageAlert("le trie a bien été supprimé");
    setOpenAlertAdd(true);
    setOpenFormTrie(false);
  };

  const onAddHandler = (date, categorie, autreCategorie, conditionnement, designation, peremption, quantite) => {
    setOpenBackdrop(true);
    setOpenForm(false);
    const url = `${getEnvironnement().API_URL}/entrees`;
    let categorie_input = categorie;
    if (categorie === "AUTRE") {
      categorie_input = autreCategorie;
    }
    const body = {
      date,
      categorie: categorie_input,
      conditionnement,
      designation,
      peremption,
      quantite
    };
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };
    axios.post(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          setMedicaments(response.data.medicaments);
          if (response.data.medicaments.length % 5 === 0) {
            setNumberLeft(response.data.medicaments.length - 4);
          } else {
            setNumberLeft(response.data.medicaments.length - (response.data.medicaments.length % 5) + 1);
          }
          setNumberRight(response.data.medicaments.length);
          setTimeout(() => setOpenBackdrop(false), 800);
          setMessageAlert("le médicament a bien été ajouté");
          setTimeout(() => setOpenAlertAdd(true), 800);
          setTimeout(() => setOpenAlertAdd(false), 3500);

        } else if (response.data.status === "error") {
          setError(response.data.error);
          setOpenBackdrop(false);
          setOpenForm(true);
        }
      })
      .catch((err) => console.log(err.response.data.message));

  };

  const OnEditHandler = () => {

  };

  const onDeleteHandler = () => {
    
  };

  const pagination = (action) => {
    if (action === "left") {
      numberLeft === 1 ? setNumberLeft(1) : setNumberLeft(numberLeft - 5);
      numberRight <= 5 ? setNumberRight(numberRight) : numberRight % 5 === 0 ? setNumberRight(numberRight - 5) : setNumberRight(Math.floor(medicaments.length / 5) * 5);
     
    } else if (action === "right") {
      console.log(medicaments.length); 
      // numberLeft - 1 !== Math.floor(medicaments.length / 5) * 5 || numberRight !== Math.floor(medicaments.length / 5) * 5 ? setNumberLeft(numberLeft + 5) : setNumberLeft(numberLeft);
      
      numberRight === medicaments.length || medicaments.length < 5 ? setNumberLeft(numberLeft) : setNumberLeft(numberLeft + 5);
      numberRight === medicaments.length || medicaments.length < 5 ? setNumberRight(numberRight) : numberRight !== Math.floor(medicaments.length / 5) * 5 ? setNumberRight(numberRight + 5) : setNumberRight(numberRight + (medicaments.length % 5));
      
    }
  };

  return (
    <div className="entrees-view">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={() => setOpenBackdrop(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormAjouterMedicament
        open={openForm}
        handleClose={() => setOpenForm(false)}
        onClickAnnuler={() => setOpenForm(false)}
        onClickAjouter={onAddHandler}
        error={error}
      />
      <FormFiltrerMedicament
        open={openFormFiltre}
        handleClose={() => setOpenFormFiltre(false)}
        onClickAnnuler={() => setOpenFormFiltre(false)}
        onClickValider={onValidateFilterHandler}
        onClickDeleteFiltre={onDeleteFilterHandler}
        error={errorFiltre}
      />
      <FormTrierMedicament
        open={openFormTrie}
        handleClose={() => setOpenFormTrie(false)}
        onClickAnnuler={() => setOpenFormTrie(false)}
        onClickValider={onValidateTrierHandler}
        onClickDeleteTrie={onDeleteTrierHandler}
        error={errorTrie}
      />
      <div className="header">
        <Avatar image={image} nom={nom} prenom={prenom}/>
        <img className="logo" src={logo}/>
      </div>
      <CustomAlert status="success" open={openAlertAdd}>{messageAlert}</CustomAlert> 
      <div className="option">
        <div 
          className="boutton-ajouter-medicament"
          onClick={() => {
            setError(null);
            setOpenForm(true);
          }}
        >
          <p>AJOUTER UN MEDICAMENT</p>
        </div>
        <div className="filtrer-trier">
          <Trier onClickTrier={() => setOpenFormTrie(true)}/>
          <Filtrer onClickFiltrer={() => setOpenFormFiltre(true)}/>
        </div>
      </div>

      <div className="table-medicament">
        <Tableau 
          headers={["Date", "Catégorie", "Conditionnement", "Désignation", "Péremption", "Quantité"]}
          headersData={["date", "categorie", "conditionnement", "designation", "peremption", "quantite"]}
          datas={medicaments}
          debut={numberLeft}
          fin={numberRight}
          editerClick={OnEditHandler}
          supprimerClick={onDeleteHandler}
        />
      </div>
      <div className="pagination-section">
        <Pagination
          numberLeft={numberLeft}
          numberRight={numberRight}
          onClickLeft={() => pagination("left")}
          onClickRight={() => pagination("right")}
          disabledLeft={numberLeft === 1 ? true : false}
          disabledRight={numberRight === medicaments.length  || medicaments.length < 5 ? true : false}
        />
      </div>
    </div>
  );
}

export default EntreesView;