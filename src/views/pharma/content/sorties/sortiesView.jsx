import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import Tableau from "../../../../components/tableau/tableau";
import Filtrer from "../../../../components/filtrer/filtrer";
import Trier from "../../../../components/trier/trier.jsx";
import "./sortiesStyle.css";
import FormAjouterMedicamentSortie from "../../../../components/formAjouterMedicamentSortie/formAjouterMedicamentSortie";
import FormModifierMedicamentSortie from "../../../../components/formAjouterMedicamentSortie/formAjouterMedicamentSortie";
import CustomAlert from "../../../../components/customAlert/customAlert";
import FormFiltrerMedicament from "../../../../components/formFiltrerMedicament/formFiltrerMedicament";
import FormTrierMedicament from "../../../../components/formTrierMedicament/formTrierMedicament";
import getEnvironnement from "../../../../environnement";
import Pagination from "../../../../components/pagination/pagination";
import Avatar from "../../../../components/avatar/avatar";
import logo from "../../../../assets/images/pharma.png";

function SortiesView() {

  const [medicaments, setMedicaments] = useState([]);
  const [modifiedMedicament, setModifiedMedicament] = useState({});
  const [isModifierMedicament, setIsModifierMedicament] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openFormModifier, setOpenFormModifier] = useState(false);
  const [openFormFiltre, setOpenFormFiltre] = useState(false);
  const [openFormTrie, setOpenFormTrie] = useState(false);
  const [openAlertAdd, setOpenAlertAdd] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [error, setError] = useState(null);
  const [errorModifier, setErrorModifier] = useState(null);
  const [errorFiltre, setErrorFiltre] = useState(null);
  const [errorTrie, setErrorTrie] = useState(null);
  const [numberLeft, setNumberLeft] = useState(1);
  const [numberRight, setNumberRight] = useState(5);
 
  const [image, setImage] = useState(`${getEnvironnement().BACKEND_URL}/storage/default-profile.jpg`);
  const [nom, setNom] = useState("admin");
  const [prenom, setPrenom] = useState("admin");

  const [filtrerParConfig, setFiltrerParConfig] = useState();
  const [typeFiltreConfig, setTypeFiltreConfig] = useState();
  const [dateSuperieurAConfig, setDateSuperieurAConfig] = useState();
  const [dateInferieurAConfig, setDateInferieurAConfig] = useState();
  const [dateEgaleAConfig, setDateEgaleAConfig] = useState();
  const [egaleAConfig, setEgaleAConfig] = useState();
  const [commenceParConfig, setCommenceParConfig] = useState();
  const [termineParConfig, setTermineParConfig] = useState();
  const [inferieurAConfig, setInferieurAConfig] = useState();
  const [superieurAConfig, setSuperieurAConfig] = useState();
  const [trierParConfig, setTrierParConfig] = useState("DATE");
  const [typeTrieConfig, setTypeTrieConfig] = useState("ASC");
  const [isFiltre, setIsFiltre] = useState(false);
  const [isTrie, setIsTrie] = useState(false);
  const [clearFiltre, setClearFiltre] = useState(false);
  const [clearTrie, setClearTrie] = useState(false);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/sorties`)
      .then((response) => setMedicaments(response.data));
  }, []);

  useEffect(() => {
    if (!isTrie && !isFiltre) {
      axios.get(`${getEnvironnement().API_URL}/sorties`)
        .then((response) => setMedicaments(response.data));
    } else if (!isFiltre) {
      onValidateTrierHandler(trierParConfig, typeTrieConfig);
    } else if (!isTrie) {
      onValidateFilterHandler(filtrerParConfig, typeFiltreConfig, dateSuperieurAConfig, dateInferieurAConfig, dateEgaleAConfig, egaleAConfig, commenceParConfig, termineParConfig, inferieurAConfig, superieurAConfig);
    }
    if (clearTrie && clearFiltre) {
      setClearTrie(false);
      setClearFiltre(false);
    } else if (clearFiltre) {
      setClearFiltre(false);
    } else if (clearTrie) {
      setClearTrie(false);
    }
  }, [clearFiltre, clearTrie]);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/users/1`)
      .then((response) => {
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setImage(`${getEnvironnement().BACKEND_URL}/storage/${response.data.image_profile}`);
      });
  }, []);

  useEffect(() => {
    if (isModifierMedicament) {
      setOpenFormModifier(true);
      setIsModifierMedicament(false);
    }
  }, [isModifierMedicament, modifiedMedicament]);

  const onValidateFilterHandler = (filtrerPar, typeFiltre, dateSuperieurA, dateInferieurA, dateEgaleA, egaleA, commencePar, terminePar, inferieurA, superieurA) => {
    setOpenBackdrop(true);
    
    const url = `${getEnvironnement().API_URL}/sorties/filtre`;
    let body = {
      filtrerPar, typeFiltre, dateSuperieurA, dateInferieurA, dateEgaleA, egaleA, commencePar, terminePar, inferieurA, superieurA
    };
    if (isTrie) {
      body = {
        medicaments, filtrerPar, typeFiltre, dateSuperieurA, dateInferieurA, dateEgaleA, egaleA, commencePar, terminePar, inferieurA, superieurA
      };
    }
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };

    axios.post(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          setFiltrerParConfig(filtrerPar);
          setTypeFiltreConfig(typeFiltre);
          setDateSuperieurAConfig(dateSuperieurA);
          setDateInferieurAConfig(dateInferieurA);
          setDateEgaleAConfig(dateEgaleA);
          setEgaleAConfig(egaleA);
          setCommenceParConfig(commencePar);
          setTermineParConfig(terminePar);
          setInferieurAConfig(inferieurA);
          setSuperieurAConfig(superieurA);
          const tableauMedicaments = Object.keys(response.data.medicaments).map(key => response.data.medicaments[key]);
          setMedicaments(tableauMedicaments);
          setIsFiltre(true);
          setNumberLeft(1);
          setNumberRight(5);
          setTimeout(() => setOpenBackdrop(false), 800);
          setMessageAlert(response.data.message);
          setTimeout(() => setOpenAlertAdd(true), 800);
          setTimeout(() => setOpenAlertAdd(false), 3500);
          setOpenFormFiltre(false);
        } else if (response.data.status === "error") {
          setErrorFiltre(response.data.error);
          setOpenBackdrop(false);
          setOpenFormFiltre(true);
        }
      });
  };

  const onDeleteFilterHandler = () => {
    setOpenFormFiltre(false);
    setOpenBackdrop(true);
    setClearFiltre(true);
    setIsFiltre(false);
    setNumberLeft(1);
    setNumberRight(5);
    setTimeout(() => setOpenBackdrop(false), 800);
    setMessageAlert("le filtre a bien été supprimé");
    setTimeout(() => setOpenAlertAdd(true), 800);
    setTimeout(() => setOpenAlertAdd(false), 3500);
  };

  const onValidateTrierHandler = (trierPar, typeTrie) => {
    setOpenBackdrop(true);
    
    const url = `${getEnvironnement().API_URL}/sorties/trie`;
    let body = {
      trierPar, typeTrie
    };
    if (isFiltre) {
      body = {
        medicaments, trierPar, typeTrie
      };
    }
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };

    axios.post(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          setTrierParConfig(trierPar);
          setTypeTrieConfig(typeTrie);
          const tableauMedicaments = Object.keys(response.data.medicaments).map(key => response.data.medicaments[key]);
          if (typeTrie === "ASC") {
            setMedicaments(tableauMedicaments);
          } else if (typeTrie === "DESC") {
            setMedicaments(tableauMedicaments.reverse());
          }
          setIsTrie(true);
          setTimeout(() => setOpenBackdrop(false), 800);
          setMessageAlert(response.data.message);
          setTimeout(() => setOpenAlertAdd(true), 800);
          setTimeout(() => setOpenAlertAdd(false), 3500);
          setOpenFormTrie(false);
        } else if (response.data.status === "error") {
          setErrorTrie(response.data.error);
          setOpenBackdrop(false);
          setOpenFormTrie(true);
        }
      });
  };

  const onDeleteTrierHandler = () => {
    setOpenFormTrie(false);
    setOpenBackdrop(true);
    setClearTrie(true);
    setIsTrie(false);
    setTimeout(() => setOpenBackdrop(false), 800);
    setMessageAlert("le trie a bien été supprimé");
    setTimeout(() => setOpenAlertAdd(true), 800);
    setTimeout(() => setOpenAlertAdd(false), 3500);
  };

  const onAddHandler = (date, categorie, autreCategorie, designation, quantite) => {
    setOpenBackdrop(true);
    setOpenForm(false);
    const url = `${getEnvironnement().API_URL}/sorties`;
    let categorie_input = categorie;
    if (categorie === "AUTRE") {
      categorie_input = autreCategorie;
    }
    const body = {
      date,
      categorie: categorie_input,
      designation,
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
          setClearTrie(true);
          setClearFiltre(true);
          setIsTrie(false);
          setIsFiltre(false);
          setMedicaments(response.data.medicaments);
          if (response.data.medicaments.length % 5 === 0) {
            setNumberLeft(response.data.medicaments.length - 4);
          } else {
            setNumberLeft(response.data.medicaments.length - (response.data.medicaments.length % 5) + 1);
          }
          setNumberRight(response.data.medicaments.length);
          setTimeout(() => setOpenBackdrop(false), 800);
          setMessageAlert(response.data.message);
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

  const OnEditHandler = (medicament) => {
    setErrorModifier(null);
    setModifiedMedicament(medicament);
    setIsModifierMedicament(true);
  };

  const onDeleteHandler = (id) => {
    setOpenBackdrop(true);
    const url = `${getEnvironnement().API_URL}/sorties/${id}`;
    const body = {};
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };
    axios.delete(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          setTimeout(() => setOpenBackdrop(false), 800);
          if (numberRight === 5 && response.data.medicaments.length < 5) {
            setNumberRight(response.data.medicaments.length);
          } else if (numberRight >= response.data.medicaments.length + 1) {
            setNumberRight(numberRight - 1);
          }
          if (numberLeft === numberRight && numberRight !== 1) {
            setNumberLeft(numberLeft - 5);
            setNumberRight(numberRight - 1);
          }
          setMedicaments(response.data.medicaments);
          setMessageAlert(response.data.message);
          setTimeout(() => setOpenAlertAdd(true), 800);
          setTimeout(() => setOpenAlertAdd(false), 3500);
        }
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const onModifyHandler = (id, date, categorie, autreCategorie, designation, quantite) => {
    setOpenBackdrop(true);
    setOpenFormModifier(false);
    const url = `${getEnvironnement().API_URL}/sorties/${id}`;
    let categorie_input = categorie;
    if (categorie === "AUTRE") {
      categorie_input = autreCategorie;
    }
    const body = {
      date,
      categorie: categorie_input,
      designation,
      quantite
    };
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };
    axios.put(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          setMedicaments(response.data.medicaments);
          setTimeout(() => setOpenBackdrop(false), 800);
          setMessageAlert(response.data.message);
          setTimeout(() => setOpenAlertAdd(true), 800);
          setTimeout(() => setOpenAlertAdd(false), 3500);

        } else if (response.data.status === "error") {
          setErrorModifier(response.data.error);
          setOpenBackdrop(false);
          setOpenFormModifier(true);
        }
      })
      .catch((err) => console.log(err.response.data.message));
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
      <FormAjouterMedicamentSortie
        open={openForm}
        handleClose={() => setOpenForm(false)}
        onClickAnnuler={() => setOpenForm(false)}
        onClickAjouter={onAddHandler}
        error={error}
      />
      <FormModifierMedicamentSortie
        open={openFormModifier}
        handleClose={() => setOpenFormModifier(false)}
        onClickAnnuler={() => setOpenFormModifier(false)}
        onClickModifier={onModifyHandler}
        medicament={modifiedMedicament === null ? {} : modifiedMedicament}
        modifier
        error={errorModifier}
      />
      <FormFiltrerMedicament
        open={openFormFiltre}
        optionsFiltrerPar={["DATE", "CATEGORIE", "DESIGNATION", "QUANTITE"]}
        handleClose={() => setOpenFormFiltre(false)}
        onClickAnnuler={() => setOpenFormFiltre(false)}
        onClickValider={onValidateFilterHandler}
        onClickDeleteFiltre={onDeleteFilterHandler}
        error={errorFiltre}
      />
      <FormTrierMedicament
        open={openFormTrie}
        optionsTrierPar={["DATE", "CATEGORIE", "DESIGNATION", "QUANTITE"]}
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
          <Trier
            active={isTrie ? true : false}
            onClickTrier={() => {
              setOpenFormTrie(true);
              setErrorTrie(null);
            }}
          />
          <Filtrer
            active={isFiltre ? true : false}
            onClickFiltrer={() => {
              setOpenFormFiltre(true);
              setErrorFiltre(null);
            }}
          />
        </div>
      </div>

      <div className="table-medicament">
        <Tableau 
          headers={["Date", "Catégorie", "Désignation", "Quantité"]}
          headersData={["date", "categorie", "designation", "quantite"]}
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

export default SortiesView;