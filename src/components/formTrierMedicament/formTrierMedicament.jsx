import React, { useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, Grid } from "@mui/material";
import CustomInput from "../customInput/customInput";
import "./formTrierMedicamentStyle.css";

function FormTrierMedicament({
  open,
  optionsTrierPar,
  handleClose,
  onClickValider,
  onClickAnnuler,
  onClickDeleteTrie,
  error
}) {

  const [trierPar, setTrierPar] = useState("DATE");
  const [typeTrie, setTypeTrie] = useState("ASC");

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Trier les médicaments :</DialogTitle>
      <DialogContent>
        <CustomInput 
          isSelect
          id="trierPar"
          name="trierPar"
          inputLabel="Trier Par :"
          options={optionsTrierPar}
          error={error !== null ? error.trierPar ? true : false : false}
          textError={error !== null ? error.trierPar ? error.trierPar : [] : []}
          value={trierPar}
          onChangeValue={(e) => setTrierPar(e.target.value)}
        />
        <CustomInput 
          isSelect
          id="typeTrie"
          name="typeTrie"
          inputLabel="Type de trie :"
          options={["ASC", "DESC"]}
          error={error !== null ? error.typeTrie ? true : false : false}
          textError={error !== null ? error.typeTrie ? error.typeTrie : [] : []}
          value={typeTrie}
          onChangeValue={(e) => setTypeTrie(e.target.value)}
        />
        <Grid container>
          <Grid item xs={3}>
            <div className="boutton" onClick={onClickAnnuler}>
              <p>ANNULER</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="boutton" onClick={onClickDeleteTrie}>
              <p>SUPPRIMER LE TRIE</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="boutton" onClick={() => onClickValider(trierPar, typeTrie)}>
              <p>VALIDER</p>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

FormTrierMedicament.propTypes = {
  open: PropTypes.bool.isRequired,
  optionsTrierPar: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClickValider: PropTypes.func.isRequired,
  onClickAnnuler: PropTypes.func.isRequired,
  onClickDeleteTrie: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default FormTrierMedicament;