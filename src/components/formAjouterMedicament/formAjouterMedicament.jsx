import React, { useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, Grid } from "@mui/material";
import CustomInput from "../customInput/customInput";
import "./formAjouterMedicamentStyle.css";


function FormAjouterMedicament({ open, handleClose, onClickAjouter, onClickAnnuler, error }) {
  const optionsCategorie = ["CM", "HTA", "DIABETE", "LAT", "AUTRE"];

  const [date, setDate] = useState();
  const [peremption, setPeremption] = useState();
  const [categorie, setCategorie] = useState("CM");
  const [autreCategorie, setAutreCategorie] = useState("");
  const [designation, setDesignation] = useState("");
  const [conditionnement, setConditionnement] = useState("");
  const [quantite, setQuantite] = useState(0);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Ajouter un médicament :</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid xs={6}>
            <CustomInput
              type="date"
              id="date"
              name="date"
              error={error !== null ? error.date ? true : false : false}
              value={date}
              inputLabel="Date :"
              onChangeValue={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid xs={6}>
            <CustomInput
              type="date"
              id="peremption"
              name="peremption"
              error={error !== null ? error.peremption ? true : false : false}
              value={peremption}
              inputLabel="Péremption :"
              onChangeValue={(e) => setPeremption(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={6}>
            <CustomInput 
              isSelect
              id="categorie"
              name="categorie"
              inputLabel="Catégorie :"
              options={optionsCategorie}
              error={error !== null ? error.categorie ? true : false : false}
              textError={error !== null ? error.categorie ? error.categorie : "" : ""}
              value={categorie}
              onChangeValue={(e) => setCategorie(e.target.value)}
            />
          </Grid>
          <Grid xs={6}>
            <CustomInput
              type="text"
              id="autre"
              name="autre"
              placeholder="Autre"
              error={error !== null ? error.autreCategorie ? true : false : false}
              value={autreCategorie}
              inputLabel="Autre :"
              disabled={categorie !== "AUTRE" ? true : false}
              onChangeValue={(e) => setAutreCategorie(e.target.value.toUpperCase())}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12}>
            <CustomInput
              type="text"
              id="designation"
              name="designation"
              placeholder="Désignation"
              error={error !== null ? error.designation ? true : false : false}
              value={designation}
              inputLabel="Désignation :"
              onChangeValue={(e) => setDesignation(e.target.value.toUpperCase())}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={6}>
            <CustomInput
              type="text"
              id="conditionnement"
              name="conditionnement"
              placeholder="Conditionnement"
              error={error !== null ? error.conditionnement ? true : false : false}
              textError={error !== null ? error.conditionnement ? error.conditionnement : "" : ""}
              value={conditionnement}
              inputLabel="Conditionnement :"
              onChangeValue={(e) => setConditionnement(e.target.value.toUpperCase())}
            />
          </Grid>
          <Grid xs={6}>
            <CustomInput
              type="number"
              id="quantite"
              name="quantite"
              placeholder="Quantite"
              error={error !== null ? error.quantite ? true : false : false}
              value={quantite}
              inputLabel="Quantite :"
              onChangeValue={(e) => setQuantite(e.target.value.toUpperCase())}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={6}></Grid>
          <Grid xs={3}>
            <div className="boutton-ajouter-medicament" onClick={onClickAnnuler}>
              <p>ANNULER</p>
            </div>
          </Grid>
          <Grid xs={3}>
            <div className="boutton-ajouter-medicament" onClick={onClickAjouter}>
              <p>AJOUTER</p>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

FormAjouterMedicament.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClickAjouter: PropTypes.func.isRequired,
  onClickAnnuler: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default FormAjouterMedicament;