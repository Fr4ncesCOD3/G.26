// Porto il loginForm in una variabile
const loginForm = document.getElementById("loginForm");

// Porto il loginButton in una variabile
const loginButton = document.getElementById("loginButton");

// Porto il deleteButton in una variabile
const deleteButton = document.getElementById("deleteButton");

// Aggiungo una funzione per mostrare il valore salvato
function showSavedUsername() {
    const savedUsername = localStorage.getItem("username");
    let displayElement = document.getElementById("savedUsername");
    
    if (!displayElement) {
        displayElement = document.createElement("p");
        displayElement.id = "savedUsername";
        displayElement.classList.add("text-white", "text-center", "mt-3");
        loginForm.parentNode.insertBefore(displayElement, loginForm);
    }
    
    displayElement.textContent = savedUsername ? `Nome salvato: ${savedUsername}` : "";
}

// Mostro il valore salvato al caricamento della pagina
showSavedUsername();

//evento del login button
//ogni volta che si preme il loginButton aggiungi il nome dell'utente ad un localstorage e crea tabella con i nomi degli utenti 

loginButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Prendi il valore dell'input
    const username = loginForm.elements[0].value;
    
    // Prendi l'array esistente o creane uno nuovo
    //se non c'è un array users lo creo vuoto
    // || è un operatore logico che significa "oppure"
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Aggiungi il nuovo username
    users.push(username);
    
    // Salva l'array aggiornato
    localStorage.setItem("users", JSON.stringify(users));
    
    // Salva anche l'username corrente
    localStorage.setItem("username", username);
    
    // Mostra l'username salvato
    showSavedUsername();
    
    // Crea o aggiorna la tabella
    let table = document.getElementById("usersTable");
    if (!table) {
        table = document.createElement("table");
        table.id = "usersTable";
        table.classList.add("table", "table-dark", "w-50", "mx-auto", "mt-4");
        loginForm.parentNode.insertBefore(table, loginForm.nextSibling);
    }
    
    // Aggiorna il contenuto della tabella
    table.innerHTML = `
        <thead>
            <tr>
                <th>Utenti Registrati</th>
            </tr>
        </thead>
        <tbody>
            ${users.map(user => `<tr><td>${user}</td></tr>`).join("")}
        </tbody>
    `;
    
    // Pulisci l'input
    loginForm.elements[0].value = "";
});

// Modifica dell'evento del delete button
deleteButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Prendi il valore dell'input
    const usernameToDelete = loginForm.elements[0].value;
    
    // Prendi l'array degli utenti
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Cerca l'username da eliminare
    const index = users.indexOf(usernameToDelete);
    
    if (index > -1) {
        // Rimuovi l'username dall'array
        users.splice(index, 1);
        
        // Aggiorna il localStorage
        localStorage.setItem("users", JSON.stringify(users));
        
        // Se l'username corrente è quello eliminato, rimuovilo
        if (localStorage.getItem("username") === usernameToDelete) {
            localStorage.removeItem("username");
            showSavedUsername();
        }
        
        // Aggiorna la tabella
        let table = document.getElementById("usersTable");
        if (table) {
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Utenti Registrati</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `<tr><td>${user}</td></tr>`).join("")}
                </tbody>
            `;
        }
    }
    
    // Pulisci l'input
    loginForm.elements[0].value = "";
});

