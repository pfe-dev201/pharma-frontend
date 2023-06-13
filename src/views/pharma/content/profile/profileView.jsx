import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../../components/avatar/avatar";
import logo from "../../../../assets/images/pharma.png";
import getEnvironnement from "../../../../environnement";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../../../store/userSlice";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import CustomInput from "../../../../components/customInput/customInput";
import "./profileStyle.css";
import CustomAlert from "../../../../components/customAlert/customAlert";

function ProfileView() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [imageLogo, setImageLogo] = useState(`${getEnvironnement().BACKEND_URL}/storage/${user.image_profile}`);
  const [nomLogo, setNomLogo] = useState("");
  const [prenomLogo, setPrenomLogo] = useState("");

  const [error, setError] = useState(null);
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [email, setEmail] = useState(user.email);
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/users/${user.id}`)
      .then((response) => {
        setNomLogo(response.data.nom);
        setPrenomLogo(response.data.prenom);
        setImageLogo(`${getEnvironnement().BACKEND_URL}/storage/${response.data.image_profile}`);
      });
  }, []);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/users/${user.id}`)
      .then((response) => {
        setNomLogo(response.data.nom);
        setPrenomLogo(response.data.prenom);
        setImageLogo(`${getEnvironnement().BACKEND_URL}/storage/${response.data.image_profile}`);
      });
  }, [user.image_profile]);

  const resetForm = () => {
    setError(null);
    setImageLogo(`${getEnvironnement().BACKEND_URL}/storage/${user.image_profile}`);
    fileInputRef.current.value = null;
    setNom(user.nom);
    setPrenom(user.prenom);
    setEmail(user.email);
    setPass("");
    setConfirmPass("");
  };

  const onClickAnnuler = () => {
    resetForm();
  };

  const onClickEnregistrer = () => {
    setOpenBackdrop(true);
    const url = `${getEnvironnement().API_URL}/users/updateProfile/${user.id}`;
    let body = {
      imageLogo, nom, prenom, email, pass, confirmPass
    };
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };

    axios.post(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          setNom(response.data.user.nom);
          setPrenom(response.data.user.prenom);
          setEmail(response.data.user.email);
          setPass("");
          setConfirmPass("");
          dispatch(setUser(response.data.user));
          setImageLogo(`${getEnvironnement().BACKEND_URL}/storage/${response.data.user.image_profile}`);
          setTimeout(() => setOpenBackdrop(false), 800);
          setMessageAlert(response.data.message);
          setTimeout(() => setOpenAlert(true), 800);
          setTimeout(() => setOpenAlert(false), 3500);
        } else if (response.data.status === "error") {
          setError(response.data.error);
          setOpenBackdrop(false);
        }
      });
  };

  const onImageClick = () => {
    fileInputRef.current.click();
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageLogo(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profilView">
      <div className="header">
        <Avatar
          image={imageLogo}
          nom={nomLogo}
          prenom={prenomLogo}
          profile
          handleImageChange={onImageChange}
          handleImageClick={onImageClick}
          inputRef={fileInputRef}
        />
        <img className="logo" src={logo}/>
      </div>
      <CustomAlert status="success" open={openAlert}>{messageAlert}</CustomAlert>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="form-profile">
        <Grid className="row" container>
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
        <Grid className="row" container>
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
        <Grid className="row" container>
          <Grid item xs={6}>
            <CustomInput
              type="password"
              id="pass"
              name="pass"
              placeholder="Mot de passe"
              error={error !== null ? error.pass ? true : false : false}
              textError={error !== null ? error.pass ? error.pass : [] : []}
              value={pass}
              inputLabel="Mot de passe :"
              onChangeValue={(e) => setPass(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              type="password"
              id="confirmPass"
              name="confirmPass"
              placeholder="Confirmation du mot de passe"
              error={error !== null ? error.confirmPass ? true : false : false}
              textError={error !== null ? error.confirmPass ? error.confirmPass : [] : []}
              value={confirmPass}
              inputLabel="Confirmation mot de passe :"
              onChangeValue={(e) => setConfirmPass(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid className="row" container>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <div className="boutton-profile btn-annuler" onClick={onClickAnnuler}>
              <p>ANNULER</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className="boutton-profile btn-enregistrer"
              onClick={() => {
                if (!error) {
                  resetForm();
                }
                onClickEnregistrer();
              }}
            >
              <p> ENREGISTRER </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProfileView;