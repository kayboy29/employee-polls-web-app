import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { MemoryRouter } from "react-router";
import App from "../App";
import React from "react";

describe("Login", () => {
  it("Will navigate to login page if not login", () => {
    var component = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(component.getByText("Choose user to login")).toBeInTheDocument();
  });
});
