angular.module("AngularJSWeb").controller("MainController", [
  "$scope",
  function ($scope) {
    // Khởi tạo data
    $scope.title = "Học AngularJS 1.x";
    $scope.name = "Bạn";
    $scope.todos = ["Học AngularJS", "Làm bài tập", "Thực hành"];
    $scope.newTodo = "";

    // Thêm todo
    $scope.addTodo = function () {
      if ($scope.newTodo) {
        $scope.todos.push($scope.newTodo);
        $scope.newTodo = "";
      }
    };

    // Xóa todo
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };
  },
]);
