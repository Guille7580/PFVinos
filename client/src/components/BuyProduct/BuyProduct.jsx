import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
//import getHeaderToken from "../../helpers/getHeaderToken";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { BASEURL } from "../../assets/URLS";
import { PUBLIC_KEY_STRIPE } from "../../assets/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import SendEmail from "./ConfirmationEmail";
import styles from "./BuyProduct.module.css";

//const headers = getHeaderToken();
const stripePromise = loadStripe(PUBLIC_KEY_STRIPE);

const CheckoutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const pedido = useSelector((state) => state.pedidosReducer.CheckoutForm);
  const comprador = useSelector((state) => state.loginReducer.userDetail)

  const PagoPopUp = (props) => {
    return (
      <Modal
        style={{backgroundColor:"whitesmoke", borderRadius:"5px", boxShadow:" 2px 2px 4px #000000"}}
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Detalle del Pago
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>El pago se realizó con éxito </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("/profile/orders")}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          `${BASEURL}/pagos`,
          {
            transaccionId: id,
            pedidoId: pedido.pedidoId,
          },
          // headers
        );
        setPopUp(true);
        elements.getElement(CardElement).clear();
        toast.success("Pedido pagado exitosamente");
      } catch (error) {
        console.log(error);
        toast.error("Se produjo un error en el pago, inténtelo más tarde");
      }
      setLoading(false);
    } else {
      toast.warning("La tarjeta ingresada es incorrecta", {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  return (
    <div className={styles.contenedor}>
    <div className={styles.contenedorgeneral}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <CardElement style={{ display: "grid" }} />
        </div>
        <div className={styles.botoncentrar}>
          <button
            disabled={!stripe}
            onClick={handleSubmit}
            className={styles.botontarjeta}
          >
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
             
              </div>
            ) : (
              "Comprar"
            )}
          </button>
        </div>
      </form>
      <PagoPopUp show={popUp} onHide={() => setPopUp(false)} />
      {popUp && <SendEmail 
      nombre = {comprador.nombre}
      email = {comprador.email}
      total = {pedido.totalPedido}
      />}
    </div>
    </div>
  );
};

function BuyProduct() {
  return (
    <> 
    <div className={styles.contenedortarjeta2}>
      <Elements stripe={stripePromise}>
        <div className="container p-4">
          <div className="row h-100" >
            <div className="col-md-4 offset-md-4 h-100">
              <CheckoutForm />
              </div>
            </div>
          </div>
        </Elements>
      </div>
    </>
  );
}

export default BuyProduct;
