# RBAC Diagram Creator

This web application allows you to create Role-Based Access Control (RBAC) diagrams using JointJS and SvelteKit. You can easily create, connect, and delete elements, and generate Terraform HCL or SQL commands based on your diagram.

![Diagram](/readme-images/rbac.png)
![ SQL Output ](/readme-images/sql-output.png)

### Installation

To use this application locally, follow these steps:

1. Clone the repository.
2. Install dependencies using npm install.
3. Run the application using npm run dev.
4. Open http://localhost:3000 in your browser.

### Testing

This project uses Jest for unit testing. To run the tests, use the following command:
`npm run test`

### Clone the repository.

Install dependencies using npm install.
Run the application using npm run dev.
Open http://localhost:3000 in your browser.

### Usage

Once the application is running, you can start creating your RBAC diagram by:

1. Clicking on any of the elements provided (role, database, and schema) and click the green plus add a new element to the canvas.
2. Connecting the elements by clicking on the "Link" button (arrow on bottom left) and dragging from one element to another.
3. Editing the label of an element by double-clicking on it.
4. Deleting an element or link by clicking on the "Delete" button and then clicking on the element or link you want to delete.

The types of elements are defined currently by colors

- Roles - green
- Database - blue
- Schemas - yellow

Contributing
If you find a bug or have a feature request, please open an issue. Contributions are also welcome, so feel free to fork the repository and create a pull request.
