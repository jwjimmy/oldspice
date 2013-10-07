//var Site = angular.module('Site', ['ui.scrollfix']);
var Site = angular.module('Site', []);

Site
.factory('deck', function () {
    var slides = [],
        p = pointer(slides);

    var ensureId = function (e, nextIndex) {
        if (!e.attr('id')) {
            e.attr('id', 'slide' + nextIndex);
        }
    };

    var toggleVisibility = function (slide) {
        if (slide) {
            var e = $('#' + slide.id),
                display = e.css('display') === 'block' ? 'none' : 'block';
            e.css({display: display});
        }
    };

    var move = function (action) {
        toggleVisibility(p.getCurrent());
        action();
        toggleVisibility(p.getCurrent());
    };

    return {
        add: function (element) {
            ensureId(element, slides.length);
            slides.push({
                id: element.attr('id')
            });
        },
        next: function () {
            move(p.moveNext);
        },
        previous: function () {
            move(p.movePrevious);
        },
        count: function() {
            return slides.length;
        }
    };
})
.directive('slide', function (deck) {
    return {
        restrict: 'E',
        link: function ($scope, $element) {
            $element.hide();
            deck.add($element);
            if (deck.count() === 1) {
                deck.next();
            }
        }
    };
})
.run(function ($document, deck) {
    $document.keydown(function (e) {
        var key = e.keyCode;
        if (key === 32 || key === 39) {
            deck.next();
        } else if (key === 37) {
            deck.previous();
        }
    });
});

Site.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    })
    .when('/inspirations', {
      templateUrl: 'templates/inspirations.html',
      controller: 'InspirationController'
    })
    .when('/needs', {
      templateUrl: 'templates/brief.html',
      controller: 'NeedsController'
    })
    .when('/briefalpha', {
      templateUrl: 'templates/briefalpha.html',
      controller: 'BriefAlphaController'
    })
    .when('/lexicon', {
      templateUrl: 'templates/lexicon.html',
      controller: 'LexiconController'
    })
    .when('/lexicon/:termid', {
      templateUrl: 'templates/lexicon.html',
      controller: 'LexiconDetailController'
    })
    .when('/personas', {
      templateUrl: 'templates/personas.html',
      controller: 'PersonaController'
    })
    .when('/personas/:termid', {
      templateUrl: 'templates/personas.html',
      controller: 'PersonaDetailController'
    })
    .when('/narratives', {
      templateUrl: 'templates/narratives.html',
      controller: 'NarrativesController'
    })
    .when('/storyboards', {
      templateUrl: 'templates/storyboards.html',
      controller: 'StoryboardsController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

function InspirationController ($scope, $http, $anchorScroll, $location) {
  $http.get('public/data/inspirations.json').success(function (data) {
    $scope.inspirations = data;
  });

  $scope.model = {
    title: "Design Inspirations",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }

  $scope.scrollTo = function(id) {
    var location = '#' + id;
    $.scrollTo($(location), 500);
    //$location.hash(id);
    //$anchorScroll();
  }
}

function HomeController ($scope, $routeParams) {
  $scope.model = {
    title: "Human Factors in Interface Design",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }
}

function BriefAlphaController ($scope, $routeParams) {
  $scope.model = {
    title: "Original Project Brief",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }
}

function NeedsController ($scope, $routeParams, $anchorScroll, $location) {
  $scope.model = {
    title: "Needs Analysis",
    authors: "Kai Austin, Zachary Homans, James Wu",
    imgs: {
      twobytwo: "public/imgs/needs/twobytwo.png",
      experiencemapsmall: "public/imgs/needs/experiencemapsmall.jpg",
      experiencemap: "public/imgs/needs/experiencemap.jpg"
    }
  }
  $scope.scrollTo = function(id) {
    var location = '#' + id;
    $.scrollTo($(location), 500);
    //$location.hash(id);
    //$anchorScroll();
  }
}

function PersonaController ($scope, $routeParams, $http, $location) {
  $http.get('public/data/personas.json').success(function (data) {
    $scope.personas = data;
  });

  $scope.model = {
    title: "Personas",
    authors: "Kai Austin, Zachary Homans, James Wu",
    imgs: {
      blake: "public/imgs/personas/blake.png",
      chang: "public/imgs/personas/chang.jpg",
      oberlin: "public/imgs/personas/oberlin.jpg",
      yang: "public/imgs/personas/yang.jpg",
      ylc: "public/imgs/personas/ylc.jpg"
    }
  }
}

function PersonaDetailController ($scope, $routeParams, $http, $anchorScroll, $location) {
  $http.get('public/data/personas.json').success(function (data) {
    $scope.personas = data;
  });

  $scope.model = {
    title: "Personas",
    authors: "Kai Austin, Zachary Homans, James Wu",
    imgs: {
      blake: "public/imgs/personas/blake.png",
      chang: "public/imgs/personas/chang.jpg",
      oberlin: "public/imgs/personas/oberlin.jpg",
      yang: "public/imgs/personas/yang.jpg",
      ylc: "public/imgs/personas/ylc.jpg"
    }
  }

  $scope.term = $routeParams.termid;

  $scope.jumpTo = function (id) {
    $location.hash(id);
    $anchorScroll();
  }

  $scope.$on('$viewContentLoaded', function() {
    $location.hash($scope.term);
    $anchorScroll();
    //window.scrollTo(0,90);
  });

}

function LexiconController ($scope, $routeParams, $http) {
  $http.get('public/data/lexicon.json').success(function (data) {
    console.log(data['Stakeholders']);
    $scope.dictionary = data;
  });

  $scope.model = {
    title: "Lexicon",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }
}


function LexiconDetailController ($scope, $routeParams, $http, $anchorScroll, $location) {
  $http.get('public/data/lexicon.json').success(function (data) {
    console.log(data['Stakeholders']);
    $scope.dictionary = data;
  });

  $scope.model = {
    title: "Lexicon",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }

  $scope.jumpTo = function (id) {
    $location.hash(id);
    $anchorScroll();    
  }

  jumpTo($routeParams.termid);
}

function NarrativesController ($scope, $routeParams) {
  $scope.model = {
    title: "Narratives",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }
}

function StoryboardsController ($scope, $routeParams) {
  $scope.model = {
    title: "Storyboards",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }


}