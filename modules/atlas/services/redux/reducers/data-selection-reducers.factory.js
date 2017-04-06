(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('dataSelectionReducers', dataSelectionReducersFactory);

    dataSelectionReducersFactory.$inject = [
        'ACTIONS',
        'stateUrlConverter'
    ];

    function dataSelectionReducersFactory (ACTIONS, stateUrlConverter) {
        const reducers = {};

        reducers[ACTIONS.FETCH_DATA_SELECTION.id] = fetchDataSelectionReducer;
        reducers[ACTIONS.SHOW_DATA_SELECTION.id] = showDataSelectionReducer;
        reducers[ACTIONS.NAVIGATE_DATA_SELECTION.id] = navigateDataSelectionReducer;
        reducers[ACTIONS.SET_DATA_SELECTION_VIEW.id] = setDataSelectionViewReducer;

        return reducers;

        /**
         * @param {Object} oldState
         * @param {Object} payload A tring with the search query or
         *                         An object with the following keys:
         *                          - query (String): The search query
         *                          - filters (Object): Active filters
         *                          Except these two keys other keys will
         *                          be copied if the are in the object
         *                          but no defualt value will be provided.
         *
         * @returns {Object} newState
         */
        function fetchDataSelectionReducer (oldState, payload) {
            const newState = angular.copy(oldState);
            let mergeInto;

            newState.map.isFullscreen = false;

            newState.layerSelection.isEnabled = null;
            newState.search = null;
            newState.page.name = null;
            newState.detail = null;
            newState.straatbeeld = null;

            if (angular.isString(payload)) {
                mergeInto = {
                    query: payload,
                    filters: {}
                };
            }  else {
                mergeInto = payload;
                mergeInto.filters = mergeInto.filters || {};
            }

            newState.dataSelection = Object.keys(mergeInto).reduce((result, key) => {
                result[key] = mergeInto[key];
                return result;
            }, newState.dataSelection || {});

            if (!newState.dataSelection.view) {
                // Default view is table view
                newState.dataSelection.view = 'TABLE';
            }

            // LIST loading might include markers => set map loading accordingly
            newState.map.isLoading = newState.dataSelection.view === 'LIST';

            newState.dataSelection.geometryFilter = newState.dataSelection.geometryFilter ||
                {
                    markers: [],
                    description: ''
                };

            newState.dataSelection.markers = [];
            newState.dataSelection.isLoading = true;
            newState.dataSelection.isFullscreen = newState.dataSelection.view !== 'LIST';

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Array} payload - Markers for the leaflet.markercluster plugin
         *
         * @returns {Object} newState
         */
        function showDataSelectionReducer (oldState, payload) {
            const newState = angular.copy(oldState);

            if (newState.dataSelection) {
                newState.dataSelection.markers = payload;
                newState.dataSelection.isLoading = false;

                newState.dataSelection.isFullscreen = newState.dataSelection.view !== 'LIST';
            }

            newState.map.isLoading = false;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Number} payload - The destination page
         *
         * @returns {Object} newState
         */
        function navigateDataSelectionReducer (oldState, payload) {
            const newState = angular.copy(oldState);

            newState.dataSelection.page = payload;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {String} payload
         *
         * @returns {Object} newState
         */
        function setDataSelectionViewReducer (oldState, payload) {
            const newState = angular.copy(oldState);

            ['LIST', 'TABLE', 'CARDS'].forEach(legalValue => {
                if (payload === legalValue) {
                    newState.dataSelection.view = payload;
                    newState.dataSelection.isLoading = true;
                }
            });

            return newState;
        }
    }
})();
