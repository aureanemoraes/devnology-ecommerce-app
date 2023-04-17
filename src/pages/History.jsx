import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Paginator from "../components/Paginator";
const History = () => {
  const state = useSelector((state) => state.handleCart);
  // eslint-disable-next-line
  const token = globalThis?.sessionStorage?.getItem('token');

  const [ orders, setOrders ] = useState([]);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);

  const [pages, setPages] = useState(null);

  const handleFinishOrder = () => {
    if (!token)
      navigate('/login');

    fetch(`http://localhost:8000/api/orders/?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'accept': 'application/json',
          'content-type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const { data } = jsonResponse;

        const _pages = {
          current_page: jsonResponse.data.current_page,
          first_page_url: jsonResponse.data.first_page_url,
          from: jsonResponse.data.from,
          last_page: jsonResponse.data.last_page,
          last_page_url: jsonResponse.data.last_page_url,
          next_page_url: jsonResponse.data.next_page_url,
          per_page: jsonResponse.data.per_page,
          prev_page_url: jsonResponse.data.prev_page_url,
          to: jsonResponse.data.to,
          total: jsonResponse.data.total,
        }

        setPages(() => _pages);

        setOrders(() => data.data);

        // navigate("/checkout");
        console.log({orders, data});
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleFinishOrder();
  }, [currentPage]);


  const ShowOrders = () => {
    return (
      <>
        <div className="container">
          <div className="row my-4">
            <div className="col-md-12 col-lg-12">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">{t('orders')}</h4>
                </div>
                <div className="card-body">
                  <ul>
                    {Array.isArray(orders) && orders.map(order => {
                      let total = 0;
                      return (
                        <li>
                          <div>
                            Pedido: {order.identifier}
                            <ul>
                              {order.items.map(item => {
                                total += parseFloat(item.price);
                                const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price);
                                const formattedSupplier = item.supplier.replace(/_/g, " ").replace("provider", "").toUpperCase();

                                return <li>{item.name} - {formattedSupplier} - {formattedPrice} </li>
                              })}
                            </ul>
                            Total: <strong>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
                            </strong>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <Paginator pages={pages} setCurrentPage={setCurrentPage}/>
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
        <h1 className="text-center">{t('orderHistory')}</h1>
        <hr />
        <ShowOrders />
      </div>
      <Footer />
    </>
  );
};

export default History;
