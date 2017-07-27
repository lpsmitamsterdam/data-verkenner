describe('The dp-active-overlays-item component', function () {
    var $compile,
        $rootScope,
        $q,
        api,
        activeOverlays;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                mapConfig: {
                    OVERLAY_ROOT: 'http://atlas.example.com/overlays/'
                },
                overlays: {
                    SOURCES: {
                        overlay_without_legend: {
                            label_short: 'Overlay A',
                            minZoom: 8,
                            maxZoom: 10
                        },
                        overlay_with_internal_legend: {
                            label_short: 'Overlay B',
                            minZoom: 10,
                            maxZoom: 14,
                            legend: 'blabla.png'
                        },
                        overlay_with_external_legend: {
                            label_short: 'Overlay C',
                            minZoom: 10,
                            maxZoom: 16,
                            legend: 'http://not-atlas.example.com/blabla.png',
                            external: true
                        }
                    }
                },
                activeOverlays: {
                    isVisibleAtCurrentZoom: angular.noop
                }
            },
            function ($provide) {
                $provide.factory('dpLinkDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _$q_, _api_, _activeOverlays_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $q = _$q_;
            api = _api_;
            activeOverlays = _activeOverlays_;
        });

        spyOn(activeOverlays, 'isVisibleAtCurrentZoom');
    });

    function getComponent (overlay, isVisible, zoom) {
        var component,
            element,
            scope;

        element = document.createElement('dp-active-overlays-item');
        element.setAttribute('overlay', overlay);
        element.setAttribute('is-visible', 'isVisible');
        element.setAttribute('zoom', 'zoom');

        scope = $rootScope.$new();
        scope.isVisible = isVisible;
        scope.zoom = zoom;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('shows uses the short label from the OVERLAYS config', function () {
        var component = getComponent('overlay_without_legend', true, 8);

        expect(component.find('.qa-active-overlay-header').eq(0).text()).toContain('Overlay A');
    });

    describe('the legend image', () => {
        beforeEach(() => {
            activeOverlays.isVisibleAtCurrentZoom.and.returnValue(true);
            const tokenized = $q.resolve('http://atlas.example.com/overlays/blabla.png?token=abc');
            spyOn(api, 'createUrlWithToken').and.returnValue(tokenized);
        });

        it('is optional', function () {
            const component = getComponent('overlay_without_legend', true, 10);

            expect(component.find('.qa-active-overlay-image').length).toBe(0);
        });

        it('can display a self-hosted legend', function () {
            const component = getComponent('overlay_with_internal_legend', true, 10),
                image = component.find('.qa-active-overlay-image');

            expect(image.length).toBe(1);
            expect(image.attr('src')).toBe('http://atlas.example.com/overlays/blabla.png?token=abc');
        });

        it('can display an externally hosted legend', function () {
            const component = getComponent('overlay_with_external_legend', true, 10),
                image = component.find('.qa-active-overlay-image');

            expect(image.length).toBe(1);
            expect(image.attr('src')).toBe('http://not-atlas.example.com/blabla.png');
        });
    });

    it('shows a message for visibile layers that have no legend', function () {
        var component,
            expectedMessage = '(geen legenda)';

        // Invisible manually: don't show the message
        activeOverlays.isVisibleAtCurrentZoom.and.returnValue(true);
        component = getComponent('overlay_without_legend', false, 8);
        expect(component.text()).not.toContain(expectedMessage);

        // Invisible through zoom: don't show the message
        activeOverlays.isVisibleAtCurrentZoom.and.returnValue(false);
        component = getComponent('overlay_without_legend', true, 11);
        expect(component.text()).not.toContain(expectedMessage);

        // Visible overlay; show the message
        activeOverlays.isVisibleAtCurrentZoom.and.returnValue(true);
        component = getComponent('overlay_without_legend', true, 8);
        expect(component.text()).toContain(expectedMessage);
    });

    it('shows a message for hidden overlays caused by the zoom level', function () {
        var component,
            i;

        // When visible
        for (i = 8; i <= 10; i++) {
            activeOverlays.isVisibleAtCurrentZoom.and.returnValue(true);
            component = getComponent('overlay_without_legend', true, i);
            expect(component.text()).not.toContain('Zichtbaar bij verder zoomen');
        }

        // When invisible
        for (i = 11; i <= 16; i++) {
            activeOverlays.isVisibleAtCurrentZoom.and.returnValue(false);
            component = getComponent('overlay_without_legend', true, i);
            expect(component.text()).toContain('Zichtbaar bij verder zoomen');
        }
    });

    it('won\'t show the hidden because of the zoom level message when the layer has been hidden manually', function () {
        var component,
            i;

        // When invisible
        for (i = 8; i <= 16; i++) {
            activeOverlays.isVisibleAtCurrentZoom.and.returnValue(false);
            component = getComponent('overlay_with_internal_legend', false, i);
            expect(component.text()).not.toContain('Zichtbaar bij verder zoomen');
        }
    });

    it('has a button to hide the overlay, even if it\'s already hidden because of the zoom level', function () {
        var component;

        // With a supported zoom level
        activeOverlays.isVisibleAtCurrentZoom.and.returnValue(true);
        component = getComponent('overlay_without_legend', true, 10);
        expect(component.find('dp-link').length).toBe(1);
        expect(component.find('dp-link').text()).toContain('Verbergen');

        // With an unsupported zoom level
        activeOverlays.isVisibleAtCurrentZoom.and.returnValue(false);
        component = getComponent('overlay_without_legend', true, 9);
        expect(component.find('dp-link').length).toBe(1);
        expect(component.find('dp-link').text()).toContain('Verbergen');
    });

    it('has a button to show the overlay, even if it can\'t be shown on the current zoom level', function () {
        var component;

        // With a supported zoom level
        activeOverlays.isVisibleAtCurrentZoom.and.returnValue(true);
        component = getComponent('overlay_without_legend', true, 10);
        expect(component.find('dp-link').length).toBe(1);
        expect(component.find('dp-link').text()).toContain('Verbergen');

        // With an unsupported zoom level
        activeOverlays.isVisibleAtCurrentZoom.and.returnValue(false);
        component = getComponent('overlay_without_legend', true, 9);
        expect(component.find('dp-link').length).toBe(1);
        expect(component.find('dp-link').text()).toContain('Verbergen');
    });
});
