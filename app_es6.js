class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        //Create tr element
        const row= document.createElement('tr');
        //Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a  class='delete'>X</a> </td>
        `
        list.appendChild(row);
    }
    showAlert(message,className){
        //create div
        const div =document.createElement('div');
        //Add class
        div.className = `alert ${className}` ;
        //add text
        div.appendChild(document.createTextNode(message));
        //Get parent
        const container =document.querySelector('.container');
        //get form
        const form =document.querySelector('#book-form');
        //Insert alert
        container.insertBefore(div,form);
        //Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        },1000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
            this.showAlert('Book Removed!','success');
        }
    }

    clearFields(){
        document.getElementById('title').value= '';
        document.getElementById('author').value= '';
        document.getElementById('isbn').value= '';
    }
}

class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){ 
        const books = Store.getBooks();

        books.forEach(function (book){
            const ui=new UI();
            //add book to ui
            ui.addBookToList(book);
            
        })
    }

    static addBook(newBook){
        const books = Store.getBooks();
        const ui=new UI();
        books.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));
    }
    
    static removeBook(isbn){ 
        const books = this.getBooks();

        books.forEach(function (book, index) {
            if(book.isbn === isbn ){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));        
    }
}

//DOM load event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

//Event Listener for add
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form values
    const title =document.getElementById('title').value,
          author=document.getElementById('author').value,
          isbn =document.getElementById('isbn').value;
    const book = new Book(title,author,isbn);
    const ui =new UI();
    //validate
    if(title === '' | author === '' | isbn === ''){
        //error alert 
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        ui.addBookToList(book , ui);
        Store.addBook(book);
        ui.clearFields();
        ui.showAlert('Book Added!', 'success');
    }
    e.preventDefault();
})

//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui=new UI();
    //delete book
    ui.deleteBook(e.target);
    //remove from ls
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
});