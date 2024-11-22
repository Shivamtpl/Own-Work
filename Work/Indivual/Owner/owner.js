    let historyStack = [];

    const ownerTableData = {
    
        "Chilli Powder,etc": {
                headers: ["S.No","image","Item Name","50g","100g","250g","500g",],
                rows: [
                    ["1","","Aashirvad (chilli)","","","","160"],
                    ["2","","Aachi(chilli)","","28","55(200g)",""],
                    ["3","","Eastern(chilli)","","34","72","136"],
                    ["4","","Eastern(Haldi)","","","60","120"],
                    ["5","","Eastern Coriander Powder","","","","95"],
                    ["6","","","","","",""],
        ]
        },

        'Soaps' : {
            headers : ["S.No","Image","Item Name","Small","Medium","Big"],
            rows : [
                ["1","","Santoor","37(4p)","",""],
                ["2","","Cintoor","110(12p)","",""],
                ["3","","Dettol","","",""],
                ["4","","Lifebuoy","","",""],
        ]
        },
       

    };
    function loadButtons(containerId, buttonNames, buttonColors, section) {
            const container =document.getElementById(containerId);
            container.innerHTML = '';
            buttonNames.forEach((name, index) => {
                const button = document.createElement('button');
                button.textContent = name;
                button.style.backgroundColor = buttonColors[index];
                button.onclick = () => navigateToTable(name, section);
                container.appendChild(button);
            });
        }
        function showOwnerSection() {
            // const password = prompt("Enter password for Owner access:");
            // if (password === "owner123") {
                navigateTo('ownerSection');
                loadButtons('ownerButtons', ['Chilli Powder,etc','Soaps',], 'common-button', 'owner');
            // } else {
            //     alert("Incorrect password.");
            // }
        }
        function navigateToTable(buttonName, section) {
            navigateTo('tableSection');
            createTable(buttonName, section);
        }
        function navigateTo(sectionId) {
            const sections = ['mainSection', 'ownerSection', 'tableSection'];
            sections.forEach(id => document.getElementById(id).style.display = 'none');
            document.getElementById(sectionId).style.display = 'block';
            historyStack.push(sectionId); // Track navigation
        }

        // Function to go back to the previous section
        function goBack() {
            historyStack.pop(); // Remove the current section
            const previousSection = historyStack.pop(); // Get the previous section

            if (previousSection) {
                navigateTo(previousSection);
            } else {
                navigateTo('mainSection'); // Default to the main section if history is empty
            }
        }

        function createTable(buttonName, section) {
            const tableContainer = document.getElementById('dynamicTable');
            tableContainer.innerHTML = '';
            const data = section === 'owner' ? ownerTableData[buttonName]: [];

            const table = document.createElement('table');
            const tableHeader = document.createElement('thead');
            const tableBody = document.createElement('tbody');

            const headerRow = document.createElement('tr');
            data.headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            tableHeader.appendChild(headerRow);

            data.rows.forEach(rowData => {
                const row = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    td.innerHTML = cellData;  // Use innerHTML here to render HTML tags in the cell
                   row.appendChild(td);
                });
                tableBody.appendChild(row);
            });

            table.appendChild(tableHeader);
            table.appendChild(tableBody);
            tableContainer.appendChild(table);

            const searchBar = document.createElement('input');
            searchBar.type = 'text';
            searchBar.placeholder = 'Search Items';
            searchBar.classList.add('search-input');
            searchBar.onkeyup = () => searchTable(searchBar.value);
            tableContainer.prepend(searchBar);
        }

        function searchButtons(query) {
            query = query.toLowerCase();
            const buttons = document.querySelectorAll('.buttons button');
            buttons.forEach(button => {
                const text = button.textContent.toLowerCase();
                button.style.display = text.includes(query) ? '' : 'none';
            });
        }

        function searchTable(query) {
    query = query.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        let matchFound = false;

        // Loop through all cells in the row
        Array.from(row.cells).forEach(cell => {
            if (cell.textContent.toLowerCase().includes(query)) {
                matchFound = true; // If any cell matches the query, keep the row visible
            }
        });

        // Show the row if match found, otherwise hide it
        row.style.display = matchFound ? '' : 'none';
    });
}

