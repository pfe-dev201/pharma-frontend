import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, Grid } from "@mui/material";
import CustomInput from "../customInput/customInput";
import "./formConfigurationStockStyle.css";
import axios from "axios";
import getEnvironnement from "../../environnement";


function FormConfigurationStock({ open, handleClose, onClickConfigurer, onClickAnnuler, error }) {

  const getDate = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  const [chercherPar, setChercherPar] = useState("SITUATION GLOBALE");
  const [dateDuJour, setDateDuJour] = useState(getDate());
  const [produit, setProduit] = useState("CHOISIR UN PRODUIT");
  const [categorie, setCategorie] = useState("CHOISIR UNE CATEGORIE");

  const [optionsCategorie, setOptionsCategorie] = useState(["CHOISIR UNE CATEGORIE"]);
  const [optionsProduit, setOptionsProduit] = useState(["CHOISIR UN PRODUIT"]);

  useEffect(() => {
    axios.post(`${getEnvironnement().API_URL}/stock/getOptions`)
      .then((response) => {
        setOptionsProduit(response.data.produits);
        setOptionsCategorie(response.data.categories);
      });
  }, []);

  const resetForm = () => {
    setChercherPar("SITUATION GLOBALE");
    setDateDuJour(getDate());
    setProduit("CHOISIR UN PRODUIT");
    setCategorie("CHOISIR UNE CATEGORIE");
  };

  return (
    <Dialog
      onClose={() => {
        resetForm();
        handleClose();
      }}
      open={open}
      fullWidth
    >
      <DialogTitle>Configuration du stock :</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <CustomInput 
              isSelect
              id="chercherPar"
              name="chercherPar"
              inputLabel="Chercher par :"
              options={["SITUATION GLOBALE", "DESIGNATION", "CATEGORIE"]}
              error={error !== null ? error.chercherPar ? true : false : false}
              textError={error !== null ? error.chercherPar ? error.chercherPar : [] : []}
              value={chercherPar}
              onChangeValue={(e) => {
                setChercherPar(e.target.value);
              }}
            /> 
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <CustomInput
              type="date"
              id="dateDuJour"
              name="dateDuJour"
              error={error !== null ? error.dateDuJour ? true : false : false}
              textError={error !== null ? error.dateDuJour ? error.dateDuJour : [] : []}
              value={dateDuJour}
              inputLabel="Date du jour :"
              onChangeValue={(e) => {
                setDateDuJour(e.target.value);
              }}
              disabled
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <CustomInput 
              isSelect
              id="produit"
              name="produit"
              inputLabel="Produit :"
              options={optionsProduit}
              error={error !== null ? error.produit ? true : false : false}
              textError={error !== null ? error.produit ? error.produit : [] : []}
              value={produit}
              disabled={chercherPar !== "DESIGNATION" ? true : false}
              onChangeValue={(e) => {
                setProduit(e.target.value);
              }}
            /> 
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <CustomInput 
              isSelect
              id="categorie"
              name="categorie"
              inputLabel="Catégorie :"
              options={optionsCategorie}
              error={error !== null ? error.categorie ? true : false : false}
              textError={error !== null ? error.categorie ? error.categorie : [] : []}
              value={categorie}
              disabled={chercherPar !== "CATEGORIE" ? true : false}
              onChangeValue={(e) => {
                setCategorie(e.target.value);
              }}
            /> 
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <div
              className="boutton"
              onClick={() => {
                resetForm();
                onClickAnnuler();
              }}
            >
              <p>ANNULER</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className="boutton"
              onClick={() => {
                if (!error) {
                  resetForm();
                }
                onClickConfigurer(chercherPar, dateDuJour, produit, categorie, true);
              }}
            >
              <p>VALIDER</p>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

FormConfigurationStock.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClickConfigurer: PropTypes.func,
  onClickAnnuler: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default FormConfigurationStock;