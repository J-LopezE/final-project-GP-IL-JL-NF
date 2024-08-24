import React from "react";
import BreweriesForm from "./BreweriesForm.jsx";
import "../../styles/modal.css";

const EditBreweries = ({ brewery }) => {
  console.log(brewery);
  return (
    <>
      <button
        type="button"
        className="editButton"
        data-bs-toggle="modal"
        data-bs-target={`#edit-brewery-${brewery.id}`}
      >
        <i className="fas fa-edit"></i>
      </button>
      <div
        className="modal fade"
        id={`edit-brewery-${brewery.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-4" id="exampleModalLabel">
                Editar Cervecería
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <BreweriesForm
                btnBrewery={"Guardar"}
                brewery={brewery}
                id={brewery.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBreweries;
