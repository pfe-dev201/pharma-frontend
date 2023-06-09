import React, { useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, Grid } from "@mui/material";
import CustomInput from "../customInput/customInput";
import "./formFilterRapport.css";

function FormFilterRapport({
  open,
  optionsTrierPar,
  handleClose,
  onClickValider,
  onClickAnnuler,
  error
}) {

  const [trierPar, setTrierPar] = useState("");
  const [typeTrie, setTypeTrie] = useState("");

  const errorTrierPar = error?.trierPar || null;
  const errorTypeTrie = error?.typeTrie || null;

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Configuration du rapport :</DialogTitle>
      <DialogContent>
        <CustomInput
          isSelect
          id="trierPar"
          name="designation"
          inputLabel="Désignation :"
          options={optionsTrierPar}
          error={errorTrierPar !== null}
          textError={errorTrierPar || []}
          value={trierPar}
          onChangeValue={(e) => setTrierPar(e.target.value)}
        />
        <CustomInput 
          isSelect
          id="typeTrie"
          name="date"
          inputLabel="Année :"
          options={["2030","2029","2028","2027","2026","2025","2024","2023", "2022"]}
          error={errorTypeTrie !== null}
          textError={errorTypeTrie || []}
          value={typeTrie}
          onChangeValue={(e) => setTypeTrie(e.target.value)}
        />
        <Grid container>
          <Grid item xs={6}>
            <div className="boutton-rapport" onClick={onClickAnnuler}>
              <p>ANNULER</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="boutton-rapport" onClick={() => onClickValider(trierPar, typeTrie)}>
              <p>VALIDER</p>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

FormFilterRapport.propTypes = {
  open: PropTypes.bool.isRequired,
  optionsTrierPar: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClickValider: PropTypes.func.isRequired,
  onClickAnnuler: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default FormFilterRapport;
