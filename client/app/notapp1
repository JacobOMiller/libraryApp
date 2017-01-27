var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MediaClasses;
(function (MediaClasses) {
    var Media = (function () {
        function Media(type, name, date) {
            this.type = type;
            this.name = name;
            this.date = date;
            type = this.type;
            name = this.name;
            date = this.date;
        }
        return Media;
    }());
    MediaClasses.Media = Media;
    var Book = (function (_super) {
        __extends(Book, _super);
        function Book(type, name, date, author) {
            var _this = _super.call(this, type, name, date) || this;
            _this.author = author;
            author = _this.author;
            return _this;
        }
        return Book;
    }(Media));
    MediaClasses.Book = Book;
    var comicBook = (function (_super) {
        __extends(comicBook, _super);
        function comicBook(type, name, date, author, illustrator, issue) {
            var _this = _super.call(this, type, name, date, author) || this;
            _this.illustrator = illustrator;
            _this.issue = issue;
            illustrator = _this.illustrator;
            issue = _this.issue;
            return _this;
        }
        return comicBook;
    }(Book));
    MediaClasses.comicBook = comicBook;
    var referenceBook = (function (_super) {
        __extends(referenceBook, _super);
        function referenceBook(type, name, date, author, edition, isbn) {
            var _this = _super.call(this, type, name, date, author) || this;
            _this.edition = edition;
            _this.isbn = isbn;
            edition = _this.edition;
            isbn = _this.isbn;
            return _this;
        }
        return referenceBook;
    }(Book));
    MediaClasses.referenceBook = referenceBook;
})(MediaClasses || (MediaClasses = {}));
function addMedia() {
    var input = document.getElementById("mediaType");
    var storedInput = input.value;
    if (storedInput === "Movie") {
        console.log("movie");
    }
    else {
        console.log("not movie");
    }
    function clearForm() {
        if (document.getElementById) {
            document.form.reset();
        }
    }
}
