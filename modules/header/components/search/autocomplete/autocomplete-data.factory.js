(function () {
    'use strict';

    angular
        .module('dpHeader')
        .factory('autocompleteData', autocompleteDataService);

    autocompleteDataService.$inject = ['$http', 'apiConfig', 'HEADER_CONFIG'];

    function autocompleteDataService ($http, apiConfig, HEADER_CONFIG) {
        return {
            search: search,
            getSuggestionByIndex: getSuggestionByIndex
        };

        function search (query) {
            return $http({
                method: 'GET',
                url: apiConfig.ROOT + HEADER_CONFIG.AUTOCOMPLETE_ENDPOINT,
                params: {
                    q: query
                }
            }).then(function (response) {
                return formatData(response.data, query);
            });
        }

        function formatData (categories, query) {
            var suggestionIndex = 0,
                numberOfResults = 0;

            categories.forEach(function (category) {
                category.content.map(function (suggestion) {
                    suggestion.index = suggestionIndex++;
                    numberOfResults++;

                    return suggestion;
                });
            });

            return {
                count: numberOfResults,
                data: categories,
                query: query
            };
        }

        function getSuggestionByIndex (searchResults, index) {
            var activeSuggestion;

            searchResults.forEach(function (category) {
                category.content.forEach(function (suggestion) {
                    if (suggestion.index === index) {
                        activeSuggestion = suggestion;
                    }
                });
            });

            return activeSuggestion;
        }
    }
})();
