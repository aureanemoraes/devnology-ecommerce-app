import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
  }


  useEffect(() => {
    setLoading(() => true);

    fetch(`http://localhost:8000/api/products/?page=${currentPage}`)
    .then((response) => response.json())
    .then((jsonResponse) => { 

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

      setData(() => jsonResponse.data.data);
      setFilter(() => jsonResponse.data.data);
      setLoading(false);
      setPages(_pages);
    });

  }, [currentPage]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  }

  const Paginator = () => {
    const disabledPrevious = pages && !pages.prev_page_url ? 'disabled' : '';
    const disabledNext = pages && !pages.next_page_url ? 'disabled' : '';

    const currentPagePlusOne = pages && (parseInt(pages.current_page) + 1);
    const validCurrentPagePlusOne = pages && currentPagePlusOne <= parseInt(pages.last_page);

    const previusPage = pages && parseInt(parseInt(pages.current_page) - 1);

    const firstPage = 1;
    const lastPage = pages && parseInt(pages.last_page);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                  <button className={`page-link`} aria-label={t('firstPage')} onClick={() => handlePageChange(firstPage)}>
                      <span aria-hidden="true">{t('firstPage')}</span>
                  </button>
                </li>
                <li className="page-item">
                  <button className={`page-link ${disabledPrevious}`} aria-label={t('previous')} onClick={() => handlePageChange(previusPage)}>
                      <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
              
                  {pages && pages.current_page && (<li className="page-item">
                    <button className="page-link active" onClick={() => handlePageChange(pages.current_page) }>{pages.current_page}</button>
                  </li>)}

                  {pages && validCurrentPagePlusOne && (<li className="page-item"><button className="page-link" onClick={() => handlePageChange(currentPagePlusOne) }>{currentPagePlusOne}</button></li>)}
             
                <li className="page-item">
                  <button className={`page-link ${disabledNext}`} aria-label={t('next')}>
                      <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
                <li className="page-item">
                  <button className={`page-link`} aria-label={t('lastPage')} onClick={() => handlePageChange(lastPage)}>
                      <span aria-hidden="true">{t('lastPage')}</span>
                  </button>
                </li>
            </ul>
        </nav>
    );
}

  const ShowProducts = () => {
    return (
      <>
        {Array.isArray(filter) && filter.map((product) => {
          const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price);

          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.gallery.length > 0 ? product.gallery[0] : ''}
                  alt="Product"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name.length > 25 ? `${product.name.substring(0, 25)}...` : product.name}
                  </h5>
                  <p className="card-text">
                    {product.description.length > 90 ? `${product.description.substring(0, 90)}...` : product.description}
                  </p>
                  <p className="card-text bg-dark text-light">
                    {product.supplier.replace(/_/g, " ").replace("provider", "").toUpperCase()}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">{formattedPrice}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <Link to={`/product/${product.supplier}/${product.id}`} className="btn btn-dark m-1">
                    {t('details')}
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    {t('addToCart')}
                  </button>
                </div>
              </div>
            </div>

          );
        })}

        <div className="d-flex flex-row-reverse">
          <Paginator pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">{t('products')}</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
