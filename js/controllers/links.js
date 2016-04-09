myApp.controller('LinksController', 
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$routeParams', 'FIREBASE_URL',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, $routeParams, FIREBASE_URL) {

    $scope.linksQuantity = 0;  
      
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser) {
      if (authUser) {
        var linksRef = new Firebase(FIREBASE_URL + 'links/');
        var linksInfo = $firebaseArray(linksRef);
        
        $scope.links = linksInfo;
          
        $scope.whichuser = $routeParams.uId;
          

        $scope.addLink = function() {
            

          linksInfo.$add({
            date: Firebase.ServerValue.TIMESTAMP,
            generated: generateLink(),
            name: checkLinkHttp(),
            comments: checkComment(),
            clicks: 0,
            user: $rootScope.currentUser.$id
          }).then(function() {
            $scope.linkname='';
            $scope.linkcomment='';
              });
            
        };
          
          var checkComment = function () {
              
              if ($scope.linkcomment==undefined) {
                  
                  return null;
              }
              
              else return $scope.linkcomment;
          }
          
         var checkLinkHttp = function () {
             
            if ($scope.linkname.substring(0, 7)!='http://' && $scope.linkname.substring(0, 8)!='https://') {
                
               return ('http://' + $scope.linkname); 
            }
             
             else return $scope.linkname;
             
             
         } 
          
         var generateLink = function() {
             
          var symbolsArray = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var newLink = '';
            var randomSymbol;
             
             for (var i=0; i<8; i++) {
                 
                 var randomIndex = Math.floor(Math.random()*(symbolsArray.length - 1));
                 randomSymbol = symbolsArray[randomIndex];
                 
                 newLink += randomSymbol;
                 
             }
            
             return '/!' + newLink;
             
             
        }; // generateLink

        $scope.deleteLink = function(key) {
          linksInfo.$remove(key);
        }; // deleteMeeting
          
        $scope.getActualLink = function () {
            
            var fullPath = window.location.href;
            var cuttedLinkPart = window.location.hash;
            
            return fullPath.substring(0, fullPath.length - cuttedLinkPart.length + 1);
        }
        

        
        

      } // User Authenticated
    }); // on Auth
}]); //Controller