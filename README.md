# RBAC Diagram Creator

This web application allows you to create Role-Based Access Control (RBAC) diagrams using JointJS and SvelteKit. You can easily create, connect, and delete elements, and generate Terraform HCL or SQL commands based on your diagram.

### Installation

To use this application locally, follow these steps:

1. Clone the repository.
2. Install dependencies using npm install.
3. Run the application using npm run dev.
4. Open http://localhost:3000 in your browser.

### Clone the repository.

Install dependencies using npm install.
Run the application using npm run dev.
Open http://localhost:3000 in your browser.

### Usage

Once the application is running, you can start creating your RBAC diagram by:

1. Clicking on any of the elements provided (role, database, and schema) to add them to the canvas.
2. Connecting the elements by clicking on the "Link" button and dragging from one element to another.
3. Editing the label of an element by double-clicking on it.
4. Deleting an element or link by clicking on the "Delete" button and then clicking on the element or link you want to delete.

### Testing

This project uses Jest for unit testing. To run the tests, use the following command:
`npm run test`

Clicking on any of the elements provided (role, database, and schema) to add them to the canvas.
Connecting the elements by clicking on the "Link" button and dragging from one element to another.
Editing the label of an element by double-clicking on it.
Deleting an element or link by clicking on the "Delete" button and then clicking on the element or link you want to delete.
To generate Terraform HCL or SQL commands based on your diagram, simply click on the corresponding button. The output will be displayed in the "Output" section below the canvas.

Contributing
If you find a bug or have a feature request, please open an issue. Contributions are also welcome, so feel free to fork the repository and create a pull request.
