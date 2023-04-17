import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { clearCart } from "../redux/action";
const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  // eslint-disable-next-line
  const token = globalThis?.sessionStorage?.getItem('token');
  const [ resumeInfo, setResumeInfo ] = useState(() => {
    // eslint-disable-next-line
    return JSON.parse(globalThis?.sessionStorage?.getItem('resume_info'));
  });
  const [ resumeId, setREsumeId ] = useState(() => {
    // eslint-disable-next-line
    return globalThis?.sessionStorage?.getItem('resume_id');
  });

  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useDispatch();


  const handleFinishOrder = () => {
    if (!token)
      navigate('/login');

    const data = {
      resume_id: resumeId,
    };

    fetch(`http://localhost:8000/api/orders/buy`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'accept': 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const { data } = jsonResponse;

        console.log({jsonResponse});

        // eslint-disable-next-line
        globalThis?.sessionStorage.removeItem('resume_id');

        // eslint-disable-next-line
        globalThis?.sessionStorage.removeItem('resume_info');

        dispatch(clearCart())

        navigate("/history");
      })
      .catch(error => {
        console.log(error);
      });
  }

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-12 col-lg-12">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">{t('orderSummary')}</h4>
                </div>
                <div className="card-body">
                  <p>Total: <strong>${Math.round(subtotal)}</strong></p>
                  <p>Itens do pedido: </p>
                  <ul>
                    {resumeInfo['items'].map((item) => {
                      const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price);
                      const formattedSupplier = item.supplier.replace(/_/g, " ").replace("provider", "").toUpperCase();

                      return (
                        <li>{item.name} - {formattedSupplier} - {formattedPrice} </li>
                      );
                    })}
                  </ul>
                  <button className="btn btn-dark btn-lg btn-block" onClick={handleFinishOrder}>
                    {t('finishBuy')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
