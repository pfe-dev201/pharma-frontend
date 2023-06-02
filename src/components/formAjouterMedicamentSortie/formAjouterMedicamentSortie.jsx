import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, Grid } from "@mui/material";
import CustomInput from "../customInput/customInput";
import "./formAjouterMedicamentSortieStyle.css";


function FormAjouterMedicamentSortie({ open, handleClose, onClickAjouter, onClickModifier, onClickAnnuler, error, modifier, medicament }) {
  const optionsCategorie = ["CM", "HTA", "DIABETE", "LAT", "AUTRE"];

  const getDate = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  const [date, setDate] = useState(modifier ? medicament.date : getDate());
  const [categorie, setCategorie] = useState(modifier ? "AUTRE" : "CM");
  const [autreCategorie, setAutreCategorie] = useState(modifier ? medicament.categorie : "");
  const [designation, setDesignation] = useState(modifier ? medicament.designation : "");
  const [quantite, setQuantite] = useState(modifier ? medicament.quantite : 0);

  useEffect(() => {
    if (modifier) {
      setDate(medicament.date);
      setCategorie("AUTRE");
      setAutreCategorie(medicament.categorie);
      setDesignation(medicament.designation);
      setQuantite(medicament.quantite);
    }
  }, [medicament]);

  const resetForm = () => {
    if (modifier) {
      setDate(medicament.date);
      setCategorie("AUTRE");
      setAutreCategorie(medicament.categorie);
      setDesignation(medicament.designation);
      setQuantite(medicament.quantite);
    } else {
      setDate(getDate());
      setCategorie("CM");
      setAutreCategorie("");
      setDesignation("");
      setQuantite(0);
    }
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
      <DialogTitle>{modifier ? "Modifier " : "Ajouter "} un médicament :</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <CustomInput
              type="date"
              id="date"
              name="date"
              error={error !== null ? error.date ? true : false : false}
              textError={error !== null ? error.date ? error.date : [] : []}
              value={date}
              inputLabel="Date :"
              onChangeValue={(e) => setDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput 
              isSelect
              id="categorie"
              name="categorie"
              inputLabel="Catégorie :"
              options={optionsCategorie}
              error={error !== null ? error.categorie ? true : false : false}
              textError={error !== null ? error.categorie ? error.categorie : [] : []}
              value={categorie}
              onChangeValue={(e) => {
                setCategorie(e.target.value);
                setAutreCategorie("");
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              type="text"
              id="autre"
              name="autreCategorie"
              placeholder="Autre"
              error={error !== null ? error.autreCategorie ? true : false : false}
              textError={error !== null ? error.autreCategorie ? error.autreCategorie : [] : []}
              value={autreCategorie}
              inputLabel="Autre :"
              disabled={categorie !== "AUTRE" ? true : false}
              onChangeValue={(e) => setAutreCategorie(e.target.value.toUpperCase())}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput
              type="text"
              id="designation"
              name="designation"
              placeholder="Désignation"
              error={error !== null ? error.designation ? true : false : false}
              textError={error !== null ? error.designation ? error.designation : [] : []}
              value={designation}
              inputLabel="Désignation :"
              onChangeValue={(e) => setDesignation(e.target.value.toUpperCase())}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              type="number"
              id="quantite"
              name="quantite"
              placeholder="Quantite"
              error={error !== null ? error.quantite ? true : false : false}
              textError={error !== null ? error.quantite ? error.quantite  : [] : []}
              value={quantite}
              inputLabel="Quantite :"
              onChangeValue={(e) => setQuantite(e.target.value.toUpperCase())}
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
                if (modifier) {
                  onClickModifier(medicament.id, date, categorie, autreCategorie, designation, quantite);
                } else {
                  onClickAjouter(date, categorie, autreCategorie, designation, quantite);
                }
              }}
            >
              <p>{modifier ? "MODIFIER" : "AJOUTER"}</p>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

FormAjouterMedicamentSortie.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClickAjouter: PropTypes.func,
  onClickModifier: PropTypes.func,
  onClickAnnuler: PropTypes.func.isRequired,
  error: PropTypes.object,
  modifier: PropTypes.bool,
  medicament: PropTypes.object
};

export default FormAjouterMedicamentSortie;