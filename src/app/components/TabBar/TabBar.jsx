import React from 'react';
import PropTypes from 'prop-types';

// Todo: DP-6389
const TabBar = ({ totalCount, goToDatasets, searchQuery, children, showDatasetsButton }) => (
  <div>
    <h1 className="qa-tab-header__title c-tab-header__title">
      {(totalCount !== 0) && (
        <span className="c-tab-header__title__text">
          Resultaten met &apos;{searchQuery}&apos;
        </span>
      )}
      {(totalCount === 0) && (
        <span className="c-tab-header__title__text">
          Geen resultaten met &apos;{searchQuery}&apos;
        </span>
      )}
      {(showDatasetsButton) && (
        <button
          onClick={goToDatasets}
          type="button"
          className="c-tab-header__reset-button qa-go-to-catalogus"
        >
          <span className="c-tab-header__reset-button--color">Alle datasets tonen</span>
        </button>
      )}
    </h1>
    {children}
  </div>
);

TabBar.defaultProps = {
  totalCount: 1,
  showDatasetsButton: false,
  children: null
};

TabBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  goToDatasets: PropTypes.func.isRequired,
  children: PropTypes.node,
  showDatasetsButton: PropTypes.bool,
  totalCount: PropTypes.number
};

export default TabBar;
