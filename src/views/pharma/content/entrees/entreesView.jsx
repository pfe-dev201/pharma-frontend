import React, { useState } from "react";
import Tableau from "../../../../components/tableau/tableau";
import Filtrer from "../../../../components/filtrer/filtrer";
import Trier from "../../../../components/trier/trier.jsx";
import "./entreesStyle.css";
import FormAjouterMedicament from "../../../../components/formAjouterMedicament/formAjouterMedicament";
import CustomAlert from "../../../../components/customAlert/customAlert";

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
  const [openAlertAdd, setOpenAlertAdd] = useState(false);
  const [error, setError] = useState(null);

  const onAddHandler = () => {
    setError({conditionnement: "erreur", categorie: "erreur categorie"});
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
      <div className="header">

      </div>
      <CustomAlert status="success" open={openAlertAdd}>le médicament a bien été ajouté</CustomAlert> 
      <div className="option">
        <div className="boutton-ajouter-medicament" onClick={() => setOpenForm(true)}>
          <p>AJOUTER UN MEDICAMENT</p>
        </div>
        <div className="filtrer-trier">
          <Trier />
          <Filtrer />
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