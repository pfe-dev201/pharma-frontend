import React, { useEffect, useState } from "react";
import Avatar from "../../../../components/avatar/avatar";
import axios from "axios";
import getEnvironnement from "../../../../environnement";
import logo from "../../../../assets/images/pharma.png";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import FormFilterRapport from "../../../../components/formFilterRapport/formFilterRapport";
import "./rapport.css";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../store/userSlice";



function Rapport() {
  const [image, setImage] = useState(`${getEnvironnement().BACKEND_URL}/storage/default-profile.jpg`);
  const [nom, setNom] = useState("admin");
  const [prenom, setPrenom] = useState("admin");
  const user = useSelector(userSelector);
  const months = ["Jan", "Feb", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"];
  const [entrees, setEntree] = useState(Array.from({ length: 12 }, () => 0));
  const [sorties, setSorties] = useState(Array.from({ length: 12 }, () => 0));

  const [openFormTrie, setOpenFormTrie] = useState(false);
  const [errorTrie, setErrorTrie] = useState(null);
  const [medicaments, setMedicaments] = useState([]);
  const [medicamentsget, setMedicamentsget] = useState("");
  const [dateget, setDateget] = useState("");
  const [rapportData, setRapportData] = useState(Array.from({ length: 12 }, () => ({ name: "", entree: 0, sortie: 0 })));
  const [optionsTrierPar, setOptionsTrierPar] = useState([]);
  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/users/${user.id}`)
      .then((response) => {
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setImage(`${getEnvironnement().BACKEND_URL}/storage/${response.data.image_profile}`);
      });
  }, []);

  const onValidateHandler = (designation, date) => {
    const url = `${getEnvironnement().API_URL}/rapport/mid/${designation}/${date}`;
    // let body = {
    //   designation, date
    // };
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };

    axios.post(url, {}, config)
      .then(() => {
        setMedicamentsget(designation);
        setDateget(date);
        setOpenFormTrie(false);
        setEntree(Array.from({ length: 12 }, () => 0));
        setSorties(Array.from({ length: 12 }, () => 0));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    axios.get(`${getEnvironnement().API_URL}/rapport`)
      .then((response) => {
        const res = response.data;
        res.forEach((item) => {
          setOptionsTrierPar(optionsTrierPar.push(item.designation));
        });
        setMedicaments(optionsTrierPar);
      });
  }, []);

  useEffect(() => {
    if (medicamentsget) {
      axios.get(`${getEnvironnement().API_URL}/rapport/mid/${medicamentsget}/${dateget}`)
        .then((response) => {
          const res = response.data;
          res.forEach((item, index) => {
            setEntree(() => {
              if (res[index]) {
                if (res[index].type === "entree" && res[index].year == dateget) {
                  entrees[res[index].month - 1] = res[index].quantite;
                }
              }
              return index;
            }
            );
          });
          res.forEach((item, index) => {
            setSorties(() => {
              if (res[index]) {
                if (res[index].type === "sortie" && res[index].year == dateget) {
                  sorties[res[index].month - 1] = res[index].quantite;
                }
              }
              return index;
            }
            );
          });
          rapportData.forEach((item, index) => {
            setRapportData(prevData => {
              const newData = [...prevData];
              newData[index].name = months[index];
              newData[index].entree = entrees[index];
              newData[index].sortie = sorties[index];
              return newData;
            });
          });
        });
    } else {
      axios.get(`${getEnvironnement().API_URL}/rapport/mid/TEST3`)
        .then(() => {
          rapportData.forEach((item, index) => {
            setRapportData(prevData => {
              const newData = [...prevData];
              newData[index].name = months[index];
              newData[index].entree = entrees[index];
              newData[index].sortie = sorties[index];
              return newData;
            });
          });
        });
    }
  }, [medicamentsget,dateget]);
  return (
    <div className="entrees-view">
      <FormFilterRapport
        open={openFormTrie}
        optionsTrierPar={medicaments}
        handleClose={() => setOpenFormTrie(false)}
        onClickValider={onValidateHandler}
        onClickAnnuler={() => setOpenFormTrie(false)}
        error={errorTrie}
      />
      <div className="header">
        <Avatar image={image} nom={nom} prenom={prenom} />
        <img className="logo" src={logo} />
      </div>
      <div className="option-rapport">
        <div
          className="boutton-ajouter-medicament"
          onClick={() => {
            setOpenFormTrie(true);
            setErrorTrie(null);
          }}
        >
          <p>CONFIGURATION DU RAPPORT</p>
        </div>
      </div>
      <div className="option-rapport">
        <p className="desc">Variation de “<span className="medicament-name">{medicamentsget}</span>” en fonction des Quantité <span className="medicament-name">{dateget}</span></p>
      </div>
      <div className="table-medicament-rapport">
        <BarChart width={1200} height={400} data={rapportData} barGap={0}>
          <XAxis dataKey="name" stroke="#000" tick={{ fontSize: 28, fontWeight: 400, fontFamily: "Inder", lineHeight: 40 }} />
          <YAxis tickCount={4} tick={{ fontSize: 28, fontWeight: 400, fontFamily: "Inder", color: "#000" }} />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#FFF8" }} />
          <CartesianGrid stroke="#9D0F0F" strokeDasharray="6 6" vertical={false} />
          <Bar dataKey="entree" fill="#A70505" barSize={33} />
          <Bar dataKey="sortie" fill="#4B7D4A" barSize={33} />
        </BarChart>
      </div>
    </div>
  );
}

export default Rapport;