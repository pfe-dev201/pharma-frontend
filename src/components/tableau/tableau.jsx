import React from "react";
import PropTypes from "prop-types";
import "./tableau.css";

function Tableau({ headers, headersData, datas, debut, fin, editerClick, supprimerClick, stock }) {
  return (
    <table className="tableau">
      <thead>
        <tr>
          {headers.map((header) => (
            <td className="th" key={header}>{header}</td>
          ))}
          {stock
            ? <></>
            : <td className="th">Action</td>
          }
        </tr>
      </thead>
      <tbody>
        {datas.slice(debut-1, fin).map((data, index) => (
          <tr key={index}>
            {headersData.map((header) => (
              <td key={header}>{data[header]}</td>
            ))}
            {stock
              ? <></>
              : (
                <td className="action">
                  <span className="editer" onClick={() => editerClick(data)}>Editer</span> - <br/>
                  <span className="supprimer" onClick={() => supprimerClick(data.id)}>Supprimer</span>
                </td>
              )
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Tableau.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  headersData: PropTypes.arrayOf(PropTypes.string).isRequired,
  datas: PropTypes.array.isRequired,
  debut: PropTypes.number.isRequired,
  fin: PropTypes.number.isRequired,
  editerClick: PropTypes.func,
  supprimerClick: PropTypes.func,
  stock: PropTypes.bool,
};

export default Tableau;