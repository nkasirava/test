myApp.controller('CheckUrlController', ['$scope', '$rootScope', '$location', '$firebaseObject', '$firebaseArray', '$routeParams', 'FIREBASE_URL',
function($scope, $rootScope, $location, $firebaseObject, $firebaseArray, $routeParams, FIREBASE_URL) {

    $scope.ifGenerated = function() {

        $scope.hash = window.location.hash.substring(1, 11);
        var myhash = $scope.hash;

        var checkURL = function() {

            var link;
                
            if (myhash != '/links' && myhash != '/register' && myhash != '/login' && myhash.substring(1,2) != '!') {
                   window.location = '#/links';
            }

            if (myhash != '/links' && myhash != '/register' && myhash != '/login' && myhash.substring(1, 2) == '!') {
                $scope.needRedirect = true;

                var ref = new Firebase("https://elegantshorts.firebaseio.com/links");
                    
                ref.on("child_added", function(snapshot) {


                    if (myhash.substring(1, 2) == '!' && myhash == snapshot.val().generated) {

                        var mylink = snapshot.val().name;

                        var clickCount = function() {

                            var i;

                            var linkRef2 = new Firebase(FIREBASE_URL + 'links/');

                            linkRef2.on("child_added", function(snapshot) {
                                    
                                if (snapshot.val().generated == $scope.hash) {
                                    link = snapshot.key();

                                   }
                            });

                            var linkRef = new Firebase(FIREBASE_URL + 'links/' + link);

                            $scope.linkClicks = linkRef;


                            linkRef.once("value", function(snapshot) {
                                var nameSnapshot = snapshot.child("clicks");
                                i = nameSnapshot.val();

                            });

                            $scope.linkClicks.child('clicks').set(i + 1);

                        }

                        clickCount();

                        window.location = mylink;
                            
                    }

                });

            }

        }
        
        checkURL();

    }

    $scope.ifGenerated();

 }
]);
