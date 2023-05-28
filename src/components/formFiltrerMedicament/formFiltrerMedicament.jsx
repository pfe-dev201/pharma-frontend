import React, { useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, Grid } from "@mui/material";
import CustomInput from "../customInput/customInput";
import "./formFiltrerMedicamentStyle.css";

function FormFiltrerMedicament({
  open,
  handleClose,
  onClickValider,
  onClickAnnuler,
  onClickDeleteFiltre,
  error
}) {
  const optionsFiltrerPar = ["DATE", "PEREMPTION", "CATEGORIE", "DESIGNATION", "CONDITIONNEMENT", "QUANTITE"];
  const [optionsTypeFiltre, setOptionsTypeFiltre] = useState(["DATE EGALE A", "DATE INFERIEUR A", "DATE SUPERIEUR A"]);

  const [filtrerPar, setFiltrerPar] = useState("DATE");
  const [typeFiltre, setTypeFiltre] = useState("DATE EGALE A");
  const [dateSuperieurA, setDateSuperieurA] = useState(new Date());
  const [dateInferieurA, setDateInferieurA] = useState(new Date());
  const [dateEgaleA, setDateEgaleA] = useState(new Date());
  const [egaleA, setEgaleA] = useState("");
  const [commencePar, setCommencePar] = useState("");
  const [terminePar, setTerminePar] = useState("");
  const [inferieurA, setInferieurA] = useState(0);
  const [superieurA, setSuperieurA] = useState(0);

  const onChangeFiltrerPar = (e) => {
    if(e.target.value === "DATE" || e.target.value === "PEREMPTION"){
      setOptionsTypeFiltre(["DATE EGALE A", "DATE INFERIEUR A", "DATE SUPERIEUR A"]);
      setTypeFiltre("DATE EGALE A");
    }else if(e.target.value === "CATEGORIE" || e.target.value === "DESIGNATION" || e.target.value === "CONDITIONNEMENT"){
      setOptionsTypeFiltre(["EGALE A", "COMMENCE PAR", "TERMINE PAR"]);
      setTypeFiltre("EGALE A");
    }else if(e.target.value === "QUANTITE"){
      setOptionsTypeFiltre(["EGALE A", "INFERIEUR A", "SUPERIEUR A"]);
      setTypeFiltre("EGALE A");
    }
  };

  const resetForm = () => {
    setDateSuperieurA(new Date());
    setDateInferieurA(new Date());
    setDateEgaleA(new Date());
    setEgaleA("");
    setCommencePar("");
    setTerminePar("");
    setInferieurA(0);
    setSuperieurA(0);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Filtrer les médicaments :</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput 
              isSelect
              id="filtrerPar"
              name="filtrerPar"
              inputLabel="Filtrer Par :"
              options={optionsFiltrerPar}
              error={error !== null ? error.filtrerPar ? true : false : false}
              textError={error !== null ? error.filtrerPar ? error.filtrerPar : "" : ""}
              value={filtrerPar}
              onChangeValue={(e) => {
                setFiltrerPar(e.target.value);
                onChangeFiltrerPar(e);
                resetForm();
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput 
              isSelect
              id="typeFiltre"
              name="typeFiltre"
              inputLabel="Type de Filtre :"
              options={optionsTypeFiltre}
              error={error !== null ? error.typeFiltre ? true : false : false}
              textError={error !== null ? error.typeFiltre ? error.typeFiltre : "" : ""}
              value={typeFiltre}
              onChangeValue={(e) => {
                setTypeFiltre(e.target.value);
                resetForm();
              }}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput
              type="date"
              id="dateInferieurA"
              name="dateInferieurA"
              error={error !== null ? error.dateInferieurA ? true : false : false}
              value={dateInferieurA}
              inputLabel="Date inférieur à :"
              disabled={typeFiltre === "DATE INFERIEUR A" ? false : true}
              onChangeValue={(e) => setDateInferieurA(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              type="date"
              id="dateSuperieurA"
              name="dateSuperieurA"
              error={error !== null ? error.dateSuperieurA ? true : false : false}
              value={dateSuperieurA}
              inputLabel="Date supérieur à :"
              disabled={typeFiltre === "DATE SUPERIEUR A" ? false : true}
              onChangeValue={(e) => setDateSuperieurA(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput
              type="date"
              id="dateEgaleA"
              name="dateEgaleA"
              error={error !== null ? error.dateEgaleA ? true : false : false}
              value={dateEgaleA}
              inputLabel="Date égale à :"
              disabled={typeFiltre === "DATE EGALE A" ? false : true}
              onChangeValue={(e) => setDateEgaleA(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              type={filtrerPar === "QUANTITE" ? "number" : "text"}
              id="egaleA"
              name="egaleA"
              placeholder="Egale à"
              error={error !== null ? error.egaleA ? true : false : false}
              value={egaleA}
              inputLabel="Egale à :"
              disabled={typeFiltre === "EGALE A" ? false : true}
              onChangeValue={(e) => setEgaleA(e.target.value.toUpperCase())}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput
              type="text"
              id="commencePar"
              name="commencePar"
              placeholder="Commence Par"
              error={error !== null ? error.commencePar ? true : false : false}
              value={commencePar}
              inputLabel="Commence Par :"
              disabled={typeFiltre === "COMMENCE PAR" ? false : true}
              onChangeValue={(e) => setCommencePar(e.target.value.toUpperCase())}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              type="text"
              id="terminePar"
              name="terminePar"
              placeholder="Termine Par"
              error={error !== null ? error.terminePar ? true : false : false}
              value={terminePar}
              inputLabel="Termine Par :"
              disabled={typeFiltre === "TERMINE PAR" ? false : true}
              onChangeValue={(e) => setTerminePar(e.target.value.toUpperCase())}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput
              type="number"
              id="inferieurA"
              name="inferieurA"
              placeholder="inférieur à"
              error={error !== null ? error.inferieurA ? true : false : false}
              value={inferieurA}
              inputLabel="Inférieur à :"
              disabled={typeFiltre === "INFERIEUR A" ? false : true}
              onChangeValue={(e) => setInferieurA(e.target.value.toUpperCase())}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              type="number"
              id="superieurA"
              name="superieurA"
              placeholder="Superieur à"
              error={error !== null ? error.superieurA ? true : false : false}
              value={superieurA}
              inputLabel="Supérieur à :"
              disabled={typeFiltre === "SUPERIEUR A" ? false : true}
              onChangeValue={(e) => setSuperieurA(e.target.value.toUpperCase())}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <div className="boutton" onClick={onClickAnnuler}>
              <p>ANNULER</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="boutton" onClick={onClickDeleteFiltre}>
              <p>SUPPRIMER LE FILTRE</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="boutton" onClick={onClickValider}>
              <p>VALIDER</p>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

FormFiltrerMedicament.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClickValider: PropTypes.func.isRequired,
  onClickAnnuler: PropTypes.func.isRequired,
  onClickDeleteFiltre: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default FormFiltrerMedicament;