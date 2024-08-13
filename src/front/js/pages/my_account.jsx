import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Edit_breweries from "../component/edit_breweries.jsx";
import Edit_beers from "../component/edit_beer.jsx";
import Swal from "sweetalert2";
import "../../styles/my_account.css";
import Edit_event from "../component/edit_event.jsx";

const MyAccount = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const breweryDelete = (brewery) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar la Cervecería?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteBrewery(brewery);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cervecería eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/my_account");
      } else {
        return;
      }
    });
  };

  const beerDelete = (beer) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar la Cervecería?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteBeer(beer);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cerveza eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/my_account");
      } else {
        return;
      }
    });
  };

  const eventDelete = (event) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar el evento?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteEvent(event);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Evento eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/my_account");
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
      return;
    }
    actions.getUserBreweries();
    actions.getUserBeers();
    actions.getUserEvents();
  }, []);

  return (
    <div className="container-fluid">
      {/* Sección de Cervecerías */}
      <h1 className="text-center text-primary mb-4">Mis Cervecerías</h1>
      <div className="overflow-auto d-flex flex-nowrap">
        {store.userBreweries.length > 0 ? (
          store.userBreweries.map((brewery) => (
            <div class="cards-container" key={brewery.id}>
              <div className="card cardAccount border-light shadow-lg me-4">
                <img
                  src={brewery.logo_of_brewery}
                  className="card-img-top card-img"
                  alt={brewery.name}
                />
                <div className="card-body body-card d-flex flex-column">
                  <h5 className="card-title title-card mb-2">{brewery.name}</h5>
                  <p className="card-text text-card mb-3">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {brewery.address}
                  </p>
                  <div className="container-fluid d-flex mt-auto justify-content-between footer-card">
                    <button
                      className="btn btn-danger"
                      onClick={() => breweryDelete(brewery.id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i>
                    </button>
                    <Edit_breweries brewery={brewery} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6 className="text-center mt-4">
            Sin Cervecerías, por favor{" "}
            <Link to="/add_brewery">ingresa una</Link>
          </h6>
        )}
      </div>

      {/* Sección de Cervezas */}
      <h1 className="text-center text-primary mb-4 mt-5">Mis Cervezas</h1>
      <div className="overflow-auto d-flex flex-nowrap">
        {store.userBeers.length > 0 ? (
          store.userBeers.map((beer) => (
            <div
              className="card cardAccount border-light shadow-lg me-4"
              key={beer.id}
            >
              <img
                src={beer.picture_of_beer_url}
                className="card-img-top card-img"
                alt={beer.name}
              />
              <div className="card-body body-card d-flex flex-column">
                <h2 className="card-title  mb-3">{beer.name}</h2>
                <p className="card-text mb-2">
                  <strong>Estilo BJCP:</strong> {beer.bjcp_style}
                </p>
                <p className="card-text mb-2">
                  <strong>IBUs:</strong> {beer.IBUs}
                </p>
                <p className="card-text mb-2">
                  <strong>VolALC:</strong> {beer.volALC}
                </p>
                <p className="card-text mb-3">
                  <strong>Descripción:</strong> {beer.description}
                </p>
                <div className="container-fluid d-flex mt-auto justify-content-between footer-card">
                  <button
                    onClick={() => beerDelete(beer.id)}
                    className="btn btn-danger mt-auto"
                  >
                    <i className="fas fa-trash-alt me-1"></i>
                  </button>
                  <Edit_beers beer={beer}></Edit_beers>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6 className="text-center mt-4">
            Sin Cervezas, por favor <Link to="/add_beer">ingresa una</Link>
          </h6>
        )}
      </div>

      {/* Sección de Eventos */}
      <h1 className="text-center text-primary mb-4">Mis Eventos</h1>
      <div className="overflow-auto d-flex flex-nowrap">
        {store.breweryEvents.length > 0 ? (
          store.breweryEvents.map((event) => (
            <div
              className="card cardAccount border-light shadow-lg me-4"
              key={event.id}
            >
              <img
                src={event.picture_of_event_url}
                className="card-img-top card-img"
                alt={event.name}
              />
              <div className="card-body body-card d-flex flex-column">
                <h4 className="card-title title-card mb-3">{event.name}</h4>
                <div className="container-fluid d-flex mt-auto justify-content-between footer-card">
                  <button
                    onClick={() => eventDelete(event.id)}
                    className="btn btn-danger text-dark mt-auto"
                  >
                    <i className="fas fa-trash-alt me-1"></i>
                  </button>
                  <Edit_event event={event}></Edit_event>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6 className="text-center mt-4">
            Sin Eventos, por favor <Link to="/add_event">ingresa uno</Link>
          </h6>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
