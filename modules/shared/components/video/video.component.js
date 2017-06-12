(function () {
    'use strict';

    /**
     * The video playback is governed by the play variable set from outside this component
     * width and height bindings are required so the browser can reserve spacing before video load.
     * A poster image (splash image) always needs to be set
     */

    angular
        .module('dpShared')
        .component('dpVideo', {
            templateUrl: 'modules/shared/components/video/video.html',
            controller: VideoController,
            controllerAs: 'vm',
            bindings: {
                src: '<', // expects *.mp4
                poster: '<',
                width: '<',
                height: '<',
                play: '<'
            }
        });

    VideoController.$inject = ['$element'];

    function VideoController ($element) {
        const vm = this,
            videoElement = $element.find('video')[0];

        vm.$onChanges = (changes) => {
            if (angular.isUndefined(changes.play) || !videoElement || !videoElement.play || !videoElement.pause) {
                return;
            }

            if (changes.play.currentValue) {
                videoElement.play();
            } else {
                videoElement.pause();
                videoElement.currentTime = 0;
            }
        };
    }
})();
