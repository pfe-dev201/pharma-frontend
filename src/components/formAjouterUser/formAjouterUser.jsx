import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, Grid } from "@mui/material";
import CustomInput from "../customInput/customInput";
import "./formAjouterUserStyle.css";


function FormAjouterUser({ open, handleClose, onClickAjouter, onClickModifier, onClickAnnuler, error, modifier, user }) {

  const [nom, setNom] = useState(modifier ? user.nom : "");
  const [prenom, setPrenom] = useState(modifier ? user.prenom : "");
  const [email, setEmail] = useState(modifier ? user.email : "");
  const [status, setStatus] = useState(modifier ? user.status : "UTILISATEUR");
  const [role, setRole] = useState(modifier ? user.role : "ECRIRE");

  useEffect(() => {
    if (modifier) {
      setNom(user.nom);
      setPrenom(user.prenom);
      setEmail(user.email);
      setStatus(user.status);
      setRole(user.typeRole);
    }
  }, [user]);

  const resetForm = () => {
    if (modifier) {
      setNom(user.nom);
      setPrenom(user.prenom);
      setEmail(user.email);
      setStatus(user.status);
      setRole(user.typeRole);
    } else {
      setNom("");
      setPrenom("");
      setEmail("");
      setStatus("UTILISATEUR");
      setRole("ECRIRE");
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
      <DialogTitle>{modifier ? "Modifier " : "Ajouter "} un utilisateur :</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput
              type="text"
              id="nom"
              name="nom"
              placeholder="Nom"
              error={error !== null ? error.nom ? true : false : false}
              textError={error !== null ? error.nom ? error.nom : [] : []}
              value={nom}
              inputLabel="Nom :"
              onChangeValue={(e) => setNom(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Prenom"
              error={error !== null ? error.prenom ? true : false : false}
              textError={error !== null ? error.prenom ? error.prenom : [] : []}
              value={prenom}
              inputLabel="Prenom :"
              onChangeValue={(e) => setPrenom(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <CustomInput
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              error={error !== null ? error.email ? true : false : false}
              textError={error !== null ? error.email ? error.email : [] : []}
              value={email}
              inputLabel="Email :"
              onChangeValue={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <CustomInput 
              isSelect
              id="status"
              name="status"
              inputLabel="Status :"
              options={["ADMIN", "UTILISATEUR"]}
              error={error !== null ? error.status ? true : false : false}
              textError={error !== null ? error.status ? error.status : [] : []}
              value={status}
              onChangeValue={(e) => setStatus(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput 
              isSelect
              id="role"
              name="role"
              inputLabel="Role :"
              options={["ECRIRE", "LIRE"]}
              error={error !== null ? error.role ? true : false : false}
              textError={error !== null ? error.role ? error.role : [] : []}
              value={role}
              onChangeValue={(e) => setRole(e.target.value)}
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
                  onClickModifier(user.id, nom, prenom, email, status, role);
                } else {
                  onClickAjouter(nom, prenom, email, status, role);
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

FormAjouterUser.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClickAjouter: PropTypes.func,
  onClickModifier: PropTypes.func,
  onClickAnnuler: PropTypes.func.isRequired,
  error: PropTypes.object,
  modifier: PropTypes.bool,
  user: PropTypes.object
};

export default FormAjouterUser;