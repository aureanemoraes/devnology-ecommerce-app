import { t } from "i18next";

const Paginator = ({ pages, currentPage, setCurrentPage }) => {
    console.log({pages}, 'bb');
    const disabledPrevious = pages && !pages.prev_page_url ? 'disabled' : '';
    const disabledNext = pages && !pages.next_page_url ? 'disabled' : '';

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                <button className={`page-link ${disabledPrevious}`} aria-label={t('previous')}>
                    <span aria-hidden="true">&laquo;</span>
                </button>
                </li>
                    {pages && pages.current_page && (<li className="page-item"><button className="page-link" onClick={() => handlePageChange(pages.current_page) }>{pages.current_page}</button></li>)}
                    {pages && (parseInt(pages.current_page) + 1) <= parseInt(pages.last_page) && (<li className="page-item"><button className="page-link" onClick={() => handlePageChange((parseInt(pages.current_page) + 1)) }>{(parseInt(pages.current_page) + 1)}</button></li>)}
                    
                    {/* <li className="page-item"><button className="page-link">2</button></li>
                    <li className="page-item"><button className="page-link">3</button></li> */}
                <li className="page-item">
                <button className={`page-link ${disabledNext}`} aria-label={t('next')}>
                    <span aria-hidden="true">&raquo;</span>
                </button>
                </li>
            </ul>
        </nav>
    );
}

export default Paginator;