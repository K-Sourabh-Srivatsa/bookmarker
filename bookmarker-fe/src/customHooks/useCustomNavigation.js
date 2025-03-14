import { useNavigate } from 'react-router-dom';
import { createDynamicRoute, ROUTE_EDIT_BOOKMARK, ROUTE_BOOKMARK_DETAILS } from '../utils/constants';

export const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateToEditPage = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigate(createDynamicRoute(ROUTE_EDIT_BOOKMARK, id));
  };

  const navigateToVisitLink = (url, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateToBookmarkDetails = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigate(createDynamicRoute(ROUTE_BOOKMARK_DETAILS, id));
  };

  const navigateToUserPage = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    navigate(createDynamicRoute('/user/id', id));
  };

  return { navigateToEditPage, navigateToVisitLink, navigateToBookmarkDetails, navigateToUserPage };
};