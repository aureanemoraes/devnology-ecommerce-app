import { t } from "i18next";

const Paginator = ({pages, setCurrentPage}) => {
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

export default Paginator;