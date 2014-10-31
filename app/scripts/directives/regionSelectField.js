'use strict';


angular.module('deckApp')
  .directive('regionSelectField', function (settings) {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/regionSelectField.html',
      scope: {
        regions: '=',
        component: '=',
        field: '@',
        account: '=',
        onChange: '&',
        labelColumns: '@'
      },
      link: function(scope) {
        function groupRegions(regions) {
          var regionNames = _.pluck(regions, 'name');
          if (regionNames) {
            scope.primaryRegions = regionNames.sort();
          }
          if (regionNames && regionNames.length) {
            scope.primaryRegions = regionNames.filter(function(region) {
              return settings.primaryRegions.indexOf(region) !== -1;
            }).sort();
            scope.secondaryRegions = _.xor(regionNames, scope.primaryRegions).sort();
          }
        }
        scope.dividerText = '---------------';
        scope.$watch('regions', groupRegions);
      }
    };
  }
);
