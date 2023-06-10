import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import Tableau from "../../../../components/tableau/tableau";
import Filtrer from "../../../../components/filtrer/filtrer";
import Trier from "../../../../components/trier/trier.jsx";
import "./reglagesStyle.css";
import FormAjouterUser from "../../../../components/formAjouterUser/formAjouterUser";
import FormModifierUser from "../../../../components/formAjouterUser/formAjouterUser";
import CustomAlert from "../../../../components/customAlert/customAlert";
import FormFiltrerUser from "../../../../components/formFiltrer/formFiltrer";
import FormTrierUser from "../../../../components/formTrier/formTrier";
import getEnvironnement from "../../../../environnement";
import Pagination from "../../../../components/pagination/pagination";
import Avatar from "../../../../components/avatar/avatar";
import logo from "../../../../assets/images/pharma.png";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../store/userSlice";
import CustomInput from "../../../../components/customInput/customInput";

function ReglagesView() {

  const [users, setUsers] = useState([]);
  const [modifiedUser, setModifiedUser] = useState({});
  const [isModifierUser, setIsModifierUser] = useState(false);
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
  const [numberRight, setNumberRight] = useState(3);
 
  const [image, setImage] = useState(`${getEnvironnement().BACKEND_URL}/storage/default-profile.jpg`);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const [filtrerParConfig, setFiltrerParConfig] = useState();
  const [typeFiltreConfig, setTypeFiltreConfig] = useState();
  const [egaleAConfig, setEgaleAConfig] = useState();
  const [commenceParConfig, setCommenceParConfig] = useState();
  const [termineParConfig, setTermineParConfig] = useState();
  const [statusEgaleAConfig, setStatusEgaleAConfig] = useState();
  const [roleEgaleAConfig, setRoleEgaleAConfig] = useState();
  const [trierParConfig, setTrierParConfig] = useState("DATE");
  const [typeTrieConfig, setTypeTrieConfig] = useState("ASC");
  const [isFiltre, setIsFiltre] = useState(false);
  const [isTrie, setIsTrie] = useState(false);
  const [clearFiltre, setClearFiltre] = useState(false);
  const [clearTrie, setClearTrie] = useState(false);

  const [prochePerimee, setProchePerimee] = useState(0);
  const [procheTerminee, setProcheTerminee] = useState(0);
  const [errorPeriodes, setErrorPeriodes] = useState(null);

  const user = useSelector(userSelector);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/configuration`)
      .then((response) => {
        setProchePerimee(response.data.periode_proche_perimee);
        setProcheTerminee(response.data.periode_proche_terminee);
      });
  }, []);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/users`)
      .then((response) => setUsers(response.data));
  }, []);

  useEffect(() => {
    if (!isTrie && !isFiltre) {
      axios.get(`${getEnvironnement().API_URL}/users`)
        .then((response) => setUsers(response.data));
    } else if (!isFiltre) {
      onValidateTrierHandler(trierParConfig, typeTrieConfig);
    } else if (!isTrie) {
      onValidateFilterHandler(filtrerParConfig, typeFiltreConfig, egaleAConfig, commenceParConfig, termineParConfig, statusEgaleAConfig, roleEgaleAConfig);
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
    axios.get(`${getEnvironnement().API_URL}/users/${user.id}`)
      .then((response) => {
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setImage(`${getEnvironnement().BACKEND_URL}/storage/${response.data.image_profile}`);
      });
  }, []);

  useEffect(() => {
    if (isModifierUser) {
      setOpenFormModifier(true);
      setIsModifierUser(false);
    }
  }, [isModifierUser, modifiedUser]);

  const onValidateFilterHandler = (filtrerPar, typeFiltre, egaleA, commencePar, terminePar, statusEgaleA, roleEgaleA) => {
    setOpenBackdrop(true);
    setOpenFormFiltre(false);
    
    const url = `${getEnvironnement().API_URL}/users/filtre`;
    let body = {
      filtrerPar, typeFiltre, egaleA, commencePar, terminePar, statusEgaleA, roleEgaleA
    };
    console.log(body);
    if (isTrie) {
      body = {
        users, filtrerPar, typeFiltre, egaleA, commencePar, terminePar, statusEgaleA, roleEgaleA
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
          setEgaleAConfig(egaleA);
          setCommenceParConfig(commencePar);
          setTermineParConfig(terminePar);
          setStatusEgaleAConfig(statusEgaleA);
          setRoleEgaleAConfig(roleEgaleA);
          const tableauUsers = Object.keys(response.data.users).map(key => response.data.users[key]);
          setUsers(tableauUsers);
          setIsFiltre(true);
          setNumberLeft(1);
          setNumberRight(3);
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
    setNumberRight(3);
    setTimeout(() => setOpenBackdrop(false), 800);
    setMessageAlert("le filtre a bien été supprimé");
    setTimeout(() => setOpenAlertAdd(true), 800);
    setTimeout(() => setOpenAlertAdd(false), 3500);
  };

  const onValidateTrierHandler = (trierPar, typeTrie) => {
    setOpenBackdrop(true);
    
    const url = `${getEnvironnement().API_URL}/users/trie`;
    let body = {
      trierPar, typeTrie
    };
    if (isFiltre) {
      body = {
        users, trierPar, typeTrie
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
          const tableauUsers = Object.keys(response.data.users).map(key => response.data.users[key]);
          if (typeTrie === "ASC") {
            setUsers(tableauUsers);
          } else if (typeTrie === "DESC") {
            setUsers(tableauUsers.reverse());
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

  const onAddHandler = (nom, prenom, email, status, role) => {
    setOpenBackdrop(true);
    setOpenForm(false);
    const url = `${getEnvironnement().API_URL}/users`;
    const body = {
      nom,
      prenom,
      email,
      status,
      role
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
          setUsers(response.data.users);
          if (response.data.users.length % 3 === 0) {
            setNumberLeft(response.data.users.length - 2);
          } else {
            setNumberLeft(response.data.users.length - (response.data.users.length % 3) + 1);
          }
          setNumberRight(response.data.users.length);
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

  const OnEditHandler = (user) => {
    setErrorModifier(null);
    setModifiedUser(user);
    setIsModifierUser(true);
  };

  const onDeleteHandler = (id) => {
    setOpenBackdrop(true);
    const url = `${getEnvironnement().API_URL}/users/${id}`;
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
          if (numberRight === 3 && response.data.users.length < 3) {
            setNumberRight(response.data.users.length);
          } else if (numberRight >= response.data.users.length + 1) {
            setNumberRight(numberRight - 1);
          }
          if (numberLeft === numberRight && numberRight !== 1) {
            setNumberLeft(numberLeft - 3);
            setNumberRight(numberRight - 1);
          }
          setUsers(response.data.users);
          setMessageAlert(response.data.message);
          setTimeout(() => setOpenAlertAdd(true), 800);
          setTimeout(() => setOpenAlertAdd(false), 3500);
        }
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const onModifyHandler = (id, nom, prenom, email, status, role) => {
    setOpenBackdrop(true);
    setOpenFormModifier(false);
    const url = `${getEnvironnement().API_URL}/users/${id}`;
    const body = {
      nom,
      prenom,
      email,
      status,
      role
    };
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };
    axios.put(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          setUsers(response.data.users);
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
      numberLeft === 1 ? setNumberLeft(1) : setNumberLeft(numberLeft - 3);
      numberRight <= 3 ? setNumberRight(numberRight) : numberRight % 3 === 0 ? setNumberRight(numberRight - 3) : setNumberRight(Math.floor(users.length / 3) * 3);
     
    } else if (action === "right") {
      numberRight === users.length || users.length < 3 ? setNumberLeft(numberLeft) : setNumberLeft(numberLeft + 3);
      numberRight === users.length || users.length < 3 ? setNumberRight(numberRight) : numberRight !== Math.floor(users.length / 3) * 3 ? setNumberRight(numberRight + 3) : setNumberRight(numberRight + (users.length % 3));
      
    }
  };

  const enregistrerHandler = () => {
    setOpenBackdrop(true);
    const url = `${getEnvironnement().API_URL}/configuration`;
    const body = {
      prochePerimee,
      procheTerminee
    };
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };

    axios.put(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          setProchePerimee(response.data.configuration.periode_proche_perimee);
          setProcheTerminee(response.data.configuration.periode_proche_terminee);
          setTimeout(() => setOpenBackdrop(false), 800);
          setMessageAlert(response.data.message);
          setTimeout(() => setOpenAlertAdd(true), 800);
          setTimeout(() => setOpenAlertAdd(false), 3500);
          setErrorPeriodes(null);
        } else if (response.data.status === "error") {
          setErrorPeriodes(response.data.error);
          setOpenBackdrop(false);
        }
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="reglages-view">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={() => setOpenBackdrop(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormAjouterUser
        open={openForm}
        handleClose={() => setOpenForm(false)}
        onClickAnnuler={() => setOpenForm(false)}
        onClickAjouter={onAddHandler}
        error={error}
      />
      <FormModifierUser
        open={openFormModifier}
        handleClose={() => setOpenFormModifier(false)}
        onClickAnnuler={() => setOpenFormModifier(false)}
        onClickModifier={onModifyHandler}
        user={modifiedUser === null ? {} : modifiedUser}
        modifier
        error={errorModifier}
      />
      <FormFiltrerUser
        open={openFormFiltre}
        optionsFiltrerPar={["NOM", "PRENOM", "EMAIL", "STATUS", "ROLE"]}
        handleClose={() => setOpenFormFiltre(false)}
        onClickAnnuler={() => setOpenFormFiltre(false)}
        onClickValider={onValidateFilterHandler}
        onClickDeleteFiltre={onDeleteFilterHandler}
        isUser
        error={errorFiltre}
      />
      <FormTrierUser
        open={openFormTrie}
        optionsTrierPar={["NOM", "PRENOM", "EMAIL", "STATUS", "ROLE"]}
        handleClose={() => setOpenFormTrie(false)}
        onClickAnnuler={() => setOpenFormTrie(false)}
        onClickValider={onValidateTrierHandler}
        onClickDeleteTrie={onDeleteTrierHandler}
        isUser
        error={errorTrie}
      />
      <div className="header">
        <Avatar image={image} nom={nom} prenom={prenom}/>
        <img className="logo" src={logo}/>
      </div>
      <CustomAlert status="success" open={openAlertAdd}>{messageAlert}</CustomAlert>
      <div className="reglages-periodes">
        <Grid container>
          <Grid item xs={5}>
            <CustomInput
              type="number"
              id="prochePerimee"
              name="prochePerimee"
              error={errorPeriodes !== null ? errorPeriodes.prochePerimee ? true : false : false}
              textError={errorPeriodes !== null ? errorPeriodes.prochePerimee ? errorPeriodes.prochePerimee : [] : []}
              value={prochePerimee}
              placeholder="Période proche perimée"
              inputLabel="Proche périmée"
              onChangeValue={(e) => setProchePerimee(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <CustomInput
              type="number"
              id="procheTerminee"
              name="procheTerminee"
              error={errorPeriodes !== null ? errorPeriodes.procheTerminee ? true : false : false}
              textError={errorPeriodes !== null ? errorPeriodes.procheTerminee ? errorPeriodes.procheTerminee : [] : []}
              value={procheTerminee}
              placeholder="Période proche términée"
              inputLabel="Proche términée"
              onChangeValue={(e) => setProcheTerminee(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <div
              className="boutton-enregistrer-periode"
              onClick={enregistrerHandler}
            >
              <p>VALIDER</p>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="reglages-users">
        <div className="option">
          <div 
            className="boutton-ajouter-user"
            onClick={() => {
              setError(null);
              setOpenForm(true);
            }}
          >
            <p>N UTILISATEUR</p>
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

        <div className="table-user">
          <Tableau 
            headers={["Nom", "Prenom", "Email", "Status", "Role"]}
            headersData={["nom", "prenom", "email", "status", "typeRole"]}
            datas={users}
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
            disabledRight={numberRight === users.length  || users.length < 3 ? true : false}
          />
        </div>
      </div>
    </div>
  );
}

export default ReglagesView;