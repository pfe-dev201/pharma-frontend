import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import Tableau from "../../../../components/tableau/tableau";
import "./stockStyle.css";
import FormConfigurationStock from "../../../../components/formConfigurationStock/formConfigurationStock";
import getEnvironnement from "../../../../environnement";
import Pagination from "../../../../components/pagination/pagination";
import Avatar from "../../../../components/avatar/avatar";
import logo from "../../../../assets/images/pharma.png";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../store/userSlice";
import Imprimer from "../../../../components/imprimer/imprimer";
import { PDFViewer } from "@react-pdf/renderer";
import PdfGenerator from "../../../../components/pdfGenerator";
import Revenir from "../../../../components/revenir/revenir";
import { useNavigate } from "react-router-dom";

function StockView() {

  const [stocks, setStocks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [error, setError] = useState(null);
  const [numberLeft, setNumberLeft] = useState(1);
  const [numberRight, setNumberRight] = useState(5);
 
  const [image, setImage] = useState(`${getEnvironnement().BACKEND_URL}/storage/default-profile.jpg`);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const [headers, setHeaders] = useState(["Catégorie", "Désignation", "Stock", "Etat Quantité"]);
  const [headersData, setHeadersData] = useState(["categorie", "designation", "stock", "etatQuantite"]);
  const [chercherParConfig, setChercherParConfig] = useState("SITUATION GLOBALE");
  const [produitConfig, setProduitConfig] = useState("");
  const [categorieConfig, setCategorieConfig] = useState("");
  const [print, setPrint] = useState(false);

  const navigate = useNavigate();
  const user = useSelector(userSelector);

  const getDate = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  useEffect(() => {
    onConfigureHandler("SITUATION GLOBALE", getDate(), "CHOISIR UN PRODUIT", "CHOISIR UNE CATEGORIE", false);
  }, []);

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/users/${user.id}`)
      .then((response) => {
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setImage(`${getEnvironnement().BACKEND_URL}/storage/${response.data.image_profile}`);
      });
  }, []);

  const onConfigureHandler = (chercherPar, dateDuJour, produit, categorie, isBackDrop) => {
    setOpenForm(false);
    if (isBackDrop) {
      setOpenBackdrop(true);
    }
    setChercherParConfig(chercherPar);
    setProduitConfig(produit);
    setCategorieConfig(categorie);
    if (chercherPar === "DESIGNATION") {
      setHeaders(["Date", "Catégorie", "Désignation", "Péremption", "Entrée/Sortie", "Stock", "Etat Péremption", "Etat Quantité"]);
      setHeadersData(["date", "categorie", "designation", "peremption", "entreeSortie", "stock", "etatPeremption", "etatQuantite"]);
    } else if (chercherPar === "CATEGORIE") {
      setHeaders(["Désignation", "Stock", "Etat quantité"]);
      setHeadersData(["designation", "stock", "etatQuantite"]);
    } else {
      setHeaders(["Catégorie", "Désignation", "Stock", "Etat Quantité"]);
      setHeadersData(["categorie", "designation", "stock", "etatQuantite"]);
    }
    const url = `${getEnvironnement().API_URL}/stock/getData`;
    let body = {
      chercherPar, dateDuJour, produit, categorie
    };
    const config = {
      headers : {
        "Content-Type": "application/json",
      }
    };
    axios.post(url, body, config)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          setStocks(response.data.stocks);
        } else if (response.data.status === "error") {
          setError(response.data.error);
          setOpenForm(true);
        }
      });
    if (isBackDrop) {
      setTimeout(() => setOpenBackdrop(false), 800);
    }
  };

  const pagination = (action) => {
    if (action === "left") {
      numberLeft === 1 ? setNumberLeft(1) : setNumberLeft(numberLeft - 5);
      numberRight <= 5 ? setNumberRight(numberRight) : numberRight % 5 === 0 ? setNumberRight(numberRight - 5) : setNumberRight(Math.floor(stocks.length / 5) * 5);
     
    } else if (action === "right") {
      numberRight === stocks.length || stocks.length < 5 ? setNumberLeft(numberLeft) : setNumberLeft(numberLeft + 5);
      numberRight === stocks.length || stocks.length < 5 ? setNumberRight(numberRight) : numberRight !== Math.floor(stocks.length / 5) * 5 ? setNumberRight(numberRight + 5) : setNumberRight(numberRight + (stocks.length % 5));
      
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
      <FormConfigurationStock
        open={openForm}
        handleClose={() => setOpenForm(false)}
        onClickAnnuler={() => setOpenForm(false)}
        onClickConfigurer={onConfigureHandler}
        error={error}
      />
      <div className="header">
        <Avatar image={image} nom={nom} prenom={prenom}/>
        <img className="logo" src={logo}/>
      </div>
      <div className="option-stock">
        {print
          ? <div />
          : (
            <div 
              className="boutton-ajouter-medicament"
              onClick={() => {
                setError(null);
                setOpenForm(true);
              }}
            >
              <p>CONFIGURATION</p>
            </div>
          )
        }
        {print
          ? (
            <div className="revenir">
              <Revenir onClickRevenir={() => {setPrint(false); navigate("/pharma/stock");}} />
            </div>
          )
          : (
            <div className="imprimer">
              <Imprimer onClickImprimer={() => setPrint(true)} />
            </div>
          )
        }
        
      </div>
      {
        print
          ? (
            <PDFViewer style={{height: "70vh", margin: "0vh 3vw"}}>
              <PdfGenerator
                data={stocks}
                chercherPar={chercherParConfig}
                produit={produitConfig}
                categorie={categorieConfig}
              />
            </PDFViewer>
          )
          : (
            <>
              <div className="table-medicament">
                <Tableau 
                  headers={headers}
                  headersData={headersData}
                  datas={stocks}
                  debut={numberLeft}
                  fin={numberRight}
                  stock
                />
              </div>
              <div className="pagination-section">
                <Pagination
                  numberLeft={numberLeft}
                  numberRight={numberRight}
                  onClickLeft={() => pagination("left")}
                  onClickRight={() => pagination("right")}
                  disabledLeft={numberLeft === 1 ? true : false}
                  disabledRight={numberRight === stocks.length  || stocks.length < 5 ? true : false}
                />
              </div>
            </>
          )
      }
    </div>
  );
}

export default StockView;