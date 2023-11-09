import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import Add from "../pages/Add";
import { MemoryRouter } from "react-router";
import React from "react";

describe("Add", () => {
  it("will disable button when unfill text", () => {
    var component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Add />
        </Provider>
      </MemoryRouter>
    );
    var option1 = component.getByTestId("option-one");
    fireEvent.change(option1, { target: { value: "test 1" } });

    expect(component.getByTestId("submit-add-btn")).toBeDisabled();
  });

  it("will enable button if all option is fill", () => {
    var component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Add />
        </Provider>
      </MemoryRouter>
    );
    var option1 = component.getByTestId("option-one");
    fireEvent.change(option1, { target: { value: "test 1" } });

    var option2 = component.getByTestId("option-two");
    fireEvent.change(option2, { target: { value: "test 2" } });

    expect(component.getByTestId("submit-add-btn")).not.toBeDisabled();
  });
});
