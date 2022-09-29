wikiApp.controller("postController", function($scope, $http, $routeParams) {
  // Controller for post view

  // CKEditor
  ClassicEditor.create(document.querySelector('#editor'), {
    toolbar: {
      items: ['heading', 'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight', 'removeFormat', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', 'todoList', '|', 'outdent', 'indent', 'alignment', '|', 'blockQuote', 'insertTable', 'imageInsert', 'mediaEmbed', 'undo', 'redo', '|', 'code', 'codeBlock', 'htmlEmbed', 'MathType', 'ChemType', 'strikethrough', 'subscript', 'superscript', 'horizontalLine'],
      shouldNotGroupWhenFull: true
    },
    mediaEmbed: {
      previewsInData: true
    },
    language: 'en',
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
    },
    licenseKey: '',
  })
  .then(editor => {
    window.editor = editor;
    editorReady();
  })
  .catch( error => {
    console.error('Oops, something went wrong!');
    console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
    console.warn('Build id: bojh7pnw6nnm-dfpekd22znn5');
    console.error(error);
  });

  // This function is called when the editor is ready (Your GET logic should go here)
  function editorReady() {
    window.editor.setData("NA");

    if($routeParams.urlName) {
      $http.get("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/wiki/" + $routeParams.urlName).then((result) => {
        $scope.title = result.data.title;
        $scope.author = result.data.author;
        $scope.urlName = result.data.urlName;
        $scope.category = result.data.category;

        window.editor.setData(result.data.html);
        $scope.urlDisable = true;
        $scope.liveSite = "https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/" + $routeParams.urlName;
        $scope.deleteAccess = true;
      }).catch((err) => {
        console.log("url not found");
      })
    }
  }

  // This function returns the HTML contents of the editor (Call this during your POST/PUT operations)
  function getHtml() {
    return window.editor.getData();
  }

  $scope.save = () => {
    if($routeParams.urlName){
      $http.put("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/wiki/" + $routeParams.urlName, {
          title: $scope.title,
          author: $scope.author,
          urlName: $scope.urlName,
          html : getHtml(),
          password : $scope.pass,
          category : $scope.category
      })
      .then((res) => {
        console.log(res.data);
        alert($routeParams.urlName + " has been updated.");
        $scope.pass = "";
      })
      .catch((err) => {
        console.log(err.data);
        alert("Please input a valid password.");
      })
    }else{
      $http.post("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/wiki/", {
        title: $scope.title,
        author: $scope.author,
        urlName: $scope.urlName,
        html : getHtml(),
        password : $scope.pass,
        category : $scope.category
      },{
        headers: { "authorization": "Bearer " + localStorage.getItem("jwt")}
      })
      .then((res) => {
        alert($scope.urlName + " created.");
        $scope.pass = "";
        console.log(res.data);
        window.location.assign("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/#!/post/" + $scope.urlName);
      })
      .catch((err) => {
        $scope.error = (err.data);
      })
    }
  }

  $scope.checkbox = false;
  $scope.delete = () => {
    if($routeParams.urlName){
      $http.delete("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/wiki/delete/" + $scope.urlName + "?password=" + $scope.pass)
      .then((res) => {
        alert($scope.urlName + " page has been deleted.");
        window.location.assign("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/#!");
      })
      .catch((err) => {
        alert("Error! Incorrect Password!");
      })
    }
  }
});
