import React from "react";
import Tableau from "../../../../components/tableau/tableau";
import Filtrer from "../../../../components/filtrer/filtrer";
import Trier from "../../../../components/trier/trier.jsx";
import "./entreesStyle.css";

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

  const OnEditHandler = () => {

  };

  const onDeleteHandler = () => {
    
  };

  return (
    <div className="entrees-view">
      <div className="header">

      </div>
      <div className="option">
        <div className="boutton-ajouter-medicament">
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