// Ejercicios basados en la página: https://todomvc.com/examples/react/dist/#/
describe("ToDo App", () => {
  beforeEach(() => {
    cy.visit("http://todomvc-app-for-testing.surge.sh/");
  });

  // Test: creación de una tarea
  it("Debe crear una tarea", () => {
    cy.get(".new-todo").type("Tarea 1{enter}");
    cy.get(".todo-list").contains("Tarea 1");
  });

  // Test: marcar una tarea como completada
  it("Debe marcar una tarea como completada", () => {
    cy.get(".new-todo").type("Tarea completada{enter}");
    cy.get(".todo-list li").first().find(".toggle").click();
    cy.get(".todo-list li").first().should("have.class", "completed");
  });

  // Test: desmarcar una tarea completada
  it("Debe desmarcar una tarea completada", () => {
    cy.get(".new-todo").type("Tarea desmarcar{enter}");
    cy.get(".todo-list li").first().find(".toggle").click(); // marcar
    cy.get(".todo-list li").first().find(".toggle").click(); // desmarcar
    cy.get(".todo-list li").first().should("not.have.class", "completed");
  });

  // Test: edición de una tarea
  it("Debe editar una tarea", () => {
    cy.get(".new-todo").type("Tarea original{enter}");
    cy.get(".todo-list li").first().find("label").dblclick();
    cy.get(".todo-list li.editing .edit").clear().type("Tarea editada{enter}");
    cy.get(".todo-list li").first().contains("Tarea editada");
  });

  // Test: eliminación de una tarea
  it("Debe borrar una tarea", () => {
    cy.get(".new-todo").type("Tarea a borrar{enter}");
    cy.get(".todo-list li").first().trigger("mouseover");
    cy.get(".todo-list li").first().find(".destroy").click({ force: true });
    cy.get(".todo-list").should("not.contain", "Tarea a borrar");
  });

  // Test: filtros (completadas, activas y todas)
  it("Debe filtrar tareas completadas, activas y todas", () => {
    // Crear varias tareas
    cy.get(".new-todo").type("Tarea 1{enter}");
    cy.get(".new-todo").type("Tarea 2{enter}");
    cy.get(".new-todo").type("Tarea 3{enter}");

    // Completar la primera
    cy.get(".todo-list li").first().find(".toggle").click();

    // Filtrar completadas
    cy.contains("Completed").click();
    cy.get(".todo-list li").should("have.length", 1);
    cy.get(".todo-list li").first().should("have.class", "completed");

    // Filtrar activas
    cy.contains("Active").click();
    cy.get(".todo-list li").should("have.length", 2);
    cy.get(".todo-list li").each(($el) => {
      cy.wrap($el).should("not.have.class", "completed");
    });

    // Mostrar todas
    cy.contains("All").click();
    cy.get(".todo-list li").should("have.length", 3);
  });
});
