//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2014 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

/*jshint expr: true*/

describe('sortingModal', function() {
  var $rootScope, scope;
  var ctrl, buildController;
  var QueryService, $httpBackend;

  var columns = [
    { name: 'parent', title: 'Parent' },
    { name: 'cheese', title: 'Cheesy column'},
    { name: 'cake', title: 'Cake'}
  ];

  beforeEach(module('openproject.workPackages.controllers',
                    'openproject.services',
                    'openproject.models'));

  beforeEach(inject(function($rootScope, $controller, $timeout, $filter, Sortation) {
    scope = $rootScope.$new();

    scope.sortElements = [];

    buildController = function() {
      ctrl = $controller('SortingModalController', {
        $scope: scope,
        sortingModal: {},
        I18n: { t: angular.noop },
        $filter: $filter,
        QueryService: {
          loadAvailableColumns: function() {
            return $timeout(function() {
              return columns;
            });
          },
          getSortation: function() {
            return new Sortation();
          }
        }
      });

      $timeout.flush();
    };

  }));

  describe('initialisation', function() {
    it('should initialise', function() {
      buildController();
    });
  });

  describe('setup', function() {
    beforeEach(function() {
      buildController();
    });

    it('formats the columns for select2', function() {
      expect(scope.availableColumnsData).to.deep.equal([
        {id: 'parent', label: 'Parent', other: 'Parent'},
        {id: 'cheese', label: 'Cheesy column', other: 'Cheesy column'},
        {id: 'cake', label: 'Cake', other: 'Cake'}
      ]);
    });
  });

});
