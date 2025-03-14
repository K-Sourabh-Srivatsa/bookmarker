import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faLink, faPenToSquare, faTrash, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ensureHttps, copyToClipboard } from '../../utils/utilFunctions';
import { useCustomNavigation } from '../../customHooks/useCustomNavigation';
import { deleteBookmark } from '../../apis/bookmark'

function BookmarkCard({ id, title, url, refreshBookmarks }) {

    const { navigateToEditPage, navigateToVisitLink, navigateToBookmarkDetails } = useCustomNavigation();

    return (
        <>

            <div className="card h-100 text-decoration-none" style={{ overflow: 'visible' }} onClick={(e) => navigateToBookmarkDetails(id, e)}>
                <div className="card-header">
                    <h6 className="m-0 text-truncate">{title}</h6>
                </div>
                <div className="card-body p-0">
                    <div className="mx-3 my-1 text-truncate">
                        <span className="text-decoration-none text-reset text-truncate">{url}</span>
                    </div>
                </div>
                <div className="d-flex card-footer py-1 text-body-secondary justify-content-between align-items-center">
                    <FontAwesomeIcon icon={faUpRightFromSquare} onClick={e => navigateToVisitLink(ensureHttps(url), e)} />
                    <FontAwesomeIcon icon={faLink} className="text-primary" onClick={(e) => copyToClipboard(url, e)} />
                    <div className="dropdown position-static">
                        <button
                            className="btn"
                            type="button"
                            id={`dropdownMenuButton-${id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdownMenuButton-${id}`}>
                            <li><a className="dropdown-item" onClick={(e) => navigateToEditPage(id, e)}><FontAwesomeIcon icon={faPenToSquare} className="me-1" />Edit</a></li>
                            <li><a className="dropdown-item" onClick={(e) => { deleteBookmark(id, e).then(() => refreshBookmarks()) }}><FontAwesomeIcon icon={faTrash} className="me-1 text-danger" /><span className="text-danger">Delete</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookmarkCard;