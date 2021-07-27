//Book Constructor
function Book(title, author, isbn) {
    this.title =title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){}

//add books to list
UI.prototype.addBookToList= function(book){
    const list = document.getElementById('book-list');
    //Create tr element
    const row= document.createElement('tr');
    //Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>X</a> </td>
    ` 
    list.appendChild(row);
}

//show alert
UI.showAlert=function(message, className){
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

//delete book
UI.prototype.deleteBook= function (target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
        UI.showAlert('Book Removed!','success');
    }
}

//clear fields after submit
UI.prototype.clearFields=function(){
    document.getElementById('title').value= '';
    document.getElementById('author').value= '';
    document.getElementById('isbn').value= '';
}

//Event Listeners
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
        UI.showAlert('Please fill in all fields', 'error');
    }else{
        ui.addBookToList(book);
        ui.clearFields();
    }
    e.preventDefault();
})

//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui=new UI();
    //delete book
    ui.deleteBook(e.target);
    //show alert
    e.preventDefault();
});