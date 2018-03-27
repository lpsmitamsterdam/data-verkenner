angular
    .module('atlas')
    .component('dpMapWrapper', {
        templateUrl: 'modules/atlas/components/dashboard/wrappers/map-wrapper/map-wrapper.html', //eslint-disable-line
        controller: DpMapWrapper,
        controllerAs: 'vm'
    });

DpMapWrapper.$inject = ['$timeout', '$window'];

function DpMapWrapper ($timeout, $window) {
    const React = $window.React;
    const render = $window.render;
    const MapWrapper = $window.MapWrapper;

    const mountReactComponents = () => {
        const graphNode = document.getElementById('map-wrapper');
        /* istanbul ignore next */
        if (graphNode) {
            render(React.createElement(MapWrapper), graphNode);
        }
    };

    $timeout(() => {
        mountReactComponents();
    });
}
