import React, { useState } from "react";
import Tableau from "../../../../components/tableau/tableau";
import Filtrer from "../../../../components/filtrer/filtrer";
import Trier from "../../../../components/trier/trier.jsx";
import "./entreesStyle.css";
import FormAjouterMedicament from "../../../../components/formAjouterMedicament/formAjouterMedicament";
import CustomAlert from "../../../../components/customAlert/customAlert";
import FormFiltrerMedicament from "../../../../components/formFiltrerMedicament/formFiltrerMedicament";
import FormTrierMedicament from "../../../../components/formTrierMedicament/formTrierMedicament";

function EntreesView() {
  const medicament = {
    id: 1,
    Date: "16-04-23",
    Catégorie: "DIABETE",
    Conditionnement: "30CP",
    Désignation: "ALDOPALE",
    Péremption: "16-04-25",
    Quantité: 25
  };

  const [openForm, setOpenForm] = useState(false);
  const [openFormFiltre, setOpenFormFiltre] = useState(false);
  const [openFormTrie, setOpenFormTrie] = useState(false);
  const [openAlertAdd, setOpenAlertAdd] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [error, setError] = useState(null);
  const [errorFiltre, setErrorFiltre] = useState(null);
  const [errorTrie, setErrorTrie] = useState(null);

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

  const onAddHandler = () => {
    setError({conditionnement: "erreur", categorie: "erreur categorie"});
    setMessageAlert("le médicament a bien été ajouté");
    setOpenAlertAdd(true);
    setOpenForm(false);
  };

  const OnEditHandler = () => {

  };

  const onDeleteHandler = () => {
    
  };

  return (
    <div className="entrees-view">
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
        onClickDeleteFiltre={onDeleteTrierHandler}
        error={errorTrie}
      />
      <div className="header">

      </div>
      <CustomAlert status="success" open={openAlertAdd}>{messageAlert}</CustomAlert> 
      <div className="option">
        <div className="boutton-ajouter-medicament" onClick={() => setOpenForm(true)}>
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
          datas={[medicament, medicament,medicament, medicament,medicament]}
          debut={1}
          fin={5}
          editerClick={OnEditHandler}
          supprimerClick={onDeleteHandler}
        />
      </div>
      <div className="pagination">

      </div>
    </div>
  );
}

export default EntreesView;