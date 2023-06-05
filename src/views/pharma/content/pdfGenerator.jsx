import React from "react";
import PropTypes from "prop-types";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

function PdfGenerator({ data, chercherPar, produit, categorie }) {
  console.log(data);
  const styles = StyleSheet.create({
    title: {
      marginLeft: "auto",
      marginRight: "auto"
    },
    page: {
      padding: "20px",
    },
    table: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "30px",
    },
    tableSG: {
      width: "65%",
    },
    tableD: {
      width: "100%",
    },
    tableC: {
      width: "50%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      borderTop: "1px solid black",
      paddingTop: 8,
      paddingBottom: 8,
    },
    header: {
      borderTop: "none",
    },
    columnH: {
      fontSize: "10px",
      fontWeight: "bolder",
      width: "27%",
      textAlign: "center"
    },
    column: {
      width: "27%",
      fontSize: "10px",
      textAlign: "center"
    },
  });

  const getDate = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {
          chercherPar === "CATEGORIE"
            ? (
              <>
                <Text style={styles.title}>variation du stock des produits de la catégorie {categorie}</Text>
                <View style={[styles.table, styles.tableC]}>
                  <View style={[styles.row, styles.header]}>
                    <Text style={styles.columnH}>Désignation</Text>
                    <Text style={styles.columnH}>Stock</Text>
                    <Text style={styles.columnH}>Etat quantité</Text>
                  </View>
                  <View>
                    {data.map((stock, index) => {
                      return (
                        <View style={styles.row} key={index}>
                          <Text style={styles.column}>{stock.designation}</Text>
                          <Text style={styles.column}>{stock.stock}</Text>
                          <Text style={styles.column}>{stock.etatQuantite}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </>
            )
            : chercherPar === "DESIGNATION"
              ? (
                <>
                  <Text style={styles.title}>variation du stock du produit {produit}</Text>
                  <View style={[styles.table, styles.tableD]}>
                    <View style={[styles.row, styles.header]}>
                      <Text style={styles.columnH}>Date</Text>
                      <Text style={styles.columnH}>Catégorie</Text>
                      <Text style={styles.columnH}>Désignation</Text>
                      <Text style={styles.columnH}>Péremption</Text>
                      <Text style={styles.columnH}>Entrée/Sortie</Text>
                      <Text style={styles.columnH}>Stock</Text>
                      <Text style={styles.columnH}>Etat péremption</Text>
                      <Text style={styles.columnH}>Etat quantité</Text>
                    </View>
                    <View>
                      {data.map((stock, index) => {
                        return (
                          <View style={styles.row} key={index}>
                            <Text style={styles.column}>{stock.date}</Text>
                            <Text style={styles.column}>{stock.categorie}</Text>
                            <Text style={styles.column}>{stock.designation}</Text>
                            <Text style={styles.column}>{stock.peremption}</Text>
                            <Text style={styles.column}>{stock.entreeSortie}</Text>
                            <Text style={styles.column}>{stock.stock}</Text>
                            <Text style={styles.column}>{stock.etatPeremption}</Text>
                            <Text style={styles.column}>{stock.etatQuantite}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </>
              )
              : (
                <>
                  <Text style={styles.title}>Situation globale du stock le {getDate()}</Text>
                  <View style={[styles.table, styles.tableSG]}>
                    <View style={[styles.row, styles.header]}>
                      <Text style={styles.columnH}>Catégorie</Text>
                      <Text style={styles.columnH}>Désignation</Text>
                      <Text style={styles.columnH}>Stock</Text>
                      <Text style={styles.columnH}>Etat quantité</Text>
                    </View>
                    <View>
                      {data.map((stock, index) => {
                        return (
                          <View style={styles.row} key={index}>
                            <Text style={styles.column}>{stock.categorie}</Text>
                            <Text style={styles.column}>{stock.designation}</Text>
                            <Text style={styles.column}>{stock.stock}</Text>
                            <Text style={styles.column}>{stock.etatQuantite}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </>
              )
        }
        
      </Page>
    </Document>
  );
}

PdfGenerator.propTypes = {
  data: PropTypes.array.isRequired,
  chercherPar: PropTypes.string.isRequired,
  produit: PropTypes.string,
  categorie: PropTypes.string,
};

export default PdfGenerator;